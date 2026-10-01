import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Search,
  FileText,
  Clock,
  Coins,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Layers,
  Sparkles
} from "lucide-react";

export const RetailerServices = () => {
  const {
    services,
    categories,
    setServiceDetailModal,
    setApplyServiceModal,
    currentRetailer
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filtered = services.filter((srv) => {
    const matchCat = selectedCat === "all" || srv.categoryId === selectedCat;
    const matchSearch =
      srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch && srv.status === "active";
  });

  return (
    <div className="retailer-services-tab">
      {/* Top Banner */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "var(--radius-xl)",
          padding: "1.25rem 1.5rem",
          border: "1px solid var(--card-border)",
          boxShadow: "var(--shadow-sm)",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.2rem", color: "var(--secondary)" }}>
            Assigned Digital Seva Catalog ({services.length} Services)
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            All services are pre-approved for Kendra: <strong>{currentRetailer.shopName}</strong>. Guaranteed instant commission credit.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <div style={{ position: "relative", minWidth: "260px" }}>
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Search assigned service..."
              className="form-control"
              style={{ paddingLeft: "2rem", padding: "0.45rem 2rem 0.45rem 2rem", fontSize: "0.85rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem"
        }}
      >
        <button
          onClick={() => setSelectedCat("all")}
          style={{
            padding: "0.4rem 0.85rem",
            borderRadius: "var(--radius-full)",
            fontSize: "0.8rem",
            fontWeight: 600,
            border: "1px solid",
            borderColor: selectedCat === "all" ? "var(--primary)" : "var(--card-border)",
            background: selectedCat === "all" ? "var(--primary)" : "#ffffff",
            color: selectedCat === "all" ? "#ffffff" : "var(--text-secondary)"
          }}
        >
          All Categories ({services.length})
        </button>

        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            style={{
              padding: "0.4rem 0.85rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8rem",
              fontWeight: 600,
              border: "1px solid",
              borderColor: selectedCat === c.id ? "var(--primary)" : "var(--card-border)",
              background: selectedCat === c.id ? "var(--primary)" : "#ffffff",
              color: selectedCat === c.id ? "#ffffff" : "var(--text-secondary)"
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Services Grid with Retailer Margins */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "1.25rem"
        }}
      >
        {filtered.map((srv) => (
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
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span className="badge badge-blue" style={{ fontSize: "0.7rem" }}>
                  {srv.categoryName}
                </span>
                {srv.badge && <span className="badge badge-amber" style={{ fontSize: "0.7rem" }}>{srv.badge}</span>}
              </div>

              <h4 style={{ fontSize: "1.15rem", color: "var(--secondary)", marginBottom: "0.35rem" }}>
                {srv.name}
              </h4>

              <p style={{ color: "var(--text-secondary)", fontSize: "0.825rem", lineHeight: "1.5", marginBottom: "0.75rem" }}>
                {srv.shortDescription}
              </p>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--card-border)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.85rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={13} color="var(--primary)" />
                  <span>SLA Turnaround: <strong>{srv.turnaroundTime}</strong></span>
                </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <FileText size={13} color="var(--emerald)" />
                    <span><strong>{srv.requiredDocuments.length} Required Docs:</strong> {(typeof srv.requiredDocuments[0] === 'string' ? srv.requiredDocuments[0] : srv.requiredDocuments[0]?.title || 'Aadhaar / ID').slice(0, 30)}...</span>
                  </div>
              </div>
            </div>

            <div>
              {/* Financial Box */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "0.5rem",
                  padding: "0.6rem 0.75rem",
                  background: "var(--emerald-subtle)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--emerald-border)",
                  marginBottom: "0.85rem",
                  textAlign: "center"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Citizen Price
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--secondary)" }}>
                    ₹{srv.customerPrice}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Kendra Debit
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--rose)" }}>
                    ₹{srv.retailerCost}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.65rem", color: "#065f46", textTransform: "uppercase", fontWeight: 700 }}>
                    Commission
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--emerald)" }}>
                    +₹{srv.retailerCommission}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="btn btn-sm btn-outline"
                  style={{ flex: 1, fontSize: "0.8rem" }}
                  onClick={() => setServiceDetailModal({ isOpen: true, service: srv })}
                >
                  <FileText size={14} />
                  <span>Docs Checklist</span>
                </button>

                <button
                  className="btn btn-sm btn-emerald"
                  style={{ flex: 1.3, fontSize: "0.8rem" }}
                  onClick={() => setApplyServiceModal({ isOpen: true, service: srv })}
                >
                  <span>Apply for Citizen</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
