import { forwardRef } from "react";

interface Donation {
  id: string;
  userName: string;
  userEmail: string;
  amount: number;
  causeId?: string;
  causeName: string;
  frequency?: string;
  donorType?: string;
  pan?: string;
  paymentId: string;
  razorpayOrderId?: string;
  receiptNo: string;
  status: string;
  certificate80G: boolean;
  createdAt: string;
  impactDescription?: string;
  currency?: string;
}

// ── Amount to words (Indian numbering) ────────────────────────────────────────
const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function numToWords(n: number): string {
  if (n === 0) return "Zero";
  if (n < 0) return "Minus " + numToWords(-n);
  let words = "";
  if (Math.floor(n / 10000000) > 0) {
    words += numToWords(Math.floor(n / 10000000)) + " Crore ";
    n %= 10000000;
  }
  if (Math.floor(n / 100000) > 0) {
    words += numToWords(Math.floor(n / 100000)) + " Lakh ";
    n %= 100000;
  }
  if (Math.floor(n / 1000) > 0) {
    words += numToWords(Math.floor(n / 1000)) + " Thousand ";
    n %= 1000;
  }
  if (Math.floor(n / 100) > 0) {
    words += ones[Math.floor(n / 100)] + " Hundred ";
    n %= 100;
  }
  if (n > 0) {
    if (n < 20) words += ones[n] + " ";
    else words += tens[Math.floor(n / 10)] + (n % 10 > 0 ? " " + ones[n % 10] : "") + " ";
  }
  return words.trim();
}

function amountInWords(amount: number): string {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  let result = "Rupees " + numToWords(rupees);
  if (paise > 0) result += " and " + numToWords(paise) + " Paise";
  return result + " Only";
}

function formatAmount(amount: number): string {
  // Indian format: e.g. 1700000 → 17,00,000.00
  const str = amount.toFixed(2);
  const [intPart, decPart] = str.split(".");
  const lastThree = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  const formatted = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
  return formatted + "." + decPart;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

interface Props {
  donation: Donation;
  forPrint?: boolean;
}

export const FormalDonationReceipt = forwardRef<HTMLDivElement, Props>(
  ({ donation, forPrint = false }, ref) => {
    const fyStart = new Date(donation.createdAt).getMonth() >= 3
      ? new Date(donation.createdAt).getFullYear()
      : new Date(donation.createdAt).getFullYear() - 1;
    const fy = `${fyStart}-${String(fyStart + 1).slice(2)}`;
    const dateStr = formatDate(donation.createdAt);
    const txnType = donation.paymentId?.startsWith("pay_") ? "ONLINE / UPI" : "RTGS / NEFT";

    const cellStyle: React.CSSProperties = {
      padding: "6px 8px",
      fontSize: forPrint ? "12px" : "11px",
      verticalAlign: "top",
      fontFamily: "'Times New Roman', Times, serif",
    };
    const labelStyle: React.CSSProperties = { ...cellStyle, fontWeight: 600, whiteSpace: "nowrap", width: "160px" };
    const valueStyle: React.CSSProperties = { ...cellStyle };
    const borderRow: React.CSSProperties = { borderBottom: "1px solid #999" };
    const borderAll: React.CSSProperties = { border: "1px solid #333" };

    return (
      <div
        ref={ref}
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          background: "#fff",
          color: "#000",
          padding: forPrint ? "28px 32px" : "20px 24px",
          maxWidth: "720px",
          margin: "0 auto",
          border: "2px solid #333",
          borderRadius: "4px",
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", borderBottom: "2px solid #333", paddingBottom: "12px", marginBottom: "10px" }}>
          <div style={{ fontSize: forPrint ? "11px" : "10px", fontWeight: 700, letterSpacing: "3px", marginBottom: "4px" }}>
            DONATION RECEIPT
          </div>
          <div style={{ fontSize: forPrint ? "26px" : "22px", fontWeight: 900, letterSpacing: "1px", lineHeight: 1.2 }}>
            ASHA KIRAN FOUNDATION
          </div>
          <div style={{ fontSize: forPrint ? "11px" : "10px", marginTop: "4px", lineHeight: 1.7 }}>
            42, Sunflower Society, Kothrud, Pune 411038, Maharashtra, India.<br />
            Mob. : +91-9876543210 / 9876543211 &nbsp;&nbsp; Email : info@ashakiran.org<br />
            Website : www.ashakiran.org<br />
            Reg. No. AKF/2018/001 &nbsp;&nbsp; PAN : AAATA1234C
          </div>
          {donation.certificate80G && (
            <div style={{ fontSize: forPrint ? "11px" : "10px", fontWeight: 700, marginTop: "6px", lineHeight: 1.5 }}>
              Donations to Asha Kiran Foundation are eligible for deduction U/s. 80-G of the Income Tax Act 1961 :<br />
              <span style={{ fontSize: forPrint ? "12px" : "11px" }}>URN. AAATA1234C/2023-24/80G &nbsp;|&nbsp; Approval No.: AAATA1234C/2023-24</span>
            </div>
          )}
        </div>

        {/* ── Receipt No + Date ── */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "0" }}>
          <tbody>
            <tr style={borderRow}>
              <td style={{ ...cellStyle, width: "60%" }}>
                <span style={{ fontWeight: 600 }}>Receipt No : </span>
                <span style={{ fontWeight: 700, fontSize: forPrint ? "13px" : "12px" }}>
                  AKF-{fy}-{donation.receiptNo.replace("AKF-", "").replace(/\d{4}-/, "")}
                </span>
              </td>
              <td style={{ ...cellStyle, textAlign: "right" }}>
                <span style={{ fontWeight: 600 }}>Date : </span>
                <span style={{ fontWeight: 700 }}>{dateStr}</span>
              </td>
            </tr>
            <tr style={borderRow}>
              <td colSpan={2} style={cellStyle}>
                <span style={{ fontWeight: 600 }}>Received with thanks from Shri/Smt./M/S : </span>
                <span style={{ fontWeight: 900, fontSize: forPrint ? "14px" : "13px", textTransform: "uppercase" }}>
                  {donation.userName}
                </span>
              </td>
            </tr>
            <tr style={borderRow}>
              <td style={labelStyle}>Address</td>
              <td style={valueStyle}>
                {donation.donorType === "foreign"
                  ? "International Donor"
                  : "India"}
              </td>
            </tr>
            <tr style={borderRow}>
              <td style={{ ...cellStyle, width: "50%" }}>
                <span style={{ fontWeight: 600 }}>Mobile No. </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; —
              </td>
              <td style={cellStyle}>
                <span style={{ fontWeight: 600 }}>Email ID : </span>
                <span style={{ textDecoration: "underline" }}>{donation.userEmail}</span>
              </td>
            </tr>
            <tr style={borderRow}>
              <td style={labelStyle}>PAN No.</td>
              <td style={valueStyle}>{donation.pan || "— (Not Provided)"}</td>
            </tr>
            <tr style={borderRow}>
              <td style={labelStyle}>Amount In Words</td>
              <td style={{ ...valueStyle, fontWeight: 600 }}>
                {amountInWords(donation.amount)}
              </td>
            </tr>
            <tr style={borderRow}>
              <td style={{ ...cellStyle, width: "55%" }}>
                <span style={{ fontWeight: 600 }}>For the purpose of &nbsp;&nbsp;</span>
                <span style={{ fontWeight: 700, textTransform: "uppercase" }}>
                  {donation.causeName}
                </span>
              </td>
              <td style={cellStyle}>
                <span style={{ fontWeight: 600 }}>Received in Our Bank Account :</span><br />
                <span style={{ fontSize: forPrint ? "11px" : "10px" }}>ICICI BANK &nbsp; A/C No. 123400027554220</span>
              </td>
            </tr>
            <tr style={borderRow}>
              <td style={{ ...cellStyle, width: "55%" }}>
                <span style={{ fontWeight: 600 }}>Transaction Type &nbsp;</span>
                <span style={{ borderBottom: "1px solid #333", paddingBottom: "1px" }}>{txnType}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontWeight: 600 }}>Ref. No. : </span>
                <span style={{ borderBottom: "1px solid #333", paddingBottom: "1px", fontSize: forPrint ? "11px" : "10px" }}>
                  {donation.paymentId}
                </span>
              </td>
              <td style={cellStyle}>
                <span style={{ fontWeight: 600 }}>Date : </span>{dateStr}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── Amount Box ── */}
        <div style={{ margin: "12px 0", border: "2px solid #333", display: "inline-block", padding: "6px 16px", borderRadius: "3px" }}>
          <span style={{ fontSize: forPrint ? "22px" : "20px", fontWeight: 900 }}>
            ₹&nbsp;&nbsp;{formatAmount(donation.amount)}
          </span>
        </div>

        {/* ── Footer row ── */}
        <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "1px solid #999", marginTop: "0" }}>
          <tbody>
            <tr>
              <td style={{ ...cellStyle, fontSize: forPrint ? "10px" : "9px", color: "#555", paddingTop: "4px" }}>
                Subject to realisation of Cheque / Online Transfer
              </td>
              <td style={{ ...cellStyle, textAlign: "center", fontSize: forPrint ? "11px" : "10px" }}>
                ***Thank You***
              </td>
              <td style={{ ...cellStyle, textAlign: "right", fontWeight: 600, fontSize: forPrint ? "11px" : "10px" }}>
                Received by
                <div style={{ marginTop: "28px", borderTop: "1px solid #333", paddingTop: "2px", fontSize: forPrint ? "10px" : "9px", fontWeight: 400 }}>
                  Authorised Signatory
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── 80G Certificate Section ── */}
        {donation.certificate80G && (
          <div style={{ border: "2px solid #0D9488", borderRadius: "4px", marginTop: "14px", overflow: "hidden" }}>
            <div style={{ background: "#0D9488", padding: "8px 16px", textAlign: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: forPrint ? "13px" : "12px", letterSpacing: "1px" }}>
                📜 80G TAX EXEMPTION CERTIFICATE
              </span>
            </div>
            <div style={{ padding: "12px 16px", background: "#f0fdfa" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: forPrint ? "12px" : "11px" }}>
                <tbody>
                  {[
                    ["Certificate No.", `80G-AKF-${donation.receiptNo}`],
                    ["Donor Name", donation.userName],
                    ["PAN Number", donation.pan || "To be updated — Please provide PAN for 80G benefit"],
                    ["Donation Amount", `₹ ${formatAmount(donation.amount)}`],
                    ["Financial Year", fy],
                    ["Section", "80G, Income Tax Act 1961"],
                    ["Nature of Donation", "General / Corpus Donation"],
                    ["Approval No.", "AAATA1234C/2023-24/80G"],
                    ["Organisation Reg. No.", "AKF/2018/001"],
                  ].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: "1px solid #99f6e4" }}>
                      <td style={{ padding: "5px 8px", color: "#115e59", fontWeight: 600, width: "180px" }}>{label}</td>
                      <td style={{ padding: "5px 8px", fontWeight: 700, color: "#0f172a" }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ textAlign: "center", color: "#0D9488", fontSize: forPrint ? "11px" : "10px", marginTop: "8px", fontWeight: 600 }}>
                This donation qualifies for 50% deduction under Section 80G of the Income Tax Act, 1961.<br />
                Please retain this certificate for Income Tax Return (ITR) filing.
              </p>
            </div>
          </div>
        )}

        {/* ── Terms ── */}
        <div style={{ marginTop: "12px", borderTop: "2px solid #333", paddingTop: "8px" }}>
          <div style={{ fontWeight: 800, fontSize: forPrint ? "11px" : "10px", marginBottom: "4px" }}>
            * TERM'S &amp; CONDITION
          </div>
          <div style={{ fontSize: forPrint ? "10px" : "9px", lineHeight: 1.6, color: "#333" }}>
            1) This Receipt is not Transferable or Changeable.<br />
            2) If you have not provided PAN Xerox copy or PAN No., you cannot be eligible for 80G Benefit.<br />
            3) This is a computer-generated receipt. Valid without physical signature as per IT Act 2000.<br />
            4) For queries, contact: info@ashakiran.org | +91-9876543210
          </div>
        </div>
      </div>
    );
  }
);

FormalDonationReceipt.displayName = "FormalDonationReceipt";

// ── Standalone HTML string generator for email embedding ─────────────────────
export function generateFormalReceiptHTMLString(d: any): string {
  const fyStart = new Date(d.createdAt).getMonth() >= 3
    ? new Date(d.createdAt).getFullYear()
    : new Date(d.createdAt).getFullYear() - 1;
  const fy = `${fyStart}-${String(fyStart + 1).slice(2)}`;
  const dateStr = formatDate(d.createdAt);
  const txnType = (d.paymentId || "").startsWith("pay_") ? "ONLINE / UPI" : "RTGS / NEFT";
  const amtWords = amountInWords(d.amount || 0);
  const amtFmt = `₹ ${formatAmount(d.amount || 0)}`;

  const row = (label: string, value: string) =>
    `<tr style="border-bottom:1px solid #aaa">
      <td style="padding:6px 8px;font-weight:700;width:180px;vertical-align:top;font-size:12px;font-family:Times New Roman,serif">${label}</td>
      <td style="padding:6px 8px;font-size:12px;font-family:Times New Roman,serif;vertical-align:top">${value}</td>
    </tr>`;

  const cert80G = d.certificate80G ? `
    <div style="border:2px solid #0D9488;border-radius:4px;margin-top:16px;overflow:hidden">
      <div style="background:#0D9488;padding:10px 16px;text-align:center">
        <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:1px;font-family:Arial,sans-serif">
          📜 80G TAX EXEMPTION CERTIFICATE
        </span>
      </div>
      <div style="padding:14px 16px;background:#f0fdfa">
        <table style="width:100%;border-collapse:collapse;font-size:12px;font-family:Times New Roman,serif">
          ${[
            ["Certificate No.", `80G-AKF-${d.receiptNo}`],
            ["Donor Name", d.userName],
            ["PAN Number", d.pan || "To be updated — Please provide PAN"],
            ["Donation Amount", amtFmt],
            ["Financial Year", fy],
            ["Section", "80G, Income Tax Act 1961"],
            ["Nature of Donation", "General / Corpus Donation"],
            ["Approval No.", "AAATA1234C/2023-24/80G"],
            ["Organisation Reg. No.", "AKF/2018/001"],
          ].map(([l, v]) => `<tr style="border-bottom:1px solid #99f6e4"><td style="padding:5px 8px;color:#115e59;font-weight:700;width:180px">${l}</td><td style="padding:5px 8px;font-weight:700;color:#0f172a">${v}</td></tr>`).join("")}
        </table>
        <p style="text-align:center;color:#0D9488;font-size:11px;margin-top:10px;font-weight:600;font-family:Arial,sans-serif">
          This donation qualifies for 50% deduction under Section 80G of the Income Tax Act, 1961.<br>
          Please retain this certificate for Income Tax Return (ITR) filing.
        </p>
      </div>
    </div>` : "";

  return `
<div style="font-family:'Times New Roman',Times,serif;background:#fff;color:#000;padding:28px 32px;max-width:680px;margin:0 auto;border:2px solid #333;border-radius:4px">

  <!-- Header -->
  <div style="text-align:center;border-bottom:2px solid #333;padding-bottom:12px;margin-bottom:10px">
    <div style="font-size:11px;font-weight:700;letter-spacing:3px;margin-bottom:4px;font-family:Arial,sans-serif">DONATION RECEIPT</div>
    <div style="font-size:26px;font-weight:900;letter-spacing:1px;line-height:1.2;font-family:Arial,sans-serif">ASHA KIRAN FOUNDATION</div>
    <div style="font-size:11px;margin-top:5px;line-height:1.8">
      42, Sunflower Society, Kothrud, Pune 411038, Maharashtra, India.<br>
      Mob. : +91-9876543210 / 9876543211 &nbsp;&nbsp; Email : info@ashakiran.org<br>
      Website : www.ashakiran.org<br>
      Reg. No. AKF/2018/001 &nbsp;&nbsp; PAN : AAATA1234C
    </div>
    ${d.certificate80G ? `<div style="font-size:11px;font-weight:700;margin-top:6px;line-height:1.6;font-family:Arial,sans-serif">
      Donations to Asha Kiran Foundation are eligible for deduction U/s. 80-G of the Income Tax Act 1961 :<br>
      <span style="font-size:12px">URN. AAATA1234C/2023-24/80G &nbsp;|&nbsp; Approval No.: AAATA1234C/2023-24</span>
    </div>` : ""}
  </div>

  <!-- Fields -->
  <table style="width:100%;border-collapse:collapse">
    <tr style="border-bottom:1px solid #aaa">
      <td style="padding:6px 8px;font-size:12px;font-family:Times New Roman,serif;width:60%">
        <strong>Receipt No :</strong> <strong style="font-size:13px">AKF-${fy}-${(d.receiptNo || "").replace("AKF-", "").replace(/\d{4}-/, "")}</strong>
      </td>
      <td style="padding:6px 8px;font-size:12px;font-family:Times New Roman,serif;text-align:right">
        <strong>Date :</strong> <strong>${dateStr}</strong>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #aaa">
      <td colspan="2" style="padding:6px 8px;font-size:12px;font-family:Times New Roman,serif">
        <strong>Received with thanks from Shri/Smt./M/S :</strong>
        <strong style="font-size:14px;text-transform:uppercase;margin-left:6px">${d.userName}</strong>
      </td>
    </tr>
    ${row("Mobile No.", "&nbsp;&nbsp;&nbsp;&mdash;&nbsp;&nbsp;&nbsp; <strong>Email ID :</strong> " + `<span style="text-decoration:underline">${d.userEmail}</span>`)}
    ${row("PAN No.", d.pan || "— (Not Provided)")}
    ${row("Amount In Words", `<strong>${amtWords}</strong>`)}
    <tr style="border-bottom:1px solid #aaa">
      <td style="padding:6px 8px;font-size:12px;font-family:Times New Roman,serif;width:55%;vertical-align:top">
        <strong>For the purpose of</strong>&nbsp;&nbsp;<strong style="text-transform:uppercase">${d.causeName}</strong>
      </td>
      <td style="padding:6px 8px;font-size:12px;font-family:Times New Roman,serif;vertical-align:top">
        <strong>Received in Our Bank Account :</strong><br>
        <span style="font-size:11px">ICICI BANK &nbsp; A/C No. 123400027554220</span>
      </td>
    </tr>
    <tr style="border-bottom:1px solid #aaa">
      <td style="padding:6px 8px;font-size:12px;font-family:Times New Roman,serif" colspan="2">
        <strong>Transaction Type</strong> &nbsp;
        <span style="border-bottom:1px solid #333">${txnType}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Ref. No. :</strong>
        <span style="border-bottom:1px solid #333;font-size:11px">${d.paymentId}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Date :</strong> ${dateStr}
      </td>
    </tr>
  </table>

  <!-- Amount Box -->
  <div style="margin:12px 0;border:2px solid #333;display:inline-block;padding:6px 18px;border-radius:3px">
    <span style="font-size:22px;font-weight:900">${amtFmt}</span>
  </div>

  <!-- Footer row -->
  <table style="width:100%;border-collapse:collapse;border-top:1px solid #999;margin-top:0">
    <tr>
      <td style="padding:5px 8px;font-size:10px;color:#555;font-family:Times New Roman,serif">Subject to realisation of Cheque / Online Transfer</td>
      <td style="padding:5px 8px;text-align:center;font-size:11px;font-family:Times New Roman,serif"><strong>***Thank You***</strong></td>
      <td style="padding:5px 8px;text-align:right;font-weight:700;font-size:11px;font-family:Times New Roman,serif">
        Received by
        <div style="margin-top:28px;border-top:1px solid #333;padding-top:2px;font-size:10px;font-weight:400">Authorised Signatory</div>
      </td>
    </tr>
  </table>

  ${cert80G}

  <!-- Terms -->
  <div style="margin-top:12px;border-top:2px solid #333;padding-top:8px">
    <div style="font-weight:800;font-size:11px;margin-bottom:4px;font-family:Arial,sans-serif">* TERM'S &amp; CONDITION</div>
    <div style="font-size:10px;line-height:1.7;color:#333;font-family:Times New Roman,serif">
      1) This Receipt is not Transferable or Changeable.<br>
      2) If you have not provided PAN Xerox copy or PAN No., you cannot be eligible for 80G Benefit.<br>
      3) This is a computer-generated receipt. Valid without physical signature as per IT Act 2000.<br>
      4) For queries, contact: info@ashakiran.org | +91-9876543210
    </div>
  </div>
</div>`;
}
