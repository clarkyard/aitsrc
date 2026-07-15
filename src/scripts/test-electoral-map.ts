import { castVote } from "../lib/actions/election";

async function run() {
  console.log("Casting mock votes to test Cicero electoral-style map...");

  // 1. CS & IT student votes for LISTOWELL PREDANY (Should color Tech Sector Blue)
  const student1 = "ABS26B00039Y"; 
  console.log(`Casting vote for CS & IT student ${student1} -> LISTOWELL PREDANY`);
  const res1 = await castVote(student1, {
    president: "LISTOWELL PREDANY",
    treasurer: "PRODIGE BENICIA",
    organizer: "WISDOM KAMASA",
    externalAffairs: "SAMUEL KAMARA",
    womensCommissioner: "PRISCILLA INNOCENTIA",
    sportsAndCulture: "ELIAS AWUPIREH"
  });
  console.log("Result 1:", res1);

  // 2. Business student votes for CHRIS TETTEH (Should color Business Sector Red)
  const student2 = "ABS26B00034Y"; 
  console.log(`Casting vote for Business student ${student2} -> CHRIS TETTEH`);
  const res2 = await castVote(student2, {
    president: "CHRIS TETTEH",
    treasurer: "ERICA BANIYIRE",
    organizer: "GENESIS JOHNSON",
    externalAffairs: "CINDY DODOO",
    womensCommissioner: "PATIENCE AGYAYE",
    sportsAndCulture: "CHRISTOPHER ANNOBIL"
  });
  console.log("Result 2:", res2);

  // 3. Engineering student votes for ASARE KUMI (Should color Engineering Sector Gold)
  const student3 = "ENG26B00057Y"; 
  console.log(`Casting vote for Engineering student ${student3} -> ASARE KUMI`);
  const res3 = await castVote(student3, {
    president: "ASARE KUMI",
    treasurer: "WISDOM GRANT",
    organizer: "AFOLABI BRIGHT",
    externalAffairs: "OLIVIA AWUKU",
    womensCommissioner: "AYISHA JUMMEI",
    sportsAndCulture: "JUDE ANSAH-ADDO"
  });
  console.log("Result 3:", res3);

  console.log("\nMock votes cast successfully!");
}

run().catch(console.error);
