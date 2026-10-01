import React from "react";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  Users,
  FolderTree,
  FileCheck2,
  Inbox,
  Wallet,
  ShieldAlert,
  Globe,
  Store,
  Landmark,
  ShieldCheck
} from "lucide-react";

export const AdminLayout = ({ children }) => {
  const {
    adminTab,
    setAdminTab,
    setCurrentRole,
    inquiries,
    retailers,
    adminUser,
    setIsAdminAuthenticated,
    notify
  } = useApp();

  const pendingRetailersCount = retailers.filter((r) => r.status === "pending").length;
  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;

  return (
    <div className="portal-layout">
      {/* Sidebar */}
      <aside className="portal-sidebar">
        <div className="portal-sidebar-header">
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #4338ca 0%, #312e81 100%)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}
          >
            <ShieldAlert size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#ffffff" }}>
              Admin<span style={{ color: "#818cf8" }}>Panel</span>
            </div>
            <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Platform Governance</div>
          </div>
        </div>

        {/* Admin Nav */}
        <nav className="portal-sidebar-nav">
          <button
            className={`portal-nav-item ${adminTab === "dashboard" ? "active" : ""}`}
            onClick={() => setAdminTab("dashboard")}
          >
            <LayoutDashboard size={18} />
            <span>Executive Dashboard</span>
          </button>

          <button
            className={`portal-nav-item ${adminTab === "retailers" ? "active" : ""}`}
            onClick={() => setAdminTab("retailers")}
          >
            <Users size={18} />
            <span>Retailer Management</span>
            {pendingRetailersCount > 0 && (
              <span
                style={{
                  marginLeft: "auto",
                  background: "var(--amber)",
                  color: "#000",
                  fontSize: "0.7rem",
                  padding: "0.1rem 0.45rem",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 800
                }}
              >
                {pendingRetailersCount}
              </span>
            )}
          </button>

          <button
            className={`portal-nav-item ${adminTab === "categories" ? "active" : ""}`}
            onClick={() => setAdminTab("categories")}
          >
            <FolderTree size={18} />
            <span>Category Management</span>
          </button>

          <button
            className={`portal-nav-item ${adminTab === "services" ? "active" : ""}`}
            onClick={() => setAdminTab("services")}
          >
            <FileCheck2 size={18} />
            <span>Service Management</span>
          </button>

          <button
            className={`portal-nav-item ${adminTab === "inquiries" ? "active" : ""}`}
            onClick={() => setAdminTab("inquiries")}
          >
            <Inbox size={18} />
            <span>User Inquiries</span>
            {newInquiriesCount > 0 && (
              <span
                style={{
                  marginLeft: "auto",
                  background: "#ef4444",
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  boxShadow: "0 0 8px rgba(239, 68, 68, 0.6)"
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    display: "inline-block"
                  }}
                />
                {newInquiriesCount} New
              </span>
            )}
          </button>

          <button
            className={`portal-nav-item ${adminTab === "wallet" ? "active" : ""}`}
            onClick={() => setAdminTab("wallet")}
          >
            <Wallet size={18} />
            <span>Wallet Operations</span>
          </button>
        </nav>

        {/* Switchers in Sidebar */}
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
            <span>Citizen Website</span>
          </button>

          <button
            onClick={() => setCurrentRole("retailer")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#94a3b8",
              fontSize: "0.8rem",
              padding: "0.35rem 0"
            }}
          >
            <Store size={14} />
            <span>Retailer Kendra View</span>
          </button>
        </div>

        {/* Sidebar Footer with Admin Profile and Logout */}
        <div className="portal-sidebar-footer" style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.85rem"
              }}
            >
              R
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.825rem", color: "#ffffff" }}>
                {adminUser?.name || "Rajeev Mehra"}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                Super Administrator
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsAdminAuthenticated(false);
              notify("Logged out from Super Admin console", "info");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#f87171",
              fontSize: "0.8rem",
              fontWeight: 600,
              padding: "0.35rem 0",
              cursor: "pointer"
            }}
          >
            <span>Log Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="portal-main-area">
        {/* Topbar */}
        <header className="portal-topbar">
          <div>
            <h2 style={{ fontSize: "1.25rem", color: "var(--secondary)" }}>
              {adminTab === "dashboard"
                ? "Platform Executive Dashboard"
                : adminTab === "retailers"
                ? "Retailer Kendra Onboarding & Controls"
                : adminTab === "categories"
                ? "Citizen Service Categories Management"
                : adminTab === "services"
                ? "Services, Pricing & Commission Margins"
                : adminTab === "inquiries"
                ? "Citizen Inquiries & Lead Distribution"
                : "Master Retailer Wallet & Settlement Desk"}
            </h2>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              SevaSetu System Administration & Audit Portal
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {newInquiriesCount > 0 && (
              <button
                type="button"
                onClick={() => setAdminTab("inquiries")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  color: "#b91c1c",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
                title="View incoming citizen inquiries"
              >
                <Inbox size={15} color="#ef4444" />
                <span>{newInquiriesCount} New Citizen Inquiries</span>
              </button>
            )}

            <span className="badge badge-blue">
              Environment: Production Demo
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-full)",
                background: "#f1f5f9",
                border: "1px solid var(--card-border)",
                fontSize: "0.8rem"
              }}
            >
              <ShieldCheck size={15} color="var(--emerald)" />
              <span style={{ fontWeight: 600, color: "var(--secondary)" }}>{adminUser?.name || "Rajeev Mehra"}</span>
              <button
                type="button"
                onClick={() => {
                  setIsAdminAuthenticated(false);
                  notify("Logged out from Super Admin console", "info");
                }}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--rose)",
                  fontWeight: 600,
                  marginLeft: "4px",
                  cursor: "pointer"
                }}
                title="Log out of Super Admin"
              >
                Log Out
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
