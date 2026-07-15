"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginVoter, loginAdmin, getSession, lookupVoterEmail } from "@/lib/actions/auth";
import { getElectionState, lookupBallotChoices } from "@/lib/actions/election";
import { Shield, User, Lock, CheckCircle, Database, Server, Key, ArrowRight, Activity, Terminal } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [electionState, setElectionState] = useState<any>(null);
  
  // Tab state: voter vs. admin
  const [activeTab, setActiveTab] = useState<"voter" | "admin">("voter");

  // Voter SSO states
  const [manualVoterId, setManualVoterId] = useState("");
  const [voterError, setVoterError] = useState("");
  const [voterLoading, setVoterLoading] = useState(false);
  const [matchedEmail, setMatchedEmail] = useState<string | null>(null);

  const handleVoterIdChange = async (val: string) => {
    setManualVoterId(val);
    const id = val.trim();
    if (id.length >= 5) {
      try {
        const email = await lookupVoterEmail(id);
        setMatchedEmail(email);
      } catch (err) {
        setMatchedEmail(null);
      }
    } else {
      setMatchedEmail(null);
    }
  };
  
  // Lookup states
  const [lookupToken, setLookupToken] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [lookupResults, setLookupResults] = useState<any>(null);

  // Admin SSO states
  const [selectedAdmin, setSelectedAdmin] = useState("admin1");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const sess = await getSession();
      setSession(sess);
      
      const state = await getElectionState();
      setElectionState(state);
    }
    loadData();
  }, [router]);

  const handleVoterLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setVoterError("");
    setVoterLoading(true);
    
    const targetId = manualVoterId.trim();
    if (!targetId) {
      setVoterError("Please enter your Student ID.");
      setVoterLoading(false);
      return;
    }

    const res = await loginVoter(targetId);
    if (res.success) {
      router.push("/voter");
    } else {
      setVoterError(res.error || "Login failed.");
      setVoterLoading(false);
    }
  };

  const handleLookupReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");
    setLookupResults(null);
    if (!lookupToken.trim()) {
      setLookupError("Please enter your receipt token.");
      return;
    }
    setLookupLoading(true);
    const res = await lookupBallotChoices(lookupToken.trim().toUpperCase());
    if (res.success) {
      setLookupResults(res.choices);
    } else {
      setLookupError(res.error || "Token not found.");
    }
    setLookupLoading(false);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");

    if (!adminPassword) {
      setAdminError("Please enter the administrator password.");
      return;
    }

    setAdminLoading(true);

    const res = await loginAdmin("admin1", adminPassword);
    if (res.success) {
      router.push("/admin");
    } else {
      setAdminError(res.error || "Login failed.");
      setAdminLoading(false);
    }
  };

  return (
    <main className="login-outer-wrapper animate-fade-in">
      <div className="login-gradient-card">


        {/* Branding */}
        <div className="login-branding">
          <Shield size={22} style={{ color: "white" }} />
          <span className="login-branding-logo">AIT ELECTION</span>
        </div>

        {/* Centered White Login Card */}
        <div className="login-white-card animate-slide-up">
          <h2>Welcome Back!</h2>
          <p className="subtitle">
            Please authenticate to access the secure election portal.
          </p>

          {/* Tab Switcher - only show if NOT in the Voter Already-Voted flow */}
          {voterError !== "ALREADY_VOTED" && (
            <div className="login-tabs-container">
              <button 
                type="button"
                className={`login-tab-btn ${activeTab === "voter" ? "active" : ""}`}
                onClick={() => setActiveTab("voter")}
              >
                Student Voter
              </button>
              <button 
                type="button"
                className={`login-tab-btn ${activeTab === "admin" ? "active" : ""}`}
                onClick={() => setActiveTab("admin")}
              >
                Election Official
              </button>
            </div>
          )}

          {/* Voter SSO Tab */}
          {activeTab === "voter" && (
            <div>
              {voterError === "ALREADY_VOTED" ? (
                <div className="alert-banner warning animate-slide-up" style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.25rem", border: "1px solid rgba(234, 179, 8, 0.2)", background: "rgba(254, 252, 232, 0.9)", borderRadius: "var(--radius-md)", margin: 0 }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <Lock size={20} style={{ color: "var(--warning)" }} />
                    <strong style={{ color: "var(--warning)" }}>You have already cast a ballot.</strong>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, margin: 0 }}>
                    Our registers confirm your Student ID has already voted in this election. To protect ballot secrecy, you cannot log in or vote again.
                  </p>
                  
                  <div style={{ marginTop: "0.5rem", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "0.75rem" }}>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "0.4rem", color: "var(--text-muted)" }}>
                      VERIFY YOUR BALLOT (ENTER RECEIPT TOKEN):
                    </label>
                    <form onSubmit={handleLookupReceipt} style={{ display: "flex", gap: "0.5rem" }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g., VOTE-XXXX"
                        value={lookupToken}
                        onChange={(e) => setLookupToken(e.target.value)}
                        style={{ textTransform: "uppercase", flex: 1 }}
                      />
                      <button 
                        type="submit" 
                        className="btn btn-secondary" 
                        disabled={lookupLoading}
                        style={{ padding: "0 1rem", fontSize: "0.85rem", whiteSpace: "nowrap" }}
                      >
                        {lookupLoading ? "Searching..." : "Lookup"}
                      </button>
                    </form>
                  </div>
                  
                  {lookupError && (
                    <div style={{ color: "var(--danger)", fontSize: "0.8rem", fontWeight: 600, marginTop: "0.25rem" }}>
                      {lookupError}
                    </div>
                  )}
                  
                  {lookupResults && (
                    <div className="animate-slide-up" style={{ background: "white", padding: "1rem", borderRadius: "var(--radius-sm)", border: "1px solid rgba(0,0,0,0.05)", fontSize: "0.85rem", color: "var(--text-main)", marginTop: "0.5rem" }}>
                      <strong style={{ display: "block", marginBottom: "0.5rem", color: "var(--brand-primary)", fontSize: "0.85rem" }}>Your Confirmed Selections:</strong>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.15rem" }}>
                          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>SRC President</span>
                          <span style={{ fontWeight: 700, textTransform: "uppercase" }}>{lookupResults.president}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.15rem" }}>
                          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Treasurer</span>
                          <span style={{ fontWeight: 700, textTransform: "uppercase" }}>{lookupResults.treasurer}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.15rem" }}>
                          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Organizer</span>
                          <span style={{ fontWeight: 700, textTransform: "uppercase" }}>{lookupResults.organizer}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.15rem" }}>
                          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>External Affairs</span>
                          <span style={{ fontWeight: 700, textTransform: "uppercase" }}>{lookupResults.externalAffairs}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.15rem" }}>
                          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Womens Commissioner</span>
                          <span style={{ fontWeight: 700, textTransform: "uppercase" }}>{lookupResults.womensCommissioner}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.15rem" }}>
                          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Sports & Culture</span>
                          <span style={{ fontWeight: 700, textTransform: "uppercase" }}>{lookupResults.sportsAndCulture}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setVoterError("");
                      setManualVoterId("");
                      setLookupResults(null);
                      setLookupToken("");
                      setLookupError("");
                    }} 
                    style={{ width: "100%", fontSize: "0.85rem", marginTop: "0.75rem" }}
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVoterLogin}>
                  <div className="form-group">
                    <label className="form-label">Registered Student ID</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g., ABS26B00034Y"
                      value={manualVoterId}
                      onChange={(e) => handleVoterIdChange(e.target.value)}
                      disabled={voterLoading}
                    />
                    {matchedEmail && (
                      <div className="animate-fade-in" style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: 700, marginTop: "0.4rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <CheckCircle size={14} style={{ color: "var(--success)" }} />
                        <span>Verified Email: {matchedEmail}</span>
                      </div>
                    )}
                  </div>

                  {voterError && (
                    <div className="alert-banner danger" style={{ padding: "0.75rem", fontSize: "0.85rem", marginBottom: "1rem" }}>
                      <span>{voterError}</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: "100%", marginTop: "0.5rem" }}
                    disabled={voterLoading}
                  >
                    {voterLoading ? "Authenticating..." : "Login to Vote"}
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Admin SSO Tab */}
          {activeTab === "admin" && (
            <form onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label className="form-label">Administrator Account</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value="Official Administrator (admin1)" 
                  disabled 
                  style={{ background: "#f8fafc", color: "#64748b", cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Admin Security Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  disabled={adminLoading}
                />
              </div>

              {adminError && (
                <div className="alert-banner danger" style={{ padding: "0.75rem", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  <span>{adminError}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-secondary" 
                style={{ width: "100%", marginTop: "0.5rem" }}
                disabled={adminLoading}
              >
                {adminLoading ? "Logging in..." : "Access Admin Console"}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Public Standings Dashboard Link Button */}
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "1.25rem" }}>
            <button 
              onClick={() => router.push("/dashboard")} 
              className="btn btn-secondary" 
              style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.85rem", padding: "0.65rem 1rem" }}
            >
              <Activity size={16} />
              <span>Public Standings Dashboard</span>
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
