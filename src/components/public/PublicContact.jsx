import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck, MessageSquare } from "lucide-react";

export const PublicContact = () => {
  const { addInquiry, services, setPublicPage } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    serviceId: services[0] ? services[0].id : "",
    subject: "",
    message: ""
  });

  const [ticketCreated, setTicketCreated] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert("Please provide your name and contact mobile number");
      return;
    }

    const matchedService = services.find((s) => s.id === formData.serviceId) || services[0];

    const inq = addInquiry({
      customerName: formData.name,
      mobile: formData.mobile,
      email: formData.email || "citizen@digitalseva.in",
      city: "Online Portal",
      state: "India",
      pincode: "110001",
      serviceId: matchedService ? matchedService.id : "srv-pan-new",
      serviceName: matchedService ? matchedService.name : "Citizen Inquiry",
      message: `${formData.subject ? `[${formData.subject}] ` : ""}${formData.message || "General customer support request."}`
    });

    setTicketCreated(inq);
  };

  return (
    <div className="public-contact-page" style={{ padding: "3.5rem 0 5rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: "700px", margin: "0 auto 3.5rem", textAlign: "center" }}>
          <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>
            We're Here To Help
          </span>
          <h1 style={{ fontSize: "2.75rem", color: "var(--secondary)", marginBottom: "0.75rem" }}>
            Contact SevaSetu Support & Kendra Desk
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Reach out for citizen application guidance, retailer partnership onboarding, or grievance redressal.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2.5rem"
          }}
        >
          {/* Contact Details Column */}
          <div>
            <div className="card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.3rem", color: "var(--secondary)", marginBottom: "1.5rem" }}>
                National Headquarters & Support
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--primary-subtle)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", color: "var(--secondary)", marginBottom: "0.2rem" }}>
                      Central Office
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.5" }}>
                      SevaSetu Bhavan, 4th Floor, Barakhamba Road, Connaught Place, New Delhi - 110001
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--emerald-subtle)",
                      color: "var(--emerald)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", color: "var(--secondary)", marginBottom: "0.2rem" }}>
                      Toll-Free Helpline
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                      <strong>1800-889-SEVA (7382)</strong> / +91 (11) 2341-9000
                    </p>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      Mon - Sat: 9:00 AM - 7:00 PM IST
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--amber-subtle)",
                      color: "var(--amber)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", color: "var(--secondary)", marginBottom: "0.2rem" }}>
                      Direct Email Desks
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                      Citizen Inquiries: <strong>help@sevasetu.in</strong>
                    </p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                      Retailer Onboarding: <strong>partner@sevasetu.in</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Hubs Pill */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid var(--card-border)",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem"
              }}
            >
              <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem", letterSpacing: "0.03em" }}>
                Regional Hubs & Helpdesks
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <span className="badge badge-slate">Lucknow (UP Hub)</span>
                <span className="badge badge-slate">Jaipur (Rajasthan Hub)</span>
                <span className="badge badge-slate">Patna (Bihar Hub)</span>
                <span className="badge badge-slate">Nagpur (Maharashtra Hub)</span>
                <span className="badge badge-slate">Indore (MP Hub)</span>
              </div>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="card" style={{ padding: "2rem" }}>
            {ticketCreated ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
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
                <h3 style={{ fontSize: "1.4rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", marginBottom: "1.5rem" }}>
                  Your support request has been logged. An official ticket has been assigned to your mobile number.
                </p>

                <div
                  style={{
                    background: "var(--primary-subtle)",
                    border: "1px dashed var(--primary-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "1rem",
                    marginBottom: "1.5rem"
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    SUPPORT TICKET REFERENCE
                  </div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary)" }}>
                    {ticketCreated.id}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setTicketCreated(null);
                      setFormData({ name: "", mobile: "", email: "", serviceId: services[0]?.id || "", subject: "", message: "" });
                    }}
                  >
                    Submit Another Query
                  </button>
                  <button className="btn btn-primary" onClick={() => setPublicPage("track")}>
                    Track Ticket Status
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
                  <MessageSquare size={20} color="var(--primary)" />
                  <h3 style={{ fontSize: "1.3rem", color: "var(--secondary)" }}>
                    Send an Instant Inquiry
                  </h3>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      className="form-control"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Relevant Service</label>
                  <select
                    className="form-control"
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Document clarification, urgent GST ARN query"
                    className="form-control"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your query or requirement in detail..."
                    className="form-control"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.85rem" }}>
                  <Send size={16} />
                  <span>Send Inquiry & Generate Ticket</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
