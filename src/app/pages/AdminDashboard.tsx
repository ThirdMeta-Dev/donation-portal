import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3, Users, IndianRupee, Heart, Search, TrendingUp, CheckCircle2,
  Shield, RefreshCw, Loader2, BookOpen, Plus, Trash2, Edit, X,
  GraduationCap, ChevronDown, ChevronUp, Video, FileText, Calendar, Eye,
  UserCheck, UserX, Mail, ToggleLeft, ToggleRight, AlertCircle
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { donationApi, lmsApi, adminApi, causeApi, Donation, Course, AppUserRecord, CauseFull } from "../lib/api";
import { DonationReceiptModal } from "../components/DonationReceiptModal";
import { CauseFormDrawer } from "../components/CauseFormDrawer";
import { DonationEditModal } from "../components/DonationEditModal";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid } from "recharts";

const COLORS = ["#4338CA", "#D97706", "#059669", "#7C3AED", "#E11D48", "#0891B2"];

interface LessonForm {
  title: string;
  type: "video" | "live" | "reading";
  duration: string;
  videoUrl?: string;
  content?: string;
  jitsiRoom?: string;
  thumbnail?: string;
}
interface QuizQuestionForm { question: string; options: [string, string, string, string]; correctIndex: number; explanation: string; }
interface CourseForm {
  title: string; description: string; longDescription: string;
  instructor: string; instructorBio: string; thumbnail: string;
  category: string; level: "beginner" | "intermediate" | "advanced";
  durationHours: number; language: string; certificate: boolean;
  tags: string; lessons: LessonForm[]; questions: QuizQuestionForm[];
}

const BLANK_FORM: CourseForm = {
  title: "", description: "", longDescription: "",
  instructor: "", instructorBio: "", thumbnail: "",
  category: "Technology", level: "beginner",
  durationHours: 4, language: "Hindi / English",
  certificate: true, tags: "",
  lessons: [{ title: "", type: "video", duration: "20 min" }],
  questions: [{ question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" }],
};

export function AdminDashboard() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "donations" | "users" | "causes" | "courses">("overview");
  const [appUsers, setAppUsers] = useState<AppUserRecord[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [togglingUser, setTogglingUser] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<Record<string, "idle" | "sending" | "success" | "error">>({});
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Cause settings (80G per cause)
  const [causeSettings, setCauseSettings] = useState<Record<string, { enable80G: boolean }>>({});
  const [toggling80G, setToggling80G] = useState<string | null>(null);

  // Causes CRUD
  const [causes, setCauses] = useState<CauseFull[]>([]);
  const [causesLoading, setCausesLoading] = useState(false);
  const [showCauseForm, setShowCauseForm] = useState(false);
  const [editingCauseFull, setEditingCauseFull] = useState<CauseFull | null>(null);

  // Donation editing
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);

  // Course form
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form, setForm] = useState<CourseForm>(BLANK_FORM);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/auth", { replace: true }); return; }
    if (user.role !== "admin") { navigate("/dashboard", { replace: true }); return; }
    loadAll();
  }, [user, authLoading, location.key]);

  async function loadAll() {
    setLoading(true); setError("");
    try {
      const [donRes, crsRes, settingsRes, causesRes] = await Promise.allSettled([
        donationApi.getAll(),
        lmsApi.getCourses(),
        causeApi.getSettings(),
        causeApi.getCauses(),
      ]);
      if (donRes.status === "fulfilled") setDonations(
        (donRes.value.donations || []).sort((a: Donation, b: Donation) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
      if (crsRes.status === "fulfilled") setCourses(crsRes.value.courses || []);
      if (settingsRes.status === "fulfilled") setCauseSettings(settingsRes.value.settings || {});
      if (causesRes.status === "fulfilled") setCauses(causesRes.value.causes || []);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }

  async function loadCauses() {
    setCausesLoading(true);
    try {
      const res = await causeApi.getCauses();
      setCauses(res.causes || []);
    } catch (e: any) { console.error("Load causes:", e); }
    setCausesLoading(false);
  }

  async function loadUsers() {
    setUsersLoading(true); setUsersError("");
    try {
      const res = await adminApi.getUsers();
      setAppUsers(res.users || []);
    } catch (e: any) {
      console.error("Load users error:", e);
      setUsersError(e.message || "Failed to load users.");
    }
    setUsersLoading(false);
  }

  async function toggleUserActive(userId: string, currentActive: boolean) {
    setTogglingUser(userId);
    try {
      await adminApi.toggleUser(userId, !currentActive);
      setAppUsers(prev => prev.map(u => u.id === userId ? { ...u, active: !currentActive } : u));
    } catch (e: any) { console.error("Toggle user error:", e); }
    setTogglingUser(null);
  }

  async function handleToggle80G(causeId: string, currentVal: boolean) {
    setToggling80G(causeId);
    try {
      const newVal = !currentVal;
      await causeApi.toggle80G(causeId, newVal);
      setCauseSettings(prev => ({ ...prev, [causeId]: { enable80G: newVal } }));
      setCauses(prev => prev.map(c => c.id === causeId ? { ...c, enable80G: newVal } : c));
    } catch (e: any) { alert("Failed to toggle 80G: " + e.message); }
    setToggling80G(null);
  }

  async function handleSaveCause(data: Partial<CauseFull>, id?: string) {
    if (id) {
      const res = await causeApi.updateCause(id, data);
      setCauses(prev => prev.map(c => c.id === id ? res.cause : c));
      if (typeof data.enable80G === "boolean") {
        setCauseSettings(prev => ({ ...prev, [id]: { enable80G: data.enable80G as boolean } }));
      }
    } else {
      const res = await causeApi.createCause(data);
      setCauses(prev => [...prev, res.cause]);
      if (typeof data.enable80G === "boolean") {
        setCauseSettings(prev => ({ ...prev, [res.cause.id]: { enable80G: data.enable80G as boolean } }));
      }
    }
  }

  async function handleDeleteCause(id: string) {
    if (!confirm("Delete this cause permanently? Existing donations referencing it will still be kept.")) return;
    await causeApi.deleteCause(id);
    setCauses(prev => prev.filter(c => c.id !== id));
  }

  async function handleSaveDonation(id: string, data: Partial<Donation>) {
    const res = await donationApi.updateDonation(id, data);
    setDonations(prev => prev.map(d => d.id === id ? res.donation : d));
  }

  async function handleResendEmail(donationId: string) {
    setResendStatus(prev => ({ ...prev, [donationId]: "sending" }));
    try {
      await donationApi.resendEmail(donationId);
      setResendStatus(prev => ({ ...prev, [donationId]: "success" }));
      setTimeout(() => setResendStatus(prev => ({ ...prev, [donationId]: "idle" })), 3000);
    } catch {
      setResendStatus(prev => ({ ...prev, [donationId]: "error" }));
      setTimeout(() => setResendStatus(prev => ({ ...prev, [donationId]: "idle" })), 3000);
    }
  }

  function openCreateForm() {
    setForm(BLANK_FORM); setEditingCourse(null); setFormError(""); setShowCourseForm(true); setExpandedQuestion(0);
  }
  function openEditForm(course: Course) {
    setEditingCourse(course);
    setForm({
      title: course.title, description: course.description, longDescription: course.longDescription,
      instructor: course.instructor, instructorBio: course.instructorBio, thumbnail: course.thumbnail,
      category: course.category, level: course.level, durationHours: course.durationHours,
      language: course.language, certificate: course.certificate, tags: (course.tags || []).join(", "),
      lessons: course.lessons?.map(l => ({ title: l.title, type: l.type, duration: l.duration, videoUrl: l.videoUrl, content: l.content, jitsiRoom: l.jitsiRoom, thumbnail: l.thumbnail })) || [{ title: "", type: "video", duration: "20 min" }],
      questions: (course.quiz?.questions as any[] || []).map((q: any) => ({
        question: q.question,
        options: [q.options[0] || "", q.options[1] || "", q.options[2] || "", q.options[3] || ""] as [string, string, string, string],
        correctIndex: q.correctIndex ?? 0, explanation: q.explanation || "",
      })) || [{ question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" }],
    });
    setFormError(""); setShowCourseForm(true); setExpandedQuestion(0);
  }

  async function saveCourse() {
    if (!form.title || !form.description || !form.instructor) { setFormError("Title, description and instructor are required."); return; }
    if (form.lessons.some(l => !l.title)) { setFormError("All lessons need a title."); return; }
    if (form.questions.some(q => !q.question || q.options.some(o => !o))) { setFormError("All quiz questions and 4 options are required."); return; }
    setFormSaving(true); setFormError("");
    try {
      const coursePayload = {
        title: form.title, description: form.description, longDescription: form.longDescription,
        instructor: form.instructor, instructorBio: form.instructorBio, thumbnail: form.thumbnail,
        category: form.category, level: form.level, durationHours: form.durationHours,
        language: form.language, certificate: form.certificate,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        price: 0,
        lessons: form.lessons.map((l, i) => ({ id: `l${i + 1}`, title: l.title, type: l.type, duration: l.duration, thumbnail: l.thumbnail || form.thumbnail, order: i + 1, videoUrl: l.videoUrl, content: l.content, jitsiRoom: l.jitsiRoom })),
        quiz: {
          id: `q-${Date.now()}`, title: `${form.title} Assessment`, passingScore: 60,
          questions: form.questions.map((q, i) => ({
            id: `qq${i + 1}`, question: q.question, options: q.options,
            correctIndex: q.correctIndex, explanation: q.explanation,
          })),
        },
        rating: editingCourse?.rating || 5.0, enrolledCount: editingCourse?.enrolledCount || 0,
      };
      if (editingCourse) {
        await lmsApi.adminUpdateCourse(editingCourse.id, coursePayload);
      } else {
        await lmsApi.adminCreateCourse(coursePayload);
      }
      setShowCourseForm(false);
      await loadAll();
    } catch (e: any) { setFormError(e.message || "Save failed"); }
    setFormSaving(false);
  }

  async function deleteCourse(id: string) {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    try { await lmsApi.adminDeleteCourse(id); await loadAll(); } catch (e: any) { alert(e.message); }
  }

  const successDons = donations.filter(d => d.status === "success");
  const failedDons  = donations.filter(d => d.status === "failed");
  const totalRevenue = successDons.reduce((s, d) => s + d.amount, 0);
  const uniqueDonors = new Set(donations.map(d => d.userEmail)).size;
  const avgDon = successDons.length ? Math.round(successDons.reduce((s, d) => s + d.amount, 0) / successDons.length) : 0;
  const guestDonations = donations.filter(d => !d.userId || d.userId === "guest").length;

  const areaData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - (5 - i));
    const month = d.toLocaleString("en-IN", { month: "short" });
    const amount = successDons.filter(don => { const dt = new Date(don.createdAt); return dt.getMonth() === d.getMonth() && dt.getFullYear() === d.getFullYear(); }).reduce((s, don) => s + don.amount, 0);
    return { month, amount };
  });

  const pieData = [
    { name: "Indian", value: successDons.filter(d => d.donorType === "indian").reduce((s, d) => s + d.amount, 0) },
    { name: "NRI",    value: successDons.filter(d => d.donorType === "nri").reduce((s, d) => s + d.amount, 0) },
    { name: "Foreign",value: successDons.filter(d => d.donorType === "foreign").reduce((s, d) => s + d.amount, 0) },
  ].filter(d => d.value > 0);

  const filteredDonations = donations
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter(d => {
      const matchSearch = !search || d.userName?.toLowerCase().includes(search.toLowerCase()) || d.userEmail?.toLowerCase().includes(search.toLowerCase()) || d.receiptNo?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "all" || d.status === filterStatus;
      const matchType = filterType === "all" || d.donorType === filterType;
      return matchSearch && matchStatus && matchType;
    });

  const PAGE_SIZE = 15;
  const totalPages = Math.max(1, Math.ceil(filteredDonations.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedDonations = filteredDonations.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="text-indigo-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const TABS = [
    { id: "overview",  label: "Overview",                  icon: <BarChart3 size={15} /> },
    { id: "donations", label: `Donations (${donations.length})`, icon: <IndianRupee size={15} /> },
    { id: "users",     label: `Users${appUsers.length > 0 ? ` (${appUsers.length})` : ""}`, icon: <Users size={15} />, onTabClick: () => { setActiveTab("users"); loadUsers(); } },
    { id: "causes",    label: `Causes (${causes.length || "—"})`, icon: <Heart size={15} />, onTabClick: () => { setActiveTab("causes"); if (causes.length === 0) loadCauses(); } },
    { id: "courses",   label: "LMS Courses",               icon: <GraduationCap size={15} /> },
  ] as { id: typeof activeTab; label: string; icon: React.ReactNode; onTabClick?: () => void }[];

  const statusBadge = (status: string) => {
    if (status === "success") return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">✓ Paid</span>;
    if (status === "failed")  return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">✗ Failed</span>;
    return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold">{status}</span>;
  };

  const fmtAmt = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(0)}K` : `₹${n}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-indigo-700 text-white py-5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center"><Shield size={20} /></div>
            <div>
              <div className="text-white text-base font-bold">Admin Dashboard</div>
              <div className="text-white/60 text-xs">Shiksha Raj, Ujjwal Bharat Mission · {user.email}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={loadAll} className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => { logout(); navigate("/"); }} className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={tab.onTabClick ? tab.onTabClick : () => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id ? "bg-indigo-700 text-white shadow-sm font-semibold" : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center"><Loader2 size={32} className="text-indigo-600 animate-spin mx-auto mb-3" /><p className="text-slate-500 text-sm">Loading...</p></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 text-sm mb-3">{error}</p>
            <button onClick={loadAll} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">Retry</button>
          </div>
        ) : (
          <>
            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: <IndianRupee size={20} />, label: "Total Collected",  value: totalRevenue >= 100000 ? `₹${(totalRevenue / 100000).toFixed(2)}L` : `₹${totalRevenue.toLocaleString()}`, sub: `${successDons.length} successful`, color: "text-amber-700 bg-amber-50" },
                    { icon: <Users size={20} />,       label: "Unique Donors",    value: uniqueDonors, sub: guestDonations > 0 ? `${guestDonations} guest` : "all linked", color: "text-indigo-700 bg-indigo-50" },
                    { icon: <TrendingUp size={20} />,  label: "Avg Donation",     value: `₹${avgDon.toLocaleString()}`, sub: "per transaction", color: "text-emerald-700 bg-emerald-50" },
                    { icon: <BookOpen size={20} />,    label: "LMS Courses",      value: courses.length, sub: "published", color: "text-violet-700 bg-violet-50" },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                      <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>{s.icon}</div>
                      <div className="text-2xl text-slate-900 mb-0.5 font-extrabold">{s.value}</div>
                      <div className="text-slate-600 text-sm">{s.label}</div>
                      <div className="text-slate-400 text-xs">{s.sub}</div>
                    </div>
                  ))}
                </div>

                {failedDons.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold text-sm">!</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-red-700 text-sm font-semibold">{failedDons.length} failed payment attempt{failedDons.length > 1 ? "s" : ""}</div>
                      <div className="text-red-600 text-xs mt-0.5">These are captured for tracking. No money was deducted.</div>
                    </div>
                    <button onClick={() => { setFilterStatus("failed"); setActiveTab("donations"); }} className="text-red-600 text-xs border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-100 whitespace-nowrap font-semibold">
                      View Failed
                    </button>
                  </div>
                )}

                {donations.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                    <Heart size={40} className="text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No donations yet.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-slate-800 text-sm mb-4 font-semibold">Revenue Trend (6 Months)</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={areaData}>
                            <defs><linearGradient id="cA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F97316" stopOpacity={0.2} /><stop offset="95%" stopColor="#F97316" stopOpacity={0} /></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={v => v >= 1000 ? `₹${v / 1000}K` : `₹${v}`} />
                            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Amount"]} />
                            <Area type="monotone" dataKey="amount" stroke="#F97316" strokeWidth={2} fill="url(#cA)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-slate-800 text-sm mb-4 font-semibold">By Donor Type</h3>
                        {pieData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart><Pie data={pieData} cx="50%" cy="45%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>{pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Legend iconType="circle" iconSize={8} /><Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Amount"]} /></PieChart>
                          </ResponsiveContainer>
                        ) : <div className="flex items-center justify-center h-40 text-slate-400 text-sm">No data yet</div>}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-slate-800 text-sm font-semibold">Recent Donations</h3>
                        <button onClick={() => setActiveTab("donations")} className="text-xs text-purple-600 hover:underline">View All</button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50">
                            <tr>{["Donor", "Amount", "Cause", "Type", "Date", "Status"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs text-slate-500 font-semibold">{h}</th>)}</tr>
                          </thead>
                          <tbody>
                            {donations.slice(0, 5).map(d => (
                              <tr key={d.id} className={`border-t border-slate-100 ${d.status === "failed" ? "bg-red-50/40" : "hover:bg-slate-50/50"}`}>
                                <td className="px-4 py-3"><div className="text-slate-800 font-medium text-xs">{d.userName}</div><div className="text-slate-400 text-xs">{d.userEmail}</div></td>
                                <td className={`px-4 py-3 font-bold text-sm ${d.status === "failed" ? "text-red-500" : "text-teal-700"}`}>₹{d.amount.toLocaleString()}</td>
                                <td className="px-4 py-3 text-slate-600 max-w-32 truncate text-xs">{d.causeName}</td>
                                <td className="px-4 py-3"><span className="capitalize text-xs bg-slate-100 px-2 py-0.5 rounded">{d.donorType}</span></td>
                                <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString("en-IN")}</td>
                                <td className="px-4 py-3">{statusBadge(d.status)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* ── DONATIONS TABLE ── */}
            {activeTab === "donations" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" placeholder="Search by name, email, receipt..." />
                      </div>
                      <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none">
                        <option value="all">All Status</option>
                        <option value="success">✓ Success</option>
                        <option value="failed">✗ Failed</option>
                        <option value="pending">Pending</option>
                      </select>
                      <select value={filterType} onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }} className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none">
                        <option value="all">All Types</option>
                        <option value="indian">Indian</option>
                        <option value="nri">NRI</option>
                        <option value="foreign">Foreign</option>
                      </select>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>{filteredDonations.length} record{filteredDonations.length !== 1 ? "s" : ""} · ₹{filteredDonations.filter(d => d.status === "success").reduce((s, d) => s + d.amount, 0).toLocaleString()} collected</span>
                      {totalPages > 1 && <span>Page {safePage} of {totalPages}</span>}
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>{["Donor", "Amount", "Cause", "Type", "Receipt No.", "Date", "Status", "80G", "Actions"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs text-slate-500 font-semibold">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {pagedDonations.length === 0
                          ? <tr><td colSpan={9} className="text-center py-12 text-slate-400 text-sm">No records match filters.</td></tr>
                          : pagedDonations.map(d => (
                            <tr key={d.id} className={`border-t border-slate-100 ${d.status === "failed" ? "bg-red-50/30" : "hover:bg-slate-50/50"}`}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-slate-800 text-xs font-medium">{d.userName}</span>
                                  {(!d.userId || d.userId === "guest") && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-semibold">guest</span>}
                                </div>
                                <div className="text-slate-400 text-xs">{d.userEmail}</div>
                              </td>
                              <td className={`px-4 py-3 font-bold text-sm ${d.status === "failed" ? "text-red-500" : "text-teal-700"}`}>
                                ₹{d.amount.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-slate-600 text-xs max-w-[100px] truncate">{d.causeName}</td>
                              <td className="px-4 py-3"><span className="capitalize text-xs bg-slate-100 px-2 py-0.5 rounded">{d.donorType}</span></td>
                              <td className="px-4 py-3"><code className="text-xs bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded">{d.receiptNo}</code></td>
                              <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString("en-IN")}</td>
                              <td className="px-4 py-3">{statusBadge(d.status)}</td>
                              <td className="px-4 py-3">
                                {d.certificate80G
                                  ? <span className="text-xs text-teal-600 flex items-center gap-0.5"><CheckCircle2 size={12} /> Yes</span>
                                  : <span className="text-xs text-slate-300">—</span>}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1 flex-wrap">
                                  {/* Edit — always available */}
                                  <button
                                    onClick={() => setEditingDonation(d)}
                                    className="flex items-center gap-1 text-xs text-indigo-600 hover:bg-indigo-50 border border-indigo-200 px-2 py-1.5 rounded-lg font-medium whitespace-nowrap"
                                  >
                                    <Edit size={11} /> Edit
                                  </button>
                                  {d.status === "success" && (
                                    <button
                                      onClick={() => setSelectedDonation(d as any)}
                                      className="flex items-center gap-1 text-xs text-purple-600 hover:bg-purple-50 border border-purple-200 px-2 py-1.5 rounded-lg font-medium whitespace-nowrap"
                                    >
                                      <Eye size={11} /> View
                                    </button>
                                  )}
                                  {d.status === "success" && (
                                    <button
                                      onClick={() => handleResendEmail(d.id)}
                                      disabled={resendStatus[d.id] === "sending"}
                                      className={`flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg border font-medium whitespace-nowrap disabled:opacity-50 ${
                                        resendStatus[d.id] === "success" ? "bg-green-50 text-green-700 border-green-200"
                                        : resendStatus[d.id] === "error" ? "bg-red-50 text-red-600 border-red-200"
                                        : "text-teal-600 hover:bg-teal-50 border-teal-200"
                                      }`}
                                    >
                                      {resendStatus[d.id] === "sending" ? <Loader2 size={11} className="animate-spin" /> : <Mail size={11} />}
                                      {resendStatus[d.id] === "success" ? "Sent!" : resendStatus[d.id] === "error" ? "Err" : "Email"}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                      <div className="text-xs text-slate-500">
                        Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filteredDonations.length)} of {filteredDonations.length}
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
                          className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors font-medium">
                          ← Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                          .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                            acc.push(p);
                            return acc;
                          }, [])
                          .map((p, i) =>
                            p === "…" ? (
                              <span key={`ellipsis-${i}`} className="px-2 text-xs text-slate-400">…</span>
                            ) : (
                              <button key={p} onClick={() => setCurrentPage(p as number)}
                                className={`min-w-[32px] px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${safePage === p ? "bg-purple-600 text-white border-purple-600 shadow-sm font-bold" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                                {p}
                              </button>
                            )
                          )}
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                          className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors font-medium">
                          Next →
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                    <span>{successDons.length} successful · {failedDons.length} failed</span>
                    <span>Total collected: <strong className="text-teal-700">₹{totalRevenue.toLocaleString("en-IN")}</strong></span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── USERS ── */}
            {activeTab === "users" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-900 text-base font-bold">Registered Users</h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {appUsers.length} registered · {appUsers.filter(u => u.active).length} active · {appUsers.filter(u => !u.active).length} inactive
                    </p>
                  </div>
                  <button onClick={loadUsers} disabled={usersLoading}
                    className="flex items-center gap-2 text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-60" style={{ background: "#1B2B3A" }}>
                    {usersLoading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                    {usersLoading ? "Loading..." : appUsers.length === 0 ? "Load Users" : "Refresh"}
                  </button>
                </div>

                {usersError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                    <span className="text-red-700 text-sm flex-1">{usersError}</span>
                    <button onClick={loadUsers} className="text-red-600 text-xs underline whitespace-nowrap">Retry</button>
                  </div>
                )}

                {appUsers.length === 0 && !usersLoading && !usersError && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                    <Users size={36} className="text-blue-300 mx-auto mb-3" />
                    <p className="text-blue-700 text-sm font-semibold mb-1">No users found</p>
                    <p className="text-blue-500 text-xs mb-4">Click Refresh to reload the user list.</p>
                    <button onClick={loadUsers} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold">Load Users Now</button>
                  </div>
                )}

                {usersLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={28} className="text-teal-600 animate-spin" />
                  </div>
                )}

                {appUsers.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                          <tr>{["User", "Type", "Country", "Joined", "Last Login", "Donated", "Status", "Action"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs text-slate-500 font-semibold">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {appUsers.map(u => {
                            const userDonations = successDons.filter(d => d.userId === u.id || d.userEmail === u.email);
                            const totalGiven = userDonations.reduce((s, d) => s + d.amount, 0);
                            return (
                              <tr key={u.id} className={`border-t border-slate-100 hover:bg-slate-50/50 ${!u.active ? "opacity-60" : ""}`}>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                      {u.name?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                    <div>
                                      <div className="text-slate-800 text-xs font-semibold flex items-center gap-1">
                                        {u.name}
                                        {u.isAdmin && <span className="text-xs bg-orange-100 text-orange-700 px-1.5 rounded font-semibold">Admin</span>}
                                      </div>
                                      <div className="text-slate-400 text-xs">{u.email}</div>
                                      {u.phone && <div className="text-slate-400 text-xs">{u.phone}</div>}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <span className="capitalize text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{u.donorType || "indian"}</span>
                                </td>
                                <td className="px-4 py-3 text-xs text-slate-500">{u.country || "India"}</td>
                                <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                                <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{u.lastSignIn ? new Date(u.lastSignIn).toLocaleDateString("en-IN") : "Never"}</td>
                                <td className="px-4 py-3">
                                  <div className="text-xs">
                                    <span className="font-bold text-teal-700">₹{totalGiven.toLocaleString("en-IN")}</span>
                                    <span className="text-slate-400 ml-1">({userDonations.length})</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  {u.active
                                    ? <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-semibold"><UserCheck size={11} /> Active</span>
                                    : <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full font-semibold"><UserX size={11} /> Inactive</span>
                                  }
                                </td>
                                <td className="px-4 py-3">
                                  {!u.isAdmin && (
                                    <button
                                      onClick={() => toggleUserActive(u.id, u.active)}
                                      disabled={togglingUser === u.id}
                                      className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-50 ${
                                        u.active
                                          ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                                          : "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                                      }`}
                                    >
                                      {togglingUser === u.id
                                        ? <Loader2 size={11} className="animate-spin" />
                                        : u.active ? <ToggleRight size={13} /> : <ToggleLeft size={13} />
                                      }
                                      {u.active ? "Deactivate" : "Activate"}
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                      <span>{appUsers.filter(u => !u.isAdmin).length} donors · {appUsers.filter(u => u.isAdmin).length} admins</span>
                      <span>{appUsers.filter(u => u.active).length} active · {appUsers.filter(u => !u.active).length} inactive</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── CAUSES ── */}
            {activeTab === "causes" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Header bar */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-900 text-base font-bold">Cause Management</h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Add, edit or delete causes · Toggle 80G eligibility per cause · Live raised amounts sync from real donations
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={loadCauses} disabled={causesLoading}
                      className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-sm hover:bg-slate-50 disabled:opacity-60">
                      {causesLoading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
                      Refresh
                    </button>
                    <button
                      onClick={() => { setEditingCauseFull(null); setShowCauseForm(true); }}
                      className="flex items-center gap-2 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm" style={{ background: "#B07D3A" }}
                    >
                      <Plus size={15} /> New Cause
                    </button>
                  </div>
                </div>

                {/* Summary pills */}
                <div className="flex gap-3 flex-wrap">
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-center">
                    <div className="text-green-700 text-base font-bold">{causes.filter(c => (causeSettings[c.id]?.enable80G ?? c.enable80G ?? true)).length}</div>
                    <div className="text-green-600 text-xs">80G Enabled</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-center">
                    <div className="text-amber-700 text-base font-bold">{causes.filter(c => c.urgent).length}</div>
                    <div className="text-amber-600 text-xs">Urgent</div>
                  </div>
                  <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 text-center">
                    <div className="text-teal-700 text-base font-bold">₹{successDons.reduce((s, d) => s + d.amount, 0).toLocaleString()}</div>
                    <div className="text-teal-600 text-xs">Portal Total</div>
                  </div>
                </div>

                {causesLoading && causes.length === 0 && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={28} className="text-orange-500 animate-spin" />
                  </div>
                )}

                {!causesLoading && causes.length === 0 && (
                  <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                    <Heart size={40} className="text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm mb-4">No causes loaded. Click Refresh to load causes from the database.</p>
                    <button onClick={loadCauses} className="text-white px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#B07D3A" }}>Load Causes</button>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {causes.map(cause => {
                    const portalDons = successDons.filter(d => d.causeId === cause.id);
                    const portalRaised = portalDons.reduce((s, d) => s + d.amount, 0);
                    const portalDonors = new Set(portalDons.map(d => d.userEmail)).size;
                    const totalRaised = (cause.raised || 0) + portalRaised;
                    const totalDonors = (cause.donors || 0) + portalDonors;
                    const pct = Math.min((totalRaised / (cause.goal || 1)) * 100, 100);
                    const is80GOn = causeSettings[cause.id]?.enable80G ?? cause.enable80G ?? true;
                    const isToggling = toggling80G === cause.id;

                    return (
                      <div key={cause.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        {/* Image strip */}
                        <div className="h-28 overflow-hidden relative">
                          {cause.image ? (
                            <img src={cause.image} alt={cause.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                              <Heart size={28} className="text-orange-300" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-2 left-3">
                            <span className="text-xs bg-white/90 text-slate-700 px-2 py-0.5 rounded-full font-semibold">{cause.category}</span>
                          </div>
                          <div className="absolute top-2 right-2 flex gap-1.5">
                            {cause.urgent && <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">Urgent</span>}
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${is80GOn ? "bg-green-500 text-white" : "bg-slate-600 text-white"}`}>
                              {is80GOn ? "80G ON" : "80G OFF"}
                            </span>
                          </div>
                          {/* Edit/Delete overlay buttons */}
                          <div className="absolute top-2 left-3 flex gap-1.5">
                            <button
                              onClick={() => { setEditingCauseFull(cause); setShowCauseForm(true); }}
                              className="w-7 h-7 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center transition-colors shadow-sm"
                              title="Edit cause"
                            >
                              <Edit size={13} className="text-slate-700" />
                            </button>
                            <button
                              onClick={() => handleDeleteCause(cause.id)}
                              className="w-7 h-7 bg-red-500/90 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors shadow-sm"
                              title="Delete cause"
                            >
                              <Trash2 size={13} className="text-white" />
                            </button>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="text-slate-900 text-sm font-bold mb-1">{cause.title}</div>
                          <div className="text-slate-500 text-xs mb-3 line-clamp-2">{cause.description}</div>

                          {/* Stats grid */}
                          <div className="grid grid-cols-4 gap-2 mb-3 text-center">
                            <div className="bg-teal-50 rounded-lg p-2">
                              <div className="text-xs text-teal-700 font-bold">{fmtAmt(totalRaised)}</div>
                              <div className="text-[10px] text-teal-500">Raised</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-2">
                              <div className="text-xs text-orange-700 font-bold">{fmtAmt(cause.goal)}</div>
                              <div className="text-[10px] text-orange-500">Goal</div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-2">
                              <div className="text-xs text-blue-700 font-bold">{totalDonors}</div>
                              <div className="text-[10px] text-blue-500">Donors</div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-2">
                              <div className="text-xs text-purple-700 font-bold">{pct.toFixed(0)}%</div>
                              <div className="text-[10px] text-purple-500">Funded</div>
                            </div>
                          </div>

                          {/* Breakdown: portal vs baseline */}
                          {portalRaised > 0 && (
                            <div className="text-[10px] text-slate-400 mb-2 flex gap-2">
                              <span>Portal: <strong className="text-teal-600">₹{portalRaised.toLocaleString()}</strong></span>
                              <span>·</span>
                              <span>Baseline: <strong className="text-slate-600">₹{(cause.raised || 0).toLocaleString()}</strong></span>
                            </div>
                          )}

                          {/* Progress bar */}
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                            <div
                              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-700"
                              style={{ width: `${Math.max(pct, pct > 0 ? 1 : 0)}%` }}
                            />
                          </div>

                          {/* 80G Toggle */}
                          <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                            <div>
                              <div className="text-slate-700 text-xs font-bold">80G Certificate</div>
                              <div className="text-slate-400 text-[10px]">
                                {is80GOn ? "Formal 80G receipt sent to donors" : "Normal payment confirmation only"}
                              </div>
                            </div>
                            <button
                              onClick={() => handleToggle80G(cause.id, is80GOn)}
                              disabled={isToggling}
                              className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-300 focus:outline-none disabled:opacity-60 ${
                                is80GOn ? "bg-green-500" : "bg-slate-300"
                              }`}
                            >
                              {isToggling ? (
                                <Loader2 size={12} className="absolute inset-0 m-auto animate-spin text-white" />
                              ) : (
                                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${is80GOn ? "left-5" : "left-0.5"}`} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── LMS COURSES ── */}
            {activeTab === "courses" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-slate-900 text-base font-bold">LMS Course Management</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{courses.length} course{courses.length !== 1 ? "s" : ""} published · All are free for learners</p>
                  </div>
                  <button onClick={openCreateForm} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm transition-colors font-semibold">
                    <Plus size={16} /> Add New Course
                  </button>
                </div>

                {courses.length === 0 ? (
                  <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                    <GraduationCap size={40} className="text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm mb-4">No courses yet. Add your first course!</p>
                    <button onClick={openCreateForm} className="bg-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">Add First Course</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {courses.map(course => (
                      <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="relative h-36 overflow-hidden">
                          {course.thumbnail ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center"><GraduationCap size={32} className="text-teal-400" /></div>}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <button onClick={() => openEditForm(course)} className="w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors"><Edit size={13} className="text-slate-700" /></button>
                            <button onClick={() => deleteCourse(course.id)} className="w-7 h-7 bg-red-500/90 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors"><Trash2 size={13} className="text-white" /></button>
                          </div>
                          <div className="absolute bottom-2 left-3">
                            <span className="text-xs bg-white/90 text-slate-700 px-2 py-0.5 rounded-full font-semibold">{course.category}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="text-slate-900 text-sm mb-1 font-bold">{course.title}</div>
                          <div className="text-slate-500 text-xs mb-3 line-clamp-2">{course.description}</div>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><BookOpen size={11} /> {course.lessons?.length || 0} lessons</span>
                            <span className="flex items-center gap-1"><Users size={11} /> {course.enrolledCount || 0}</span>
                            <span className="capitalize px-1.5 py-0.5 rounded bg-slate-100">{course.level}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ── CAUSE FORM DRAWER ── */}
      <CauseFormDrawer
        open={showCauseForm}
        editing={editingCauseFull}
        onClose={() => { setShowCauseForm(false); setEditingCauseFull(null); }}
        onSave={handleSaveCause}
      />

      {/* ── DONATION EDIT MODAL ── */}
      <DonationEditModal
        donation={editingDonation}
        causes={causes}
        onClose={() => setEditingDonation(null)}
        onSave={handleSaveDonation}
      />

      {/* ── DONATION RECEIPT MODAL ── */}
      <DonationReceiptModal donation={selectedDonation} onClose={() => setSelectedDonation(null)} isAdminView />

      {/* ── COURSE FORM DRAWER ── */}
      <AnimatePresence>
        {showCourseForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCourseForm(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-purple-700 text-white flex-shrink-0">
                <div>
                  <div className="text-base font-bold">{editingCourse ? "Edit Course" : "Add New Course"}</div>
                  <div className="text-white/70 text-xs">Fill in all fields. Learners see this instantly.</div>
                </div>
                <button onClick={() => setShowCourseForm(false)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"><X size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {formError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{formError}</div>}

                <div>
                  <h4 className="text-slate-700 text-xs uppercase tracking-wider mb-3 font-bold">Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-600 text-xs mb-1 font-semibold">Course Title *</label>
                      <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Digital Literacy for Rural Youth" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs mb-1 font-semibold">Short Description *</label>
                      <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="One-line description shown on course cards" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs mb-1 font-semibold">Full Description</label>
                      <textarea value={form.longDescription} onChange={e => setForm(f => ({ ...f, longDescription: e.target.value }))} rows={3} placeholder="Detailed description..." className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 text-xs mb-1 font-semibold">Category</label>
                        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400">
                          {["Technology", "Business", "Agriculture", "Social Work", "Health", "Education", "Finance"].map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-600 text-xs mb-1 font-semibold">Level</label>
                        <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value as any }))} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400">
                          <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 text-xs mb-1 font-semibold">Duration (hours)</label>
                        <input type="number" value={form.durationHours} onChange={e => setForm(f => ({ ...f, durationHours: +e.target.value }))} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" min={1} />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-xs mb-1 font-semibold">Language</label>
                        <input value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs mb-1 font-semibold">Thumbnail URL</label>
                      <input value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))} placeholder="https://..." className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs mb-1 font-semibold">Tags (comma-separated)</label>
                      <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="digital, literacy, beginner" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-slate-700 text-xs uppercase tracking-wider mb-3 font-bold">Instructor</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-600 text-xs mb-1 font-semibold">Instructor Name *</label>
                      <input value={form.instructor} onChange={e => setForm(f => ({ ...f, instructor: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs mb-1 font-semibold">Instructor Bio</label>
                      <textarea value={form.instructorBio} onChange={e => setForm(f => ({ ...f, instructorBio: e.target.value }))} rows={2} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 resize-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-slate-700 text-xs uppercase tracking-wider font-bold">Lessons ({form.lessons.length})</h4>
                    <button onClick={() => setForm(f => ({ ...f, lessons: [...f.lessons, { title: "", type: "video", duration: "20 min" }] }))} className="text-xs text-purple-600 flex items-center gap-1"><Plus size={12} /> Add lesson</button>
                  </div>
                  {form.lessons.map((lesson, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl p-3 mb-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono w-5">{i + 1}.</span>
                        <input value={lesson.title} onChange={e => { const ls = [...form.lessons]; ls[i] = { ...ls[i], title: e.target.value }; setForm(f => ({ ...f, lessons: ls })); }} placeholder="Lesson title" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-400" />
                        <select value={lesson.type} onChange={e => { const ls = [...form.lessons]; ls[i] = { ...ls[i], type: e.target.value as any }; setForm(f => ({ ...f, lessons: ls })); }} className="px-2 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none">
                          <option value="video">Video</option><option value="live">Live</option><option value="reading">Reading</option>
                        </select>
                        <input value={lesson.duration} onChange={e => { const ls = [...form.lessons]; ls[i] = { ...ls[i], duration: e.target.value }; setForm(f => ({ ...f, lessons: ls })); }} placeholder="20 min" className="w-20 px-2 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none" />
                        {form.lessons.length > 1 && <button onClick={() => setForm(f => ({ ...f, lessons: f.lessons.filter((_, idx) => idx !== i) }))} className="text-red-400 hover:text-red-600"><Trash2 size={13} /></button>}
                      </div>
                      {lesson.type === "video" && <input value={lesson.videoUrl || ""} onChange={e => { const ls = [...form.lessons]; ls[i] = { ...ls[i], videoUrl: e.target.value }; setForm(f => ({ ...f, lessons: ls })); }} placeholder="Video URL (YouTube embed or direct)" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-400" />}
                      {lesson.type === "live" && <input value={lesson.jitsiRoom || ""} onChange={e => { const ls = [...form.lessons]; ls[i] = { ...ls[i], jitsiRoom: e.target.value }; setForm(f => ({ ...f, lessons: ls })); }} placeholder="Jitsi room name" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-400" />}
                      {lesson.type === "reading" && <textarea value={lesson.content || ""} onChange={e => { const ls = [...form.lessons]; ls[i] = { ...ls[i], content: e.target.value }; setForm(f => ({ ...f, lessons: ls })); }} rows={3} placeholder="Reading content (markdown supported)" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-400 resize-none" />}
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-slate-700 text-xs uppercase tracking-wider font-bold">Quiz Questions ({form.questions.length})</h4>
                    <button onClick={() => { setForm(f => ({ ...f, questions: [...f.questions, { question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" }] })); setExpandedQuestion(form.questions.length); }} className="text-xs text-purple-600 flex items-center gap-1"><Plus size={12} /> Add question</button>
                  </div>
                  {form.questions.map((q, qi) => (
                    <div key={qi} className="border border-slate-200 rounded-xl mb-2 overflow-hidden">
                      <button onClick={() => setExpandedQuestion(expandedQuestion === qi ? null : qi)} className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors">
                        <span className="text-xs text-slate-700 font-semibold">Q{qi + 1}: {q.question ? q.question.slice(0, 50) : "New question"}</span>
                        <div className="flex items-center gap-2">
                          {form.questions.length > 1 && <button onClick={(e) => { e.stopPropagation(); setForm(f => ({ ...f, questions: f.questions.filter((_, idx) => idx !== qi) })); }} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>}
                          {expandedQuestion === qi ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                        </div>
                      </button>
                      {expandedQuestion === qi && (
                        <div className="p-3 space-y-2">
                          <input value={q.question} onChange={e => { const qs = [...form.questions]; qs[qi] = { ...qs[qi], question: e.target.value }; setForm(f => ({ ...f, questions: qs })); }} placeholder="Question text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-400" />
                          {q.options.map((opt, oi) => (
                            <div key={oi} className="flex items-center gap-2">
                              <button onClick={() => { const qs = [...form.questions]; qs[qi] = { ...qs[qi], correctIndex: oi }; setForm(f => ({ ...f, questions: qs })); }} className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${q.correctIndex === oi ? "bg-green-500 border-green-500" : "border-slate-300"}`}>
                                {q.correctIndex === oi && <div className="w-2 h-2 bg-white rounded-full" />}
                              </button>
                              <input value={opt} onChange={e => { const qs = [...form.questions]; const opts = [...qs[qi].options as string[]] as [string, string, string, string]; opts[oi] = e.target.value; qs[qi] = { ...qs[qi], options: opts }; setForm(f => ({ ...f, questions: qs })); }} placeholder={`Option ${oi + 1}`} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-400" />
                            </div>
                          ))}
                          <input value={q.explanation} onChange={e => { const qs = [...form.questions]; qs[qi] = { ...qs[qi], explanation: e.target.value }; setForm(f => ({ ...f, questions: qs })); }} placeholder="Explanation (shown after answer)" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 border-t border-slate-200 p-4 flex gap-3">
                {formError && <div className="text-red-600 text-xs flex-1 flex items-center">{formError}</div>}
                <button onClick={() => setShowCourseForm(false)} className="border-2 border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl hover:bg-slate-50 text-sm font-semibold">Cancel</button>
                <button onClick={saveCourse} disabled={formSaving} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-sm font-bold disabled:opacity-60 flex items-center justify-center gap-2">
                  {formSaving ? <Loader2 size={16} className="animate-spin" /> : null}
                  {formSaving ? "Saving..." : editingCourse ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
