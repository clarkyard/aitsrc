import { prisma } from "../lib/db";
import fs from "fs";
import path from "path";

async function run() {
  console.log("Starting email migration for students...");

  // 1. Update voters_registry.json
  const registryPath = path.join(__dirname, "../lib/voters_registry.json");
  console.log(`Reading registry from ${registryPath}...`);
  const registryRaw = fs.readFileSync(registryPath, "utf-8");
  const registry = JSON.parse(registryRaw);

  const updatedRegistry = registry.map((voter: any) => {
    voter.email = voter.studentId.toLowerCase() + "@student.ait.edu.gh";
    return voter;
  });

  fs.writeFileSync(registryPath, JSON.stringify(updatedRegistry, null, 2), "utf-8");
  console.log(`Updated all ${updatedRegistry.length} voters in voters_registry.json with emails.`);

  // 2. Update SQLite Database Voter records
  console.log("Updating database Voter records with emails...");
  const voters = await prisma.voter.findMany();
  let dbUpdatedCount = 0;

  for (const voter of voters) {
    const email = voter.studentId.toLowerCase() + "@student.ait.edu.gh";
    await prisma.voter.update({
      where: { studentId: voter.studentId },
      data: { email }
    });
    dbUpdatedCount++;
  }

  console.log(`Successfully migrated ${dbUpdatedCount} Voter records in SQLite dev.db.`);
}

run()
  .catch(err => {
    console.error("Email migration failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
