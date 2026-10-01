import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { normalizeDoc, DocFormatBadges, VALIDATION_TYPES } from "../../utils/docUtils";
import {
  FileCheck2,
  PlusCircle,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Save,
  Plus,
  Clock,
  Coins,
  FileText,
  Image as ImageIcon,
  CheckSquare,
  Square,
  Sparkles,
  Info,
  Hash,
  Type,
  Binary,
  Files
} from "lucide-react";

export const AdminServices = () => {
  const {
    services,
    categories,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [viewDocsService, setViewDocsService] = useState(null);

  // New Service State with structured documents
  const [newSrv, setNewSrv] = useState({
    name: "",
    categoryId: categories[0]?.id || "cat-pan-tax",
    shortDescription: "",
    description: "",
    turnaroundTime: "2 - 3 Working Days",
    governmentFee: 0,
    customerPrice: 200,
    retailerCommission: 50,
    status: "active",
    badge: "Popular",
    requiredDocuments: [
      {
        id: "doc-1",
        title: "Aadhaar Card (Front & Back)",
        type: "image_or_pdf",
        allowPdf: true,
        allowImage: true,
        isMandatory: true
      },
      {
        id: "doc-2",
        title: "12-Digit Aadhaar Card Number",
        type: "number",
        allowPdf: false,
        allowImage: false,
        isMandatory: true
      },
      {
        id: "doc-3",
        title: "Passport Size Color Photograph",
        type: "image",
        allowPdf: false,
        allowImage: true,
        isMandatory: true
      }
    ]
  });

  // Current document input row for Add Modal
  const [docDraft, setDocDraft] = useState({
    title: "",
    type: "image_or_pdf",
    allowPdf: true,
    allowImage: true,
    isMandatory: true
  });

  // Document input row for Edit Modal
  const [editDocDraft, setEditDocDraft] = useState({
    title: "",
    type: "image_or_pdf",
    allowPdf: true,
    allowImage: true,
    isMandatory: true
  });

  // Preset quick fill for services
  const quickServicePresets = [
    {
      name: "Aadhaar Card Mobile & Demographic Update",
      catId: "cat-identity",
      price: 150,
      commission: 60,
      turnaround: "24 - 48 Hours",
      docs: [
        { id: "1", title: "12-Digit Aadhaar Card Number", type: "number", allowPdf: false, allowImage: false, isMandatory: true },
        { id: "2", title: "Active Mobile Number for UIDAI OTP", type: "number", allowPdf: false, allowImage: false, isMandatory: true },
        { id: "3", title: "Original Aadhaar Card Scan", type: "image_or_pdf", allowPdf: true, allowImage: true, isMandatory: true },
        { id: "4", title: "Valid Address Proof (Electricity / Rent / Bank)", type: "pdf", allowPdf: true, allowImage: false, isMandatory: true }
      ]
    },
    {
      name: "New PAN Card Application (Form 49A)",
      catId: "cat-pan-tax",
      price: 180,
      commission: 70,
      turnaround: "5 - 7 Days",
      docs: [
        { id: "1", title: "Customer Full Name (as per 10th Marksheet)", type: "text", allowPdf: false, allowImage: false, isMandatory: true },
        { id: "2", title: "Existing Aadhaar Card Number", type: "number", allowPdf: false, allowImage: false, isMandatory: true },
        { id: "3", title: "Proof of Identity (Aadhaar / Voter ID)", type: "image_or_pdf", allowPdf: true, allowImage: true, isMandatory: true },
        { id: "4", title: "Passport Size Photograph (White background)", type: "image", allowPdf: false, allowImage: true, isMandatory: true },
        { id: "5", title: "Customer Signature on White Paper", type: "image", allowPdf: false, allowImage: true, isMandatory: true }
      ]
    },
    {
      name: "New GST Registration (Proprietorship / Firm)",
      catId: "cat-gst-biz",
      price: 1499,
      commission: 700,
      turnaround: "3 - 5 Days",
      docs: [
        { id: "1", title: "Business Owner PAN Card (10-Digit)", type: "alphanumeric", allowPdf: false, allowImage: false, isMandatory: true },
        { id: "2", title: "Proprietor Aadhaar Number", type: "number", allowPdf: false, allowImage: false, isMandatory: true },
        { id: "3", title: "Electricity Bill of Business Premises", type: "pdf", allowPdf: true, allowImage: false, isMandatory: true },
        { id: "4", title: "Rent Agreement + NOC from Landlord", type: "pdf", allowPdf: true, allowImage: false, isMandatory: true },
        { id: "5", title: "Bank Cancelled Cheque / Statement", type: "image_or_pdf", allowPdf: true, allowImage: true, isMandatory: true },
        { id: "6", title: "Passport Size Photograph", type: "image", allowPdf: false, allowImage: true, isMandatory: true }
      ]
    },
    {
      name: "MSME / Udyam Registration Certificate",
      catId: "cat-gst-biz",
      price: 450,
      commission: 300,
      turnaround: "24 Hours",
      docs: [
        { id: "1", title: "Applicant Aadhaar Number", type: "number", allowPdf: false, allowImage: false, isMandatory: true },
        { id: "2", title: "Business PAN Card Number", type: "alphanumeric", allowPdf: false, allowImage: false, isMandatory: true },
        { id: "3", title: "Enterprise Name as per Registration", type: "alphanumeric", allowPdf: false, allowImage: false, isMandatory: true },
        { id: "4", title: "Bank Account Details (Passbook/Cheque)", type: "image_or_pdf", allowPdf: true, allowImage: true, isMandatory: true }
      ]
    }
  ];

  const applyQuickPreset = (preset) => {
    setNewSrv((prev) => ({
      ...prev,
      name: preset.name,
      categoryId: preset.catId,
      customerPrice: preset.price,
      retailerCommission: preset.commission,
      turnaroundTime: preset.turnaround,
      shortDescription: `Official assistance for ${preset.name}`,
      description: `Complete application handling, document verification, and government submission for ${preset.name}.`,
      requiredDocuments: preset.docs
    }));
  };

  const handleAddDocToNew = () => {
    if (!docDraft.title.trim()) return;
    const type = docDraft.type || "image_or_pdf";
    const newDocItem = {
      id: Date.now().toString(),
      title: docDraft.title.trim(),
      type,
      allowPdf: type === "pdf" || type === "image_or_pdf",
      allowImage: type === "image" || type === "image_or_pdf",
      isMandatory: docDraft.isMandatory
    };
    setNewSrv((prev) => ({
      ...prev,
      requiredDocuments: [...prev.requiredDocuments, newDocItem]
    }));
    setDocDraft({
      title: "",
      type: "image_or_pdf",
      allowPdf: true,
      allowImage: true,
      isMandatory: true
    });
  };

  const handleRemoveDocFromNew = (id) => {
    setNewSrv((prev) => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((d, i) => (d.id || i) !== id)
    }));
  };

  const handleToggleDocMandatoryInNew = (idx) => {
    setNewSrv((prev) => {
      const updated = [...prev.requiredDocuments];
      const norm = normalizeDoc(updated[idx]);
      updated[idx] = { ...norm, isMandatory: !norm.isMandatory };
      return { ...prev, requiredDocuments: updated };
    });
  };

  const handleUpdateDocTypeInNew = (idx, newType) => {
    setNewSrv((prev) => {
      const updated = [...prev.requiredDocuments];
      const norm = normalizeDoc(updated[idx]);
      updated[idx] = {
        ...norm,
        type: newType,
        allowPdf: newType === "pdf" || newType === "image_or_pdf",
        allowImage: newType === "image" || newType === "image_or_pdf"
      };
      return { ...prev, requiredDocuments: updated };
    });
  };

  const handleAddDocToEdit = () => {
    if (!editDocDraft.title.trim() || !editingService) return;
    const type = editDocDraft.type || "image_or_pdf";
    const newDocItem = {
      id: Date.now().toString(),
      title: editDocDraft.title.trim(),
      type,
      allowPdf: type === "pdf" || type === "image_or_pdf",
      allowImage: type === "image" || type === "image_or_pdf",
      isMandatory: editDocDraft.isMandatory
    };
    const currentDocs = (editingService.requiredDocuments || []).map(normalizeDoc);
    setEditingService({
      ...editingService,
      requiredDocuments: [...currentDocs, newDocItem]
    });
    setEditDocDraft({
      title: "",
      type: "image_or_pdf",
      allowPdf: true,
      allowImage: true,
      isMandatory: true
    });
  };

  const handleRemoveDocFromEdit = (idx) => {
    if (!editingService) return;
    const currentDocs = (editingService.requiredDocuments || []).map(normalizeDoc);
    setEditingService({
      ...editingService,
      requiredDocuments: currentDocs.filter((_, i) => i !== idx)
    });
  };

  const handleToggleDocMandatoryInEdit = (idx) => {
    if (!editingService) return;
    const currentDocs = (editingService.requiredDocuments || []).map(normalizeDoc);
    currentDocs[idx].isMandatory = !currentDocs[idx].isMandatory;
    setEditingService({
      ...editingService,
      requiredDocuments: currentDocs
    });
  };

  const handleUpdateDocTypeInEdit = (idx, newType) => {
    if (!editingService) return;
    const currentDocs = (editingService.requiredDocuments || []).map(normalizeDoc);
    currentDocs[idx] = {
      ...currentDocs[idx],
      type: newType,
      allowPdf: newType === "pdf" || newType === "image_or_pdf",
      allowImage: newType === "image" || newType === "image_or_pdf"
    };
    setEditingService({
      ...editingService,
      requiredDocuments: currentDocs
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newSrv.name) return;

    const retailerCost = Math.max(0, newSrv.customerPrice - newSrv.retailerCommission);

    addService({
      name: newSrv.name,
      categoryId: newSrv.categoryId,
      shortDescription: newSrv.shortDescription || newSrv.name,
      description: newSrv.description || newSrv.shortDescription,
      turnaroundTime: newSrv.turnaroundTime,
      governmentFee: parseFloat(newSrv.governmentFee || 0),
      customerPrice: parseFloat(newSrv.customerPrice || 0),
      retailerCost,
      retailerCommission: parseFloat(newSrv.retailerCommission || 0),
      status: newSrv.status || "active",
      badge: newSrv.badge || "Standard",
      requiredDocuments:
        newSrv.requiredDocuments.length > 0
          ? newSrv.requiredDocuments
          : [{ id: "1", title: "Aadhaar Card", allowPdf: true, allowImage: true, isMandatory: true }]
    });

    setShowAddModal(false);
    // reset
    setNewSrv({
      name: "",
      categoryId: categories[0]?.id || "cat-pan-tax",
      shortDescription: "",
      description: "",
      turnaroundTime: "2 - 3 Working Days",
      governmentFee: 0,
      customerPrice: 200,
      retailerCommission: 50,
      status: "active",
      badge: "Popular",
      requiredDocuments: [
        { id: "doc-1", title: "Aadhaar Card (Front & Back)", allowPdf: true, allowImage: true, isMandatory: true },
        { id: "doc-2", title: "Passport Size Color Photograph", allowPdf: false, allowImage: true, isMandatory: true }
      ]
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingService) return;
    const retailerCost = Math.max(0, editingService.customerPrice - editingService.retailerCommission);
    updateService(editingService.id, {
      ...editingService,
      customerPrice: parseFloat(editingService.customerPrice),
      retailerCommission: parseFloat(editingService.retailerCommission),
      retailerCost
    });
    setEditingService(null);
  };

  const filtered = services.filter((srv) => {
    const matchCat = selectedCat === "all" || srv.categoryId === selectedCat;
    const matchSearch =
      srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="admin-services-page">
      {/* Top Action Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)" }}>
            Service Management ({services.length} Services)
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Manual service creation, title names, image & PDF requirements, pricing, and guaranteed retailer margins.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <PlusCircle size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
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
              All ({services.length})
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

          <div style={{ position: "relative", minWidth: "260px" }}>
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Search service name (e.g. Aadhaar, PAN, GST)..."
              className="form-control"
              style={{ paddingLeft: "2rem", padding: "0.45rem 2rem 0.45rem 2rem", fontSize: "0.825rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Category</th>
              <th>Citizen Price</th>
              <th>Kendra Cost</th>
              <th>Retailer Commission</th>
              <th>Required Documents (What Needed)</th>
              <th>Govt SLA</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "2.5rem", color: "var(--text-muted)" }}>
                  No services found matching filters.
                </td>
              </tr>
            ) : (
              filtered.map((srv) => {
                const docs = (srv.requiredDocuments || []).map(normalizeDoc);
                return (
                  <tr key={srv.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: "var(--secondary)" }}>
                        {srv.name}
                      </div>
                      {srv.badge && (
                        <span className="badge badge-amber" style={{ fontSize: "0.65rem", marginTop: "3px" }}>
                          {srv.badge}
                        </span>
                      )}
                    </td>

                    <td>
                      <span className="badge badge-blue" style={{ fontSize: "0.7rem" }}>
                        {srv.categoryName}
                      </span>
                    </td>

                    <td style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                      ₹{srv.customerPrice}
                    </td>

                    <td style={{ color: "var(--rose)", fontWeight: 600 }}>
                      ₹{srv.retailerCost}
                    </td>

                    <td style={{ color: "var(--emerald)", fontWeight: 800, fontSize: "0.95rem" }}>
                      +₹{srv.retailerCommission}
                    </td>

                    {/* What Needed / Documents Preview with Image, PDF & Checkbox badges */}
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", maxWidth: "280px" }}>
                        {docs.slice(0, 2).map((doc, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem" }}>
                            <span style={{ color: doc.isMandatory ? "var(--emerald)" : "var(--text-muted)" }}>
                              {doc.isMandatory ? <CheckSquare size={13} /> : <Square size={13} />}
                            </span>
                            <span style={{ fontWeight: 500, color: "var(--secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {doc.title}
                            </span>
                            <DocFormatBadges type={doc.type} allowPdf={doc.allowPdf} allowImage={doc.allowImage} isMandatory={doc.isMandatory} />
                          </div>
                        ))}
                        {docs.length > 2 && (
                          <button
                            type="button"
                            onClick={() => setViewDocsService(srv)}
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--primary)",
                              fontWeight: 700,
                              textAlign: "left",
                              padding: "2px 0",
                              cursor: "pointer"
                            }}
                          >
                            + {docs.length - 2} more document requirements &rarr;
                          </button>
                        )}
                      </div>
                    </td>

                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {srv.turnaroundTime}
                    </td>

                    <td>
                      <span
                        className={`badge ${srv.status === "active" ? "badge-green" : "badge-slate"}`}
                        style={{ fontSize: "0.7rem", cursor: "pointer" }}
                        onClick={() => toggleServiceStatus(srv.id)}
                        title="Click to toggle status"
                      >
                        {srv.status}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          className="btn btn-sm btn-outline"
                          style={{ padding: "0.25rem 0.5rem" }}
                          onClick={() => setEditingService({ ...srv })}
                          title="Edit Service"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>

                        <button
                          className="btn btn-sm btn-outline"
                          style={{ padding: "0.25rem 0.5rem", color: "var(--rose)" }}
                          onClick={() => {
                            if (confirm(`Delete service "${srv.name}"?`)) {
                              deleteService(srv.id);
                            }
                          }}
                          title="Delete Service"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ADD SERVICE MODAL */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "820px" }}>
            <div className="modal-header">
              <div>
                <h3>Add Service & Configure Requirements</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Manual service entry with required document titles, Image & PDF formats, and mandatory checkboxes
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="modal-body" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                {/* 1-Click Quick Preset Assistant */}
                <div
                  style={{
                    background: "var(--primary-subtle)",
                    border: "1px solid var(--primary-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.75rem 1rem",
                    marginBottom: "1.25rem"
                  }}
                >
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Sparkles size={14} />
                    <span>Quick Fill Common Indian Citizen Services:</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {quickServicePresets.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => applyQuickPreset(p)}
                        style={{
                          background: "#ffffff",
                          border: "1px solid var(--card-border)",
                          padding: "0.3rem 0.65rem",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--secondary)"
                        }}
                      >
                        + {p.name.split(" ")[0]} {p.name.split(" ")[1]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Name & Category */}
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Service Name (Manual Entry) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aadhaar Card Mobile Update / New PAN Card / GST Registration"
                      className="form-control"
                      value={newSrv.name}
                      onChange={(e) => setNewSrv({ ...newSrv, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Service Category *</label>
                    <select
                      className="form-control"
                      value={newSrv.categoryId}
                      onChange={(e) => setNewSrv({ ...newSrv, categoryId: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service Description */}
                <div className="form-group">
                  <label className="form-label">Service Description & Official Procedure</label>
                  <textarea
                    rows={2}
                    placeholder="Describe what the service provides, government portal guidelines, and processing criteria..."
                    className="form-control"
                    value={newSrv.description}
                    onChange={(e) => setNewSrv({ ...newSrv, description: e.target.value })}
                  ></textarea>
                </div>

                {/* Financial Controls: Price, Commission, Status */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Service Price (₹) *</label>
                    <input
                      type="number"
                      required
                      className="form-control"
                      value={newSrv.customerPrice}
                      onChange={(e) => setNewSrv({ ...newSrv, customerPrice: e.target.value })}
                    />
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Collected from citizen</span>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Retailer Commission (₹) *</label>
                    <input
                      type="number"
                      required
                      className="form-control"
                      value={newSrv.retailerCommission}
                      onChange={(e) => setNewSrv({ ...newSrv, retailerCommission: e.target.value })}
                    />
                    <span style={{ fontSize: "0.7rem", color: "var(--emerald)", fontWeight: 600 }}>Kendra guaranteed margin</span>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Govt Statutory SLA</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newSrv.turnaroundTime}
                      onChange={(e) => setNewSrv({ ...newSrv, turnaroundTime: e.target.value })}
                    />
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>e.g. 24-48 Hours</span>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Service Status</label>
                    <select
                      className="form-control"
                      value={newSrv.status}
                      onChange={(e) => setNewSrv({ ...newSrv, status: e.target.value })}
                    >
                      <option value="active">Active (Live)</option>
                      <option value="inactive">Inactive (Disabled)</option>
                    </select>
                  </div>
                </div>

                {/* REQUIRED DOCUMENTS CONFIGURATION (WHAT IS NEEDED & VALIDATION RULES) */}
                <div
                  style={{
                    border: "1.5px solid var(--primary-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.25rem",
                    background: "#ffffff",
                    marginBottom: "1rem"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <FileText size={18} color="var(--primary)" />
                      <h4 style={{ fontSize: "1rem", color: "var(--secondary)", margin: 0 }}>
                        Required Documents & Citizen Fields Validation Rules
                      </h4>
                    </div>
                    <span className="badge badge-blue">
                      {newSrv.requiredDocuments.length} Requirements Configured
                    </span>
                  </div>

                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.85rem" }}>
                    Configure what customer inputs or uploads are needed. Set the validation rule (<strong>Only Number</strong>, <strong>Only Text</strong>, <strong>Number & Text Both</strong>, <strong>Image</strong>, or <strong>PDF</strong>) and toggle <strong>Mandatory</strong>.
                  </p>

                  {/* Quick Template Chips */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "0.85rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)" }}>Quick Templates:</span>
                    {[
                      { title: "12-Digit Aadhaar Number", type: "number" },
                      { title: "Customer Full Name", type: "text" },
                      { title: "PAN Card Number", type: "alphanumeric" },
                      { title: "Passport Size Photograph", type: "image" },
                      { title: "Address Proof Document", type: "pdf" },
                      { title: "Aadhaar / ID Card Copy", type: "image_or_pdf" }
                    ].map((tpl) => (
                      <button
                        key={tpl.title}
                        type="button"
                        onClick={() => setDocDraft({ ...docDraft, title: tpl.title, type: tpl.type })}
                        style={{
                          background: docDraft.title === tpl.title ? "var(--primary-subtle)" : "#f1f5f9",
                          border: "1px solid",
                          borderColor: docDraft.title === tpl.title ? "var(--primary)" : "var(--card-border)",
                          color: docDraft.title === tpl.title ? "var(--primary)" : "var(--secondary)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        + {tpl.title}
                      </button>
                    ))}
                  </div>

                  {/* Add Document / Validation Field Row */}
                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "0.9rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--card-border)",
                      marginBottom: "1rem"
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.7fr 1.6fr 1fr auto",
                        gap: "0.75rem",
                        alignItems: "end"
                      }}
                    >
                      <div>
                        <label className="form-label" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                          Field / Document Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Aadhaar Card / PAN Number / Customer Photo"
                          className="form-control"
                          style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}
                          value={docDraft.title}
                          onChange={(e) => setDocDraft({ ...docDraft, title: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddDocToNew();
                            }
                          }}
                        />
                      </div>

                      <div>
                        <label className="form-label" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                          Allowed Input / Validation Type *
                        </label>
                        <select
                          className="form-control"
                          style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem", fontWeight: 600 }}
                          value={docDraft.type || "image_or_pdf"}
                          onChange={(e) => setDocDraft({ ...docDraft, type: e.target.value })}
                        >
                          <option value="number">🔢 Only Number (0-9 Digits)</option>
                          <option value="text">🔤 Only Text (A-Z Alphabets)</option>
                          <option value="alphanumeric">🔠 Number & Text Both (Alphanumeric)</option>
                          <option value="image">🖼️ Image File (.JPG, .PNG)</option>
                          <option value="pdf">📄 PDF Document (.PDF)</option>
                          <option value="image_or_pdf">📎 Image or PDF (Both Accepted)</option>
                        </select>
                      </div>

                      <div style={{ paddingBottom: "8px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", cursor: "pointer", fontWeight: 600 }}>
                          <input
                            type="checkbox"
                            checked={docDraft.isMandatory}
                            onChange={(e) => setDocDraft({ ...docDraft, isMandatory: e.target.checked })}
                          />
                          <span style={{ color: docDraft.isMandatory ? "var(--rose)" : "var(--text-muted)" }}>
                            {docDraft.isMandatory ? "Mandatory *" : "Optional"}
                          </span>
                        </label>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ padding: "0.5rem 0.9rem", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "5px" }}
                          onClick={handleAddDocToNew}
                        >
                          <Plus size={15} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Rule Explanation */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "0.6rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <Info size={13} color="var(--primary)" />
                      <span>
                        {docDraft.type === "number" && "Retailer will only be allowed to enter numeric digits (0-9). Example: 12-digit Aadhaar, Mobile number, PIN code."}
                        {docDraft.type === "text" && "Retailer will only be allowed to enter alphabetical letters. Example: Customer Full Name, Father's Name."}
                        {docDraft.type === "alphanumeric" && "Retailer can enter both letters and numbers. Example: PAN Card (ABCDE1234F), Voter ID, Driving Licence."}
                        {docDraft.type === "image" && "Retailer must upload an Image file (.jpg, .jpeg, .png). Example: Passport photograph, Customer signature."}
                        {docDraft.type === "pdf" && "Retailer must upload a PDF document (.pdf). Example: Rent agreement, Bank statement, Electricity bill."}
                        {docDraft.type === "image_or_pdf" && "Retailer can upload either a PDF document or an Image file. Example: Aadhaar copy, Address proof."}
                      </span>
                    </div>
                  </div>

                  {/* Documents & Fields List Table with Checkboxes */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {newSrv.requiredDocuments.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        No requirement fields added yet. Choose a template above or type a title to add.
                      </div>
                    ) : (
                      newSrv.requiredDocuments.map((docItem, idx) => {
                        const doc = normalizeDoc(docItem);
                        return (
                          <div
                            key={doc.id || idx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "0.65rem 0.85rem",
                              borderRadius: "var(--radius-md)",
                              border: "1px solid var(--card-border)",
                              background: doc.isMandatory ? "#fbfcfe" : "#ffffff",
                              gap: "0.75rem"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                              <button
                                type="button"
                                onClick={() => handleToggleDocMandatoryInNew(idx)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  color: doc.isMandatory ? "var(--emerald)" : "#94a3b8"
                                }}
                                title="Click to toggle Mandatory status"
                              >
                                {doc.isMandatory ? <CheckSquare size={18} /> : <Square size={18} />}
                              </button>

                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {doc.title}
                                </div>
                                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                                  Rule: {doc.isMandatory ? "Mandatory requirement" : "Optional field"}
                                </div>
                              </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                              {/* Quick In-place Type Switcher */}
                              <select
                                value={doc.type || "image_or_pdf"}
                                onChange={(e) => handleUpdateDocTypeInNew(idx, e.target.value)}
                                style={{
                                  fontSize: "0.75rem",
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "var(--radius-sm)",
                                  border: "1px solid var(--card-border)",
                                  background: "#ffffff",
                                  fontWeight: 600,
                                  color: "var(--secondary)",
                                  cursor: "pointer"
                                }}
                                title="Change validation type"
                              >
                                <option value="number">🔢 Only Number</option>
                                <option value="text">🔤 Only Text</option>
                                <option value="alphanumeric">🔠 Number & Text</option>
                                <option value="image">🖼️ Image</option>
                                <option value="pdf">📄 PDF</option>
                                <option value="image_or_pdf">📎 Image or PDF</option>
                              </select>

                              <DocFormatBadges
                                type={doc.type}
                                allowPdf={doc.allowPdf}
                                allowImage={doc.allowImage}
                                isMandatory={doc.isMandatory}
                              />

                              <button
                                type="button"
                                onClick={() => handleRemoveDocFromNew(doc.id || idx)}
                                style={{ color: "var(--rose)", padding: "4px", display: "flex" }}
                                title="Remove Requirement"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Save & Publish Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div className="modal-overlay" onClick={() => setEditingService(null)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "820px" }}>
            <div className="modal-header">
              <div>
                <h3>Edit Service: {editingService.name}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Update service title, pricing, commissions, and document requirements (Image / PDF)
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setEditingService(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="modal-body" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Service Name (Manual Entry) *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={editingService.name}
                      onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      value={editingService.categoryId}
                      onChange={(e) => setEditingService({ ...editingService, categoryId: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Service Description</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    value={editingService.description || ""}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  ></textarea>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Citizen Price (₹)</label>
                    <input
                      type="number"
                      required
                      className="form-control"
                      value={editingService.customerPrice}
                      onChange={(e) => setEditingService({ ...editingService, customerPrice: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Retailer Margin (₹)</label>
                    <input
                      type="number"
                      required
                      className="form-control"
                      value={editingService.retailerCommission}
                      onChange={(e) => setEditingService({ ...editingService, retailerCommission: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">SLA Turnaround</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingService.turnaroundTime}
                      onChange={(e) => setEditingService({ ...editingService, turnaroundTime: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      value={editingService.status}
                      onChange={(e) => setEditingService({ ...editingService, status: e.target.value })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Edit Required Documents Checklist & Validation Rules */}
                <div
                  style={{
                    border: "1.5px solid var(--primary-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.25rem",
                    background: "#ffffff"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <FileText size={18} color="var(--primary)" />
                      <h4 style={{ fontSize: "0.95rem", color: "var(--secondary)", margin: 0 }}>
                        Required Documents & Citizen Fields Validation Rules
                      </h4>
                    </div>
                    <span className="badge badge-blue">
                      {(editingService.requiredDocuments || []).length} Requirements
                    </span>
                  </div>

                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.85rem" }}>
                    Configure what customer inputs or uploads are needed. Set the validation rule (<strong>Only Number</strong>, <strong>Only Text</strong>, <strong>Number & Text Both</strong>, <strong>Image</strong>, or <strong>PDF</strong>) and toggle <strong>Mandatory</strong>.
                  </p>

                  {/* Quick Template Chips */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "0.85rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)" }}>Quick Templates:</span>
                    {[
                      { title: "12-Digit Aadhaar Number", type: "number" },
                      { title: "Customer Full Name", type: "text" },
                      { title: "PAN Card Number", type: "alphanumeric" },
                      { title: "Passport Size Photograph", type: "image" },
                      { title: "Address Proof Document", type: "pdf" },
                      { title: "Aadhaar / ID Card Copy", type: "image_or_pdf" }
                    ].map((tpl) => (
                      <button
                        key={tpl.title}
                        type="button"
                        onClick={() => setEditDocDraft({ ...editDocDraft, title: tpl.title, type: tpl.type })}
                        style={{
                          background: editDocDraft.title === tpl.title ? "var(--primary-subtle)" : "#f1f5f9",
                          border: "1px solid",
                          borderColor: editDocDraft.title === tpl.title ? "var(--primary)" : "var(--card-border)",
                          color: editDocDraft.title === tpl.title ? "var(--primary)" : "var(--secondary)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        + {tpl.title}
                      </button>
                    ))}
                  </div>

                  {/* Add Field Row */}
                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--card-border)",
                      marginBottom: "1rem"
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.7fr 1.6fr 1fr auto",
                        gap: "0.75rem",
                        alignItems: "end"
                      }}
                    >
                      <div>
                        <label className="form-label" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                          Field / Document Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Aadhaar Card / PAN Number / Document..."
                          className="form-control"
                          style={{ padding: "0.45rem 0.75rem", fontSize: "0.85rem" }}
                          value={editDocDraft.title}
                          onChange={(e) => setEditDocDraft({ ...editDocDraft, title: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddDocToEdit();
                            }
                          }}
                        />
                      </div>

                      <div>
                        <label className="form-label" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                          Allowed Input / Validation Type *
                        </label>
                        <select
                          className="form-control"
                          style={{ padding: "0.45rem 0.75rem", fontSize: "0.85rem", fontWeight: 600 }}
                          value={editDocDraft.type || "image_or_pdf"}
                          onChange={(e) => setEditDocDraft({ ...editDocDraft, type: e.target.value })}
                        >
                          <option value="number">🔢 Only Number (0-9 Digits)</option>
                          <option value="text">🔤 Only Text (A-Z Alphabets)</option>
                          <option value="alphanumeric">🔠 Number & Text Both (Alphanumeric)</option>
                          <option value="image">🖼️ Image File (.JPG, .PNG)</option>
                          <option value="pdf">📄 PDF Document (.PDF)</option>
                          <option value="image_or_pdf">📎 Image or PDF (Both Accepted)</option>
                        </select>
                      </div>

                      <div style={{ paddingBottom: "6px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}>
                          <input
                            type="checkbox"
                            checked={editDocDraft.isMandatory}
                            onChange={(e) => setEditDocDraft({ ...editDocDraft, isMandatory: e.target.checked })}
                          />
                          <span style={{ color: editDocDraft.isMandatory ? "var(--rose)" : "var(--text-muted)" }}>
                            {editDocDraft.isMandatory ? "Mandatory *" : "Optional"}
                          </span>
                        </label>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          style={{ padding: "0.45rem 0.85rem", display: "flex", alignItems: "center", gap: "4px" }}
                          onClick={handleAddDocToEdit}
                        >
                          <Plus size={15} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Rule Explanation */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "0.5rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      <Info size={13} color="var(--primary)" />
                      <span>
                        {editDocDraft.type === "number" && "Retailer will only be allowed to enter numeric digits (0-9). Example: 12-digit Aadhaar, Mobile number, PIN code."}
                        {editDocDraft.type === "text" && "Retailer will only be allowed to enter alphabetical letters. Example: Customer Full Name, Father's Name."}
                        {editDocDraft.type === "alphanumeric" && "Retailer can enter both letters and numbers. Example: PAN Card (ABCDE1234F), Voter ID, Driving Licence."}
                        {editDocDraft.type === "image" && "Retailer must upload an Image file (.jpg, .jpeg, .png). Example: Passport photograph, Customer signature."}
                        {editDocDraft.type === "pdf" && "Retailer must upload a PDF document (.pdf). Example: Rent agreement, Bank statement, Electricity bill."}
                        {editDocDraft.type === "image_or_pdf" && "Retailer can upload either a PDF document or an Image file. Example: Aadhaar copy, Address proof."}
                      </span>
                    </div>
                  </div>

                  {/* Document List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {(editingService.requiredDocuments || []).map((docItem, idx) => {
                      const doc = normalizeDoc(docItem);
                      return (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.55rem 0.85rem",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--card-border)",
                            background: doc.isMandatory ? "#fbfcfe" : "#ffffff",
                            gap: "0.75rem"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                            <button
                              type="button"
                              onClick={() => handleToggleDocMandatoryInEdit(idx)}
                              style={{ display: "flex", color: doc.isMandatory ? "var(--emerald)" : "#94a3b8" }}
                              title="Toggle Mandatory checkbox"
                            >
                              {doc.isMandatory ? <CheckSquare size={18} /> : <Square size={18} />}
                            </button>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {doc.title}
                              </div>
                              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                                Rule: {doc.isMandatory ? "Mandatory requirement" : "Optional field"}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                            {/* In-place validation type switcher */}
                            <select
                              value={doc.type || "image_or_pdf"}
                              onChange={(e) => handleUpdateDocTypeInEdit(idx, e.target.value)}
                              style={{
                                fontSize: "0.75rem",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid var(--card-border)",
                                background: "#ffffff",
                                fontWeight: 600,
                                color: "var(--secondary)",
                                cursor: "pointer"
                              }}
                              title="Change validation type"
                            >
                              <option value="number">🔢 Only Number</option>
                              <option value="text">🔤 Only Text</option>
                              <option value="alphanumeric">🔠 Number & Text</option>
                              <option value="image">🖼️ Image</option>
                              <option value="pdf">📄 PDF</option>
                              <option value="image_or_pdf">📎 Image or PDF</option>
                            </select>

                            <DocFormatBadges
                              type={doc.type}
                              allowPdf={doc.allowPdf}
                              allowImage={doc.allowImage}
                              isMandatory={doc.isMandatory}
                            />

                            <button
                              type="button"
                              onClick={() => handleRemoveDocFromEdit(idx)}
                              style={{ color: "var(--rose)", display: "flex" }}
                              title="Remove Requirement"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setEditingService(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={15} />
                  <span>Update Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW ALL REQUIRED DOCUMENTS MODAL */}
      {viewDocsService && (
        <div className="modal-overlay" onClick={() => setViewDocsService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "580px" }}>
            <div className="modal-header">
              <div>
                <h3>Required Documents & Input Rules</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {viewDocsService.name} ({viewDocsService.categoryName})
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setViewDocsService(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {(viewDocsService.requiredDocuments || []).map((docItem, idx) => {
                  const doc = normalizeDoc(docItem);
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--card-border)",
                        background: "#f8fafc",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ color: doc.isMandatory ? "var(--emerald)" : "var(--text-muted)" }}>
                          {doc.isMandatory ? <CheckSquare size={18} /> : <Square size={18} />}
                        </span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--secondary)" }}>
                            {doc.title}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                            {doc.isMandatory ? "Mandatory for Department Submission" : "Optional / Case-specific"}
                          </div>
                        </div>
                      </div>

                      <DocFormatBadges
                        type={doc.type}
                        allowPdf={doc.allowPdf}
                        allowImage={doc.allowImage}
                        isMandatory={doc.isMandatory}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setViewDocsService(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
