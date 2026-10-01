import React from "react";
import { useApp } from "../../context/AppContext";
import { normalizeDoc, DocFormatBadges } from "../../utils/docUtils";
import { X, CheckCircle, Clock, FileText, AlertCircle, ArrowRight, ShieldCheck, CheckSquare, Square } from "lucide-react";

export const ServiceDetailModal = () => {
  const {
    serviceDetailModal,
    setServiceDetailModal,
    setInquiryModal,
    currentRole,
    setApplyServiceModal
  } = useApp();

  if (!serviceDetailModal.isOpen || !serviceDetailModal.service) return null;

  const srv = serviceDetailModal.service;
  const docs = (srv.requiredDocuments || []).map(normalizeDoc);

  const handleInquire = () => {
    setServiceDetailModal({ isOpen: false, service: null });
    setInquiryModal({ isOpen: true, preselectedServiceId: srv.id });
  };

  const handleRetailerApply = () => {
    setServiceDetailModal({ isOpen: false, service: null });
    setApplyServiceModal({ isOpen: true, service: srv });
  };

  return (
    <div className="modal-overlay" onClick={() => setServiceDetailModal({ isOpen: false, service: null })}>
      <div
        className="modal-content modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
              <span className="badge badge-blue">{srv.categoryName}</span>
              {srv.badge && <span className="badge badge-amber">{srv.badge}</span>}
            </div>
            <h3>{srv.name}</h3>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => setServiceDetailModal({ isOpen: false, service: null })}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Top highlight stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              background: "#f8fafc",
              padding: "1rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--card-border)",
              marginBottom: "1.5rem"
            }}
          >
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>
                Govt Turnaround Time
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "700", marginTop: "2px", color: "var(--secondary)" }}>
                <Clock size={16} color="var(--primary)" />
                <span>{srv.turnaroundTime}</span>
              </div>
            </div>

            {currentRole === "retailer" ? (
              <>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>
                    Citizen Service Fee
                  </div>
                  <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                    ₹{srv.customerPrice}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>
                    Base Govt Statutory Fee
                  </div>
                  <div style={{ fontWeight: "700", color: "var(--text-secondary)", marginTop: "2px" }}>
                    {srv.governmentFee > 0 ? `₹${srv.governmentFee} (Official)` : "Zero Govt Charges"}
                  </div>
                </div>

                <div style={{ borderLeft: "2px solid var(--emerald-border)", paddingLeft: "10px" }}>
                  <div style={{ fontSize: "0.75rem", color: "#065f46", textTransform: "uppercase", fontWeight: "700" }}>
                    Retailer Commission
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--emerald)" }}>
                    +₹{srv.retailerCommission} Margin
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>
                    Service Rate Policy
                  </div>
                  <div style={{ marginTop: "4px" }}>
                    <span className="badge badge-slate" style={{ fontSize: "0.8rem" }}>
                      📍 City-Based Rate
                    </span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    Rates vary by city & jurisdiction
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>
                    Doorstep / Kendra Assistance
                  </div>
                  <div style={{ fontWeight: "700", color: "var(--primary)", marginTop: "3px", fontSize: "0.95rem" }}>
                    Quote on Inquiry
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    Verified agent doorstep guidance
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>
              Service Overview & Specifications
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: "1.6" }}>
              {srv.description}
            </p>
          </div>

          {/* Required Documents Checklist with Image/PDF & Checkboxes */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FileText size={18} color="var(--primary)" />
                <h4 style={{ fontSize: "1rem", color: "var(--secondary)" }}>
                  Mandatory Required Documents Checklist (What Needed)
                </h4>
              </div>
              <span className="badge badge-slate" style={{ fontSize: "0.75rem" }}>
                {docs.length} Documents Required
              </span>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid var(--card-border)",
                borderRadius: "var(--radius-lg)",
                padding: "0.75rem"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {docs.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "var(--radius-md)",
                      background: doc.isMandatory ? "#f8fafc" : "#ffffff",
                      border: "1px solid",
                      borderColor: doc.isMandatory ? "var(--primary-border)" : "var(--card-border)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: doc.isMandatory ? "var(--emerald)" : "var(--text-muted)" }}>
                        {doc.isMandatory ? <CheckSquare size={18} /> : <Square size={18} />}
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--secondary)" }}>
                          {doc.title}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          {doc.isMandatory ? "Compulsory document for verification" : "Optional / Supporting document"}
                        </div>
                      </div>
                    </div>

                    <DocFormatBadges type={doc.type} allowPdf={doc.allowPdf} allowImage={doc.allowImage} isMandatory={doc.isMandatory} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Advice */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0.75rem 1rem",
              background: "var(--emerald-subtle)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--emerald-border)",
              fontSize: "0.825rem",
              color: "#065f46"
            }}
          >
            <ShieldCheck size={18} color="var(--emerald)" style={{ flexShrink: 0 }} />
            <span>
              All applications processed through SevaSetu receive an official government acknowledgment receipt
              (URN / ARN) directly verifiable on the relevant ministry portal.
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setServiceDetailModal({ isOpen: false, service: null })}
          >
            Close
          </button>

          {currentRole === "retailer" ? (
            <button type="button" className="btn btn-emerald" onClick={handleRetailerApply}>
              <span>Apply for Customer (Earn ₹{srv.retailerCommission})</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={handleInquire}>
              <span>Inquire for Rate & Booking</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
