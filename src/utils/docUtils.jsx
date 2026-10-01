import React from "react";
import { FileText, Image as ImageIcon, CheckSquare, Square, AlertCircle } from "lucide-react";

/**
 * Normalizes document items whether stored as simple strings or rich objects
 */
export const normalizeDoc = (doc) => {
  if (!doc) {
    return {
      id: Math.random().toString(),
      title: "Required Document",
      allowPdf: true,
      allowImage: false,
      isMandatory: true,
      description: ""
    };
  }

  if (typeof doc === "string") {
    const lower = doc.toLowerCase();
    const isImage =
      lower.includes("photo") ||
      lower.includes("signature") ||
      lower.includes("photograph") ||
      lower.includes("pic") ||
      lower.includes("sign");

    const isPdf =
      !isImage ||
      lower.includes("pan") ||
      lower.includes("aadhaar") ||
      lower.includes("bill") ||
      lower.includes("cheque") ||
      lower.includes("agreement") ||
      lower.includes("certificate") ||
      lower.includes("passbook");

    return {
      id: Math.random().toString(),
      title: doc,
      allowPdf: isPdf,
      allowImage: isImage || lower.includes("aadhaar") || lower.includes("pan"),
      isMandatory: !lower.includes("if applicable") && !lower.includes("optional"),
      description: ""
    };
  }

  return {
    id: doc.id || Math.random().toString(),
    title: doc.title || doc.name || "Required Document",
    allowPdf: doc.allowPdf !== undefined ? Boolean(doc.allowPdf) : true,
    allowImage: doc.allowImage !== undefined ? Boolean(doc.allowImage) : false,
    isMandatory: doc.isMandatory !== undefined ? Boolean(doc.isMandatory) : true,
    description: doc.description || ""
  };
};

/**
 * Badge helper to show Image / PDF badges
 */
export const DocFormatBadges = ({ allowPdf, allowImage, isMandatory }) => {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
      {allowPdf && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            background: "#fee2e2",
            color: "#991b1b",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "0.15rem 0.45rem",
            borderRadius: "4px",
            border: "1px solid #fecaca"
          }}
          title="Accepted format: PDF document"
        >
          <FileText size={11} />
          <span>PDF</span>
        </span>
      )}

      {allowImage && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            background: "#e0e7ff",
            color: "#3730a3",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "0.15rem 0.45rem",
            borderRadius: "4px",
            border: "1px solid #c7d2fe"
          }}
          title="Accepted format: JPG / PNG Image"
        >
          <ImageIcon size={11} />
          <span>IMAGE</span>
        </span>
      )}

      {isMandatory ? (
        <span
          style={{
            fontSize: "0.68rem",
            color: "#b91c1c",
            fontWeight: 700,
            background: "#fff1f2",
            padding: "0.15rem 0.4rem",
            borderRadius: "4px",
            border: "1px solid #ffe4e6"
          }}
        >
          Mandatory
        </span>
      ) : (
        <span
          style={{
            fontSize: "0.68rem",
            color: "#475569",
            fontWeight: 500,
            background: "#f1f5f9",
            padding: "0.15rem 0.4rem",
            borderRadius: "4px"
          }}
        >
          Optional
        </span>
      )}
    </div>
  );
};
