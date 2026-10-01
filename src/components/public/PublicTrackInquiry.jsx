import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Search, CheckCircle2, Clock, MapPin, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export const PublicTrackInquiry = () => {
  const { inquiries, applications } = useApp();
  const [trackingId, setTrackingId] = useState("");
  const [searchedRecord, setSearchedRecord] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const cleanId = trackingId.trim().toUpperCase();
    if (!cleanId) return;

    // Search in inquiries
    const foundInq = inquiries.find((i) => i.id.toUpperCase() === cleanId);
    if (foundInq) {
      setSearchedRecord({ type: "inquiry", data: foundInq });
      setHasSearched(true);
      return;
    }

    // Search in applications
    const foundApp = applications.find(
      (a) => a.id.toUpperCase() === cleanId || a.acknowledgementNo?.toUpperCase() === cleanId
    );
    if (foundApp) {
      setSearchedRecord({ type: "application", data: foundApp });
      setHasSearched(true);
      return;
    }

    setSearchedRecord(null);
    setHasSearched(true);
  };

  const setSample = (id) => {
    setTrackingId(id);
    const foundInq = inquiries.find((i) => i.id === id);
    if (foundInq) {
      setSearchedRecord({ type: "inquiry", data: foundInq });
      setHasSearched(true);
      return;
    }
    const foundApp = applications.find((a) => a.id === id);
    if (foundApp) {
      setSearchedRecord({ type: "application", data: foundApp });
      setHasSearched(true);
    }
  };

  return (
    <div className="public-track-page" style={{ padding: "3.5rem 0 5rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>
            Real-Time Citizen Tracking
          </span>
          <h1 style={{ fontSize: "2.5rem", color: "var(--secondary)", marginBottom: "0.75rem" }}>
            Track Your Service Application
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Enter your <strong>Inquiry Ticket ID</strong> (e.g. INQ-94812) or <strong>Application Number</strong> (e.g. APP-7729).
          </p>
        </div>

        {/* Search Bar */}
        <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
              <Search
                size={18}
                color="var(--text-muted)"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Enter Reference Number (e.g. INQ-94812)..."
                className="form-control"
                style={{ paddingLeft: "2.5rem", textTransform: "uppercase", fontWeight: "600" }}
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: "0.7rem 1.5rem" }}>
              <span>Track Application</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Pre-fill Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              flexWrap: "wrap"
            }}
          >
            <span>Demo sample IDs:</span>
            {inquiries.slice(0, 2).map((inq) => (
              <button
                key={inq.id}
                onClick={() => setSample(inq.id)}
                style={{
                  background: "#f1f5f9",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--primary)",
                  fontWeight: 600
                }}
              >
                {inq.id} ({inq.serviceName.slice(0, 15)}...)
              </button>
            ))}
            {applications.slice(0, 1).map((app) => (
              <button
                key={app.id}
                onClick={() => setSample(app.id)}
                style={{
                  background: "#f1f5f9",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--emerald)",
                  fontWeight: 600
                }}
              >
                {app.id} (Application)
              </button>
            ))}
          </div>
        </div>

        {/* Results Card */}
        {hasSearched && searchedRecord && (
          <div className="card" style={{ padding: "2rem", borderTop: "4px solid var(--primary)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "1rem",
                paddingBottom: "1.25rem",
                borderBottom: "1px solid var(--card-border)",
                marginBottom: "1.5rem"
              }}
            >
              <div>
                <span className="badge badge-blue" style={{ marginBottom: "0.35rem" }}>
                  {searchedRecord.type === "inquiry" ? "Citizen Inquiry Ticket" : "Official Kendra Application"}
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "var(--secondary)" }}>
                  {searchedRecord.data.serviceName}
                </h3>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  Applicant: <strong>{searchedRecord.data.customerName}</strong> | Reference: <strong>{searchedRecord.data.id}</strong>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Current Status</div>
                <span
                  className={`badge ${
                    searchedRecord.data.status === "Completed"
                      ? "badge-green"
                      : searchedRecord.data.status === "In Progress" || searchedRecord.data.status?.includes("Review")
                      ? "badge-blue"
                      : "badge-amber"
                  }`}
                  style={{ fontSize: "0.95rem", padding: "0.35rem 0.8rem", marginTop: "4px" }}
                >
                  {searchedRecord.data.status}
                </span>
              </div>
            </div>

            {/* Tracking Progress Timeline */}
            <div style={{ margin: "2rem 0" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  position: "relative",
                  gap: "0.5rem"
                }}
              >
                {[
                  { title: "Submitted", desc: "Online Logged", completed: true },
                  {
                    title: "Kendra Assigned",
                    desc: searchedRecord.data.assignedRetailerName || "Verified Kendra",
                    completed: true
                  },
                  {
                    title: "Doc Verification",
                    desc: "Proofs & KYC",
                    completed: searchedRecord.data.status !== "New"
                  },
                  {
                    title: "Department Approval",
                    desc: "URN / ARN Done",
                    completed: searchedRecord.data.status === "Completed"
                  }
                ].map((step, idx) => (
                  <div key={idx} style={{ textAlign: "center", position: "relative" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: step.completed ? "var(--emerald)" : "#e2e8f0",
                        color: step.completed ? "#ffffff" : "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 0.5rem",
                        fontWeight: 700,
                        fontSize: "0.9rem"
                      }}
                    >
                      {step.completed ? <CheckCircle2 size={20} /> : idx + 1}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--secondary)" }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {step.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Information Grid */}
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                fontSize: "0.85rem"
              }}
            >
              <div>
                <span style={{ color: "var(--text-muted)" }}>Assigned Kendra:</span>
                <div style={{ fontWeight: 600, color: "var(--secondary)", marginTop: "2px" }}>
                  {searchedRecord.data.assignedRetailerName || "Ramesh Digital Seva Kendra"}
                </div>
              </div>

              <div>
                <span style={{ color: "var(--text-muted)" }}>Submission Timestamp:</span>
                <div style={{ fontWeight: 600, color: "var(--secondary)", marginTop: "2px" }}>
                  {searchedRecord.data.date}
                </div>
              </div>

              {searchedRecord.data.acknowledgementNo && (
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Government Acknowledgement:</span>
                  <div style={{ fontWeight: 600, color: "var(--primary)", marginTop: "2px" }}>
                    {searchedRecord.data.acknowledgementNo}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {hasSearched && !searchedRecord && (
          <div
            className="card"
            style={{
              padding: "3rem 1.5rem",
              textAlign: "center",
              border: "1px dashed var(--card-border)"
            }}
          >
            <AlertCircle size={42} color="var(--rose)" style={{ margin: "0 auto 0.75rem" }} />
            <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
              No Record Found for "{trackingId}"
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "420px", margin: "0 auto" }}>
              Please ensure you typed the ticket ID accurately (e.g. INQ-94812). If you recently submitted your inquiry,
              allow up to 5 minutes to appear in our national directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
