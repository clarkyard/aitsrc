"use server";

import { cookies } from "next/headers";
import { prisma } from "../db";

export interface UserSession {
  studentId?: string;
  adminId?: string;
  role: "voter" | "admin";
}

import votersRegistry from "../voters_registry.json";

export async function seedDatabase() {
  const voterCount = await prisma.voter.count();
  if (voterCount < 50) {
    // Clear old mock databases to ensure a clean official transition
    await prisma.voter.deleteMany({});
    
    // Seed voters from official registry
    await prisma.voter.createMany({
      data: votersRegistry,
    });
    
    // Seed initial election state if missing
    const stateCount = await prisma.electionState.count();
    if (stateCount === 0) {
      await prisma.electionState.createMany({
        data: [
          { key: "polls_status", value: "NOT_STARTED" },
          { key: "election_key", value: "" }, 
          { key: "public_key", value: "" },   
        ],
      });
    }
    
    await prisma.auditLog.create({
      data: {
        action: "DATABASE_INITIALIZED",
        details: `Voter registry database populated with ${votersRegistry.length} official student records.`,
      },
    });
  }
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("user_session");
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }
  try {
    return JSON.parse(sessionCookie.value) as UserSession;
  } catch {
    return null;
  }
}

export async function loginVoter(studentId: string): Promise<{ success: boolean; error?: string }> {
  await seedDatabase();
  
  const voter = await prisma.voter.findUnique({
    where: { studentId },
  });
  
  if (!voter) {
    return { success: false, error: "Voter not found in official registry." };
  }
  
  if (voter.hasVoted) {
    return { success: false, error: "ALREADY_VOTED" };
  }
  
  const cookieStore = await cookies();
  cookieStore.set(
    "user_session",
    JSON.stringify({ studentId: voter.studentId, role: "voter" }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 30, // 30 minutes
      path: "/",
    }
  );
  
  await prisma.auditLog.create({
    data: {
      action: "VOTER_LOGIN",
      details: `Voter ${studentId} successfully authenticated via simulated SSO.`,
    },
  });
  
  return { success: true };
}

export async function loginAdmin(adminId: string): Promise<{ success: boolean; error?: string }> {
  await seedDatabase();
  
  const validAdmins = ["admin1", "admin2", "admin3"];
  if (!validAdmins.includes(adminId)) {
    return { success: false, error: "Invalid admin credentials." };
  }
  
  const cookieStore = await cookies();
  cookieStore.set(
    "user_session",
    JSON.stringify({ adminId, role: "admin" }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 30, // 30 minutes
      path: "/",
    }
  );
  
  await prisma.auditLog.create({
    data: {
      action: "ADMIN_LOGIN",
      details: `Administrator ${adminId} logged in.`,
    },
  });
  
  return { success: true };
}

export async function logout(): Promise<void> {
  const session = await getSession();
  if (session) {
    const details = session.role === "voter" 
      ? `Voter ${session.studentId} logged out.` 
      : `Admin ${session.adminId} logged out.`;
      
    await prisma.auditLog.create({
      data: {
        action: "LOGOUT",
        details,
      },
    });
  }
  
  const cookieStore = await cookies();
  cookieStore.delete("user_session");
}

export async function getVotersList() {
  await seedDatabase();
  return prisma.voter.findMany({
    orderBy: { studentId: "asc" },
  });
}

export async function lookupVoterEmail(studentId: string): Promise<string | null> {
  if (!studentId || studentId.trim().length < 5) return null;
  const voter = await prisma.voter.findUnique({
    where: { studentId: studentId.trim().toUpperCase() }
  });
  return voter ? voter.email : null;
}
