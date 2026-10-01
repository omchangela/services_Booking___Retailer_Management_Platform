import React from "react";
import { AppProvider, useApp } from "./context/AppContext";

// Common Components
import { DemoToolbar } from "./components/common/DemoToolbar";
import { ToastContainer } from "./components/common/ToastContainer";
import { InquiryModal } from "./components/common/InquiryModal";
import { ServiceDetailModal } from "./components/common/ServiceDetailModal";
import { Footer } from "./components/common/Footer";

// Public Components
import { PublicNavbar } from "./components/public/PublicNavbar";
import { PublicHome } from "./components/public/PublicHome";
import { PublicServices } from "./components/public/PublicServices";
import { PublicAbout } from "./components/public/PublicAbout";
import { PublicContact } from "./components/public/PublicContact";
import { PublicTrackInquiry } from "./components/public/PublicTrackInquiry";

// Retailer Components
import { RetailerLogin } from "./components/retailer/RetailerLogin";
import { RetailerLayout } from "./components/retailer/RetailerLayout";
import { RetailerDashboard } from "./components/retailer/RetailerDashboard";
import { RetailerServices } from "./components/retailer/RetailerServices";
import { RetailerWallet } from "./components/retailer/RetailerWallet";
import { RetailerCommission } from "./components/retailer/RetailerCommission";
import { RetailerProfile } from "./components/retailer/RetailerProfile";
import { WalletRechargeModal } from "./components/retailer/WalletRechargeModal";
import { ApplyServiceModal } from "./components/retailer/ApplyServiceModal";

// Admin Components
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminRetailers } from "./components/admin/AdminRetailers";
import { AdminCategories } from "./components/admin/AdminCategories";
import { AdminServices } from "./components/admin/AdminServices";
import { AdminInquiries } from "./components/admin/AdminInquiries";
import { AdminWallet } from "./components/admin/AdminWallet";

const MainAppContent = () => {
  const {
    currentRole,
    publicPage,
    retailerTab,
    adminTab,
    isRetailerAuthenticated,
    isAdminAuthenticated
  } = useApp();

  return (
    <div className="app-wrapper">
      {/* Client Demo Switcher Toolbar */}
      <DemoToolbar />

      {/* Role-based view switching */}
      {currentRole === "public" && (
        <>
          <PublicNavbar />
          <main className="main-content">
            {publicPage === "home" && <PublicHome />}
            {publicPage === "services" && <PublicServices />}
            {publicPage === "about" && <PublicAbout />}
            {publicPage === "contact" && <PublicContact />}
            {publicPage === "track" && <PublicTrackInquiry />}
          </main>
          <Footer />
        </>
      )}

      {currentRole === "retailer" && (
        <>
          {!isRetailerAuthenticated ? (
            <RetailerLogin />
          ) : (
            <RetailerLayout>
              {retailerTab === "dashboard" && <RetailerDashboard />}
              {retailerTab === "services" && <RetailerServices />}
              {retailerTab === "wallet" && <RetailerWallet />}
              {retailerTab === "commission" && <RetailerCommission />}
              {retailerTab === "profile" && <RetailerProfile />}
            </RetailerLayout>
          )}
        </>
      )}

      {currentRole === "admin" && (
        <>
          {!isAdminAuthenticated ? (
            <AdminLogin />
          ) : (
            <AdminLayout>
              {adminTab === "dashboard" && <AdminDashboard />}
              {adminTab === "retailers" && <AdminRetailers />}
              {adminTab === "categories" && <AdminCategories />}
              {adminTab === "services" && <AdminServices />}
              {adminTab === "inquiries" && <AdminInquiries />}
              {adminTab === "wallet" && <AdminWallet />}
            </AdminLayout>
          )}
        </>
      )}

      {/* Global Interactive Modals */}
      <InquiryModal />
      <ServiceDetailModal />
      <ApplyServiceModal />
      <WalletRechargeModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
