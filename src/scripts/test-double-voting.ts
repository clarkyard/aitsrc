import { prisma } from "../lib/db";
import { castVote, startElection } from "../lib/actions/election";
import { seedDatabase } from "../lib/actions/auth";

async function main() {
  console.log("Initializing Double-Voting Concurrency Test...");
  
  // 1. Seed database
  await seedDatabase();
  const studentId = "ABS26B00034Y";
  
  // 2. Start election to clear past results
  console.log("Opening new election...");
  await startElection();
  
  // 3. Try to cast two votes concurrently for student1
  console.log(`Casting two concurrent votes for ${studentId}...`);
  const choicesA = {
    president: "LISTOWELL PREDANY",
    treasurer: "PRODIGE BENICIA",
    organizer: "WISDOM KAMASA",
    externalAffairs: "SAMUEL KAMARA",
    womensCommissioner: "PRISCILLA INNOCENTIA",
    sportsAndCulture: "ELIAS AWUPIREH"
  };
  
  const choicesB = {
    president: "CHRIS TETTEH",
    treasurer: "ERICA BANIYIRE",
    organizer: "GENESIS JOHNSON",
    externalAffairs: "CINDY DODOO",
    womensCommissioner: "PATIENCE AGYAYE",
    sportsAndCulture: "CHRISTOPHER ANNOBIL"
  };

  const results = await Promise.allSettled([
    castVote(studentId, choicesA),
    castVote(studentId, choicesB)
  ]);
  
  let successCount = 0;
  let failCount = 0;
  
  results.forEach((r, idx) => {
    if (r.status === "fulfilled") {
      if (r.value.success) {
        successCount++;
        console.log(`Vote ${idx + 1} Succeeded with token: ${r.value.anonymousToken}`);
      } else {
        failCount++;
        console.log(`Vote ${idx + 1} Failed expectedly: ${r.value.error}`);
      }
    } else {
      failCount++;
      console.log(`Vote ${idx + 1} Rejected:`, r.reason);
    }
  });

  console.log("\n--- CONCURRENCY TEST SUMMARY ---");
  console.log(`Total Successes: ${successCount} (Expected: 1)`);
  console.log(`Total Failures: ${failCount} (Expected: 1)`);
  
  if (successCount === 1 && failCount === 1) {
    console.log("\x1b[32m[PASSED] Concurrency test passed. Double voting was successfully blocked!\x1b[0m");
  } else {
    console.error("\x1b[31m[FAILED] Concurrency test failed. Potential race condition exists!\x1b[0m");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
