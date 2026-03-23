import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  BookOpen, Play, Award, GraduationCap, Clock, CheckCircle2,
  Loader2, Star, Plus, BarChart3
} from "lucide-react";
import { lmsApi, Course, EnrollmentWithCourse } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

export function LMSDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "inprogress" | "completed">("all");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/auth", { replace: true }); return; }
    Promise.allSettled([lmsApi.getEnrollments(), lmsApi.getCourses()]).then(([eRes, cRes]) => {
      if (eRes.status === "fulfilled") setEnrollments(eRes.value.enrollments || []);
      if (cRes.status === "fulfilled") setAllCourses(cRes.value.courses || []);
    }).finally(() => setLoading(false));
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 size={32} className="text-teal-600 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const inProgress = enrollments.filter(e => !e.quizPassed && (e.completedLessons?.length || 0) > 0);
  const notStarted = enrollments.filter(e => (e.completedLessons?.length || 0) === 0 && !e.quizPassed);
  const completed = enrollments.filter(e => e.quizPassed);
  const notEnrolled = allCourses.filter(c => !enrollments.find(e => e.courseId === c.id));
  const totalLessonsCompleted = enrollments.reduce((s, e) => s + (e.completedLessons?.length || 0), 0);

  const TABS = [
    { id: "all", label: "All Courses", count: enrollments.length },
    { id: "inprogress", label: "In Progress", count: inProgress.length },
    { id: "completed", label: "Completed", count: completed.length },
  ] as const;

  function CourseCard({ e }: { e: EnrollmentWithCourse }) {
    const pct = e.courseLessonCount ? Math.round(((e.completedLessons?.length || 0) / e.courseLessonCount) * 100) : 0;
    const statusColor = e.quizPassed ? "bg-green-100 text-green-700" : (e.completedLessons?.length || 0) > 0 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500";
    const statusLabel = e.quizPassed ? "Completed ✓" : (e.completedLessons?.length || 0) > 0 ? "In Progress" : "Not Started";

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          {e.courseThumbnail ? (
            <img src={e.courseThumbnail} alt={e.courseTitle} className="w-full h-32 object-cover" />
          ) : (
            <div className="w-full h-32 bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <BookOpen size={32} className="text-white/60" />
            </div>
          )}
          <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${statusColor}`} style={{ fontWeight: 600 }}>{statusLabel}</span>
        </div>
        <div className="p-4">
          <h3 className="text-slate-900 text-sm mb-2 leading-snug" style={{ fontWeight: 700 }}>{e.courseTitle || e.courseId}</h3>
          <div className="mb-3">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>{e.completedLessons?.length || 0}/{e.courseLessonCount || 0} lessons</span>
              <span style={{ fontWeight: 600 }}>{pct}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/lms/learn/${e.courseId}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-xs transition-colors"
              style={{ fontWeight: 600 }}>
              <Play size={12} /> {(e.completedLessons?.length || 0) > 0 ? "Continue" : "Start"}
            </Link>
            {e.quizPassed && (
              <Link to={`/lms/certificate/${e.courseId}`}
                className="flex items-center justify-center gap-1 border border-yellow-300 text-yellow-700 px-3 py-2 rounded-lg text-xs hover:bg-yellow-50 transition-colors"
                style={{ fontWeight: 600 }}>
                <Award size={12} /> Cert
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const displayEnrollments = activeTab === "inprogress" ? inProgress : activeTab === "completed" ? completed : enrollments;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-700 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap size={20} />
                <span className="text-teal-200 text-sm">Learning Dashboard</span>
              </div>
              <h1 className="text-3xl" style={{ fontWeight: 800 }}>Welcome back, {user.name.split(" ")[0]}!</h1>
              <p className="text-teal-200 text-sm mt-1">Keep learning, keep growing 🌱</p>
            </div>
            <Link to="/lms" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors" style={{ fontWeight: 600 }}>
              <Plus size={14} /> Browse Courses
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { icon: <BookOpen size={16} />, label: "Enrolled", value: enrollments.length },
              { icon: <CheckCircle2 size={16} />, label: "Lessons Done", value: totalLessonsCompleted },
              { icon: <BarChart3 size={16} />, label: "In Progress", value: inProgress.length },
              { icon: <Award size={16} />, label: "Certificates", value: completed.length },
            ].map((s, i) => (
              <div key={i} className="bg-white/15 rounded-xl p-3 text-center">
                <div className="flex justify-center mb-1 text-teal-200">{s.icon}</div>
                <div className="text-2xl" style={{ fontWeight: 800 }}>{s.value}</div>
                <div className="text-teal-200 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-teal-500" />
          </div>
        ) : enrollments.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <GraduationCap size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-slate-700 text-xl mb-2" style={{ fontWeight: 700 }}>No courses yet</h3>
            <p className="text-slate-400 mb-6">Start your learning journey today!</p>
            <Link to="/lms" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors" style={{ fontWeight: 600 }}>
              <BookOpen size={16} /> Browse Courses
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-200">
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px ${activeTab === tab.id ? "border-teal-500 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                  style={{ fontWeight: activeTab === tab.id ? 700 : 400 }}>
                  {tab.label} {tab.count > 0 && <span className="ml-1 bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded-full">{tab.count}</span>}
                </button>
              ))}
            </div>

            {displayEnrollments.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <CheckCircle2 size={32} className="mx-auto mb-3 opacity-30" />
                <p>No courses in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayEnrollments.map(e => <CourseCard key={e.courseId} e={e} />)}
              </div>
            )}

            {/* Discover more */}
            {notEnrolled.length > 0 && (
              <div className="mt-10">
                <h2 className="text-slate-900 text-lg mb-4" style={{ fontWeight: 700 }}>Discover More Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {notEnrolled.slice(0, 3).map(c => (
                    <Link key={c.id} to={`/lms/course/${c.id}`}
                      className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3 hover:border-teal-300 hover:shadow-md transition-all group">
                      <img src={c.thumbnail} alt={c.title} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-slate-900 text-sm truncate" style={{ fontWeight: 600 }}>{c.title}</p>
                        <p className="text-slate-400 text-xs">{c.lessons?.length} lessons · {c.durationHours}h</p>
                      </div>
                      <Play size={14} className="text-teal-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}