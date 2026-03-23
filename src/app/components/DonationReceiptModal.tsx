import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, Printer, CheckCircle2, Shield, Mail, Loader2, AlertCircle } from "lucide-react";
import { donationApi } from "../lib/api";
import { FormalDonationReceipt } from "./FormalDonationReceipt";

interface Donation {
  id: string; userName: string; userEmail: string; amount: number;
  causeId?: string; causeName: string; frequency?: string; donorType?: string;
  pan?: string; paymentId: string; razorpayOrderId?: string; receiptNo: string;
  status: string; certificate80G: boolean; createdAt: string;
  impactDescription?: string; currency?: string;
}
interface Props {
  donation: Donation | null;
  onClose: () => void;
  isAdminView?: boolean;
}
type ResendState = "idle" | "sending" | "success" | "error";

export function DonationReceiptModal({ donation, onClose, isAdminView = false }: Props) {
  const printRef  = useRef<HTMLDivElement>(null);
  const [resendState, setResendState] = useState<ResendState>("idle");
  const [resendMsg,   setResendMsg]   = useState("");

  if (!donation) return null;

  const handlePrint = () => {
    const content = printRef.current?.innerHTML;
    if (!content) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>Donation Receipt - ${donation.receiptNo}</title><meta charset="utf-8"><style>* { box-sizing: border-box; margin: 0; padding: 0; } body { background: #fff; padding: 0; } @media print { @page { margin: 10mm; size: A4; } body { padding: 0; } }</style></head><body>${content}</body></html>`);
    w.document.close();
    setTimeout(() => { w.focus(); w.print(); }, 400);
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
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col"
          style={{ border: "1px solid #E5E0D8" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 px-5 py-4 flex items-center justify-between"
            style={{ background: "#1B2B3A" }}>
            <div>
              <div className="text-xs" style={{ color: "rgba(248,245,239,0.55)" }}>Shiksha Raj, Ujjwal Bharat Mission</div>
              <div className="text-lg" style={{ fontWeight: 700, color: "#F8F5EF" }}>Official Donation Receipt</div>
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

          {/* Scrollable receipt */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5" style={{ background: "#F2EDE6" }}>
            <div ref={printRef}>
              <FormalDonationReceipt donation={donation} forPrint={false} />
            </div>
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
                    background: resendState === "success" ? "#EDF5EB"
                      : resendState === "error" ? "#FEF2F2"
                      : resendState === "sending" ? "#F0F4F7"
                      : "#1B2B3A",
                    color: resendState === "success" ? "#4A6741"
                      : resendState === "error" ? "#A8200D"
                      : resendState === "sending" ? "#1B2B3A"
                      : "#F8F5EF",
                    border: resendState !== "idle" ? `1px solid ${resendState === "success" ? "#D4E4CF" : resendState === "error" ? "#FECACA" : "#DBE3E9"}` : "none",
                  }}
                >
                  {resendState === "sending" && <Loader2 size={15} className="animate-spin" />}
                  {resendState === "success" && <CheckCircle2 size={15} />}
                  {resendState === "error" && <AlertCircle size={15} />}
                  {resendState === "idle" && <Mail size={15} />}
                  {resendState === "idle" && "Resend Receipt Email"}
                  {resendState === "sending" && "Sending Email…"}
                  {resendState === "success" && "Email Sent Successfully!"}
                  {resendState === "error" && "Retry Send Email"}
                </button>
                {resendMsg && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                    style={{
                      background: resendState === "success" ? "#EDF5EB" : "#FEF2F2",
                      color: resendState === "success" ? "#4A6741" : "#A8200D",
                      border: `1px solid ${resendState === "success" ? "#D4E4CF" : "#FECACA"}`,
                    }}>
                    {resendState === "success" ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                    {resendMsg}
                  </motion.div>
                )}
                <div className="text-center text-xs" style={{ color: "#6B6B60" }}>
                  Sends receipt + 80G certificate to{" "}
                  <span style={{ fontWeight: 600, color: "#1C1C1A" }}>{donation.userEmail}</span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-colors"
                style={{ fontWeight: 600, background: "#1B2B3A", color: "#F8F5EF" }}>
                <Printer size={14} /> Print Receipt
              </button>
              <button onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-colors"
                style={{ fontWeight: 600, background: "#B07D3A", color: "#F8F5EF" }}>
                <Download size={14} /> Save / Download PDF
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
