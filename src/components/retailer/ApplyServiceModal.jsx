import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { normalizeDoc, DocFormatBadges } from "../../utils/docUtils";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  AlertCircle,
  Printer,
  Download,
  Upload,
  FileText,
  Image as ImageIcon,
  CheckSquare,
  Square
} from "lucide-react";
import confetti from "canvas-confetti";

export const ApplyServiceModal = () => {
  const {
    applyServiceModal,
    setApplyServiceModal,
    currentRetailer,
    submitCustomerApplication,
    setWalletRechargeModal
  } = useApp();

  const [formData, setFormData] = useState({
    customerName: "",
    customerMobile: "",
    customerAadhaar: "",
    notes: ""
  });

  const [checkedDocs, setCheckedDocs] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [createdApplication, setCreatedApplication] = useState(null);

  const service = applyServiceModal?.service;
  const docs = (service?.requiredDocuments || []).map(normalizeDoc);

  useEffect(() => {
    if (applyServiceModal.isOpen && service) {
      setCreatedApplication(null);
      setFormData({
        customerName: "",
        customerMobile: "",
        customerAadhaar: "",
        notes: ""
      });
      // pre-check docs
      const initialChecks = {};
      const initialFiles = {};
      docs.forEach((doc, idx) => {
        initialChecks[idx] = true;
        // simulate pre-attached mock file
        const ext = doc.allowPdf ? ".pdf" : ".jpg";
        const cleanTitle = doc.title.split(" ")[0].replace(/[^a-zA-Z]/g, "") || "Document";
        initialFiles[idx] = `${cleanTitle}_Scan${ext}`;
      });
      setCheckedDocs(initialChecks);
      setUploadedFiles(initialFiles);
    }
  }, [applyServiceModal.isOpen, service]);

  if (!applyServiceModal.isOpen || !service) return null;

  const cost = parseFloat(service.retailerCost || 0);
  const commission = parseFloat(service.retailerCommission || 0);
  const hasSufficientBalance = currentRetailer.walletBalance >= cost;

  const handleToggleDoc = (idx) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSimulateUpload = (idx, doc) => {
    const ext = doc.allowPdf ? "PDF" : "JPG";
    const cleanTitle = doc.title.split(" ")[0].replace(/[^a-zA-Z]/g, "") || "Document";
    const mockFileName = `${cleanTitle}_Verified_${Date.now().toString().slice(-4)}.${ext.toLowerCase()}`;
    setUploadedFiles((prev) => ({ ...prev, [idx]: mockFileName }));
    setCheckedDocs((prev) => ({ ...prev, [idx]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerMobile) {
      alert("Please enter customer name and phone number");
      return;
    }

    if (!hasSufficientBalance) {
      alert(`Insufficient balance (₹${currentRetailer.walletBalance}). Required: ₹${cost}`);
      return;
    }

    const app = submitCustomerApplication({
      service,
      customerName: formData.customerName,
      customerMobile: formData.customerMobile,
      customerAadhaar: formData.customerAadhaar || "XXXX-XXXX-9912",
      uploadedDocs: Object.values(uploadedFiles)
    });

    if (app) {
      setCreatedApplication(app);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleClose = () => {
    setApplyServiceModal({ isOpen: false, service: null });
    setCreatedApplication(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "780px" }}>
        <div className="modal-header">
          <div>
            <h3>{createdApplication ? "Application Receipt" : `Apply Service: ${service.name}`}</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {createdApplication
                ? "Official Kendra acknowledgment generated"
                : `Retailer: ${currentRetailer.shopName} (${currentRetailer.cscId})`}
            </p>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {createdApplication ? (
          <div className="modal-body" style={{ padding: "2rem" }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "1.5rem"
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "var(--emerald-subtle)",
                  color: "var(--emerald)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem"
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: "1.35rem", color: "var(--secondary)" }}>
                Application Processed Successfully!
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                Guaranteed commission of <strong>₹{createdApplication.commissionEarned}</strong> has been credited to your Kendra wallet.
              </p>
            </div>

            {/* Official Printable Receipt Slip */}
            <div
              style={{
                border: "2px dashed #cbd5e1",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                background: "#ffffff",
                marginBottom: "1.5rem"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderBottom: "1px solid var(--card-border)",
                  paddingBottom: "1rem",
                  marginBottom: "1rem"
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--secondary)" }}>
                    {currentRetailer.shopName}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Kendra ID: {currentRetailer.cscId} | Contact: {currentRetailer.mobile}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {currentRetailer.address}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span className="badge badge-green">Department Submitted</span>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                    Date: {createdApplication.date}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  fontSize: "0.875rem",
                  marginBottom: "1.25rem"
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Applicant Name:</span>
                  <div style={{ fontWeight: 700 }}>{createdApplication.customerName}</div>
                </div>

                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Contact Mobile:</span>
                  <div style={{ fontWeight: 700 }}>{createdApplication.customerMobile}</div>
                </div>

                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Service Name:</span>
                  <div style={{ fontWeight: 700, color: "var(--primary)" }}>{createdApplication.serviceName}</div>
                </div>

                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Govt ARN / Acknowledgement:</span>
                  <div style={{ fontWeight: 800, color: "var(--secondary)", letterSpacing: "0.03em" }}>
                    {createdApplication.acknowledgementNo}
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid var(--card-border)"
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Total Amount Collected from Citizen:</span>
                <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--secondary)" }}>
                  ₹{createdApplication.customerPrice}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
              <button
                className="btn btn-outline"
                onClick={() => {
                  alert("Receipt dispatched to printer queue!");
                }}
              >
                <Printer size={16} />
                <span>Print Customer Slip</span>
              </button>

              <button className="btn btn-primary" onClick={handleClose}>
                Done & Return to Services
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ maxHeight: "75vh", overflowY: "auto" }}>
              {/* Financial Breakdown Card */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  background: "var(--primary-subtle)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem",
                  border: "1px solid var(--primary-border)",
                  marginBottom: "1.5rem"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Citizen MRP
                  </div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--secondary)" }}>
                    ₹{service.customerPrice}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Collect in cash/UPI</div>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Kendra Wallet Cost
                  </div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--rose)" }}>
                    -₹{service.retailerCost}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Official dept fee</div>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "#065f46", textTransform: "uppercase", fontWeight: 700 }}>
                    Instant Commission
                  </div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--emerald)" }}>
                    +₹{service.retailerCommission}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#065f46" }}>Your guaranteed margin</div>
                </div>
              </div>

              {/* Wallet Warning if insufficient */}
              {!hasSufficientBalance && (
                <div
                  style={{
                    background: "var(--rose-subtle)",
                    border: "1px solid var(--rose-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.85rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                    color: "var(--rose)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                    <AlertCircle size={18} />
                    <span>
                      Insufficient Wallet Balance! Available: <strong>₹{currentRetailer.walletBalance}</strong> (Need ₹{cost})
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setApplyServiceModal({ isOpen: false, service: null });
                      setWalletRechargeModal(true);
                    }}
                  >
                    Recharge Now
                  </button>
                </div>
              )}

              {/* Citizen Details Inputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Customer / Applicant Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name as per Aadhaar / PAN"
                    className="form-control"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Customer Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit customer mobile"
                    className="form-control"
                    value={formData.customerMobile}
                    onChange={(e) => setFormData({ ...formData, customerMobile: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Customer Aadhaar Number / ID Reference</label>
                <input
                  type="text"
                  placeholder="e.g. 5621 8901 4421"
                  className="form-control"
                  value={formData.customerAadhaar}
                  onChange={(e) => setFormData({ ...formData, customerAadhaar: e.target.value })}
                />
              </div>

              {/* Required Documents Checklist with Title, PDF/Image & Checkboxes */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    Required Supporting Documents (What Needed For Verification)
                  </label>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Tick checkbox & attach PDF / Image
                  </span>
                </div>

                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid var(--card-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                  }}
                >
                  {docs.map((doc, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.55rem 0.85rem",
                        borderRadius: "var(--radius-md)",
                        background: checkedDocs[idx] ? "#ffffff" : "#f1f5f9",
                        border: "1px solid",
                        borderColor: checkedDocs[idx] ? "var(--emerald-border)" : "var(--card-border)"
                      }}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          flex: 1
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedDocs[idx]}
                          onChange={() => handleToggleDoc(idx)}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--secondary)" }}>
                            {doc.title}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                            {doc.isMandatory ? "Mandatory Document" : "Optional Document"}
                          </div>
                        </div>
                      </label>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <DocFormatBadges allowPdf={doc.allowPdf} allowImage={doc.allowImage} isMandatory={doc.isMandatory} />

                        {uploadedFiles[idx] ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.75rem",
                              color: "var(--emerald)",
                              fontWeight: 600,
                              background: "var(--emerald-subtle)",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid var(--emerald-border)"
                            }}
                          >
                            <CheckCircle2 size={13} />
                            <span>{uploadedFiles[idx]}</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSimulateUpload(idx, doc)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.72rem",
                              color: "var(--primary)",
                              fontWeight: 600,
                              background: "var(--primary-subtle)",
                              border: "1px solid var(--primary-border)",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "var(--radius-sm)"
                            }}
                          >
                            <Upload size={12} />
                            <span>Attach {doc.allowPdf ? "PDF" : "Image"}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={handleClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-emerald"
                disabled={!hasSufficientBalance}
              >
                <FileCheck size={16} />
                <span>Submit & Pay ₹{cost} from Wallet</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
