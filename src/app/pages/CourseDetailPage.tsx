import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  BookOpen, Play, Award, Users, Star, Clock, CheckCircle2,
  ChevronLeft, Video, FileText, Calendar, Loader2, Globe, BarChart2
} from "lucide-react";
import { lmsApi, Course, Enrollment } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { course: c } = await lmsApi.getCourse(id!);
        setCourse(c);
        if (user) {
          try {
            const { enrollment: e } = await lmsApi.getEnrollment(id!);
            if (e) setEnrollment(e);
          } catch { /* not enrolled */ }
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    if (id) load();
  }, [id, user]);

  async function handleEnroll() {
    if (!user) { navigate("/auth", { state: { returnTo: `/lms/course/${id}` } }); return; }
    setEnrolling(true);
    try {
      await lmsApi.enroll(id!);
    } catch { /* already enrolled is fine */ }
    navigate(`/lms/learn/${id}`);
  }

  const completedCount = enrollment?.completedLessons?.length || 0;
  const progressPct = course?.lessons?.length ? Math.round((completedCount / course.lessons.length) * 100) : 0;

  const ICON_MAP: Record<string, React.ReactNode> = {
    video: <Video size={14} className="text-blue-500" />,
    live: <Calendar size={14} className="text-red-500" />,
    reading: <FileText size={14} className="text-green-500" />,
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-teal-500" />
    </div>
  );

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">Course not found.</p>
        <Link to="/lms" className="text-teal-600 hover:underline">Back to Courses</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <Link to="/lms" className="inline-flex items-center gap-1.5 text-teal-300 hover:text-white text-sm mb-6 transition-colors">
            <ChevronLeft size={16} /> All Courses
          </Link>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <span className="bg-teal-500/30 text-teal-200 text-xs px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>{course.category}</span>
              <h1 className="text-3xl mt-3 mb-3 leading-tight" style={{ fontWeight: 800 }}>{course.title}</h1>
              <p className="text-slate-300 mb-4">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400" fill="currentColor" /> {course.rating} rating</span>
                <span className="flex items-center gap-1.5"><Users size={14} /> {course.enrolledCount} learners</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> {course.durationHours}h total</span>
                <span className="flex items-center gap-1.5"><Globe size={14} /> {course.language}</span>
                <span className="flex items-center gap-1.5 capitalize"><BarChart2 size={14} /> {course.level}</span>
              </div>
              <p className="text-slate-400 text-sm mt-3">By <span className="text-white" style={{ fontWeight: 600 }}>{course.instructor}</span></p>
            </div>

            {/* Enroll card */}
            <div className="bg-white rounded-2xl p-5 text-slate-900 shadow-xl">
              <img src={course.thumbnail} alt={course.title} className="w-full h-36 object-cover rounded-xl mb-4" />
              <div className="text-2xl text-green-600 mb-1" style={{ fontWeight: 800 }}>
                {course.price === 0 ? "FREE" : `₹${course.price}`}
              </div>
              {enrollment ? (
                <>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progress</span><span style={{ fontWeight: 600 }}>{progressPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{completedCount}/{course.lessons?.length} lessons complete</p>
                  </div>
                  <button onClick={() => navigate(`/lms/learn/${id}`)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    style={{ fontWeight: 700 }}>
                    <Play size={16} /> Continue Learning
                  </button>
                </>
              ) : (
                <button onClick={handleEnroll} disabled={enrolling}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                  style={{ fontWeight: 700 }}>
                  {enrolling ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                  {enrolling ? "Enrolling..." : "Enroll Now — Free"}
                </button>
              )}
              <div className="mt-4 space-y-2 text-xs text-slate-500">
                {[
                  { icon: <BookOpen size={12} />, text: `${course.lessons?.length} lessons` },
                  { icon: <Award size={12} />, text: "Free certificate on completion" },
                  { icon: <Globe size={12} />, text: `Available in ${course.language}` },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">{item.icon}{item.text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-slate-900 text-lg mb-3" style={{ fontWeight: 700 }}>About This Course</h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{course.longDescription}</p>
          </div>

          {/* Lessons */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-slate-900 text-lg mb-4" style={{ fontWeight: 700 }}>
              Course Content <span className="text-slate-400 text-sm ml-2" style={{ fontWeight: 400 }}>{course.lessons?.length} lessons</span>
            </h2>
            <div className="space-y-2">
              {(course.lessons || []).map((lesson, i) => {
                const isCompleted = enrollment?.completedLessons?.includes(lesson.id);
                return (
                  <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs flex-shrink-0" style={{ fontWeight: 600 }}>
                      {isCompleted ? <CheckCircle2 size={14} className="text-teal-500" /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 text-sm truncate" style={{ fontWeight: 500 }}>{lesson.title}</p>
                      <p className="text-slate-400 text-xs">{lesson.duration} · {lesson.type}</p>
                    </div>
                    {ICON_MAP[lesson.type]}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="text-slate-900 mb-3" style={{ fontWeight: 700 }}>Instructor</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-lg" style={{ fontWeight: 700 }}>
                {course.instructor[0]}
              </div>
              <div>
                <p className="text-slate-900 text-sm" style={{ fontWeight: 600 }}>{course.instructor}</p>
                <p className="text-slate-400 text-xs">Expert Educator</p>
              </div>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">{course.instructorBio}</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="text-slate-900 mb-3" style={{ fontWeight: 700 }}>Tags</h3>
            <div className="flex flex-wrap gap-2">
              {(course.tags || []).map(tag => (
                <span key={tag} className="bg-teal-50 text-teal-700 text-xs px-2.5 py-1 rounded-full border border-teal-100">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
