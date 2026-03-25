import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, ChevronRight, ChevronLeft, Shield, Info, CreditCard,
  Check, User, Globe, Building2, Repeat, Zap, AlertCircle
} from "lucide-react";
import { CAUSES, PRESET_AMOUNTS } from "../lib/constants";
import { useAuth } from "../lib/AuthContext";
import { causeApi } from "../lib/api";

type Step = 1 | 2 | 3;
type Frequency = "one-time" | "monthly" | "annually";
type DonorType = "indian" | "nri" | "foreign";

export function DonatePage() {
  const [searchParams] = useSearchParams();
  const preselectedCause = searchParams.get("cause") || "";
  const preselectedType = (searchParams.get("type") || "indian") as DonorType;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState<Step>(1);
  const [selectedCause, setSelectedCause] = useState(preselectedCause);
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [donorType, setDonorType] = useState<DonorType>(preselectedType);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [pan, setPan] = useState(user?.pan || "");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState(donorType === "indian" ? "India" : "");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [taxReceipt, setTaxReceipt] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [causeSettings, setCauseSettings] = useState<Record<string, { enable80G: boolean }>>({});

  useEffect(() => {
    causeApi.getSettings().then(r => setCauseSettings(r.settings || {})).catch(() => {});
  }, []);

  const cause = CAUSES.find(c => c.id === selectedCause);
  // Check if the currently selected cause has 80G enabled (default true if no setting)
  const selectedCause80G = selectedCause
    ? (causeSettings[selectedCause]?.enable80G ?? true)
    : true; // General fund defaults to true
  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const getImpact = () => {
    if (finalAmount <= 150) return "Feeds 1 child for a week 🍽️";
    if (finalAmount <= 500) return "1 child's education for a week 📚";
    if (finalAmount <= 1000) return "Medical care for 3 people 💊";
    if (finalAmount <= 2500) return "Clean water for 1 family for a year 💧";
    if (finalAmount <= 5000) return "Skill training for 1 woman 👩‍💼";
    return "Educate 1 child for a full year 🌟";
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email required";
    if (!phone.trim()) errs.phone = "Phone number is required";
    if (donorType === "indian" && taxReceipt && pan.length > 0 && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase())) {
      errs.pan = "Invalid PAN format (e.g. ABCDE1234F)";
    }
    if (donorType !== "indian" && !country) errs.country = "Country is required";
    if (!finalAmount || finalAmount < 100) errs.amount = "Minimum donation is ₹100";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const proceedToPayment = () => {
    if (!validate()) return;
    navigate("/payment", {
      state: {
        cause,
        amount: finalAmount,
        frequency,
        donorType,
        name,
        email,
        phone,
        pan: pan.toUpperCase(),
        address,
        country,
        isAnonymous,
        taxReceipt: selectedCause80G && taxReceipt, // only true if cause supports 80G AND donor opted in
        cause80GEnabled: selectedCause80G,
      }
    });
  };

  const DONOR_TYPE_INFO: Record<DonorType, { title: string; desc: string; icon: React.ReactNode; color: string; note: string }> = {
    indian: {
      title: "Indian Citizen / Resident",
      desc: "Donate via UPI, cards, net banking. Claim 80G tax deduction.",
      icon: <User size={16} />,
      color: "border-orange-400 bg-orange-50",
      note: "PAN is optional but required to claim 80G deduction on your ITR.",
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CAUSES.map(c => (
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
                      <span className="text-sm" style={{ color: "#1C1C1A", fontWeight: !selectedCause ? 600 : 400 }}>Where needed most (General Fund)</span>
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
                      onChange={e => { setCustomAmount(e.target.value); setAmount(0); }}
                      className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-400 focus:outline-none text-slate-900 bg-white"
                    />
                  </div>
                  {errors.amount && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.amount}</p>}
                  {finalAmount > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700" style={{ fontWeight: 500 }}>
                      💚 Your {finalAmount >= 1000 ? `₹${(finalAmount/1000).toFixed(1)}K` : `₹${finalAmount}`} {frequency !== "one-time" ? frequency : ""} donation will: {getImpact()}
                    </div>
                  )}
                  {donorType === "indian" && finalAmount > 0 && selectedCause80G && (
                    <div className="mt-2 p-2 bg-blue-50 rounded-lg text-xs text-blue-600 flex items-center gap-1.5">
                      <Shield size={12} /> 80G benefit: You save approx. ₹{Math.floor(finalAmount * 0.5 * 0.3).toLocaleString()} in income tax (at 30% bracket)
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(Object.entries(DONOR_TYPE_INFO) as [DonorType, typeof DONOR_TYPE_INFO[DonorType]][]).map(([type, info]) => (
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
                  onClick={() => { if (!finalAmount || finalAmount < 100) { setErrors({ amount: "Minimum donation is ₹100" }); return; } setStep(2); }}
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
                    <input value={phone} onChange={e => setPhone(e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${errors.phone ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-orange-400"}`}
                      placeholder="+91 9876543210" />
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
                    PAN Card Number {donorType === "indian" ? "(for 80G tax deduction)" : "(optional for Indians)"}
                  </label>
                  <input value={pan} onChange={e => setPan(e.target.value.toUpperCase())}
                    maxLength={10}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none uppercase tracking-widest font-mono ${errors.pan ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-orange-400"}`}
                    placeholder="ABCDE1234F" />
                  {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan}</p>}
                  <p className="text-xs text-slate-400 mt-1 flex items-start gap-1">
                    <Shield size={11} className="mt-0.5" /> PAN is encrypted with AES-256 and used only for Form 10BE / 80G certificate issuance.
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
                      <span className="text-sm text-slate-700">Send me 80G tax certificate via email</span>
                    </label>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                      <Info size={13} className="flex-shrink-0" />
                      <span>This cause does not provide 80G certificates. A payment confirmation receipt will be emailed to you instead.</span>
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
                  <div className="mt-3 text-sm bg-white/20 rounded-xl px-3 py-2">💚 Impact: {getImpact()}</div>
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
                      label: "80G Certificate",
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

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors" style={{ fontWeight: 500 }}>
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button onClick={proceedToPayment}
                   className="btn-gold flex-1 text-white py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                   style={{ fontWeight: 700, background: "#B07D3A" }}>
                    <CreditCard size={18} /> Pay ₹{finalAmount.toLocaleString()} Securely
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