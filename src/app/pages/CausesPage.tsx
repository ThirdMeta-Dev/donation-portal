import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Heart, Loader2 } from "lucide-react";
import { CauseCard } from "../components/CauseCard";
import { causeApi, CauseFull } from "../lib/api";

const CATEGORIES = ["All", "Education", "Nutrition", "Water & Sanitation", "Healthcare", "Environment", "Women Empowerment", "Other"];

export function CausesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState<"urgent" | "progress" | "donors">("urgent");

  const [causes, setCauses] = useState<CauseFull[]>([]);
  const [liveStats, setLiveStats] = useState<Record<string, { raised: number; donors: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([causeApi.getCauses(), causeApi.getStats()]).then(([causesRes, statsRes]) => {
      if (causesRes.status === "fulfilled") setCauses(causesRes.value.causes || []);
      if (statsRes.status === "fulfilled") setLiveStats(statsRes.value.stats || {});
      setLoading(false);
    });
  }, []);

  const filtered = causes
    .filter(c => activeCategory === "All" || c.category === activeCategory)
    .filter(c => !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "urgent") return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
      if (sort === "progress") {
        const aTotal = (a.raised + (liveStats[a.id]?.raised ?? 0)) / a.goal;
        const bTotal = (b.raised + (liveStats[b.id]?.raised ?? 0)) / b.goal;
        return bTotal - aTotal;
      }
      if (sort === "donors") {
        return (b.donors + (liveStats[b.id]?.donors ?? 0)) - (a.donors + (liveStats[a.id]?.donors ?? 0));
      }
      return 0;
    });

  const causes80G = causes.filter(c => c.enable80G !== false).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-4" style={{ fontWeight: 600 }}>
              Make a Difference
            </span>
            <h1 className="text-white text-4xl md:text-5xl mb-4" style={{ fontWeight: 800 }}>Our Active Causes</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Verified, transparent causes. {causes80G > 0 ? `${causes80G} of ${causes.length}` : "Several"} causes are 80G tax-deductible.
            </p>
            <div className="flex justify-center gap-6 mt-6 flex-wrap">
              {[
                { n: causes.length ? causes.length.toString() : "—", l: "Active Causes" },
                { n: causes80G ? `${causes80G}/${causes.length}` : "—", l: "80G Eligible" },
                { n: "FCRA", l: "Foreign Accepted" },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-white text-xl" style={{ fontWeight: 800 }}>{s.n}</div>
                  <div className="text-white/60 text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm"
                placeholder="Search causes..."
              />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value as any)}
              className="px-3 py-2.5 border border-slate-200 rounded-xl focus:border-orange-400 focus:outline-none text-sm text-slate-700">
              <option value="urgent">Sort by: Urgent First</option>
              <option value="progress">Sort by: Progress</option>
              <option value="donors">Sort by: Most Donors</option>
            </select>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {CATEGORIES.filter(cat => cat === "All" || causes.some(c => c.category === cat)).map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${activeCategory === cat ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                style={{ fontWeight: activeCategory === cat ? 600 : 400 }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="text-orange-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500">
              No causes match your search.{" "}
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="text-orange-500 hover:underline">
                Clear filters
              </button>
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-slate-500">{filtered.length} cause{filtered.length !== 1 ? "s" : ""} found</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((cause, i) => (
                <motion.div key={cause.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <CauseCard
                    cause={cause}
                    liveRaised={liveStats[cause.id]?.raised}
                    liveDonors={liveStats[cause.id]?.donors}
                    enable80G={cause.enable80G}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
