import React from "react";
import { useApp } from "../../context/AppContext";
import { ShieldCheck, Target, Eye, Award, Users, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";

export const PublicAbout = () => {
  const { setPublicPage, setInquiryModal } = useApp();

  return (
    <div className="public-about-page" style={{ padding: "3.5rem 0 5rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: "780px", margin: "0 auto 3.5rem", textAlign: "center" }}>
          <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>
            Empowering Digital India
          </span>
          <h1 style={{ fontSize: "2.75rem", color: "var(--secondary)", marginBottom: "1rem" }}>
            Bridging Citizens & Government Services Through Local Kendras
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.6" }}>
            SevaSetu was established to simplify government paperwork, business registrations, and citizen welfare schemes
            by creating a transparent, assisted bridge between citizens and verified local retailers.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem"
          }}
        >
          <div
            className="card"
            style={{
              padding: "2rem",
              borderTop: "4px solid var(--primary)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
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
                justifyContent: "center"
              }}
            >
              <Target size={28} />
            </div>
            <h3 style={{ fontSize: "1.35rem", color: "var(--secondary)" }}>Our Mission</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
              To ensure that every citizen, from urban professionals to rural unorganized workers, can access essential identity documents,
              tax registrations, and social security cards within 48 hours without intermediaries, confusion, or extortion.
            </p>
          </div>

          <div
            className="card"
            style={{
              padding: "2rem",
              borderTop: "4px solid var(--emerald)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "var(--radius-md)",
                background: "var(--emerald-subtle)",
                color: "var(--emerald)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Eye size={28} />
            </div>
            <h3 style={{ fontSize: "1.35rem", color: "var(--secondary)" }}>Our Vision</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
              To build India's largest and most reliable digital enablement infrastructure, empowering over 100,000 micro-entrepreneurs
              and local retail centers with recurring livelihoods and modern fintech tools.
            </p>
          </div>
        </div>

        {/* Security & Compliance Grid */}
        <div
          style={{
            background: "#ffffff",
            padding: "3rem 2rem",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--card-border)",
            marginBottom: "4rem"
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            <span className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
              Bank-Grade Security
            </span>
            <h2 style={{ fontSize: "1.85rem", color: "var(--secondary)" }}>
              Official Standards & Compliance
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem"
            }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              <CheckCircle2 size={24} color="var(--emerald)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h4 style={{ fontSize: "1rem", color: "var(--secondary)", marginBottom: "0.25rem" }}>
                  UIDAI Demographic Guidelines
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Strict compliance with Aadhaar Act, 2016 and demographic document standards.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <CheckCircle2 size={24} color="var(--emerald)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h4 style={{ fontSize: "1rem", color: "var(--secondary)", marginBottom: "0.25rem" }}>
                  NSDL & UTIITSL Pan Network
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Authorized routing for Form 49A physical card issuance and paperless e-PAN.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <CheckCircle2 size={24} color="var(--emerald)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h4 style={{ fontSize: "1rem", color: "var(--secondary)", marginBottom: "0.25rem" }}>
                  GSTN API Authorized Sandbox
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Real-time GSTIN ARN generation and monthly GSTR-1/3B automated reconciliations.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <CheckCircle2 size={24} color="var(--emerald)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h4 style={{ fontSize: "1rem", color: "var(--secondary)", marginBottom: "0.25rem" }}>
                  ISO 27001 Data Encryption
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Customer ID documents and confidential proofs are encrypted at rest with AES-256.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1.5rem",
            background: "var(--primary-subtle)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--primary-border)"
          }}
        >
          <h3 style={{ fontSize: "1.6rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
            Have questions about our service coverage?
          </h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Reach out to our pan-India support desk or find your closest authorized Retailer Kendra.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <button className="btn btn-primary" onClick={() => setPublicPage("contact")}>
              <span>Contact Support</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-outline" onClick={() => setInquiryModal({ isOpen: true, preselectedServiceId: null })}>
              <span>Submit General Enquiry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
