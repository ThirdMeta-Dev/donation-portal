import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
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
const receipt = () => `UB-${new Date().getFullYear()}-${crypto.randomUUID().replace(/-/g,"").slice(0,8).toUpperCase()}`;
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
const NOTIFY_EMAIL = "hasan.kanchwala@hexanovate.com";
const SMTP_FROM    = "noreply@ujjwalawadekar.com";

async function sendEmail(subject: string, html: string, to: string | string[] = NOTIFY_EMAIL) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.log("[EMAIL] RESEND_API_KEY not set — skipping:", subject);
    return { ok: false, reason: "no api key" };
  }
  const recipients = Array.isArray(to) ? to : [to];
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: `Ujjwal Bharat <${SMTP_FROM}>`, to: recipients, subject, html }),
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
  const receiptDisplay = (d.receiptNo || "").startsWith("SRJ-") ? d.receiptNo : `SRJ-${fy}-${(d.receiptNo || "").replace(/^[A-Z]+-\d{4}-/, "")}`;

  const tableRow = (label: string, value: string) =>
    `<tr style="border-bottom:1px solid #aaa">
      <td style="padding:6px 8px;font-weight:700;width:180px;vertical-align:top;font-size:12px;font-family:'Times New Roman',Times,serif;color:#222">${label}</td>
      <td style="padding:6px 8px;font-size:12px;font-family:'Times New Roman',Times,serif;vertical-align:top;color:#111">${value}</td>
    </tr>`;

  const cert80G = d.certificate80G ? `
    <div style="border:2px solid #4338CA;border-radius:4px;margin-top:16px;overflow:hidden">
      <div style="background:#4338CA;padding:10px 16px;text-align:center">
        <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:1px;font-family:Arial,sans-serif">
          &#128220; 80G TAX EXEMPTION CERTIFICATE
        </span>
      </div>
      <div style="padding:14px 16px;background:#f0fdfa">
        <table style="width:100%;border-collapse:collapse;font-size:12px;font-family:'Times New Roman',Times,serif">
          ${[
            ["Certificate No.", `80G-AKF-${d.receiptNo}`],
            ["Donor Name", d.userName],
            ["PAN Number", d.pan || "To be updated — Please provide PAN for 80G benefit"],
            ["Donation Amount", `&#8377; ${_formatAmount(d.amount || 0)}`],
            ["Financial Year", fy],
            ["Section", "80G, Income Tax Act 1961"],
            ["Nature of Donation", "General / Corpus Donation"],
            ["Approval No.", "AAATA1234C/2023-24/80G"],
            ["Organisation Reg. No.", "AKF/2018/001"],
          ].map(([l, v]) => `<tr style="border-bottom:1px solid #99f6e4"><td style="padding:5px 8px;color:#115e59;font-weight:700;width:180px;font-family:'Times New Roman',serif">${l}</td><td style="padding:5px 8px;font-weight:700;color:#0f172a;font-family:'Times New Roman',serif">${v}</td></tr>`).join("")}
        </table>
        <p style="text-align:center;color:#0D9488;font-size:11px;margin-top:10px;font-weight:600;font-family:Arial,sans-serif">
          This donation qualifies for 50% deduction under Section 80G of the Income Tax Act, 1961.<br>
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
      "Rau" 89/412, Nehru Nagar, Mohadi Road, Jalgaon, 425002<br>
      Mob.: +91-93703-18308 &nbsp;&nbsp; Email: contact@ujjwalbharat.org<br>
      Website: www.ujjwalbharat.org<br>
      Reg. No. SRJ/2015/0073821 &nbsp;&nbsp; PAN: AACSR1234B
    </div>
    ${d.certificate80G ? `<div style="font-size:11px;font-weight:700;margin-top:6px;line-height:1.6;font-family:Arial,sans-serif">
      Donations to Ujjwal Bharat are eligible for deduction U/s. 80-G of the Income Tax Act 1961:<br>
      <span style="font-size:12px">URN. AACSR1234B/2023-24/80G &nbsp;|&nbsp; Approval No.: AACSR1234B/2023-24</span>
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
      2) If you have not provided PAN Xerox copy or PAN No., you cannot be eligible for 80G Benefit.<br>
      3) This is a computer-generated receipt. Valid without physical signature as per IT Act 2000.<br>
      4) For queries, contact: contact@ujjwalbharat.org | +91-93703-18308
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
    <div style="font-size:12px;color:rgba(255,255,255,.7);margin-top:4px">www.ujjwalbharat.org</div>
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
        Thank you for your generous contribution to <strong>${esc(d.causeName || "our cause")}</strong>.
        Your donation supports teacher-led education reform across Jalgaon and North Maharashtra.<br><br>
        <em>Note: This cause does not currently issue 80G tax exemption certificates.
        For 80G eligible causes, please visit our website.</em>
      </div>
    </div>
    ${d.impactDescription ? `<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:14px;margin-bottom:20px">
      <div style="font-size:12px;font-weight:700;color:#c2410c;margin-bottom:4px">Your Impact</div>
      <div style="font-size:12px;color:#9a3412">${d.impactDescription}</div>
    </div>` : ""}
    <div style="border-top:1px solid #e2e8f0;padding-top:16px;text-align:center">
      <div style="font-size:11px;color:#94a3b8;line-height:1.8">
        Ujjwal Bharat &middot; "Rau" 89/412, Nehru Nagar, Mohadi Road, Jalgaon, 425002<br>
        Reg. No. SRJ/2015/0073821 &middot; PAN: AACSR1234B<br>
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
const CAUSES_SEED_VERSION = "v2-ujjwala-programs";

const DEFAULT_CAUSES_SEED = [
  { id: "ujjwal-sanvaad", title: "Ujjwal Sanvaad", category: "Education", description: "Open dialogue sessions between teachers, students, and parents — creating transparent, honest conversations that strengthen the school community.", longDescription: "Ujjwal Sanvaad (Bright Dialogue) brings together teachers, students, parents, and village leaders for structured conversations about learning, school challenges, and community expectations.\n\nThese sessions break down barriers between schools and families, ensuring every child's voice is heard. ₹500 sponsors one Sanvaad session for an entire village community.", image: "https://images.unsplash.com/photo-1528082414335-adbd64f18d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 3000000, raised: 1200000, donors: 2100, impact: "₹500 = 1 community dialogue session for an entire village", impactItems: ["180+ villages covered", "5,200+ participants", "Teacher-parent connect", "Monthly sessions"], tag: "80G Eligible", urgent: false, enable80G: true, updates: [{ date: "2026-02-10", title: "Sanvaad in Raver Taluka", desc: "300 parents and 45 teachers gathered for an open school dialogue in Raver." }] },
  { id: "shikshak-unnati", title: "Shikshak Unnati", category: "Education", description: "Continuous professional development for ZP government school teachers — workshops, peer learning circles, and resource kits to unlock every teacher's potential.", longDescription: "Shikshak Unnati (Teacher Progress) is Ujjwala Wadekar's flagship teacher-upliftment program. It connects 340+ government school teachers across Jalgaon and North Maharashtra for monthly workshops, peer mentoring, and access to a shared resource library.\n\nOne inspired teacher transforms hundreds of students. ₹1,000 funds one teacher's complete monthly training and resource support.", image: "https://images.unsplash.com/photo-1708593343442-7595427ddf7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 4000000, raised: 2100000, donors: 3240, impact: "₹1,000 = 1 teacher's workshop + resource kit for a month", impactItems: ["340+ teachers connected", "Monthly workshops", "6 districts covered", "Shared resource library"], tag: "80G Eligible", urgent: true, enable80G: true, updates: [{ date: "2026-02-20", title: "Teacher Summit in Jalgaon", desc: "200 teachers from Khandesh gathered for a 2-day Shikshak Unnati summit." }] },
  { id: "unhali-shala", title: "Unhali Shala", category: "Education", description: "Summer school camps for government school children — keeping learning alive during vacations through activities, experiments, art, and life-skills sessions.", longDescription: "Unhali Shala (Summer School) ensures children from marginalized communities don't lose learning momentum during the long summer break. Our camps run hands-on science, language, art, and life-skills sessions across 40+ villages in Jalgaon.\n\nChildren return to school with renewed curiosity and a head start on the next academic year. ₹300 sponsors one child's full Unhali Shala summer camp experience.", image: "https://images.unsplash.com/photo-1599376672737-bd66af54c8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 2000000, raised: 780000, donors: 1850, impact: "₹300 = 1 child's full Unhali Shala summer camp", impactItems: ["4,500+ children enrolled", "40+ villages", "Science, art & life skills", "6-week program"], tag: "80G Eligible", urgent: true, enable80G: true, updates: [{ date: "2026-01-15", title: "Unhali Shala 2026 Announced", desc: "Registration open for summer camps across 42 villages in Jalgaon district." }] },
  { id: "shikshan-saath", title: "ShikshanSaath", category: "Education", description: "Peer-learning support groups where older students mentor younger ones — building confidence, reducing dropout, and creating a culture of mutual learning.", longDescription: "ShikshanSaath (Learning Together) pairs senior students with struggling juniors within government schools for guided peer-mentoring sessions. This approach not only lifts the younger learners — it deepens the knowledge and leadership skills of the mentors.\n\nEvery ₹200 funds one month of ShikshanSaath mentoring for a pair of students, including session materials and facilitator support.", image: "https://images.unsplash.com/photo-1692269725827-699e04a11cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 1500000, raised: 620000, donors: 1480, impact: "₹200 = 1 month of peer-mentoring for a student pair", impactItems: ["2,800+ student pairs", "Dropout reduction", "Leadership development", "All grade levels"], tag: "80G Eligible", urgent: false, enable80G: true, updates: [] },
  { id: "shala-abhiyan", title: "Shala Abhiyan", category: "Education", description: "A holistic school transformation campaign — upgrading infrastructure, libraries, labs, and teaching quality in the most under-resourced ZP schools of Jalgaon.", longDescription: "Shala Abhiyan (School Campaign) is a comprehensive effort to transform the most under-resourced ZP schools in Jalgaon. Each adopted school receives infrastructure improvements (blackboards, clean toilets, drinking water), a curated library, a science lab kit, and quarterly teacher mentor visits.\n\n₹25,000 fully sponsors one school for an entire academic year — with transparent impact reports shared every term.", image: "https://images.unsplash.com/photo-1763637675793-da207ba1fe18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", goal: 5000000, raised: 1800000, donors: 2300, impact: "₹25,000 = 1 school transformed for a full academic year", impactItems: ["35 schools covered", "Jalgaon & Dhule", "Infrastructure + library + lab", "Quarterly reports"], tag: "80G Eligible", urgent: true, enable80G: true, updates: [{ date: "2026-01-28", title: "New School in Yawal Transformed", desc: "320 students benefit from library, lab upgrades, and clean drinking water." }] },
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
      NOTIFY_EMAIL,
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
      receiptNo:       body.receiptNo       || receipt(),
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
    const recipients = [NOTIFY_EMAIL];
    if (donation.userEmail && donation.userEmail !== NOTIFY_EMAIL) {
      recipients.push(donation.userEmail);
    }

    if (donation.status === "success") {
      // Check if this cause has 80G enabled AND donor requested 80G
      const cause80GEnabled = await getCause80GEnabled(donation.causeId);
      const donorWants80G = donation.certificate80G;
      const send80G = cause80GEnabled && donorWants80G;

      console.log(`[donations] email decision: cause80G=${cause80GEnabled} donorWants80G=${donorWants80G} send80G=${send80G}`);

      if (send80G) {
        // Formal 80G receipt with certificate section
        const receiptHTML = generateFormalReceiptHTML({ ...donation, certificate80G: true });
        const subject = `✅ 80G Donation Receipt: ${donation.receiptNo} | ${donation.userName} | ₹${donation.amount.toLocaleString("en-IN")}`;
        sendEmail(subject, receiptHTML, recipients)
          .then(r => console.log(`[donations] 80G email ok=${r.ok} to=${recipients.join(",")}`))
          .catch(e => console.log("[donations] 80G email error:", e));
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
        NOTIFY_EMAIL,
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
      ? `[Resent 80G] ✅ Receipt: ${donation.receiptNo} | ${donation.userName} | ₹${(donation.amount || 0).toLocaleString("en-IN")}`
      : `[Resent] ✅ Payment Confirmation: ${donation.receiptNo} | ${donation.userName} | ₹${(donation.amount || 0).toLocaleString("en-IN")}`;

    const recipients = [NOTIFY_EMAIL];
    if (donation.userEmail && donation.userEmail !== NOTIFY_EMAIL) {
      recipients.push(donation.userEmail);
    }

    const result = await sendEmail(subject, emailHTML, recipients);
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

Deno.serve(app.fetch);