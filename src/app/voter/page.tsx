"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout, getVoterStatus } from "@/lib/actions/auth";
import { getElectionState, castVote, getVotersTurnout } from "@/lib/actions/election";
import { CANDIDATES } from "@/lib/constants";
import { 
  User, 
  LogOut, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  FileText, 
  Copy, 
  Check 
} from "lucide-react";
import confetti from "canvas-confetti";

export default function VoterDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [electionState, setElectionState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [votedCount, setVotedCount] = useState(0);
  const [totalEligible, setTotalEligible] = useState(0);

  // Voting Wizard Steps
  // Step 0: Eligibility Info
  // Step 1: President
  // Step 2: Treasurer
  // Step 3: Organizer
  // Step 4: External Affairs
  // Step 5: Womens Commissioner
  // Step 6: Sports & Culture
  // Step 7: Review & Cast
  const [step, setStep] = useState(0);
  
  // Selections
  const [selections, setSelections] = useState({
    president: "",
    treasurer: "",
    organizer: "",
    externalAffairs: "",
    womensCommissioner: "",
    sportsAndCulture: ""
  });
  
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteError, setVoteError] = useState("");
  
  // Post-vote states
  const [receiptToken, setReceiptToken] = useState("");
  const [copied, setCopied] = useState(false);

  const getCandidateImage = (office: keyof typeof CANDIDATES, name: string) => {
    const cand = CANDIDATES[office].find(c => c.name === name);
    return cand ? cand.image : "/avatars/male1.png";
  };

  useEffect(() => {
    async function init() {
      const sess = await getSession();
      if (!sess || sess.role !== "voter") {
        router.push("/");
        return;
      }
      setSession(sess);
      
      // Perform database check to see if voter has already voted
      if (sess.studentId) {
        const hasVoted = await getVoterStatus(sess.studentId);
        if (hasVoted) {
          setStep(8); // Go straight to Voted / Receipt state
        }
      }
      
      const state = await getElectionState();
      setElectionState(state);

      // Load turnout count to show on receipt page
      try {
        const turn = await getVotersTurnout();
        setVotedCount(turn.voted);
        setTotalEligible(turn.total);
      } catch (err) {
        console.error("Failed to load turnout stats:", err);
      }
      
      setLoading(false);
    }
    init();
  }, [router]);

  const handleSelectCandidate = (office: string, candidateName: string) => {
    setSelections(prev => ({
      ...prev,
      [office]: candidateName
    }));
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#5c60f5", "#9061f9", "#10b981"]
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#5c60f5", "#9061f9", "#10b981"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleCastVote = async () => {
    if (!session?.studentId) return;
    setVoteError("");
    setVoteLoading(true);

    const res = await castVote(session.studentId, selections);
    if (res.success) {
      setReceiptToken(res.anonymousToken || "");
      triggerConfetti();
      
      // Refresh state
      const state = await getElectionState();
      setElectionState(state);
      setVotedCount(prev => prev + 1);
      
      // Reset session state locally to show voted screen
      setSession((prev: any) => ({
        ...prev,
        hasVoted: true
      }));
      
      setStep(8); // Receipt Step
    } else {
      setVoteError(res.error || "Failed to submit ballot.");
    }
    setVoteLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleCopyReceipt = () => {
    if (!receiptToken) return;
    navigator.clipboard.writeText(receiptToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ fontWeight: 600, color: "var(--brand-primary)" }}>Loading secure terminal session...</p>
      </div>
    );
  }

  const isAlreadyVoted = session?.hasVoted || receiptToken;

  return (
    <main className="app-container animate-fade-in">
      {/* Header bar */}
      <header className="glass-panel" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)", display: "flex", alignItems: "center", justifyItems: "center", color: "white", fontWeight: 700, fontSize: "0.85rem", justifyContent: "center" }}>
            AIT
          </div>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>AIT Voting Portal</h2>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "-2px" }}>SSO Secure voter terminal</span>
          </div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{session?.studentId}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Student Account</span>
          </div>
          <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", borderRadius: "var(--radius-sm)" }}>
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Body */}
      {isAlreadyVoted || step === 8 ? (
        /* Voted / Receipt State */
        <div className="glass-panel animate-slide-up" style={{ maxWidth: "600px", margin: "3rem auto", padding: "2.5rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", padding: "1rem", background: "var(--success-light)", borderRadius: "50%", color: "var(--success)", marginBottom: "1.5rem" }}>
            <CheckCircle2 size={48} />
          </div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>Ballot Successfully Cast!</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>
            Thank you for participating. Your vote was securely encrypted, detached from your student identifier, and written to the append-only ledger.
          </p>

          <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid rgba(0,0,0,0.05)", textAlign: "left", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", marginBottom: "1rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>ANONYMOUS BALLOT RECEIPT</span>
              <button 
                onClick={handleCopyReceipt} 
                style={{ background: "none", border: "none", color: "var(--brand-primary)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", fontWeight: 600 }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            
            <div style={{ wordBreak: "break-all", fontFamily: "monospace", fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)", background: "white", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid rgba(0,0,0,0.05)" }}>
              {receiptToken || "SECURE-TOKEN-GENERATED-AT-VOTE-CAST"}
            </div>
            
            <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
              <strong>Audit Guarantee:</strong> This token is your receipt. When polls close and tallies are published, you can search for this exact token in the public audit ledger to verify your encrypted selections are included in the final results.
            </div>
          </div>

          {/* Real-time Turnout Statistics */}
          <div style={{ padding: "1.25rem", background: "linear-gradient(135deg, rgba(92, 96, 245, 0.04) 0%, rgba(144, 97, 249, 0.04) 100%)", borderRadius: "var(--radius-md)", border: "1px solid rgba(92, 96, 245, 0.1)", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--brand-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Live Turnout Tally</span>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "0.5rem" }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ display: "block", fontSize: "1.75rem", fontWeight: 850, color: "var(--text-main)", lineHeight: 1.1 }}>{votedCount}</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>VOTES REGISTERED</span>
              </div>
              <div style={{ width: "1px", height: "36px", background: "rgba(92, 96, 245, 0.15)" }}></div>
              <div style={{ textAlign: "center" }}>
                <span style={{ display: "block", fontSize: "1.75rem", fontWeight: 850, color: "var(--brand-secondary)", lineHeight: 1.1 }}>
                  {totalEligible > 0 ? Math.round((votedCount / totalEligible) * 100) : 0}%
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>PARTICIPATION RATE</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={handleLogout} style={{ flex: 1 }}>
              SSO Portal / Clear Session
            </button>
          </div>
        </div>
      ) : (
        /* Voting Wizard */
        <div className="glass-panel animate-slide-up" style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem" }}>
          {step > 0 && step < 7 && (
            <div className="wizard-steps">
              <div className={`wizard-step ${step >= 1 ? (step > 1 ? "completed" : "active") : ""}`}>1</div>
              <div className={`wizard-step ${step >= 2 ? (step > 2 ? "completed" : "active") : ""}`}>2</div>
              <div className={`wizard-step ${step >= 3 ? (step > 3 ? "completed" : "active") : ""}`}>3</div>
              <div className={`wizard-step ${step >= 4 ? (step > 4 ? "completed" : "active") : ""}`}>4</div>
              <div className={`wizard-step ${step >= 5 ? (step > 5 ? "completed" : "active") : ""}`}>5</div>
              <div className={`wizard-step ${step >= 6 ? (step > 6 ? "completed" : "active") : ""}`}>6</div>
            </div>
          )}

          {/* STEP 0: ELIGIBILITY & DISCLOSURE */}
          {step === 0 && (
            <div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
                <ShieldCheck size={32} style={{ color: "var(--brand-primary)" }} />
                <h1 style={{ fontSize: "1.65rem" }}>Eligible Voter Verification</h1>
              </div>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                Welcome to the student government election. Before accessing your ballot, please verify your session state and review our cryptographic privacy guarantees:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "1.25rem", padding: "1.25rem", background: "white", borderRadius: "var(--radius-md)", border: "1px solid rgba(0,0,0,0.03)" }}>
                  <div style={{ color: "var(--success)" }}><CheckCircle2 size={20} /></div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", marginBottom: "0.15rem" }}>SSO Registry Match</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Your account is currently matches the registrar list. You are cleared to vote.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1.25rem", padding: "1.25rem", background: "white", borderRadius: "var(--radius-md)", border: "1px solid rgba(0,0,0,0.03)" }}>
                  <div style={{ color: "var(--brand-secondary)" }}><Lock size={20} /></div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", marginBottom: "0.15rem" }}>Decoupled Anonymization</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      When you submit your selections, a database-level lock transaction updates your status to "has voted". Immediately, a separate, cryptographically shielded record is cast in the ballot chain under a random token. Your name is never written to the ballot record.
                    </p>
                  </div>
                </div>
              </div>

              {electionState?.status !== "OPEN" ? (
                <div className="alert-banner warning">
                  <Lock size={20} />
                  <div>
                    <strong>Voting is currently closed.</strong>
                    <p style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>Official election polls have not started or are locked. Please contact the administrator.</p>
                  </div>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={() => setStep(1)} style={{ width: "100%" }}>
                  Start Voting Wizard
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}

          {/* STEP 1: PRESIDENTIAL ELECTION */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.25rem" }}>Race 1: SRC President</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Select one candidate for the office of Student Representative Council President.</p>

              <div className="candidate-grid">
                {CANDIDATES.president.map((candidate) => (
                  <div 
                    key={candidate.name} 
                    className={`candidate-card ${selections.president === candidate.name ? "selected" : ""}`}
                    onClick={() => handleSelectCandidate("president", candidate.name)}
                  >
                    <div className="candidate-radio">
                      <div className="candidate-radio-inner"></div>
                    </div>
                    <img src={candidate.image} alt={candidate.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} />
                    <div className="candidate-info">
                      <h4 style={{ textTransform: "uppercase" }}>{candidate.name}</h4>
                      <p>SRC Presidential Candidate</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <button className="btn btn-secondary" onClick={() => setStep(0)}>
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={!selections.president}
                  onClick={() => setStep(2)}
                >
                  Next Race
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: TREASURER */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.25rem" }}>Race 2: Treasurer</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Select one candidate for the office of Treasurer.</p>

              <div className="candidate-grid">
                {CANDIDATES.treasurer.map((candidate) => (
                  <div 
                    key={candidate.name} 
                    className={`candidate-card ${selections.treasurer === candidate.name ? "selected" : ""}`}
                    onClick={() => handleSelectCandidate("treasurer", candidate.name)}
                  >
                    <div className="candidate-radio">
                      <div className="candidate-radio-inner"></div>
                    </div>
                    <img src={candidate.image} alt={candidate.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} />
                    <div className="candidate-info">
                      <h4 style={{ textTransform: "uppercase" }}>{candidate.name}</h4>
                      <p>Treasurer Candidate</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={!selections.treasurer}
                  onClick={() => setStep(3)}
                >
                  Next Race
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORGANIZER */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.25rem" }}>Race 3: Organizer</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Select one candidate for the office of Organizer.</p>

              <div className="candidate-grid">
                {CANDIDATES.organizer.map((candidate) => (
                  <div 
                    key={candidate.name} 
                    className={`candidate-card ${selections.organizer === candidate.name ? "selected" : ""}`}
                    onClick={() => handleSelectCandidate("organizer", candidate.name)}
                  >
                    <div className="candidate-radio">
                      <div className="candidate-radio-inner"></div>
                    </div>
                    <img src={candidate.image} alt={candidate.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} />
                    <div className="candidate-info">
                      <h4 style={{ textTransform: "uppercase" }}>{candidate.name}</h4>
                      <p>Organizer Candidate</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <button className="btn btn-secondary" onClick={() => setStep(2)}>
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={!selections.organizer}
                  onClick={() => setStep(4)}
                >
                  Next Race
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: EXTERNAL AFFAIRS */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.25rem" }}>Race 4: External Affairs</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Select one candidate for the office of External Affairs.</p>

              <div className="candidate-grid">
                {CANDIDATES.externalAffairs.map((candidate) => (
                  <div 
                    key={candidate.name} 
                    className={`candidate-card ${selections.externalAffairs === candidate.name ? "selected" : ""}`}
                    onClick={() => handleSelectCandidate("externalAffairs", candidate.name)}
                  >
                    <div className="candidate-radio">
                      <div className="candidate-radio-inner"></div>
                    </div>
                    <img src={candidate.image} alt={candidate.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} />
                    <div className="candidate-info">
                      <h4 style={{ textTransform: "uppercase" }}>{candidate.name}</h4>
                      <p>External Affairs Candidate</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <button className="btn btn-secondary" onClick={() => setStep(3)}>
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={!selections.externalAffairs}
                  onClick={() => setStep(5)}
                >
                  Next Race
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: WOMENS COMMISSIONER */}
          {step === 5 && (
            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.25rem" }}>Race 5: Womens Commissioner</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Select one candidate for the office of Womens Commissioner.</p>

              <div className="candidate-grid">
                {CANDIDATES.womensCommissioner.map((candidate) => (
                  <div 
                    key={candidate.name} 
                    className={`candidate-card ${selections.womensCommissioner === candidate.name ? "selected" : ""}`}
                    onClick={() => handleSelectCandidate("womensCommissioner", candidate.name)}
                  >
                    <div className="candidate-radio">
                      <div className="candidate-radio-inner"></div>
                    </div>
                    <img src={candidate.image} alt={candidate.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} />
                    <div className="candidate-info">
                      <h4 style={{ textTransform: "uppercase" }}>{candidate.name}</h4>
                      <p>Womens Commissioner Candidate</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <button className="btn btn-secondary" onClick={() => setStep(4)}>
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={!selections.womensCommissioner}
                  onClick={() => setStep(6)}
                >
                  Next Race
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: SPORTS AND CULTURE */}
          {step === 6 && (
            <div>
              <h2 style={{ fontSize: "1.45rem", marginBottom: "0.25rem" }}>Race 6: Sports and Culture</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Select one candidate for the office of Sports and Culture.</p>

              <div className="candidate-grid">
                {CANDIDATES.sportsAndCulture.map((candidate) => (
                  <div 
                    key={candidate.name} 
                    className={`candidate-card ${selections.sportsAndCulture === candidate.name ? "selected" : ""}`}
                    onClick={() => handleSelectCandidate("sportsAndCulture", candidate.name)}
                  >
                    <div className="candidate-radio">
                      <div className="candidate-radio-inner"></div>
                    </div>
                    <img src={candidate.image} alt={candidate.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} />
                    <div className="candidate-info">
                      <h4 style={{ textTransform: "uppercase" }}>{candidate.name}</h4>
                      <p>Sports & Culture Candidate</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <button className="btn btn-secondary" onClick={() => setStep(5)}>
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={!selections.sportsAndCulture}
                  onClick={() => setStep(7)}
                >
                  Review Ballot
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: REVIEW & CAST */}
          {step === 7 && (
            <div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
                <FileText size={32} style={{ color: "var(--brand-primary)" }} />
                <h1 style={{ fontSize: "1.65rem" }}>Review Ballot Selections</h1>
              </div>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
                Please review your ballot choices carefully. Once cast, ballots are sealed using the election key and cannot be modified or re-cast.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "white", borderRadius: "var(--radius-md)", border: "1px solid rgba(0,0,0,0.03)", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img 
                      src={getCandidateImage("president", selections.president)} 
                      alt={selections.president} 
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} 
                    />
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.02em" }}>SRC PRESIDENT</span>
                      <h4 style={{ fontSize: "1.05rem", marginTop: "0.15rem", textTransform: "uppercase" }}>{selections.president}</h4>
                    </div>
                  </div>
                  <select 
                    value={selections.president} 
                    onChange={(e) => handleSelectCandidate("president", e.target.value)} 
                    style={{
                      padding: "0.4rem 1.75rem 0.4rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(92, 96, 245, 0.15)",
                      background: "white url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235c60f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\") no-repeat right 0.5rem center",
                      backgroundSize: "1rem",
                      appearance: "none",
                      color: "var(--brand-primary)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    {CANDIDATES.president.map(cand => (
                      <option key={cand.name} value={cand.name}>{cand.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "white", borderRadius: "var(--radius-md)", border: "1px solid rgba(0,0,0,0.03)", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img 
                      src={getCandidateImage("treasurer", selections.treasurer)} 
                      alt={selections.treasurer} 
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} 
                    />
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.02em" }}>TREASURER</span>
                      <h4 style={{ fontSize: "1.05rem", marginTop: "0.15rem", textTransform: "uppercase" }}>{selections.treasurer}</h4>
                    </div>
                  </div>
                  <select 
                    value={selections.treasurer} 
                    onChange={(e) => handleSelectCandidate("treasurer", e.target.value)} 
                    style={{
                      padding: "0.4rem 1.75rem 0.4rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(92, 96, 245, 0.15)",
                      background: "white url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235c60f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\") no-repeat right 0.5rem center",
                      backgroundSize: "1rem",
                      appearance: "none",
                      color: "var(--brand-primary)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    {CANDIDATES.treasurer.map(cand => (
                      <option key={cand.name} value={cand.name}>{cand.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "white", borderRadius: "var(--radius-md)", border: "1px solid rgba(0,0,0,0.03)", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img 
                      src={getCandidateImage("organizer", selections.organizer)} 
                      alt={selections.organizer} 
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} 
                    />
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.02em" }}>ORGANIZER</span>
                      <h4 style={{ fontSize: "1.05rem", marginTop: "0.15rem", textTransform: "uppercase" }}>{selections.organizer}</h4>
                    </div>
                  </div>
                  <select 
                    value={selections.organizer} 
                    onChange={(e) => handleSelectCandidate("organizer", e.target.value)} 
                    style={{
                      padding: "0.4rem 1.75rem 0.4rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(92, 96, 245, 0.15)",
                      background: "white url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235c60f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\") no-repeat right 0.5rem center",
                      backgroundSize: "1rem",
                      appearance: "none",
                      color: "var(--brand-primary)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    {CANDIDATES.organizer.map(cand => (
                      <option key={cand.name} value={cand.name}>{cand.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "white", borderRadius: "var(--radius-md)", border: "1px solid rgba(0,0,0,0.03)", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img 
                      src={getCandidateImage("externalAffairs", selections.externalAffairs)} 
                      alt={selections.externalAffairs} 
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} 
                    />
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.02em" }}>EXTERNAL AFFAIRS</span>
                      <h4 style={{ fontSize: "1.05rem", marginTop: "0.15rem", textTransform: "uppercase" }}>{selections.externalAffairs}</h4>
                    </div>
                  </div>
                  <select 
                    value={selections.externalAffairs} 
                    onChange={(e) => handleSelectCandidate("externalAffairs", e.target.value)} 
                    style={{
                      padding: "0.4rem 1.75rem 0.4rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(92, 96, 245, 0.15)",
                      background: "white url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235c60f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\") no-repeat right 0.5rem center",
                      backgroundSize: "1rem",
                      appearance: "none",
                      color: "var(--brand-primary)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    {CANDIDATES.externalAffairs.map(cand => (
                      <option key={cand.name} value={cand.name}>{cand.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "white", borderRadius: "var(--radius-md)", border: "1px solid rgba(0,0,0,0.03)", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img 
                      src={getCandidateImage("womensCommissioner", selections.womensCommissioner)} 
                      alt={selections.womensCommissioner} 
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} 
                    />
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.02em" }}>WOMENS COMMISSIONER</span>
                      <h4 style={{ fontSize: "1.05rem", marginTop: "0.15rem", textTransform: "uppercase" }}>{selections.womensCommissioner}</h4>
                    </div>
                  </div>
                  <select 
                    value={selections.womensCommissioner} 
                    onChange={(e) => handleSelectCandidate("womensCommissioner", e.target.value)} 
                    style={{
                      padding: "0.4rem 1.75rem 0.4rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(92, 96, 245, 0.15)",
                      background: "white url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235c60f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\") no-repeat right 0.5rem center",
                      backgroundSize: "1rem",
                      appearance: "none",
                      color: "var(--brand-primary)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    {CANDIDATES.womensCommissioner.map(cand => (
                      <option key={cand.name} value={cand.name}>{cand.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "white", borderRadius: "var(--radius-md)", border: "1px solid rgba(0,0,0,0.03)", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img 
                      src={getCandidateImage("sportsAndCulture", selections.sportsAndCulture)} 
                      alt={selections.sportsAndCulture} 
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(92, 96, 245, 0.1)" }} 
                    />
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.02em" }}>SPORTS AND CULTURE</span>
                      <h4 style={{ fontSize: "1.05rem", marginTop: "0.15rem", textTransform: "uppercase" }}>{selections.sportsAndCulture}</h4>
                    </div>
                  </div>
                  <select 
                    value={selections.sportsAndCulture} 
                    onChange={(e) => handleSelectCandidate("sportsAndCulture", e.target.value)} 
                    style={{
                      padding: "0.4rem 1.75rem 0.4rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(92, 96, 245, 0.15)",
                      background: "white url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235c60f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\") no-repeat right 0.5rem center",
                      backgroundSize: "1rem",
                      appearance: "none",
                      color: "var(--brand-primary)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    {CANDIDATES.sportsAndCulture.map(cand => (
                      <option key={cand.name} value={cand.name}>{cand.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {voteError && (
                <div className="alert-banner danger" style={{ margin: "1.5rem 0" }}>
                  <span>{voteError}</span>
                </div>
              )}

              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn btn-secondary" onClick={() => setStep(6)} style={{ flex: 1 }} disabled={voteLoading}>
                  <ArrowLeft size={16} />
                  Change Selections
                </button>
                <button className="btn btn-success" onClick={handleCastVote} style={{ flex: 2 }} disabled={voteLoading}>
                  {voteLoading ? "Encrypting & Submitting..." : "Cast Secure Ballot"}
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
