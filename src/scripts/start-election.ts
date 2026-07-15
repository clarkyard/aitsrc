import { startElection } from "../lib/actions/election";

async function run() {
  console.log("Starting a new election and setting voting portal to LIVE (OPEN)...");
  try {
    const { shares } = await startElection();
    console.log("\n=================================================================");
    console.log("SUCCESS: The election has been started, and polls are now OPEN!");
    console.log("=================================================================\n");
    console.log("Here are the generated private key decryption shares.");
    console.log("Distribute these to the keyholders (Official Administrators 1, 2, and 3):");
    console.log("-----------------------------------------------------------------");
    shares.forEach((share, index) => {
      console.log(`Share ${index + 1} (Official Administrator ${index + 1}):`);
      console.log(share);
      console.log("-----------------------------------------------------------------");
    });
  } catch (error) {
    console.error("Error starting the election:", error);
  }
}

run();
