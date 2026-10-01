import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Search,
  Filter,
  Clock,
  FileText,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Sparkles
} from "lucide-react";

export const PublicServices = () => {
  const {
    services,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setServiceDetailModal,
    setInquiryModal
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Filtering
  const filteredServices = services
    .filter((srv) => {
      const matchCategory =
        selectedCategoryFilter === "all" || srv.categoryId === selectedCategoryFilter;
      const matchSearch =
        srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch && srv.status === "active";
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      // default: popular/featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  return (
    <div className="public-services-page" style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: "700px", marginBottom: "2.5rem" }}>
          <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>
            Comprehensive Service Directory
          </span>
          <h1 style={{ fontSize: "2.5rem", color: "var(--secondary)", marginBottom: "0.75rem" }}>
            Citizen & Business Services
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Explore verified government schemes, identity cards, tax filings, and licensing.
            Clear fee structures and required documents checklist.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            background: "#ffffff",
            padding: "1.25rem",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--card-border)",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem"
          }}
        >
          {/* Search & Sort Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div
              style={{
                position: "relative",
                flex: "1 1 320px",
                maxWidth: "500px"
              }}
            >
              <Search
                size={18}
                color="var(--text-muted)"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Search by service name, Aadhaar, PAN, GST..."
                className="form-control"
                style={{ paddingLeft: "2.5rem" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>
                Sort By:
              </span>
              <select
                className="form-control"
                style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="name-asc">Service Name (A to Z)</option>
                <option value="name-desc">Service Name (Z to A)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              borderTop: "1px solid var(--card-border)",
              paddingTop: "1rem"
            }}
          >
            <button
              onClick={() => setSelectedCategoryFilter("all")}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.85rem",
                fontWeight: 600,
                border: "1px solid",
                borderColor: selectedCategoryFilter === "all" ? "var(--primary)" : "var(--card-border)",
                background: selectedCategoryFilter === "all" ? "var(--primary)" : "#ffffff",
                color: selectedCategoryFilter === "all" ? "#ffffff" : "var(--text-secondary)",
                transition: "var(--transition)"
              }}
            >
              All Categories ({services.length})
            </button>

            {categories.map((cat) => {
              const count = services.filter((s) => s.categoryId === cat.id).length;
              const isActive = selectedCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  style={{
                    padding: "0.45rem 1rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    border: "1px solid",
                    borderColor: isActive ? "var(--primary)" : "var(--card-border)",
                    background: isActive ? "var(--primary)" : "#ffffff",
                    color: isActive ? "#ffffff" : "var(--text-secondary)",
                    transition: "var(--transition)"
                  }}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
            color: "var(--text-muted)"
          }}
        >
          <span>
            Showing <strong>{filteredServices.length}</strong> available services
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{ color: "var(--primary)", fontSize: "0.85rem", textDecoration: "underline" }}
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              padding: "4rem 2rem",
              borderRadius: "var(--radius-xl)",
              textAlign: "center",
              border: "1px dashed var(--card-border)"
            }}
          >
            <HelpCircle size={48} color="var(--text-muted)" style={{ margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
              No Services Found
            </h3>
            <p style={{ color: "var(--text-secondary)", maxWidth: "450px", margin: "0 auto 1.5rem" }}>
              We could not find any active service matching "{searchTerm}". Try a different search term or category.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategoryFilter("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {filteredServices.map((srv) => (
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem"
                    }}
                  >
                    <span className="badge badge-blue">{srv.categoryName}</span>
                    {srv.badge && <span className="badge badge-amber">{srv.badge}</span>}
                  </div>

                  <h3
                    style={{
                      fontSize: "1.25rem",
                      color: "var(--secondary)",
                      marginBottom: "0.5rem",
                      lineHeight: "1.3"
                    }}
                  >
                    {srv.name}
                  </h3>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      lineHeight: "1.55",
                      marginBottom: "1rem"
                    }}
                  >
                    {srv.shortDescription}
                  </p>

                  {/* Highlights box */}
                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: "var(--radius-md)",
                      padding: "0.85rem",
                      fontSize: "0.8rem",
                      marginBottom: "1rem",
                      border: "1px solid var(--card-border)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                      <Clock size={14} color="var(--primary)" />
                      <span>Govt SLA: <strong>{srv.turnaroundTime}</strong></span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <FileText size={14} color="var(--emerald)" />
                      <span><strong>{srv.requiredDocuments.length} Documents:</strong> {(typeof srv.requiredDocuments[0] === 'string' ? srv.requiredDocuments[0] : srv.requiredDocuments[0]?.title || 'Aadhaar / ID').slice(0, 32)}...</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.85rem",
                      borderTop: "1px solid var(--card-border)",
                      marginBottom: "1rem"
                    }}
                  >
                    <div>
                      <span className="badge badge-slate" style={{ fontSize: "0.75rem" }}>
                        📍 City-Based Rate
                      </span>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        Rates vary by city & jurisdiction
                      </div>
                    </div>

                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setServiceDetailModal({ isOpen: true, service: srv })}
                    >
                      <span>Required Docs</span>
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
        )}
      </div>
    </div>
  );
};
