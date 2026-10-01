import React from "react";
import { useApp } from "../../context/AppContext";
import { Landmark, ShieldCheck, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export const Footer = () => {
  const { setPublicPage, setSelectedCategoryFilter, setCurrentRole } = useApp();

  return (
    <footer style={{ background: "#090d16", color: "#f8fafc", paddingTop: "4rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: "var(--primary)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff"
                }}
              >
                <Landmark size={20} />
              </div>
              <span style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Seva<span style={{ color: "#38bdf8" }}>Setu</span>
              </span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: "1.6", marginBottom: "1rem" }}>
              National Citizen Services & Retailer Management Platform. Empowering local Kendras to deliver Aadhaar, PAN, GST, and banking solutions.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34d399", fontSize: "0.8rem", fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>UIDAI & NSDL Compliant Framework</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", marginBottom: "1rem", fontWeight: 700 }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.875rem", color: "#94a3b8" }}>
              <li>
                <button onClick={() => setPublicPage("home")} style={{ color: "inherit", textAlign: "left" }}>
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage("services")} style={{ color: "inherit", textAlign: "left" }}>
                  All Citizen Services
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage("track")} style={{ color: "inherit", textAlign: "left" }}>
                  Track Inquiry Status
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage("about")} style={{ color: "inherit", textAlign: "left" }}>
                  About SevaSetu
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage("contact")} style={{ color: "inherit", textAlign: "left" }}>
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Top Services */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", marginBottom: "1rem", fontWeight: 700 }}>
              Popular Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.875rem", color: "#94a3b8" }}>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter("cat-pan-tax");
                    setPublicPage("services");
                  }}
                  style={{ color: "inherit", textAlign: "left" }}
                >
                  New Physical PAN Card (49A)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter("cat-identity");
                    setPublicPage("services");
                  }}
                  style={{ color: "inherit", textAlign: "left" }}
                >
                  Aadhaar Demographic Update
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter("cat-gst-biz");
                    setPublicPage("services");
                  }}
                  style={{ color: "inherit", textAlign: "left" }}
                >
                  New GST Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter("cat-gst-biz");
                    setPublicPage("services");
                  }}
                  style={{ color: "inherit", textAlign: "left" }}
                >
                  MSME / Udyam Certificate
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter("cat-welfare");
                    setPublicPage("services");
                  }}
                  style={{ color: "inherit", textAlign: "left" }}
                >
                  Ayushman Bharat Golden Card
                </button>
              </li>
            </ul>
          </div>

          {/* Portals Access */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", marginBottom: "1rem", fontWeight: 700 }}>
              Internal Portals
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                className="btn btn-sm"
                style={{ background: "#1e293b", color: "#e2e8f0", justifyContent: "flex-start" }}
                onClick={() => setCurrentRole("retailer")}
              >
                <span>Retailer Kendra Login</span>
                <ArrowRight size={14} style={{ marginLeft: "auto" }} />
              </button>

              <button
                className="btn btn-sm"
                style={{ background: "#1e293b", color: "#e2e8f0", justifyContent: "flex-start" }}
                onClick={() => setCurrentRole("admin")}
              >
                <span>Admin Management Panel</span>
                <ArrowRight size={14} style={{ marginLeft: "auto" }} />
              </button>
            </div>
            <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#64748b" }}>
              Toll Free Citizen Help: <strong>1800-889-SEVA</strong>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            padding: "1.5rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.8rem",
            color: "#64748b"
          }}
        >
          <div>
            © 2026 SevaSetu Digital Services Pvt Ltd. All rights reserved. ISO 27001 Certified.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Retailer Agreement</span>
            <span>Grievance Redressal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
