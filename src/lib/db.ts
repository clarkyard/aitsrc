import { PrismaClient } from "../generated/client";
import fs from "fs";
import path from "path";

let databaseUrl: string | undefined = undefined;

if (process.env.VERCEL || process.env.NODE_ENV === "production") {
  const tmpDbPath = "/tmp/dev.db";
  const srcDbPath = path.join(process.cwd(), "prisma", "dev.db");

  try {
    if (!fs.existsSync(tmpDbPath)) {
      if (fs.existsSync(srcDbPath)) {
        fs.copyFileSync(srcDbPath, tmpDbPath);
        console.log("Database successfully copied to /tmp/dev.db");
      } else {
        console.error("Source database not found at", srcDbPath);
      }
    }
    databaseUrl = `file:${tmpDbPath}`;
  } catch (err) {
    console.error("Error setting up SQLite in /tmp:", err);
  }
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    ...(databaseUrl ? { datasources: { db: { url: databaseUrl } } } : {}),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
