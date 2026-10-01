import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { X, Send, CheckCircle2, ShieldCheck, Clock, FileText, ArrowRight } from "lucide-react";

export const InquiryModal = () => {
  const {
    inquiryModal,
    setInquiryModal,
    services,
    addInquiry,
    setPublicPage
  } = useApp();

  const [formData, setFormData] = useState({
    customerName: "",
    mobile: "",
    email: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
    serviceId: "",
    message: ""
  });

  const [submittedInquiry, setSubmittedInquiry] = useState(null);

  useEffect(() => {
    if (inquiryModal.isOpen) {
      setSubmittedInquiry(null);
      if (inquiryModal.preselectedServiceId) {
        setFormData((prev) => ({
          ...prev,
          serviceId: inquiryModal.preselectedServiceId
        }));
      } else if (services.length > 0 && !formData.serviceId) {
        setFormData((prev) => ({
          ...prev,
          serviceId: services[0].id
        }));
      }
    }
  }, [inquiryModal.isOpen, inquiryModal.preselectedServiceId, services]);

  if (!inquiryModal.isOpen) return null;

  const selectedService = services.find((s) => s.id === formData.serviceId) || services[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.mobile) {
      alert("Please enter customer name and contact mobile number");
      return;
    }

    const created = addInquiry({
      customerName: formData.customerName,
      mobile: formData.mobile,
      email: formData.email || "citizen@digitalseva.in",
      city: formData.city || "Lucknow",
      state: formData.state,
      pincode: formData.pincode || "226010",
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      message: formData.message || "Requesting service booking assistance and document verification."
    });

    setSubmittedInquiry(created);
  };

  const handleClose = () => {
    setInquiryModal({ isOpen: false, preselectedServiceId: null });
    setSubmittedInquiry(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: submittedInquiry ? "520px" : "620px" }}
      >
        <div className="modal-header">
          <div>
            <h3>{submittedInquiry ? "Inquiry Confirmed" : "Submit Service Inquiry"}</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "2px" }}>
              {submittedInquiry
                ? "Your request has been routed to our nearest verified Kendra"
                : "Get expert assistance, document verification & instant processing"}
            </p>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {submittedInquiry ? (
          <div className="modal-body" style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "var(--emerald-subtle)",
                color: "var(--emerald)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem"
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h4 style={{ fontSize: "1.35rem", marginBottom: "0.5rem" }}>
              Inquiry Registered Successfully!
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
              Thank you, <strong>{submittedInquiry.customerName}</strong>. Our authorized Digital Seva Retailer
              will contact you within <strong>30 minutes</strong> to collect required documents.
            </p>

            <div
              style={{
                background: "#f8fafc",
                border: "1px dashed var(--primary-border)",
                borderRadius: "var(--radius-md)",
                padding: "1rem",
                marginBottom: "1.5rem"
              }}
            >
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>YOUR REFERENCE TICKET ID</div>
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "800",
                  color: "var(--primary)",
                  letterSpacing: "0.05em",
                  fontFamily: "var(--font-heading)"
                }}
              >
                {submittedInquiry.id}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>
                Service: <strong>{submittedInquiry.serviceName}</strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                className="btn btn-outline"
                onClick={() => {
                  handleClose();
                  setPublicPage("track");
                }}
              >
                Track Status Now
              </button>
              <button className="btn btn-primary" onClick={handleClose}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Selected Service Card Highlight */}
              {selectedService && (
                <div
                  style={{
                    background: "var(--primary-subtle)",
                    border: "1px solid var(--primary-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.85rem 1rem",
                    marginBottom: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <span className="badge badge-blue" style={{ fontSize: "0.7rem", marginBottom: "3px" }}>
                      {selectedService.categoryName}
                    </span>
                    <div style={{ fontWeight: "700", color: "var(--secondary)", fontSize: "0.95rem" }}>
                      {selectedService.name}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      Govt processing time: {selectedService.turnaroundTime}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="badge badge-slate" style={{ fontSize: "0.75rem" }}>
                      📍 City-Based Rate
                    </span>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      Quote on Inquiry
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rameshwar Verma"
                    className="form-control"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    className="form-control"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Select Service Required *</label>
                  <select
                    className="form-control"
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  >
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">City / Town</label>
                  <input
                    type="text"
                    placeholder="e.g. Lucknow"
                    className="form-control"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <select
                    className="form-control"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  >
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    placeholder="6 digits"
                    maxLength={6}
                    className="form-control"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Specific Query or Special Requirement</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about any name correction, urgent deadline, or missing document..."
                  className="form-control"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.775rem",
                  color: "var(--text-muted)",
                  background: "#f1f5f9",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "var(--radius-sm)"
                }}
              >
                <ShieldCheck size={16} color="var(--emerald)" />
                <span>Your information is encrypted & shared only with authorized Kendra agents.</span>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Send size={15} />
                <span>Submit Inquiry Now</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
