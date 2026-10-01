import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Wallet,
  TrendingUp,
  Layers,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Coins,
  PlusCircle,
  FileCheck,
  UserCheck,
  ArrowRight
} from "lucide-react";

export const RetailerDashboard = () => {
  const {
    currentRetailer,
    services,
    transactions,
    inquiries,
    setRetailerTab,
    setWalletRechargeModal,
    setApplyServiceModal,
    updateInquiryStatus
  } = useApp();

  const retailerTransactions = transactions.filter((t) => t.retailerId === currentRetailer.id).slice(0, 5);
  const assignedInquiries = inquiries.filter((i) => i.assignedRetailerId === currentRetailer.id || !i.assignedRetailerId).slice(0, 4);

  return (
    <div className="retailer-dashboard">
      {/* Stat Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.75rem"
        }}
      >
        {/* Wallet Balance Card */}
        <div className="stat-card stat-emerald">
          <div className="stat-info">
            <h4>Wallet Balance</h4>
            <div className="stat-value" style={{ color: "#047857" }}>
              ₹{currentRetailer.walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <div className="stat-subtext">Active operational funds</div>
          </div>
          <div className="stat-icon icon-emerald">
            <Wallet size={24} />
          </div>
        </div>

        {/* Today Commission */}
        <div className="stat-card">
          <div className="stat-info">
            <h4>Today's Commission</h4>
            <div className="stat-value" style={{ color: "var(--primary)" }}>
              ₹{(currentRetailer.todayCommission || 0).toLocaleString("en-IN")}
            </div>
            <div className="stat-subtext" style={{ color: "var(--emerald)", fontWeight: 600 }}>
              + Instant settlement
            </div>
          </div>
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
        </div>

        {/* Lifetime Commission */}
        <div className="stat-card stat-indigo">
          <div className="stat-info">
            <h4>Total Earned</h4>
            <div className="stat-value" style={{ color: "var(--secondary)" }}>
              ₹{(currentRetailer.totalCommission || 0).toLocaleString("en-IN")}
            </div>
            <div className="stat-subtext">Lifetime earnings</div>
          </div>
          <div className="stat-icon icon-indigo">
            <Coins size={24} />
          </div>
        </div>

        {/* Available Services */}
        <div className="stat-card stat-amber">
          <div className="stat-info">
            <h4>Available Services</h4>
            <div className="stat-value" style={{ color: "var(--amber)" }}>
              {services.length}
            </div>
            <div className="stat-subtext">Aadhaar, PAN, GST, ITR</div>
          </div>
          <div className="stat-icon icon-amber">
            <Layers size={24} />
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)",
          color: "#ffffff",
          borderRadius: "var(--radius-xl)",
          padding: "1.25rem 1.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.75rem",
          boxShadow: "var(--shadow-md)"
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: "1.15rem" }}>
            Ready to process a citizen service?
          </div>
          <div style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>
            Select an assigned service to initiate paperless filing and earn instant margin.
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            className="btn btn-sm"
            style={{ background: "#ffffff", color: "var(--primary)", fontWeight: 700 }}
            onClick={() => setRetailerTab("services")}
          >
            <PlusCircle size={15} />
            <span>Apply New Service</span>
          </button>

          <button
            className="btn btn-sm btn-emerald"
            onClick={() => setWalletRechargeModal(true)}
          >
            <Wallet size={15} />
            <span>Recharge Wallet</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Recent Inquiries + Recent Transactions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {/* Assigned Customer Inquiries */}
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
                Assigned Citizen Inquiries
              </h3>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Inquiries from website routed to your Kendra
              </div>
            </div>

            <span className="badge badge-blue">
              {assignedInquiries.length} Active Leads
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {assignedInquiries.length === 0 ? (
              <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                No pending customer inquiries right now.
              </div>
            ) : (
              assignedInquiries.map((inq) => {
                const matchedService = services.find((s) => s.id === inq.serviceId) || services[0];
                return (
                  <div
                    key={inq.id}
                    style={{
                      border: "1px solid var(--card-border)",
                      borderRadius: "var(--radius-md)",
                      padding: "0.85rem 1rem",
                      background: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.925rem", color: "var(--secondary)" }}>
                          {inq.customerName}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          Mob: {inq.mobile} | {inq.date}
                        </div>
                      </div>
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
                    </div>

                    <div style={{ fontSize: "0.825rem", color: "var(--primary)", fontWeight: 600 }}>
                      Service: {inq.serviceName}
                    </div>

                    {inq.message && (
                      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                        "{inq.message}"
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.25rem" }}>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem" }}
                        onClick={() => {
                          setApplyServiceModal({
                            isOpen: true,
                            service: matchedService
                          });
                        }}
                      >
                        <span>Process Application (Earn ₹{matchedService.retailerCommission})</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Wallet Transactions */}
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
                Recent Wallet Transactions
              </h3>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Debits, Recharges & Commission credits
              </div>
            </div>

            <button
              onClick={() => setRetailerTab("wallet")}
              style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}
            >
              View All Ledger &rarr;
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {retailerTransactions.map((txn) => (
              <div
                key={txn.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 0.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--card-border)",
                  background: txn.type === "credit" ? "#fbfdfc" : "#ffffff"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: txn.type === "credit" ? "var(--emerald-subtle)" : "var(--rose-subtle)",
                      color: txn.type === "credit" ? "var(--emerald)" : "var(--rose)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {txn.type === "credit" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>

                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--secondary)" }}>
                      {txn.category}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: "240px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {txn.description}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: txn.type === "credit" ? "var(--emerald)" : "var(--rose)"
                    }}
                  >
                    {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>
                    {txn.date.split(" ")[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
