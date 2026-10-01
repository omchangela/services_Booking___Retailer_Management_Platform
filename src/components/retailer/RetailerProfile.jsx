import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  User,
  Building,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Save,
  Phone,
  Mail,
  MapPin,
  Landmark
} from "lucide-react";

export const RetailerProfile = () => {
  const { currentRetailer, updateRetailer, notify } = useApp();

  const [formData, setFormData] = useState({
    name: currentRetailer.name || "",
    shopName: currentRetailer.shopName || "",
    mobile: currentRetailer.mobile || "",
    email: currentRetailer.email || "",
    city: currentRetailer.city || "",
    state: currentRetailer.state || "",
    pincode: currentRetailer.pincode || "",
    address: currentRetailer.address || "",
    bankName: currentRetailer.bankDetails?.bankName || "State Bank of India",
    accountNumber: currentRetailer.bankDetails?.accountNumber || "309812457812",
    ifsc: currentRetailer.bankDetails?.ifsc || "SBIN0001245",
    branch: currentRetailer.bankDetails?.branch || "Main Branch"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateRetailer(currentRetailer.id, {
      name: formData.name,
      shopName: formData.shopName,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      address: formData.address,
      bankDetails: {
        accountHolder: formData.name,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifsc: formData.ifsc,
        branch: formData.branch
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="retailer-profile-tab" style={{ maxWidth: "900px" }}>
      {/* Profile Overview Card */}
      <div
        className="card"
        style={{
          padding: "2rem",
          marginBottom: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: 800
            }}
          >
            {formData.name.charAt(0)}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 style={{ fontSize: "1.35rem", color: "var(--secondary)" }}>
                {formData.shopName}
              </h3>
              <span className="badge badge-green" style={{ fontSize: "0.75rem" }}>
                <ShieldCheck size={13} />
                <span>KYC Approved</span>
              </span>
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "2px" }}>
              Kendra CSC ID: <strong>{currentRetailer.cscId}</strong> | Enrolled: {currentRetailer.joinedDate || "2025-04-12"}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "2px" }}>
              Authorized Agent: <strong>{formData.name}</strong>
            </div>
          </div>
        </div>

        <button
          className={`btn ${isEditing ? "btn-outline" : "btn-primary"}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel Editing" : "Edit Kendra Profile"}
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* Business & Kendra Details */}
        <div className="card" style={{ padding: "1.75rem", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
            <Building size={18} color="var(--primary)" />
            <h4 style={{ fontSize: "1.1rem", color: "var(--secondary)" }}>
              Kendra Business & Contact Information
            </h4>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Proprietor / Agent Name</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Shop / Kendra Display Name</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.shopName}
                onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Mobile Number</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Official Email Address</label>
              <input
                type="email"
                disabled={!isEditing}
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Operating Shop Address</label>
            <input
              type="text"
              disabled={!isEditing}
              className="form-control"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">City / District</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Postal Pincode</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Bank & Settlement Details */}
        <div className="card" style={{ padding: "1.75rem", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
            <Landmark size={18} color="var(--emerald)" />
            <h4 style={{ fontSize: "1.1rem", color: "var(--secondary)" }}>
              Bank Settlement Account Details
            </h4>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Bank Name</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Number</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">IFSC Code</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.ifsc}
                onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Branch Name</label>
              <input
                type="text"
                disabled={!isEditing}
                className="form-control"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* KYC Compliance Checklist */}
        <div className="card" style={{ padding: "1.75rem", marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
            <ShieldCheck size={18} color="var(--primary)" />
            <h4 style={{ fontSize: "1.1rem", color: "var(--secondary)" }}>
              KYC & Government Compliance Status
            </h4>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.75rem", background: "#f8fafc", borderRadius: "var(--radius-md)" }}>
              <CheckCircle2 size={20} color="var(--emerald)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>Aadhaar e-KYC</div>
                <div style={{ fontSize: "0.75rem", color: "var(--emerald)" }}>Verified (UIDAI)</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.75rem", background: "#f8fafc", borderRadius: "var(--radius-md)" }}>
              <CheckCircle2 size={20} color="var(--emerald)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>PAN Validation</div>
                <div style={{ fontSize: "0.75rem", color: "var(--emerald)" }}>Verified (ITD NSDL)</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.75rem", background: "#f8fafc", borderRadius: "var(--radius-md)" }}>
              <CheckCircle2 size={20} color="var(--emerald)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>Physical Shop Photo</div>
                <div style={{ fontSize: "0.75rem", color: "var(--emerald)" }}>Approved by Admin</div>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
