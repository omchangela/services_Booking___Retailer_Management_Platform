import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initialCategories,
  initialServices,
  initialRetailers,
  initialInquiries,
  initialTransactions,
  initialApplications
} from "../data/initialData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Persistence key prefix
  const STORAGE_KEY = "sevasetu_demo_v1_";

  const loadFromStorage = (key, fallback) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.error("Storage load error:", e);
      return fallback;
    }
  };

  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(STORAGE_KEY + key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage save error:", e);
    }
  };

  // State management
  const [currentRole, setCurrentRole] = useState("public"); // 'public' | 'retailer' | 'admin'
  const [publicPage, setPublicPage] = useState("home"); // 'home' | 'services' | 'about' | 'contact' | 'track'
  const [retailerTab, setRetailerTab] = useState("dashboard"); // 'dashboard' | 'services' | 'wallet' | 'commission' | 'profile'
  const [adminTab, setAdminTab] = useState("dashboard"); // 'dashboard' | 'retailers' | 'categories' | 'services' | 'inquiries' | 'wallet'

  // Data collections
  const [categories, setCategories] = useState(() => loadFromStorage("categories", initialCategories));
  const [services, setServices] = useState(() => loadFromStorage("services", initialServices));
  const [retailers, setRetailers] = useState(() => loadFromStorage("retailers", initialRetailers));
  const [inquiries, setInquiries] = useState(() => loadFromStorage("inquiries", initialInquiries));
  const [transactions, setTransactions] = useState(() => loadFromStorage("transactions", initialTransactions));
  const [applications, setApplications] = useState(() => loadFromStorage("applications", initialApplications));

  // Current active logged in retailer (Ramesh Kumar Sharma by default)
  const [currentRetailerId, setCurrentRetailerId] = useState("ret-101");
  const [isRetailerAuthenticated, setIsRetailerAuthenticated] = useState(true);

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => loadFromStorage("admin_auth", false));
  const [adminUser, setAdminUser] = useState({
    name: "Rajeev Mehra",
    role: "Super Administrator & Compliance Head",
    email: "admin@sevasetu.gov.in",
    badge: "Master Security Clearance",
    lastLogin: "Active Session"
  });

  // Modals & UI helpers
  const [inquiryModal, setInquiryModal] = useState({ isOpen: false, preselectedServiceId: null });
  const [serviceDetailModal, setServiceDetailModal] = useState({ isOpen: false, service: null });
  const [applyServiceModal, setApplyServiceModal] = useState({ isOpen: false, service: null });
  const [walletRechargeModal, setWalletRechargeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync to local storage
  useEffect(() => saveToStorage("categories", categories), [categories]);
  useEffect(() => saveToStorage("services", services), [services]);
  useEffect(() => saveToStorage("retailers", retailers), [retailers]);
  useEffect(() => saveToStorage("inquiries", inquiries), [inquiries]);
  useEffect(() => saveToStorage("transactions", transactions), [transactions]);
  useEffect(() => saveToStorage("applications", applications), [applications]);
  useEffect(() => saveToStorage("admin_auth", isAdminAuthenticated), [isAdminAuthenticated]);

  const notify = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Get active retailer object
  const currentRetailer = retailers.find((r) => r.id === currentRetailerId) || retailers[0];

  // Reset all demo data to default seed
  const resetDemoData = () => {
    localStorage.clear();
    setCategories(initialCategories);
    setServices(initialServices);
    setRetailers(initialRetailers);
    setInquiries(initialInquiries);
    setTransactions(initialTransactions);
    setApplications(initialApplications);
    setCurrentRetailerId("ret-101");
    setIsRetailerAuthenticated(true);
    setIsAdminAuthenticated(false);
    notify("Demo platform data reset to initial default values!", "info");
  };

  // Public: Add Citizen Inquiry
  const addInquiry = (inquiryData) => {
    const newInquiry = {
      id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "New",
      assignedRetailerId: currentRetailer ? currentRetailer.id : "ret-101",
      assignedRetailerName: currentRetailer ? currentRetailer.shopName : "Ramesh Digital Seva Kendra",
      adminNotes: "Submitted directly by citizen on website.",
      ...inquiryData
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    notify(`🔔 New Citizen Inquiry #${newInquiry.id} (${newInquiry.customerName}, ${newInquiry.city || "Local"}) received for ${newInquiry.serviceName}! Automatically alerted to Admin Panel.`, "success");
    return newInquiry;
  };

  // Admin: Update Inquiry Status or Assignment
  const updateInquiryStatus = (id, newStatus, notes = "") => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, status: newStatus, adminNotes: notes || inq.adminNotes } : inq
      )
    );
    notify(`Inquiry #${id} marked as "${newStatus}"`, "info");
  };

  const assignInquiryToRetailer = (inquiryId, retailerId) => {
    const targetRetailer = retailers.find((r) => r.id === retailerId);
    if (!targetRetailer) return;
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId
          ? {
              ...inq,
              assignedRetailerId: targetRetailer.id,
              assignedRetailerName: targetRetailer.shopName
            }
          : inq
      )
    );
    notify(`Inquiry #${inquiryId} assigned to ${targetRetailer.shopName}`, "success");
  };

  // Retailer Wallet Recharge
  const rechargeRetailerWallet = (amount, paymentMode = "UPI (Instant)") => {
    const rechargeAmt = parseFloat(amount);
    if (isNaN(rechargeAmt) || rechargeAmt <= 0) {
      notify("Please enter a valid recharge amount", "error");
      return false;
    }

    const newBalance = (currentRetailer.walletBalance || 0) + rechargeAmt;

    const newTxn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      retailerId: currentRetailer.id,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      type: "credit",
      category: "Wallet Recharge",
      amount: rechargeAmt,
      balanceAfter: newBalance,
      description: `Instant Wallet Recharge via ${paymentMode}`,
      status: "Success",
      referenceId: `TOPUP-${Date.now().toString().slice(-6)}`
    };

    setRetailers((prev) =>
      prev.map((ret) =>
        ret.id === currentRetailer.id ? { ...ret, walletBalance: newBalance } : ret
      )
    );

    setTransactions((prev) => [newTxn, ...prev]);
    notify(`₹${rechargeAmt.toLocaleString("en-IN")} credited to your wallet balance!`, "success");
    return true;
  };

  // Retailer Apply for Service on behalf of customer
  const submitCustomerApplication = (applicationData) => {
    const { service, customerName, customerMobile, customerAadhaar, uploadedDocs } = applicationData;
    const cost = parseFloat(service.retailerCost || 0);
    const commission = parseFloat(service.retailerCommission || 0);

    if (currentRetailer.walletBalance < cost) {
      notify(`Insufficient wallet balance (₹${currentRetailer.walletBalance}). Required: ₹${cost}. Please recharge!`, "error");
      return false;
    }

    const balanceAfterDebit = currentRetailer.walletBalance - cost;
    const balanceAfterCredit = balanceAfterDebit + commission;

    const appId = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const ackNo = `SEVA-${service.id.toUpperCase().slice(-3)}-${Date.now().toString().slice(-6)}`;

    // 1. Debit Transaction for service fee
    const debitTxn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      retailerId: currentRetailer.id,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      type: "debit",
      category: "Service Application Fee",
      amount: cost,
      balanceAfter: balanceAfterDebit,
      description: `Fee debited for ${service.name} (Customer: ${customerName})`,
      status: "Success",
      referenceId: ackNo
    };

    // 2. Commission Credit Transaction
    const creditTxn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000) + 1}`,
      retailerId: currentRetailer.id,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      type: "credit",
      category: "Commission Credited",
      amount: commission,
      balanceAfter: balanceAfterCredit,
      description: `Commission earned for ${service.name} (App #${appId})`,
      status: "Success",
      referenceId: `COM-${appId}`
    };

    // Update retailer state
    setRetailers((prev) =>
      prev.map((ret) =>
        ret.id === currentRetailer.id
          ? {
              ...ret,
              walletBalance: balanceAfterCredit,
              todayCommission: (ret.todayCommission || 0) + commission,
              totalCommission: (ret.totalCommission || 0) + commission,
              totalApplications: (ret.totalApplications || 0) + 1,
              completedApplications: (ret.completedApplications || 0) + 1
            }
          : ret
      )
    );

    // Save transactions
    setTransactions((prev) => [creditTxn, debitTxn, ...prev]);

    // Save Application
    const newApp = {
      id: appId,
      retailerId: currentRetailer.id,
      serviceId: service.id,
      serviceName: service.name,
      customerName,
      customerMobile,
      customerAadhaar: customerAadhaar || "XXXX-XXXX-9912",
      customerPrice: service.customerPrice,
      retailerCost: cost,
      commissionEarned: commission,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "Submitted & Processing",
      acknowledgementNo: ackNo,
      documentsUploaded: uploadedDocs && uploadedDocs.length > 0 ? uploadedDocs : ["Aadhaar_Card.pdf", "Photo_ID.jpg"]
    };

    setApplications((prev) => [newApp, ...prev]);
    notify(`Application ${appId} submitted successfully! Commission ₹${commission} instantly credited to wallet.`, "success");
    return newApp;
  };

  // Retailer Management (Admin)
  const addRetailer = (retailerData) => {
    const newRet = {
      id: `ret-${Math.floor(100 + Math.random() * 900)}`,
      cscId: `CSC-${retailerData.state ? retailerData.state.slice(0, 2).toUpperCase() : "IN"}-${Math.floor(1000 + Math.random() * 9000)}`,
      walletBalance: parseFloat(retailerData.initialWallet || 1000),
      todayCommission: 0,
      totalCommission: 0,
      totalApplications: 0,
      completedApplications: 0,
      pendingApplications: 0,
      status: "active",
      kycStatus: "approved",
      joinedDate: new Date().toISOString().split("T")[0],
      ...retailerData
    };
    setRetailers((prev) => [newRet, ...prev]);
    notify(`Retailer "${newRet.shopName}" registered successfully!`, "success");
  };

  const updateRetailer = (id, updatedFields) => {
    setRetailers((prev) =>
      prev.map((ret) => (ret.id === id ? { ...ret, ...updatedFields } : ret))
    );
    notify("Retailer details updated successfully!", "success");
  };

  const approveRetailer = (id) => {
    setRetailers((prev) =>
      prev.map((ret) =>
        ret.id === id ? { ...ret, status: "active", kycStatus: "approved" } : ret
      )
    );
    notify("Retailer approved & activated!", "success");
  };

  const rejectRetailer = (id) => {
    setRetailers((prev) =>
      prev.map((ret) =>
        ret.id === id ? { ...ret, status: "deactivated", kycStatus: "rejected" } : ret
      )
    );
    notify("Retailer application rejected", "error");
  };

  const toggleRetailerStatus = (id) => {
    setRetailers((prev) =>
      prev.map((ret) => {
        if (ret.id === id) {
          const nextStatus = ret.status === "active" ? "deactivated" : "active";
          notify(`Retailer ${ret.shopName} is now ${nextStatus}`, "info");
          return { ...ret, status: nextStatus };
        }
        return ret;
      })
    );
  };

  // Category Management (Admin)
  const addCategory = (categoryData) => {
    const newCat = {
      id: `cat-${Date.now().toString().slice(-4)}`,
      slug: categoryData.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      serviceCount: 0,
      status: "active",
      ...categoryData
    };
    setCategories((prev) => [...prev, newCat]);
    notify(`Category "${newCat.name}" created!`, "success");
  };

  const updateCategory = (id, updatedData) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updatedData } : cat))
    );
    notify("Category updated successfully!", "success");
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    notify("Category removed", "info");
  };

  // Service Management (Admin)
  const addService = (serviceData) => {
    const matchedCategory = categories.find((c) => c.id === serviceData.categoryId);
    const newSrv = {
      id: `srv-${Date.now().toString().slice(-5)}`,
      categoryName: matchedCategory ? matchedCategory.name : "General Services",
      status: "active",
      isFeatured: serviceData.isFeatured || false,
      badge: serviceData.badge || "New Service",
      ...serviceData
    };
    setServices((prev) => [newSrv, ...prev]);

    // increment category count
    if (matchedCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === matchedCategory.id ? { ...c, serviceCount: (c.serviceCount || 0) + 1 } : c
        )
      );
    }
    notify(`Service "${newSrv.name}" published!`, "success");
  };

  const updateService = (id, updatedData) => {
    setServices((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, ...updatedData } : srv))
    );
    notify("Service updated successfully!", "success");
  };

  const deleteService = (id) => {
    setServices((prev) => prev.filter((srv) => srv.id !== id));
    notify("Service deleted", "info");
  };

  const toggleServiceStatus = (id) => {
    setServices((prev) =>
      prev.map((srv) => {
        if (srv.id === id) {
          const nextStatus = srv.status === "active" ? "inactive" : "active";
          notify(`Service "${srv.name}" marked as ${nextStatus}`, "info");
          return { ...srv, status: nextStatus };
        }
        return srv;
      })
    );
  };

  // Admin Manual Wallet Adjustment
  const adjustRetailerWallet = (retailerId, amount, type = "credit", reason = "Admin Manual Adjustment") => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    setRetailers((prev) =>
      prev.map((ret) => {
        if (ret.id === retailerId) {
          const newBal = type === "credit" ? ret.walletBalance + amt : Math.max(0, ret.walletBalance - amt);
          const newTxn = {
            id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
            retailerId: ret.id,
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }),
            type,
            category: "Admin Adjustment",
            amount: amt,
            balanceAfter: newBal,
            description: `${reason} by System Admin`,
            status: "Success",
            referenceId: `ADM-${Date.now().toString().slice(-6)}`
          };
          setTransactions((t) => [newTxn, ...t]);
          return { ...ret, walletBalance: newBal };
        }
        return ret;
      })
    );
    notify(`Wallet adjustment of ₹${amt} (${type}) applied`, "success");
  };

  return (
    <AppContext.Provider
      value={{
        // Role & Routing
        currentRole,
        setCurrentRole,
        publicPage,
        setPublicPage,
        retailerTab,
        setRetailerTab,
        adminTab,
        setAdminTab,

        // Authentication & Profile
        currentRetailer,
        currentRetailerId,
        setCurrentRetailerId,
        isRetailerAuthenticated,
        setIsRetailerAuthenticated,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminUser,

        // Collections
        categories,
        services,
        retailers,
        inquiries,
        transactions,
        applications,

        // Modals & UI
        inquiryModal,
        setInquiryModal,
        serviceDetailModal,
        setServiceDetailModal,
        applyServiceModal,
        setApplyServiceModal,
        walletRechargeModal,
        setWalletRechargeModal,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,

        // Actions
        notify,
        resetDemoData,
        addInquiry,
        updateInquiryStatus,
        assignInquiryToRetailer,
        rechargeRetailerWallet,
        submitCustomerApplication,
        addRetailer,
        updateRetailer,
        approveRetailer,
        rejectRetailer,
        toggleRetailerStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        addService,
        updateService,
        deleteService,
        toggleServiceStatus,
        adjustRetailerWallet,

        // Toast notifications
        toasts,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
