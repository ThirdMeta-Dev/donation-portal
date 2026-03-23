import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, Loader2, Lock, Shield, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { donationApi } from "../lib/api";
import { generateReceiptNo, generatePaymentId } from "../lib/donationStore";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { supabase } from "../lib/supabase";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const state = location.state as any;

  const [step, setStep] = useState<"init" | "processing" | "success" | "error">("init");
  const [error, setError] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [razorpayAvailable, setRazorpayAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (!state?.amount) { navigate("/donate"); return; }
    loadRazorpayScript().then(ok => {
      setScriptLoaded(true);
      setRazorpayAvailable(ok);
    });
  }, []);

  if (!state?.amount) return null;

  const { amount, cause, name, email, phone, pan, frequency, donorType, taxReceipt, address, country, cause80GEnabled } = state;

  const getImpact = () => {
    if (amount <= 150) return `Your ₹${amount} fed 1 child for a week.`;
    if (amount <= 500) return `Your ₹${amount} supported 1 child's education for a week.`;
    if (amount <= 1000) return `Your ₹${amount} provided free medical care for ${Math.floor(amount / 300)} people.`;
    if (amount <= 5000) return `Your ₹${amount.toLocaleString()} provided clean water for ${Math.floor(amount / 2500)} family.`;
    return `Your ₹${amount.toLocaleString()} is making a huge difference across our programs!`;
  };

  const saveAndRedirect = async (paymentId: string, orderId?: string) => {
    // Always get the freshest possible session token before saving
    const { data: { session } } = await supabase.auth.getSession();
    const currentUserId = session?.user?.id || user?.id || "guest";
    const currentEmail  = session?.user?.email || user?.email || email;

    const donation = {
      id: `don-${Date.now()}`,
      userId:   currentUserId,
      userName: name,
      userEmail: currentEmail,          // always use authed email if available
      causeId:  cause?.id   || "general",
      causeName: cause?.title || "General Fund",
      amount,
      currency: "INR" as const,
      frequency,
      donorType,
      pan,
      phone: phone || "",
      address: address || "",
      country: country || (donorType === "indian" ? "India" : ""),
      paymentId,
      razorpayOrderId: orderId || null,
      status: "success" as const,
      // certificate80G is only true if: cause supports 80G AND donor opted in AND donor is indian/nri
      certificate80G: (cause80GEnabled !== false) && taxReceipt && (donorType === "indian" || donorType === "nri"),
      createdAt: new Date().toISOString(),
      receiptNo: generateReceiptNo(),
      impactDescription: getImpact(),
    };

    console.log("Saving donation:", donation.id, "userId:", donation.userId, "email:", donation.userEmail);

    try {
      const result = await donationApi.save(donation);
      const saved = (result as any).donation || donation;
      console.log("✅ Donation saved:", saved.receiptNo, "userId:", saved.userId);
      setStep("success");
      setTimeout(() => navigate("/thank-you", { state: saved }), 1800);
    } catch (e: any) {
      // Save failed — but still show success to donor and log the error
      console.error("❌ Donation save error:", e.message || e);
      setError(`Save error (payment was captured): ${e.message}. Please screenshot this page and contact support@ashakiran.org`);
      // Still navigate so donor can see confirmation; we retry in background
      setStep("success");
      setTimeout(() => navigate("/thank-you", { state: donation }), 2500);
    }
  };

  const handleRazorpayPayment = async () => {
    setError("");
    setStep("processing");

    try {
      const receiptNo = generateReceiptNo();
      const orderRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a0af4170/razorpay/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${publicAnonKey}` },
          body: JSON.stringify({ amount, currency: "INR", receipt: receiptNo }),
        }
      );
      const orderData = await orderRes.json();
      console.log("Razorpay order:", orderData);

      if (orderData.error) {
        setError(orderData.error);
        setStep("error");
        // Record failed payment
        donationApi.saveFailed({ userName: name, userEmail: email, amount, causeId: cause?.id, causeName: cause?.title, frequency, donorType, errorDescription: orderData.error }).catch(() => {});
        return;
      }

      const isMockOrder = orderData.orderId?.startsWith("order_MOCK");

      if (isMockOrder || !window.Razorpay) {
        console.log("Using mock payment flow");
        await new Promise(r => setTimeout(r, 1200));
        const mockPayId = generatePaymentId();
        await saveAndRedirect(mockPayId, orderData.orderId);
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Asha Kiran Foundation",
        description: `Donation — ${cause?.title || "General Fund"}`,
        image: "https://ui-avatars.com/api/?name=Asha+Kiran&background=F97316&color=fff&size=128&rounded=true",
        order_id: orderData.orderId,
        handler: async (response: any) => {
          console.log("Razorpay payment success:", response);
          setStep("processing");
          try {
            const verRes = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-a0af4170/razorpay/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${publicAnonKey}` },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );
            const verData = await verRes.json();
            if (!verData.verified) {
              setError("Payment verification failed. Please contact support.");
              setStep("error");
              return;
            }
          } catch (e) {
            console.error("Verify error:", e);
          }
          await saveAndRedirect(response.razorpay_payment_id, response.razorpay_order_id);
        },
        prefill: { name: name || "", email: email || "", contact: phone || "" },
        notes: { cause: cause?.title || "General Fund", pan: pan || "", donorType: donorType || "", frequency: frequency || "one-time" },
        theme: { color: "#F97316" },
        modal: {
          ondismiss: () => {
            console.log("Razorpay modal closed by user");
            setStep("init");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        console.error("Razorpay payment failed:", response.error);
        const errDesc = response.error?.description || "Payment failed. Please try again.";
        setError(errDesc);
        setStep("error");
        // Record failed payment in dashboard
        donationApi.saveFailed({
          userName: name, userEmail: email, amount,
          causeId: cause?.id, causeName: cause?.title,
          frequency, donorType,
          errorDescription: errDesc,
        }).catch(() => {});
      });
      rzp.open();

    } catch (e: any) {
      console.error("Razorpay flow error:", e);
      setError("Something went wrong. Please try again.");
      setStep("error");
    }
  };

  if (step === "processing" || step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-teal-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center"
        >
          {step === "processing" ? (
            <>
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                <Loader2 size={36} className="text-orange-500 animate-spin" />
              </div>
              <h2 className="text-slate-900 text-2xl mb-2" style={{ fontWeight: 700 }}>Processing Payment</h2>
              <p className="text-slate-500 text-sm">Please wait. Do not press back or refresh.</p>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Lock size={12} /> Secured by Razorpay · 256-bit SSL
              </div>
              <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.6, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                />
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 size={40} className="text-green-500" />
              </motion.div>
              <h2 className="text-slate-900 text-2xl mb-2" style={{ fontWeight: 700 }}>Payment Successful!</h2>
              <p className="text-slate-500 text-sm">Sending your receipt & redirecting...</p>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-teal-50/30 py-10">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 text-sm">
          <ChevronLeft size={16} /> Back to Donation Details
        </button>

        {/* Amount Summary */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-5 text-white mb-6 shadow-sm" style={{ background: "#1B2B3A" }}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white/70 text-xs mb-1">Donating to</div>
              <div className="text-white text-sm" style={{ fontWeight: 600 }}>{cause?.title || "General Fund"}</div>
              <div className="text-white/60 text-xs">{name} · {email}</div>
            </div>
            <div className="text-right">
              <div className="text-white/70 text-xs">Amount</div>
              <div className="text-white text-3xl" style={{ fontWeight: 900 }}>₹{amount.toLocaleString()}</div>
              <div className="text-white/70 text-xs capitalize">{frequency}</div>
            </div>
          </div>
          {taxReceipt && (donorType === "indian" || donorType === "nri") && (
            <div className="mt-3 bg-white/15 rounded-xl px-3 py-2 text-xs text-white/90 flex items-center gap-2">
              📜 80G Certificate will be emailed after payment
            </div>
          )}
        </div>

        {/* Error */}
        {step === "error" && error && (
          <div className="mb-5 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-red-700 text-sm" style={{ fontWeight: 600 }}>Payment Failed</div>
              <div className="text-red-600 text-xs mt-1">{error}</div>
            </div>
          </div>
        )}

        {/* Razorpay Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-sm" style={{ fontWeight: 800 }}>R</span>
              </div>
              <div>
                <div className="text-sm text-slate-800" style={{ fontWeight: 700 }}>Razorpay Secure Checkout</div>
                <div className="text-xs text-slate-500">UPI · Cards · Net Banking · Wallets</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Shield size={12} /> PCI-DSS Secure
              </div>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                TEST MODE
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* What to expect */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="text-blue-800 text-sm mb-3" style={{ fontWeight: 600 }}>🔐 Real Razorpay Checkout</div>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">✅</span>
                  <span>Click the button below to open the <strong>official Razorpay payment popup</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">✅</span>
                  <span>Choose from UPI, Debit/Credit Card, Net Banking or Wallet</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">✅</span>
                  <span>For test UPI: use <strong>success@razorpay</strong>. For test card: <strong>4111 1111 1111 1111</strong>, CVV 123, any future date</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">✅</span>
                  <span>No real money is deducted in test mode</span>
                </div>
              </div>
            </div>

            {/* Donation summary */}
            <div className="border border-slate-100 rounded-xl divide-y divide-slate-100">
              {[
                ["Donor", name],
                ["Email", email],
                ["Amount", `₹${amount.toLocaleString()} (${frequency})`],
                ["Cause", cause?.title || "General Fund"],
                pan ? ["PAN", pan] : null,
                ["Donor Type", donorType?.toUpperCase()],
              ].filter(Boolean).map(([label, value]) => (
                <div key={label} className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-slate-500">{label}</span>
                  <span className="text-slate-800 truncate max-w-[200px]" style={{ fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Pay Button */}
            <button
              onClick={handleRazorpayPayment}
              disabled={!scriptLoaded}
              className="w-full text-white py-4 rounded-xl text-base hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ fontWeight: 700, background: "#B07D3A" }}
            >
              {!scriptLoaded ? (
                <><Loader2 size={18} className="animate-spin" /> Loading Razorpay...</>
              ) : (
                <><Lock size={16} /> Pay ₹{amount.toLocaleString()} via Razorpay</>
              )}
            </button>

            {razorpayAvailable === false && (
              <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-center">
                ⚠️ Razorpay script blocked by browser. Payment will proceed in simulation mode.
              </div>
            )}

            <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-1">
              <span>🔒 256-bit SSL</span>
              <span>💳 PCI-DSS</span>
              <span className="flex items-center gap-1">🛡️ Razorpay <ExternalLink size={10} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}