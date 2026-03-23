import { useEffect } from "react";
import { useLocation, Link } from "react-router";
import { motion } from "motion/react";
import { FileText, Shield, Cookie, RefreshCw, ChevronLeft } from "lucide-react";
import { FOUNDATION_NAME, FOUNDATION_EMAIL } from "../lib/constants";

const FOUNDATION_ADDRESS = "123, Seva Marg, Pune, Maharashtra – 411001, India";
const DATE = "March 1, 2026";

const PAGES = {
  privacy: {
    icon: <Shield size={28} className="text-teal-600" />,
    title: "Privacy Policy",
    color: "from-teal-600 to-blue-600",
    sections: [
      {
        heading: "1. Introduction",
        body: `Asha Kiran Foundation ("we", "our", "us") is committed to protecting the privacy and security of the personal data of all our donors, learners, and website visitors. This Privacy Policy explains how we collect, use, store, disclose and protect your information when you use our website (ashakiran.org), donation portal, and learning management system (LMS).

By using our services, you agree to the collection and use of information as described in this policy.`
      },
      {
        heading: "2. Information We Collect",
        body: `We collect the following categories of information:

Personal Identification Information: Full name, email address, phone number, date of birth, nationality, PAN card number (for Indian donors claiming 80G deduction), passport number (for NRI/Foreign donors).

Financial Information: Donation amounts, payment method type (card/UPI/bank), transaction IDs from Razorpay. Note: We do NOT store card numbers or CVVs — all payment processing is handled by Razorpay's PCI-DSS compliant infrastructure.

Learning Data: Course enrollments, lesson progress, quiz scores, and certificate details.

Technical Data: IP address, browser type, device type, operating system, cookies and usage data collected via analytics tools.

Communications: Emails, support messages, and feedback you send us.`
      },
      {
        heading: "3. How We Use Your Information",
        body: `We use your information to:

• Process and confirm your donations and issue receipts
• Generate and deliver 80G tax exemption certificates to eligible Indian donors
• Comply with FCRA requirements for foreign donations
• Manage your learning account, track course progress, and issue certificates of completion
• Send you transactional emails (donation receipts, OTPs, course completion notices)
• With your explicit consent, send newsletters and impact updates
• Comply with legal obligations under Indian law (Income Tax Act, FCRA, PMLA)
• Detect and prevent fraud and unauthorized access
• Improve our website and services through aggregated analytics`
      },
      {
        heading: "4. Legal Basis for Processing",
        body: `We process your data under the following legal bases:

• Contractual Necessity: Processing required to fulfill your donation or course enrollment
• Legal Obligation: Income Tax Act (80G), FCRA 2010, Companies Act 2013
• Legitimate Interest: Fraud prevention, security, improving services
• Consent: Marketing communications (you can withdraw consent at any time)`
      },
      {
        heading: "5. Data Sharing",
        body: `We share your data only in the following circumstances:

Payment Processors: Razorpay (for processing donations). Subject to their privacy policy.
Cloud Infrastructure: Supabase (hosted on AWS infrastructure) for database storage.
Email Service: Resend.com for transactional emails.
Legal Authorities: Government agencies, courts, or regulators when required by law.
Auditors: Statutory auditors for compliance verification (data is anonymized where possible).

We do NOT sell, rent, or trade your personal data to third parties for marketing purposes.`
      },
      {
        heading: "6. Data Retention",
        body: `We retain your data as follows:

Donor records and transaction data: 8 years (as required under Indian law for tax and FCRA compliance)
80G certificate records: Permanent (legal requirement)
Learning platform data: 3 years after last activity, or until you request deletion
Marketing preferences: Until you withdraw consent

After the retention period, we securely delete or anonymize your data.`
      },
      {
        heading: "7. Your Rights",
        body: `Under applicable Indian law and internationally recognized best practices, you have the right to:

• Access: Request a copy of personal data we hold about you
• Correction: Request correction of inaccurate data
• Deletion: Request erasure of your data (subject to legal retention requirements)
• Portability: Receive your data in a machine-readable format
• Objection: Object to processing for direct marketing at any time
• Withdraw Consent: Unsubscribe from marketing emails at any time via the unsubscribe link

To exercise any of these rights, email us at ${FOUNDATION_EMAIL}`
      },
      {
        heading: "8. Security",
        body: `We implement robust security measures including:

• SSL/TLS encryption for all data in transit
• AES-256 encryption for sensitive data at rest
• Role-based access controls for staff
• Regular security audits
• Razorpay's PCI-DSS Level 1 infrastructure for payment data

However, no system is 100% secure. If you suspect a data breach, please contact us immediately at ${FOUNDATION_EMAIL}`
      },
      {
        heading: "9. Cookies",
        body: `We use cookies to improve your experience. For full details, please read our Cookie Policy at ashakiran.org/cookies.`
      },
      {
        heading: "10. Changes to This Policy",
        body: `We may update this policy periodically. Material changes will be notified by email (for registered users) and a notice on our website. Your continued use of our services after changes constitutes acceptance.`
      },
      {
        heading: "11. Contact Us",
        body: `For any privacy-related questions or to exercise your rights, contact our Data Privacy Officer:

Asha Kiran Foundation
Attn: Data Privacy Officer
${FOUNDATION_ADDRESS}
Email: ${FOUNDATION_EMAIL}`
      }
    ]
  },

  terms: {
    icon: <FileText size={28} className="text-orange-600" />,
    title: "Terms of Service",
    color: "from-orange-500 to-red-500",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: `By accessing or using the website, donation portal, or learning management system (LMS) of Asha Kiran Foundation ("Foundation", "we", "us"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, please do not use our services.`
      },
      {
        heading: "2. About the Foundation",
        body: `Asha Kiran Foundation is a registered non-governmental organization (NGO) in India, incorporated under the Societies Registration Act. It holds valid 80G and 12A registrations under the Income Tax Act, 1961, and FCRA registration for receiving foreign contributions.

Registration No.: MH/2015/0073821
PAN: AACTA1234B
80G Registration: AKF/80G/2017/001
FCRA Registration: 083780234`
      },
      {
        heading: "3. Eligibility",
        body: `You must be:

• At least 18 years of age, or have parental/guardian consent
• Legally capable of entering into binding agreements
• Compliant with all applicable laws in your jurisdiction

If you are making a donation on behalf of a corporate entity, you represent that you have the authority to do so.`
      },
      {
        heading: "4. Donations",
        body: `4.1 All donations are voluntary and non-refundable, except as described in our Refund Policy.

4.2 Indian donors may be eligible for 80G tax deduction. We will provide 80G certificates via email within 30 days of receiving a valid donation with PAN details.

4.3 NRI and foreign donations must comply with FCRA 2010. By donating, you confirm that your donation is from permissible sources and is not prohibited under Indian law.

4.4 We reserve the right to refuse donations that we believe may be from illicit sources or may create legal or reputational risk.

4.5 Recurring donations (monthly/annual) can be cancelled anytime by contacting us at ${FOUNDATION_EMAIL}. No future charges will be made after cancellation is confirmed.`
      },
      {
        heading: "5. Learning Management System (LMS)",
        body: `5.1 All courses on our LMS are free of charge for registered users.

5.2 Course content, videos, reading materials, and quizzes are the intellectual property of Asha Kiran Foundation and/or respective instructors. You may not reproduce, distribute, or create derivative works without explicit written permission.

5.3 Certificates issued upon course completion are digital certificates attesting to your completion of the course. They do not constitute professional qualifications or accreditation unless explicitly stated.

5.4 We reserve the right to modify course content, revoke certificates in cases of academic dishonesty, or discontinue courses at any time.`
      },
      {
        heading: "6. User Accounts",
        body: `6.1 You are responsible for maintaining the confidentiality of your account credentials.

6.2 You are responsible for all activities that occur under your account.

6.3 You must not share your account credentials or allow others to use your account.

6.4 We reserve the right to suspend or terminate accounts that violate these terms.`
      },
      {
        heading: "7. Prohibited Activities",
        body: `You must not:

• Use our services for any unlawful purpose
• Submit false, misleading, or fraudulent information
• Attempt to gain unauthorized access to our systems
• Use automated tools (bots, scrapers) without written permission
• Post or transmit harmful, abusive, or defamatory content
• Impersonate any person or entity
• Use our LMS to plagiarize or cheat on assessments`
      },
      {
        heading: "8. Intellectual Property",
        body: `The Asha Kiran Foundation name, logo, website content, course materials, and all related intellectual property are owned by or licensed to the Foundation. No license or right is granted to use our intellectual property without prior written consent.`
      },
      {
        heading: "9. Limitation of Liability",
        body: `To the maximum extent permitted by applicable law:

• The Foundation is not liable for any indirect, incidental, or consequential damages arising from use of our services.
• Our total liability to you shall not exceed the amount of your most recent donation.
• We do not guarantee uninterrupted availability of our website or services.`
      },
      {
        heading: "10. Governing Law",
        body: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra, India.`
      },
      {
        heading: "11. Contact",
        body: `For questions about these Terms, contact us at:

Asha Kiran Foundation
${FOUNDATION_ADDRESS}
Email: ${FOUNDATION_EMAIL}`
      }
    ]
  },

  cookies: {
    icon: <Cookie size={28} className="text-yellow-600" />,
    title: "Cookie Policy",
    color: "from-yellow-500 to-orange-500",
    sections: [
      {
        heading: "1. What Are Cookies?",
        body: `Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site.`
      },
      {
        heading: "2. Cookies We Use",
        body: `We use the following categories of cookies:

Strictly Necessary Cookies (cannot be disabled):
• Session cookies: Keep you logged into your donor or learner account
• CSRF tokens: Protect against cross-site request forgery attacks
• Payment session cookies: Required for secure donation processing via Razorpay

Functional Cookies:
• Language and currency preferences
• Theme settings (if applicable)
• Remembering items in your donation cart

Analytics Cookies (with your consent):
• Google Analytics (GA4): Understand page visits, user flow, and performance
• Hotjar: Understand user behavior through heatmaps and recordings
• These are anonymized — no personally identifiable information is shared with analytics providers

Marketing Cookies (with your consent):
• Meta Pixel (if applicable): To show you relevant ads about our campaigns
• Google Ads remarketing: To show relevant ads to past visitors`
      },
      {
        heading: "3. How to Manage Cookies",
        body: `You have full control over cookies:

Browser Settings: All modern browsers allow you to view, delete, and block cookies. Consult your browser's help section for instructions.

Note: Blocking strictly necessary cookies may prevent you from logging in or making donations.

Third-Party Opt-Outs:
• Google Analytics: tools.google.com/dlpage/gaoptout
• Hotjar: hotjar.com/legal/compliance/opt-out

Cookie Banner: When you first visit our website, you can accept or reject non-essential cookies through our cookie consent banner.`
      },
      {
        heading: "4. Retention Periods",
        body: `Cookie retention periods vary by type:

Session cookies: Deleted when you close your browser
Preference cookies: Up to 1 year
Analytics cookies: Up to 2 years
Marketing cookies: Up to 90 days`
      },
      {
        heading: "5. Third-Party Cookies",
        body: `Some cookies are set by third-party services embedded in our website:

• Razorpay: Payment processing (their privacy policy applies)
• YouTube: If you watch embedded videos in our LMS courses
• Jitsi Meet: For live class sessions
• Google Fonts: Fonts used on our website

We do not control these third-party cookies. Please review the respective third-party privacy policies.`
      },
      {
        heading: "6. Updates to This Policy",
        body: `We may update this Cookie Policy. Changes will be reflected with an updated "Last Updated" date at the top of this page.

For questions, contact us at ${FOUNDATION_EMAIL}`
      }
    ]
  },

  refund: {
    icon: <RefreshCw size={28} className="text-green-600" />,
    title: "Refund & Cancellation Policy",
    color: "from-green-500 to-teal-600",
    sections: [
      {
        heading: "1. Our Commitment",
        body: `At Asha Kiran Foundation, we are committed to transparency and donor satisfaction. We understand that donations are acts of trust, and we take that responsibility seriously. This policy outlines the circumstances under which we may issue refunds.`
      },
      {
        heading: "2. General Refund Policy",
        body: `2.1 Donations are generally non-refundable, as funds are typically committed to programs and beneficiaries promptly upon receipt.

2.2 However, we will issue full refunds in the following circumstances:

• Technical Errors: If a donation was made due to a technical glitch that resulted in incorrect amount being charged (e.g., double charge, wrong currency)
• Unauthorized Transactions: If a donation was made without your authorization (report within 7 days)
• Duplicate Donations: If the same donation was charged twice due to system error

2.3 Refund requests must be made within 30 days of the original transaction.`
      },
      {
        heading: "3. How to Request a Refund",
        body: `To request a refund, please email ${FOUNDATION_EMAIL} with:

• Your full name and registered email address
• Transaction ID or Receipt Number
• Date and amount of the donation
• Reason for the refund request
• Bank account details for refund (if applicable)

We will acknowledge your request within 2 business days and complete our review within 7 business days.`
      },
      {
        heading: "4. Refund Process",
        body: `Approved refunds will be processed as follows:

• Credit/Debit Card: Refunded to the original card within 7-10 business days (subject to bank processing times)
• Net Banking/UPI: Refunded to the source bank account within 5-7 business days
• International Cards: Refunded within 10-15 business days (subject to international bank processing)

Note: If an 80G certificate has already been issued for the donation, it must be returned/cancelled before the refund is processed. The refund amount will be the gross donation amount; no tax benefits can be claimed after a refund.`
      },
      {
        heading: "5. Recurring Donations — Cancellation",
        body: `If you have set up a recurring donation (monthly or annual):

• You can cancel anytime by emailing ${FOUNDATION_EMAIL} or through your Donor Dashboard
• Cancellation requests must be made at least 3 business days before the next scheduled payment
• No refund is issued for already-processed recurring donations
• Upon cancellation, no future charges will be made

We do not charge any cancellation fee.`
      },
      {
        heading: "6. LMS Courses",
        body: `As all LMS courses on our platform are provided free of charge, there are no payments to refund. Certificates are digital and cannot be "returned." If you believe a certificate was issued in error, please contact us at ${FOUNDATION_EMAIL}.`
      },
      {
        heading: "7. CSR and Corporate Donations",
        body: `Corporate donations made under CSR mandates are subject to separate agreements. Refund terms for such donations are governed by the respective MOU/agreement signed with the corporate entity. Please contact your Asha Kiran relationship manager for details.`
      },
      {
        heading: "8. Exceptions",
        body: `We reserve the right to decline refunds in cases where:

• The refund request is made after 30 days from the transaction date
• The funds have already been fully disbursed to beneficiaries
• We have reason to believe the request is fraudulent

We will communicate our decision in writing.`
      },
      {
        heading: "9. Grievance Redressal",
        body: `If you are unsatisfied with our refund decision, you may escalate to our Grievance Officer:

Grievance Officer: Rahul Joshi (CA, Operations & Finance)
Email: ${FOUNDATION_EMAIL}
Address: ${FOUNDATION_ADDRESS}

We aim to resolve all grievances within 30 days.`
      }
    ]
  }
};

type PageKey = keyof typeof PAGES;

export function LegalPage() {
  const location = useLocation();
  const pageKey = (location.pathname.replace("/", "") as PageKey) || "privacy";
  const page = PAGES[pageKey] || PAGES.privacy;

  useEffect(() => { window.scrollTo(0, 0); }, [pageKey]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className={`bg-gradient-to-r ${page.color} text-white py-14 px-4`}>
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ChevronLeft size={15} /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              {page.icon}
            </div>
            <div>
              <div className="text-white/70 text-sm uppercase tracking-widest">{FOUNDATION_NAME}</div>
              <h1 className="text-white text-3xl md:text-4xl" style={{ fontWeight: 800 }}>{page.title}</h1>
            </div>
          </div>
          <p className="text-white/70 text-sm mt-2">Last updated: {DATE}</p>
        </div>
      </div>

      {/* Navigation pills for all legal pages */}
      <div className="bg-white border-b border-slate-200 px-4">
        <div className="max-w-4xl mx-auto flex gap-1 overflow-x-auto py-3">
          {(Object.keys(PAGES) as PageKey[]).map(key => (
            <Link key={key} to={`/${key}`}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all ${pageKey === key ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}
              style={{ fontWeight: pageKey === key ? 600 : 400 }}>
              {PAGES[key].title}
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Table of Contents */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            <h2 className="text-slate-800 text-sm mb-3" style={{ fontWeight: 700 }}>Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {page.sections.map((s, i) => (
                <a key={i} href={`#section-${i}`}
                  className="text-sm text-teal-600 hover:text-teal-700 hover:underline py-0.5">
                  {s.heading}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {page.sections.map((section, i) => (
              <motion.div key={i} id={`section-${i}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-slate-900 text-base mb-3" style={{ fontWeight: 700 }}>{section.heading}</h2>
                <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{section.body}</div>
              </motion.div>
            ))}
          </div>

          {/* Contact Card */}
          <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center">
            <div className="text-lg mb-2" style={{ fontWeight: 700 }}>Questions about this {page.title}?</div>
            <p className="text-white/70 text-sm mb-4">Our team is happy to help you understand your rights and our practices.</p>
            <a href={`mailto:${FOUNDATION_EMAIL}`}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors text-sm"
              style={{ fontWeight: 700 }}>
              📧 {FOUNDATION_EMAIL}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
