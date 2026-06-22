import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, Shield, Mail, Loader2, AlertCircle, CheckCircle2, ExternalLink, FileText } from "lucide-react";
import { donationApi } from "../lib/api";

interface Donation {
  id: string; userName: string; userEmail: string; amount: number;
  causeId?: string; causeName: string; frequency?: string; donorType?: string;
  pan?: string; phone?: string; address?: string;
  paymentId: string; razorpayOrderId?: string; receiptNo: string;
  status: string; certificate80G: boolean; createdAt: string;
  impactDescription?: string; currency?: string; paymentMethod?: string;
}
interface Props {
  donation: Donation | null;
  onClose: () => void;
  isAdminView?: boolean;
}
type ResendState = "idle" | "sending" | "success" | "error";

export function DonationReceiptModal({ donation, onClose, isAdminView = false }: Props) {
  const [pdfUrl,    setPdfUrl]    = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError,  setPdfError]  = useState("");
  const [resendState, setResendState] = useState<ResendState>("idle");
  const [resendMsg,   setResendMsg]   = useState("");
  const prevUrlRef = useRef<string | null>(null);

  // Reset PDF state when donation changes (don't auto-generate — let user trigger it)
  useEffect(() => {
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    prevUrlRef.current = null;
    setPdfUrl(null);
    setPdfError("");
    setPdfLoading(false);
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, [donation?.id]);

  const generatePdf = async () => {
    if (!donation) return;
    setPdfError("");
    setPdfLoading(true);
    try {
      const { pdf } = await donationApi.generateCertificate(donation);
      const bytes = Uint8Array.from(atob(pdf), c => c.charCodeAt(0));
      const blob  = new Blob([bytes], { type: "application/pdf" });
      const url   = URL.createObjectURL(blob);
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
      prevUrlRef.current = url;
      setPdfUrl(url);
    } catch (e: any) {
      setPdfError(e.message || "Failed to generate certificate");
    } finally {
      setPdfLoading(false);
    }
  };

  if (!donation) return null;

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `Certificate-${donation.receiptNo.replace(/\//g, "-")}.pdf`;
    a.click();
  };

  const handleOpenNew = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank");
  };

  const handleResendEmail = async () => {
    if (resendState === "sending") return;
    setResendState("sending"); setResendMsg("");
    try {
      const result = await donationApi.resendEmail(donation.id);
      setResendState("success");
      setResendMsg(`Receipt emailed to ${result.sentTo}`);
      setTimeout(() => { setResendState("idle"); setResendMsg(""); }, 5000);
    } catch (e: any) {
      setResendState("error");
      setResendMsg(e.message || "Failed to resend email. Please try again.");
      setTimeout(() => { setResendState("idle"); setResendMsg(""); }, 6000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col"
          style={{ border: "1px solid #E5E0D8" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 px-5 py-4 flex items-center justify-between"
            style={{ background: "#1B2B3A" }}>
            <div>
              <div className="text-xs" style={{ color: "rgba(248,245,239,0.55)" }}>Shiksha Raj, Ujjwal Bharat Mission</div>
              <div className="text-lg" style={{ fontWeight: 700, color: "#F8F5EF" }}>Donation Certificate</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(248,245,239,0.65)" }}>
                {donation.receiptNo}
                {isAdminView && (
                  <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                    style={{ background: "rgba(255,255,255,0.15)", color: "#F8F5EF", fontWeight: 600 }}>
                    <Shield size={9} /> Admin
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.12)", color: "#F8F5EF" }}>
              <X size={17} />
            </button>
          </div>

          {/* PDF viewer */}
          <div className="flex-1 overflow-hidden bg-slate-100 relative" style={{ minHeight: 400 }}>
            {pdfLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <Loader2 size={32} className="animate-spin" style={{ color: "#1B2B3A" }} />
                <p className="text-sm text-slate-500">Generating certificate…</p>
                <p className="text-xs text-slate-400">This may take 5–10 seconds</p>
              </div>
            )}
            {!pdfLoading && pdfError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                <AlertCircle size={32} className="text-red-400" />
                <p className="text-sm text-red-600 text-center">{pdfError}</p>
                <button
                  onClick={generatePdf}
                  className="text-xs px-4 py-2 rounded-lg"
                  style={{ background: "#1B2B3A", color: "#fff" }}
                >
                  Retry
                </button>
              </div>
            )}
            {!pdfLoading && !pdfError && !pdfUrl && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "#E8E3DC" }}>
                  <FileText size={28} style={{ color: "#1B2B3A" }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-700 mb-1">Certificate not loaded</p>
                  <p className="text-xs text-slate-400">Click below to generate the PDF</p>
                </div>
                <button
                  onClick={generatePdf}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
                  style={{ fontWeight: 600, background: "#1B2B3A", color: "#F8F5EF" }}
                >
                  <FileText size={14} /> Generate Certificate
                </button>
              </div>
            )}
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                title="Donation Certificate"
                className="w-full h-full border-0"
                style={{ minHeight: 480 }}
              />
            )}
          </div>

          {/* Footer actions */}
          <div className="flex-shrink-0 bg-white p-4 space-y-3" style={{ borderTop: "1px solid #E5E0D8" }}>
            {isAdminView && (
              <div className="space-y-2">
                <button
                  onClick={handleResendEmail}
                  disabled={resendState === "sending" || resendState === "success"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all"
                  style={{
                    fontWeight: 600,
                    background: resendState === "success" ? "#EDF5EB" : resendState === "error" ? "#FEF2F2" : resendState === "sending" ? "#F0F4F7" : "#1B2B3A",
                    color: resendState === "success" ? "#4A6741" : resendState === "error" ? "#A8200D" : resendState === "sending" ? "#1B2B3A" : "#F8F5EF",
                    border: resendState !== "idle" ? `1px solid ${resendState === "success" ? "#D4E4CF" : resendState === "error" ? "#FECACA" : "#DBE3E9"}` : "none",
                  }}
                >
                  {resendState === "sending" && <Loader2 size={15} className="animate-spin" />}
                  {resendState === "success" && <CheckCircle2 size={15} />}
                  {resendState === "error"   && <AlertCircle  size={15} />}
                  {resendState === "idle"    && <Mail size={15} />}
                  {resendState === "idle"    && "Resend Certificate Email"}
                  {resendState === "sending" && "Sending…"}
                  {resendState === "success" && "Email Sent Successfully!"}
                  {resendState === "error"   && "Retry Send Email"}
                </button>
                {resendMsg && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                    style={{
                      background: resendState === "success" ? "#EDF5EB" : "#FEF2F2",
                      color:      resendState === "success" ? "#4A6741" : "#A8200D",
                      border: `1px solid ${resendState === "success" ? "#D4E4CF" : "#FECACA"}`,
                    }}>
                    {resendState === "success" ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                    {resendMsg}
                  </motion.div>
                )}
                <div className="text-center text-xs" style={{ color: "#6B6B60" }}>
                  Sends new-format PDF certificate to{" "}
                  <span style={{ fontWeight: 600, color: "#1C1C1A" }}>{donation.userEmail}</span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleOpenNew}
                disabled={!pdfUrl}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-colors disabled:opacity-50"
                style={{ fontWeight: 600, background: "#1B2B3A", color: "#F8F5EF" }}
              >
                <ExternalLink size={14} /> Open in New Tab
              </button>
              <button
                onClick={handleDownload}
                disabled={!pdfUrl}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-colors disabled:opacity-50"
                style={{ fontWeight: 600, background: "#B07D3A", color: "#F8F5EF" }}
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
