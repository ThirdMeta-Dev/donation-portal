import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Plus, Trash2, Loader2, ImageIcon, AlertCircle, Shield,
  Zap, ChevronDown, ChevronUp, Save
} from "lucide-react";
import { CauseFull } from "../lib/api";

const CATEGORIES = [
  "Education", "Nutrition", "Water & Sanitation", "Healthcare",
  "Environment", "Women Empowerment", "Other"
];

interface CauseUpdate { date: string; title: string; desc: string; }

interface CauseFormData {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  goal: string;
  raised: string;
  donors: string;
  impact: string;
  impactItems: string[];
  tag: string;
  urgent: boolean;
  enable80G: boolean;
  updates: CauseUpdate[];
}

const BLANK: CauseFormData = {
  title: "", category: "Education", description: "", longDescription: "",
  image: "", goal: "1000000", raised: "0", donors: "0",
  impact: "", impactItems: [""], tag: "80G Eligible",
  urgent: false, enable80G: true,
  updates: [],
};

interface Props {
  open: boolean;
  editing: CauseFull | null;
  onClose: () => void;
  onSave: (data: Partial<CauseFull>, id?: string) => Promise<void>;
}

export function CauseFormDrawer({ open, editing, onClose, onSave }: Props) {
  const [form, setForm] = useState<CauseFormData>(BLANK);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showUpdates, setShowUpdates] = useState(false);
  const [imgPreviewOk, setImgPreviewOk] = useState(true);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        title: editing.title || "",
        category: editing.category || "Education",
        description: editing.description || "",
        longDescription: editing.longDescription || "",
        image: editing.image || "",
        goal: String(editing.goal || 1000000),
        raised: String(editing.raised || 0),
        donors: String(editing.donors || 0),
        impact: editing.impact || "",
        impactItems: editing.impactItems?.length ? [...editing.impactItems] : [""],
        tag: editing.tag || "80G Eligible",
        urgent: !!editing.urgent,
        enable80G: editing.enable80G !== false,
        updates: editing.updates?.length ? [...editing.updates] : [],
      });
    } else {
      setForm(BLANK);
    }
    setError("");
    setImgPreviewOk(true);
    setShowUpdates(false);
  }, [open, editing]);

  const set = (k: keyof CauseFormData, v: any) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.description.trim()) return "Short description is required";
    if (!form.image.trim()) return "Image URL is required";
    const g = Number(form.goal);
    if (!g || g < 1000) return "Goal must be at least ₹1,000";
    return null;
  };

  const handleSave = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setSaving(true); setError("");
    try {
      const payload: Partial<CauseFull> = {
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        longDescription: form.longDescription.trim(),
        image: form.image.trim(),
        goal: Number(form.goal),
        raised: Number(form.raised) || 0,
        donors: Number(form.donors) || 0,
        impact: form.impact.trim(),
        impactItems: form.impactItems.filter(i => i.trim()),
        tag: form.tag.trim() || (form.enable80G ? "80G Eligible" : "Donate Now"),
        urgent: form.urgent,
        enable80G: form.enable80G,
        updates: form.updates.filter(u => u.title.trim()),
      };
      await onSave(payload, editing?.id);
      onClose();
    } catch (e: any) {
      setError(e.message || "Save failed");
    }
    setSaving(false);
  };

  const inputCls = "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 bg-white";
  const labelCls = "block text-slate-600 text-xs font-semibold mb-1.5";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40" onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0" style={{ background: "#1B2B3A", borderColor: "rgba(255,255,255,0.1)" }}>
              <div>
                <div className="text-base font-bold" style={{ color: "#F8F5EF" }}>{editing ? "Edit Cause" : "Add New Cause"}</div>
                <div className="text-white/70 text-xs mt-0.5">Fill in all required fields · Changes are saved to database</div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertCircle size={15} className="flex-shrink-0" /> {error}
                </div>
              )}

              {/* ── Basic Info ── */}
              <section>
                <h4 className="text-slate-700 text-xs uppercase tracking-wider font-bold mb-3 pb-2 border-b border-slate-100">
                  Basic Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className={labelCls}>Cause Title *</label>
                    <input value={form.title} onChange={e => set("title", e.target.value)}
                      className={inputCls} placeholder="e.g. Education for Every Child" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Category</label>
                      <select value={form.category} onChange={e => set("category", e.target.value)} className={inputCls}>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Display Tag</label>
                      <input value={form.tag} onChange={e => set("tag", e.target.value)}
                        className={inputCls} placeholder="80G Eligible" />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Short Description * (shown on cards)</label>
                    <textarea value={form.description} onChange={e => set("description", e.target.value)}
                      rows={2} className={`${inputCls} resize-none`}
                      placeholder="One or two sentences summarising the cause..." />
                  </div>

                  <div>
                    <label className={labelCls}>Full Description (shown on detail page)</label>
                    <textarea value={form.longDescription} onChange={e => set("longDescription", e.target.value)}
                      rows={4} className={`${inputCls} resize-none`}
                      placeholder="Detailed description of the cause, impact, and how funds are used..." />
                  </div>
                </div>
              </section>

              {/* ── Image ── */}
              <section>
                <h4 className="text-slate-700 text-xs uppercase tracking-wider font-bold mb-3 pb-2 border-b border-slate-100">
                  Cover Image
                </h4>
                <div>
                  <label className={labelCls}>Image URL *</label>
                  <input value={form.image} onChange={e => { set("image", e.target.value); setImgPreviewOk(true); }}
                    className={inputCls} placeholder="https://images.unsplash.com/..." />
                  <p className="text-xs text-slate-400 mt-1">Use Unsplash or any public image URL (recommended: 800px wide)</p>
                </div>
                {form.image && (
                  <div className="mt-3 rounded-xl overflow-hidden h-32 bg-slate-100 relative">
                    {imgPreviewOk ? (
                      <img src={form.image} alt="Preview" className="w-full h-full object-cover"
                        onError={() => setImgPreviewOk(false)} />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400 gap-2">
                        <ImageIcon size={20} /> <span className="text-xs">Invalid image URL</span>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* ── Goals & Funds ── */}
              <section>
                <h4 className="text-slate-700 text-xs uppercase tracking-wider font-bold mb-3 pb-2 border-b border-slate-100">
                  Funding Details
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>Goal Amount (₹) *</label>
                    <input type="number" value={form.goal} onChange={e => set("goal", e.target.value)}
                      className={inputCls} placeholder="5000000" min={1000} />
                  </div>
                  <div>
                    <label className={labelCls}>Baseline Raised (₹)</label>
                    <input type="number" value={form.raised} onChange={e => set("raised", e.target.value)}
                      className={inputCls} placeholder="0" min={0} />
                    <p className="text-[10px] text-slate-400 mt-1">Historical/offline donations</p>
                  </div>
                  <div>
                    <label className={labelCls}>Baseline Donors</label>
                    <input type="number" value={form.donors} onChange={e => set("donors", e.target.value)}
                      className={inputCls} placeholder="0" min={0} />
                    <p className="text-[10px] text-slate-400 mt-1">Historical donor count</p>
                  </div>
                </div>
              </section>

              {/* ── Impact ── */}
              <section>
                <h4 className="text-slate-700 text-xs uppercase tracking-wider font-bold mb-3 pb-2 border-b border-slate-100">
                  Impact Messaging
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className={labelCls}>Impact Statement</label>
                    <input value={form.impact} onChange={e => set("impact", e.target.value)}
                      className={inputCls} placeholder="₹500 = 1 child's education for a week" />
                  </div>
                  <div>
                    <label className={labelCls}>Impact Bullet Points</label>
                    {form.impactItems.map((item, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input value={item} onChange={e => {
                          const arr = [...form.impactItems]; arr[i] = e.target.value; set("impactItems", arr);
                        }} className={inputCls} placeholder={`Impact point ${i + 1}`} />
                        <button onClick={() => {
                          const arr = form.impactItems.filter((_, idx) => idx !== i);
                          set("impactItems", arr.length ? arr : [""]);
                        }} className="text-red-400 hover:text-red-600 flex-shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => set("impactItems", [...form.impactItems, ""])}
                      className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 mt-1">
                      <Plus size={12} /> Add impact point
                    </button>
                  </div>
                </div>
              </section>

              {/* ── Settings ── */}
              <section>
                <h4 className="text-slate-700 text-xs uppercase tracking-wider font-bold mb-3 pb-2 border-b border-slate-100">
                  Settings & Flags
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Urgent toggle */}
                  <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <div>
                      <div className="text-slate-800 text-xs font-bold flex items-center gap-1">
                        <Zap size={12} className="text-amber-500" /> Urgent
                      </div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Shows urgent badge on card</div>
                    </div>
                    <button
                      onClick={() => set("urgent", !form.urgent)}
                      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${form.urgent ? "bg-amber-500" : "bg-slate-300"}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${form.urgent ? "left-5" : "left-0.5"}`} />
                    </button>
                  </div>

                  {/* 80G toggle */}
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                    <div>
                      <div className="text-slate-800 text-xs font-bold flex items-center gap-1">
                        <Shield size={12} className="text-green-600" /> 80G Certificate
                      </div>
                      <div className="text-slate-500 text-[10px] mt-0.5">Enable 80G tax certificate</div>
                    </div>
                    <button
                      onClick={() => {
                        const newVal = !form.enable80G;
                        set("enable80G", newVal);
                        if (newVal && form.tag === "Donate Now") set("tag", "80G Eligible");
                        if (!newVal && form.tag === "80G Eligible") set("tag", "Donate Now");
                      }}
                      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${form.enable80G ? "bg-green-500" : "bg-slate-300"}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${form.enable80G ? "left-5" : "left-0.5"}`} />
                    </button>
                  </div>
                </div>
              </section>

              {/* ── Updates (collapsible) ── */}
              <section>
                <button
                  onClick={() => setShowUpdates(v => !v)}
                  className="flex items-center justify-between w-full text-slate-700 text-xs uppercase tracking-wider font-bold pb-2 border-b border-slate-100"
                >
                  <span>Cause Updates ({form.updates.length})</span>
                  {showUpdates ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {showUpdates && (
                  <div className="mt-3 space-y-3">
                    {form.updates.map((upd, i) => (
                      <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2 relative">
                        <button onClick={() => set("updates", form.updates.filter((_, idx) => idx !== i))}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                          <Trash2 size={13} />
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <input value={upd.date} onChange={e => {
                            const arr = [...form.updates]; arr[i] = { ...arr[i], date: e.target.value }; set("updates", arr);
                          }} type="date" className={inputCls} />
                          <input value={upd.title} onChange={e => {
                            const arr = [...form.updates]; arr[i] = { ...arr[i], title: e.target.value }; set("updates", arr);
                          }} className={inputCls} placeholder="Update title" />
                        </div>
                        <textarea value={upd.desc} onChange={e => {
                          const arr = [...form.updates]; arr[i] = { ...arr[i], desc: e.target.value }; set("updates", arr);
                        }} rows={2} className={`${inputCls} resize-none`} placeholder="Update description..." />
                      </div>
                    ))}
                    <button
                      onClick={() => set("updates", [...form.updates, { date: new Date().toISOString().split("T")[0], title: "", desc: "" }])}
                      className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1"
                    >
                      <Plus size={12} /> Add update
                    </button>
                  </div>
                )}
              </section>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-slate-200 px-6 py-4 bg-white flex gap-3">
              <button onClick={onClose} className="flex-shrink-0 border-2 border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 text-white py-2.5 rounded-xl text-sm font-bold disabled:opacity-60 flex items-center justify-center gap-2 shadow-md"
                style={{ background: "#B07D3A" }}
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? "Saving..." : editing ? "Save Changes" : "Create Cause"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}