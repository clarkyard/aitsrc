import { prisma } from "../lib/db";
import { castVote, startElection } from "../lib/actions/election";
import { CANDIDATES } from "../lib/constants";

async function run() {
  console.log("Resetting election to starting state...");
  await startElection(); // Wipes old votes, creates key pair, sets status to OPEN

  console.log("Fetching all registered voters...");
  const voters = await prisma.voter.findMany();
  
  // Group voters by department
  const csVoters = voters.filter(v => v.department === "Computer Science & IT");
  const bizVoters = voters.filter(v => v.department === "Business Administration");
  const engVoters = voters.filter(v => v.department === "Engineering");

  console.log(`Available CS voters: ${csVoters.length}`);
  console.log(`Available Business voters: ${bizVoters.length}`);
  console.log(`Available Engineering voters: ${engVoters.length}`);

  // Cast 9 votes for CS & IT
  // Winner: LISTOWELL PREDANY (6), CHRIS TETTEH (2), ASARE KUMI (1)
  const csVotes = [
    { pres: "LISTOWELL PREDANY", count: 6 },
    { pres: "CHRIS TETTEH", count: 2 },
    { pres: "ASARE KUMI", count: 1 }
  ];

  // Cast 8 votes for Business Administration
  // Winner: CHRIS TETTEH (5), LISTOWELL PREDANY (2), ASARE KUMI (1)
  const bizVotes = [
    { pres: "CHRIS TETTEH", count: 5 },
    { pres: "LISTOWELL PREDANY", count: 2 },
    { pres: "ASARE KUMI", count: 1 }
  ];

  // Cast 8 votes for Engineering (merged)
  // Winner: ASARE KUMI (5), LISTOWELL PREDANY (2), CHRIS TETTEH (1)
  const engVotes = [
    { pres: "ASARE KUMI", count: 5 },
    { pres: "LISTOWELL PREDANY", count: 2 },
    { pres: "CHRIS TETTEH", count: 1 }
  ];

  // Helper to select random candidate for secondary offices
  const getRandomCandidate = (office: string) => {
    const list = CANDIDATES[office as keyof typeof CANDIDATES];
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex].name;
  };

  const voteForGroup = async (voterList: any[], voteConfig: any[]) => {
    let listIndex = 0;
    for (const config of voteConfig) {
      for (let i = 0; i < config.count; i++) {
        const voter = voterList[listIndex++];
        console.log(`Voting for ${voter.studentId} (${voter.department}) -> President: ${config.pres}`);
        await castVote(voter.studentId, {
          president: config.pres,
          treasurer: getRandomCandidate("treasurer"),
          organizer: getRandomCandidate("organizer"),
          externalAffairs: getRandomCandidate("externalAffairs"),
          womensCommissioner: getRandomCandidate("womensCommissioner"),
          sportsAndCulture: getRandomCandidate("sportsAndCulture")
        });
      }
    }
  };

  console.log("Casting CS & IT votes...");
  await voteForGroup(csVoters, csVotes);

  console.log("Casting Business Admin votes...");
  await voteForGroup(bizVoters, bizVotes);

  console.log("Casting Engineering votes...");
  await voteForGroup(engVoters, engVotes);

  console.log("\n========================================================");
  console.log("SUCCESS: 25 student ballots have been cast successfully!");
  console.log("========================================================\n");
}

run()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
