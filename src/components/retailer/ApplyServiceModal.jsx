import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { normalizeDoc, DocFormatBadges, validateFieldValue } from "../../utils/docUtils";
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
  Square,
  Sparkles,
  Hash,
  Type,
  Binary,
  Files,
  Trash2,
  Info
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
    notes: ""
  });

  const [fieldValues, setFieldValues] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
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
        notes: ""
      });
      setFieldValues({});
      setFieldErrors({});
      setUploadedFiles({});
    }
  }, [applyServiceModal.isOpen, service]);

  if (!applyServiceModal.isOpen || !service) return null;

  const cost = parseFloat(service.retailerCost || 0);
  const commission = parseFloat(service.retailerCommission || 0);
  const hasSufficientBalance = currentRetailer.walletBalance >= cost;

  // Handle live typing in text/number/alphanumeric fields
  const handleFieldValueChange = (key, val, doc) => {
    setFieldValues((prev) => ({ ...prev, [key]: val }));

    // Run real-time validation
    const result = validateFieldValue(val, doc.type, doc.isMandatory);
    setFieldErrors((prev) => {
      const copy = { ...prev };
      if (!result.isValid) {
        copy[key] = result.error;
      } else {
        delete copy[key];
      }
      return copy;
    });
  };

  // Handle actual file upload via file input
  const handleRealFileUpload = (key, e, doc) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isImage = file.type.startsWith("image/") || /\.(jpg|jpeg|png)$/i.test(file.name);
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);

    if (doc.type === "image" && !isImage) {
      setFieldErrors((prev) => ({ ...prev, [key]: "Invalid format: Only JPG or PNG image files are accepted." }));
      return;
    }

    if (doc.type === "pdf" && !isPdf) {
      setFieldErrors((prev) => ({ ...prev, [key]: "Invalid format: Only PDF documents (.pdf) are accepted." }));
      return;
    }

    if (doc.type === "image_or_pdf" && !isImage && !isPdf) {
      setFieldErrors((prev) => ({ ...prev, [key]: "Invalid format: Only Image or PDF files are accepted." }));
      return;
    }

    const fileData = {
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      format: isPdf ? "PDF" : "Image"
    };

    setUploadedFiles((prev) => ({ ...prev, [key]: fileData }));
    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  // Simulate mock file upload for quick testing
  const handleSimulateUpload = (key, doc) => {
    const isPdfOnly = doc.type === "pdf";
    const ext = isPdfOnly ? "pdf" : "jpg";
    const cleanTitle = (doc.title || "Doc").split(" ")[0].replace(/[^a-zA-Z]/g, "") || "Document";
    const mockFileName = `${cleanTitle}_Scan_${Date.now().toString().slice(-4)}.${ext}`;

    setUploadedFiles((prev) => ({
      ...prev,
      [key]: {
        name: mockFileName,
        size: isPdfOnly ? "420 KB" : "280 KB",
        format: isPdfOnly ? "PDF" : "Image"
      }
    }));

    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleRemoveFile = (key) => {
    setUploadedFiles((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  // Quick 1-click auto fill with realistic valid Indian citizen details
  const handleQuickFillSampleData = () => {
    setFormData({
      customerName: "Aarav Kumar Verma",
      customerMobile: "9876543210",
      notes: "Urgent citizen application processed at Kendra."
    });

    const newVals = {};
    const newFiles = {};

    docs.forEach((doc, idx) => {
      const key = doc.id || `doc-${idx}`;
      if (doc.type === "number") {
        const lower = doc.title.toLowerCase();
        if (lower.includes("aadhaar") || lower.includes("12-digit")) {
          newVals[key] = "584291038821";
        } else if (lower.includes("mobile") || lower.includes("phone")) {
          newVals[key] = "9876543210";
        } else if (lower.includes("pin") || lower.includes("code")) {
          newVals[key] = "380015";
        } else {
          newVals[key] = "901234567890";
        }
      } else if (doc.type === "text") {
        newVals[key] = "Aarav Kumar Verma";
      } else if (doc.type === "alphanumeric") {
        const lower = doc.title.toLowerCase();
        if (lower.includes("pan")) {
          newVals[key] = "ABCDE1234F";
        } else if (lower.includes("voter") || lower.includes("epic")) {
          newVals[key] = "XYZ1234567";
        } else {
          newVals[key] = "MH02CL9921";
        }
      } else if (doc.type === "image") {
        newFiles[key] = {
          name: `${doc.title.split(" ")[0]}_PassportPhoto.jpg`,
          size: "245 KB",
          format: "Image"
        };
      } else if (doc.type === "pdf") {
        newFiles[key] = {
          name: `${doc.title.split(" ")[0]}_OfficialDoc.pdf`,
          size: "520 KB",
          format: "PDF"
        };
      } else {
        newFiles[key] = {
          name: `${doc.title.split(" ")[0]}_VerifiedScan.pdf`,
          size: "380 KB",
          format: "PDF"
        };
      }
    });

    setFieldValues(newVals);
    setUploadedFiles(newFiles);
    setFieldErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.customerMobile.trim()) {
      alert("Please enter customer name and phone number.");
      return;
    }

    if (!/^\d{10}$/.test(formData.customerMobile.trim())) {
      alert("Please enter a valid 10-digit customer mobile number.");
      return;
    }

    if (!hasSufficientBalance) {
      alert(`Insufficient balance (₹${currentRetailer.walletBalance}). Required: ₹${cost}`);
      return;
    }

    // Validate each configured requirement
    const errors = {};
    docs.forEach((doc, idx) => {
      const key = doc.id || `doc-${idx}`;
      if (doc.type === "number" || doc.type === "text" || doc.type === "alphanumeric") {
        const val = fieldValues[key];
        const res = validateFieldValue(val, doc.type, doc.isMandatory);
        if (!res.isValid) {
          errors[key] = res.error;
        }
      } else {
        // file upload
        if (doc.isMandatory && !uploadedFiles[key]) {
          errors[key] = `${doc.title} is mandatory. Please attach file.`;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      alert("Please fix the validation errors in the required fields before submitting.");
      return;
    }

    // Prepare uploaded files list & field values for record
    const uploadedDocsList = Object.entries(uploadedFiles).map(([k, file]) => file.name);
    const primaryIdNumber = Object.values(fieldValues).find((v) => /^\d{12}$/.test(v)) || "XXXX-XXXX-9912";

    const app = submitCustomerApplication({
      service,
      customerName: formData.customerName.trim(),
      customerMobile: formData.customerMobile.trim(),
      customerAadhaar: primaryIdNumber,
      uploadedDocs: uploadedDocsList.length > 0 ? uploadedDocsList : ["Aadhaar_Document_Verified.pdf"],
      submittedFields: fieldValues
    });

    if (app) {
      setCreatedApplication({
        ...app,
        fieldValues,
        uploadedFiles
      });
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }
  };

  const handleClose = () => {
    setApplyServiceModal({ isOpen: false, service: null });
    setCreatedApplication(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px" }}>
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
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
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

              {/* Submitted Validated Fields Summary */}
              {docs.length > 0 && (
                <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "0.85rem", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                    Verified Service Field Inputs & Uploaded Documents:
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {docs.map((doc, idx) => {
                      const key = doc.id || `doc-${idx}`;
                      const textVal = createdApplication.fieldValues?.[key];
                      const fileObj = createdApplication.uploadedFiles?.[key];

                      return (
                        <div
                          key={key}
                          style={{
                            background: "#f8fafc",
                            padding: "0.45rem 0.75rem",
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--card-border)",
                            fontSize: "0.78rem"
                          }}
                        >
                          <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 600 }}>
                            {doc.title}:
                          </div>
                          <div style={{ fontWeight: 700, color: "var(--secondary)", display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                            <CheckCircle2 size={13} color="var(--emerald)" />
                            {textVal ? (
                              <span>{textVal}</span>
                            ) : fileObj ? (
                              <span>{fileObj.name} ({fileObj.format})</span>
                            ) : (
                              <span>Verified in Department</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

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
                  marginBottom: "1.25rem"
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

              {/* Header with Quick Fill Button */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h4 style={{ fontSize: "0.95rem", color: "var(--secondary)", margin: 0 }}>
                  Applicant Contact Information
                </h4>
                <button
                  type="button"
                  onClick={handleQuickFillSampleData}
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--primary-border)",
                    color: "var(--primary)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.3rem 0.65rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer"
                  }}
                >
                  <Sparkles size={13} color="var(--primary)" />
                  <span>Quick Fill Valid Sample Data</span>
                </button>
              </div>

              {/* Citizen Details Inputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Customer / Applicant Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name as per official records"
                    className="form-control"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Customer Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    className="form-control"
                    value={formData.customerMobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, customerMobile: val });
                    }}
                  />
                </div>
              </div>

              {/* DYNAMIC REQUIREMENTS & VALIDATION FORM */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <label className="form-label" style={{ marginBottom: 0, fontWeight: 700, fontSize: "0.92rem", color: "var(--secondary)" }}>
                    Required Service Fields & Document Validation Form
                  </label>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {docs.length} Specific Requirements Defined
                  </span>
                </div>

                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "0.85rem" }}>
                  Each field validates according to official department criteria (<strong>Only Number</strong>, <strong>Only Text</strong>, <strong>Number & Text Both</strong>, <strong>Image</strong>, or <strong>PDF</strong>).
                </p>

                <div
                  style={{
                    background: "#f8fafc",
                    border: "1.5px solid var(--card-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem"
                  }}
                >
                  {docs.map((doc, idx) => {
                    const key = doc.id || `doc-${idx}`;
                    const val = fieldValues[key] || "";
                    const error = fieldErrors[key];
                    const fileObj = uploadedFiles[key];

                    const isTextInput = doc.type === "number" || doc.type === "text" || doc.type === "alphanumeric";
                    const isFileInput = doc.type === "image" || doc.type === "pdf" || doc.type === "image_or_pdf";

                    return (
                      <div
                        key={key}
                        style={{
                          background: "#ffffff",
                          borderRadius: "var(--radius-md)",
                          padding: "0.85rem 1rem",
                          border: "1px solid",
                          borderColor: error ? "var(--rose-border)" : val || fileObj ? "var(--emerald-border)" : "var(--card-border)",
                          boxShadow: error ? "0 0 0 2px rgba(239, 68, 68, 0.1)" : "none",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {/* Field Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
                          <label style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--secondary)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>{doc.title}</span>
                            {doc.isMandatory && <span style={{ color: "var(--rose)", fontWeight: 800 }}>*</span>}
                          </label>

                          <DocFormatBadges
                            type={doc.type}
                            allowPdf={doc.allowPdf}
                            allowImage={doc.allowImage}
                            isMandatory={doc.isMandatory}
                          />
                        </div>

                        {/* Text / Numeric / Alphanumeric Inputs */}
                        {isTextInput && (
                          <div>
                            <div style={{ position: "relative" }}>
                              <input
                                type="text"
                                className="form-control"
                                style={{
                                  padding: "0.5rem 0.8rem",
                                  fontSize: "0.85rem",
                                  borderColor: error ? "var(--rose)" : val ? "var(--emerald)" : "var(--card-border)"
                                }}
                                placeholder={
                                  doc.type === "number"
                                    ? "Enter digits only (0-9)... e.g. 5842 9103 8821"
                                    : doc.type === "text"
                                    ? "Enter alphabetic text only (A-Z)..."
                                    : "Enter letters and numbers... e.g. ABCDE1234F"
                                }
                                value={val}
                                onChange={(e) => handleFieldValueChange(key, e.target.value, doc)}
                              />

                              {val && !error && (
                                <div
                                  style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "var(--emerald)",
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                  title="Valid entry"
                                >
                                  <CheckCircle2 size={16} />
                                </div>
                              )}
                            </div>

                            {/* Validation Rule Hint / Error */}
                            {error ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", color: "var(--rose)", marginTop: "4px" }}>
                                <AlertCircle size={12} />
                                <span>{error}</span>
                              </div>
                            ) : (
                              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "3px" }}>
                                {doc.type === "number" && "Rule: Only numeric numbers (0-9) are accepted for this field."}
                                {doc.type === "text" && "Rule: Only letters and spaces (A-Z) are accepted for this field."}
                                {doc.type === "alphanumeric" && "Rule: Both letters and numbers are accepted for this field."}
                              </div>
                            )}
                          </div>
                        )}

                        {/* File Upload Inputs (Image / PDF / Both) */}
                        {isFileInput && (
                          <div>
                            {fileObj ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  background: "var(--emerald-subtle)",
                                  border: "1px solid var(--emerald-border)",
                                  borderRadius: "var(--radius-sm)",
                                  padding: "0.45rem 0.75rem"
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  {fileObj.format === "PDF" ? (
                                    <FileText size={18} color="#b91c1c" />
                                  ) : (
                                    <ImageIcon size={18} color="#3730a3" />
                                  )}
                                  <div>
                                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--secondary)" }}>
                                      {fileObj.name}
                                    </div>
                                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                                      Format: {fileObj.format} | Size: {fileObj.size} (Verified)
                                    </div>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(key)}
                                  style={{
                                    color: "var(--rose)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "3px",
                                    display: "flex"
                                  }}
                                  title="Remove attached file"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <div>
                                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                                  {/* Hidden real file input */}
                                  <label
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "5px",
                                      fontSize: "0.78rem",
                                      fontWeight: 600,
                                      padding: "0.4rem 0.75rem",
                                      borderRadius: "var(--radius-sm)",
                                      border: "1px solid var(--card-border)",
                                      background: "#ffffff",
                                      color: "var(--secondary)",
                                      cursor: "pointer"
                                    }}
                                  >
                                    <Upload size={14} color="var(--primary)" />
                                    <span>
                                      {doc.type === "image" && "Browse Image (.jpg, .png)"}
                                      {doc.type === "pdf" && "Browse PDF Document (.pdf)"}
                                      {doc.type === "image_or_pdf" && "Browse File (PDF / Image)"}
                                    </span>
                                    <input
                                      type="file"
                                      accept={
                                        doc.type === "image"
                                          ? "image/png, image/jpeg, image/jpg"
                                          : doc.type === "pdf"
                                          ? "application/pdf"
                                          : "application/pdf, image/png, image/jpeg, image/jpg"
                                      }
                                      style={{ display: "none" }}
                                      onChange={(e) => handleRealFileUpload(key, e, doc)}
                                    />
                                  </label>

                                  {/* Instant Simulate Upload button */}
                                  <button
                                    type="button"
                                    onClick={() => handleSimulateUpload(key, doc)}
                                    style={{
                                      fontSize: "0.75rem",
                                      fontWeight: 600,
                                      color: "var(--primary)",
                                      background: "var(--primary-subtle)",
                                      border: "1px solid var(--primary-border)",
                                      padding: "0.4rem 0.7rem",
                                      borderRadius: "var(--radius-sm)",
                                      cursor: "pointer"
                                    }}
                                  >
                                    ⚡ Simulate Verified {doc.type === "pdf" ? "PDF" : doc.type === "image" ? "Image" : "Document"}
                                  </button>
                                </div>

                                {error && (
                                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", color: "var(--rose)", marginTop: "4px" }}>
                                    <AlertCircle size={12} />
                                    <span>{error}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
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
