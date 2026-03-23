import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Award, Download, CheckCircle2, Loader2, ChevronLeft, Star } from "lucide-react";
import { lmsApi } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

export function CertificatePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/auth", { replace: true }); return; }
    lmsApi.getCertificate(courseId!).then(r => {
      setCertificate(r.certificate);
    }).catch(e => {
      setError(e.message || "Certificate not found. Please complete the course quiz first.");
    }).finally(() => setLoading(false));
  }, [courseId, user, authLoading]);

  function handlePrint() { window.print(); }

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={28} className="animate-spin text-teal-500" />
    </div>
  );

  if (error || !certificate) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <Award size={48} className="mx-auto mb-4 text-slate-300" />
        <p className="text-slate-600 mb-4">{error || "Certificate not found."}</p>
        <Link to={`/lms/learn/${courseId}`} className="text-teal-600 hover:underline text-sm">
          ← Back to Course
        </Link>
      </div>
    </div>
  );

  const issueDate = new Date(certificate.issuedAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Actions */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link to="/lms/dashboard" className="flex items-center gap-1.5 text-slate-600 hover:text-teal-600 text-sm transition-colors">
            <ChevronLeft size={16} /> My Dashboard
          </Link>
          <button onClick={handlePrint}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm transition-colors"
            style={{ fontWeight: 600 }}>
            <Download size={16} /> Download / Print
          </button>
        </div>

        {/* Certificate */}
        <div ref={certRef}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-double border-teal-600 print:shadow-none print:rounded-none"
          style={{ fontFamily: "Georgia, serif" }}>
          {/* Top banner */}
          <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 p-6 text-center">
            <div className="flex items-center justify-center gap-3 text-white">
              <Award size={32} className="text-yellow-300" />
              <div>
                <div className="text-xs tracking-widest text-teal-200 uppercase" style={{ fontFamily: "sans-serif" }}>Asha Kiran Foundation</div>
                <div className="text-2xl text-white" style={{ fontWeight: 700 }}>Certificate of Completion</div>
              </div>
              <Award size={32} className="text-yellow-300" />
            </div>
          </div>

          {/* Body */}
          <div className="p-10 text-center relative">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-teal-300 rounded-tl-xl" />
            <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-teal-300 rounded-tr-xl" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-teal-300 rounded-bl-xl" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-teal-300 rounded-br-xl" />

            <p className="text-slate-500 text-sm mb-4 tracking-wide uppercase" style={{ fontFamily: "sans-serif", fontWeight: 600 }}>
              This is to certify that
            </p>
            <div className="text-5xl text-teal-700 mb-2" style={{ fontWeight: 700 }}>
              {certificate.recipientName}
            </div>
            <div className="w-48 h-0.5 bg-teal-300 mx-auto mb-6" />

            <p className="text-slate-500 text-sm mb-3 tracking-wide" style={{ fontFamily: "sans-serif" }}>
              has successfully completed the course
            </p>
            <div className="text-2xl text-slate-900 mb-2 px-8" style={{ fontWeight: 700 }}>
              "{certificate.courseName}"
            </div>
            <p className="text-slate-400 text-sm mb-8" style={{ fontFamily: "sans-serif" }}>
              taught by <span className="text-slate-600" style={{ fontWeight: 600 }}>{certificate.instructorName}</span>
            </p>

            {/* Score badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-green-50 border border-teal-200 rounded-2xl px-8 py-4 mb-8">
              <Star size={24} className="text-yellow-500" fill="currentColor" />
              <div>
                <div className="text-3xl text-teal-700" style={{ fontWeight: 800 }}>{certificate.score}%</div>
                <div className="text-xs text-slate-500" style={{ fontFamily: "sans-serif" }}>Final Score</div>
              </div>
              <CheckCircle2 size={24} className="text-green-500" />
            </div>

            <div className="grid grid-cols-2 gap-8 text-center mt-4">
              <div>
                <div className="w-32 h-0.5 bg-slate-300 mx-auto mb-2" />
                <p className="text-slate-700 text-sm" style={{ fontWeight: 600 }}>{issueDate}</p>
                <p className="text-slate-400 text-xs" style={{ fontFamily: "sans-serif" }}>Date of Issue</p>
              </div>
              <div>
                <div className="w-32 h-0.5 bg-slate-300 mx-auto mb-2" />
                <p className="text-slate-700 text-sm" style={{ fontWeight: 600 }}>Ujjwala Wadekar</p>
                <p className="text-slate-400 text-xs" style={{ fontFamily: "sans-serif" }}>Founder, Asha Kiran Foundation</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400" style={{ fontFamily: "sans-serif" }}>
                Certificate ID: <span className="font-mono text-slate-500">{certificate.id}</span>
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 text-center">
            <p className="text-white text-xs tracking-wide" style={{ fontFamily: "sans-serif" }}>
              🙏 Empowering Communities · Building Futures · Asha Kiran Foundation · ashakiran.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}