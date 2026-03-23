import { useLocation, Link } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, Download, Share2, Heart, ArrowRight, Mail, Star, Copy, ExternalLink, FileText } from "lucide-react";
import { FOUNDATION_NAME } from "../lib/constants";
import { useState } from "react";
import { DonationReceiptModal } from "../components/DonationReceiptModal";

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ["#1B2B3A", "#B07D3A", "#4A6741", "#8C6228", "#C99247", "#243849"][Math.floor(Math.random() * 6)],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 720 }}
          transition={{ duration: 3 + Math.random() * 2, delay: p.delay, ease: "easeIn" }}
          style={{ width: p.size, height: p.size, backgroundColor: p.color, position: "fixed", borderRadius: 2, top: 0 }}
        />
      ))}
    </div>
  );
}

export function ThankYouPage() {
  const { state: donation } = useLocation();
  const [copied, setCopied] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  if (!donation) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-500 mb-4">No donation found.</p>
        <Link to="/donate" style={{ color: "#B07D3A" }}>Make a donation</Link>
      </div>
    </div>
  );

  const copyReceipt = () => {
    navigator.clipboard.writeText(donation.receiptNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `I just donated ₹${donation.amount.toLocaleString()} to ${FOUNDATION_NAME} for ${donation.causeName}! Join me in making a difference. #AshaKiran #Donation`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-10">
      <Confetti />
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Success Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-8 text-center text-white" style={{ background: "#1B2B3A" }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 size={40} className="text-white" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl mb-2" style={{ fontWeight: 800 }}>Thank You, {donation.userName?.split(" ")[0]}! 🙏</h1>
            <p className="text-white/80 text-base">Your donation of <span style={{ fontWeight: 700 }}>₹{donation.amount?.toLocaleString()}</span> was received successfully.</p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Impact Banner */}
            <div className="rounded-2xl p-5 text-center" style={{ background: "#FAF5EA", border: "1px solid #E8D5AF" }}>
              <div className="text-3xl mb-2">📚</div>
              <div className="text-base" style={{ fontWeight: 600, color: "#1C1C1A" }}>Your Donation's Impact</div>
              <div className="text-sm mt-1 leading-relaxed" style={{ color: "#8C6228" }}>{donation.impactDescription}</div>
            </div>

            {/* Receipt Details */}
            <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-slate-700 text-sm" style={{ fontWeight: 600 }}>Donation Receipt</div>
                <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={11} /> Verified
                </div>
              </div>
              {[
                { label: "Receipt No.", value: donation.receiptNo, copy: true },
                { label: "Payment ID", value: donation.paymentId },
                { label: "Cause", value: donation.causeName },
                { label: "Amount", value: `₹${donation.amount?.toLocaleString()}` },
                { label: "Frequency", value: donation.frequency },
                { label: "Donor Type", value: donation.donorType?.toUpperCase() },
                { label: "Date", value: new Date(donation.createdAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" }) },
                { label: "80G Certificate", value: donation.certificate80G ? "Will be emailed within 24 hrs" : "Not applicable" },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-slate-200 last:border-0 text-sm">
                  <span className="text-slate-500">{row.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-800" style={{ fontWeight: 500 }}>{row.value}</span>
                    {row.copy && (
                      <button onClick={copyReceipt} className="text-slate-400 hover:text-orange-500 transition-colors">
                        {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* What Happens Next */}
            <div>
              <div className="text-slate-700 text-sm mb-3" style={{ fontWeight: 600 }}>What Happens Next?</div>
              <div className="space-y-3">
                {[
                  { icon: "📧", title: "Confirmation Email", desc: "Receipt sent to " + donation.userEmail, time: "Within 5 minutes", done: true },
                  { icon: "📜", title: "80G Certificate", desc: "Tax exemption certificate with Form 10BE details", time: "Within 24 hours", done: donation.certificate80G },
                  { icon: "📸", title: "Impact Update", desc: "Photos and updates from the ground", time: "Within 30 days", done: false },
                  { icon: "📊", title: "Monthly Report", desc: "Detailed utilization report with full transparency", time: "Monthly", done: false },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-800" style={{ fontWeight: 500 }}>{item.title}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${item.done ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-500"}`} style={{ fontWeight: 500 }}>
                      {item.done ? "Sent ✓" : item.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setShowReceipt(true)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-colors"
                style={{ fontWeight: 600, border: "1px solid #DBE3E9", background: "#F0F4F7", color: "#1B2B3A" }}
              >
                <FileText size={15} /> View Full Receipt
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: "I donated!", text: shareText, url: window.location.origin });
                  } else {
                    navigator.clipboard.writeText(shareText);
                  }
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-colors"
                style={{ fontWeight: 500, border: "1px solid #E5E0D8", color: "#6B6B60" }}
              >
                <Share2 size={15} /> Share
              </button>
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-2 text-white py-3 rounded-xl transition-colors text-sm"
                style={{ fontWeight: 600, background: "#1B2B3A" }}
              >
                <Star size={15} /> My Dashboard
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-sm text-center sm:text-left" style={{ color: "#6B6B60" }}>
                Questions? Email us at <a href="mailto:contact@shiksharaj.org" style={{ color: "#B07D3A" }}>contact@shiksharaj.org</a>
              </div>
              <Link
                to="/donate"
                className="flex items-center gap-1.5 text-sm transition-colors"
                style={{ fontWeight: 600, color: "#B07D3A" }}
              >
                <Heart size={14} style={{ fill: "#B07D3A" }} /> Donate Again
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Related causes */}
        <div className="mt-8 text-center">
          <Link to="/causes" className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: "#6B6B60" }}>
            Explore more causes <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <DonationReceiptModal donation={showReceipt ? donation : null} onClose={() => setShowReceipt(false)} />
    </div>
  );
}