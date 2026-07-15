import { prisma } from "../lib/db";
import { verifyChain } from "../lib/crypto";

async function main() {
  console.log("Starting Ballot Ledger Cryptographic Audit...");
  
  const ballots = await prisma.ballot.findMany({
    orderBy: { id: "asc" },
  });
  
  if (ballots.length === 0) {
    console.log("Ledger is empty. No ballots to verify.");
    await prisma.$disconnect();
    return;
  }
  
  const formatted = ballots.map(b => ({
    anonymousToken: b.anonymousToken,
    choices: b.choices,
    prevHash: b.prevHash,
    castAt: b.castAt,
    hash: b.hash
  }));
  
  const audit = verifyChain(formatted);
  
  if (audit.valid) {
    console.log(`\x1b[32m[SUCCESS] Ledger validation complete. Verified ${ballots.length} chained ballots. Zero modifications detected.\x1b[0m`);
  } else {
    console.error(`\x1b[31m[TAMPERING DETECTED] Cryptographic chain broken at ballot index ${audit.errorIndex}!\x1b[0m`);
    process.exit(1);
  }
  
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
