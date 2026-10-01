import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { FolderTree, PlusCircle, Edit, Trash2, CheckCircle2, XCircle, X, Save, Building } from "lucide-react";

export const AdminCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory, services } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [newCat, setNewCat] = useState({
    name: "",
    description: "",
    status: "active"
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCat.name) return;
    addCategory(newCat);
    setShowAddModal(false);
    setNewCat({ name: "", description: "", status: "active" });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingCategory) return;
    updateCategory(editingCategory.id, {
      name: editingCategory.name,
      description: editingCategory.description,
      status: editingCategory.status
    });
    setEditingCategory(null);
  };

  const toggleStatus = (cat) => {
    const nextStatus = cat.status === "active" ? "inactive" : "active";
    updateCategory(cat.id, { status: nextStatus });
  };

  return (
    <div className="admin-categories-page">
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
            Service Categories ({categories.length})
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Create and organize citizen service domains (Aadhaar, PAN, GST, Banking, Welfare).
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <PlusCircle size={16} />
          <span>Create New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {categories.map((cat) => {
          const serviceCount = services.filter((s) => s.categoryId === cat.id).length;
          return (
            <div
              key={cat.id}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--primary-subtle)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Building size={22} />
                  </div>

                  <span
                    className={`badge ${cat.status === "active" ? "badge-green" : "badge-slate"}`}
                    style={{ fontSize: "0.7rem", cursor: "pointer" }}
                    onClick={() => toggleStatus(cat)}
                    title="Click to toggle active status"
                  >
                    {cat.status}
                  </span>
                </div>

                <h4 style={{ fontSize: "1.2rem", color: "var(--secondary)", marginBottom: "0.4rem" }}>
                  {cat.name}
                </h4>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.5", marginBottom: "1rem" }}>
                  {cat.description}
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--card-border)",
                    fontSize: "0.85rem"
                  }}
                >
                  <span style={{ fontWeight: 600, color: "var(--primary)" }}>
                    {serviceCount} Active Services
                  </span>

                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                      className="btn btn-sm btn-outline"
                      style={{ padding: "0.25rem 0.5rem" }}
                      onClick={() => setEditingCategory({ ...cat })}
                      title="Edit Category"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>

                    <button
                      className="btn btn-sm btn-outline"
                      style={{ padding: "0.25rem 0.5rem", color: "var(--rose)" }}
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                          deleteCategory(cat.id);
                        }
                      }}
                      title="Delete Category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3>Create Service Category</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Legal & Stamp Duty Services"
                    className="form-control"
                    value={newCat.name}
                    onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of citizen services grouped under this category..."
                    className="form-control"
                    value={newCat.description}
                    onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="modal-overlay" onClick={() => setEditingCategory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3>Edit Category</h3>
              <button className="modal-close-btn" onClick={() => setEditingCategory(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={editingCategory.status}
                    onChange={(e) => setEditingCategory({ ...editingCategory, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setEditingCategory(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={15} />
                  <span>Update Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
