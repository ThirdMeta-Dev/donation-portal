import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft, ChevronRight, CheckCircle2, Award, Play, BookOpen,
  FileText, Calendar, Menu, X, Clock, Loader2, ExternalLink,
  AlertCircle, Video
} from "lucide-react";
import { lmsApi, Course, Enrollment, QuizResult } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

type View = "lesson" | "quiz" | "result";

function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match?.[1] || null;
}

export function CoursePlayerPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [view, setView] = useState<View>("lesson");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [markingComplete, setMarkingComplete] = useState(false);
  const [markError, setMarkError] = useState("");
  const [lessonTimer, setLessonTimer] = useState(0);
  const [lessonActive, setLessonActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [certificate, setCertificate] = useState<any>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth", { replace: true, state: { returnTo: `/lms/learn/${courseId}` } });
      return;
    }
    if (!courseId) return;
    loadData();
  }, [courseId, user, authLoading]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  async function loadData() {
    setLoading(true);
    setLoadError("");
    try {
      // Load course (public endpoint — always works)
      const { course: c } = await lmsApi.getCourse(courseId!);
      setCourse(c);
      setAnswers(new Array(c.quiz?.questions?.length || 5).fill(null));

      // Enroll or fetch existing enrollment
      try {
        const { enrollment: e } = await lmsApi.enroll(courseId!);
        setEnrollment(e);
        if (e.lastLessonId) {
          const idx = c.lessons.findIndex((l: any) => l.id === e.lastLessonId);
          if (idx >= 0) setCurrentLessonIdx(idx);
        }
      } catch (enrollErr: any) {
        // Don't block the player — just warn and continue with empty enrollment
        console.warn("Enrollment call failed, showing player without progress:", enrollErr.message);
        setEnrollment({ userId: user?.id || "", courseId: courseId!, enrolledAt: new Date().toISOString(), completedLessons: [], quizScore: null });
      }
    } catch (e: any) {
      console.error("Course load error:", e);
      setLoadError("Could not load the course. Please check your connection and try again.");
    }
    setLoading(false);
  }

  function startLesson() {
    setLessonActive(true); setLessonTimer(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setLessonTimer(t => t + 1), 1000);
  }

  async function markLessonComplete() {
    if (!course) return;
    setMarkingComplete(true);
    setMarkError("");
    const lessonId = course.lessons[currentLessonIdx]?.id;
    try {
      const { enrollment: updated } = await lmsApi.updateProgress(courseId!, lessonId, true);
      setEnrollment(updated);
      if (timerRef.current) clearInterval(timerRef.current);
      setLessonActive(false);
      // Auto-advance to next lesson
      if (currentLessonIdx < course.lessons.length - 1) {
        setTimeout(() => { setCurrentLessonIdx(i => i + 1); setLessonTimer(0); }, 400);
      }
    } catch (e: any) {
      console.error("Progress update error:", e);
      setMarkError(e.message || "Failed to save. Please try again.");
    }
    setMarkingComplete(false);
  }

  async function submitQuiz() {
    if (!courseId || answers.some(a => a === null)) return;
    setSubmitting(true);
    try {
      const { result, certificate: cert } = await lmsApi.submitQuiz(courseId, answers as number[]);
      setQuizResult(result);
      if (cert) setCertificate(cert);
      setView("result");
    } catch (e: any) { console.error("Quiz submit error:", e); }
    setSubmitting(false);
  }

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center text-white">
        <Loader2 size={32} className="animate-spin mx-auto mb-3 text-teal-400" />
        <p className="text-white/60 text-sm">Loading course...</p>
      </div>
    </div>
  );

  if (loadError) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center text-white max-w-sm px-6">
        <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
        <p className="text-red-300 mb-4">{loadError}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={loadData} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl text-sm" style={{ fontWeight: 600 }}>Retry</button>
          <Link to={`/lms/course/${courseId}`} className="border border-slate-600 text-slate-300 hover:text-white px-5 py-2 rounded-xl text-sm">Back</Link>
        </div>
      </div>
    </div>
  );

  if (!course) return null;

  const lessons = course.lessons || [];
  const currentLesson = lessons[currentLessonIdx];
  const completedIds = enrollment?.completedLessons || [];
  const isCompleted = currentLesson && completedIds.includes(currentLesson.id);
  const allLessonsComplete = lessons.length > 0 && lessons.every(l => completedIds.includes(l.id));
  const progressPct = lessons.length > 0 ? Math.round((completedIds.length / lessons.length) * 100) : 0;

  const ICON_MAP: Record<string, React.ReactNode> = {
    video: <Video size={12} className="text-blue-400" />,
    live: <Calendar size={12} className="text-red-400" />,
    reading: <FileText size={12} className="text-green-400" />,
  };

  const ytId = currentLesson ? extractYouTubeId(currentLesson.videoUrl) : null;
  const jitsiRoom = currentLesson?.jitsiRoom || `AKF-${courseId?.replace(/[^a-zA-Z0-9]/g, "-")}-${currentLesson?.id}`;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Top bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(o => !o)} className="text-slate-400 hover:text-white transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to={`/lms/course/${courseId}`} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
            <ChevronLeft size={14} /> Back
          </Link>
          <div className="text-white text-sm truncate max-w-64 hidden md:block" style={{ fontWeight: 600 }}>{course.title}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <span>{progressPct}%</span>
          </div>
          {allLessonsComplete && (
            <button onClick={() => setView("quiz")}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              style={{ fontWeight: 600 }}>
              <Award size={12} /> Take Quiz
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              className="bg-slate-800 border-r border-slate-700 overflow-y-auto flex-shrink-0"
            >
              <div className="p-4">
                <div className="text-white text-xs mb-3" style={{ fontWeight: 600 }}>COURSE CONTENT</div>
                <div className="space-y-1">
                  {lessons.map((lesson, i) => {
                    const done = completedIds.includes(lesson.id);
                    const active = i === currentLessonIdx && view === "lesson";
                    return (
                      <button key={lesson.id}
                        onClick={() => { setCurrentLessonIdx(i); setView("lesson"); setLessonActive(false); setLessonTimer(0); if (timerRef.current) clearInterval(timerRef.current); }}
                        className={`w-full text-left flex items-start gap-2.5 p-2.5 rounded-lg transition-all text-xs ${active ? "bg-teal-600 text-white" : done ? "text-slate-300 hover:bg-slate-700" : "text-slate-400 hover:bg-slate-700"}`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {done ? <CheckCircle2 size={14} className={active ? "text-white" : "text-teal-400"} /> : ICON_MAP[lesson.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="leading-snug" style={{ fontWeight: active ? 600 : 400 }}>{lesson.title}</div>
                          <div className={`text-xs mt-0.5 ${active ? "text-white/70" : "text-slate-500"}`}>{lesson.duration} · {lesson.type}</div>
                        </div>
                      </button>
                    );
                  })}

                  <button onClick={() => { if (allLessonsComplete) setView("quiz"); }}
                    disabled={!allLessonsComplete}
                    className={`w-full text-left flex items-start gap-2.5 p-2.5 rounded-lg transition-all text-xs mt-2 border border-dashed ${view === "quiz" || view === "result" ? "bg-purple-700 border-purple-500 text-white" : allLessonsComplete ? "border-purple-500 text-purple-300 hover:bg-purple-900/50" : "border-slate-600 text-slate-600 cursor-not-allowed"}`}
                  >
                    <Award size={14} className="flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div style={{ fontWeight: 600 }}>{course.quiz?.title}</div>
                      <div className="text-xs mt-0.5 opacity-70">{course.quiz?.questionCount} questions · {course.quiz?.passingScore}% to pass</div>
                    </div>
                    {enrollment?.quizPassed && <CheckCircle2 size={14} className="text-green-400 flex-shrink-0 mt-0.5" />}
                  </button>

                  {certificate && (
                    <Link to={`/lms/certificate/${courseId}`}
                      className="w-full text-left flex items-center gap-2.5 p-2.5 rounded-lg bg-yellow-900/50 border border-yellow-500 text-yellow-300 text-xs hover:bg-yellow-900 transition-colors mt-1"
                      style={{ fontWeight: 600 }}>
                      <Award size={14} className="text-yellow-400" /> View Certificate 🎉
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* ── LESSON VIEW ── */}
          {view === "lesson" && currentLesson && (
            <div className="max-w-4xl mx-auto">
              {/* Media */}
              <div className="relative bg-black">
                {currentLesson.type === "live" ? (
                  <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-red-900 to-pink-900">
                    <Calendar size={48} className="text-red-300 mb-4" />
                    <div className="text-white text-lg mb-2" style={{ fontWeight: 700 }}>Live Session</div>
                    <p className="text-white/70 text-sm mb-6 text-center px-4">Join the live class via Jitsi Meet</p>
                    <a href={`https://meet.jit.si/${jitsiRoom}`} target="_blank" rel="noopener noreferrer"
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
                      style={{ fontWeight: 700 }}>
                      <ExternalLink size={16} /> Join Live Class
                    </a>
                  </div>
                ) : currentLesson.type === "reading" ? (
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="text-center p-8">
                      <FileText size={48} className="text-green-400 mx-auto mb-4" />
                      <div className="text-white text-lg" style={{ fontWeight: 700 }}>Reading Material</div>
                      <p className="text-white/60 text-sm mt-2">Scroll down to read</p>
                    </div>
                  </div>
                ) : ytId ? (
                  <div className="aspect-video">
                    <iframe key={`${currentLesson.id}-${ytId}`}
                      src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                      title={currentLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen className="w-full h-full border-0" />
                  </div>
                ) : (
                  <div className="aspect-video relative overflow-hidden bg-slate-950">
                    <img src={currentLesson.thumbnail} alt={currentLesson.title}
                      className={`w-full h-full object-cover transition-all ${lessonActive ? "opacity-20 scale-105" : "opacity-80"}`} />
                    {!lessonActive ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <button onClick={startLesson}
                          className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 mb-4">
                          <Play size={32} className="text-teal-600 ml-1" />
                        </button>
                        <div className="text-white text-sm" style={{ fontWeight: 500 }}>Click to start lesson</div>
                        <div className="text-white/40 text-xs mt-1">Add a YouTube URL in admin to embed real video</div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-white text-xl mb-4" style={{ fontWeight: 700 }}>{currentLesson.title}</div>
                        <div className="flex items-center gap-3 bg-black/40 rounded-full px-5 py-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-white text-sm font-mono">
                            {String(Math.floor(lessonTimer / 60)).padStart(2, "0")}:{String(lessonTimer % 60).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span>Lesson {currentLessonIdx + 1} of {lessons.length}</span>
                      <span>·</span>
                      <Clock size={12} /><span>{currentLesson.duration}</span>
                      <span>·</span>
                      <span className="capitalize">{currentLesson.type}</span>
                    </div>
                    <h2 className="text-slate-900 text-xl" style={{ fontWeight: 700 }}>{currentLesson.title}</h2>
                  </div>
                  {isCompleted && (
                    <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-xl text-sm flex-shrink-0" style={{ fontWeight: 600 }}>
                      <CheckCircle2 size={15} /> Completed
                    </div>
                  )}
                </div>

                {currentLesson.type === "reading" && (
                  <div className="bg-slate-50 rounded-xl p-5 mb-5 border border-slate-200">
                    <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
                      {currentLesson.content || `Reading material for: "${currentLesson.title}". Content will appear here once added by the instructor.`}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button onClick={() => { setCurrentLessonIdx(i => Math.max(0, i - 1)); setMarkError(""); }} disabled={currentLessonIdx === 0}
                    className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors disabled:opacity-40">
                    <ChevronLeft size={16} /> Previous
                  </button>

                  {!isCompleted ? (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={currentLesson.type === "video" && !ytId && !lessonActive ? startLesson : markLessonComplete}
                        disabled={markingComplete}
                        className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
                        style={{ fontWeight: 600 }}>
                        {markingComplete ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                        {currentLesson.type === "video" && !ytId && !lessonActive ? "Start Lesson" : markingComplete ? "Saving..." : "Mark Complete"}
                      </button>
                      {markError && <p className="text-red-500 text-xs">{markError}</p>}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-4 py-2.5 rounded-xl text-sm" style={{ fontWeight: 600 }}>
                      <CheckCircle2 size={14} /> Done!
                    </div>
                  )}

                  {currentLessonIdx < lessons.length - 1 ? (
                    <button onClick={() => { setCurrentLessonIdx(i => i + 1); setLessonActive(false); setLessonTimer(0); setMarkError(""); if (timerRef.current) clearInterval(timerRef.current); }}
                      className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors ml-auto">
                      Next <ChevronRight size={16} />
                    </button>
                  ) : allLessonsComplete ? (
                    <button onClick={() => setView("quiz")}
                      className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm transition-colors ml-auto"
                      style={{ fontWeight: 600 }}>
                      <Award size={14} /> Take Final Quiz
                    </button>
                  ) : null}
                </div>

                {allLessonsComplete && !enrollment?.quizPassed && (
                  <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center gap-2 text-sm text-purple-700">
                    <Award size={16} />
                    <span>All lessons complete! Take the quiz to earn your certificate.</span>
                    <button onClick={() => setView("quiz")} className="ml-auto bg-purple-600 text-white px-3 py-1 rounded-lg text-xs" style={{ fontWeight: 600 }}>
                      Take Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── QUIZ VIEW ── */}
          {view === "quiz" && (
            <div className="max-w-3xl mx-auto p-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Award size={24} />
                      <h2 className="text-xl" style={{ fontWeight: 700 }}>Final Assessment</h2>
                    </div>
                    <p className="text-white/80 text-sm">{course.quiz?.title} · Pass with {course.quiz?.passingScore}% or above</p>
                  </div>
                  <div className="p-6 space-y-6">
                    {(course.quiz?.questions || []).map((q, qi) => (
                      <div key={q.id} className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5" style={{ fontWeight: 700 }}>{qi + 1}</div>
                          <p className="text-slate-800 text-sm leading-relaxed" style={{ fontWeight: 500 }}>{q.question}</p>
                        </div>
                        <div className="ml-10 space-y-2">
                          {q.options.map((opt, oi) => (
                            <button key={oi}
                              onClick={() => { const next = [...answers]; next[qi] = oi; setAnswers(next); }}
                              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${answers[qi] === oi ? "border-purple-500 bg-purple-50 text-purple-800" : "border-slate-200 text-slate-700 hover:border-slate-300"}`}
                              style={{ fontWeight: answers[qi] === oi ? 600 : 400 }}>
                              <span className="w-5 h-5 rounded-full border-2 inline-flex items-center justify-center mr-2 flex-shrink-0"
                                style={{ borderColor: answers[qi] === oi ? "#7c3aed" : "#cbd5e1" }}>
                                {answers[qi] === oi && <span className="w-2.5 h-2.5 rounded-full bg-purple-600 block" />}
                              </span>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                      <div className="text-sm text-slate-500">{answers.filter(a => a !== null).length} / {course.quiz?.questionCount} answered</div>
                      <button onClick={submitQuiz} disabled={submitting || answers.some(a => a === null)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                        style={{ fontWeight: 700 }}>
                        {submitting ? <Loader2 size={16} className="animate-spin" /> : <Award size={16} />}
                        {submitting ? "Grading..." : "Submit Quiz"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* ── RESULT VIEW ── */}
          {view === "result" && quizResult && (
            <div className="max-w-3xl mx-auto p-6">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className={`rounded-2xl overflow-hidden shadow-xl mb-6 ${quizResult.passed ? "bg-gradient-to-br from-green-500 to-teal-500" : "bg-gradient-to-br from-orange-500 to-red-500"}`}>
                  <div className="p-8 text-white text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      {quizResult.passed ? <Award size={44} className="text-white" /> : <AlertCircle size={44} className="text-white" />}
                    </motion.div>
                    <h2 className="text-3xl mb-2" style={{ fontWeight: 800 }}>{quizResult.passed ? "Congratulations! 🎉" : "Almost There!"}</h2>
                    <div className="text-6xl mb-3" style={{ fontWeight: 900 }}>{quizResult.score}%</div>
                    <p className="text-white/80">
                      {quizResult.passed
                        ? `You passed! ${quizResult.results.filter(r => r.correct).length} out of ${quizResult.results.length} correct.`
                        : `${quizResult.results.filter(r => r.correct).length}/${quizResult.results.length} correct. Need ${course.quiz?.passingScore}% to pass.`}
                    </p>
                  </div>
                </div>

                {quizResult.passed && certificate && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-5 text-center mb-6">
                    <div className="text-3xl mb-2">🏆</div>
                    <h3 className="text-slate-900 text-lg mb-1" style={{ fontWeight: 700 }}>Certificate Issued!</h3>
                    <Link to={`/lms/certificate/${courseId}`}
                      className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl transition-colors mt-3"
                      style={{ fontWeight: 700 }}>
                      <Award size={18} /> View & Download Certificate
                    </Link>
                  </motion.div>
                )}

                {!quizResult.passed && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 text-center">
                    <p className="text-slate-600 text-sm mb-3">Review your answers and try again.</p>
                    <button onClick={() => { setView("quiz"); setAnswers(new Array(course.quiz?.questions?.length || 5).fill(null)); }}
                      className="flex items-center gap-2 mx-auto bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm transition-colors"
                      style={{ fontWeight: 600 }}>
                      Retake Quiz
                    </button>
                  </div>
                )}

                {/* Answer review */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-slate-900 mb-4" style={{ fontWeight: 700 }}>Answer Review</h3>
                  <div className="space-y-4">
                    {quizResult.results.map((r, i) => {
                      const q = course.quiz?.questions?.[i];
                      return (
                        <div key={i} className={`p-4 rounded-xl border ${r.correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                          <div className="flex items-start gap-2 mb-2">
                            {r.correct ? <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" /> : <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />}
                            <p className="text-sm text-slate-800" style={{ fontWeight: 500 }}>{q?.question}</p>
                          </div>
                          {!r.correct && (
                            <p className="text-xs text-green-700 ml-6">Correct: {q?.options[r.correctIndex]}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
