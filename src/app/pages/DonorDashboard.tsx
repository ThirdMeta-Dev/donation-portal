import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import {
  Heart, User, CheckCircle2, Award, Shield, BookOpen, Loader2,
  FileText, IndianRupee, BarChart3, RefreshCw, Eye,
  TrendingUp, AlertCircle, Star
} from "lucide-react";
import { DonationReceiptModal } from "../components/DonationReceiptModal";
import { useAuth } from "../lib/AuthContext";
import { donationApi, lmsApi, Donation, Enrollment } from "../lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function DonorDashboard() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "impact" | "profile">("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  // Reload every time this page is visited (location.key changes on each navigation)
  useEffect(() => {
    if (authLoading) return; // wait for auth to fully resolve before redirecting
    if (!user) { navigate("/auth", { replace: true }); return; }
    if (user.role === "admin") { navigate("/admin", { replace: true }); return; }
    loadData();
  }, [user, authLoading, location.key]);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [donRes, enrollRes] = await Promise.allSettled([
        donationApi.getMine(),
        lmsApi.getEnrollments(),
      ]);
      if (donRes.status === "fulfilled") {
        setDonations(donRes.value.donations || []);
      } else {
        console.error("getMine failed:", donRes.reason);
        setError("Could not load donations. Please refresh.");
      }
      if (enrollRes.status === "fulfilled") {
        setEnrollments(enrollRes.value.enrollments || []);
      }
    } catch (e: any) {
      console.error("Dashboard load error:", e);
      setError(e.message || "Failed to load dashboard.");
    }
    setLoading(false);
  }

  const successDonations = donations.filter(d => d.status === "success");
  const failedDonations  = donations.filter(d => d.status === "failed");
  const totalDonated     = successDonations.reduce((s, d) => s + d.amount, 0);
  const totalCauses      = new Set(successDonations.map(d => d.causeId)).size;
  const certificates     = successDonations.filter(d => d.certificate80G).length;
  const completedCourses = enrollments.filter(e => e.certificateIssued).length;

  const chartData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const month = d.toLocaleString("en-IN", { month: "short" });
    const amount = successDonations
      .filter(don => {
        const dDate = new Date(don.createdAt);
        return dDate.getMonth() === d.getMonth() && dDate.getFullYear() === d.getFullYear();
      })
      .reduce((s, don) => s + don.amount, 0);
    return { month, amount };
  });

  // Show spinner while auth is resolving (prevents flash-redirect)
  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="text-indigo-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="text-indigo-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const statusBadge = (status: string) => {
    if (status === "success") return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">✓ Paid</span>;
    if (status === "failed")  return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">✗ Failed</span>;
    return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold">{status}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-indigo-700 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-lg font-bold">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-white text-lg font-bold">Welcome, {user.name.split(" ")[0]}! 👋</div>
              <div className="text-white/70 text-sm">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadData} className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <RefreshCw size={14} /> <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link to="/donate"
              className="hidden sm:flex items-center gap-2 bg-white text-indigo-700 px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors shadow-md font-bold">
              <Heart size={15} className="fill-indigo-600" /> Support Now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
            <span className="text-red-700 text-sm">{error}</span>
            <button onClick={loadData} className="ml-auto text-red-600 text-xs underline">Retry</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm overflow-x-auto" style={{ borderColor: "#E5E0D8" }}>
          {([
            { id: "overview", label: "Overview",    icon: <BarChart3 size={15} /> },
            { id: "history",  label: `Transactions${donations.length > 0 ? ` (${donations.length})` : ""}`, icon: <FileText size={15} /> },
            { id: "impact",   label: "My Impact",   icon: <Star size={15} /> },
{ id: "profile",  label: "Profile",     icon: <User size={15} /> },
          ] as { id: typeof activeTab; label: string; icon: React.ReactNode }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#1B2B3A] text-white shadow-sm font-semibold"
                  : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: <IndianRupee size={20} />, label: "Total Donated", value: `₹${totalDonated.toLocaleString("en-IN")}`, bg: "#FAF5EA", iconColor: "#B07D3A" },
                { icon: <Heart size={20} />,        label: "Successful",   value: successDonations.length.toString(),           bg: "#EDF5EB", iconColor: "#4A6741" },
                { icon: <CheckCircle2 size={20} />, label: "Causes",       value: totalCauses.toString(),                       bg: "#F0F4F7", iconColor: "#1B2B3A" },
                { icon: <Award size={20} />,        label: "80G Certs",    value: certificates.toString(),                      bg: "#F2E8CE", iconColor: "#8C6228" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl shadow-sm p-5" style={{ border: "1px solid #E5E0D8" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                    <span style={{ color: s.iconColor }}>{s.icon}</span>
                  </div>
                  <div className="text-2xl mb-0.5 font-extrabold" style={{ color: "#1C1C1A" }}>{s.value}</div>
                  <div className="text-sm" style={{ color: "#6B6B60" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Failed payments alert */}
            {failedDonations.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-red-700 text-sm font-semibold">{failedDonations.length} failed payment attempt{failedDonations.length > 1 ? "s" : ""} recorded</div>
                  <div className="text-red-600 text-xs mt-0.5">These are logged for your reference. No money was deducted.</div>
                </div>
                <button onClick={() => setActiveTab("history")} className="text-sm font-medium hover:underline" style={{ color: "#B07D3A" }}>View All</button>
              </div>
            )}

            {/* Chart */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-slate-800 text-base mb-4 font-semibold">Donations — Last 6 Months</h3>
              {chartData.some(d => d.amount > 0) ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={v => `₹${v >= 1000 ? (v/1000)+"K" : v}`} />
                    <Tooltip formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Amount"]} />
                    <Bar dataKey="amount" fill="#B07D3A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-slate-400 text-sm gap-3">
                  <Heart size={32} className="text-slate-200" />
                  No donations yet.
                  <Link to="/donate" className="text-sm font-semibold" style={{ color: "#B07D3A" }}>Make your first donation!</Link>
                </div>
              )}
            </div>

            {/* Recent */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-800 text-base font-semibold">Recent Transactions</h3>
                <button onClick={() => setActiveTab("history")} className="text-sm text-teal-600 hover:underline">View All</button>
              </div>
              {donations.length === 0 ? (
                <div className="text-center py-8">
                  <Heart size={40} className="text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm mb-4">No transactions yet.</p>
                  <Link to="/donate" className="btn-gold text-white px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#B07D3A" }}>Make Your First Donation</Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {donations.slice(0, 6).map(d => (
                    <div
                      key={d.id}
                      onClick={() => d.status === "success" && setSelectedDonation(d)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${d.status === "success" ? "bg-slate-50 hover:bg-slate-100 cursor-pointer border-slate-100" : "bg-red-50 border-red-100 cursor-default"}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}
                        style={{ background: d.status === "success" ? "#FAF5EA" : "#FEF2F2" }}>
                        {d.status === "success"
                          ? <Heart size={16} style={{ color: "#B07D3A", fill: "#B07D3A" }} />
                          : <AlertCircle size={16} style={{ color: "#A8200D" }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-slate-800 truncate font-medium">{d.causeName}</div>
                        <div className="text-xs text-slate-400">{new Date(d.createdAt).toLocaleDateString("en-IN")}</div>
                      </div>
                      <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                        <div className={`text-sm font-bold`} style={{ color: d.status === "success" ? "#B07D3A" : "#A8200D" }}>
                          ₹{d.amount.toLocaleString("en-IN")}
                        </div>
                        {statusBadge(d.status)}
                        {d.status === "success" && (
                          <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "#8C6228" }}><Eye size={10} /> Receipt</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        )}

        {/* ── HISTORY ── */}
        {activeTab === "history" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-slate-800 font-semibold flex items-center gap-2" style={{ color: "#1C1C1A" }}>
                  All Transactions
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#FAF5EA", color: "#8C6228" }}>{donations.length}</span>
                </h3>
                <button onClick={loadData} className="flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      {["Date", "Receipt No.", "Cause", "Amount", "Type", "Status", "80G", ""].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-slate-500 text-xs font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {donations.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-14 text-slate-400 text-sm">
                          <Heart size={32} className="mx-auto mb-3 text-slate-200" />
                          No transactions yet. <Link to="/donate" className="font-semibold hover:underline" style={{ color: "#B07D3A" }}>Donate now</Link>
                        </td>
                      </tr>
                    ) : donations.map(d => (
                      <tr key={d.id} className={`border-t border-slate-100 ${d.status === "failed" ? "bg-red-50/40" : "hover:bg-slate-50/50"}`}>
                        <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString("en-IN")}</td>
                        <td className="px-4 py-3"><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{d.receiptNo}</code></td>
                        <td className="px-4 py-3 text-slate-700 max-w-[120px] truncate text-xs">{d.causeName}</td>
                        <td className={`px-4 py-3 font-bold text-sm whitespace-nowrap`} style={{ color: d.status === "failed" ? "#A8200D" : "#B07D3A" }}>
                          ₹{d.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3 text-slate-500 capitalize text-xs">{d.frequency}</td>
                        <td className="px-4 py-3">{statusBadge(d.status)}</td>
                        <td className="px-4 py-3">
                          {d.certificate80G
                            ? <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "#4A6741" }}><CheckCircle2 size={12} /> 80G</span>
                            : <span className="text-slate-300 text-xs">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          {d.status === "success" && (
                            <button
                              onClick={() => setSelectedDonation(d)}
                              className="flex items-center gap-1 text-xs border px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium"
                              style={{ color: "#B07D3A", borderColor: "#E8D5AF" }}
                            >
                              <Eye size={11} /> View
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {donations.length > 0 && (
                <div className="px-5 py-3 border-t text-xs flex items-center justify-between" style={{ background: "#F8F5EF", borderColor: "#E5E0D8", color: "#6B6B60" }}>
                  <span>{successDonations.length} successful · {failedDonations.length} failed</span>
                  <span>Total: <strong style={{ color: "#B07D3A" }}>₹{totalDonated.toLocaleString("en-IN")}</strong></span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── IMPACT ── */}
        {activeTab === "impact" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="rounded-2xl p-6 text-white" style={{ background: "#1B2B3A" }}>
              <div className="text-white/70 text-sm mb-1">Your Total Contribution</div>
              <div className="text-4xl mb-2 font-extrabold">₹{totalDonated.toLocaleString("en-IN")}</div>
              <div className="text-white/80 text-sm">Across {totalCauses} cause{totalCauses !== 1 ? "s" : ""} · {successDonations.length} donation{successDonations.length !== 1 ? "s" : ""}</div>
            </div>
            {totalDonated > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "👶", title: "Children educated",  value: Math.floor(totalDonated / 500),  label: "for a week each" },
                  { emoji: "📚", title: "Learning kits funded", value: Math.floor(totalDonated / 300), label: "distributed" },
                  { emoji: "🧑‍🏫", title: "Teacher workshops",  value: Math.floor(totalDonated / 1000), label: "supported" },
                  { emoji: "🏫", title: "School days",         value: Math.floor(totalDonated / 150),  label: "powered" },
                ].map(item => (
                  <div key={item.title} className="bg-white rounded-2xl shadow-sm p-5 text-center" style={{ border: "1px solid #E5E0D8" }}>
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="text-2xl mb-0.5 font-extrabold" style={{ color: "#B07D3A" }}>{item.value.toLocaleString()}</div>
                    <div className="text-sm font-medium" style={{ color: "#1C1C1A" }}>{item.title}</div>
                    <div className="text-xs" style={{ color: "#6B6B60" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                <TrendingUp size={40} className="text-slate-200 mx-auto mb-3" />
                <p className="text-slate-500 text-sm mb-4">Make your first donation to see your impact!</p>
                <Link to="/donate" className="btn-gold text-white px-6 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#B07D3A" }}>Donate Now</Link>
              </div>
            )}
          </motion.div>
        )}

        {/* ── MY COURSES — hidden until LMS is re-enabled ── */}

        {/* ── PROFILE ── */}
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold" style={{ background: "#1B2B3A" }}>
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-slate-900 text-lg font-bold">{user.name}</div>
                  <div className="text-slate-500 text-sm">{user.email}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Shield size={12} className="text-green-500" />
                    <span className="text-xs text-green-600 font-medium">Verified Donor</span>
                  </div>
                </div>
              </div>
              {[
                { label: "Full Name",    value: user.name },
                { label: "Email",        value: user.email },
                { label: "Phone",        value: user.phone || "Not added" },
                { label: "Donor Type",   value: user.donorType || "Indian" },
                { label: "Country",      value: user.country || "India" },
                { label: "Member Since", value: new Date(user.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" }) },
              ].map(f => (
                <div key={f.label} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-500">{f.label}</span>
                  <span className="text-sm text-slate-800 font-medium">{f.value}</span>
                </div>
              ))}
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-sm hover:bg-red-100 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <DonationReceiptModal donation={selectedDonation} onClose={() => setSelectedDonation(null)} />
    </div>
  );
}