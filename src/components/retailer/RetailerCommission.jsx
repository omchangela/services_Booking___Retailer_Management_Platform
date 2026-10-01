import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Coins,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const RetailerCommission = () => {
  const { currentRetailer, services, transactions } = useApp();

  const commissionTxns = transactions.filter(
    (t) => t.retailerId === currentRetailer.id && t.category.toLowerCase().includes("commission")
  );

  return (
    <div className="retailer-commission-tab">
      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem"
        }}
      >
        <div className="stat-card stat-emerald">
          <div className="stat-info">
            <h4>Today's Earnings</h4>
            <div className="stat-value" style={{ color: "var(--emerald)" }}>
              ₹{(currentRetailer.todayCommission || 0).toLocaleString("en-IN")}
            </div>
            <div className="stat-subtext">Instant wallet credit</div>
          </div>
          <div className="stat-icon icon-emerald">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h4>This Month</h4>
            <div className="stat-value" style={{ color: "var(--primary)" }}>
              ₹{((currentRetailer.todayCommission || 0) * 12 + 18500).toLocaleString("en-IN")}
            </div>
            <div className="stat-subtext">Active billing period</div>
          </div>
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
        </div>

        <div className="stat-card stat-indigo">
          <div className="stat-info">
            <h4>Lifetime Commission</h4>
            <div className="stat-value" style={{ color: "var(--secondary)" }}>
              ₹{(currentRetailer.totalCommission || 0).toLocaleString("en-IN")}
            </div>
            <div className="stat-subtext">Accumulated payout margin</div>
          </div>
          <div className="stat-icon icon-indigo">
            <Coins size={24} />
          </div>
        </div>

        <div className="stat-card stat-amber">
          <div className="stat-info">
            <h4>Highest Commission Margin</h4>
            <div className="stat-value" style={{ color: "var(--amber)" }}>
              ₹700.00
            </div>
            <div className="stat-subtext">New GST Registration</div>
          </div>
          <div className="stat-icon icon-amber">
            <Sparkles size={24} />
          </div>
        </div>
      </div>

      {/* Service-wise Guaranteed Commission Structure Table */}
      <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <span className="badge badge-green" style={{ marginBottom: "0.4rem" }}>
            Guaranteed Payout Rate Card
          </span>
          <h3 style={{ fontSize: "1.2rem", color: "var(--secondary)" }}>
            Service-wise Retailer Commission Structure
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            Standard fixed earnings credited to your wallet immediately upon citizen application submission.
          </p>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Citizen MRP (₹)</th>
                <th>Kendra Debit Cost (₹)</th>
                <th>Guaranteed Commission (₹)</th>
                <th>Margin %</th>
                <th>Department SLA</th>
              </tr>
            </thead>
            <tbody>
              {services.map((srv) => {
                const marginPercent = Math.round((srv.retailerCommission / srv.customerPrice) * 100);
                return (
                  <tr key={srv.id}>
                    <td style={{ fontWeight: 700, color: "var(--secondary)" }}>
                      {srv.name}
                    </td>

                    <td>
                      <span className="badge badge-blue" style={{ fontSize: "0.7rem" }}>
                        {srv.categoryName}
                      </span>
                    </td>

                    <td style={{ fontWeight: 600 }}>
                      ₹{srv.customerPrice}
                    </td>

                    <td style={{ color: "var(--rose)", fontWeight: 600 }}>
                      ₹{srv.retailerCost}
                    </td>

                    <td style={{ color: "var(--emerald)", fontWeight: 800, fontSize: "0.95rem" }}>
                      +₹{srv.retailerCommission}
                    </td>

                    <td>
                      <span className="badge badge-green" style={{ fontSize: "0.7rem" }}>
                        {marginPercent}% Profit
                      </span>
                    </td>

                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {srv.turnaroundTime}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Commission Payouts History */}
      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.15rem", color: "var(--secondary)" }}>
            Earned Commission Settlement History
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            Real-time audit log of commissions credited directly to your operational balance.
          </p>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Voucher ID</th>
                <th>Service & Customer Details</th>
                <th>Reference Code</th>
                <th>Commission Credited</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {commissionTxns.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                    No commission payouts yet. Process your first customer application to see logs here!
                  </td>
                </tr>
              ) : (
                commissionTxns.map((txn) => (
                  <tr key={txn.id}>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                      {txn.date}
                    </td>
                    <td style={{ fontFamily: "monospace", fontWeight: 600 }}>
                      {txn.id}
                    </td>
                    <td style={{ fontSize: "0.85rem", color: "var(--secondary)" }}>
                      {txn.description}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {txn.referenceId || "AUTO-COM"}
                    </td>
                    <td style={{ fontWeight: 800, color: "var(--emerald)", fontSize: "0.95rem" }}>
                      +₹{txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <span className="badge badge-green" style={{ fontSize: "0.7rem" }}>
                        Settled
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
