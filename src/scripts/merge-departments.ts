import { prisma } from "../lib/db";
import fs from "fs";
import path from "path";

async function run() {
  console.log("Merging Civil Engineering and Electrical Engineering into 'Engineering'...");

  // 1. Update voters_registry.json
  const registryPath = path.join(__dirname, "../lib/voters_registry.json");
  console.log(`Reading registry from ${registryPath}...`);
  const registryRaw = fs.readFileSync(registryPath, "utf-8");
  const registry = JSON.parse(registryRaw);

  let registryUpdatedCount = 0;
  const updatedRegistry = registry.map((voter: any) => {
    if (voter.department === "Civil Engineering" || voter.department === "Electrical Engineering") {
      voter.department = "Engineering";
      registryUpdatedCount++;
    }
    return voter;
  });

  fs.writeFileSync(registryPath, JSON.stringify(updatedRegistry, null, 2), "utf-8");
  console.log(`Updated ${registryUpdatedCount} voters in voters_registry.json.`);

  // 2. Update SQLite Database
  console.log("Updating database Voter records...");
  const updateResult = await prisma.voter.updateMany({
    where: {
      department: {
        in: ["Civil Engineering", "Electrical Engineering"]
      }
    },
    data: {
      department: "Engineering"
    }
  });
  console.log(`Updated ${updateResult.count} Voter records in SQLite dev.db.`);
}

run()
  .catch(err => {
    console.error("Migration failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
