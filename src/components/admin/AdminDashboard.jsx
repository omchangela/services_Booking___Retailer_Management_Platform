import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Users,
  FolderTree,
  FileCheck2,
  Inbox,
  Wallet,
  Coins,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  PlusCircle
} from "lucide-react";

export const AdminDashboard = () => {
  const {
    retailers,
    categories,
    services,
    inquiries,
    transactions,
    setAdminTab,
    approveRetailer
  } = useApp();

  const totalRetailers = retailers.length;
  const pendingRetailers = retailers.filter((r) => r.status === "pending");
  const activeRetailers = retailers.filter((r) => r.status === "active");

  const totalWalletInCirculation = retailers.reduce(
    (sum, r) => sum + (r.walletBalance || 0),
    0
  );

  const totalCommissionDisbursed = retailers.reduce(
    (sum, r) => sum + (r.totalCommission || 0),
    0
  );

  return (
    <div className="admin-dashboard">
      {/* Metric Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.75rem"
        }}
      >
        <div className="stat-card">
          <div className="stat-info">
            <h4>Total Retailers</h4>
            <div className="stat-value" style={{ color: "var(--primary)" }}>
              {totalRetailers}
            </div>
            <div className="stat-subtext">
              {activeRetailers.length} Active | {pendingRetailers.length} Pending
            </div>
          </div>
          <div className="stat-icon">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card stat-amber">
          <div className="stat-info">
            <h4>Pending Approvals</h4>
            <div className="stat-value" style={{ color: "var(--amber)" }}>
              {pendingRetailers.length}
            </div>
            <div className="stat-subtext">KYC verification needed</div>
          </div>
          <div className="stat-icon icon-amber">
            <AlertCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h4>Total Services</h4>
            <div className="stat-value" style={{ color: "var(--secondary)" }}>
              {services.length}
            </div>
            <div className="stat-subtext">{categories.length} Categories</div>
          </div>
          <div className="stat-icon">
            <FileCheck2 size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h4>Citizen Inquiries</h4>
            <div className="stat-value" style={{ color: "var(--primary)" }}>
              {inquiries.length}
            </div>
            <div className="stat-subtext">
              {inquiries.filter((i) => i.status === "New").length} New Unassigned
            </div>
          </div>
          <div className="stat-icon">
            <Inbox size={24} />
          </div>
        </div>

        <div className="stat-card stat-emerald">
          <div className="stat-info">
            <h4>Wallet Circulation</h4>
            <div className="stat-value" style={{ color: "var(--emerald)" }}>
              ₹{totalWalletInCirculation.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
            <div className="stat-subtext">Retailer balances</div>
          </div>
          <div className="stat-icon icon-emerald">
            <Wallet size={24} />
          </div>
        </div>

        <div className="stat-card stat-indigo">
          <div className="stat-info">
            <h4>Commission Paid</h4>
            <div className="stat-value" style={{ color: "var(--secondary)" }}>
              ₹{totalCommissionDisbursed.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
            <div className="stat-subtext">Total Kendra payouts</div>
          </div>
          <div className="stat-icon icon-indigo">
            <Coins size={24} />
          </div>
        </div>
      </div>

      {/* Real-time New Inquiries Live Alert Banner */}
      {inquiries.filter((i) => i.status === "New").length > 0 && (
        <div
          style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            border: "1px solid #bfdbfe",
            borderRadius: "var(--radius-xl)",
            padding: "1.1rem 1.4rem",
            marginBottom: "1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.08)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "var(--primary)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <Inbox size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "#1e3a8a" }}>
                🔔 {inquiries.filter((i) => i.status === "New").length} New Citizen Service Inquiries Received
              </div>
              <div style={{ fontSize: "0.825rem", color: "#1d4ed8", marginTop: "2px" }}>
                Citizens submitted requests via the public portal (without seeing prices). Automatically routed here for Kendra assignment.
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setAdminTab("inquiries")}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0.55rem 1.15rem" }}
          >
            <span>Review & Assign Inquiries</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Pending Retailers Action Alert if any */}
      {pendingRetailers.length > 0 && (
        <div
          style={{
            background: "var(--amber-subtle)",
            border: "1px solid var(--amber-border)",
            borderRadius: "var(--radius-xl)",
            padding: "1.25rem 1.5rem",
            marginBottom: "1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--amber)"
              }}
            >
              <AlertCircle size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "#92400e" }}>
                {pendingRetailers.length} New Retailer Application Awaiting Admin Review
              </div>
              <div style={{ fontSize: "0.85rem", color: "#78350f" }}>
                {pendingRetailers.map((r) => `${r.shopName} (${r.city})`).join(", ")}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {pendingRetailers.map((r) => (
              <button
                key={r.id}
                className="btn btn-sm btn-emerald"
                onClick={() => approveRetailer(r.id)}
              >
                <CheckCircle2 size={14} />
                <span>Approve {r.shopName.split(" ")[0]}</span>
              </button>
            ))}
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setAdminTab("retailers")}
            >
              <span>Manage All</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Two Columns: Recent Inquiries + Category Health */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {/* Recent Citizen Inquiries */}
        <div className="card" style={{ padding: "1.25rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem"
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.1rem", color: "var(--secondary)" }}>
                Latest Citizen Inquiries
              </h3>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Submitted via public website & portal
              </div>
            </div>

            <button
              onClick={() => setAdminTab("inquiries")}
              style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}
            >
              View All Inquiries ({inquiries.length}) &rarr;
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {inquiries.slice(0, 5).map((inq) => (
              <div
                key={inq.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--card-border)",
                  background: "#ffffff"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--secondary)" }}>
                      {inq.customerName}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      ({inq.city})
                    </span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 500 }}>
                    {inq.serviceName}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    Ref: {inq.id} | {inq.date}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    className={`badge ${
                      inq.status === "Completed"
                        ? "badge-green"
                        : inq.status === "In Progress"
                        ? "badge-blue"
                        : "badge-amber"
                    }`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {inq.status}
                  </span>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>
                    Kendra: {inq.assignedRetailerName?.split(" ")[0] || "Unassigned"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Health & Distribution */}
        <div className="card" style={{ padding: "1.25rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem"
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.1rem", color: "var(--secondary)" }}>
                Categories & Service Portfolio
              </h3>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Active domains and service counts
              </div>
            </div>

            <button
              onClick={() => setAdminTab("categories")}
              style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}
            >
              Manage Categories &rarr;
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {categories.map((cat) => {
              const count = services.filter((s) => s.categoryId === cat.id).length;
              return (
                <div
                  key={cat.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 0.85rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--card-border)",
                    background: "#f8fafc"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--primary-subtle)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Building size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--secondary)" }}>
                        {cat.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Status: <span style={{ color: "var(--emerald)", fontWeight: 600 }}>Active</span>
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-blue" style={{ fontSize: "0.75rem" }}>
                    {count} Services
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
