import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  ShieldAlert,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Globe,
  Sparkles,
  Fingerprint
} from "lucide-react";

export const AdminLogin = () => {
  const {
    setIsAdminAuthenticated,
    notify,
    setCurrentRole
  } = useApp();

  const [username, setUsername] = useState("admin@sevasetu.gov.in");
  const [password, setPassword] = useState("admin123");
  const [securityPin, setSecurityPin] = useState("8821");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation (accepts demo credentials or standard admin)
    if (!username.trim()) {
      setErrorMessage("Please enter an official administrator username or email.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your administrator security password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // In demo mode, accept admin / admin123 or valid admin email
      if (
        username.toLowerCase().includes("admin") ||
        password === "admin123" ||
        password.length >= 4
      ) {
        setIsAdminAuthenticated(true);
        notify("Authenticated successfully as Super Administrator (Rajeev Mehra)", "success");
      } else {
        setErrorMessage("Invalid credentials. Try using demo credentials: admin@sevasetu.gov.in / admin123");
        setIsLoading(false);
      }
    }, 600);
  };

  const handleQuickDemoLogin = (roleType = "superadmin") => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAdminAuthenticated(true);
      if (roleType === "superadmin") {
        notify("Logged in as Super Administrator (Full Privileges)", "success");
      } else {
        notify("Logged in as Operations & Compliance Auditor", "info");
      }
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 41px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem 1.25rem",
        background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 60%, #090d16 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background ambient glowing rings */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)",
          top: "-150px",
          right: "-100px",
          borderRadius: "50%",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(37, 99, 235, 0) 70%)",
          bottom: "-100px",
          left: "-100px",
          borderRadius: "50%",
          pointerEvents: "none"
        }}
      />

      <div
        className="card"
        style={{
          maxWidth: "480px",
          width: "100%",
          padding: "2.5rem 2.25rem",
          background: "rgba(15, 23, 42, 0.92)",
          borderColor: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.15)",
          color: "#ffffff",
          position: "relative",
          zIndex: 1
        }}
      >
        {/* Header with Shield Icon */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "var(--radius-xl)",
              background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <ShieldAlert size={32} />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "0.25rem 0.75rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(99, 102, 241, 0.2)",
              border: "1px solid rgba(129, 140, 248, 0.3)",
              fontSize: "0.75rem",
              color: "#a5b4fc",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.6rem"
            }}
          >
            <Fingerprint size={13} />
            <span>High-Security Management Gateway</span>
          </div>

          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Super Admin Login
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.25rem" }}>
            SevaSetu Platform Governance & Master Settlement Desk
          </p>
        </div>

        {/* 1-Click Quick Demo Login Helper Box */}
        <div
          style={{
            background: "rgba(99, 102, 241, 0.12)",
            border: "1px solid rgba(129, 140, 248, 0.25)",
            borderRadius: "var(--radius-lg)",
            padding: "1rem",
            marginBottom: "1.75rem"
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "#a5b4fc",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: "0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <Sparkles size={14} color="#818cf8" />
            <span>⚡ 1-Click Client Demo Access:</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("superadmin")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.55rem 0.85rem",
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, rgba(79, 70, 229, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} />
                <span>Super Administrator (Rajeev Mehra)</span>
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  background: "rgba(255, 255, 255, 0.25)",
                  padding: "0.15rem 0.45rem",
                  borderRadius: "var(--radius-full)"
                }}
              >
                Full Access
              </span>
            </button>
          </div>

          <div
            style={{
              marginTop: "0.6rem",
              fontSize: "0.725rem",
              color: "#cbd5e1",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>Email: <strong>admin@sevasetu.gov.in</strong></span>
            <span>Password: <strong>admin123</strong></span>
            <span>PIN: <strong>8821</strong></span>
          </div>
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(248, 113, 113, 0.4)",
              borderRadius: "var(--radius-md)",
              padding: "0.75rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.825rem",
              color: "#fca5a5"
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" style={{ color: "#cbd5e1" }}>
              Official Administrator Email / Username
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                color="#94a3b8"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                required
                className="form-control"
                style={{
                  paddingLeft: "2.4rem",
                  background: "rgba(255, 255, 255, 0.06)",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "#ffffff"
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: "#cbd5e1" }}>
              Security Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                color="#94a3b8"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="password"
                required
                className="form-control"
                style={{
                  paddingLeft: "2.4rem",
                  background: "rgba(255, 255, 255, 0.06)",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "#ffffff"
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: "#cbd5e1" }}>
              4-Digit Security Master PIN
            </label>
            <div style={{ position: "relative" }}>
              <KeyRound
                size={16}
                color="#94a3b8"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="password"
                maxLength={4}
                required
                placeholder="4 digits (demo: 8821)"
                className="form-control"
                style={{
                  paddingLeft: "2.4rem",
                  background: "rgba(255, 255, 255, 0.06)",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  letterSpacing: "0.2em",
                  fontWeight: 700
                }}
                value={securityPin}
                onChange={(e) => setSecurityPin(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.85rem",
              fontSize: "0.95rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
              marginTop: "0.5rem",
              boxShadow: "0 10px 20px rgba(79, 70, 229, 0.3)"
            }}
          >
            {isLoading ? (
              <span>Verifying Security Clearance...</span>
            ) : (
              <>
                <span>Sign In to Super Admin Console</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link back to Citizen Website */}
        <div style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.825rem", color: "#94a3b8" }}>
          <span>Not an administrator? </span>
          <button
            type="button"
            onClick={() => setCurrentRole("public")}
            style={{
              color: "#38bdf8",
              fontWeight: 600,
              textDecoration: "underline",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <Globe size={13} />
            <span>Return to Citizen Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
