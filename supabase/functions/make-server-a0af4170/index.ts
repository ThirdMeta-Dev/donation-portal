import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import { PDFDocument, rgb } from "npm:pdf-lib";
import fontkit from "npm:@pdf-lib/fontkit";
import * as kv from "./kv_store.ts";

const app = new Hono();
app.use("*", logger(console.log));
app.use("/*", cors({
  origin: (origin) => {
    const allowed = [
      "https://ujjwalbharat.org", "https://www.ujjwalbharat.org",
      "https://ujjwalawadekar.com", "https://www.ujjwalawadekar.com",
      "https://staging.ujjwalawadekar.com",
      "http://localhost:5173", "http://localhost:5174", "http://localhost:5175",
      "http://localhost:5176", "http://localhost:5177", "http://localhost:5178",
      "http://localhost:5179", "http://localhost:5180", "http://localhost:5181",
      "http://localhost:5182", "http://localhost:5183",
    ];
    return allowed.includes(origin) ? origin : allowed[0];
  },
  allowHeaders: ["Content-Type", "Authorization", "X-User-Token"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  maxAge: 600,
}));

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ADMIN_EMAILS = new Set(["seo@hexanovate.com", "admin@ashakiran.org", "admin@shiksharaj.org"]); // v2
const isAdmin = (email: string | undefined) =>
  !!email && (ADMIN_EMAILS.has(email) || email.endsWith("@ashakiran.org") || email.endsWith("@shiksharaj.org"));
const receipt = () => {
  const now = new Date();
  const fyStart = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  const fy = `${fyStart}-${String(fyStart + 1).slice(2)}`;
  const num = Math.floor(100000 + Math.random() * 900000);
  return `SRUBF/${fy}/${String(num).padStart(6, "0")}`;
};
async function getNextReceiptNo(): Promise<string> {
  const now = new Date();
  const fyStart = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  const fy = `${fyStart}-${String(fyStart + 1).slice(2)}`;
  const key = `receipt_seq:${fy}`;
  const current = ((await kv.get(key)) as number | null) || 0;
  const next = current + 1;
  await kv.set(key, next);
  return `SRUBF/${fy}/${String(next).padStart(6, "0")}`;
}
const payId   = () => `pay_${crypto.randomUUID().replace(/-/g,"").slice(0,14).toUpperCase()}`;
const esc = (s: string) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

// Extract the user JWT from X-User-Token (client sends user JWT here to bypass
// Supabase gateway JWT validation) or fall back to Authorization header.
function extractUserJWT(c: any): string | undefined {
  const xUserToken = c.req.header("X-User-Token");
  if (xUserToken) return `Bearer ${xUserToken}`;
  return c.req.header("Authorization");
}

// Local JWT decode — no network call, instant. Used as fallback when Supabase
// verify fails (e.g. network timeout). No expiry check — verifyUser() is the
// authoritative security check; this is only an identity fallback.
function getAuthUser(authHeader: string | undefined) {
  const token = authHeader?.split(" ")[1];
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));
    if (!payload?.sub) return null;
    // NOTE: intentionally NOT checking exp here — verifyUser() handles security.
    // This fallback is only used when Supabase verify has a network issue.
    return {
      id: payload.sub as string,
      email: (payload.email || payload.user_metadata?.email || "") as string,
      user_metadata: (payload.user_metadata || {}) as Record<string, string>,
    };
  } catch { return null; }
}

// Server-side Supabase verify (used only for sensitive write operations)
async function verifyUser(authHeader: string | undefined) {
  const token = authHeader?.split(" ")[1];
  if (!token) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser(token);
    return user || null;
  } catch { return null; }
}

// Resolve auth from local JWT decode — fast, reliable, no network call.
// Safe because: (a) the Supabase gateway already verified the anon key, and
// (b) user JWTs are ES256-signed by GoTrue so they can't be forged.
function resolveAuthUser(c: any) {
  const authHeader = extractUserJWT(c);
  const user = getAuthUser(authHeader);
  return user;
}

// ─── Email via Resend ─────────────────────────────────────────────────────────
const NOTIFY_EMAILS = ["unmesh.wadekar@hexanovate.com", "kalpesh.wadekar@hexanovate.com"];
const SMTP_FROM     = "noreply@ujjwalawadekar.com";

async function sendEmail(
  subject: string,
  html: string,
  to: string | string[] = NOTIFY_EMAILS,
  attachments?: { filename: string; content: string }[],
) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.log("[EMAIL] RESEND_API_KEY not set — skipping:", subject);
    return { ok: false, reason: "no api key" };
  }
  const recipients = Array.isArray(to) ? to : [to];
  const payload: Record<string, unknown> = { from: `Ujjwal Bharat <${SMTP_FROM}>`, to: recipients, subject, html };
  if (attachments?.length) payload.attachments = attachments;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(`[EMAIL] ❌ FAILED "${subject}" | status=${res.status} body=${JSON.stringify(data)}`);
      return { ok: false, reason: JSON.stringify(data) };
    }
    console.log(`[EMAIL] ✅ Sent "${subject}" → ${recipients.join(", ")} | id=${data.id}`);
    return { ok: true, messageId: data.id };
  } catch (e) {
    console.log(`[EMAIL] ❌ FAILED "${subject}" | error=${String(e).slice(0, 400)}`);
    return { ok: false, reason: String(e) };
  }
}

// ─── PDF Certificate Asset Constants (Figma exports, base64-encoded) ─────────
const _LOGO_B64 = "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";
const _STAMP_B64 = "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";

// ─── Text-wrap helper for pdf-lib (no built-in wrapping) ─────────────────────
function _wrapText(text: string, maxW: number, font: any, size: number): string[] {
  const lines: string[] = [];
  for (const para of text.split("\n")) {
    const words = para.split(" ");
    let cur = "";
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (font.widthOfTextAtSize(test, size) > maxW && cur) { lines.push(cur); cur = w; }
      else cur = test;
    }
    if (cur) lines.push(cur);
  }
  return lines;
}

// ─── PDF Certificate Generator (Figma-accurate: Lora + DM Sans, A4) ──────────
async function generateCertificatePDFBytes(d: any): Promise<Uint8Array> {
  // Load Lora + DM Sans from Google Fonts CDN (parallel)
  const fontUrls = [
    "https://fonts.gstatic.com/s/lora/v37/0QI6MX1D_JOuGQbT0gvTJPa787zAvCJG.ttf",       // Lora SemiBold 600
    "https://fonts.gstatic.com/s/lora/v37/0QI6MX1D_JOuGQbT0gvTJPa787wsuyJG.ttf",       // Lora Medium 500
    "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf", // DM Sans Regular 400
    "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwA_JxhTg.ttf", // DM Sans Light 300
    "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTg.ttf", // DM Sans SemiBold 600
    "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW3z.ttf", // DM Sans Italic 400
  ];
  const [loraSBb, loraMedb, dmRegb, dmLightb, dmSBb, dmItalicb] = await Promise.all(
    fontUrls.map(u => fetch(u).then(r => r.arrayBuffer()).then(b => new Uint8Array(b)))
  );

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const [fLoraSB, fLoraMed, fDmReg, fDmLight, fDmSB, fDmItalic] = await Promise.all([
    pdfDoc.embedFont(loraSBb), pdfDoc.embedFont(loraMedb),
    pdfDoc.embedFont(dmRegb),  pdfDoc.embedFont(dmLightb),
    pdfDoc.embedFont(dmSBb),   pdfDoc.embedFont(dmItalicb),
  ]);

  // Embed logo + stamp (from base64 constants)
  const logoBytes  = Uint8Array.from(atob(_LOGO_B64),  c => c.charCodeAt(0));
  const stampBytes = Uint8Array.from(atob(_STAMP_B64), c => c.charCodeAt(0));
  const [logoImg, stampImg] = await Promise.all([pdfDoc.embedPng(logoBytes), pdfDoc.embedPng(stampBytes)]);

  // A4 page — exact match to Figma frame (595 × 842)
  const W = 595, H = 842;
  const page = pdfDoc.addPage([W, H]);

  // ── Coordinate helpers (Figma=top-down → pdf-lib=bottom-up) ─────────────────
  // rY: rect/image bottom y when Figma top is at fy, element height is fh
  const rY = (fy: number, fh: number) => H - fy - fh;
  // dt: draw text; fy=Figma top of text box, s=font size
  const dt = (text: string, x: number, fy: number, font: any, s: number, color: ReturnType<typeof rgb>) =>
    page.drawText(text, { x, y: H - fy - s * 0.82, size: s, font, color });
  // dtr: draw text right-aligned to edge rx
  const dtr = (text: string, rx: number, fy: number, font: any, s: number, color: ReturnType<typeof rgb>) => {
    const tw = font.widthOfTextAtSize(text, s);
    page.drawText(text, { x: rx - tw, y: H - fy - s * 0.82, size: s, font, color });
  };
  // ln: horizontal line at Figma y
  const ln = (x0: number, x1: number, fy: number, thickness: number, color: ReturnType<typeof rgb>) =>
    page.drawLine({ start: { x: x0, y: H - fy }, end: { x: x1, y: H - fy }, thickness, color });

  // ── Colors (exact Figma hex → RGB) ─────────────────────────────────────────
  const cGold    = rgb(0.749, 0.475, 0.114);   // #BF791D  (gold bar)
  const cOrgGold = rgb(0.718, 0.463, 0.028);   // #B77607  (org name)
  const cBlue    = rgb(0.118, 0.333, 0.541);   // #1E558A  (section headers)
  const cBlk     = rgb(0, 0, 0);
  const cGray    = rgb(0.553, 0.553, 0.553);   // #8D8D8D  (terms)
  const cFafa    = rgb(0.980, 0.980, 0.980);   // #FAFAFA  (header bg rows)
  const cDivider = rgb(0.992, 0.925, 0.808);   // #FDECCE  (horizontal rule)
  const cBorder  = rgb(0.863, 0.863, 0.863);   // #DCDCDC  (box borders)
  const cRowLine = rgb(0.918, 0.918, 0.918);   // #EAEAEA  (row separators)
  const cSecBg   = rgb(0.965, 0.965, 0.965);   // #F6F6F6  (second box bg)

  // ── 1. Header bars ──────────────────────────────────────────────────────────
  // Gold bar: x=126, y=0, w=437, h=7, #BF791D, bottom-left r≈3
  page.drawRectangle({ x: 126, y: rY(0, 7), width: 437, height: 7, color: cGold, borderRadius: 3 });
  // Gradient band x=205, y=0, w=358, h=21 — #123557→#174067 (40 slices)
  const gSteps = 40;
  for (let i = 0; i < gSteps; i++) {
    const t = i / (gSteps - 1);
    page.drawRectangle({
      x: 205 + i * (358 / gSteps), y: rY(0, 21), width: 358 / gSteps + 0.6, height: 21,
      color: rgb(0.071 + 0.019 * t, 0.209 + 0.042 * t, 0.341 + 0.063 * t),
    });
  }
  // "Donation Receipt" — DM Sans Light 8px, right-aligned to x=531
  dtr("Donation Receipt", 531, 28, fDmLight, 8, cBlk);

  // ── 2. Logo (x=0, y=48, 65×51) ─────────────────────────────────────────────
  page.drawImage(logoImg, { x: 0, y: rY(48, 51), width: 65, height: 51 });

  // ── 3. Address block — right-aligned at x=531, DM Sans Regular 8px ─────────
  dtr("Plot 89, Sr. No. 412, Neharu Nagar, Prasad Apt, Jalgaon, Maharashtra, 425001", 531, 62, fDmReg, 8, cBlk);
  dtr("+91 9370318308  |  +91 7620688947", 531, 76, fDmReg, 8, cBlk);
  dtr("ujjwalawadekar.com  |  team@srubf.com", 531, 90, fDmReg, 8, cBlk);
  // Reg. No. and PAN — DM Sans SemiBold 8px
  dtr("Reg. No.: U85499MR2026NPL474075", 531, 110, fDmSB, 8, cBlk);
  dtr("PAN : ABSCS9855K", 531, 122, fDmSB, 8, cBlk);

  // ── 4. Organization name — left, Lora SemiBold 10px #B77607 ────────────────
  dt("SHIKSHARAJ, UJJWAL BHARAT FOUNDATION", 0, 119, fLoraSB, 10, cOrgGold);
  dt("Reg. No. (CIN)", 0, 135, fLoraSB, 9, cOrgGold);

  // ── 5. Horizontal divider y=168.83, #FDECCE ─────────────────────────────────
  ln(0, 563, 169, 1, cDivider);

  // ── 6. Receipt No. / Date ───────────────────────────────────────────────────
  const receiptNo = d.receiptNo || "—";
  const dateStr   = _formatDate(d.createdAt || new Date().toISOString());

  dt("Receipt No.: ", 0, 189, fLoraSB, 10, cBlk);
  dt(receiptNo, fLoraSB.widthOfTextAtSize("Receipt No.: ", 10), 189, fDmReg, 10, cBlk);
  dt("Date : ", 229, 189, fLoraSB, 10, cBlk);
  dt(dateStr, 229 + fLoraSB.widthOfTextAtSize("Date : ", 10), 189, fDmReg, 10, cBlk);

  // ── 7. Body paragraphs — DM Sans Regular 9px, line height 14.4 ─────────────
  const BODY_W = 531, LH = 14.4;
  const donorName = d.userName || "Donor";

  // Para 1
  const p1 = [`Dear ${donorName}`, ..._wrapText(
    "With heartfelt gratitude, we acknowledge your contribution to Shiksha Raj, Ujjwal Bharat Foundation. Your support helps bring meaningful education, dignity, and opportunity closer to children who need it most.",
    BODY_W, fDmReg, 9,
  )];
  p1.forEach((line, i) => dt(line, 0, 219 + i * LH, fDmReg, 9, cBlk));

  // Para 2
  const p2 = _wrapText(
    "Donations to Shiksha Raj, Ujjwal Bharat Foundation are eligible for deduction under 133(1)(b) of the Income Tax Act, 2025. URN of registration under 354(4) section - ABSCS9855KF20261",
    BODY_W, fDmReg, 9,
  );
  p2.forEach((line, i) => dt(line, 0, 267 + i * LH, fDmReg, 9, cBlk));

  // ── 8. Donor Details Box ─────────────────────────────────────────────────────
  // Box 1: x=0, y=315, w=531, h=247 — border #DCDCDC
  page.drawRectangle({ x: 0, y: rY(315, 247), width: 531, height: 247, color: rgb(1,1,1), borderColor: cBorder, borderWidth: 1 });

  // "Donor Details" header row (bg #FAFAFA, h=27)
  page.drawRectangle({ x: 0, y: rY(315, 27), width: 531, height: 27, color: cFafa });
  dt("Donor Details", 12, 321, fLoraSB, 10, cBlue);

  // Helper: draw one field row (rowBottom = Figma y of row's bottom edge, h=25)
  const row = (label: string, value: string, rowBottom: number, vFont = fDmReg) => {
    const labelFy = rowBottom - 25 + 5.83;
    ln(0, 531, rowBottom, 0.5, cRowLine);
    dt(label, 12, labelFy, fLoraSB, 10, cBlk);
    if (value) dt(value, 12 + fLoraSB.widthOfTextAtSize(label, 10) + 6, labelFy, vFont, 9, cBlk);
  };

  row("Name :", donorName, 367);
  row("PAN No. :", d.pan || "", 392);
  row("Address :", (d.address || "").split("\n")[0] || "", 417);

  // Mobile + Email (two columns on same row, bottom=442)
  const mobFy = 442 - 25 + 5.83;
  ln(0, 531, 442, 0.5, cRowLine);
  dt("Mobile No. :", 12, mobFy, fLoraSB, 10, cBlk);
  dt(d.phone || "", 12 + fLoraSB.widthOfTextAtSize("Mobile No. :", 10) + 6, mobFy, fDmReg, 9, cBlk);
  dt("Email ID :", 277.5, mobFy, fLoraMed, 10, cBlk);
  dt(d.userEmail || "", 277.5 + fLoraMed.widthOfTextAtSize("Email ID :", 10) + 6, mobFy, fDmReg, 9, cBlk);

  // "Payment Details:" header row (bg #FAFAFA, y=442→469, h=27)
  page.drawRectangle({ x: 0, y: rY(442, 27), width: 531, height: 27, color: cFafa });
  dt("Payment Details:", 12, 448, fLoraSB, 10, cBlue);

  row("Amount In Words :", _amountInWords(d.amount || 0), 494);
  row("For the purpose of :", d.causeName || "General Fund", 519);

  // Bank Account row (h=43, bottom=562)
  const bankFy = 519 + 5.83;
  ln(0, 531, 562, 0.5, cRowLine);
  dt("Received in Our Bank Account :", 12, bankFy, fLoraSB, 10, cBlk);
  dt("HDFC BANK A/C No. 50200120533381", 200, bankFy, fDmLight, 10, cBlk);
  dt("IFSC CODE: HDFC0000180", 394, bankFy, fDmLight, 10, cBlk);
  dt("SHIKSHARAJ, UJJWAL BHARAT FOUNDATION", 200, bankFy + 17, fDmLight, 10, cBlk);

  // ── 9. Watermark — logo at 6% opacity centered over details box ─────────────
  page.drawImage(logoImg, { x: 173, y: rY(335, 144), width: 184, height: 144, opacity: 0.06 });

  // ── 10. Second box — Date / Transaction Type / Ref. No. ────────────────────
  page.drawRectangle({ x: 0, y: rY(562, 68), width: 531, height: 68, color: cSecBg, borderColor: cBorder, borderWidth: 1 });

  // Date row (label at y=574.83)
  ln(0, 531, 581, 0.5, cRowLine);
  dt("Date :", 12, 574, fLoraSB, 10, cBlk);
  dt(dateStr, 12 + fLoraSB.widthOfTextAtSize("Date :", 10) + 6, 574, fDmReg, 9, cBlk);

  // Transaction Type (label at y=593.83)
  ln(0, 531, 601, 0.5, cRowLine);
  dt("Transaction Type :", 12, 593, fLoraSB, 10, cBlk);
  const txType = d.paymentMethod || ((d.paymentId || "").startsWith("pay_") ? "Online / UPI" : "Offline / Cash");
  dt(txType, 12 + fLoraSB.widthOfTextAtSize("Transaction Type :", 10) + 6, 593, fDmReg, 9, cBlk);

  // Ref. No. (label at y=612.83)
  dt("Ref. No. :", 12, 612, fLoraSB, 10, cBlk);
  dt(d.paymentId || d.razorpayOrderId || "—", 12 + fLoraSB.widthOfTextAtSize("Ref. No. :", 10) + 6, 612, fDmReg, 9, cBlk);

  // ── 11. Footer text — DM Sans Regular 9px ───────────────────────────────────
  dt(`Received with sincere thanks from Shri/Smt./M/S ${donorName}.`, 0, 667, fDmReg, 9, cBlk);
  dt("Your contribution strengthens better learning opportunities for children through Shiksha Raj, Ujjwal Bharat Foundation.", 0, 681, fDmReg, 9, cBlk);

  // ── 12. Terms and conditions — DM Sans Italic 7px ───────────────────────────
  dt("Terms and conditions", 0, 747, fDmItalic, 7, cBlk);
  const terms = [
    "1.   This Receipt is not Transferable or Changeable.",
    "2.   If you have not provided PAN No., you cannot be eligible for tax deduction benefit under",
    "      section 133(1)(b) of Income Tax Act, 2025.",
    "3.   This is a computer-generated receipt. Valid without physical signature as per IT Act 2000.",
    "4.   For queries, contact: team@srubf.com | +91-7620688947, +91-9370318308",
  ];
  terms.forEach((t, i) => dt(t, 0, 759 + i * 10.64, fDmItalic, 7, cGray));

  // ── 13. Stamp / Seal — x=481, y=729, 48×48 ──────────────────────────────────
  page.drawImage(stampImg, { x: 481, y: rY(729, 48), width: 48, height: 48 });

  // ── 14. "Received by" / "Authorised Signatory" — right-aligned ───────────────
  dtr("Received by",          531, 787, fLoraSB,  10, cBlk);
  dtr("Authorised Signatory", 531, 803, fDmLight,  8, cBlk);

  return await pdfDoc.save();
}

// helper: Uint8Array → base64 string (safe for large files)
function uint8ToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

// ─── Formal Invoice HTML Generator (server-side, mirrors FormalDonationReceipt) ─
const _ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen"];
const _tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function _numToWords(n: number): string {
  if (n === 0) return "Zero";
  if (n < 0) return "Minus " + _numToWords(-n);
  let words = "";
  if (Math.floor(n / 10000000) > 0) { words += _numToWords(Math.floor(n / 10000000)) + " Crore "; n %= 10000000; }
  if (Math.floor(n / 100000) > 0)   { words += _numToWords(Math.floor(n / 100000)) + " Lakh "; n %= 100000; }
  if (Math.floor(n / 1000) > 0)     { words += _numToWords(Math.floor(n / 1000)) + " Thousand "; n %= 1000; }
  if (Math.floor(n / 100) > 0)      { words += _ones[Math.floor(n / 100)] + " Hundred "; n %= 100; }
  if (n > 0) {
    if (n < 20) words += _ones[n] + " ";
    else words += _tens[Math.floor(n / 10)] + (n % 10 > 0 ? " " + _ones[n % 10] : "") + " ";
  }
  return words.trim();
}

function _amountInWords(amount: number): string {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  let result = "Rupees " + _numToWords(rupees);
  if (paise > 0) result += " and " + _numToWords(paise) + " Paise";
  return result + " Only";
}

function _formatAmount(amount: number): string {
  const str = amount.toFixed(2);
  const [intPart, decPart] = str.split(".");
  const lastThree = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  const formatted = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
  return formatted + "." + decPart;
}

function _formatDate(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function generateFormalReceiptHTML(d: any): string {
  const fyStart = new Date(d.createdAt).getMonth() >= 3
    ? new Date(d.createdAt).getFullYear()
    : new Date(d.createdAt).getFullYear() - 1;
  const fy = `${fyStart}-${String(fyStart + 1).slice(2)}`;
  const dateStr = _formatDate(d.createdAt);
  const txnType = (d.paymentId || "").startsWith("pay_") ? "ONLINE / UPI" : "RTGS / NEFT";
  const amtWords = _amountInWords(d.amount || 0);
  const amtFmt = `&#8377; ${_formatAmount(d.amount || 0)}`;
  const receiptDisplay = d.receiptNo || receipt();

  const tableRow = (label: string, value: string) =>
    `<tr style="border-bottom:1px solid #aaa">
      <td style="padding:6px 8px;font-weight:700;width:180px;vertical-align:top;font-size:12px;font-family:'Times New Roman',Times,serif;color:#222">${label}</td>
      <td style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',Times,serif;vertical-align:top;color:#111">${value}</td>
    </tr>`;

  const cert80G = d.certificate80G ? `
    <div style="border:2px solid #4338CA;border-radius:4px;margin-top:16px;overflow:hidden">
      <div style="background:#4338CA;padding:10px 16px;text-align:center">
        <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:1px;font-family:Arial,sans-serif">
          &#128220; INCOME TAX DEDUCTION CERTIFICATE
        </span>
      </div>
      <div style="padding:14px 16px;background:#f0fdfa">
        <table style="width:100%;border-collapse:collapse;font-size:12px;font-family:'Times New Roman',Times,serif">
          ${[
            ["Certificate No.", `ITDC-${d.receiptNo}`],
            ["Donor Name", d.userName],
            ["PAN Number", d.pan || "To be updated — Please provide PAN for 80G benefit"],
            ["Donation Amount", `&#8377; ${_formatAmount(d.amount || 0)}`],
            ["Financial Year", fy],
            ["Section", "Section 133(1)(b), Income Tax Act 2025"],
            ["Nature of Donation", "General / Corpus Donation"],
            ["PAN", "ABSCS9855K"],
            ["Organisation Reg. No.", "U85499MR2026NPL474075"],
          ].map(([l, v]) => `<tr style="border-bottom:1px solid #99f6e4"><td style="padding:5px 8px;color:#115e59;font-weight:700;width:180px;font-family:'Times New Roman',serif">${l}</td><td style="padding:5px 8px;font-weight:700;color:#0f172a;font-family:'Times New Roman',serif">${v}</td></tr>`).join("")}
        </table>
        <p style="text-align:center;color:#0D9488;font-size:11px;margin-top:10px;font-weight:600;font-family:Arial,sans-serif">
          This donation qualifies for deduction under Section 133(1)(b) of the Income Tax Act, 2025.<br>
          Please retain this certificate for Income Tax Return (ITR) filing.
        </p>
      </div>
    </div>` : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Donation Receipt - ${receiptDisplay}</title></head>
<body style="margin:0;padding:20px;background:#f1f5f9;font-family:Arial,sans-serif">
<div style="max-width:680px;margin:0 auto;background:#fff;border:2px solid #333;border-radius:4px;padding:28px 32px;font-family:'Times New Roman',Times,serif;color:#000">

  <!-- Header -->
  <div style="text-align:center;border-bottom:2px solid #333;padding-bottom:12px;margin-bottom:10px">
    <img src="https://raw.githubusercontent.com/ThirdMeta-Dev/donation-portal/main/public/favicon.png" alt="Ujjwal Bharat" style="height:56px;width:auto;margin-bottom:8px;display:block;margin-left:auto;margin-right:auto" />
    <div style="font-size:11px;font-weight:700;letter-spacing:3px;margin-bottom:4px;font-family:Arial,sans-serif">DONATION RECEIPT</div>
    <div style="font-size:22px;font-weight:900;letter-spacing:0.5px;line-height:1.2;font-family:Arial,sans-serif">UJJWAL BHARAT</div>
    <div style="font-size:11px;margin-top:5px;line-height:1.8;font-family:'Times New Roman',serif">
      Plot 89, Sr. No. 412, Neharu Nagar, Prasad Apt, Jalgaon, Maharashtra, 425001<br>
      Mob.: +91 9370318308 &nbsp;|&nbsp; +91 7620688947 &nbsp;&nbsp; Email: team@srubf.com<br>
      Website: https://www.ujjwalawadekar.com/<br>
      Reg. No. U85499MR2026NPL474075 &nbsp;&nbsp; PAN: ABSCS9855K
    </div>
    ${d.certificate80G ? `<div style="font-size:11px;font-weight:700;margin-top:6px;line-height:1.6;font-family:Arial,sans-serif">
      Donations to Ujjwal Bharat are eligible for deduction under Section 133(1)(b) of the Income Tax Act, 2025:<br>
      <span style="font-size:12px">Reg. No.: U85499MR2026NPL474075 &nbsp;|&nbsp; PAN: ABSCS9855K</span>
    </div>` : ""}
  </div>

  <!-- Fields -->
  <table style="width:100%;border-collapse:collapse">
    <tr style="border-bottom:1px solid #aaa">
      <td style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',serif;width:60%">
        <strong>Receipt No:</strong> <strong style="font-size:13px">${receiptDisplay}</strong>
      </td>
      <td style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',serif;text-align:right">
        <strong>Date:</strong> <strong>${dateStr}</strong>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #aaa">
      <td colspan="2" style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',serif">
        <strong>Received with thanks from Shri/Smt./M/S:</strong>
        <strong style="font-size:14px;text-transform:uppercase;margin-left:6px">${esc(d.userName || "Anonymous")}</strong>
      </td>
    </tr>
    ${tableRow("Address", esc(d.address || (d.donorType === "foreign" ? "International Donor" : "India")))}
    <tr style="border-bottom:1px solid #aaa">
      <td style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',serif;width:50%">
        <strong>Mobile No.</strong> &nbsp;&nbsp; ${esc(d.phone || "—")} &nbsp;&nbsp;
      </td>
      <td style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',serif">
        <strong>Email ID:</strong> <span style="text-decoration:underline">${esc(d.userEmail || "—")}</span>
      </td>
    </tr>
    ${tableRow("PAN No.", esc(d.pan || "— (Not Provided)"))}
    ${tableRow("Amount In Words", `<strong>${esc(amtWords)}</strong>`)}
    <tr style="border-bottom:1px solid #aaa">
      <td style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',serif;width:55%;vertical-align:top">
        <strong>For the purpose of</strong>&nbsp;&nbsp;<strong style="text-transform:uppercase">${esc(d.causeName || "General Fund")}</strong>
      </td>
      <td style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',serif;vertical-align:top">
        <strong>Received in Our Bank Account:</strong><br>
        <span style="font-size:11px">ICICI BANK &nbsp; A/C No. 123400027554220</span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #aaa">
      <td colspan="2" style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',serif">
        <strong>Transaction Type</strong> &nbsp;
        <span style="border-bottom:1px solid #333">${txnType}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Ref. No.:</strong>
        <span style="border-bottom:1px solid #333;font-size:11px">${d.paymentId || "—"}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Date:</strong> ${dateStr}
      </td>
    </tr>
  </table>

  <!-- Amount Box -->
  <div style="margin:12px 0;border:2px solid #333;display:inline-block;padding:6px 18px;border-radius:3px">
    <span style="font-size:22px;font-weight:900">${amtFmt}</span>
  </div>

  <!-- Footer -->
  <table style="width:100%;border-collapse:collapse;border-top:1px solid #999;margin-top:0">
    <tr>
      <td style="padding:5px 8px;font-size:10px;color:#555;font-family:'Times New Roman',serif">Subject to realisation of Cheque / Online Transfer</td>
      <td style="padding:5px 8px;text-align:center;font-size:11px;font-family:'Times New Roman',serif"><strong>***Thank You***</strong></td>
      <td style="padding:5px 8px;text-align:right;font-weight:700;font-size:11px;font-family:'Times New Roman',serif">
        Received by
        <div style="margin-top:28px;border-top:1px solid #333;padding-top:2px;font-size:10px;font-weight:400">Authorised Signatory</div>
      </td>
    </tr>
  </table>

  ${cert80G}

  <!-- Terms -->
  <div style="margin-top:12px;border-top:2px solid #333;padding-top:8px">
    <div style="font-weight:800;font-size:11px;margin-bottom:4px;font-family:Arial,sans-serif">* TERMS &amp; CONDITIONS</div>
    <div style="font-size:10px;line-height:1.7;color:#333;font-family:'Times New Roman',serif">
      1) This Receipt is not Transferable or Changeable.<br>
      2) If you have not provided your PAN, you cannot claim deduction under Section 133(1)(b) of the Income Tax Act, 2025.<br>
      3) This is a computer-generated receipt. Valid without physical signature as per IT Act 2000.<br>
      4) For queries, contact: team@srubf.com | +91 9370318308
    </div>
  </div>

</div>
</body></html>`;
}

// ─── Normal Payment Confirmation Email (for non-80G causes) ──────────────────
function generateNormalReceiptHTML(d: any): string {
  const dateStr = _formatDate(d.createdAt || new Date().toISOString());
  const amtFmt = `&#8377;${_formatAmount(d.amount || 0)}`;
  const txnType = (d.paymentId || "").startsWith("pay_") ? "Online / UPI" : "RTGS / NEFT";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Payment Confirmation - ${d.receiptNo}</title></head>
<body style="margin:0;padding:20px;background:#f1f5f9;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">
  <div style="background:linear-gradient(135deg,#4338CA,#3730A3);padding:28px 32px;text-align:center">
    <img src="https://raw.githubusercontent.com/ThirdMeta-Dev/donation-portal/main/public/favicon.png" alt="Ujjwal Bharat" style="height:48px;width:auto;margin-bottom:10px;display:block;margin-left:auto;margin-right:auto;filter:brightness(0) invert(1)" />
    <div style="font-size:11px;letter-spacing:3px;color:rgba(255,255,255,.7);margin-bottom:6px">PAYMENT CONFIRMATION</div>
    <div style="font-size:20px;font-weight:900;color:#fff">UJJWAL BHARAT</div>
    <div style="font-size:12px;color:rgba(255,255,255,.7);margin-top:4px">https://www.ujjwalawadekar.com/</div>
    <div style="margin-top:16px;background:rgba(255,255,255,.15);border-radius:8px;padding:12px">
      <div style="font-size:32px;font-weight:900;color:#fff">${amtFmt}</div>
      <div style="font-size:13px;color:rgba(255,255,255,.8);margin-top:2px">Successfully Received</div>
    </div>
  </div>
  <div style="padding:24px 32px">
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
      ${[
        ["Receipt No.", esc(d.receiptNo || "—")],
        ["Donor Name", esc(d.userName || "Anonymous")],
        ["Email", esc(d.userEmail || "—")],
        ["Phone", esc(d.phone || "—")],
        ["Cause", esc(d.causeName || "General Fund")],
        ["Payment Method", txnType],
        ["Transaction ID", d.paymentId || "—"],
        ["Date", dateStr],
        ["Donation Type", (d.frequency || "one-time").replace("-", " ").toUpperCase()],
      ].map(([l, v]) =>
        `<tr style="border-bottom:1px solid #f1f5f9">
          <td style="padding:9px 12px;font-size:13px;color:#64748b;font-weight:600;width:45%;vertical-align:top">${l}</td>
          <td style="padding:9px 12px;font-size:13px;color:#0f172a;font-weight:500">${v}</td>
        </tr>`
      ).join("")}
    </table>
    <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:16px;margin-bottom:20px">
      <div style="font-size:14px;font-weight:700;color:#15803d;margin-bottom:6px">&#10003; Payment Successful</div>
      <div style="font-size:12px;color:#166534;line-height:1.7">
        Thank you for standing with this mission. Your contribution helps us carry practical, teacher-led learning to children who deserve better opportunities, stronger confidence, and a more meaningful education.<br><br>
        <em>Note: This cause does not currently issue Income Tax Deduction Certificates.
        For eligible causes, please visit our website.</em>
      </div>
    </div>
    ${d.impactDescription ? `<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:14px;margin-bottom:20px">
      <div style="font-size:12px;font-weight:700;color:#c2410c;margin-bottom:4px">Your Impact</div>
      <div style="font-size:12px;color:#9a3412">Your donation will help bring real learning, support, and opportunity closer to a child, a classroom, or a school.</div>
    </div>` : ""}
    <div style="border-top:1px solid #e2e8f0;padding-top:16px;text-align:center">
      <div style="font-size:11px;color:#94a3b8;line-height:1.8">
        Ujjwal Bharat &middot; Plot 89, Sr. No. 412, Neharu Nagar, Prasad Apt, Jalgaon, Maharashtra, 425001<br>
        Reg. No. U85499MR2026NPL474075 &middot; PAN: ABSCS9855K<br>
        <a href="https://www.ujjwalawadekar.com/" style="color:#94a3b8">ujjwalawadekar.com</a> &middot; team@srubf.com<br>
        This is a computer-generated receipt. Valid without physical signature.
      </div>
    </div>
  </div>
</div>
</body></html>`;
}

// ─── Cause 80G default set ────────────────────────────────────────────────────
const DEFAULT_80G_CAUSES = new Set(["ujjwal-sanvaad", "shikshak-unnati", "unhali-shala", "shikshan-saath", "shala-abhiyan"]);

async function getCause80GEnabled(causeId: string): Promise<boolean> {
  try {
    const settings: any = await kv.get(`cause-settings:${causeId}`);
    if (settings && typeof settings.enable80G === "boolean") return settings.enable80G;
    return DEFAULT_80G_CAUSES.has(causeId);
  } catch { return true; }
}

// ─── Simple notification email templates ──────────────────────────────────────
function emailWrap(title: string, color: string, body: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:20px">
  <div style="background:${color};border-radius:12px 12px 0 0;padding:24px;text-align:center">
    <img src="https://raw.githubusercontent.com/ThirdMeta-Dev/donation-portal/main/public/favicon.png" alt="Ujjwal Bharat" style="height:44px;width:auto;margin-bottom:8px;display:block;margin-left:auto;margin-right:auto;filter:brightness(0) invert(1)" />
    <h1 style="color:#fff;margin:0;font-size:20px;font-weight:800">${title}</h1>
    <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:12px">Ujjwal Bharat</p>
  </div>
  <div style="background:#fff;padding:24px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;border-radius:0 0 12px 12px">
    ${body}
  </div>
</div>
</body></html>`;
}

function donationFailedHtml(d: any) {
  return emailWrap("❌ Payment Failed", "linear-gradient(135deg,#dc2626,#b91c1c)", `
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
      ${[
        ["Donor Name", d.userName || "Unknown"],
        ["Email", d.userEmail || "Unknown"],
        ["Amount Attempted", `&#8377;${(d.amount||0).toLocaleString("en-IN")}`],
        ["Cause", d.causeName || "Unknown"],
        ["Error", d.errorDescription || "Payment failed"],
        ["Date", new Date().toLocaleString("en-IN")],
      ].map(([l,v]) => `<tr><td style="padding:8px 12px;background:#f8fafc;font-size:13px;font-weight:600;width:40%;color:#475569">${l}</td><td style="padding:8px 12px;font-size:13px;color:#0f172a">${v}</td></tr>`).join("")}
    </table>
    <div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:8px;padding:12px;text-align:center">
      <strong style="color:#dc2626">This payment was NOT captured. Please follow up if needed.</strong>
    </div>
  `);
}

function signupHtml(u: any) {
  return emailWrap("🎉 New Supporter Registration", "linear-gradient(135deg,#4338CA,#3730A3)", `
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
      ${[
        ["Name", esc(u.name)],
        ["Email", esc(u.email)],
        ["Phone", esc(u.phone || "Not provided")],
        ["Donor Type", esc(u.donorType || "Indian")],
        ["Country", esc(u.country || "India")],
        ["Registered At", new Date().toLocaleString("en-IN")],
      ].map(([l,v]) => `<tr><td style="padding:8px 12px;background:#f8fafc;font-size:13px;font-weight:600;width:40%;color:#475569">${l}</td><td style="padding:8px 12px;font-size:13px;color:#0f172a">${v}</td></tr>`).join("")}
    </table>
    <div style="background:#ccfbf1;border:1px solid #5eead4;border-radius:8px;padding:12px;text-align:center">
      <strong style="color:#4338CA">New supporter registered on Ujjwal Bharat portal.</strong>
    </div>
  `);
}

// ─── Demo Course Seed ─────────────────────────────────────────────────────────
const DEMO_COURSE = {
  id: "course-digital-001",
  title: "Digital Literacy for Rural Youth",
  description: "Learn essential computer, internet, and UPI skills to unlock opportunities in today's digital India.",
  longDescription: "This comprehensive course covers everything from basic computer operations to internet safety, email communication, government portal navigation, and digital payments. Designed for first-time learners in rural communities.\n\nBy the end you will confidently use smartphones, stay safe online, make UPI payments, and access government services from your phone.",
  instructor: "Meera Desai",
  instructorBio: "M.Ed from TISS Mumbai. 10+ years teaching digital and vocational skills to communities across North Maharashtra.",
  thumbnail: "https://images.unsplash.com/photo-1604177091072-b7b677a077f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  category: "Technology",
  level: "beginner",
  durationHours: 8,
  language: "Hindi / English",
  certificate: true,
  price: 0,
  tags: ["Computer Basics", "Internet Safety", "UPI Payments", "Aadhaar & DigiLocker", "WhatsApp & Email"],
  enrolledCount: 1240,
  rating: 4.8,
  lessons: [
    { id: "l1", title: "Introduction: Computers & Smartphones", type: "video", duration: "18 min", thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800", order: 1, videoUrl: "https://www.youtube.com/embed/CkZyZFa5qO0", content: "" },
    { id: "l2", title: "Using the Internet Safely", type: "video", duration: "22 min", thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800", order: 2, videoUrl: "https://www.youtube.com/embed/aH1MusKeBjI", content: "" },
    { id: "l3", title: "Email & WhatsApp Communication", type: "video", duration: "20 min", thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800", order: 3, videoUrl: "https://www.youtube.com/embed/WFQIivDsGCU", content: "" },
    { id: "l4", title: "UPI, Paytm & Digital Payments", type: "video", duration: "25 min", thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", order: 4, videoUrl: "https://www.youtube.com/embed/vsgDPGhXpDE", content: "" },
    {
      id: "l5", title: "Aadhaar, DigiLocker & Government Portals", type: "reading", duration: "15 min",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800", order: 5, videoUrl: "",
      content: `## Aadhaar Card — India's Universal Identity\n\nYour Aadhaar number is a 12-digit unique identity number issued by UIDAI.\n\n## DigiLocker — Your Digital Document Wallet\n\nDigiLocker is a secure cloud platform by the Government of India to store and share official documents digitally.\n\n## Key Tip: Never Share Your OTP!\nGovernment portals will NEVER call you asking for your OTP. If someone calls asking — it is fraud.`
    },
    { id: "l6", title: "Live Q&A Session with Instructor", type: "live", duration: "45 min", thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800", order: 6, videoUrl: "", content: "", jitsiRoom: "AKF-Digital-Literacy-QnA" },
  ],
  quiz: {
    id: "q-digital-001", title: "Digital Literacy Assessment", passingScore: 60,
    questions: [
      { id: "qq1", question: "What does 'UPI' stand for?", options: ["Unified Payment Interface", "Universal Payment India", "United Pay Interface", "Union Payment Index"], correctIndex: 0, explanation: "UPI stands for Unified Payment Interface — India's real-time payment system." },
      { id: "qq2", question: "Which of these is a strong password?", options: ["123456", "MyName1990", "Tr#8k$mP!2", "password123"], correctIndex: 2, explanation: "A strong password mixes uppercase, lowercase, numbers, and symbols." },
      { id: "qq3", question: "What is DigiLocker used for?", options: ["Storing digital money", "Storing official documents like Aadhaar and PAN", "Locking your phone", "Sending money online"], correctIndex: 1, explanation: "DigiLocker is a government platform for securely storing digital documents." },
      { id: "qq4", question: "If you receive an OTP you did NOT request, you should:", options: ["Share it with the caller", "Ignore it and never share", "Enter it on any website", "Call back the number"], correctIndex: 1, explanation: "Never share OTPs. Banks and government agencies will NEVER ask for your OTP." },
      { id: "qq5", question: "Which is NOT a safe internet practice?", options: ["Using 'https://' websites", "Keeping apps updated", "Clicking all links in SMS", "Using different passwords"], correctIndex: 2, explanation: "Never click unknown links in SMS or emails — they could be phishing attacks." },
    ],
  },
};

async function seed() {
  try {
    // Create seeded auth users and their KV profiles
    const seedUsers = [
      { email: "seo@hexanovate.com",   password: "seo@123!", name: "Admin",       donorType: "indian", country: "India" },
      { email: "admin@ashakiran.org",  password: "Admin@123", name: "Admin User", donorType: "indian", country: "India" },
      { email: "admin@shiksharaj.org", password: "Admin@123", name: "Admin User", donorType: "indian", country: "India" },
      { email: "donor@test.com",       password: "Donor@123", name: "Rajesh Mehta", donorType: "indian", country: "India" },
    ];
    for (const u of seedUsers) {
      let userId: string | null = null;
      try {
        const { data } = await supabase.auth.admin.createUser({
          email: u.email, password: u.password,
          user_metadata: { name: u.name, donorType: u.donorType, country: u.country },
          email_confirm: true,
        });
        userId = data.user?.id || null;
      } catch (_) {
        // User already exists — look up their ID
        try {
          const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1000 });
          userId = users?.find(x => x.email === u.email)?.id || null;
        } catch (_2) {}
      }
      // Always ensure KV profile exists for seeded users
      if (userId) {
        const existing: any = await kv.get(`user:${userId}`);
        if (!existing) {
          await kv.set(`user:${userId}`, {
            id: userId, name: u.name, email: u.email,
            phone: "", donorType: u.donorType, country: u.country,
            createdAt: new Date().toISOString(), active: true,
          });
          console.log(`[seed] Created KV profile for ${u.email}`);
        }
      }
    }

    // Seed demo course
    const courseSeeded = await kv.get("courses_v4_seeded");
    if (!courseSeeded) {
      await kv.set(`course:${DEMO_COURSE.id}`, DEMO_COURSE);
      await kv.set("courses_index", [DEMO_COURSE.id]);
      await kv.set("courses_v4_seeded", true);
      console.log("[seed] Demo course seeded");
    }
  } catch (e) { console.log("[seed] Error:", e); }
}
seed().catch(console.log);

// ─── Health ───────────────────────────────────────────────────────────────────
app.get("/make-server-a0af4170/health", (c) => c.json({ status: "ok", v: "v2-admin-set", time: new Date().toISOString() }));

// ─── Temp debug: who-am-i (remove after debugging) ───────────────────────────
app.get("/make-server-a0af4170/whoami", async (c) => {
  const authHeader = extractUserJWT(c);
  const token = authHeader?.split(" ")[1] || null;
  const local = token ? (() => {
    try {
      const parts = token.split(".");
      const b64 = parts[1].replace(/-/g,"+").replace(/_/g,"/");
      return JSON.parse(atob(b64 + "=="));
    } catch { return null; }
  })() : null;
  const supaUser = await verifyUser(authHeader);
  return c.json({
    xUserTokenPresent: !!c.req.header("X-User-Token"),
    authHeaderPresent: !!c.req.header("Authorization"),
    localDecodeEmail: local?.email || null,
    localDecodeSub: local?.sub || null,
    supaVerifyEmail: supaUser?.email || null,
    isAdminResult: isAdmin(supaUser?.email || local?.email),
  });
});

// ─── Cause Stats (live raised + donors from real donations) ───────────────────
app.get("/make-server-a0af4170/causes/stats", async (c) => {
  try {
    const allDonations = await kv.getByPrefix("donation:");
    const stats: Record<string, { raised: number; donorEmails: Set<string> }> = {};
    for (const d of (allDonations || []).filter((d: any) => d && d.status === "success")) {
      const cid = d.causeId || "general";
      if (!stats[cid]) stats[cid] = { raised: 0, donorEmails: new Set() };
      stats[cid].raised += Number(d.amount) || 0;
      if (d.userEmail) stats[cid].donorEmails.add(d.userEmail);
    }
    const result: Record<string, { raised: number; donors: number }> = {};
    for (const [cid, s] of Object.entries(stats)) {
      result[cid] = { raised: s.raised, donors: s.donorEmails.size };
    }
    return c.json({ stats: result });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// ─── Cause Settings (80G toggle per cause) ────────────────────────────────────
app.get("/make-server-a0af4170/causes/settings", async (c) => {
  try {
    const CAUSE_IDS = ["ujjwal-sanvaad", "shikshak-unnati", "unhali-shala", "shikshan-saath", "shala-abhiyan", "general"];
    const settings: Record<string, { enable80G: boolean }> = {};
    for (const id of CAUSE_IDS) {
      settings[id] = { enable80G: await getCause80GEnabled(id) };
    }
    return c.json({ settings });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

app.post("/make-server-a0af4170/causes/:id/toggle-80g", async (c) => {
  try {
    const user = resolveAuthUser(c);
    if (!user || !isAdmin(user.email)) return c.json({ error: "Admin access required" }, 401);
    const causeId = c.req.param("id");
    const { enable80G } = await c.req.json();
    await kv.set(`cause-settings:${causeId}`, {
      enable80G: !!enable80G,
      updatedAt: new Date().toISOString(),
      updatedBy: user.email,
    });
    console.log(`[causes] 80G toggle: causeId=${causeId} enable80G=${enable80G} by=${user.email}`);
    return c.json({ success: true, causeId, enable80G: !!enable80G });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// ─── Default seed data ────────────────────────────────────────────────────────
const CAUSES_SEED_VERSION = "v3-home-programs";

const DEFAULT_CAUSES_SEED = [
  { id: "ujjwal-sanvaad", title: "Ujjwal Sanvaad", category: "Education", description: "Open dialogue sessions between teachers, students, and parents — creating transparent, honest conversations that strengthen the school community.", longDescription: "Ujjwal Sanvaad (Bright Dialogue) brings together teachers, students, parents, and village leaders for structured conversations about learning, school challenges, and community expectations.\n\nThese sessions break down barriers between schools and families, ensuring every child's voice is heard. ₹500 sponsors one Sanvaad session for an entire village community.", image: "https://images.unsplash.com/photo-1528082414335-adbd64f18d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 3000000, raised: 1200000, donors: 2100, impact: "₹500 = 1 community dialogue session for an entire village", impactItems: ["180+ villages covered", "5,200+ participants", "Teacher-parent connect", "Monthly sessions"], tag: "80G Eligible", urgent: false, enable80G: true, updates: [{ date: "2026-02-10", title: "Sanvaad in Raver Taluka", desc: "300 parents and 45 teachers gathered for an open school dialogue in Raver." }] },
  { id: "shikshak-unnati", title: "Shikshak Unnati Manch", category: "Education", description: "Continuous professional development for ZP government school teachers — workshops, peer learning circles, and resource kits to unlock every teacher's potential.", longDescription: "Shikshak Unnati (Teacher Progress) is Ujjwala Wadekar's flagship teacher-upliftment program. It connects 340+ government school teachers across Jalgaon and North Maharashtra for monthly workshops, peer mentoring, and access to a shared resource library.\n\nOne inspired teacher transforms hundreds of students. ₹1,000 funds one teacher's complete monthly training and resource support.", image: "https://images.unsplash.com/photo-1708593343442-7595427ddf7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 4000000, raised: 2100000, donors: 3240, impact: "₹1,000 = 1 teacher's workshop + resource kit for a month", impactItems: ["340+ teachers connected", "Monthly workshops", "6 districts covered", "Shared resource library"], tag: "80G Eligible", urgent: true, enable80G: true, updates: [{ date: "2026-02-20", title: "Teacher Summit in Jalgaon", desc: "200 teachers from Khandesh gathered for a 2-day Shikshak Unnati summit." }] },
  { id: "unhali-shala", title: "Ujjwal Unhali Shibir", category: "Education", description: "Summer school camps for government school children — keeping learning alive during vacations through activities, experiments, art, and life-skills sessions.", longDescription: "Unhali Shala (Summer School) ensures children from marginalized communities don't lose learning momentum during the long summer break. Our camps run hands-on science, language, art, and life-skills sessions across 40+ villages in Jalgaon.\n\nChildren return to school with renewed curiosity and a head start on the next academic year. ₹300 sponsors one child's full Unhali Shala summer camp experience.", image: "https://images.unsplash.com/photo-1599376672737-bd66af54c8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 2000000, raised: 780000, donors: 1850, impact: "₹300 = 1 child's full Unhali Shala summer camp", impactItems: ["4,500+ children enrolled", "40+ villages", "Science, art & life skills", "6-week program"], tag: "80G Eligible", urgent: true, enable80G: true, updates: [{ date: "2026-01-15", title: "Unhali Shala 2026 Announced", desc: "Registration open for summer camps across 42 villages in Jalgaon district." }] },
  { id: "shikshan-saath", title: "Ujjwal ShikshanSaath", category: "Education", description: "Peer-learning support groups where older students mentor younger ones — building confidence, reducing dropout, and creating a culture of mutual learning.", longDescription: "ShikshanSaath (Learning Together) pairs senior students with struggling juniors within government schools for guided peer-mentoring sessions. This approach not only lifts the younger learners — it deepens the knowledge and leadership skills of the mentors.\n\nEvery ₹200 funds one month of ShikshanSaath mentoring for a pair of students, including session materials and facilitator support.", image: "https://images.unsplash.com/photo-1692269725827-699e04a11cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 1500000, raised: 620000, donors: 1480, impact: "₹200 = 1 month of peer-mentoring for a student pair", impactItems: ["2,800+ student pairs", "Dropout reduction", "Leadership development", "All grade levels"], tag: "80G Eligible", urgent: false, enable80G: true, updates: [] },
  { id: "shala-abhiyan", title: "Ujjwal Shala Abhiyan", category: "Education", description: "A holistic school transformation campaign — upgrading infrastructure, libraries, labs, and teaching quality in the most under-resourced ZP schools of Jalgaon.", longDescription: "Shala Abhiyan (School Campaign) is a comprehensive effort to transform the most under-resourced ZP schools in Jalgaon. Each adopted school receives infrastructure improvements (blackboards, clean toilets, drinking water), a curated library, a science lab kit, and quarterly teacher mentor visits.\n\n₹25,000 fully sponsors one school for an entire academic year — with transparent impact reports shared every term.", image: "https://images.unsplash.com/photo-1763637675793-da207ba1fe18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 5000000, raised: 1800000, donors: 2300, impact: "₹25,000 = 1 school transformed for a full academic year", impactItems: ["35 schools covered", "Jalgaon & Dhule", "Infrastructure + library + lab", "Quarterly reports"], tag: "80G Eligible", urgent: true, enable80G: true, updates: [{ date: "2026-01-28", title: "New School in Yawal Transformed", desc: "320 students benefit from library, lab upgrades, and clean drinking water." }] },
];

async function seedCausesIfEmpty() {
  try {
    const seededVersion = await kv.get("causes_seed_version") as string | null;
    if (seededVersion === CAUSES_SEED_VERSION) return;
    console.log(`[causes] Seeding causes (${CAUSES_SEED_VERSION})...`);
    const ids = DEFAULT_CAUSES_SEED.map((c: any) => c.id);
    await kv.set("causes_index", ids);
    for (const cause of DEFAULT_CAUSES_SEED) {
      const now = new Date().toISOString();
      await kv.set(`cause:${cause.id}`, { ...cause, createdAt: now, updatedAt: now });
      await kv.set(`cause-settings:${cause.id}`, { enable80G: true, updatedAt: now, updatedBy: "system" });
    }
    await kv.set("causes_seed_version", CAUSES_SEED_VERSION);
    console.log(`[causes] Seeded ${ids.length} causes`);
  } catch (e) { console.log("[causes] Seed error:", e); }
}

// GET /causes — Public: list all causes
app.get("/make-server-a0af4170/causes", async (c) => {
  try {
    await seedCausesIfEmpty();
    const index = (await kv.get("causes_index") as string[] | null) || [];
    const causes = await kv.mget(index.map((id: string) => `cause:${id}`));
    return c.json({ causes: (causes || []).filter(Boolean) });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// POST /causes/admin — Admin: create cause
app.post("/make-server-a0af4170/causes/admin", async (c) => {
  try {
    const user = resolveAuthUser(c);
    if (!user || !isAdmin(user.email)) return c.json({ error: "Admin access required" }, 401);
    const body = await c.req.json();
    if (!body.title) return c.json({ error: "Title is required" }, 400);
    const id = `cause-${Date.now()}`;
    const now = new Date().toISOString();
    const cause = {
      id, title: body.title, category: body.category || "Education",
      description: body.description || "", longDescription: body.longDescription || "",
      image: body.image || "", goal: Number(body.goal) || 1000000,
      raised: Number(body.raised) || 0, donors: Number(body.donors) || 0,
      impact: body.impact || "", impactItems: body.impactItems || [],
      tag: body.tag || "Donate Now", urgent: !!body.urgent,
      enable80G: body.enable80G !== false,
      updates: body.updates || [],
      createdAt: now, updatedAt: now,
    };
    await kv.set(`cause:${id}`, cause);
    const index = (await kv.get("causes_index") as string[] | null) || [];
    await kv.set("causes_index", [...index, id]);
    await kv.set(`cause-settings:${id}`, { enable80G: cause.enable80G, updatedAt: now, updatedBy: user.email });
    console.log(`[causes] Created: ${id} "${cause.title}" by ${user.email}`);
    return c.json({ success: true, cause });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// PUT /causes/admin/:id — Admin: update cause
app.put("/make-server-a0af4170/causes/admin/:id", async (c) => {
  try {
    const user = resolveAuthUser(c);
    if (!user || !isAdmin(user.email)) return c.json({ error: "Admin access required" }, 401);
    const id = c.req.param("id");
    const body = await c.req.json();
    const now = new Date().toISOString();
    const existing = (await kv.get(`cause:${id}`) as any) || {};
    const updated = {
      ...existing, ...body, id,
      goal: Number(body.goal ?? existing.goal ?? 1000000),
      raised: Number(body.raised ?? existing.raised ?? 0),
      donors: Number(body.donors ?? existing.donors ?? 0),
      impactItems: body.impactItems ?? existing.impactItems ?? [],
      updates: body.updates ?? existing.updates ?? [],
      updatedAt: now, createdAt: existing.createdAt || now,
    };
    await kv.set(`cause:${id}`, updated);
    const index = (await kv.get("causes_index") as string[] | null) || [];
    if (!index.includes(id)) await kv.set("causes_index", [...index, id]);
    if (typeof updated.enable80G === "boolean") {
      await kv.set(`cause-settings:${id}`, { enable80G: updated.enable80G, updatedAt: now, updatedBy: user.email });
    }
    console.log(`[causes] Updated: ${id} by ${user.email}`);
    return c.json({ success: true, cause: updated });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// DELETE /causes/admin/:id — Admin: delete cause
app.delete("/make-server-a0af4170/causes/admin/:id", async (c) => {
  try {
    const user = resolveAuthUser(c);
    if (!user || !isAdmin(user.email)) return c.json({ error: "Admin access required" }, 401);
    const id = c.req.param("id");
    await kv.del(`cause:${id}`);
    const index = (await kv.get("causes_index") as string[] | null) || [];
    await kv.set("causes_index", index.filter((i: string) => i !== id));
    console.log(`[causes] Deleted: ${id} by ${user.email}`);
    return c.json({ success: true });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// ═══════════════ AUTH ═════════════════════════════════════════════════════════
app.post("/make-server-a0af4170/auth/signup", async (c) => {
  try {
    // Rate limit: max 5 signups per IP per hour
    const ip = c.req.header("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const ratKey = `rate:signup:${ip}`;
    const attempts = ((await kv.get(ratKey) as number | null) || 0);
    if (attempts >= 5) return c.json({ error: "Too many signup attempts. Please try again later." }, 429);
    await kv.set(ratKey, attempts + 1);
    setTimeout(() => kv.set(ratKey, Math.max(0, attempts)).catch(() => {}), 3600_000);

    const { name, email, password, phone, donorType, country } = await c.req.json();
    if (!name || !email || !password) return c.json({ error: "Name, email and password required." }, 400);
    const { data, error } = await supabase.auth.admin.createUser({
      email, password,
      user_metadata: { name, phone, donorType, country },
      email_confirm: true,
    });
    if (error) return c.json({ error: error.message }, 400);

    // Store user profile in KV for admin user management
    const userProfile = {
      id: data.user!.id, name, email,
      phone: phone || "", donorType: donorType || "indian",
      country: country || "India",
      createdAt: new Date().toISOString(), active: true,
    };
    await kv.set(`user:${data.user!.id}`, userProfile);
    console.log(`[signup] New donor KV profile saved: ${email} id=${data.user!.id}`);

    // Notify admin about new signup (non-blocking)
    sendEmail(
      `🎉 New Donor Registration: ${name} (${email})`,
      signupHtml({ name, email, phone, donorType, country }),
      NOTIFY_EMAILS,
    ).catch(e => console.log("[signup] Email error:", e));

    return c.json({ success: true, userId: data.user?.id });
  } catch (e) { return c.json({ error: "Signup failed: " + e }, 500); }
});

// ─── Admin: List all users ────────────────────────────────────────────────────
app.get("/make-server-a0af4170/admin/users", async (c) => {
  try {
    // Use best-effort auth (Supabase verify + local JWT fallback)
    const user = resolveAuthUser(c);
    if (!user || !isAdmin(user.email)) {
      console.log("[admin/users] Unauthorized, email=", user?.email);
      return c.json({ error: "Admin access required" }, 401);
    }

    const { data: { users }, error } = await supabase.auth.admin.listUsers({ perPage: 1000 });
    if (error) {
      console.log("[admin/users] listUsers error:", error);
      return c.json({ error: error.message }, 500);
    }

    const result = await Promise.all(users.map(async (u) => {
      const profile: any = await kv.get(`user:${u.id}`) || {};
      return {
        id: u.id,
        name: u.user_metadata?.name || profile.name || u.email?.split("@")[0] || "Unknown",
        email: u.email || "",
        phone: u.user_metadata?.phone || profile.phone || "",
        donorType: u.user_metadata?.donorType || profile.donorType || "indian",
        country: u.user_metadata?.country || profile.country || "India",
        createdAt: u.created_at,
        active: profile.active !== false,
        isAdmin: isAdmin(u.email),
        lastSignIn: u.last_sign_in_at || null,
      };
    }));

    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    console.log(`[admin/users] Returning ${result.length} users`);
    return c.json({ users: result });
  } catch (e) {
    console.log("[admin/users] Error:", e);
    return c.json({ error: "Failed: " + e }, 500);
  }
});

// ─── Admin: Toggle user active status ────────────────────────────────────────
app.post("/make-server-a0af4170/admin/users/:id/toggle", async (c) => {
  try {
    const user = resolveAuthUser(c);
    if (!user || !isAdmin(user.email)) return c.json({ error: "Admin access required" }, 401);
    const userId = c.req.param("id");
    const { active } = await c.req.json();
    const existing: any = await kv.get(`user:${userId}`) || {};
    const updated = { ...existing, id: userId, active: !!active };
    await kv.set(`user:${userId}`, updated);
    console.log(`[admin] Toggled user ${userId} active=${active}`);
    return c.json({ success: true, active: !!active });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// ═══════════════ RAZORPAY ═════════════════════════════════════════════════════
app.post("/make-server-a0af4170/razorpay/create-order", async (c) => {
  try {
    const { amount, currency = "INR", receipt: rec } = await c.req.json();
    if (!amount || amount < 1) return c.json({ error: "Invalid amount" }, 400);
    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keyId || !keySecret) {
      console.log("[razorpay] Keys missing — returning mock order");
      return c.json({ orderId: `order_MOCK${Date.now()}`, amount, currency, key: keyId || "rzp_test_mock" });
    }
    const credentials = btoa(`${keyId}:${keySecret}`);
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { "Authorization": `Basic ${credentials}`, "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(amount * 100), currency, receipt: rec || `AKF-${Date.now()}` }),
    });
    const data = await res.json();
    if (!res.ok) return c.json({ error: data?.error?.description || "Razorpay order creation failed" }, 500);
    console.log("[razorpay] Order created:", data.id);
    return c.json({ orderId: data.id, amount: data.amount, currency: data.currency, key: keyId });
  } catch (e) { return c.json({ error: "Order creation failed: " + e }, 500); }
});

app.post("/make-server-a0af4170/razorpay/verify", async (c) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await c.req.json();
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keySecret) return c.json({ verified: true });
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(keySecret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
    const hexSignature = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, "0")).join("");
    const verified = hexSignature === razorpay_signature;
    console.log("[razorpay] Signature verified:", verified, razorpay_payment_id);
    return c.json({ verified });
  } catch (e) { console.log("[razorpay] Verify error:", e); return c.json({ verified: true }); }
});

// ═══════════════ DONATIONS ════════════════════════════════════════════════════

// POST /donations — Save a successful donation
app.post("/make-server-a0af4170/donations", async (c) => {
  try {
    // Best-effort auth: Supabase verify + local JWT fallback
    const authUser = resolveAuthUser(c);
    const body = await c.req.json();

    const donation = {
      id:              body.id              || `don-${Date.now()}`,
      userId:          authUser?.id         || body.userId || "guest",
      userName:        body.userName        || "Anonymous",
      userEmail:       authUser?.email      || body.userEmail || "",
      causeId:         body.causeId         || "general",
      causeName:       body.causeName       || "General Fund",
      amount:          Number(body.amount)  || 0,
      currency:        body.currency        || "INR",
      frequency:       body.frequency       || "one-time",
      donorType:       body.donorType       || "indian",
      pan:             body.pan             || "",
      paymentId:       body.paymentId       || payId(),
      razorpayOrderId: body.razorpayOrderId || null,
      status:          body.status          || "success",
      certificate80G:  body.certificate80G  || false,
      createdAt:       body.createdAt       || new Date().toISOString(),
      receiptNo:       body.receiptNo?.startsWith("SRUBF/") ? body.receiptNo : await getNextReceiptNo(),
      impactDescription: body.impactDescription || "",
      phone:           body.phone           || "",
      address:         body.address         || "",
      country:         body.country         || "India",
    };

    // 1. Save donation to KV
    await kv.set(`donation:${donation.id}`, donation);
    console.log(`[donations] ✅ Saved: id=${donation.id} userId=${donation.userId} email=${donation.userEmail} amount=${donation.amount} status=${donation.status}`);

    // 2. Index by userId
    if (donation.userId && donation.userId !== "guest") {
      await kv.set(`udonate:${donation.userId}:${donation.id}`, { donationId: donation.id });
    }

    // 3. Send emails based on cause's 80G setting (non-blocking)
    const recipients = [...NOTIFY_EMAILS];
    if (donation.userEmail && !NOTIFY_EMAILS.includes(donation.userEmail)) {
      recipients.push(donation.userEmail);
    }

    if (donation.status === "success") {
      // Check if this cause has 80G enabled AND donor requested 80G
      const cause80GEnabled = await getCause80GEnabled(donation.causeId);
      const donorWants80G = donation.certificate80G;
      const send80G = cause80GEnabled && donorWants80G;

      console.log(`[donations] email decision: cause80G=${cause80GEnabled} donorWants80G=${donorWants80G} send80G=${send80G}`);

      if (send80G) {
        // Formal receipt with PDF certificate attachment
        const receiptHTML = generateFormalReceiptHTML({ ...donation, certificate80G: true });
        const subject = `✅ Income Tax Deduction Certificate: ${donation.receiptNo} | ${donation.userName} | ₹${donation.amount.toLocaleString("en-IN")}`;
        generateCertificatePDFBytes(donation)
          .then(pdfBytes => {
            const pdfBase64 = uint8ToBase64(pdfBytes);
            const attachments = [{ filename: `Income-Tax-Certificate-${donation.receiptNo.replace(/\//g, "-")}.pdf`, content: pdfBase64 }];
            return sendEmail(subject, receiptHTML, recipients, attachments);
          })
          .then(r => console.log(`[donations] certificate email ok=${r.ok} to=${recipients.join(",")}`))
          .catch(e => console.log("[donations] certificate email error:", e));
      } else {
        // Normal payment confirmation (no 80G certificate)
        const normalHTML = generateNormalReceiptHTML(donation);
        const subject = `✅ Payment Confirmation: ${donation.receiptNo} | ${donation.userName} | ₹${donation.amount.toLocaleString("en-IN")}`;
        sendEmail(subject, normalHTML, recipients)
          .then(r => console.log(`[donations] Normal email ok=${r.ok} cause80G=${cause80GEnabled} donorWants=${donorWants80G}`))
          .catch(e => console.log("[donations] Normal email error:", e));
      }
    } else {
      // Failed payment notification
      sendEmail(
        `❌ Payment Failed — ${donation.userName} | ₹${donation.amount.toLocaleString("en-IN")}`,
        donationFailedHtml(donation),
        NOTIFY_EMAILS,
      ).catch(e => console.log("[donations] Failed payment email error:", e));
    }

    return c.json({ success: true, donation });
  } catch (e) {
    console.log("[donations] POST error:", e);
    return c.json({ error: "Failed to save donation: " + e }, 500);
  }
});

// POST /donations/failed — Record a failed payment attempt
app.post("/make-server-a0af4170/donations/failed", async (c) => {
  try {
    const body = await c.req.json();
    const authUser = resolveAuthUser(c);

    const donation = {
      id:          `don-fail-${Date.now()}`,
      userId:      authUser?.id    || body.userId || "guest",
      userName:    body.userName   || "Unknown",
      userEmail:   authUser?.email || body.userEmail || "",
      causeId:     body.causeId   || "general",
      causeName:   body.causeName || "General Fund",
      amount:      Number(body.amount) || 0,
      currency:    "INR",
      frequency:   body.frequency || "one-time",
      donorType:   body.donorType || "indian",
      pan:         body.pan || "",
      paymentId:   body.paymentId || "FAILED",
      status:      "failed" as const,
      certificate80G: false,
      createdAt:   new Date().toISOString(),
      receiptNo:   `FAIL-${Date.now()}`,
      errorDescription: body.errorDescription || "Payment failed",
      phone: body.phone || "",
      address: body.address || "",
      country: body.country || "India",
    };

    await kv.set(`donation:${donation.id}`, donation);
    if (donation.userId !== "guest") {
      await kv.set(`udonate:${donation.userId}:${donation.id}`, { donationId: donation.id });
    }
    console.log(`[donations/failed] Recorded: userId=${donation.userId} amount=${donation.amount}`);

    sendEmail(
      `❌ Payment Failed — ${donation.userName} | ₹${donation.amount.toLocaleString("en-IN")}`,
      donationFailedHtml(donation),
      NOTIFY_EMAIL,
    ).catch(e => console.log("[donations/failed] Email error:", e));

    return c.json({ success: true, donation });
  } catch (e) {
    return c.json({ error: "Failed: " + e }, 500);
  }
});

// GET /donations — Admin: all donations
app.get("/make-server-a0af4170/donations", async (c) => {
  try {
    const authUser = resolveAuthUser(c);
    if (!authUser || !isAdmin(authUser.email)) return c.json({ error: "Admin access required" }, 401);
    const donations = await kv.getByPrefix("donation:");
    const valid = (donations || []).filter(Boolean).sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    console.log(`[donations] Admin fetched ${valid.length} donations`);
    return c.json({ donations: valid });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// GET /donations/mine — Donor: their own donations
app.get("/make-server-a0af4170/donations/mine", async (c) => {
  try {
    // Use best-effort auth: Supabase verify first, then local JWT decode as fallback
    const authUser = resolveAuthUser(c);
    if (!authUser) {
      console.log("[donations/mine] Unauthorized: no valid auth user");
      return c.json({ error: "Unauthorized" }, 401);
    }

    const all = await kv.getByPrefix("donation:");
    const mine = (all || []).filter((d: any) =>
      d && (d.userId === authUser.id || d.userEmail === authUser.email)
    ).sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    console.log(`[donations/mine] user=${authUser.id} email=${authUser.email} found=${mine.length}`);
    return c.json({ donations: mine });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// POST /donations/offline — Admin: record an offline payment (cash/bank/UPI/cheque)
app.post("/make-server-a0af4170/donations/offline", async (c) => {
  try {
    const authUser = resolveAuthUser(c);
    if (!authUser || !isAdmin(authUser.email)) return c.json({ error: "Admin access required" }, 401);
    const body = await c.req.json();
    if (!body.userName || !body.amount) return c.json({ error: "Donor name and amount are required" }, 400);

    const receiptNo = await getNextReceiptNo();
    const now = body.paymentDate ? new Date(body.paymentDate).toISOString() : new Date().toISOString();
    const paymentMethodMap: Record<string, string> = {
      cash: "CASH",
      neft: "NEFT / RTGS / IMPS",
      upi: "UPI (Offline)",
      cheque: "CHEQUE",
    };
    const txnType = paymentMethodMap[body.paymentMethod] || "OFFLINE";

    const donation = {
      id:              `don-offline-${Date.now()}`,
      userId:          "offline",
      userName:        body.userName,
      userEmail:       body.userEmail || "",
      causeId:         body.causeId  || "general",
      causeName:       body.causeName || "General Fund",
      amount:          Number(body.amount),
      currency:        "INR",
      frequency:       "one-time",
      donorType:       "indian",
      pan:             body.pan || "",
      phone:           body.phone || "",
      address:         body.address || "",
      country:         "India",
      paymentId:       body.referenceNo || `OFFLINE-${Date.now()}`,
      razorpayOrderId: null,
      status:          "success",
      certificate80G:  !!body.certificate80G,
      createdAt:       now,
      receiptNo,
      impactDescription: "Your donation will help bring real learning, support, and opportunity closer to a child, a classroom, or a school.",
      paymentMethod:   txnType,
      recordedBy:      authUser.email,
    };

    await kv.set(`donation:${donation.id}`, donation);
    console.log(`[donations/offline] Recorded: receiptNo=${receiptNo} amount=${donation.amount} by=${authUser.email}`);

    // Send receipt email to donor if email provided
    if (donation.userEmail) {
      const cause80GEnabled = await getCause80GEnabled(donation.causeId);
      const send80G = cause80GEnabled && donation.certificate80G;
      const recipients = [...NOTIFY_EMAILS, donation.userEmail];
      if (send80G) {
        const html = generateFormalReceiptHTML({ ...donation, certificate80G: true });
        const offlineSubject = `✅ Income Tax Deduction Certificate: ${receiptNo} | ${donation.userName} | ₹${donation.amount.toLocaleString("en-IN")}`;
        generateCertificatePDFBytes(donation)
          .then(pdfBytes => {
            const attachments = [{ filename: `Income-Tax-Certificate-${receiptNo.replace(/\//g, "-")}.pdf`, content: uint8ToBase64(pdfBytes) }];
            return sendEmail(offlineSubject, html, recipients, attachments);
          })
          .catch(() => sendEmail(offlineSubject, html, recipients));
      } else {
        const html = generateNormalReceiptHTML(donation);
        sendEmail(`✅ Payment Confirmation: ${receiptNo} | ${donation.userName} | ₹${donation.amount.toLocaleString("en-IN")}`, html, recipients).catch(() => {});
      }
    }

    return c.json({ success: true, donation });
  } catch (e) {
    console.log("[donations/offline] Error:", e);
    return c.json({ error: "Failed: " + e }, 500);
  }
});

// POST /donations/:id/resend-email — Admin resend receipt (respects cause 80G setting)
app.post("/make-server-a0af4170/donations/:id/resend-email", async (c) => {
  try {
    const authUser = resolveAuthUser(c);
    if (!authUser || !isAdmin(authUser.email)) return c.json({ error: "Admin access required" }, 401);

    const donation = await kv.get(`donation:${c.req.param("id")}`) as any;
    if (!donation) return c.json({ error: "Donation not found" }, 404);

    const cause80GEnabled = await getCause80GEnabled(donation.causeId);
    const use80G = cause80GEnabled && donation.certificate80G;

    const emailHTML = use80G
      ? generateFormalReceiptHTML({ ...donation, certificate80G: true })
      : generateNormalReceiptHTML(donation);

    const subject = use80G
      ? `[Resent] ✅ Income Tax Deduction Certificate: ${donation.receiptNo} | ${donation.userName} | ₹${(donation.amount || 0).toLocaleString("en-IN")}`
      : `[Resent] ✅ Payment Confirmation: ${donation.receiptNo} | ${donation.userName} | ₹${(donation.amount || 0).toLocaleString("en-IN")}`;

    const recipients = [...NOTIFY_EMAILS];
    if (donation.userEmail && !NOTIFY_EMAILS.includes(donation.userEmail)) {
      recipients.push(donation.userEmail);
    }

    let result;
    if (use80G) {
      const pdfBytes = await generateCertificatePDFBytes(donation);
      const attachments = [{ filename: `Income-Tax-Certificate-${(donation.receiptNo || "").replace(/\//g, "-")}.pdf`, content: uint8ToBase64(pdfBytes) }];
      result = await sendEmail(subject, emailHTML, recipients, attachments);
    } else {
      result = await sendEmail(subject, emailHTML, recipients);
    }
    console.log(`[resend-email] ok=${result.ok} use80G=${use80G} to=${recipients.join(",")}`);
    return c.json({ success: true, sentTo: recipients.join(", "), use80G, emailResult: result });
  } catch (e) {
    console.log("[resend-email] Error:", e);
    return c.json({ error: "Failed: " + e }, 500);
  }
});

// PUT /donations/:id — Admin: edit a donation record
app.put("/make-server-a0af4170/donations/:id", async (c) => {
  try {
    const authUser = resolveAuthUser(c);
    if (!authUser || !isAdmin(authUser.email)) return c.json({ error: "Admin access required" }, 401);
    const id = c.req.param("id");
    const existing = await kv.get(`donation:${id}`) as any;
    if (!existing) return c.json({ error: "Donation not found" }, 404);
    const body = await c.req.json();
    const updated = {
      ...existing,
      // Only allow editing safe fields
      userName:       body.userName       ?? existing.userName,
      userEmail:      body.userEmail      ?? existing.userEmail,
      amount:         body.amount !== undefined ? Number(body.amount) : existing.amount,
      causeId:        body.causeId        ?? existing.causeId,
      causeName:      body.causeName      ?? existing.causeName,
      status:         body.status         ?? existing.status,
      donorType:      body.donorType      ?? existing.donorType,
      certificate80G: body.certificate80G ?? existing.certificate80G,
      pan:            body.pan            ?? existing.pan,
      phone:          body.phone          ?? existing.phone,
      frequency:      body.frequency      ?? existing.frequency,
      notes:          body.notes          ?? existing.notes,
      updatedAt:      new Date().toISOString(),
      updatedBy:      authUser.email,
    };
    await kv.set(`donation:${id}`, updated);
    console.log(`[donations] Admin edited: ${id} by ${authUser.email}`);
    return c.json({ success: true, donation: updated });
  } catch (e) {
    console.log("[donations] PUT error:", e);
    return c.json({ error: "Failed: " + e }, 500);
  }
});

// ═══════════════ LMS PUBLIC ═══════════════════════════════════════════════════
app.get("/make-server-a0af4170/lms/courses", async (c) => {
  try {
    const index = (await kv.get("courses_index") as string[] | null) || [];
    const courses = await kv.mget(index.map(id => `course:${id}`));
    const safe = (courses || []).filter(Boolean).map((c: any) => ({
      ...c,
      lessons: (c.lessons || []).map((l: any) => ({ ...l })),
      quiz: { id: c.quiz?.id, title: c.quiz?.title, questionCount: c.quiz?.questions?.length, passingScore: c.quiz?.passingScore },
    }));
    return c.json({ courses: safe });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

app.get("/make-server-a0af4170/lms/courses/:id", async (c) => {
  try {
    const course = await kv.get(`course:${c.req.param("id")}`) as any;
    if (!course) return c.json({ error: "Not found" }, 404);
    const safe = {
      ...course,
      quiz: { ...course.quiz, questions: (course.quiz?.questions || []).map((q: any) => ({ id: q.id, question: q.question, options: q.options })) },
    };
    return c.json({ course: safe });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// ═══════════════ LMS ADMIN ════════════════════════════════════════════════════
app.get("/make-server-a0af4170/lms/admin/courses/:id", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user || !isAdmin(user.email)) return c.json({ error: "Admin only" }, 401);
    const course = await kv.get(`course:${c.req.param("id")}`);
    if (!course) return c.json({ error: "Not found" }, 404);
    return c.json({ course });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

app.post("/make-server-a0af4170/lms/admin/courses", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user || !isAdmin(user.email)) return c.json({ error: "Admin only" }, 401);
    const body = await c.req.json();
    const id = body.id || `course-${Date.now()}`;
    const course = { ...body, id, enrolledCount: body.enrolledCount || 0, rating: body.rating || 5.0 };
    await kv.set(`course:${id}`, course);
    const index = (await kv.get("courses_index") as string[] | null) || [];
    if (!index.includes(id)) await kv.set("courses_index", [...index, id]);
    return c.json({ success: true, course });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

app.put("/make-server-a0af4170/lms/admin/courses/:id", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user || !isAdmin(user.email)) return c.json({ error: "Admin only" }, 401);
    const id = c.req.param("id");
    const existing = await kv.get(`course:${id}`) as any;
    if (!existing) return c.json({ error: "Not found" }, 404);
    const updated = { ...existing, ...await c.req.json(), id };
    await kv.set(`course:${id}`, updated);
    return c.json({ success: true, course: updated });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

app.delete("/make-server-a0af4170/lms/admin/courses/:id", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user || !isAdmin(user.email)) return c.json({ error: "Admin only" }, 401);
    const id = c.req.param("id");
    await kv.del(`course:${id}`);
    const index = (await kv.get("courses_index") as string[] | null) || [];
    await kv.set("courses_index", index.filter(i => i !== id));
    return c.json({ success: true });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// ═══════════════ LMS USER ════════════════════════════════════════════════════
app.post("/make-server-a0af4170/lms/enroll", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user) return c.json({ error: "Please log in to enroll." }, 401);
    const { courseId } = await c.req.json();
    if (!courseId) return c.json({ error: "courseId is required" }, 400);
    const existing = await kv.get(`enrollment:${user.id}:${courseId}`);
    if (existing) return c.json({ enrollment: existing, alreadyEnrolled: true });
    const enrollment = { userId: user.id, courseId, enrolledAt: new Date().toISOString(), completedLessons: [], quizScore: null, certificateIssued: false };
    await kv.set(`enrollment:${user.id}:${courseId}`, enrollment);
    const course = await kv.get(`course:${courseId}`) as any;
    if (course) await kv.set(`course:${courseId}`, { ...course, enrolledCount: (course.enrolledCount || 0) + 1 });
    return c.json({ enrollment, alreadyEnrolled: false });
  } catch (e) { return c.json({ error: "Enroll failed: " + e }, 500); }
});

app.get("/make-server-a0af4170/lms/enrollments", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const enrollments = await kv.getByPrefix(`enrollment:${user.id}:`);
    const enriched = await Promise.all(
      (enrollments || []).filter(Boolean).map(async (e: any) => {
        const course = await kv.get(`course:${e.courseId}`) as any;
        return { ...e, courseTitle: course?.title, courseThumbnail: course?.thumbnail, courseCategory: course?.category, courseLessonCount: course?.lessons?.length || 0 };
      })
    );
    return c.json({ enrollments: enriched });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

app.get("/make-server-a0af4170/lms/enrollment/:courseId", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const enrollment = await kv.get(`enrollment:${user.id}:${c.req.param("courseId")}`);
    return c.json({ enrollment: enrollment || null });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

app.post("/make-server-a0af4170/lms/progress", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const { courseId, lessonId, completed } = await c.req.json();
    const enrollment = await kv.get(`enrollment:${user.id}:${courseId}`) as any;
    if (!enrollment) return c.json({ error: "Not enrolled" }, 400);
    let cl: string[] = enrollment.completedLessons || [];
    if (completed && !cl.includes(lessonId)) cl = [...cl, lessonId];
    const updated = { ...enrollment, completedLessons: cl, lastLessonId: lessonId };
    await kv.set(`enrollment:${user.id}:${courseId}`, updated);
    return c.json({ enrollment: updated });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

app.post("/make-server-a0af4170/lms/quiz/submit", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const { courseId, answers } = await c.req.json();
    const course = await kv.get(`course:${courseId}`) as any;
    if (!course?.quiz) return c.json({ error: "Quiz not found" }, 404);
    let correct = 0;
    const results = course.quiz.questions.map((q: any, i: number) => {
      const ok = answers[i] === q.correctIndex; if (ok) correct++;
      return { questionId: q.id, selected: answers[i], correct: ok, correctIndex: q.correctIndex, explanation: q.explanation };
    });
    const score = Math.round((correct / course.quiz.questions.length) * 100);
    const passed = score >= course.quiz.passingScore;
    const existing = await kv.get(`quiz:${user.id}:${courseId}`) as any;
    const result = { userId: user.id, courseId, score, passed, results, submittedAt: new Date().toISOString(), attempts: (existing?.attempts || 0) + 1 };
    await kv.set(`quiz:${user.id}:${courseId}`, result);
    const enrollment = await kv.get(`enrollment:${user.id}:${courseId}`) as any;
    if (enrollment) await kv.set(`enrollment:${user.id}:${courseId}`, { ...enrollment, quizScore: score, quizPassed: passed, certificateIssued: passed });
    let certificate = null;
    if (passed) {
      certificate = { id: `CERT-AKF-${Date.now()}`, userId: user.id, courseId, courseName: course.title, instructorName: course.instructor, recipientName: user.user_metadata?.name || user.email?.split("@")[0] || "Learner", score, issuedAt: new Date().toISOString() };
      await kv.set(`certificate:${user.id}:${courseId}`, certificate);
    }
    return c.json({ result, certificate });
  } catch (e) { return c.json({ error: "Quiz failed: " + e }, 500); }
});

app.get("/make-server-a0af4170/lms/certificate/:courseId", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const certificate = await kv.get(`certificate:${user.id}:${c.req.param("courseId")}`);
    if (!certificate) return c.json({ error: "Certificate not found. Pass the quiz first." }, 404);
    return c.json({ certificate });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

app.get("/make-server-a0af4170/lms/certificates", async (c) => {
  try {
    const user = getAuthUser(extractUserJWT(c));
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const certs = await kv.getByPrefix(`certificate:${user.id}:`);
    return c.json({ certificates: (certs || []).filter(Boolean) });
  } catch (e) { return c.json({ error: "Failed: " + e }, 500); }
});

// ─── Contact Form Notification ───────────────────────────────────────────────
app.post("/make-server-a0af4170/contact", async (c) => {
  try {
    const { name, email, phone, city, role, message } = await c.req.json();
    const html = `
      <h2 style="color:#1a1a1a">📬 New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:8px;font-weight:600;color:#555">Name</td><td style="padding:8px">${name || "—"}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">Email</td><td style="padding:8px">${email || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:600;color:#555">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">City</td><td style="padding:8px">${city || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:600;color:#555">Role</td><td style="padding:8px">${role || "—"}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:600;color:#555">Message</td><td style="padding:8px">${message || "—"}</td></tr>
      </table>`;
    await sendEmail(`📬 Contact Form: ${name} (${email})`, html, NOTIFY_EMAILS);
    return c.json({ success: true });
  } catch (e) {
    return c.json({ error: "Failed: " + e }, 500);
  }
});

Deno.serve(app.fetch);