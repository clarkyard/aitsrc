import { startElection, closePolls, submitDecryptionShare, castVote } from "../lib/actions/election";
import { prisma } from "../lib/db";

async function run() {
  console.log("Starting new election...");
  const { shares } = await startElection();
  
  console.log("Casting votes...");
  await castVote("ABS26B00034Y", {
    president: "LISTOWELL PREDANY",
    treasurer: "PRODIGE BENICIA",
    organizer: "WISDOM KAMASA",
    externalAffairs: "SAMUEL KAMARA",
    womensCommissioner: "PRISCILLA INNOCENTIA",
    sportsAndCulture: "ELIAS AWUPIREH"
  });
  await castVote("ENG26B00107Y", {
    president: "CHRIS TETTEH",
    treasurer: "ERICA BANIYIRE",
    organizer: "GENESIS JOHNSON",
    externalAffairs: "CINDY DODOO",
    womensCommissioner: "PATIENCE AGYAYE",
    sportsAndCulture: "CHRISTOPHER ANNOBIL"
  });

  console.log("Closing polls...");
  await closePolls();

  console.log("Submitting shards to trigger decryption ceremony...");
  // Submit Admin 1 Share (shares[0])
  await submitDecryptionShare("admin1", shares[0]);
  // Submit Admin 2 Share (shares[1])
  const res = await submitDecryptionShare("admin2", shares[1]);

  console.log("Ceremony response:", res);
  
  const status = await prisma.electionState.findUnique({ where: { key: "polls_status" } });
  console.log("Final polls status:", status?.value);
}

run();
