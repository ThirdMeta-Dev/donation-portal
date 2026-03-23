import { Link } from "react-router";
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import {
  FOUNDATION_SHORT, FOUNDATION_TRUST, FOUNDATION_EMAIL,
  FOUNDATION_PHONE, FOUNDATION_ADDRESS, FOUNDER_NAME
} from "../lib/constants";

export function Footer() {
  return (
    <footer style={{ background: "#1B2B3A", color: "#F8F5EF" }}>

      {/* Closing band */}
      <div style={{ background: "#152231", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#B07D3A", fontWeight: 600 }}>
            Teacher-Led · Education-Only · Transparent
          </p>
          <h3 className="text-2xl sm:text-3xl mb-4" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: "#F8F5EF" }}>
            Join the Education Reform Movement
          </h3>
          <p className="text-sm mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: "#A09A90" }}>
            Every contribution of money, time, or skill directly supports teachers and children in Jalgaon's government schools.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/donate"
              className="px-7 py-3 rounded-xl text-sm shadow-lg transition-colors"
              style={{ fontWeight: 700, background: "#B07D3A", color: "#F8F5EF" }}>
              Support Now
            </Link>
            <Link to="/causes"
              className="border px-7 py-3 rounded-xl text-sm transition-colors"
              style={{ fontWeight: 600, color: "#F8F5EF", borderColor: "rgba(255,255,255,0.18)" }}>
              Join Teacher Network
            </Link>
            <Link to="/about"
              className="border px-7 py-3 rounded-xl text-sm transition-colors"
              style={{ fontWeight: 600, color: "#F8F5EF", borderColor: "rgba(255,255,255,0.18)" }}>
              Partner With Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#B07D3A" }}>
              <BookOpen size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm leading-tight" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: "#F8F5EF" }}>
                {FOUNDATION_SHORT}
              </div>
              <div className="text-xs" style={{ color: "#B07D3A" }}>{FOUNDATION_TRUST}</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#A09A90" }}>
            Founded by {FOUNDER_NAME} — 31 years of ZP school teaching in Jalgaon. A teacher-led, education-only mission scaling Beyond Syllabus learning across North Maharashtra.
          </p>
          <div className="space-y-1.5 mb-5">
            {[
              { label: "80G Registration", no: "SRJ/80G/2017/001" },
              { label: "FCRA No.", no: "083780234" },
              { label: "PAN", no: "AACSR1234B" },
              { label: "Trust Reg.", no: "MH/2015/0073821" },
            ].map(c => (
              <div key={c.label} className="text-xs" style={{ color: "#6B6B60" }}>
                <span style={{ color: "#A09A90", fontWeight: 500 }}>{c.label}:</span> {c.no}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.07)" }}>
                <Icon size={14} style={{ color: "#A09A90" }} />
              </a>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div>
          <h4 className="text-sm mb-5" style={{ fontWeight: 600, color: "#F8F5EF" }}>About & Mission</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Ujjwala Wadekar",       to: "/about" },
              { label: "Shiksha Raj Mission",   to: "/about" },
              { label: "Beyond Syllabus Method",to: "/causes" },
              { label: "Our Programmes",        to: "/causes" },
              { label: "Teacher Network",       to: "/causes" },
              { label: "Impact & Reports",      to: "/about" },
              { label: "Legal & Compliance",    to: "/legal" },
              { label: "Contact Us",            to: "/about#contact" },
            ].map(l => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm transition-colors" style={{ color: "#A09A90" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#DDBF7E"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#A09A90"}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Involvement */}
        <div>
          <h4 className="text-sm mb-5" style={{ fontWeight: 600, color: "#F8F5EF" }}>Get Involved</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Support Once (₹150+)",    to: "/donate" },
              { label: "Give Monthly",            to: "/donate" },
              { label: "Join Teacher Network",    to: "/causes" },
              { label: "Volunteer Your Skills",   to: "/causes" },
              { label: "Adopt A School (CSR)",    to: "/causes" },
              { label: "Corporate Partnership",   to: "/about" },
              { label: "Download 80G Receipt",    to: "/dashboard" },
              { label: "Learning Platform",       to: "/lms" },
            ].map(l => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm transition-colors" style={{ color: "#A09A90" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#DDBF7E"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#A09A90"}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm mb-5" style={{ fontWeight: 600, color: "#F8F5EF" }}>Get in Touch</h4>
          <div className="space-y-3 mb-5">
            <a href={`mailto:${FOUNDATION_EMAIL}`} className="flex items-start gap-2.5 text-sm transition-colors" style={{ color: "#A09A90" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#DDBF7E"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#A09A90"}>
              <Mail size={15} className="mt-0.5 flex-shrink-0" />
              <span>{FOUNDATION_EMAIL}</span>
            </a>
            <a href={`tel:${FOUNDATION_PHONE}`} className="flex items-start gap-2.5 text-sm transition-colors" style={{ color: "#A09A90" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#DDBF7E"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#A09A90"}>
              <Phone size={15} className="mt-0.5 flex-shrink-0" />
              <span>{FOUNDATION_PHONE}</span>
            </a>
            <div className="flex items-start gap-2.5 text-sm" style={{ color: "#A09A90" }}>
              <MapPin size={15} className="mt-0.5 flex-shrink-0" />
              <span>{FOUNDATION_ADDRESS}</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-xl p-4 mb-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs mb-3" style={{ fontWeight: 600, color: "#BCC6D0" }}>Stay Updated</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 text-xs px-3 py-2 rounded-lg focus:outline-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#F8F5EF" }}
              />
              <button className="text-xs px-3 py-2 rounded-lg transition-colors"
                style={{ fontWeight: 600, background: "#B07D3A", color: "#F8F5EF" }}>
                Join
              </button>
            </div>
          </div>

          <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xs mb-1.5" style={{ color: "#6B6B60", fontWeight: 600 }}>Payments via</div>
            <div className="flex gap-2 flex-wrap">
              {["Razorpay", "UPI", "SSL 256-bit"].map(p => (
                <span key={p} className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "#A09A90" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: "#6B6B60" }}>
          <div>© 2026 Shiksha Raj, Ujjwal Bharat Mission. All rights reserved. | Registered Trust, Jalgaon, Maharashtra.</div>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/legal" className="transition-colors" style={{ color: "#6B6B60" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#A09A90"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#6B6B60"}>
              Privacy Policy
            </Link>
            <Link to="/legal" className="transition-colors" style={{ color: "#6B6B60" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#A09A90"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#6B6B60"}>
              Terms of Use
            </Link>
            <Link to="/legal" className="transition-colors" style={{ color: "#6B6B60" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#A09A90"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#6B6B60"}>
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
