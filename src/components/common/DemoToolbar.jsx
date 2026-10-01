import React from "react";
import { useApp } from "../../context/AppContext";
import { Globe, Store, Shield, RefreshCw, Sparkles, UserCheck } from "lucide-react";

export const DemoToolbar = () => {
  const {
    currentRole,
    setCurrentRole,
    resetDemoData,
    currentRetailer,
    isAdminAuthenticated
  } = useApp();

  return (
    <div className="demo-top-bar">
      <div className="demo-title-badge">
        <span className="pulse-indicator"></span>
        <Sparkles size={15} color="#60a5fa" />
        <span>LIVE CLIENT DEMO</span>
        <span style={{ opacity: 0.5, margin: "0 4px" }}>|</span>
        <span style={{ color: "#93c5fd", fontWeight: 500 }}>SevaSetu Platform</span>
      </div>

      <div className="demo-role-switcher">
        <button
          className={`demo-role-btn ${currentRole === "public" ? "active" : ""}`}
          onClick={() => setCurrentRole("public")}
          title="Switch to Public User Website"
        >
          <Globe size={14} />
          <span>Citizen Website</span>
        </button>

        <button
          className={`demo-role-btn ${currentRole === "retailer" ? "active" : ""}`}
          onClick={() => setCurrentRole("retailer")}
          title="Switch to Retailer Portal"
        >
          <Store size={14} />
          <span>Retailer Panel ({currentRetailer.city})</span>
        </button>

        <button
          className={`demo-role-btn ${currentRole === "admin" ? "active" : ""}`}
          onClick={() => setCurrentRole("admin")}
          title="Switch to Admin Control Panel"
        >
          <Shield size={14} />
          <span>Admin Portal</span>
        </button>
      </div>

      <div className="demo-actions">
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8", fontSize: "0.75rem", marginRight: "6px" }}>
          <UserCheck size={13} color="#10b981" />
          <span>Active: <strong>{currentRole === 'public' ? 'Public Citizen' : currentRole === 'retailer' ? currentRetailer.shopName : (isAdminAuthenticated ? 'Super Admin (Rajeev Mehra)' : 'Admin Login')}</strong></span>
        </div>
        <button
          className="demo-action-btn"
          onClick={resetDemoData}
          title="Reset all demo data back to default values"
        >
          <RefreshCw size={12} />
          <span>Reset Demo</span>
        </button>
      </div>
    </div>
  );
};
