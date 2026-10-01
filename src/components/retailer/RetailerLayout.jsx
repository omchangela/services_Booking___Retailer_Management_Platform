import React from "react";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  Layers,
  Wallet,
  Coins,
  User,
  LogOut,
  Landmark,
  ShieldCheck,
  PlusCircle,
  ChevronDown,
  Globe,
  Shield
} from "lucide-react";

export const RetailerLayout = ({ children }) => {
  const {
    retailerTab,
    setRetailerTab,
    currentRetailer,
    retailers,
    setCurrentRetailerId,
    setIsRetailerAuthenticated,
    setWalletRechargeModal,
    setCurrentRole
  } = useApp();

  return (
    <div className="portal-layout">
      {/* Sidebar */}
      <aside className="portal-sidebar">
        <div className="portal-sidebar-header">
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "var(--primary)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}
          >
            <Landmark size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#ffffff" }}>
              Retailer<span style={{ color: "#38bdf8" }}>Portal</span>
            </div>
            <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Digital Seva Kendra</div>
          </div>
        </div>

        {/* Retailer Info Snippet */}
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "rgba(255, 255, 255, 0.04)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        >
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {currentRetailer.shopName}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
            <span className="badge badge-green" style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>
              <ShieldCheck size={11} />
              <span>KYC Verified</span>
            </span>
            <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{currentRetailer.cscId}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="portal-sidebar-nav">
          <button
            className={`portal-nav-item ${retailerTab === "dashboard" ? "active" : ""}`}
            onClick={() => setRetailerTab("dashboard")}
          >
            <LayoutDashboard size={18} />
            <span>Kendra Dashboard</span>
          </button>

          <button
            className={`portal-nav-item ${retailerTab === "services" ? "active" : ""}`}
            onClick={() => setRetailerTab("services")}
          >
            <Layers size={18} />
            <span>Assigned Services</span>
          </button>

          <button
            className={`portal-nav-item ${retailerTab === "wallet" ? "active" : ""}`}
            onClick={() => setRetailerTab("wallet")}
          >
            <Wallet size={18} />
            <span>Wallet & Transactions</span>
          </button>

          <button
            className={`portal-nav-item ${retailerTab === "commission" ? "active" : ""}`}
            onClick={() => setRetailerTab("commission")}
          >
            <Coins size={18} />
            <span>Commission Ledger</span>
          </button>

          <button
            className={`portal-nav-item ${retailerTab === "profile" ? "active" : ""}`}
            onClick={() => setRetailerTab("profile")}
          >
            <User size={18} />
            <span>Kendra Profile & KYC</span>
          </button>
        </nav>

        {/* Portal Switchers in Sidebar */}
        <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
            Switch Portals:
          </div>
          <button
            onClick={() => setCurrentRole("public")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#94a3b8",
              fontSize: "0.8rem",
              padding: "0.35rem 0"
            }}
          >
            <Globe size={14} />
            <span>Visit Citizen Website</span>
          </button>

          <button
            onClick={() => setCurrentRole("admin")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#94a3b8",
              fontSize: "0.8rem",
              padding: "0.35rem 0"
            }}
          >
            <Shield size={14} />
            <span>Open Admin Portal</span>
          </button>
        </div>

        {/* Footer with Logout */}
        <div className="portal-sidebar-footer">
          <button
            onClick={() => setIsRetailerAuthenticated(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#f87171",
              fontSize: "0.85rem",
              fontWeight: 600,
              width: "100%"
            }}
          >
            <LogOut size={16} />
            <span>Log Out Kendra</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="portal-main-area">
        {/* Topbar */}
        <header className="portal-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1.25rem", color: "var(--secondary)", textTransform: "capitalize" }}>
                {retailerTab === "dashboard"
                  ? "Kendra Operational Dashboard"
                  : retailerTab === "services"
                  ? "Assigned Government & Business Services"
                  : retailerTab === "wallet"
                  ? "Retailer Wallet & Settlement History"
                  : retailerTab === "commission"
                  ? "Commission Earnings & Service Margins"
                  : "Retailer Kendra Profile & Banking"}
              </h2>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Location: {currentRetailer.city}, {currentRetailer.state}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Quick Switch Retailer dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "none" }}>Kendra:</span>
              <select
                className="form-control"
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem", width: "auto" }}
                value={currentRetailer.id}
                onChange={(e) => setCurrentRetailerId(e.target.value)}
              >
                {retailers.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.shopName} ({r.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Wallet Balance Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "var(--emerald-subtle)",
                border: "1px solid var(--emerald-border)",
                padding: "0.35rem 0.5rem 0.35rem 0.85rem",
                borderRadius: "var(--radius-full)",
                gap: "0.75rem"
              }}
            >
              <div>
                <div style={{ fontSize: "0.68rem", color: "#065f46", textTransform: "uppercase", fontWeight: 700 }}>
                  Wallet Balance
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#047857", lineHeight: 1.1 }}>
                  ₹{currentRetailer.walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
              </div>

              <button
                className="btn btn-emerald btn-sm"
                style={{ padding: "0.35rem 0.7rem", borderRadius: "var(--radius-full)" }}
                onClick={() => setWalletRechargeModal(true)}
              >
                <PlusCircle size={14} />
                <span>Top-up</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="portal-content-body">{children}</main>
      </div>
    </div>
  );
};
