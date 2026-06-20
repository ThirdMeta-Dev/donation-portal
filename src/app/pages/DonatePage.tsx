import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, ChevronRight, ChevronLeft, Shield, Info, CreditCard,
  Check, User, Globe, Building2, Repeat, Zap, AlertCircle, Loader2
} from "lucide-react";
import { PRESET_AMOUNTS } from "../lib/constants";
import { useAuth } from "../lib/AuthContext";
import { causeApi, donationApi } from "../lib/api";
import type { CauseFull } from "../lib/api";
import { useCmsPage } from "../hooks/useCmsPage";
import { generateReceiptNo, generatePaymentId } from "../lib/donationStore";
import { supabase } from "../lib/supabase";
import { projectId, publicAnonKey } from "/utils/supabase/info";

declare global { interface Window { Razorpay: any; } }

function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

type Step = 1 | 2 | 3;
type Frequency = "one-time" | "monthly" | "annually";
type DonorType = "indian" | "nri" | "foreign";

export function DonatePage() {
  const [searchParams] = useSearchParams();
  const preselectedCause = searchParams.get("cause") || "";
  const preselectedType = (searchParams.get("type") || "indian") as DonorType;
  const navigate = useNavigate();
  const { user } = useAuth();

  const { getSection } = useCmsPage("donate");
  const presetData = getSection("PresetAmountsSection");
  const impactData = getSection("ImpactMessagesSection");

  const [causes, setCauses] = useState<CauseFull[]>([]);
  const [causesLoading, setCausesLoading] = useState(true);

  const [step, setStep] = useState<Step>(1);
  const [selectedCause, setSelectedCause] = useState(preselectedCause);
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [donorType, setDonorType] = useState<DonorType>(preselectedType);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState((user?.phone || "").replace(/^\+91/, "").trim());
  const [pan, setPan] = useState(user?.pan || "");
  const [idType, setIdType] = useState<"pan" | "aadhaar">("pan");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState(donorType === "indian" ? "India" : "");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [taxReceipt, setTaxReceipt] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payProcessing, setPayProcessing] = useState(false);
  const [payError, setPayError] = useState("");
  const [causeSettings, setCauseSettings] = useState<Record<string, { enable80G: boolean }>>({});

  useEffect(() => {
    Promise.allSettled([
      causeApi.getCauses(),
      causeApi.getSettings(),
    ]).then(([causesRes, settingsRes]) => {
      if (causesRes.status === "fulfilled") setCauses(causesRes.value.causes || []);
      if (settingsRes.status === "fulfilled") setCauseSettings(settingsRes.value.settings || {});
    }).finally(() => setCausesLoading(false));
  }, []);

  const cause = causes.find(c => c.id === selectedCause);
  // Check if the currently selected cause has 80G enabled (default true if no setting)
  const selectedCause80G = selectedCause
    ? (causeSettings[selectedCause]?.enable80G ?? true)
    : true; // General fund defaults to true
  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const IMPACT_MAP: Record<number, { green: string; blue: string }> = {
    150:   { green: "Your ₹150 can place learning tools in one child's hands this term.", blue: "If eligible under 133(1)(b), your donation may also bring a tax benefit." },
    500:   { green: "Your ₹500 can give one child a meaningful Beyond Syllabus learning experience.", blue: "If eligible under 133(1)(b), you may save approx. ₹75 in tax." },
    1000:  { green: "Your ₹1,000 can equip a teacher to create better learning for many children.", blue: "If eligible under 133(1)(b), you may save approx. ₹150 in tax." },
    2500:  { green: "Your ₹2,500 can strengthen one classroom with practical tools that make learning come alive.", blue: "If eligible under 133(1)(b), you may save approx. ₹375 in tax." },
    5000:  { green: "Your ₹5,000 can help build richer reading and learning access for children in one school.", blue: "If eligible under 133(1)(b), you may save approx. ₹750 in tax." },
    10000: { green: "Your ₹10,000 can provide meaningful learning support for an entire class.", blue: "If eligible under 133(1)(b), you may save approx. ₹1,500 in tax." },
    25000: { green: "Your ₹25,000 can help transform a school's learning environment with dignity, resources, and hope.", blue: "If eligible under 133(1)(b), you may save approx. ₹3,750 in tax." },
  };
  const DEFAULT_IMPACT = {
    green: "Your support will go where learning is needed most, for a child, a classroom, or a school.",
    blue: "If eligible under 133(1)(b), your donation may also bring a tax benefit.",
  };
  const getImpact = () => (IMPACT_MAP[finalAmount] || DEFAULT_IMPACT).green;
  const getImpactObj = () => IMPACT_MAP[finalAmount] || DEFAULT_IMPACT;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email required";
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim())) errs.phone = "Enter a valid 10-digit mobile number";
    if (!pan.trim()) {
      errs.pan = idType === "pan" ? "PAN card number is required" : "Aadhaar number is required";
    } else if (idType === "pan" && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase())) {
      errs.pan = "Invalid PAN format (e.g. ABCDE1234F)";
    } else if (idType === "aadhaar" && !/^\d{12}$/.test(pan)) {
      errs.pan = "Aadhaar must be exactly 12 digits";
    }
    if (donorType !== "indian" && !country) errs.country = "Country is required";
    if (!finalAmount || finalAmount <= 0) errs.amount = "Please enter a donation amount";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const saveAndRedirect = async (paymentId: string, orderId?: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const currentUserId = session?.user?.id || user?.id || "guest";
    const currentEmail  = session?.user?.email || user?.email || email;
    const donation = {
      id: `don-${Date.now()}`,
      userId:   currentUserId,
      userName: isAnonymous ? "Anonymous" : name,
      userEmail: currentEmail,
      causeId:  cause?.id   || "general",
      causeName: cause?.title || "General Fund",
      amount: finalAmount,
      currency: "INR" as const,
      frequency,
      donorType,
      pan: pan.toUpperCase(),
      phone: phone || "",
      address: address || "",
      country: country || (donorType === "indian" ? "India" : ""),
      paymentId,
      razorpayOrderId: orderId || null,
      status: "success" as const,
      certificate80G: selectedCause80G && taxReceipt && (donorType === "indian" || donorType === "nri"),
      createdAt: new Date().toISOString(),
      receiptNo: generateReceiptNo(),
      paymentMode: "Online" as const,
      impactDescription: getImpact(),
    };
    try {
      const result = await donationApi.save(donation);
      navigate("/thank-you", { state: (result as any).donation || donation });
    } catch {
      navigate("/thank-you", { state: donation });
    }
  };

  const proceedToPayment = async () => {
    if (!validate()) return;
    setPayError("");
    setPayProcessing(true);
    await loadRazorpayScript();
    try {
      const receiptNo = generateReceiptNo();
      const orderRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a0af4170/razorpay/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${publicAnonKey}` },
          body: JSON.stringify({ amount: finalAmount, currency: "INR", receipt: receiptNo }),
        }
      );
      const orderData = await orderRes.json();
      if (orderData.error) { setPayError(orderData.error); setPayProcessing(false); return; }

      if (orderData.orderId?.startsWith("order_MOCK") || !window.Razorpay) {
        await new Promise(r => setTimeout(r, 800));
        await saveAndRedirect(generatePaymentId(), orderData.orderId);
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "SHIKSHARAJ, UJJWAL BHARAT FOUNDATION",
        description: `Donation - ${cause?.title || "General Fund"}`,
        image: `${window.location.origin}/favicon.png`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          setPayProcessing(true);
          try {
            await fetch(
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
          } catch (_) {}
          await saveAndRedirect(response.razorpay_payment_id, response.razorpay_order_id);
        },
        prefill: { name: name || "", email: email || "", contact: phone || "" },
        notes: { cause: cause?.title || "General Fund", pan: pan || "", donorType, frequency },
        theme: { color: "#bf791d" },
        modal: { ondismiss: () => setPayProcessing(false) },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        setPayError(response.error?.description || "Payment failed. Please try again.");
        setPayProcessing(false);
      });
      setPayProcessing(false);
      rzp.open();
    } catch (e: any) {
      setPayError(e.message || "Something went wrong. Please try again.");
      setPayProcessing(false);
    }
  };

  const DONOR_TYPE_INFO: Record<DonorType, { title: string; desc: string; icon: React.ReactNode; color: string; note: string }> = {
    indian: {
      title: "Indian Citizen / Resident",
      desc: "Donate via UPI, cards, net banking. Eligible for income tax deduction.",
      icon: <User size={16} />,
      color: "border-orange-400 bg-orange-50",
      note: "PAN is optional for donating, but required to claim deduction under Section 133(1)(b) of the Income Tax Act, 2025.",
    },
    nri: {
      title: "NRI (Non-Resident Indian)",
      desc: "Donate from NRE/NRO account or international card. FCRA compliant.",
      icon: <Globe size={16} />,
      color: "border-blue-400 bg-blue-50",
      note: "Your donation routes through our FCRA-registered account. 80G available.",
    },
    foreign: {
      title: "Foreign National / Organisation",
      desc: "International donations via Razorpay. FCRA bank account used.",
      icon: <Building2 size={16} />,
      color: "border-teal-400 bg-teal-50",
      note: "By Indian law (FCRA), all foreign donations must route through SBI FCRA Cell, New Delhi.",
    },
  };

  return (
    <div className="min-h-screen py-10" style={{ background: "#F8F5EF" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 gap-2">
          {([1, 2, 3] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all`}
                style={{ fontWeight: 700, background: step > s ? "#4A6741" : step === s ? "#1B2B3A" : "#EAE6DF", color: step > s ? "white" : step === s ? "white" : "#6B6B60" }}>
                {step > s ? <Check size={14} /> : s}
              </div>
              <span className={`text-xs hidden sm:block`} style={{ fontWeight: 500, color: step === s ? "#1B2B3A" : "#6B6B60" }}>
                {["Choose Cause & Amount", "Donor Details", "Review & Pay"][i]}
              </span>
              {i < 2 && <div className="h-px w-8" style={{ background: step > s ? "#4A6741" : "#E5E0D8" }} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8 space-y-6" style={{ borderColor: "#E5E0D8" }}>
                {/* Cause */}
                <div>
                  <label className="block text-slate-700 text-sm mb-3" style={{ fontWeight: 600 }}>Select a Cause</label>
                  {causesLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-11 rounded-xl border-2 border-slate-100 bg-slate-50 animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {causes.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCause(c.id)}
                          className="text-left p-3 rounded-xl border-2 transition-all"
                          style={{ borderColor: selectedCause === c.id ? "#1B2B3A" : "#E5E0D8", background: selectedCause === c.id ? "#F0F4F7" : "transparent" }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                              style={{ borderColor: selectedCause === c.id ? "#1B2B3A" : "#C4BDB3", background: selectedCause === c.id ? "#1B2B3A" : "transparent" }}>
                              {selectedCause === c.id && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="text-sm line-clamp-1" style={{ color: "#1C1C1A", fontWeight: selectedCause === c.id ? 600 : 400 }}>{c.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedCause("")}
                    className="mt-2 w-full text-left p-3 rounded-xl border-2 transition-all"
                    style={{ borderColor: !selectedCause ? "#1B2B3A" : "#E5E0D8", background: !selectedCause ? "#F0F4F7" : "transparent" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: !selectedCause ? "#1B2B3A" : "#C4BDB3", background: !selectedCause ? "#1B2B3A" : "transparent" }}>
                        {!selectedCause && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="text-sm" style={{ color: "#1C1C1A", fontWeight: !selectedCause ? 600 : 400 }}>Where needed most (Maximum Impact)</span>
                    </div>
                  </button>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-slate-700 text-sm mb-3" style={{ fontWeight: 600 }}>Donation Frequency</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["one-time", "monthly", "annually"] as Frequency[]).map(f => (
                      <button
                        key={f}
                        onClick={() => setFrequency(f)}
                        className="py-3 rounded-xl border-2 text-sm transition-all flex flex-col items-center gap-1"
                        style={{ borderColor: frequency === f ? "#1B2B3A" : "#E5E0D8", background: frequency === f ? "#F0F4F7" : "transparent", color: frequency === f ? "#1B2B3A" : "#6B6B60", fontWeight: frequency === f ? 600 : 400 }}
                      >
                        {f === "monthly" && <Repeat size={14} style={{ color: "#B07D3A" }} />}
                        {f === "annually" && <Zap size={14} style={{ color: "#B07D3A" }} />}
                        {f === "one-time" && <Heart size={14} style={{ color: frequency === f ? "#B07D3A" : "#C4BDB3" }} />}
                        {f === "one-time" ? "One-Time" : f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                  {frequency === "monthly" && (
                    <div className="mt-2 p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-700 flex items-start gap-2">
                      <Info size={13} className="mt-0.5 flex-shrink-0" />
                      Monthly donations provide a reliable income stream for our programs. Cancel anytime from your dashboard.
                    </div>
                  )}
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-slate-700 text-sm mb-3" style={{ fontWeight: 600 }}>
                    Donation Amount {frequency === "monthly" && <span style={{ color: "#B07D3A" }}>/month</span>}
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {PRESET_AMOUNTS.map(p => (
                      <button
                        key={p.amount}
                        onClick={() => { setAmount(p.amount); setCustomAmount(""); }}
                        className={`py-3 px-2 rounded-xl border-2 transition-all ${amount === p.amount && !customAmount ? "border-orange-500 bg-orange-50" : "border-slate-200 hover:border-orange-300"}`}
                      >
                        <div className="text-slate-900 text-sm" style={{ fontWeight: 700 }}>{p.label}</div>
                        <div className="text-slate-400 text-xs leading-snug mt-0.5 line-clamp-2">{p.impact}</div>
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" style={{ fontWeight: 600 }}>₹</span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      min="1"
                      onWheel={e => (e.target as HTMLInputElement).blur()}
                      onChange={e => {
                        const v = e.target.value;
                        if (v === "" || parseFloat(v) > 0) { setCustomAmount(v); setAmount(0); }
                      }}
                      className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:outline-none text-slate-900 bg-white"
                    />
                  </div>
                  {errors.amount && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.amount}</p>}
                  {finalAmount > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700" style={{ fontWeight: 500 }}>
                      💚 {getImpactObj().green}
                    </div>
                  )}
                  {donorType === "indian" && finalAmount > 0 && selectedCause80G && (
                    <div className="mt-2 p-2 bg-blue-50 rounded-lg text-xs text-blue-600 flex items-center gap-1.5">
                      <Shield size={12} /> 🛡️ {getImpactObj().blue}
                    </div>
                  )}
                  {finalAmount > 0 && !selectedCause80G && (
                    <div className="mt-2 p-2 bg-amber-50 rounded-lg text-xs text-amber-700 flex items-center gap-1.5">
                      <Info size={12} /> This cause does not issue 80G tax exemption certificates
                    </div>
                  )}
                </div>

                {/* Donor Type */}
                <div>
                  <label className="block text-slate-700 text-sm mb-3" style={{ fontWeight: 600 }}>Donor Type</label>
                  <div className="grid grid-cols-1 gap-3">
                    {(Object.entries(DONOR_TYPE_INFO) as [DonorType, typeof DONOR_TYPE_INFO[DonorType]][]).filter(([type]) => type === "indian").map(([type, info]) => (
                      <button
                        key={type}
                        onClick={() => setDonorType(type)}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${donorType === type ? info.color : "border-slate-200 hover:border-slate-300"}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={donorType === type ? "text-orange-600" : "text-slate-500"}>{info.icon}</span>
                          <span className="text-sm text-slate-800" style={{ fontWeight: 600 }}>{info.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-snug">{info.desc}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 flex items-start gap-1.5">
                    <Info size={12} className="mt-0.5 flex-shrink-0" />
                    {DONOR_TYPE_INFO[donorType].note}
                  </div>
                </div>

                <button
                  onClick={() => { if (!finalAmount || finalAmount <= 0) { setErrors({ amount: "Please enter a donation amount" }); return; } setStep(2); }}
                   className="btn-navy w-full text-white py-4 rounded-xl text-base transition-all shadow-sm flex items-center justify-center gap-2"
                   style={{ fontWeight: 700, background: "#1B2B3A" }}
                >
                  Continue to Donor Details <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <User size={18} style={{ color: "#1B2B3A" }} />
                  <h2 className="text-slate-900 text-lg" style={{ fontWeight: 700 }}>Your Details</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Full Name *</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${errors.name ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-orange-400"}`}
                      placeholder="As on PAN card" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Email Address *</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${errors.email ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-orange-400"}`}
                      placeholder="Receipt will be sent here" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Phone Number *</label>
                    <div className="flex">
                      <span className={`flex items-center px-3 border-2 border-r-0 rounded-l-xl text-sm text-slate-600 bg-slate-50 ${errors.phone ? "border-red-300" : "border-slate-200"}`} style={{ fontWeight: 500 }}>+91</span>
                      <input value={phone}
                        onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 10); setPhone(v); }}
                        className={`flex-1 px-4 py-3 border-2 rounded-r-xl focus:outline-none ${errors.phone ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-orange-400"}`}
                        placeholder="9876543210" maxLength={10} inputMode="numeric" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  {donorType !== "indian" && (
                    <div>
                      <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Country *</label>
                      <input value={country} onChange={e => setCountry(e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${errors.country ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-orange-400"}`}
                        placeholder="Your country" />
                      {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>
                    PAN / Aadhaar Number *
                  </label>
                  <div className="flex gap-2 mb-2">
                    <button type="button"
                      onClick={() => { setIdType("pan"); setPan(""); }}
                      className={`flex-1 py-2 rounded-xl border-2 text-sm transition-all ${idType === "pan" ? "border-orange-500 bg-orange-50 text-orange-700 font-semibold" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                      PAN Card
                    </button>
                    <button type="button"
                      onClick={() => { setIdType("aadhaar"); setPan(""); }}
                      className={`flex-1 py-2 rounded-xl border-2 text-sm transition-all ${idType === "aadhaar" ? "border-orange-500 bg-orange-50 text-orange-700 font-semibold" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                      Aadhaar Number
                    </button>
                  </div>
                  <input
                    value={pan}
                    onChange={e => {
                      if (idType === "pan") setPan(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10));
                      else setPan(e.target.value.replace(/\D/g, "").slice(0, 12));
                    }}
                    maxLength={idType === "pan" ? 10 : 12}
                    inputMode={idType === "aadhaar" ? "numeric" : "text"}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none tracking-widest font-mono ${idType === "pan" ? "uppercase" : ""} ${errors.pan ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-orange-400"}`}
                    placeholder={idType === "pan" ? "ABCDE1234F" : "9xxx-5xxxx-9xxx"}
                  />
                  {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan}</p>}
                  <p className="text-xs text-slate-400 mt-1 flex items-start gap-1">
                    <Shield size={11} className="mt-0.5" /> {idType === "pan" ? "PAN is recommended for income tax deduction benefit under Section 80G." : "Aadhaar is accepted. PAN is recommended for 80G tax benefit."}
                  </p>
                </div>

                <div>
                  <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Address (for certificate)</label>
                  <textarea value={address} onChange={e => setAddress(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:outline-none resize-none"
                    placeholder="Your full address" />
                </div>

                <div className="space-y-3 pt-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div onClick={() => setIsAnonymous(!isAnonymous)}
                     className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                     style={{ background: isAnonymous ? "#1B2B3A" : "transparent", borderColor: isAnonymous ? "#1B2B3A" : "#C4BDB3" }}>
                      {isAnonymous && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-sm text-slate-700">Donate anonymously (name won't appear publicly)</span>
                  </label>
                  {selectedCause80G ? (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div onClick={() => setTaxReceipt(!taxReceipt)}
                       className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                       style={{ background: taxReceipt ? "#1B2B3A" : "transparent", borderColor: taxReceipt ? "#1B2B3A" : "#C4BDB3" }}>
                        {taxReceipt && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-slate-700">Send me Income Tax Deduction Certificate via email</span>
                    </label>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                      <Info size={13} className="flex-shrink-0" />
                      <span>This cause does not provide Income Tax Deduction Certificates. A payment confirmation receipt will be emailed to you instead.</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors" style={{ fontWeight: 500 }}>
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button onClick={() => { if (validate()) setStep(3); }}
                   className="btn-navy flex-1 text-white py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                   style={{ fontWeight: 700, background: "#1B2B3A" }}>
                    Review & Pay <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 - Review */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={18} style={{ color: "#1B2B3A" }} />
                  <h2 className="text-slate-900 text-lg" style={{ fontWeight: 700 }}>Review Your Donation</h2>
                </div>

                {/* Summary card */}
                <div className="rounded-2xl p-6 text-white" style={{ background: "#1B2B3A" }}>
                  <div className="text-white/70 text-sm mb-1">Total Donation {frequency !== "one-time" && `(${frequency})`}</div>
                  <div className="text-4xl mb-1" style={{ fontWeight: 800 }}>₹{finalAmount.toLocaleString()}</div>
                  <div className="text-white/80 text-sm">{cause ? cause.title : "General Fund"} · {donorType.toUpperCase()} donor</div>
                  <div className="mt-3 text-sm bg-white/20 rounded-xl px-3 py-2">💚 {getImpactObj().green}</div>
                </div>

                <div className="space-y-2">
                  {[
                    { label: "Donor Name", value: isAnonymous ? "Anonymous" : name },
                    { label: "Email", value: email },
                    { label: "Phone", value: phone },
                    { label: "PAN", value: pan || "Not provided" },
                    { label: "Cause", value: cause ? cause.title : "General Fund" },
                    { label: "Frequency", value: frequency },
                    {
                      label: "Income Tax Deduction Certificate",
                      value: !selectedCause80G
                        ? "Not available for this cause"
                        : taxReceipt
                        ? "Will be emailed"
                        : "Not requested"
                    },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
                      <span className="text-slate-500">{row.label}</span>
                      <span className="text-slate-800" style={{ fontWeight: 500 }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* FCRA notice for non-Indian */}
                {donorType !== "indian" && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 flex items-start gap-2">
                    <Info size={15} className="mt-0.5 flex-shrink-0 text-blue-600" />
                    <div>
                      <div style={{ fontWeight: 600 }}>FCRA Compliance Notice</div>
                      <div className="text-blue-700 text-xs mt-1">As per Indian law (FCRA 2010), your international donation will be received in our designated FCRA bank account at SBI, New Delhi Main Branch. This is mandatory for all foreign contributions to Indian NGOs.</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                  <Shield size={14} className="text-green-500 flex-shrink-0" />
                  Payment secured by Razorpay · 256-bit SSL · PCI-DSS Compliant · Your data is encrypted
                </div>

                {payError && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    <AlertCircle size={15} className="mt-0.5 flex-shrink-0" /> {payError}
                  </div>
                )}
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} disabled={payProcessing} className="flex items-center gap-2 border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50" style={{ fontWeight: 500 }}>
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button onClick={proceedToPayment} disabled={payProcessing}
                   className="btn-gold flex-1 text-white py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
                   style={{ fontWeight: 700, background: "#B07D3A" }}>
                    {payProcessing
                      ? <><Loader2 size={18} className="animate-spin" /> Processing...</>
                      : <><CreditCard size={18} /> Pay ₹{finalAmount.toLocaleString()} Securely</>}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}