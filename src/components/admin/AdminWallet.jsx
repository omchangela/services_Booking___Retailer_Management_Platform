import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  PlusCircle,
  MinusCircle,
  Search,
  Filter,
  CheckCircle2,
  ShieldCheck,
  Building,
  Coins
} from "lucide-react";

export const AdminWallet = () => {
  const { retailers, transactions, adjustRetailerWallet } = useApp();

  const [selectedRetailerId, setSelectedRetailerId] = useState(retailers[0]?.id || "");
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [adjustmentType, setAdjustmentType] = useState("credit");
  const [adjustmentReason, setAdjustmentReason] = useState("Promotional Bonus Credit");
  const [searchTerm, setSearchTerm] = useState("");

  const totalCirculation = retailers.reduce((s, r) => s + (r.walletBalance || 0), 0);
  const totalCommission = retailers.reduce((s, r) => s + (r.totalCommission || 0), 0);

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    if (!adjustmentAmount || isNaN(adjustmentAmount) || parseFloat(adjustmentAmount) <= 0) {
      alert("Please enter a valid adjustment amount");
      return;
    }

    adjustRetailerWallet(
      selectedRetailerId,
      parseFloat(adjustmentAmount),
      adjustmentType,
      adjustmentReason
    );

    setAdjustmentAmount("");
  };

  const filteredTxns = transactions.filter((t) => {
    return (
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="admin-wallet-page">
      {/* Overview Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.75rem"
        }}
      >
        <div className="stat-card stat-emerald">
          <div className="stat-info">
            <h4>Total Retailer Funds</h4>
            <div className="stat-value" style={{ color: "var(--emerald)" }}>
              ₹{totalCirculation.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <div className="stat-subtext">Across {retailers.length} registered Kendras</div>
          </div>
          <div className="stat-icon icon-emerald">
            <Wallet size={24} />
          </div>
        </div>

        <div className="stat-card stat-indigo">
          <div className="stat-info">
            <h4>Total Commissions Disbursed</h4>
            <div className="stat-value" style={{ color: "var(--secondary)" }}>
              ₹{totalCommission.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <div className="stat-subtext">Lifetime partner payouts</div>
          </div>
          <div className="stat-icon icon-indigo">
            <Coins size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h4>Total Logged Transactions</h4>
            <div className="stat-value" style={{ color: "var(--primary)" }}>
              {transactions.length}
            </div>
            <div className="stat-subtext">Real-time audit ledger</div>
          </div>
          <div className="stat-icon">
            <ShieldCheck size={24} />
          </div>
        </div>
      </div>

      {/* Manual Wallet Settlement Adjustment Tool */}
      <div className="card" style={{ padding: "1.5rem", marginBottom: "1.75rem" }}>
        <h3 style={{ fontSize: "1.15rem", color: "var(--secondary)", marginBottom: "0.4rem" }}>
          Super Admin Manual Wallet Adjustment Tool
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
          Directly credit bonuses, manual bank deposit settlements, or correct balance discrepancies.
        </p>

        <form onSubmit={handleAdjustSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Target Retailer Kendra</label>
              <select
                className="form-control"
                value={selectedRetailerId}
                onChange={(e) => setSelectedRetailerId(e.target.value)}
              >
                {retailers.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.shopName} (Bal: ₹{r.walletBalance.toLocaleString("en-IN")})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Adjustment Type</label>
              <select
                className="form-control"
                value={adjustmentType}
                onChange={(e) => setAdjustmentType(e.target.value)}
              >
                <option value="credit">CREDIT (+) to Wallet</option>
                <option value="debit">DEBIT (-) from Wallet</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                required
                placeholder="e.g. 1500"
                className="form-control"
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Reason / Settlement Audit Note</label>
              <input
                type="text"
                required
                placeholder="e.g. Offline NEFT Deposit #78190"
                className="form-control"
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              className={`btn ${adjustmentType === "credit" ? "btn-emerald" : "btn-secondary"}`}
            >
              {adjustmentType === "credit" ? <PlusCircle size={16} /> : <MinusCircle size={16} />}
              <span>Execute {adjustmentType.toUpperCase()} Adjustment</span>
            </button>
          </div>
        </form>
      </div>

      {/* Master Transaction Audit Ledger */}
      <div className="card" style={{ padding: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem"
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.15rem", color: "var(--secondary)" }}>
              Platform Master Settlement Ledger
            </h3>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Every wallet movement across all Kendras
            </div>
          </div>

          <div style={{ position: "relative", minWidth: "260px" }}>
            <Search
              size={15}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Search txn ID or description..."
              className="form-control"
              style={{ paddingLeft: "2rem", padding: "0.4rem 2rem 0.4rem 2rem", fontSize: "0.825rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Txn ID</th>
                <th>Retailer Kendra</th>
                <th>Category</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount (₹)</th>
                <th>Balance After (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map((txn) => {
                const targetRet = retailers.find((r) => r.id === txn.retailerId);
                return (
                  <tr key={txn.id}>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                      {txn.date}
                    </td>
                    <td style={{ fontFamily: "monospace", fontWeight: 600, fontSize: "0.85rem" }}>
                      {txn.id}
                    </td>
                    <td style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      {targetRet?.shopName || "Ramesh Kendra"}
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
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: txn.type === "credit" ? "var(--emerald)" : "var(--rose)"
                        }}
                      >
                        {txn.type.toUpperCase()}
                      </span>
                    </td>
                    <td
                      style={{
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        color: txn.type === "credit" ? "var(--emerald)" : "var(--rose)"
                      }}
                    >
                      {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      ₹{(txn.balanceAfter || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <span className="badge badge-green" style={{ fontSize: "0.7rem" }}>
                        Success
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
