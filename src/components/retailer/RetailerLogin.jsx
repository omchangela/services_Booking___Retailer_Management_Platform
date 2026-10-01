import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Landmark, Lock, Phone, ArrowRight, ShieldCheck, CheckCircle2, UserCheck, HelpCircle } from "lucide-react";

export const RetailerLogin = () => {
  const {
    retailers,
    setCurrentRetailerId,
    setIsRetailerAuthenticated,
    notify
  } = useApp();

  const [mobileOrEmail, setMobileOrEmail] = useState("9876543210");
  const [password, setPassword] = useState("••••••••");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotMobile, setForgotMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsRetailerAuthenticated(true);
    notify("Welcome back, Ramesh Digital Seva Kendra!", "success");
  };

  const handleQuickDemoLogin = (retailerId) => {
    setCurrentRetailerId(retailerId);
    setIsRetailerAuthenticated(true);
    const ret = retailers.find((r) => r.id === retailerId);
    notify(`Logged in as ${ret?.shopName || "Retailer"}`, "success");
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "460px",
          width: "100%",
          padding: "2.5rem 2rem",
          boxShadow: "var(--shadow-xl)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "var(--radius-lg)",
              background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <Landmark size={28} />
          </div>
          <h2 style={{ fontSize: "1.75rem", color: "var(--secondary)", marginBottom: "0.4rem" }}>
            Retailer Kendra Login
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Access assigned services, wallet top-ups & commission reports
          </p>
        </div>

        {/* 1-Click Demo Login Presets */}
        <div
          style={{
            background: "var(--primary-subtle)",
            border: "1px solid var(--primary-border)",
            borderRadius: "var(--radius-md)",
            padding: "1rem",
            marginBottom: "1.5rem"
          }}
        >
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            ⚡ 1-Click Client Demo Login:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {retailers.slice(0, 2).map((ret) => (
              <button
                key={ret.id}
                type="button"
                onClick={() => handleQuickDemoLogin(ret.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.45rem 0.75rem",
                  background: "#ffffff",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--card-border)",
                  fontSize: "0.825rem",
                  fontWeight: 600,
                  color: "var(--secondary)"
                }}
              >
                <span>{ret.shopName} ({ret.city})</span>
                <span className="badge badge-green" style={{ fontSize: "0.7rem" }}>Active</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Registered Mobile or CSC ID</label>
            <div style={{ position: "relative" }}>
              <Phone size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                required
                className="form-control"
                style={{ paddingLeft: "2.4rem" }}
                value={mobileOrEmail}
                onChange={(e) => setMobileOrEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500 }}
              >
                Forgot Password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="password"
                required
                className="form-control"
                style={{ paddingLeft: "2.4rem" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.85rem", marginTop: "0.5rem" }}>
            <span>Sign In to Kendra Panel</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Want to become an authorized SevaSetu Retailer?{" "}
          <button
            onClick={() => alert("Retailer self-registration mockup: You can also add or approve retailers in the Admin Portal!")}
            style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "underline" }}
          >
            Register Kendra
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px" }}>
            <div className="modal-header">
              <h3>Reset Kendra Password</h3>
              <button className="modal-close-btn" onClick={() => setShowForgotModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {otpSent ? (
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  <CheckCircle2 size={36} color="var(--emerald)" style={{ margin: "0 auto 0.5rem" }} />
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    Demo OTP has been sent to your registered mobile number: <strong>98765 43210</strong>.
                  </p>
                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <input type="text" placeholder="Enter 6-digit OTP (e.g. 482910)" className="form-control" defaultValue="482910" />
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => {
                      notify("Password reset link verified! You may log in now.", "success");
                      setShowForgotModal(false);
                      setOtpSent(false);
                    }}
                  >
                    Verify & Reset
                  </button>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                    Enter your 10-digit registered mobile number to receive a verification OTP.
                  </p>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      className="form-control"
                      value={forgotMobile}
                      onChange={(e) => setForgotMobile(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => setOtpSent(true)}
                  >
                    Send OTP SMS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
