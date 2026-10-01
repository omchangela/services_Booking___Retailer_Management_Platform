import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Wallet, CheckCircle2, QrCode, CreditCard, ArrowRight, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export const WalletRechargeModal = () => {
  const { walletRechargeModal, setWalletRechargeModal, rechargeRetailerWallet, currentRetailer } = useApp();
  const [selectedAmount, setSelectedAmount] = useState(2000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!walletRechargeModal) return null;

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleRecharge = () => {
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please choose or enter a valid recharge amount");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const modeLabel = paymentMethod === "upi" ? "UPI QR (PhonePe / GPay)" : paymentMethod === "card" ? "Debit/Credit Card" : "NetBanking (SBI/HDFC)";
      rechargeRetailerWallet(finalAmount, modeLabel);
      setIsProcessing(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if confetti unavailable
      }
    }, 900);
  };

  const handleClose = () => {
    setWalletRechargeModal(false);
    setIsSuccess(false);
    setIsProcessing(false);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "520px" }}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-md)",
                background: "var(--primary-subtle)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Wallet size={20} />
            </div>
            <div>
              <h3>Instant Wallet Recharge</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Current Balance: <strong>₹{currentRetailer.walletBalance.toLocaleString("en-IN")}</strong>
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="modal-body" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "var(--emerald-subtle)",
                color: "var(--emerald)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem"
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: "1.4rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
              Recharge Successful!
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              ₹{finalAmount.toLocaleString("en-IN")} has been credited to your retailer wallet balance instantly.
            </p>

            <div
              style={{
                background: "#f8fafc",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--card-border)",
                marginBottom: "1.5rem"
              }}
            >
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Updated Available Balance</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--emerald)" }}>
                ₹{currentRetailer.walletBalance.toLocaleString("en-IN")}
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleClose}>
              Continue to Portal
            </button>
          </div>
        ) : (
          <div className="modal-body">
            {/* Quick Presets */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label className="form-label">Select Top-Up Amount (₹)</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem" }}>
                {[500, 1000, 2000, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    style={{
                      padding: "0.75rem 0.5rem",
                      borderRadius: "var(--radius-md)",
                      border: "1.5px solid",
                      borderColor: selectedAmount === amt && !customAmount ? "var(--primary)" : "var(--card-border)",
                      background: selectedAmount === amt && !customAmount ? "var(--primary-subtle)" : "#ffffff",
                      color: selectedAmount === amt && !customAmount ? "var(--primary)" : "var(--text-main)",
                      fontWeight: 700,
                      fontSize: "0.95rem"
                    }}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="form-group">
              <label className="form-label">Or Custom Amount (₹)</label>
              <input
                type="number"
                placeholder="Enter custom amount e.g. 3500"
                className="form-control"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label className="form-label">Select Instant Payment Gateway</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid",
                    borderColor: paymentMethod === "upi" ? "var(--primary)" : "var(--card-border)",
                    background: paymentMethod === "upi" ? "var(--primary-subtle)" : "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <input
                    type="radio"
                    name="payMode"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <QrCode size={20} color="var(--primary)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>UPI Instant QR / Apps</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Google Pay, PhonePe, Paytm, BHIM</div>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: "0.7rem" }}>Instant 0% Fee</span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid",
                    borderColor: paymentMethod === "netbanking" ? "var(--primary)" : "var(--card-border)",
                    background: paymentMethod === "netbanking" ? "var(--primary-subtle)" : "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <input
                    type="radio"
                    name="payMode"
                    checked={paymentMethod === "netbanking"}
                    onChange={() => setPaymentMethod("netbanking")}
                  />
                  <CreditCard size={20} color="var(--primary)" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>NetBanking (Direct Debit)</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>SBI, HDFC, ICICI, PNB, BOB</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Total Recharge Summary */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.85rem 1rem",
                background: "#f8fafc",
                borderRadius: "var(--radius-md)",
                marginBottom: "1rem",
                border: "1px solid var(--card-border)"
              }}
            >
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total To Be Added:</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--secondary)" }}>
                  ₹{(finalAmount || 0).toLocaleString("en-IN")}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#065f46" }}>
                <ShieldCheck size={16} />
                <span>100% Secure Transfer</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-emerald"
              style={{ width: "100%", padding: "0.85rem" }}
              disabled={isProcessing}
              onClick={handleRecharge}
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <>
                  <span>Simulate Instant Recharge ₹{(finalAmount || 0).toLocaleString("en-IN")}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
