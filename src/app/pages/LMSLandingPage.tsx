import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  BookOpen, Play, Award, Users, Star, Clock, ChevronRight,
  GraduationCap, Wifi, Globe, Loader2, Search, Filter
} from "lucide-react";
import { lmsApi, Course } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

const CATEGORIES = ["All", "Digital Literacy", "Agriculture", "Health", "Finance", "Environment"];
const LEVELS = ["All", "beginner", "intermediate", "advanced"];

export function LMSLandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  useEffect(() => {
    lmsApi.getCourses().then(r => setCourses(r.courses)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    const matchLevel = level === "All" || c.level === level;
    return matchSearch && matchCat && matchLevel;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-6" style={{ fontWeight: 600 }}>
              <GraduationCap size={16} /> Asha Kiran Learning Centre
            </div>
            <h1 className="text-4xl md:text-5xl mb-4" style={{ fontWeight: 800 }}>
              Learn. Grow. Transform.
            </h1>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-8">
              Free skill-development courses in Digital Literacy, Agriculture, Health & Finance — designed for rural and underserved communities across India.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {user ? (
                <Link to="/lms/dashboard" className="bg-white text-teal-700 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-teal-50 transition-colors" style={{ fontWeight: 700 }}>
                  <BookOpen size={18} /> My Learning Dashboard
                </Link>
              ) : (
                <Link to="/auth" className="bg-white text-teal-700 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-teal-50 transition-colors" style={{ fontWeight: 700 }}>
                  <Play size={18} /> Start Learning Free
                </Link>
              )}
              <div className="flex items-center gap-4 text-sm text-teal-100">
                <span className="flex items-center gap-1"><Users size={14} /> {courses.reduce((s, c) => s + c.enrolledCount, 0).toLocaleString()}+ learners</span>
                <span className="flex items-center gap-1"><Award size={14} /> Free certificates</span>
                <span className="flex items-center gap-1"><Wifi size={14} /> Works on mobile</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: <BookOpen size={18} className="text-teal-600" />, label: `${courses.length} Courses` },
            { icon: <Globe size={18} className="text-orange-500" />, label: "Hindi + English" },
            { icon: <Award size={18} className="text-purple-600" />, label: "80G Tax Benefit" },
            { icon: <Star size={18} className="text-yellow-500" />, label: "Expert Instructors" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-700 text-sm" style={{ fontWeight: 600 }}>
              {s.icon} {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 bg-white"
            />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-teal-400">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={level} onChange={e => setLevel(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-teal-400 capitalize">
            {LEVELS.map(l => <option key={l} value={l} className="capitalize">{l === "All" ? "All Levels" : l}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={32} className="animate-spin text-teal-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>No courses found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/lms/course/${course.id}`} className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all overflow-hidden">
                  <div className="relative">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-teal-600 text-white text-xs px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>{course.category}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 text-slate-700 text-xs px-2.5 py-1 rounded-full capitalize" style={{ fontWeight: 600 }}>{course.level}</span>
                    </div>
                    {course.price === 0 && (
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full" style={{ fontWeight: 700 }}>FREE</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-slate-900 text-sm mb-1 leading-snug" style={{ fontWeight: 700 }}>{course.title}</h3>
                    <p className="text-slate-500 text-xs mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1"><Clock size={12} /> {course.durationHours}h</span>
                      <span className="flex items-center gap-1"><BookOpen size={12} /> {course.lessons?.length || 0} lessons</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {course.enrolledCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs text-slate-600" style={{ fontWeight: 600 }}>{course.rating}</span>
                      </div>
                      <span className="text-teal-600 text-xs flex items-center gap-1" style={{ fontWeight: 600 }}>
                        View Course <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
