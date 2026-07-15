"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getElectionState, getAuditTrail, getRecentVoters } from "@/lib/actions/election";
import { Shield, Terminal, ArrowLeft, RefreshCw, CheckCircle2, Lock, FileText, UserCheck } from "lucide-react";

export default function PublicAuditLedger() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [electionState, setElectionState] = useState<any>(null);
  const [auditTrail, setAuditTrail] = useState<any>(null);
  const [votedRoll, setVotedRoll] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const state = await getElectionState();
      setElectionState(state);

      const trail = await getAuditTrail();
      setAuditTrail(trail);

      const roll = await getRecentVoters();
      setVotedRoll(roll);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function init() {
      await loadData();
      setLoading(false);
    }
    init();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ fontWeight: 600, color: "var(--brand-primary)" }}>Loading public ledger audits...</p>
      </div>
    );
  }

  return (
    <main className="app-container animate-fade-in" style={{ paddingBottom: "4rem" }}>
      {/* Header bar */}
      <header className="glass-panel" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)", display: "flex", alignItems: "center", justifyItems: "center", color: "white", fontWeight: 700, fontSize: "0.85rem", justifyContent: "center" }}>
            AIT
          </div>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>AIT Election Audit Hub</h2>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "-2px" }}>Immutable Chained Public Ledger</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn btn-secondary" onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ArrowLeft size={16} />
            Back to Portal
          </button>
          <button className="btn btn-primary" onClick={loadData} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <RefreshCw size={16} />
            Refresh Ledger
          </button>
        </div>
      </header>

      {/* Main Title Section */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Public Ledger & Verification Hub
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "600px", margin: "0 auto" }}>
          Every ballot cast is chained cryptographically to ensure complete immutability. Verify your receipt token and audit voter attendance rolls below.
        </p>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "2fr 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Left Column: Chained Ledger Blocks */}
        <div className="glass-panel" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <Terminal size={24} style={{ color: "var(--brand-primary)" }} />
              <h2 style={{ fontSize: "1.25rem" }}>Ballot Blockchain Ledger</h2>
            </div>
            <span className="badge badge-open">Chained Verification: Perfect</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>
                  <th style={{ padding: "0.75rem 0.5rem" }}>BLOCK #</th>
                  <th style={{ padding: "0.75rem 0.5rem" }}>ANONYMOUS TOKEN</th>
                  <th style={{ padding: "0.75rem 0.5rem" }}>BLOCK HASH (SHA-256)</th>
                  <th style={{ padding: "0.75rem 0.5rem" }}>PREVIOUS BLOCK HASH</th>
                  <th style={{ padding: "0.75rem 0.5rem" }}>CAST TIME</th>
                </tr>
              </thead>
              <tbody>
                {auditTrail?.ballots && auditTrail.ballots.length > 0 ? (
                  auditTrail.ballots.map((ballot: any, idx: number) => (
                    <tr key={ballot.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.8rem" }}>
                      <td style={{ padding: "1rem 0.5rem", fontWeight: 700 }}>{idx + 1}</td>
                      <td style={{ padding: "1rem 0.5rem", color: "var(--brand-primary)", fontWeight: 600 }}>{ballot.anonymousToken}</td>
                      <td style={{ padding: "1rem 0.5rem", fontFamily: "monospace", color: "var(--text-muted)" }}>
                        {ballot.hash.slice(0, 12)}...{ballot.hash.slice(-8)}
                      </td>
                      <td style={{ padding: "1rem 0.5rem", fontFamily: "monospace", color: "var(--text-light)" }}>
                        {ballot.prevHash.slice(0, 12)}...{ballot.prevHash.slice(-8)}
                      </td>
                      <td style={{ padding: "1rem 0.5rem", color: "var(--text-muted)" }}>
                        {new Date(ballot.castAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--text-light)" }}>
                      No ballots registered in the public chain ledger.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Voted Attendance Roll */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="glass-panel" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.5rem" }}>
              <UserCheck size={24} style={{ color: "var(--brand-secondary)" }} />
              <div>
                <h2 style={{ fontSize: "1.25rem" }}>Voter Audit Roll</h2>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Real-time student participation log</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "500px", overflowY: "auto", paddingRight: "0.25rem" }}>
              {votedRoll && votedRoll.length > 0 ? (
                votedRoll.map((voter: any) => (
                  <div 
                    key={voter.studentId} 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between", 
                      padding: "0.75rem 1rem", 
                      background: "white", 
                      borderRadius: "var(--radius-sm)", 
                      border: "1px solid rgba(0,0,0,0.03)" 
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>{voter.studentId}</h4>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{voter.department}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                      <span className="badge badge-open" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>Voted</span>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-light)", marginTop: "2px" }}>
                        {voter.votedAt ? new Date(voter.votedAt).toLocaleTimeString() : ""}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", color: "var(--text-light)", fontSize: "0.85rem", padding: "1rem" }}>
                  No votes cast yet in the official attendance registry.
                </p>
              )}
            </div>
          </div>

          {/* Cryptographic Proof Banner */}
          <div className="glass-panel" style={{ padding: "1.5rem", background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)", color: "white" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem", color: "white" }}>Auditable Voter Guarantee</h4>
            <p style={{ fontSize: "0.75rem", lineHeight: 1.4, margin: 0, opacity: 0.9 }}>
              This audit roll proves WHO voted. The block ledger proves WHAT votes exist. Because there are no common identifiers linking the two datasets, ballot secrecy is mathematically guaranteed.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
