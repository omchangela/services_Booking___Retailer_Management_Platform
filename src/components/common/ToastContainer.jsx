import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = "#10b981";
        if (toast.type === "error") {
          Icon = AlertCircle;
          iconColor = "#ef4444";
        } else if (toast.type === "info") {
          Icon = Info;
          iconColor = "#2563eb";
        }

        return (
          <div key={toast.id} className={`toast toast-${toast.type || "success"}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: "#94a3b8", display: "flex", padding: "2px" }}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
