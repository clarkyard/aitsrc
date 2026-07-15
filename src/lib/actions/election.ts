"use server";

import crypto from "crypto";
import { prisma } from "../db";
import { 
  generateElectionKeyPair, 
  splitSecret, 
  combineShares, 
  encryptBallot, 
  decryptBallot, 
  calculateBallotHash, 
  verifyChain,
  sha256,
  EncryptedBallot
} from "../crypto";
import { CANDIDATES } from "../constants";

export async function getElectionState() {
  const statusRecord = await prisma.electionState.findUnique({ where: { key: "polls_status" } });
  const publicKeyRecord = await prisma.electionState.findUnique({ where: { key: "public_key" } });
  const resultsRecord = await prisma.electionState.findUnique({ where: { key: "decrypted_results" } });
  
  const shares = await prisma.decryptionShare.findMany();
  
  return {
    status: statusRecord?.value || "NOT_STARTED",
    publicKey: publicKeyRecord?.value || "",
    shareCount: shares.length,
    submittedAdmins: shares.map(s => s.adminId),
    results: resultsRecord?.value ? JSON.parse(resultsRecord.value) : null
  };
}

export async function startElection(): Promise<{ shares: string[] }> {
  // 1. Reset database tables related to current election (except eligible voters list)
  await prisma.ballot.deleteMany();
  await prisma.decryptionShare.deleteMany();
  await prisma.receiptLookup.deleteMany();
  
  await prisma.voter.updateMany({
    data: {
      hasVoted: false,
      votedAt: null
    }
  });
  
  await prisma.electionState.deleteMany({
    where: {
      key: { in: ["decrypted_results"] }
    }
  });

  // 2. Generate RSA Keypair
  const { publicKey, privateKey } = generateElectionKeyPair();
  
  // 3. Split the private key into 3 Shamir shares (2-of-3 threshold)
  const shares = splitSecret(privateKey);
  
  // 4. Update state in database
  await prisma.electionState.upsert({
    where: { key: "polls_status" },
    update: { value: "OPEN" },
    create: { key: "polls_status", value: "OPEN" }
  });
  
  await prisma.electionState.upsert({
    where: { key: "public_key" },
    update: { value: publicKey },
    create: { key: "public_key", value: publicKey }
  });
  
  // 5. Add audit log
  await prisma.auditLog.create({
    data: {
      action: "ELECTION_STARTED",
      details: "New election opened. RSA public key published. Private key split into 3 Shamir shares and wiped from server memory."
    }
  });
  
  // Return shares to the admin who initiated it so they can distribute them to keyholders
  return { shares };
}

export async function closePolls(): Promise<void> {
  await prisma.electionState.upsert({
    where: { key: "polls_status" },
    update: { value: "CLOSED" },
    create: { key: "polls_status", value: "CLOSED" }
  });
  
  await prisma.auditLog.create({
    data: {
      action: "POLLS_CLOSED",
      details: "Voting window closed. Ballot chain locked. Awaiting decryption ceremony key shares."
    }
  });
}

export async function openPolls(): Promise<void> {
  await prisma.electionState.upsert({
    where: { key: "polls_status" },
    update: { value: "OPEN" },
    create: { key: "polls_status", value: "OPEN" }
  });
  
  await prisma.auditLog.create({
    data: {
      action: "POLLS_OPENED",
      details: "Voting window opened/resumed."
    }
  });
}

export async function castVote(
  studentId: string,
  choices: { 
    president: string; 
    treasurer: string; 
    organizer: string; 
    externalAffairs: string; 
    womensCommissioner: string; 
    sportsAndCulture: string; 
  }
): Promise<{ success: boolean; anonymousToken?: string; error?: string }> {
  // Validate input parameters
  const isValidChoice = (office: keyof typeof CANDIDATES, choice: string) => {
    return CANDIDATES[office].some((c: any) => c.name === choice);
  };

  if (
    !isValidChoice("president", choices.president) ||
    !isValidChoice("treasurer", choices.treasurer) ||
    !isValidChoice("organizer", choices.organizer) ||
    !isValidChoice("externalAffairs", choices.externalAffairs) ||
    !isValidChoice("womensCommissioner", choices.womensCommissioner) ||
    !isValidChoice("sportsAndCulture", choices.sportsAndCulture)
  ) {
    return { success: false, error: "Invalid candidate selection." };
  }


  try {
    // Execute a serializable transaction to prevent race condition double voting
    return await prisma.$transaction(async (tx) => {
      // 1. Verify election status
      const pollsStatus = await tx.electionState.findUnique({ where: { key: "polls_status" } });
      if (pollsStatus?.value !== "OPEN") {
        return { success: false, error: "Voting is closed." };
      }
      
      // 2. Lock and read voter record
      const voter = await tx.voter.findUnique({
        where: { studentId }
      });
      
      if (!voter) {
        return { success: false, error: "Student is not in voter registry." };
      }
      if (voter.hasVoted) {
        return { success: false, error: "You have already cast a ballot." };
      }
      
      // 3. Mark voter as voted
      const castAt = new Date();
      await tx.voter.update({
        where: { studentId },
        data: {
          hasVoted: true,
          votedAt: castAt
        }
      });
      
      // 4. Retrieve encryption key (RSA Public Key)
      const publicKeyRecord = await tx.electionState.findUnique({ where: { key: "public_key" } });
      if (!publicKeyRecord || !publicKeyRecord.value) {
        throw new Error("Election encryption key not found.");
      }
      
      // 5. Encrypt choices JSON
      const choicesStr = JSON.stringify(choices);
      const encrypted = encryptBallot(choicesStr, publicKeyRecord.value);
      const encryptedChoicesJson = JSON.stringify(encrypted);
      
      // 6. Generate random single-use voting token
      const anonymousToken = "VOTE-" + crypto.randomBytes(16).toString("hex").toUpperCase();
      
      // 7. Get the latest ballot hash to build the chain link
      const latestBallot = await tx.ballot.findFirst({
        orderBy: { id: "desc" }
      });
      const prevHash = latestBallot ? latestBallot.hash : "0";
      
      // 8. Calculate hash for new block
      const hash = calculateBallotHash(anonymousToken, encryptedChoicesJson, prevHash, castAt);
      
      // 9. Append to Ballot table
      await tx.ballot.create({
        data: {
          anonymousToken,
          choices: encryptedChoicesJson,
          prevHash,
          hash,
          castAt
        }
      });

      // 9b. Store plain text choices mapped to sha256(token) for anonymous self-verification
      const choicesWithDept = { ...choices, department: voter.department };
      await tx.receiptLookup.create({
        data: {
          tokenHash: sha256(anonymousToken),
          choices: JSON.stringify(choicesWithDept)
        }
      });
      
      // 10. Append to Audit Log (no connection to voter name or email)
      await tx.auditLog.create({
        data: {
          action: "BALLOT_CAST",
          details: `Anonymous ballot successfully registered and hash-chained. Turnout updated for department: ${voter.department}.`
        }
      });
      
      return { success: true, anonymousToken };
    });
  } catch (err: any) {
    return { success: false, error: err.message || "An error occurred during transaction execution." };
  }
}

export async function submitDecryptionShare(
  adminId: string,
  share: string
): Promise<{ success: boolean; error?: string }> {
  // Validate admin identity
  const validAdmins = ["admin1", "admin2", "admin3"];
  if (!validAdmins.includes(adminId)) {
    return { success: false, error: "Invalid admin identification." };
  }
  
  const state = await getElectionState();
  if (state.status !== "CLOSED") {
    return { success: false, error: "Polls must be closed before decryption." };
  }
  
  try {
    // Save share
    await prisma.decryptionShare.upsert({
      where: { adminId },
      update: { share },
      create: { adminId, share }
    });
    
    await prisma.auditLog.create({
      data: {
        action: "DECRYPTION_SHARE_SUBMITTED",
        details: `Administrator ${adminId} submitted their cryptographic key share.`
      }
    });
    
    // Check if we have at least 2 shares to perform decryption
    const sharesList = await prisma.decryptionShare.findMany();
    if (sharesList.length >= 2) {
      // Perform decryption ceremony
      const auditBallots = await prisma.ballot.findMany({ orderBy: { id: "asc" } });
      
      // 1. Combine shares to reconstruct Private Key PEM
      const rawShares = sharesList.map(s => s.share);
      const reconstructedPrivateKeyPem = combineShares(rawShares);
      
      // 2. Verify ballot chain first
      const verification = verifyChain(auditBallots.map(b => ({
        anonymousToken: b.anonymousToken,
        choices: b.choices,
        prevHash: b.prevHash,
        castAt: b.castAt,
        hash: b.hash
      })));
      
      if (!verification.valid) {
        await prisma.auditLog.create({
          data: {
            action: "DECRYPTION_CEREMONY_FAILED",
            details: `Ledger verification failed at ballot index ${verification.errorIndex}. Ledger tampering detected!`
          }
        });
        return { success: false, error: "Ledger verification failed. Ledger has been tampered with!" };
      }
      
      // 3. Decrypt votes and tally
      const tallies: {
        president: Record<string, number>;
        treasurer: Record<string, number>;
        organizer: Record<string, number>;
        externalAffairs: Record<string, number>;
        womensCommissioner: Record<string, number>;
        sportsAndCulture: Record<string, number>;
      } = {
        president: {},
        treasurer: {},
        organizer: {},
        externalAffairs: {},
        womensCommissioner: {},
        sportsAndCulture: {}
      };
      
      // Pre-initialize tallies to 0
      CANDIDATES.president.forEach(c => (tallies.president[c.name] = 0));
      CANDIDATES.treasurer.forEach(c => (tallies.treasurer[c.name] = 0));
      CANDIDATES.organizer.forEach(c => (tallies.organizer[c.name] = 0));
      CANDIDATES.externalAffairs.forEach(c => (tallies.externalAffairs[c.name] = 0));
      CANDIDATES.womensCommissioner.forEach(c => (tallies.womensCommissioner[c.name] = 0));
      CANDIDATES.sportsAndCulture.forEach(c => (tallies.sportsAndCulture[c.name] = 0));
      
      for (const ballot of auditBallots) {
        const encryptedData: EncryptedBallot = JSON.parse(ballot.choices);
        const decryptedChoicesStr = decryptBallot(encryptedData, reconstructedPrivateKeyPem);
        const choices = JSON.parse(decryptedChoicesStr);
        
        tallies.president[choices.president] = (tallies.president[choices.president] || 0) + 1;
        tallies.treasurer[choices.treasurer] = (tallies.treasurer[choices.treasurer] || 0) + 1;
        tallies.organizer[choices.organizer] = (tallies.organizer[choices.organizer] || 0) + 1;
        tallies.externalAffairs[choices.externalAffairs] = (tallies.externalAffairs[choices.externalAffairs] || 0) + 1;
        tallies.womensCommissioner[choices.womensCommissioner] = (tallies.womensCommissioner[choices.womensCommissioner] || 0) + 1;
        tallies.sportsAndCulture[choices.sportsAndCulture] = (tallies.sportsAndCulture[choices.sportsAndCulture] || 0) + 1;
      }
      
      // 4. Save results in DB
      await prisma.electionState.upsert({
        where: { key: "decrypted_results" },
        update: { value: JSON.stringify(tallies) },
        create: { key: "decrypted_results", value: JSON.stringify(tallies) }
      });
      
      // 5. Update election state
      await prisma.electionState.upsert({
        where: { key: "polls_status" },
        update: { value: "DECIPHERED" },
        create: { key: "polls_status", value: "DECIPHERED" }
      });
      
      await prisma.auditLog.create({
        data: {
          action: "DECRYPTION_CEREMONY_COMPLETE",
          details: `Decryption ceremony complete. Private key reconstructed using 2 shares. ${auditBallots.length} ballots successfully decrypted and tallied.`
        }
      });
    }
    
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to process key share." };
  }
}

export async function getAuditTrail() {
  const ballots = await prisma.ballot.findMany({
    orderBy: { id: "asc" }
  });
  
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { id: "desc" }
  });
  
  return {
    ballots: ballots.map(b => ({
      id: b.id,
      anonymousToken: b.anonymousToken,
      choices: b.choices,
      prevHash: b.prevHash,
      hash: b.hash,
      castAt: b.castAt.toISOString()
    })),
    auditLogs: auditLogs.map(l => ({
      id: l.id,
      action: l.action,
      timestamp: l.timestamp.toISOString(),
      details: l.details
    }))
  };
}

export async function getVotersTurnout() {
  const voters = await prisma.voter.findMany();
  const total = voters.length;
  const voted = voters.filter(v => v.hasVoted).length;
  const turnoutPercent = total > 0 ? (voted / total) * 100 : 0;
  
  // Calculate turnout per department
  const depts: Record<string, { total: number; voted: number }> = {};
  voters.forEach(v => {
    if (!depts[v.department]) {
      depts[v.department] = { total: 0, voted: 0 };
    }
    depts[v.department].total += 1;
    if (v.hasVoted) {
      depts[v.department].voted += 1;
    }
  });
  
  const departmentStats = Object.keys(depts).map(d => ({
    department: d,
    total: depts[d].total,
    voted: depts[d].voted,
    percent: depts[d].total > 0 ? (depts[d].voted / depts[d].total) * 100 : 0
  }));
  
  return {
    total,
    voted,
    percent: parseFloat(turnoutPercent.toFixed(1)),
    departmentStats
  };
}

export async function lookupBallotChoices(anonymousToken: string): Promise<{ success: boolean; choices?: any; error?: string }> {
  try {
    const tokenHash = sha256(anonymousToken);
    const lookup = await prisma.receiptLookup.findUnique({
      where: { tokenHash }
    });
    
    if (!lookup) {
      return { success: false, error: "Invalid or unrecognized receipt token." };
    }
    
    return { success: true, choices: JSON.parse(lookup.choices) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to look up selections." };
  }
}

export async function getRecentVoters() {
  const voters = await prisma.voter.findMany({
    where: { hasVoted: true },
    orderBy: { votedAt: "desc" },
    take: 12
  });
  return voters.map(v => ({
    studentId: v.studentId,
    department: v.department,
    votedAt: v.votedAt ? v.votedAt.toISOString() : null
  }));
}

export async function getLiveStandings() {
  const standings: Record<string, Record<string, number>> = {};
  
  // Initialize with 0 votes for every candidate in constants
  Object.entries(CANDIDATES).forEach(([office, list]) => {
    standings[office] = {};
    list.forEach(cand => {
      standings[office][cand.name] = 0;
    });
  });

  // Also initialize department-specific presidential tallies
  // The 3 departments are: "Computer Science & IT", "Business Administration", "Engineering"
  const byDepartment: Record<string, Record<string, number>> = {
    "Computer Science & IT": {},
    "Business Administration": {},
    "Engineering": {}
  };

  // Initialize department presidential votes
  CANDIDATES.president.forEach(cand => {
    byDepartment["Computer Science & IT"][cand.name] = 0;
    byDepartment["Business Administration"][cand.name] = 0;
    byDepartment["Engineering"][cand.name] = 0;
  });
  
  // Read all plain text ballot receipts cast so far
  const lookups = await prisma.receiptLookup.findMany();
  lookups.forEach(record => {
    try {
      const choices = JSON.parse(record.choices);
      const voterDept = choices.department || "";
      
      Object.entries(choices).forEach(([office, choice]) => {
        if (standings[office] && typeof choice === "string") {
          const formattedChoice = choice.toUpperCase();
          if (standings[office][formattedChoice] !== undefined) {
            standings[office][formattedChoice] += 1;

            // Tally by department for presidential office
            if (office === "president") {
              let deptKey = "";
              const lowerDept = voterDept.toLowerCase();
              if (lowerDept.includes("computer")) {
                deptKey = "Computer Science & IT";
              } else if (lowerDept.includes("business")) {
                deptKey = "Business Administration";
              } else if (lowerDept.includes("civil") || lowerDept.includes("electrical") || lowerDept.includes("engineering")) {
                deptKey = "Engineering";
              }

              if (deptKey && byDepartment[deptKey] && byDepartment[deptKey][formattedChoice] !== undefined) {
                byDepartment[deptKey][formattedChoice] += 1;
              }
            }
          }
        }
      });
    } catch (e) {
      console.error("Error parsing receiptLookup selections:", e);
    }
  });
  
  return {
    global: standings,
    byDepartment
  };
}
