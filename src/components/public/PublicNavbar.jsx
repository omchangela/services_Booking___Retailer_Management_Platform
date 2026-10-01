import React from "react";
import { useApp } from "../../context/AppContext";
import { ShieldCheck, Search, HelpCircle, ArrowRight, UserCircle2, Landmark } from "lucide-react";

export const PublicNavbar = () => {
  const {
    publicPage,
    setPublicPage,
    setCurrentRole,
    setInquiryModal,
    searchQuery,
    setSearchQuery
  } = useApp();

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar">
          {/* Brand Logo */}
          <div
            className="brand-logo"
            style={{ cursor: "pointer" }}
            onClick={() => setPublicPage("home")}
          >
            <div className="brand-icon">
              <Landmark size={24} />
            </div>
            <div className="brand-text">
              <h1>Seva<span>Setu</span></h1>
              <div className="brand-tagline">National Citizen & Retailer Network</div>
            </div>
          </div>

          {/* Nav Links */}
          <ul className="nav-links">
            <li>
              <button
                className={`nav-link ${publicPage === "home" ? "active" : ""}`}
                onClick={() => setPublicPage("home")}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${publicPage === "services" ? "active" : ""}`}
                onClick={() => setPublicPage("services")}
              >
                All Services
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${publicPage === "about" ? "active" : ""}`}
                onClick={() => setPublicPage("about")}
              >
                About Us
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${publicPage === "contact" ? "active" : ""}`}
                onClick={() => setPublicPage("contact")}
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${publicPage === "track" ? "active" : ""}`}
                onClick={() => setPublicPage("track")}
              >
                Track Status
              </button>
            </li>
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setInquiryModal({ isOpen: true, preselectedServiceId: null })}
            >
              <HelpCircle size={15} />
              <span>Service Enquiry</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentRole("retailer")}
              title="Open Retailer Kendra Panel"
            >
              <UserCircle2 size={16} />
              <span>Retailer Login</span>
            </button>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentRole("admin")}
              title="Open Super Admin Portal Login"
              style={{ borderColor: "#cbd5e1" }}
            >
              <ShieldCheck size={15} color="var(--primary)" />
              <span>Admin Login</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
