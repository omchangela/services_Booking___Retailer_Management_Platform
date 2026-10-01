import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Inbox,
  Search,
  Filter,
  UserCheck,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  ArrowRight,
  X
} from "lucide-react";

export const AdminInquiries = () => {
  const {
    inquiries,
    retailers,
    updateInquiryStatus,
    assignInquiryToRetailer
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assignModalInquiry, setAssignModalInquiry] = useState(null);
  const [targetRetailerId, setTargetRetailerId] = useState(retailers[0]?.id || "");

  const filteredInquiries = inquiries.filter((inq) => {
    const matchStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchSearch =
      inq.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.mobile.includes(searchTerm) ||
      inq.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!assignModalInquiry || !targetRetailerId) return;
    assignInquiryToRetailer(assignModalInquiry.id, targetRetailerId);
    setAssignModalInquiry(null);
  };

  return (
    <div className="admin-inquiries-page">
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)" }}>
            Citizen Service Inquiries & Leads ({inquiries.length})
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Review customer service inquiries from public website, route to local Kendras, and track resolution.
          </p>
        </div>
      </div>

      {/* Real-time Public Inquiries Channel Notice */}
      <div
        style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "var(--radius-lg)",
          padding: "0.75rem 1rem",
          marginBottom: "1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "0.85rem",
          color: "#166534"
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#16a34a",
            boxShadow: "0 0 6px #16a34a",
            display: "inline-block"
          }}
        />
        <span>
          <strong>Live Automatic Ingestion:</strong> Inquiries submitted by citizens on the public portal (with rates customized per city) are automatically recorded here in real-time for Super Admin distribution to local Kendra retailers.
        </span>
      </div>

      {/* Filter and Search Bar */}
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
          {/* Status Filter Pills */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {["all", "New", "Contacted", "In Progress", "Completed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  border: "1px solid",
                  borderColor: statusFilter === st ? "var(--primary)" : "var(--card-border)",
                  background: statusFilter === st ? "var(--primary)" : "#ffffff",
                  color: statusFilter === st ? "#ffffff" : "var(--text-secondary)"
                }}
              >
                {st === "all" ? `All Inquiries (${inquiries.length})` : `${st} (${inquiries.filter((i) => i.status === st).length})`}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", minWidth: "260px" }}>
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Search by customer, mobile, ID..."
              className="form-control"
              style={{ paddingLeft: "2rem", padding: "0.45rem 2rem 0.45rem 2rem", fontSize: "0.825rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Applicant / Customer</th>
              <th>Service Inquired</th>
              <th>Location</th>
              <th>Timestamp</th>
              <th>Assigned Kendra</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "2.5rem", color: "var(--text-muted)" }}>
                  No customer inquiries matching criteria.
                </td>
              </tr>
            ) : (
              filteredInquiries.map((inq) => (
                <tr key={inq.id} style={{ background: inq.status === "New" ? "rgba(254, 243, 199, 0.25)" : "transparent" }}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem" }}>
                        {inq.id}
                      </span>
                      {inq.status === "New" && (
                        <span
                          style={{
                            background: "#ef4444",
                            color: "#fff",
                            fontSize: "0.65rem",
                            fontWeight: 800,
                            padding: "0.1rem 0.35rem",
                            borderRadius: "var(--radius-sm)"
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 700, color: "var(--secondary)" }}>
                      {inq.customerName}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {inq.mobile} {inq.email && `| ${inq.email}`}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      {inq.serviceName}
                    </div>
                    {inq.message && (
                      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontStyle: "italic", maxWidth: "220px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        "{inq.message}"
                      </div>
                    )}
                  </td>

                  <td>
                    <div style={{ fontSize: "0.85rem" }}>{inq.city}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{inq.state}</div>
                  </td>

                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                    {inq.date}
                  </td>

                  <td>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: inq.assignedRetailerName ? "var(--secondary)" : "var(--rose)"
                      }}
                    >
                      {inq.assignedRetailerName || "Unassigned"}
                    </span>
                  </td>

                  <td>
                    <select
                      className="form-control"
                      style={{
                        padding: "0.25rem 0.5rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        width: "auto"
                      }}
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                      onClick={() => {
                        setAssignModalInquiry(inq);
                        setTargetRetailerId(inq.assignedRetailerId || retailers[0]?.id || "");
                      }}
                    >
                      <span>Assign Kendra</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Assign Kendra Modal */}
      {assignModalInquiry && (
        <div className="modal-overlay" onClick={() => setAssignModalInquiry(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "450px" }}>
            <div className="modal-header">
              <h3>Route Inquiry #{assignModalInquiry.id}</h3>
              <button className="modal-close-btn" onClick={() => setAssignModalInquiry(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAssignSubmit}>
              <div className="modal-body">
                <div style={{ background: "#f8fafc", padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Applicant:</div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    {assignModalInquiry.customerName} ({assignModalInquiry.mobile})
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--primary)", marginTop: "2px" }}>
                    Service: {assignModalInquiry.serviceName}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Nearest Authorized Retailer Kendra</label>
                  <select
                    className="form-control"
                    value={targetRetailerId}
                    onChange={(e) => setTargetRetailerId(e.target.value)}
                  >
                    {retailers.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.shopName} - {r.city}, {r.state} ({r.cscId})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setAssignModalInquiry(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Confirm Kendra Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
