import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, Loader2, AlertCircle, IndianRupee } from "lucide-react";
import { Donation, CauseFull } from "../lib/api";

interface Props {
  donation: Donation | null;
  causes: CauseFull[];
  onClose: () => void;
  onSave: (id: string, data: Partial<Donation>) => Promise<void>;
}

export function DonationEditModal({ donation, causes, onClose, onSave }: Props) {
  const [form, setForm] = useState<{
    userName: string;
    userEmail: string;
    phone: string;
    pan: string;
    amount: string;
    causeId: string;
    causeName: string;
    status: string;
    donorType: string;
    frequency: string;
    certificate80G: boolean;
    notes: string;
  }>({
    userName: "", userEmail: "", phone: "", pan: "",
    amount: "", causeId: "", causeName: "",
    status: "success", donorType: "indian", frequency: "one-time",
    certificate80G: false, notes: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!donation) return;
    setForm({
      userName: donation.userName || "",
      userEmail: donation.userEmail || "",
      phone: donation.phone || "",
      pan: donation.pan || "",
      amount: String(donation.amount || 0),
      causeId: donation.causeId || "general",
      causeName: donation.causeName || "General Fund",
      status: donation.status || "success",
      donorType: donation.donorType || "indian",
      frequency: donation.frequency || "one-time",
      certificate80G: !!donation.certificate80G,
      notes: (donation as any).notes || "",
    });
    setError("");
  }, [donation]);

  if (!donation) return null;

  const set = (k: keyof typeof form, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleCauseChange = (id: string) => {
    if (id === "general") {
      setForm(f => ({ ...f, causeId: "general", causeName: "General Fund" }));
    } else {
      const c = causes.find(c => c.id === id);
      if (c) setForm(f => ({ ...f, causeId: c.id, causeName: c.title }));
    }
  };

  const handleSave = async () => {
    if (!form.userName.trim()) { setError("Name is required"); return; }
    if (!form.userEmail.trim()) { setError("Email is required"); return; }
    const amt = Number(form.amount);
    if (!amt || amt < 0) { setError("Amount must be positive"); return; }
    setSaving(true); setError("");
    try {
      await onSave(donation.id, {
        userName: form.userName.trim(),
        userEmail: form.userEmail.trim(),
        phone: form.phone.trim(),
        pan: form.pan.trim().toUpperCase(),
        amount: amt,
        causeId: form.causeId,
        causeName: form.causeName,
        status: form.status as Donation["status"],
        donorType: form.donorType as Donation["donorType"],
        frequency: form.frequency as Donation["frequency"],
        certificate80G: form.certificate80G,
        ...(form.notes ? { notes: form.notes } : {}),
      });
      onClose();
    } catch (e: any) {
      setError(e.message || "Save failed");
    }
    setSaving(false);
  };

  const inputCls = "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400";
  const labelCls = "block text-slate-600 text-xs font-semibold mb-1.5";

  const STATUS_COLORS: Record<string, string> = {
    success: "text-green-700 bg-green-50 border-green-200",
    failed: "text-red-700 bg-red-50 border-red-200",
    pending: "text-yellow-700 bg-yellow-50 border-yellow-200",
  };

  return (
    <AnimatePresence>
      {donation && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 flex-shrink-0">
                <div>
                  <div className="text-slate-900 text-base font-bold flex items-center gap-2">
                    <IndianRupee size={16} className="text-orange-500" /> Edit Donation
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5 font-mono">{donation.receiptNo}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${STATUS_COLORS[donation.status] || ""}`}>
                    {donation.status}
                  </span>
                  <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <AlertCircle size={14} /> {error}
                  </div>
                )}

                {/* Donor info */}
                <div>
                  <h4 className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mb-2">Donor Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input value={form.userName} onChange={e => set("userName", e.target.value)} className={inputCls} placeholder="Donor name" />
                    </div>
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input type="email" value={form.userEmail} onChange={e => set("userEmail", e.target.value)} className={inputCls} placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input value={form.phone} onChange={e => set("phone", e.target.value)} className={inputCls} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className={labelCls}>PAN Number</label>
                      <input value={form.pan} onChange={e => set("pan", e.target.value.toUpperCase())} maxLength={10}
                        className={`${inputCls} uppercase tracking-widest font-mono`} placeholder="ABCDE1234F" />
                    </div>
                  </div>
                </div>

                {/* Donation details */}
                <div>
                  <h4 className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mb-2">Donation Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Amount (₹) *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
                        <input type="number" value={form.amount} onChange={e => set("amount", e.target.value)}
                          className={`${inputCls} pl-7`} min={0} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Status</label>
                      <select value={form.status} onChange={e => set("status", e.target.value)} className={inputCls}>
                        <option value="success">✓ Success</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="failed">✗ Failed</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Cause</label>
                      <select value={form.causeId} onChange={e => handleCauseChange(e.target.value)} className={inputCls}>
                        <option value="general">General Fund</option>
                        {causes.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Donor Type</label>
                      <select value={form.donorType} onChange={e => set("donorType", e.target.value)} className={inputCls}>
                        <option value="indian">Indian</option>
                        <option value="nri">NRI</option>
                        <option value="foreign">Foreign</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Frequency</label>
                      <select value={form.frequency} onChange={e => set("frequency", e.target.value)} className={inputCls}>
                        <option value="one-time">One-Time</option>
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                      <div>
                        <div className="text-slate-700 text-xs font-bold">80G Certificate</div>
                        <div className="text-slate-400 text-[10px]">Issued / requested</div>
                      </div>
                      <button
                        onClick={() => set("certificate80G", !form.certificate80G)}
                        className={`relative w-10 h-5 rounded-full transition-all duration-300 ${form.certificate80G ? "bg-green-500" : "bg-slate-300"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${form.certificate80G ? "left-5" : "left-0.5"}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Admin notes */}
                <div>
                  <label className={labelCls}>Admin Notes (internal only)</label>
                  <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
                    rows={2} className={`${inputCls} resize-none`}
                    placeholder="Reason for edit, corrections made, etc..." />
                </div>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 border-t border-slate-200 px-6 py-4 flex gap-3">
                <button onClick={onClose} className="flex-shrink-0 border-2 border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg"
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
