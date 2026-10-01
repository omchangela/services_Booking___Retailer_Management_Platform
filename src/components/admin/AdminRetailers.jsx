import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Users,
  PlusCircle,
  Search,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Edit,
  Eye,
  Wallet,
  ShieldCheck,
  AlertCircle,
  X,
  Save
} from "lucide-react";

export const AdminRetailers = () => {
  const {
    retailers,
    addRetailer,
    updateRetailer,
    approveRetailer,
    rejectRetailer,
    toggleRetailerStatus
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState(null); // for view details
  const [editingRetailer, setEditingRetailer] = useState(null); // for edit modal

  // New Retailer Form
  const [newForm, setNewForm] = useState({
    name: "",
    shopName: "",
    mobile: "",
    email: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
    address: "",
    initialWallet: "2000"
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newForm.name || !newForm.shopName || !newForm.mobile) {
      alert("Please enter Owner Name, Shop Name, and Mobile Number");
      return;
    }

    addRetailer({
      ...newForm,
      bankDetails: {
        accountHolder: newForm.name,
        bankName: "State Bank of India",
        accountNumber: "4091" + Math.floor(10000000 + Math.random() * 90000000),
        ifsc: "SBIN0002100",
        branch: newForm.city + " Main Branch"
      }
    });

    setShowAddModal(false);
    setNewForm({
      name: "",
      shopName: "",
      mobile: "",
      email: "",
      city: "",
      state: "Uttar Pradesh",
      pincode: "",
      address: "",
      initialWallet: "2000"
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingRetailer) return;
    updateRetailer(editingRetailer.id, {
      name: editingRetailer.name,
      shopName: editingRetailer.shopName,
      mobile: editingRetailer.mobile,
      email: editingRetailer.email,
      city: editingRetailer.city,
      state: editingRetailer.state,
      address: editingRetailer.address
    });
    setEditingRetailer(null);
  };

  const filteredRetailers = retailers.filter((r) => {
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchSearch =
      r.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cscId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="admin-retailers-page">
      {/* Top Action Bar */}
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
            Authorized Retailer Network ({retailers.length} Kendras)
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Manage KYC, wallet limits, approve new Kendra applications & toggle operational status.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <PlusCircle size={16} />
          <span>Add New Retailer Kendra</span>
        </button>
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
            {["all", "active", "pending", "deactivated"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  border: "1px solid",
                  textTransform: "capitalize",
                  borderColor: statusFilter === st ? "var(--primary)" : "var(--card-border)",
                  background: statusFilter === st ? "var(--primary)" : "#ffffff",
                  color: statusFilter === st ? "#ffffff" : "var(--text-secondary)"
                }}
              >
                {st === "all" ? `All (${retailers.length})` : `${st} (${retailers.filter((r) => r.status === st).length})`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: "relative", minWidth: "260px" }}>
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Search by shop, owner, CSC ID or city..."
              className="form-control"
              style={{ paddingLeft: "2rem", padding: "0.45rem 2rem 0.45rem 2rem", fontSize: "0.825rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Retailers Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Shop / Kendra</th>
              <th>Owner Details</th>
              <th>CSC / Agent ID</th>
              <th>City & State</th>
              <th>Wallet Balance</th>
              <th>Total Orders</th>
              <th>Status</th>
              <th>KYC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRetailers.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "2.5rem", color: "var(--text-muted)" }}>
                  No retailers match your search criteria.
                </td>
              </tr>
            ) : (
              filteredRetailers.map((ret) => (
                <tr key={ret.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: "var(--secondary)" }}>
                      {ret.shopName}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Joined: {ret.joinedDate || "2025-04-12"}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{ret.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ret.mobile}</div>
                  </td>

                  <td style={{ fontFamily: "monospace", fontWeight: 600, fontSize: "0.85rem" }}>
                    {ret.cscId}
                  </td>

                  <td>
                    <div style={{ fontSize: "0.85rem" }}>{ret.city}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ret.state}</div>
                  </td>

                  <td style={{ fontWeight: 800, color: "var(--emerald)", fontSize: "0.95rem" }}>
                    ₹{ret.walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>

                  <td style={{ fontWeight: 600 }}>
                    {ret.totalApplications || 0}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        ret.status === "active"
                          ? "badge-green"
                          : ret.status === "pending"
                          ? "badge-amber"
                          : "badge-red"
                      }`}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {ret.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        ret.kycStatus === "approved"
                          ? "badge-green"
                          : ret.kycStatus === "under_review"
                          ? "badge-amber"
                          : "badge-red"
                      }`}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {ret.kycStatus}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {ret.status === "pending" ? (
                        <>
                          <button
                            className="btn btn-sm btn-emerald"
                            style={{ padding: "0.2rem 0.5rem", fontSize: "0.75rem" }}
                            onClick={() => approveRetailer(ret.id)}
                            title="Approve Retailer"
                          >
                            <CheckCircle2 size={13} />
                            <span>Approve</span>
                          </button>
                          <button
                            className="btn btn-sm btn-outline"
                            style={{ padding: "0.2rem 0.5rem", fontSize: "0.75rem", color: "var(--rose)" }}
                            onClick={() => rejectRetailer(ret.id)}
                            title="Reject Retailer"
                          >
                            <XCircle size={13} />
                            <span>Reject</span>
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline"
                          style={{
                            padding: "0.2rem 0.5rem",
                            fontSize: "0.75rem",
                            color: ret.status === "active" ? "var(--rose)" : "var(--emerald)"
                          }}
                          onClick={() => toggleRetailerStatus(ret.id)}
                          title={ret.status === "active" ? "Deactivate Retailer" : "Activate Retailer"}
                        >
                          {ret.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                      )}

                      <button
                        className="btn btn-sm btn-outline"
                        style={{ padding: "0.2rem 0.4rem" }}
                        onClick={() => setSelectedRetailer(ret)}
                        title="View Details Dossier"
                      >
                        <Eye size={13} />
                      </button>

                      <button
                        className="btn btn-sm btn-outline"
                        style={{ padding: "0.2rem 0.4rem" }}
                        onClick={() => setEditingRetailer({ ...ret })}
                        title="Edit Retailer Details"
                      >
                        <Edit size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Retailer Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Onboard New Retailer Kendra</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Proprietor Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Prakash Tiwari"
                      className="form-control"
                      value={newForm.name}
                      onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Shop / Kendra Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Digital Seva & E-Mitra"
                      className="form-control"
                      value={newForm.shopName}
                      onChange={(e) => setNewForm({ ...newForm, shopName: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      className="form-control"
                      value={newForm.mobile}
                      onChange={(e) => setNewForm({ ...newForm, mobile: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      placeholder="kendra@gmail.com"
                      className="form-control"
                      value={newForm.email}
                      onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Kendra Physical Address</label>
                  <input
                    type="text"
                    placeholder="Shop address, street, landmark"
                    className="form-control"
                    value={newForm.address}
                    onChange={(e) => setNewForm({ ...newForm, address: e.target.value })}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">City / Town</label>
                    <input
                      type="text"
                      placeholder="e.g. Varanasi"
                      className="form-control"
                      value={newForm.city}
                      onChange={(e) => setNewForm({ ...newForm, city: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State</label>
                    <select
                      className="form-control"
                      value={newForm.state}
                      onChange={(e) => setNewForm({ ...newForm, state: e.target.value })}
                    >
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Initial Seed Wallet (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newForm.initialWallet}
                      onChange={(e) => setNewForm({ ...newForm, initialWallet: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Register & Activate Retailer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Retailer Modal */}
      {editingRetailer && (
        <div className="modal-overlay" onClick={() => setEditingRetailer(null)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Retailer: {editingRetailer.shopName}</h3>
              <button className="modal-close-btn" onClick={() => setEditingRetailer(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Proprietor Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingRetailer.name}
                      onChange={(e) => setEditingRetailer({ ...editingRetailer, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Shop Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingRetailer.shopName}
                      onChange={(e) => setEditingRetailer({ ...editingRetailer, shopName: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={editingRetailer.mobile}
                      onChange={(e) => setEditingRetailer({ ...editingRetailer, mobile: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={editingRetailer.email}
                      onChange={(e) => setEditingRetailer({ ...editingRetailer, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingRetailer.address}
                    onChange={(e) => setEditingRetailer({ ...editingRetailer, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setEditingRetailer(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={15} />
                  <span>Update Retailer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Retailer Dossier View Modal */}
      {selectedRetailer && (
        <div className="modal-overlay" onClick={() => setSelectedRetailer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "550px" }}>
            <div className="modal-header">
              <h3>Retailer Kendra Dossier</h3>
              <button className="modal-close-btn" onClick={() => setSelectedRetailer(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid var(--card-border)",
                  marginBottom: "1rem"
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--primary-subtle)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "1.2rem"
                  }}
                >
                  {selectedRetailer.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--secondary)" }}>
                    {selectedRetailer.shopName}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    CSC ID: <strong>{selectedRetailer.cscId}</strong> | Status:{" "}
                    <span className={`badge ${selectedRetailer.status === "active" ? "badge-green" : "badge-amber"}`} style={{ fontSize: "0.7rem" }}>
                      {selectedRetailer.status}
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  fontSize: "0.85rem",
                  marginBottom: "1.25rem"
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Authorized Agent:</span>
                  <div style={{ fontWeight: 600 }}>{selectedRetailer.name}</div>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Mobile Contact:</span>
                  <div style={{ fontWeight: 600 }}>{selectedRetailer.mobile}</div>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Current Wallet Balance:</span>
                  <div style={{ fontWeight: 800, color: "var(--emerald)", fontSize: "1.1rem" }}>
                    ₹{selectedRetailer.walletBalance.toLocaleString("en-IN")}
                  </div>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Total Commission Paid:</span>
                  <div style={{ fontWeight: 800, color: "var(--primary)", fontSize: "1.1rem" }}>
                    ₹{(selectedRetailer.totalCommission || 0).toLocaleString("en-IN")}
                  </div>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Bank Name:</span>
                  <div style={{ fontWeight: 600 }}>{selectedRetailer.bankDetails?.bankName || "SBI"}</div>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Account / IFSC:</span>
                  <div style={{ fontWeight: 600 }}>
                    {selectedRetailer.bankDetails?.accountNumber} ({selectedRetailer.bankDetails?.ifsc})
                  </div>
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", fontSize: "0.825rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Operating Shop Address:</span>
                <div style={{ fontWeight: 500, marginTop: "2px" }}>
                  {selectedRetailer.address || "Main Market"}, {selectedRetailer.city}, {selectedRetailer.state}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setSelectedRetailer(null)}>
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
