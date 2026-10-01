import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Search,
  CheckCircle,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Users,
  Building,
  CreditCard,
  Fingerprint,
  Award,
  ChevronRight,
  Sparkles,
  HelpCircle
} from "lucide-react";

export const PublicHome = () => {
  const {
    services,
    categories,
    setPublicPage,
    setSelectedCategoryFilter,
    setServiceDetailModal,
    setInquiryModal,
    setCurrentRole
  } = useApp();

  const [localSearch, setLocalSearch] = useState("");

  const featuredServices = services.filter((s) => s.isFeatured).slice(0, 6);

  const handleCategoryClick = (catId) => {
    setSelectedCategoryFilter(catId);
    setPublicPage("services");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPublicPage("services");
  };

  return (
    <div className="public-home">
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #091124 0%, #0f172a 60%, #1e293b 100%)",
          color: "#ffffff",
          padding: "4.5rem 0 4rem",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Decorative backdrop shapes */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0) 70%)",
            top: "-150px",
            right: "-100px",
            borderRadius: "50%",
            pointerEvents: "none"
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)",
            bottom: "-100px",
            left: "-50px",
            borderRadius: "50%",
            pointerEvents: "none"
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(37, 99, 235, 0.2)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                color: "#93c5fd",
                fontSize: "0.85rem",
                fontWeight: 600,
                marginBottom: "1.5rem"
              }}
            >
              <Sparkles size={16} />
              <span>India's Leading Citizen Services & Retailer Network</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#ffffff",
                marginBottom: "1.25rem"
              }}
            >
              Government Services, Business Filings & Banking —{" "}
              <span style={{ color: "#38bdf8", textDecoration: "underline", textDecorationColor: "rgba(56,189,248,0.4)" }}>
                Simple & Accessible
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "#cbd5e1",
                marginBottom: "2.25rem",
                lineHeight: 1.6
              }}
            >
              Book assisted applications for <strong>Aadhaar Card, PAN Card, GST Registration, ITR, Ayushman Bharat</strong>,
              or become an authorized Retailer Kendra to earn guaranteed commissions.
            </p>

            {/* Hero Quick Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              style={{
                background: "#ffffff",
                padding: "0.5rem",
                borderRadius: "var(--radius-xl)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25)",
                maxWidth: "680px",
                margin: "0 auto 1.5rem"
              }}
            >
              <div style={{ paddingLeft: "1rem", color: "#64748b", display: "flex" }}>
                <Search size={22} />
              </div>
              <input
                type="text"
                placeholder="Search services: e.g. New PAN card, GST registration, Aadhaar update..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "0.75rem 0.5rem",
                  fontSize: "1rem",
                  color: "#0f172a"
                }}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-lg" style={{ borderRadius: "var(--radius-lg)" }}>
                <span>Search Services</span>
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Quick Keyword Pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
                color: "#94a3b8"
              }}
            >
              <span>Popular searches:</span>
              {["PAN Card Form 49A", "GST Registration", "Aadhaar Demographic", "Udyam Certificate", "ITR Filing"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setLocalSearch(tag);
                      setPublicPage("services");
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#e2e8f0",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.8rem",
                      border: "1px solid rgba(255, 255, 255, 0.15)"
                    }}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Network Metrics Bar */}
      <section
        style={{
          background: "#ffffff",
          borderBottom: "1px solid var(--card-border)",
          padding: "1.75rem 0"
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              textAlign: "center"
            }}
          >
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                50,000+
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500 }}>
                Verified Retailer Kendras
              </div>
            </div>

            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--emerald)", fontFamily: "var(--font-heading)" }}>
                120+
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500 }}>
                Citizen G2C & B2B Services
              </div>
            </div>

            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--secondary)", fontFamily: "var(--font-heading)" }}>
                10 Million+
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500 }}>
                Applications Processed
              </div>
            </div>

            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--amber)", fontFamily: "var(--font-heading)" }}>
                99.8%
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500 }}>
                Department Approval Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 3rem" }}>
            <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>
              Explore By Domain
            </span>
            <h2 style={{ fontSize: "2rem", color: "var(--secondary)", marginBottom: "0.75rem" }}>
              Government & Business Categories
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Direct access to essential identity, tax, enterprise, and social welfare programs.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="card"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
                onClick={() => handleCategoryClick(cat.id)}
              >
                <div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--primary-subtle)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem"
                    }}
                  >
                    <Building size={24} />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.4rem", color: "var(--secondary)" }}>
                    {cat.name}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.5" }}>
                    {cat.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--card-border)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--primary)"
                  }}
                >
                  <span>{cat.serviceCount || 4} Available Services</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>Browse</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section style={{ padding: "4rem 0", background: "#f1f5f9" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2.5rem"
            }}
          >
            <div>
              <span className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
                Fast Track Assistance
              </span>
              <h2 style={{ fontSize: "2rem", color: "var(--secondary)" }}>
                Most Requested Citizen Services
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Pre-verified document checklists and transparent turnaround times.
              </p>
            </div>

            <button
              className="btn btn-outline"
              onClick={() => setPublicPage("services")}
            >
              <span>View All Services</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {featuredServices.map((srv) => (
              <div
                key={srv.id}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span className="badge badge-blue">{srv.categoryName}</span>
                    {srv.badge && <span className="badge badge-amber">{srv.badge}</span>}
                  </div>

                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>
                    {srv.name}
                  </h3>

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.5" }}>
                    {srv.shortDescription}
                  </p>

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "1rem",
                      fontSize: "0.8rem",
                      color: "var(--text-muted)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <Clock size={14} color="var(--primary)" />
                      <span>Turnaround: <strong>{srv.turnaroundTime}</strong></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <FileText size={14} color="var(--emerald)" />
                      <span>{srv.requiredDocuments.length} Verified Documents Required</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.85rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--card-border)"
                    }}
                  >
                    <div>
                      <span className="badge badge-slate" style={{ fontSize: "0.75rem" }}>
                        📍 City-Based Rate
                      </span>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        Assisted government service
                      </div>
                    </div>

                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setServiceDetailModal({ isOpen: true, service: srv })}
                    >
                      <span>Check Required Docs</span>
                    </button>
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "0.75rem 1rem" }}
                    onClick={() => setInquiryModal({ isOpen: true, preselectedServiceId: srv.id })}
                  >
                    <HelpCircle size={15} />
                    <span>Inquire for Price & Booking</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Workflow */}
      <section style={{ padding: "4.5rem 0", background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3.5rem" }}>
            <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>
              Hassle-Free Process
            </span>
            <h2 style={{ fontSize: "2rem", color: "var(--secondary)" }}>
              How SevaSetu Citizen Flow Works
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              No long queues or government portal confusion. Get assisted service in 3 simple steps.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              position: "relative"
            }}
          >
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "var(--primary-subtle)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  fontSize: "1.3rem",
                  fontWeight: 800
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>
                Select Service & Submit Inquiry
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                Choose required government service (PAN, Aadhaar, GST) and submit your contact information online.
              </p>
            </div>

            <div style={{ textAlign: "center", padding: "1.5rem" }}>
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
                  margin: "0 auto 1.25rem",
                  fontSize: "1.3rem",
                  fontWeight: 800
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>
                Kendra Agent Document Verification
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                Our nearest verified Retailer Kendra connects with you, validates required documents, and prepares filings.
              </p>
            </div>

            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "var(--amber-subtle)",
                  color: "var(--amber)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  fontSize: "1.3rem",
                  fontWeight: 800
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>
                Fast Dispatch & Certificate Delivery
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                Get official ARN / URN tracking reference and receive your digital certificate or physical card at doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Retailer Recruitment Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)",
          color: "#ffffff",
          padding: "3.5rem 0",
          borderRadius: "var(--radius-xl)",
          margin: "0 1.5rem 4rem"
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem"
            }}
          >
            <div style={{ maxWidth: "650px" }}>
              <span
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  display: "inline-block",
                  marginBottom: "0.75rem"
                }}
              >
                🏪 Retailer Business Opportunity
              </span>
              <h2 style={{ fontSize: "2.1rem", color: "#ffffff", marginBottom: "0.75rem" }}>
                Run an Authorized Digital Seva Kendra in Your Area
              </h2>
              <p style={{ color: "#cbd5e1", fontSize: "1rem", lineHeight: "1.6" }}>
                Earn high recurring commissions on PAN, Aadhaar updates, GST registration, and tax filings.
                Instant wallet payouts, no heavy setup fees, and 24x7 back-office support.
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                className="btn btn-lg"
                style={{ background: "#ffffff", color: "#1e3a8a", fontWeight: 700 }}
                onClick={() => setCurrentRole("retailer")}
              >
                <span>Open Retailer Panel Demo</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
