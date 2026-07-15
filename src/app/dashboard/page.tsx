"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getPublicDashboardData } from "@/lib/actions/election";
import { CANDIDATES } from "@/lib/constants";
import { Shield, Activity, User, Sliders, ArrowLeft, RefreshCw, Lock, CheckCircle2, Laptop, Building2, HardHat, Zap, Users, ArrowUp, ArrowDown, Menu, X } from "lucide-react";

const CANDIDATE_COLORS: Record<string, string> = {
  "LISTOWELL PREDANY": "#3b82f6", // Blue (Democrats style)
  "CHRIS TETTEH": "#ef4444",      // Red (Republicans style)
  "ASARE KUMI": "#f59e0b"         // Gold (Yellow)
};

const COLOR_LABELS: Record<string, string> = {
  "LISTOWELL PREDANY": "Blue",
  "CHRIS TETTEH": "Red",
  "ASARE KUMI": "Gold"
};

export default function PublicDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [electionState, setElectionState] = useState<any>(null);
  const [turnout, setTurnout] = useState<any>(null);
  const [liveVoters, setLiveVoters] = useState<any[]>([]);
  const [liveStandings, setLiveStandings] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const [prevFeedLength, setPrevFeedLength] = useState(0);

  useEffect(() => {
    if (liveVoters.length !== prevFeedLength) {
      if (feedContainerRef.current) {
        feedContainerRef.current.scrollTo({
          top: feedContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
      setPrevFeedLength(liveVoters.length);
    }
  }, [liveVoters, prevFeedLength]);

  const getCandidateImage = (office: string, name: string) => {
    const list = CANDIDATES[office as keyof typeof CANDIDATES] || [];
    const cand = list.find((c: any) => c.name === name);
    return cand ? cand.image : "/avatars/male1.png";
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const loadData = async () => {
    try {
      const data = await getPublicDashboardData();
      setElectionState(data.state);
      setTurnout(data.turnout);
      setLiveVoters(data.recentVoters);
      setLiveStandings(data.liveStandings);
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

    // Poll live voter updates every 2 seconds in the background
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ fontWeight: 600, color: "var(--brand-primary)" }}>Loading public dashboard...</p>
      </div>
    );
  }

  // Calculate top two presidential candidates from global standings
  const globalPresident = liveStandings?.global?.president || {};
  const presidentialStandings = Object.entries(globalPresident)
    .map(([name, votes]: any) => {
      const totalPresidentVotes = Object.values(globalPresident).reduce((a: any, b: any) => a + b, 0) as number;
      const pct = totalPresidentVotes > 0 ? parseFloat(((votes / totalPresidentVotes) * 100).toFixed(1)) : 0;
      return { name, votes, pct, image: getCandidateImage("president", name) };
    })
    .sort((a, b) => b.votes - a.votes);

  const topTwoPresidential = presidentialStandings.slice(0, 2);

  // Helper to extract department statistics safely
  const getDeptStats = (deptName: string) => {
    const defaultStats = { total: 0, voted: 0, percent: 0 };
    if (!turnout?.departmentStats) return defaultStats;
    const match = turnout.departmentStats.find((d: any) => 
      d.department.toLowerCase().includes(deptName.toLowerCase())
    );
    return match ? { total: match.total, voted: match.voted, percent: parseFloat(match.percent.toFixed(1)) } : defaultStats;
  };

  const csStats = getDeptStats("Computer Science");
  const bizStats = getDeptStats("Business");
  const engStats = getDeptStats("Engineering");

  // Determine winner for each department
  const getDepartmentWinner = (deptKey: string) => {
    const deptVotes = liveStandings?.byDepartment?.[deptKey] || {};
    let winner = "";
    let maxVotes = 0;
    let isTie = false;
    
    Object.entries(deptVotes).forEach(([candName, votes]: any) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        winner = candName;
        isTie = false;
      } else if (votes === maxVotes && votes > 0) {
        isTie = true;
      }
    });

    if (maxVotes === 0) return { winner: "Undeclared", color: "#cbd5e1", votes: 0 };
    if (isTie) return { winner: "Tie", color: "#94a3b8", votes: maxVotes }; // Tie is Slate Gray
    return { 
      winner, 
      color: CANDIDATE_COLORS[winner] || "#cbd5e1", 
      votes: maxVotes 
    };
  };

  const csWinner = getDepartmentWinner("Computer Science & IT");
  const bizWinner = getDepartmentWinner("Business Administration");
  const engWinner = getDepartmentWinner("Engineering");

  return (
    <div className="dashboard-app-layout animate-fade-in">
      
      {/* 1. Left Sidebar: Other Contesting Candidate Categories */}
      <aside className="dashboard-sidebar-left">
        <div className="sidebar-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <Sliders size={18} style={{ color: "var(--brand-primary)" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a" }}>OTHER RACES</h3>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Live secondary candidate standings</span>
        </div>
        <div className="sidebar-scrollable-content">
          {Object.entries({
            treasurer: "Treasurer",
            organizer: "Organizer",
            externalAffairs: "External Affairs",
            womensCommissioner: "Womens Commissioner",
            sportsAndCulture: "Sports & Culture"
          }).map(([officeKey, label]) => {
            const officeStandings = liveStandings?.global?.[officeKey] || {};
            const totalOfficeVotes = Object.values(officeStandings).reduce((a: any, b: any) => a + b, 0) as number;
            
            return (
              <div key={officeKey} className="sidebar-category-panel">
                <div className="sidebar-category-title">{label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {Object.entries(officeStandings)
                    .sort((a: any, b: any) => b[1] - a[1])
                    .map(([candidate, votes]: any, index: number) => {
                      const pct = totalOfficeVotes > 0 ? parseFloat(((votes / totalOfficeVotes) * 100).toFixed(1)) : 0;
                      const isTop1 = index === 0;
                      const isTop2 = index === 1;
                      
                      let arrow = null;
                      if (index === 0) {
                        arrow = <ArrowUp size={14} style={{ color: "#10b981", flexShrink: 0 }} />;
                      } else {
                        arrow = <ArrowDown size={14} style={{ color: "#ef4444", flexShrink: 0 }} />;
                      }

                      return (
                        <div key={candidate} className="sidebar-candidate-row" style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
                          {arrow}
                          <img 
                            src={getCandidateImage(officeKey, candidate)} 
                            alt={candidate} 
                            style={{ 
                              width: "32px", 
                              height: "32px", 
                              borderRadius: "50%", 
                              objectFit: "cover", 
                              border: "1px solid rgba(0, 0, 0, 0.08)", 
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
                              flexShrink: 0 
                            }} 
                          />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="sidebar-cand-info" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <span className="sidebar-cand-name" title={candidate} style={{ maxWidth: "100%", fontSize: "0.8rem", fontWeight: 700 }}>{candidate}</span>
                            <span className="sidebar-cand-votes" style={{ fontSize: "0.75rem", flexShrink: 0 }}>{votes} ({pct}%)</span>
                          </div>
                          <div className="progress-container" style={{ height: "4px", marginTop: "4px" }}>
                            <div className="progress-bar" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* 2. Middle Content: Presidential Showcase & Department Electoral Map */}
      <main className="dashboard-content-middle">
        
        {/* Middle Header */}
        <header className="middle-header" style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)", display: "flex", alignItems: "center", justifyItems: "center", color: "white", fontWeight: 700, fontSize: "0.85rem", justifyContent: "center" }}>
              AIT
            </div>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>AIT Public Standings</h2>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "-3px" }}>Cryptographically verified standings</span>
            </div>
          </div>

          <div className="header-actions-desktop">
            <button className="btn btn-secondary" onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
              <ArrowLeft size={16} />
              Portal
            </button>
            <button className="btn btn-primary" onClick={handleManualRefresh} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
              <RefreshCw size={16} className={refreshing ? "spin-icon" : ""} />
              Refresh
            </button>
          </div>

          <button className="header-hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Actions Menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {menuOpen && (
            <div className="mobile-menu-dropdown">
              <button className="btn btn-secondary mobile-menu-btn" onClick={() => { setMenuOpen(false); router.push("/"); }}>
                <ArrowLeft size={16} />
                Portal
              </button>
              <button className="btn btn-primary mobile-menu-btn" onClick={() => { setMenuOpen(false); handleManualRefresh(); }}>
                <RefreshCw size={16} className={refreshing ? "spin-icon" : ""} />
                Refresh
              </button>
            </div>
          )}
        </header>

        {/* Middle Scrollable Main Content */}
        <div className="middle-scrollable-content">
          
          {/* Key Stats Cards Grid */}
          <div className="stats-grid">
            {/* Card 1: Voter Turnout */}
            <div className="stat-card-responsive">
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#f1f0fe", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand-primary)", flexShrink: 0 }}>
                <Activity size={22} />
              </div>
              <div className="stat-card-content">
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "#0f172a", lineHeight: "1.2" }}>{turnout?.percent || 0}%</h3>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase" }}>Voter Turnout</span>
              </div>
            </div>

            {/* Card 2: Eligible Ballots Cast */}
            <div className="stat-card-responsive">
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#f1f0fe", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand-primary)", flexShrink: 0 }}>
                <User size={22} />
              </div>
              <div className="stat-card-content">
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "#0f172a", lineHeight: "1.2" }}>{turnout?.voted || 0} / {turnout?.total || 0}</h3>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase" }}>Ballots Cast</span>
              </div>
            </div>

            {/* Card 3: Election Status */}
            <div className="stat-card-responsive">
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#f1f0fe", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", flexShrink: 0 }}>
                <Lock size={22} style={{ color: "#10b981" }} />
              </div>
              <div className="stat-card-content">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#0f172a", lineHeight: "1.2" }}>
                    {electionState?.status === "OPEN" ? "Voting Live" : electionState?.status === "CLOSED" ? "Polls Closed" : electionState?.status === "DECIPHERED" ? "Decrypted" : "Not Started"}
                  </h3>
                  {electionState?.status === "OPEN" && (
                    <span className="pulse-green-dot" style={{ marginLeft: "0.25rem", width: "8px", height: "8px" }} title="Portal is live"></span>
                  )}
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase" }}>Election Status</span>
              </div>
            </div>
          </div>

          {/* Presidential Top Candidates Section */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Activity size={20} style={{ color: "var(--brand-primary)" }} />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>SRC PRESIDENTIAL RACE</h3>
            </div>
            
            <div className="president-showcase-container">
              {topTwoPresidential.map((cand: any, idx: number) => {
                const color = CANDIDATE_COLORS[cand.name] || "var(--brand-primary)";
                return (
                  <div key={cand.name} className={`president-showcase-card ${idx === 1 ? "second" : ""}`} style={{ borderColor: `${color}40` }}>
                    <img src={cand.image} alt={cand.name} className="president-avatar-big" style={{ borderColor: `${color}30` }} />
                    
                    <div className="president-info">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="president-rank" style={{ color }}>{idx === 0 ? "Leading" : "Runner Up"} ({COLOR_LABELS[cand.name]})</span>
                      </div>
                      <h4 className="president-name" title={cand.name}>{cand.name}</h4>
                      
                      <div className="president-stats">
                        <span className="president-pct" style={{ color }}>{cand.pct}%</span>
                        <span className="president-votes">{cand.votes} {cand.votes === 1 ? "vote" : "votes"}</span>
                      </div>
                      
                      <div className="progress-container" style={{ height: "6px", marginTop: "0.5rem" }}>
                        <div className="progress-bar" style={{ width: `${cand.pct}%`, background: color }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Department Electoral Map Section */}
          <section className="map-infographic-panel">
            <h3 className="map-infographic-title">
              <Shield size={20} style={{ color: "var(--brand-primary)" }} />
              <span>Electoral Breakdown Map</span>
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", marginTop: "-0.75rem" }}>
              Region map coloring sectors based on which Presidential contestant is currently leading.
            </p>

            <div className="map-layout-grid">
              
              {/* Cicero Style SVG Electoral Map */}
              <div style={{ width: "100%", background: "#f8fafc", borderRadius: "16px", padding: "1.5rem", border: "1px solid rgba(0,0,0,0.03)" }}>
                <svg viewBox="0 0 540 320" style={{ width: "100%", height: "auto" }}>
                  
                  {/* Region 1: Tech Sector (Computer Science & IT) */}
                  <g style={{ transition: "all 0.3s" }}>
                    <path 
                      d="M 20 20 H 250 V 170 H 140 V 290 H 20 Z" 
                      fill={csWinner.color} 
                      stroke="white" 
                      strokeWidth="4" 
                      style={{ transition: "fill 0.3s ease" }}
                    />
                    {/* CS Text details at centroid (100, 140) */}
                    <text x="100" y="115" fill={csWinner.winner === "Undeclared" ? "#475569" : "white"} textAnchor="middle" style={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.05em" }}>TECH SECTOR</text>
                    <text x="100" y="135" fill={csWinner.winner === "Undeclared" ? "#64748b" : "white"} textAnchor="middle" style={{ fontSize: "0.65rem", fontWeight: 600 }}>CS & IT</text>
                    <text x="100" y="160" fill={csWinner.winner === "Undeclared" ? "#0f172a" : "white"} textAnchor="middle" style={{ fontWeight: 800, fontSize: "0.85rem" }}>
                      {csWinner.winner === "Undeclared" ? "No Votes" : csWinner.winner === "Tie" ? "TIE" : csWinner.winner.split(" ")[0]}
                    </text>
                    {csWinner.votes > 0 && (
                      <text x="100" y="180" fill={csWinner.winner === "Undeclared" ? "#64748b" : "white"} textAnchor="middle" style={{ fontSize: "0.65rem", opacity: 0.9 }}>{csWinner.votes} {csWinner.votes === 1 ? "vote" : "votes"}</text>
                    )}
                  </g>

                  {/* Region 2: Business Sector (Business Administration) */}
                  <g style={{ transition: "all 0.3s" }}>
                    <path 
                      d="M 250 20 H 520 V 150 H 320 V 170 H 250 Z" 
                      fill={bizWinner.color} 
                      stroke="white" 
                      strokeWidth="4" 
                      style={{ transition: "fill 0.3s ease" }}
                    />
                    {/* Business Text details at centroid (385, 90) */}
                    <text x="385" y="65" fill={bizWinner.winner === "Undeclared" ? "#475569" : "white"} textAnchor="middle" style={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.05em" }}>BUSINESS SECTOR</text>
                    <text x="385" y="85" fill={bizWinner.winner === "Undeclared" ? "#64748b" : "white"} textAnchor="middle" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Business Admin</text>
                    <text x="385" y="110" fill={bizWinner.winner === "Undeclared" ? "#0f172a" : "white"} textAnchor="middle" style={{ fontWeight: 800, fontSize: "0.85rem" }}>
                      {bizWinner.winner === "Undeclared" ? "No Votes" : bizWinner.winner === "Tie" ? "TIE" : bizWinner.winner.split(" ")[0]}
                    </text>
                    {bizWinner.votes > 0 && (
                      <text x="385" y="130" fill={bizWinner.winner === "Undeclared" ? "#64748b" : "white"} textAnchor="middle" style={{ fontSize: "0.65rem", opacity: 0.9 }}>{bizWinner.votes} {bizWinner.votes === 1 ? "vote" : "votes"}</text>
                    )}
                  </g>

                  {/* Region 3: Engineering Sector (Merged) */}
                  <g style={{ transition: "all 0.3s" }}>
                    <path 
                      d="M 250 170 H 320 V 150 H 520 V 290 H 140 V 170 Z" 
                      fill={engWinner.color} 
                      stroke="white" 
                      strokeWidth="4" 
                      style={{ transition: "fill 0.3s ease" }}
                    />
                    {/* Engineering Text details at centroid (330, 230) */}
                    <text x="330" y="205" fill={engWinner.winner === "Undeclared" ? "#475569" : "white"} textAnchor="middle" style={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.05em" }}>ENGINEERING SECTOR</text>
                    <text x="330" y="225" fill={engWinner.winner === "Undeclared" ? "#64748b" : "white"} textAnchor="middle" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Merged Engineering</text>
                    <text x="330" y="250" fill={engWinner.winner === "Undeclared" ? "#0f172a" : "white"} textAnchor="middle" style={{ fontWeight: 800, fontSize: "0.85rem" }}>
                      {engWinner.winner === "Undeclared" ? "No Votes" : engWinner.winner === "Tie" ? "TIE" : engWinner.winner.split(" ")[0]}
                    </text>
                    {engWinner.votes > 0 && (
                      <text x="330" y="270" fill={engWinner.winner === "Undeclared" ? "#64748b" : "white"} textAnchor="middle" style={{ fontSize: "0.65rem", opacity: 0.9 }}>{engWinner.votes} {engWinner.votes === 1 ? "vote" : "votes"}</text>
                    )}
                  </g>
                </svg>
              </div>

              {/* Electoral Map Legend */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "0.5rem" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", margin: 0, textTransform: "uppercase" }}>Electoral Legend</h4>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {Object.entries(CANDIDATE_COLORS).map(([name, color]) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "4px", backgroundColor: color, border: "1px solid rgba(0,0,0,0.06)" }}></div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e293b" }}>{name}</span>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Assigned: {COLOR_LABELS[name]} Color</span>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem", borderTop: "1px solid #f8fafc", paddingTop: "0.5rem" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "4px", backgroundColor: "#cbd5e1", border: "1px solid rgba(0,0,0,0.06)" }}></div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b" }}>Undeclared / No Votes</span>
                  </div>
                </div>

                {/* Turnout details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <div className="progress-container" style={{ height: "4px" }}></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    <span style={{ fontWeight: 600 }}>Total Turnout Status:</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>{turnout?.percent || 0}% ({turnout?.voted || 0} cast)</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Turnout Details List */}
          <section className="glass-panel" style={{ padding: "1.5rem" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Users size={18} style={{ color: "var(--brand-primary)" }} />
              <span>Department Participation Details</span>
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
              {[
                { name: "Computer Science & IT", stats: csStats, icon: Laptop },
                { name: "Business Administration", stats: bizStats, icon: Building2 },
                { name: "Engineering", stats: engStats, icon: HardHat }
              ].map(dept => {
                const Icon = dept.icon;
                return (
                  <div key={dept.name} className="map-department-building" style={{ margin: 0 }}>
                    <div className="building-icon-wrapper" style={{ background: "rgba(92, 96, 245, 0.06)", color: "var(--brand-primary)" }}>
                      <Icon size={22} />
                    </div>
                    <div className="building-details">
                      <span className="building-name">{dept.name}</span>
                      <div className="building-turnout-stats">
                        <span>{dept.stats.voted} / {dept.stats.total} voted</span>
                        <span>{dept.stats.percent}%</span>
                      </div>
                      <div className="progress-container" style={{ height: "5px", marginTop: "2px" }}>
                        <div className="progress-bar" style={{ width: `${dept.stats.percent}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      {/* 3. Right Sidebar: Live Voter Feed */}
      <aside className="dashboard-sidebar-right">
        <div className="sidebar-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }}></span>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a" }}>LIVE VOTER FEED</h3>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Dynamic real-time voter verification stream</span>
        </div>
        <div className="sidebar-scrollable-content" ref={feedContainerRef} style={{ maxHeight: "calc(100vh - 100px)", padding: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {liveVoters && liveVoters.length > 0 ? (
              [...liveVoters].reverse().map((voter: any) => (
                <div 
                  key={voter.studentId} 
                  style={{ 
                    padding: "0.85rem 1rem", 
                    background: "#f8fafc", 
                    borderRadius: "var(--radius-md)", 
                    border: "1px solid rgba(0,0,0,0.03)", 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "0.3rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
                  }}
                >
                  <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "#0f172a" }}>{voter.studentId}</span>
                    <span style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem", borderRadius: "9999px", background: "var(--success-light)", color: "var(--success)", fontWeight: 700 }}>VERIFIED</span>
                  </div>
                  <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "center", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    <span style={{ fontWeight: 500 }}>{voter.department}</span>
                    <span>{voter.votedAt ? new Date(voter.votedAt).toLocaleTimeString() : ""}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", color: "var(--text-light)", fontSize: "0.8rem", padding: "2rem" }}>
                Waiting for student ballots to be cast...
              </p>
            )}
          </div>
        </div>
      </aside>

    </div>
  );
}
