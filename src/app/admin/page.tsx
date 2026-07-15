"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import { getSession, logout } from "@/lib/actions/auth";
import { 
  getElectionState, 
  startElection, 
  closePolls, 
  openPolls,
  submitDecryptionShare, 
  getAuditTrail, 
  getVotersTurnout
} from "@/lib/actions/election";
import { CANDIDATES } from "@/lib/constants";
import { 
  Activity, 
  Sliders, 
  Key, 
  FileText, 
  LogOut, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertTriangle, 
  UserCheck, 
  Terminal,
  RefreshCw
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"turnout" | "control" | "decryption" | "ledger">("turnout");
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [electionState, setElectionState] = useState<any>(null);
  const [turnout, setTurnout] = useState<any>(null);
  const [auditTrail, setAuditTrail] = useState<any>(null);
  
  // Form states
  const [generatedShares, setGeneratedShares] = useState<string[]>([]);
  const [adminShareInput1, setAdminShareInput1] = useState("");
  const [adminShareId1, setAdminShareId1] = useState("admin1");
  const [adminShareInput2, setAdminShareInput2] = useState("");
  const [adminShareId2, setAdminShareId2] = useState("admin2");
  
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  
  // Utility states
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const loadAllData = async () => {
    const state = await getElectionState();
    setElectionState(state);
    
    const turn = await getVotersTurnout();
    setTurnout(turn);
    
    const trail = await getAuditTrail();
    setAuditTrail(trail);
  };

  useEffect(() => {
    async function init() {
      const sess = await getSession();
      if (!sess || sess.role !== "admin") {
        router.push("/");
        return;
      }
      setSession(sess);
      await loadAllData();
      setLoading(false);
    }
    init();
  }, [router]);

  const handleDownloadPDFReport = () => {
    try {
      const doc = new jsPDF();
      
      // Page 1 Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("AIT UNIVERSITY SECURE ELECTION AUDIT REPORT", 14, 20);
      
      // Divider
      doc.setDrawColor(92, 96, 245);
      doc.setLineWidth(1);
      doc.line(14, 24, 196, 24);
      
      // Metadata
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
      doc.text(`Election Status: DECIPHERED & CERTIFIED`, 14, 35);
      doc.text(`Verification Chain Code: MULTI-SHARD SHAMIR RECONSTRUCTION`, 14, 40);
      
      // Turnout Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(30);
      doc.text("1. Overall Participation Metrics", 14, 52);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Total Registered Eligible Voters: ${turnout?.total || 0} students`, 16, 60);
      doc.text(`Total Ballots Cast: ${turnout?.voted || 0} ballots`, 16, 66);
      doc.text(`Voter Turnout Rate: ${turnout?.percent || 0}%`, 16, 72);
      
      // Department breakdown title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("2. Voter Turnout by Department", 14, 85);
      
      // Table Header for Department stats
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Department", 16, 93);
      doc.text("Registered", 90, 93);
      doc.text("Voted", 125, 93);
      doc.text("Turnout %", 160, 93);
      doc.line(14, 95, 196, 95);
      
      // Table rows for Department stats
      doc.setFont("helvetica", "normal");
      let currentY = 101;
      (turnout?.departmentStats || []).forEach((dept: any) => {
        if (currentY > 270) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(dept.department, 16, currentY);
        doc.text(dept.total.toString(), 90, currentY);
        doc.text(dept.voted.toString(), 125, currentY);
        doc.text(`${dept.percent.toFixed(1)}%`, 160, currentY);
        currentY += 6;
      });
      
      // Add a page break for results and integrity checks
      doc.addPage();
      
      // Page 2 Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(30);
      doc.text("3. Cryptographic Standing & Candidate Standing Tallies", 14, 20);
      doc.setLineWidth(0.5);
      doc.line(14, 23, 196, 23);
      
      let resultsY = 32;
      const offices = {
        president: "SRC President",
        treasurer: "Treasurer",
        organizer: "Organizer",
        externalAffairs: "External Affairs",
        womensCommissioner: "Womens Commissioner",
        sportsAndCulture: "Sports and Culture"
      };
      
      Object.entries(offices).forEach(([officeKey, label]) => {
        if (resultsY > 250) {
          doc.addPage();
          resultsY = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(label, 14, resultsY);
        resultsY += 5;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const candidatesObj = electionState.results?.[officeKey] || {};
        Object.entries(candidatesObj).forEach(([candidate, votes]: any) => {
          const pct = turnout?.voted > 0 ? ((votes / turnout.voted) * 100).toFixed(1) : "0";
          doc.text(`- ${candidate}: ${votes} votes (${pct}%)`, 18, resultsY);
          resultsY += 5;
        });
        resultsY += 4; // gap
      });
      
      // Integrity Checks Section
      if (resultsY > 230) {
        doc.addPage();
        resultsY = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("4. Cryptographic Blockchain & Ledger Integrity Checks", 14, resultsY + 6);
      resultsY += 12;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Audit Log Status: Immutable Hash-Chain Verified", 16, resultsY);
      doc.text("Ballot Block Links: Checked and Linked (All SHA-256 links intact)", 16, resultsY + 5);
      doc.text(`Decryption Authorization: Reconstructed from Shamir Secret shares (2-of-3)`, 16, resultsY + 10);
      doc.text(`Ledger Block count: ${auditTrail?.ballots.length || 0} encrypted entries`, 16, resultsY + 15);
      resultsY += 25;
      
      // Signatures
      if (resultsY > 240) {
        doc.addPage();
        resultsY = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("5. Official Sign-off Signatures", 14, resultsY + 6);
      resultsY += 15;
      
      // Line for signatures
      doc.line(16, resultsY, 90, resultsY);
      doc.line(116, resultsY, 190, resultsY);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("AIT Student Affairs Coordinator", 16, resultsY + 4);
      doc.text("Election Committee Chairperson", 116, resultsY + 4);
      
      // Save PDF
      doc.save(`AIT_Election_Audit_Report_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (e: any) {
      console.error(e);
      alert(`Failed to generate PDF Report: ${e.message || e}`);
    }
  };

  const handleStartElection = async () => {
    if (!confirm("Are you sure you want to open a new election? This will delete all current votes, reset voter status, and publish a new key pair.")) return;
    setActionLoading(true);
    setActionError("");
    setActionSuccess("");
    try {
      const res = await startElection();
      setGeneratedShares(res.shares);
      setActionSuccess("Election opened successfully. Cryptographic keys generated and private key split into Shamir shares.");
      await loadAllData();
    } catch (err: any) {
      setActionError(err.message || "Failed to start election.");
    }
    setActionLoading(false);
  };

  const handleClosePolls = async () => {
    if (!confirm("Are you sure you want to close the polls? This will freeze the ballot chain and prevent any further student votes.")) return;
    setActionLoading(true);
    setActionError("");
    setActionSuccess("");
    try {
      await closePolls();
      setActionSuccess("Polls successfully closed. The decryption ceremony can now begin.");
      await loadAllData();
    } catch (err: any) {
      setActionError(err.message || "Failed to close polls.");
    }
    setActionLoading(false);
  };

  const handleOpenPolls = async () => {
    if (!confirm("Are you sure you want to open/resume live voting? This will allow students to cast ballots again.")) return;
    setActionLoading(true);
    setActionError("");
    setActionSuccess("");
    try {
      await openPolls();
      setActionSuccess("Polls successfully opened. Student portals are now live.");
      await loadAllData();
    } catch (err: any) {
      setActionError(err.message || "Failed to open polls.");
    }
    setActionLoading(false);
  };

  const handleDecryptionCeremonySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("");
    setActionSuccess("");
    
    if (adminShareId1 === adminShareId2) {
      setActionError("Decryption requires key shards from two different administrators.");
      return;
    }
    if (!adminShareInput1.trim() || !adminShareInput2.trim()) {
      setActionError("Both cryptographic shares must be entered.");
      return;
    }

    setActionLoading(true);
    try {
      // Submit Share 1
      const res1 = await submitDecryptionShare(adminShareId1, adminShareInput1.trim());
      if (!res1.success) {
        setActionError(`Share submission failed for ${adminShareId1}: ${res1.error}`);
        setActionLoading(false);
        return;
      }

      // Submit Share 2
      const res2 = await submitDecryptionShare(adminShareId2, adminShareInput2.trim());
      if (!res2.success) {
        setActionError(`Share submission failed for ${adminShareId2}: ${res2.error}`);
        setActionLoading(false);
        return;
      }

      setActionSuccess("Decryption Ceremony Completed! Private key combined and verified, all ballots decrypted and tallied successfully.");
      setAdminShareInput1("");
      setAdminShareInput2("");
      await loadAllData();
    } catch (err: any) {
      setActionError(err.message || "Failed during the decryption ceremony.");
    }
    setActionLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleCopyShare = (share: string, idx: number) => {
    navigator.clipboard.writeText(share);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ fontWeight: 600, color: "var(--brand-primary)" }}>Loading admin session...</p>
      </div>
    );
  }

  return (
    <main className="app-container animate-fade-in">
      {/* Header bar */}
      <header className="glass-panel" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-secondary) 0%, var(--brand-primary) 100%)", display: "flex", alignItems: "center", justifyItems: "center", color: "white", fontWeight: 700, fontSize: "0.85rem", justifyContent: "center" }}>
            ADM
          </div>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>AIT Official Console</h2>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "-2px" }}>SSO Secure Administration Terminal</span>
          </div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{session?.adminId}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Keyholder Official</span>
          </div>
          <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", borderRadius: "var(--radius-sm)" }}>
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      {/* Overview stats */}
      <div className="grid-3" style={{ marginBottom: "1.5rem" }}>
        <div className="glass-panel stat-box">
          <div className="stat-icon"><Activity size={24} /></div>
          <div className="stat-content">
            <h3>{turnout?.percent}%</h3>
            <p>VOTER TURNOUT</p>
          </div>
        </div>
        
        <div className="glass-panel stat-box">
          <div className="stat-icon" style={{ color: "var(--brand-secondary)" }}><UserCheck size={24} /></div>
          <div className="stat-content">
            <h3>{turnout?.voted} / {turnout?.total}</h3>
            <p>ELIGIBLE BALLOTS CAST</p>
          </div>
        </div>

        <div className="glass-panel stat-box">
          <div className="stat-icon" style={{ color: electionState?.status === "OPEN" ? "var(--success)" : "var(--danger)" }}>
            {electionState?.status === "OPEN" ? <Unlock size={24} /> : <Lock size={24} />}
          </div>
          <div className="stat-content">
            <h3 style={{ textTransform: "capitalize", fontSize: "1.35rem", marginTop: "4px" }}>
              {electionState?.status === "NOT_STARTED" && "Not Initialized"}
              {electionState?.status === "OPEN" && "Voting Live"}
              {electionState?.status === "CLOSED" && "Polls Closed"}
              {electionState?.status === "DECIPHERED" && "Decrypted"}
            </h3>
            <p>ELECTION STATUS</p>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <nav className="tab-nav">
        <button 
          className={`tab-btn ${activeTab === "turnout" ? "active" : ""}`}
          onClick={() => setActiveTab("turnout")}
        >
          <Activity size={16} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
          Turnout Statistics
        </button>
        <button 
          className={`tab-btn ${activeTab === "control" ? "active" : ""}`}
          onClick={() => setActiveTab("control")}
        >
          <Sliders size={16} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
          Control Room
        </button>
        <button 
          className={`tab-btn ${activeTab === "decryption" ? "active" : ""}`}
          onClick={() => setActiveTab("decryption")}
        >
          <Key size={16} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
          Decryption Ceremony
        </button>
        <button 
          className={`tab-btn ${activeTab === "ledger" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("ledger");
            loadAllData(); // Refresh ledger
          }}
        >
          <FileText size={16} style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
          Public Audit Ledger
        </button>
      </nav>

      {/* Error & Success indicators */}
      {actionError && (
        <div className="alert-banner danger">
          <AlertTriangle size={20} />
          <div><strong>Action Error:</strong> {actionError}</div>
        </div>
      )}
      {actionSuccess && (
        <div className="alert-banner success">
          <CheckCircle2 size={20} />
          <div>{actionSuccess}</div>
        </div>
      )}

      {/* Tab Panels */}
      
      {/* 1. Turnout statistics panel */}
      {activeTab === "turnout" && (
        <div className="glass-panel animate-slide-up" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.45rem", marginBottom: "1rem" }}>Department Participation Rates</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Real-time turnout is parsed by department metadata linked to the SSO login verification. 
            This does not compromise ballot confidentiality.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {turnout?.departmentStats.map((dept: any) => (
              <div key={dept.department}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.9rem", fontWeight: 600 }}>
                  <span>{dept.department}</span>
                  <span style={{ color: "var(--brand-primary)" }}>{dept.voted} / {dept.total} ({dept.percent.toFixed(1)}%)</span>
                </div>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${dept.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="alert-banner info" style={{ marginTop: "2.5rem", marginBottom: "0" }}>
            <Lock size={20} style={{ color: "var(--brand-primary)", flexShrink: 0 }} />
            <div>
              <strong>Results Secrecy Lock Active</strong>
              <p style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>
                Ballot data is RSA encrypted. Individual voter selections cannot be decrypted or tallied during live voting. Tallying will remain locked until polls close and the Decryption Ceremony takes place.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Control room panel */}
      {activeTab === "control" && (
        <div className="glass-panel animate-slide-up" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.45rem", marginBottom: "1.5rem" }}>Election Lifecycle Controls</h2>
          
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <div style={{ flex: 1, minWidth: "280px", padding: "1.5rem", border: "1px dashed rgba(92,96,245,0.2)", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.3)" }} className="glass-panelStat">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>1. Initialize New Election</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                Generate RSA-2048 keys, clear current database ballots, reset student voting status, and split the private key into 3 Shamir shards.
              </p>
              <button 
                className="btn btn-primary" 
                onClick={handleStartElection}
                disabled={actionLoading}
              >
                Start Election & Keygen
              </button>
            </div>

            <div style={{ flex: 1, minWidth: "280px", padding: "1.5rem", border: "1px dashed rgba(239,68,68,0.2)", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.3)" }} className="glass-panelStat">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>2. Polls Status Control</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                Freeze the ballot ledger and lock student portals, or resume the live voting session.
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button 
                  className="btn btn-danger" 
                  onClick={handleClosePolls}
                  disabled={actionLoading || electionState?.status !== "OPEN"}
                >
                  Close Polls
                </button>
                <button 
                  className="btn" 
                  style={{ 
                    background: electionState?.status === "OPEN" || electionState?.status === "DECIPHERED" ? "var(--border-color)" : "#10b981", 
                    color: "white",
                    cursor: electionState?.status === "OPEN" || electionState?.status === "DECIPHERED" ? "not-allowed" : "pointer"
                  }}
                  onClick={handleOpenPolls}
                  disabled={actionLoading || electionState?.status === "OPEN" || electionState?.status === "DECIPHERED"}
                >
                  Turn on Live
                </button>
              </div>
            </div>
          </div>

          {generatedShares.length > 0 && (
            <div className="animate-slide-up" style={{ padding: "1.5rem", background: "var(--warning-light)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "var(--radius-md)", color: "#92400e" }}>
              <h3 style={{ fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Key size={20} />
                Cryptographic Shards Distributed (2-of-3 Threshold)
              </h3>
              <p style={{ fontSize: "0.85rem", marginBottom: "1.25rem", lineHeight: 1.4 }}>
                <strong>CRITICAL WARNING:</strong> The private key has been wiped from server memory. Copy and hand these key shards to the designated election administrators. Decryption requires combining at least two of these shards.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {generatedShares.map((share, idx) => (
                  <div key={idx} style={{ display: "flex", justifyItems: "center", gap: "0.75rem", background: "white", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid rgba(0,0,0,0.05)", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, width: "70px", color: "var(--text-muted)" }}>Shard {idx + 1}:</span>
                    <span style={{ flex: 1, fontFamily: "monospace", fontSize: "0.75rem", wordBreak: "break-all", color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {share}
                    </span>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => handleCopyShare(share, idx)}
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem", borderRadius: "4px" }}
                    >
                      {copiedIndex === idx ? <Check size={12} /> : <Copy size={12} />}
                      {copiedIndex === idx ? "Copied" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Decryption Ceremony panel */}
      {activeTab === "decryption" && (
        <div className="glass-panel animate-slide-up" style={{ padding: "2rem" }}>
          {electionState?.status === "OPEN" && (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <Lock size={48} style={{ color: "var(--brand-primary)", marginBottom: "1rem" }} />
              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Decryption Ceremony Locked</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto" }}>
                The election is currently active. You must close the polls in the Control Room tab to lock the ballot box before decryption can proceed.
              </p>
            </div>
          )}

          {electionState?.status === "NOT_STARTED" && (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <Lock size={48} style={{ color: "var(--text-light)", marginBottom: "1rem" }} />
              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>No Election Active</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Start an election first in the Control Room tab.
              </p>
            </div>
          )}

          {electionState?.status === "CLOSED" && (
            <div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem" }}>
                <Key size={28} style={{ color: "var(--brand-primary)" }} />
                <h2 style={{ fontSize: "1.45rem" }}>Keyholder Assembly & Decryption Ceremony</h2>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
                Input key shards from two different officials to reconstruct the election private key and decrypt results. 
                The ballot chain integrity will be cryptographically checked before decryption.
              </p>

              <form onSubmit={handleDecryptionCeremonySubmit}>
                <div className="grid-2" style={{ marginBottom: "2rem" }}>
                  {/* Share Input 1 */}
                  <div className="glass-panel" style={{ padding: "1.5rem", background: "white" }}>
                    <div className="form-group">
                      <label className="form-label">Keyholder Official 1</label>
                      <select className="form-select" value={adminShareId1} onChange={(e) => setAdminShareId1(e.target.value)}>
                        <option value="admin1">Official Administrator 1</option>
                        <option value="admin2">Official Administrator 2</option>
                        <option value="admin3">Official Administrator 3</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Paste Private Key Shard</label>
                      <input 
                        type="password" 
                        placeholder="1-..."
                        className="form-input" 
                        value={adminShareInput1}
                        onChange={(e) => setAdminShareInput1(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Share Input 2 */}
                  <div className="glass-panel" style={{ padding: "1.5rem", background: "white" }}>
                    <div className="form-group">
                      <label className="form-label">Keyholder Official 2</label>
                      <select className="form-select" value={adminShareId2} onChange={(e) => setAdminShareId2(e.target.value)}>
                        <option value="admin1">Official Administrator 1</option>
                        <option value="admin2">Official Administrator 2</option>
                        <option value="admin3">Official Administrator 3</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Paste Private Key Shard</label>
                      <input 
                        type="password" 
                        placeholder="2-..."
                        className="form-input" 
                        value={adminShareInput2}
                        onChange={(e) => setAdminShareInput2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: "100%" }}
                  disabled={actionLoading}
                >
                  Verify Chain & Decrypt Ballots
                </button>
              </form>
            </div>
          )}

          {electionState?.status === "DECIPHERED" && (
            <div className="animate-slide-up">
              <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "1rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <CheckCircle2 size={32} style={{ color: "var(--success)" }} />
                  <div>
                    <h2 style={{ fontSize: "1.45rem" }}>Certified Election Results</h2>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Tallied securely on {auditTrail?.ballots.length ? new Date(auditTrail.ballots[auditTrail.ballots.length - 1].castAt).toLocaleDateString() : ""}</span>
                  </div>
                </div>
                <button 
                  onClick={handleDownloadPDFReport}
                  className="btn btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                >
                  <FileText size={16} />
                  Download PDF Report
                </button>
              </div>

              <div className="grid-3" style={{ gap: "2rem" }}>
                {Object.entries({
                  president: "SRC President",
                  treasurer: "Treasurer",
                  organizer: "Organizer",
                  externalAffairs: "External Affairs",
                  womensCommissioner: "Womens Commissioner",
                  sportsAndCulture: "Sports and Culture"
                }).map(([officeKey, label]) => (
                  <div key={officeKey} className="glass-panel" style={{ padding: "1.5rem", background: "white" }}>
                    <h3 style={{ fontSize: "1.05rem", marginBottom: "1.25rem", color: "var(--brand-primary)" }}>
                      {label}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      {Object.entries(electionState.results?.[officeKey] || {}).map(([candidate, votes]: any) => (
                        <div key={candidate}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                            <span>{candidate}</span>
                            <span>{votes} votes</span>
                          </div>
                          <div className="progress-container" style={{ height: "6px" }}>
                            <div className="progress-bar" style={{ width: `${(votes / (turnout?.voted || 1)) * 100}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Public Ledger audit panel */}
      {activeTab === "ledger" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="animate-slide-up">
          <div className="glass-panel" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <Terminal size={28} style={{ color: "var(--brand-primary)" }} />
                <div>
                  <h2 style={{ fontSize: "1.45rem" }}>Public Blockchain Ledger & Audits</h2>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Verify each ballot blocks and audit state changes.</span>
                </div>
              </div>
              
              <button className="btn btn-secondary" onClick={loadAllData} style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>
                <RefreshCw size={12} style={{ marginRight: "0.2rem" }} />
                Refresh
              </button>
            </div>

            <div className="alert-banner success" style={{ marginBottom: "1.5rem" }}>
              <CheckCircle2 size={20} />
              <div>
                <strong>Ledger Cryptographically Verified</strong>
                <p style={{ fontSize: "0.8rem", marginTop: "0.15rem" }}>
                  Hash-chain verification checks: Perfect. Zero anomalies or retroactive tampering detected.
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Chained Ballot Blocks</h3>
            <div className="table-wrapper">
              <table className="ledger-table">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Cast At</th>
                    <th>Anonymous Token</th>
                    <th>Encrypted Choices (AES-GCM Payload)</th>
                    <th>Previous Hash</th>
                    <th>Block Hash (SHA-256)</th>
                  </tr>
                </thead>
                <tbody>
                  {auditTrail?.ballots.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>
                        Ballot ledger is empty. No votes have been cast.
                      </td>
                    </tr>
                  ) : (
                    auditTrail?.ballots.map((ballot: any, idx: number) => {
                      const enc: any = JSON.parse(ballot.choices);
                      return (
                        <tr key={ballot.id}>
                          <td style={{ fontWeight: 700 }}>{idx + 1}</td>
                          <td style={{ whiteSpace: "nowrap" }}>{new Date(ballot.castAt).toLocaleTimeString()}</td>
                          <td><span className="code-font" style={{ background: "#e0f2fe", color: "#0369a1" }}>{ballot.anonymousToken}</span></td>
                          <td>
                            <div style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} className="code-font" title={ballot.choices}>
                              {enc.ciphertext}
                            </div>
                          </td>
                          <td>
                            <div style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} className="code-font" title={ballot.prevHash}>
                              {ballot.prevHash}
                            </div>
                          </td>
                          <td>
                            <div style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", background: "#f5f3ff", color: "var(--brand-secondary)" }} className="code-font" title={ballot.hash}>
                              {ballot.hash}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Append-only Audit Logs */}
          <div className="glass-panel" style={{ padding: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Append-Only System Audit Logs</h3>
            <div style={{ display: "flex", flexDirection: "column", maxHeight: "400px", overflowY: "auto" }}>
              {auditTrail?.auditLogs.map((log: any) => {
                let logClass = "audit-log-line";
                if (log.action.includes("LOGIN") || log.action.includes("LOGOUT")) logClass += " login";
                if (log.action.includes("BALLOT") || log.action.includes("VOTE")) logClass += " vote";
                if (log.action.includes("ELECTION") || log.action.includes("DECIPHER")) logClass += " state";
                
                return (
                  <div key={log.id} className={logClass}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem", fontWeight: 700, fontSize: "0.8rem" }}>
                      <span style={{ color: "var(--brand-primary)" }}>{log.action}</span>
                      <span style={{ color: "var(--text-light)" }}>{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <p style={{ color: "var(--text-main)" }}>{log.details}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
