import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  PlusCircle,
  Filter,
  Search,
  Download,
  Receipt,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";

export const RetailerWallet = () => {
  const {
    currentRetailer,
    transactions,
    rechargeRetailerWallet,
    setWalletRechargeModal
  } = useApp();

  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeReceipt, setActiveReceipt] = useState(null);

  const retailerTxns = transactions.filter((t) => t.retailerId === currentRetailer.id);

  const filteredTxns = retailerTxns.filter((txn) => {
    let matchType = true;
    if (filterType === "credit") matchType = txn.type === "credit";
    if (filterType === "debit") matchType = txn.type === "debit";
    if (filterType === "commission") matchType = txn.category.toLowerCase().includes("commission");

    const matchSearch =
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchType && matchSearch;
  });

  const totalCredits = retailerTxns
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = retailerTxns
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="retailer-wallet-tab">
      {/* Wallet Balance Hero Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          borderRadius: "var(--radius-xl)",
          padding: "2rem",
          boxShadow: "var(--shadow-lg)",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 700 }}>
            <Wallet size={16} color="#10b981" />
            <span>Retailer Operational Wallet</span>
          </div>

          <div
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#34d399",
              margin: "0.5rem 0",
              fontFamily: "var(--font-heading)"
            }}
          >
            ₹{currentRetailer.walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>

          <div style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>
            CSC Kendra ID: <strong>{currentRetailer.cscId}</strong> | Auto-replenished on successful recharge
          </div>
        </div>

        {/* Quick Top-up buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>
            Instant 1-Click Top-Up:
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[1000, 2000, 5000].map((amt) => (
              <button
                key={amt}
                className="btn btn-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontWeight: 700
                }}
                onClick={() => rechargeRetailerWallet(amt, "Instant Top-Up")}
              >
                +₹{amt}
              </button>
            ))}

            <button
              className="btn btn-sm btn-emerald"
              onClick={() => setWalletRechargeModal(true)}
            >
              <PlusCircle size={15} />
              <span>Custom Recharge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Ledger Bar */}
      <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          {/* Filter Pills */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setFilterType("all")}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: "1px solid",
                borderColor: filterType === "all" ? "var(--primary)" : "var(--card-border)",
                background: filterType === "all" ? "var(--primary)" : "#ffffff",
                color: filterType === "all" ? "#ffffff" : "var(--text-secondary)"
              }}
            >
              All Transactions ({retailerTxns.length})
            </button>

            <button
              onClick={() => setFilterType("credit")}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: "1px solid",
                borderColor: filterType === "credit" ? "var(--emerald)" : "var(--card-border)",
                background: filterType === "credit" ? "var(--emerald)" : "#ffffff",
                color: filterType === "credit" ? "#ffffff" : "var(--text-secondary)"
              }}
            >
              Credits Only (+₹{totalCredits.toLocaleString("en-IN")})
            </button>

            <button
              onClick={() => setFilterType("debit")}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: "1px solid",
                borderColor: filterType === "debit" ? "var(--rose)" : "var(--card-border)",
                background: filterType === "debit" ? "var(--rose)" : "#ffffff",
                color: filterType === "debit" ? "#ffffff" : "var(--text-secondary)"
              }}
            >
              Debits (-₹{totalDebits.toLocaleString("en-IN")})
            </button>

            <button
              onClick={() => setFilterType("commission")}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: "1px solid",
                borderColor: filterType === "commission" ? "var(--indigo)" : "var(--card-border)",
                background: filterType === "commission" ? "var(--indigo)" : "#ffffff",
                color: filterType === "commission" ? "#ffffff" : "var(--text-secondary)"
              }}
            >
              Commission Earnings
            </button>
          </div>

          {/* Search Box */}
          <div style={{ position: "relative", minWidth: "240px" }}>
            <Search
              size={15}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Search txn ID or reference..."
              className="form-control"
              style={{ paddingLeft: "2rem", padding: "0.4rem 2rem 0.4rem 2rem", fontSize: "0.825rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Transaction ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance After</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "2.5rem", color: "var(--text-muted)" }}>
                  No transactions found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredTxns.map((txn) => (
                <tr key={txn.id}>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                    {txn.date}
                  </td>

                  <td style={{ fontWeight: 600, color: "var(--secondary)", fontFamily: "monospace", fontSize: "0.85rem" }}>
                    {txn.id}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        txn.category === "Wallet Recharge"
                          ? "badge-green"
                          : txn.category === "Commission Credited"
                          ? "badge-blue"
                          : "badge-slate"
                      }`}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {txn.category}
                    </span>
                  </td>

                  <td style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "250px" }}>
                    {txn.description}
                  </td>

                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        color: txn.type === "credit" ? "var(--emerald)" : "var(--rose)"
                      }}
                    >
                      {txn.type === "credit" ? (
                        <>
                          <ArrowDownLeft size={14} />
                          <span>CREDIT</span>
                        </>
                      ) : (
                        <>
                          <ArrowUpRight size={14} />
                          <span>DEBIT</span>
                        </>
                      )}
                    </span>
                  </td>

                  <td
                    style={{
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      color: txn.type === "credit" ? "var(--emerald)" : "var(--rose)",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>

                  <td style={{ fontWeight: 600, color: "var(--secondary)", fontSize: "0.85rem" }}>
                    ₹{(txn.balanceAfter || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>

                  <td>
                    <span className="badge badge-green" style={{ fontSize: "0.7rem" }}>
                      Success
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline"
                      style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                      onClick={() => setActiveReceipt(txn)}
                    >
                      <Receipt size={13} />
                      <span>Slip</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Receipt Modal */}
      {activeReceipt && (
        <div className="modal-overlay" onClick={() => setActiveReceipt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
            <div className="modal-header">
              <h3>Transaction Receipt</h3>
              <button className="modal-close-btn" onClick={() => setActiveReceipt(null)}>
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ padding: "1.75rem" }}>
              <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                <CheckCircle2 size={40} color="var(--emerald)" style={{ margin: "0 auto 0.5rem" }} />
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--secondary)" }}>
                  ₹{activeReceipt.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {activeReceipt.type === "credit" ? "Credited to Wallet" : "Debited from Wallet"}
                </div>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem",
                  fontSize: "0.85rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Transaction ID:</span>
                  <span style={{ fontWeight: 600 }}>{activeReceipt.id}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Date & Time:</span>
                  <span style={{ fontWeight: 600 }}>{activeReceipt.date}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Reference Code:</span>
                  <span style={{ fontWeight: 600 }}>{activeReceipt.referenceId || "REF-AUTO-991"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Description:</span>
                  <span style={{ fontWeight: 600, maxWidth: "200px", textAlign: "right" }}>{activeReceipt.description}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--card-border)", paddingTop: "0.5rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Balance After:</span>
                  <span style={{ fontWeight: 800, color: "var(--primary)" }}>₹{activeReceipt.balanceAfter.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    alert("Receipt downloaded as PDF!");
                    setActiveReceipt(null);
                  }}
                >
                  <Download size={15} />
                  <span>Download Voucher PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
