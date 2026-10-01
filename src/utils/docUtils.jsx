import React from "react";
import {
  FileText,
  Image as ImageIcon,
  CheckSquare,
  Square,
  AlertCircle,
  Hash,
  Type,
  Binary,
  Files
} from "lucide-react";

/**
 * Supported field & document validation types
 */
export const VALIDATION_TYPES = [
  {
    id: "number",
    label: "Only Number",
    shortLabel: "Number (0-9)",
    icon: Hash,
    color: "#1d4ed8",
    bg: "#eff6ff",
    border: "#bfdbfe",
    hint: "Only numeric digits allowed (0-9). Example: 12-digit Aadhaar number, Mobile number, PIN code."
  },
  {
    id: "text",
    label: "Only Text",
    shortLabel: "Text (A-Z)",
    icon: Type,
    color: "#047857",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    hint: "Only alphabetical characters allowed (A-Z). Example: Customer Full Name, Father's Name."
  },
  {
    id: "alphanumeric",
    label: "Number & Text Both",
    shortLabel: "Number & Text",
    icon: Binary,
    color: "#6d28d9",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    hint: "Both letters and numbers allowed. Example: PAN Card (ABCDE1234F), Voter ID, Driving Licence."
  },
  {
    id: "image",
    label: "Image Only",
    shortLabel: "Image (JPG/PNG)",
    icon: ImageIcon,
    color: "#b45309",
    bg: "#fffbeb",
    border: "#fde68a",
    hint: "Upload image file (.jpg, .jpeg, .png). Example: Passport photograph, applicant signature."
  },
  {
    id: "pdf",
    label: "PDF Only",
    shortLabel: "PDF (.pdf)",
    icon: FileText,
    color: "#b91c1c",
    bg: "#fef2f2",
    border: "#fecaca",
    hint: "Upload PDF document only (.pdf). Example: Rent agreement, bank statement, income certificate."
  },
  {
    id: "image_or_pdf",
    label: "Image or PDF",
    shortLabel: "Image or PDF",
    icon: Files,
    color: "#0369a1",
    bg: "#f0f9ff",
    border: "#bae6fd",
    hint: "Both Image (.jpg, .png) and PDF (.pdf) documents accepted. Example: Aadhaar copy, Electricity bill."
  }
];

/**
 * Normalizes document items whether stored as simple strings or rich objects
 */
export const normalizeDoc = (doc) => {
  if (!doc) {
    return {
      id: Math.random().toString(),
      title: "Required Document",
      type: "image_or_pdf",
      allowPdf: true,
      allowImage: true,
      isMandatory: true,
      description: "",
      placeholder: ""
    };
  }

  if (typeof doc === "string") {
    const lower = doc.toLowerCase();

    // Auto-detect type from title string
    let type = "image_or_pdf";
    if (
      lower.includes("mobile") ||
      lower.includes("otp") ||
      lower.includes("12-digit") ||
      lower.includes("pin code") ||
      lower.includes("pincode") ||
      lower.includes("account number") ||
      lower.includes("vid") ||
      (lower.includes("aadhaar") && lower.includes("number"))
    ) {
      type = "number";
    } else if (
      lower.includes("name as per") ||
      lower.includes("father name") ||
      lower.includes("mother name") ||
      lower.includes("applicant name") ||
      lower.includes("customer name")
    ) {
      type = "text";
    } else if (
      lower.includes("pan card number") ||
      lower.includes("pan number") ||
      lower.includes("voter id number") ||
      lower.includes("driving licence number") ||
      lower.includes("rc number") ||
      lower.includes("gstin") ||
      lower.includes("registration number")
    ) {
      type = "alphanumeric";
    } else if (
      lower.includes("photo") ||
      lower.includes("photograph") ||
      lower.includes("signature") ||
      lower.includes("sign") ||
      lower.includes("pic")
    ) {
      type = "image";
    } else if (
      lower.includes("agreement") ||
      lower.includes("statement") ||
      lower.includes("noc") ||
      lower.includes("cheque") ||
      lower.includes("passbook")
    ) {
      type = "pdf";
    } else if (
      lower.includes("aadhaar") ||
      lower.includes("pan card") ||
      lower.includes("voter id") ||
      lower.includes("proof") ||
      lower.includes("bill")
    ) {
      type = "image_or_pdf";
    }

    const allowPdf = type === "pdf" || type === "image_or_pdf";
    const allowImage = type === "image" || type === "image_or_pdf";

    return {
      id: Math.random().toString(),
      title: doc,
      type,
      allowPdf,
      allowImage,
      isMandatory: !lower.includes("if applicable") && !lower.includes("optional"),
      description: "",
      placeholder: ""
    };
  }

  // Already an object
  let type = doc.type;
  if (!type) {
    if (doc.allowPdf && !doc.allowImage) type = "pdf";
    else if (!doc.allowPdf && doc.allowImage) type = "image";
    else if (doc.allowPdf && doc.allowImage) type = "image_or_pdf";
    else {
      const lower = (doc.title || "").toLowerCase();
      if (lower.includes("number") || lower.includes("mobile") || lower.includes("otp")) {
        type = "number";
      } else if (lower.includes("name")) {
        type = "text";
      } else {
        type = "alphanumeric";
      }
    }
  }

  const allowPdf = type === "pdf" || type === "image_or_pdf" || Boolean(doc.allowPdf);
  const allowImage = type === "image" || type === "image_or_pdf" || Boolean(doc.allowImage);

  return {
    id: doc.id || Math.random().toString(),
    title: doc.title || doc.name || "Required Requirement",
    type,
    allowPdf,
    allowImage,
    isMandatory: doc.isMandatory !== undefined ? Boolean(doc.isMandatory) : true,
    description: doc.description || "",
    placeholder: doc.placeholder || ""
  };
};

/**
 * Validates a field value against its configured validation type
 */
export const validateFieldValue = (val, type, isMandatory = true) => {
  const trimmed = (val || "").toString().trim();

  if (isMandatory && !trimmed) {
    return {
      isValid: false,
      error: "This field is required"
    };
  }

  if (!trimmed) {
    return { isValid: true, error: null };
  }

  switch (type) {
    case "number":
      if (!/^\d+$/.test(trimmed)) {
        return {
          isValid: false,
          error: "Only numeric digits (0-9) are allowed"
        };
      }
      return { isValid: true, error: null };

    case "text":
      if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
        return {
          isValid: false,
          error: "Only alphabetic text (A-Z) is allowed"
        };
      }
      return { isValid: true, error: null };

    case "alphanumeric":
      if (!/^[a-zA-Z0-9\s\-_/]+$/.test(trimmed)) {
        return {
          isValid: false,
          error: "Only letters, numbers and hyphens are allowed"
        };
      }
      return { isValid: true, error: null };

    default:
      return { isValid: true, error: null };
  }
};

/**
 * Badge helper to show Validation Type (Number, Text, Alphanumeric, Image, PDF, Both) + Mandatory
 */
export const DocFormatBadges = ({ type, allowPdf, allowImage, isMandatory, showMandatory = true }) => {
  let currentType = type;
  if (!currentType) {
    if (allowPdf && !allowImage) currentType = "pdf";
    else if (!allowPdf && allowImage) currentType = "image";
    else if (allowPdf && allowImage) currentType = "image_or_pdf";
    else currentType = "image_or_pdf";
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
      {currentType === "number" && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            background: "#eff6ff",
            color: "#1d4ed8",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "0.15rem 0.45rem",
            borderRadius: "4px",
            border: "1px solid #bfdbfe"
          }}
          title="Validation: Only Numbers (0-9) allowed"
        >
          <Hash size={11} />
          <span>Only Number</span>
        </span>
      )}

      {currentType === "text" && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            background: "#ecfdf5",
            color: "#047857",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "0.15rem 0.45rem",
            borderRadius: "4px",
            border: "1px solid #a7f3d0"
          }}
          title="Validation: Only Alphabetic Text allowed"
        >
          <Type size={11} />
          <span>Only Text</span>
        </span>
      )}

      {currentType === "alphanumeric" && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            background: "#f5f3ff",
            color: "#6d28d9",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "0.15rem 0.45rem",
            borderRadius: "4px",
            border: "1px solid #ddd6fe"
          }}
          title="Validation: Number & Text both allowed"
        >
          <Binary size={11} />
          <span>Number & Text</span>
        </span>
      )}

      {currentType === "image" && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            background: "#fffbeb",
            color: "#b45309",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "0.15rem 0.45rem",
            borderRadius: "4px",
            border: "1px solid #fde68a"
          }}
          title="Accepted format: JPG / PNG Image"
        >
          <ImageIcon size={11} />
          <span>Image</span>
        </span>
      )}

      {currentType === "pdf" && (
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
          title="Accepted format: PDF Document"
        >
          <FileText size={11} />
          <span>PDF</span>
        </span>
      )}

      {currentType === "image_or_pdf" && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            background: "#f0f9ff",
            color: "#0369a1",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "0.15rem 0.45rem",
            borderRadius: "4px",
            border: "1px solid #bae6fd"
          }}
          title="Accepted format: PDF or Image"
        >
          <Files size={11} />
          <span>Image or PDF</span>
        </span>
      )}

      {showMandatory && (
        isMandatory ? (
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
        )
      )}
    </div>
  );
};
