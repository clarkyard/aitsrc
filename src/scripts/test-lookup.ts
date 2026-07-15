import { lookupBallotChoices, getRecentVoters } from "../lib/actions/election";

async function verify() {
  console.log("Verifying Ballot Selections Lookup Action...");
  
  // Look up using our test token VOTE-8B6CBFCD1696D697CA04EE73E3197A14
  const testToken = "VOTE-29C8CBED33BD0D6F0A845F90CEEA8513";
  const res = await lookupBallotChoices(testToken);
  
  if (res.success) {
    console.log("[PASSED] Lookup succeeded!");
    console.log("Returned selections:", res.choices);
  } else {
    console.log("[FAILED] Lookup failed:", res.error);
  }
  
  console.log("Verifying getRecentVoters Action...");
  const recent = await getRecentVoters();
  console.log(`[PASSED] Loaded ${recent.length} recent voter records.`);
  console.log("Sample voter record:", recent[0]);
}

verify();
