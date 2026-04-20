import { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/SiteNavbar";
import { Footer } from "../components/SiteFooter";
import { supabase } from "../lib/supabase";

// @ts-ignore
import s16_map_bg from "../../assets/images/s16_map_bg.svg";
// @ts-ignore
import imgTexture from "@/assets/10c9de2356342a2446587a7242a74b82052060e2.svg";
// @ts-ignore
import imgVisitBg from "@/assets/contact_visit_bg.jpg";
// @ts-ignore
import imgS16Grid1 from "@/assets/s16_grid1.png";
// @ts-ignore
import imgS16Grid2 from "@/assets/s16_grid2.png";
// @ts-ignore
import imgS16Grid3 from "@/assets/s16_grid3.png";
// @ts-ignore
import imgS16Grid4 from "@/assets/s16_grid4.png";

// ── Hooks ──────────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isTablet;
}

function useFadeInUp(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("cp-visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

// ── Arrow ──────────────────────────────────────────────────────────────────
function ArrowIcon({ color = "#fff", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PAGE_CSS = `
@keyframes cpFadeUp {
  from { opacity:0; transform:translateY(32px); }
  to   { opacity:1; transform:translateY(0); }
}
.cp-fade { opacity: 0; }
.cp-fade.cp-visible { animation: cpFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }

.cp-input { font-family: 'DM Sans', sans-serif; font-size: 15px; }
.cp-input::placeholder { color: rgba(255,255,255,0.55); }
.cp-input:focus { outline: none; border-color: #e8972a !important; }
.cp-select option { color: #000; background: #fff; }

.cp-s16-grid { display: flex; gap: 48px; align-items: flex-start; }
.cp-s16-left { flex: 0 0 auto; width: 240px; display: flex; flex-direction: column; gap: 20px; padding-top: 24px; }
.cp-s16-right { flex: 1; display: flex; flex-direction: column; gap: 17px; min-width: 0; }
.cp-s16-row { display: flex; gap: 17px; align-items: stretch; }
.cp-s16-img-wrap { position: relative; border-radius: 17px; overflow: hidden; border: 0.866px solid #a1a1a1; flex-shrink: 0; }

@media (max-width: 860px) {
  .cp-s16-grid { flex-direction: column; gap: 32px; }
  .cp-s16-left { width: 100%; padding-top: 0; }
}
`;

// ── SECTION 1 — Hero + Navbar + Contact Form (Figma 917:16112) ────────────
function ContactHeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", city: "", role: "", message: "" });
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim())    errs.name    = "Required";
    if (!formData.phone.trim())   errs.phone   = "Required";
    if (!formData.email.trim())   errs.email   = "Required";
    if (!formData.message.trim()) errs.message = "Required";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("volunteer_submissions").insert([{
        name: formData.name, phone: formData.phone, email: formData.email,
        city: formData.city, role: formData.role, message: formData.message,
      }]);
      if (error) throw error;
      setIsSuccess(true);
    } catch { setIsSuccess(true); }
    finally  { setIsSubmitting(false); }
  };

  const INPUT: React.CSSProperties = {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: 12, height: 48,
    padding: "0 15px", color: "#fff",
    width: "100%", boxSizing: "border-box",
  };
  const ERR: React.CSSProperties = { color: "#ffcdd2", fontSize: 11, fontFamily: "'DM Sans',sans-serif", marginTop: 3 };
  const chevron = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>;

  return (
    <div style={{
      width: "100%",
      background: "linear-gradient(114.7deg, #0a2036 0%, #132f4c 100%)",
      position: "relative",
      overflow: "hidden",
      borderRadius: "0 0 30px 30px",
    }}>
      {/* Alphabet / letter texture — right side, full height */}
      <div style={{
        position: "absolute",
        top: 0, right: 0,
        width: "62%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}>
        <img
          src={imgTexture}
          alt=""
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "left center",
            opacity: 0.015,
            filter: "invert(1) brightness(2.5)",
            display: "block",
          }}
        />
      </div>
      {/* Left gradient to keep text readable */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, #0a2036 30%, rgba(10,32,54,0.5) 50%, rgba(10,32,54,0) 70%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* ── Navbar (same container as HomeV2) ── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "20px 20px" : isTablet ? "24px 32px" : "28px 96px",
        boxSizing: "border-box",
        position: "relative", zIndex: 200,
      }}>
        <Navbar onOpenModal={onOpenModal} />
      </div>

      {/* ── Content box ── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "32px 20px 56px" : isTablet ? "36px 32px 64px" : "48px 96px 80px",
        boxSizing: "border-box",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          gap: isMobile ? 40 : 44,
          alignItems: "flex-start",
        }}>

          {/* Left: badge + heading + bullets */}
          <div style={{ flex: "0 0 auto", width: isMobile ? "100%" : 500, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.3)", borderRadius: 40, padding: "6px 20px", alignSelf: "flex-start" }}>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#fff" }}>
                Teacher-Led · Education-Only · Transparent
              </span>
            </div>

            <h1 style={{ fontFamily: "'Lora',serif", fontWeight: 600, fontSize: isMobile ? 32 : 44, lineHeight: 1.28, color: "#fff", margin: 0 }}>
              One Teacher Started This.<br />
              Many Can Keep It Going.
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Progress is visible & published", "Use of funds reported quarterly", "80G eligible · FCRA registered"].map((txt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ArrowIcon color="#fff" size={11} />
                  </div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#fff", fontWeight: 300 }}>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          {isSuccess ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16, padding: "40px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#4caf50", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <h3 style={{ fontFamily: "'Lora',serif", color: "#fff", fontSize: 24, margin: 0 }}>Thank You!</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#e0e0e0", fontSize: 16, margin: 0 }}>We'll be in touch soon.</p>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <input className="cp-input" placeholder="Tell us your name"
                    style={{ ...INPUT, borderColor: errors.name ? "#ef5350" : "rgba(255,255,255,0.25)" }}
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  {errors.name && <div style={ERR}>{errors.name}</div>}
                </div>

                <div style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <input className="cp-input" placeholder="Number for a quick call"
                      style={{ ...INPUT, borderColor: errors.phone ? "#ef5350" : "rgba(255,255,255,0.25)" }}
                      value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    {errors.phone && <div style={ERR}>{errors.phone}</div>}
                  </div>
                  <div style={{ flex: "0 0 auto", width: isMobile ? "100%" : 185 }}>
                    <input className="cp-input" placeholder="Drop your email ID"
                      style={{ ...INPUT, borderColor: errors.email ? "#ef5350" : "rgba(255,255,255,0.25)" }}
                      value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    {errors.email && <div style={ERR}>{errors.email}</div>}
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <select className="cp-input cp-select"
                    style={{ ...INPUT, appearance: "none", cursor: "pointer", color: formData.city ? "#fff" : "rgba(255,255,255,0.55)" }}
                    value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
                    <option value="" disabled>City</option>
                    {["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad", "Jalgaon", "Other"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div style={{ position: "absolute", right: 14, top: 15, pointerEvents: "none" }}>{chevron}</div>
                </div>

                <div style={{ position: "relative" }}>
                  <select className="cp-input cp-select"
                    style={{ ...INPUT, appearance: "none", cursor: "pointer", color: formData.role ? "#fff" : "rgba(255,255,255,0.55)" }}
                    value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                    <option value="" disabled>I am a…</option>
                    {["Teacher", "Parent", "Student", "Donor", "Volunteer", "Organisation", "Other"].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <div style={{ position: "absolute", right: 14, top: 15, pointerEvents: "none" }}>{chevron}</div>
                </div>

                <div>
                  <textarea className="cp-input" placeholder="What are you looking for?"
                    style={{ ...INPUT, height: 100, padding: "13px 15px", resize: "none", borderColor: errors.message ? "#ef5350" : "rgba(255,255,255,0.25)" }}
                    value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  {errors.message && <div style={ERR}>{errors.message}</div>}
                </div>
              </div>

              <button onClick={handleSubmit} disabled={isSubmitting} style={{
                display: "flex", alignItems: "center", gap: 16,
                background: "#bf791d", border: "none", borderRadius: 30, padding: "12px 28px",
                cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1,
                alignSelf: isMobile ? "stretch" : "flex-start",
                justifyContent: isMobile ? "center" : "flex-start",
              }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", whiteSpace: "nowrap" }}>
                  {isSubmitting ? "Sending…" : "Join Ujjwala's Mission"}
                </span>
                {!isSubmitting && <ArrowIcon color="#fff" size={16} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SECTION 2 — Visit Us (Figma 917:18162) ─────────────────────────────────
const VISIT_SOCIALS = [
  {
    name: "LinkedIn", href: "https://www.linkedin.com/in/ujjwala-wadekar-317094247/",
    icon: (c: string) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke={c} strokeWidth="1.8" fill="none" />
        <rect x="2" y="9" width="4" height="12" stroke={c} strokeWidth="1.8" fill="none" />
        <circle cx="4" cy="4" r="2" stroke={c} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    name: "WhatsApp", href: "https://wa.me/919370318308",
    icon: (c: string) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={c} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    name: "Instagram", href: "https://www.instagram.com/zp_teacher_ujjwala_wadekar/",
    icon: (c: string) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke={c} strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="4" stroke={c} strokeWidth="1.8" fill="none" />
        <circle cx="17.5" cy="6.5" r="1" fill={c} />
      </svg>
    ),
  },
  {
    name: "YouTube", href: "https://www.youtube.com/channel/UCJOILwGRJVFODGp6uQGDF1w",
    icon: (c: string) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke={c} strokeWidth="1.8" fill="none" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={c} />
      </svg>
    ),
  },
];

function VisitSocialBtn({ name, href, icon }: { name: string; href: string; icon: (c: string) => React.ReactNode }) {
  const [hov, setHov] = useState(false);
  const gold = "#bf791d";
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        background: hov ? gold : "rgba(191,121,29,0.1)",
        border: `1px solid ${gold}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", textDecoration: "none",
        transition: "background 0.18s",
      }}
    >
      {icon(hov ? "#fff" : gold)}
    </a>
  );
}

function VisitUsSection() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section ref={sectionRef} className="cp-fade" style={{
      width: "100%",
      background: "#fff",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background image at bottom portion of section — matches Figma node 917:18161 */}
      <div style={{
        position: "absolute",
        left: 0, right: 0, bottom: 0,
        height: isMobile ? 260 : isTablet ? 340 : 480,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}>
        <img
          src={imgVisitBg}
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            display: "block",
          }}
        />
        {/* Top fade — white to transparent going down */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 55%)" }} />
        {/* Bottom fade — transparent to white going down */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #fff 0%, rgba(255,255,255,0) 35%)" }} />
        {/* Left fade */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #fff 0%, transparent 22%)" }} />
        {/* Right fade */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, #fff 0%, transparent 18%)" }} />
      </div>

      {/* Content */}
      <div style={{
        maxWidth: 1008, margin: "0 auto",
        padding: isMobile ? "60px 20px 180px" : isTablet ? "72px 32px 200px" : "80px 0 280px",
        boxSizing: "border-box",
        position: "relative", zIndex: 2,
      }}>

        {/* Header row */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? 16 : 24,
          marginBottom: isMobile ? 36 : 52,
        }}>
          <h2 style={{
            fontFamily: "'Lora',serif", fontWeight: 600,
            fontSize: isMobile ? 30 : 40, lineHeight: 1.28,
            color: "#000", margin: 0,
          }}>
            Visit Us
          </h2>
          <div style={{ display: "flex", gap: 8 }}>
            {VISIT_SOCIALS.map(s => <VisitSocialBtn key={s.name} name={s.name} href={s.href} icon={s.icon} />)}
          </div>
        </div>

        {/* Contact info + Map */}
        <div style={{
          display: "flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          gap: isMobile ? 32 : 48,
          alignItems: "stretch",
        }}>

          {/* Contact info column */}
          <div style={{ flex: "0 0 auto", width: isMobile ? "100%" : 311, display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Address */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f9f2e8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bf791d" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 16, color: "#000", margin: "0 0 4px" }}>Address</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, color: "#636363", margin: 0, lineHeight: "24px" }}>
                  Arcadion Building, North Main Road,<br />
                  Koregaon Park, Pune,<br />
                  Maharashtra Pin: 411001
                </p>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f9f2e8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bf791d" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 16, color: "#000", margin: "0 0 4px" }}>Email Id:</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, color: "#636363", margin: 0 }}>
                  info@ujjwalabharat.org
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f9f2e8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bf791d" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.41 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.6 5.6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 16, color: "#000", margin: "0 0 4px" }}>Phone Number:</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: 16, color: "#636363", margin: 0 }}>
                  +91 93703 18308
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div style={{
            flex: 1, minWidth: 0,
            borderRadius: 20, overflow: "hidden",
            minHeight: isMobile ? 240 : 340,
            background: "#e8e8e8",
          }}>
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173522965!2d73.89396!3d18.53601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c16bf9d7d0ef%3A0x5fe9bf7a6c71e9b0!2sKoregaon%20Park%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000"
              width="100%" height="100%"
              style={{ border: 0, display: "block", minHeight: isMobile ? 240 : 340 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 3 — CTA Box (Figma 917:18164) ──────────────────────────────────
function CTABoxSection() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section ref={sectionRef} className="cp-fade" style={{
      width: "100%",
      background: "#fff",
      padding: isMobile ? "64px 20px 56px" : "154px 0 72px",
      boxSizing: "border-box",
    }}>
      {/* Rounded box */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "0 20px" : "0",
        boxSizing: "border-box",
      }}>
        <div style={{
          borderRadius: 30,
          background: "linear-gradient(135deg, #704000 0%, #955e00 100%)",
          padding: isMobile ? "36px 24px 32px" : isTablet ? "44px 40px 40px" : "52px 56px 48px",
          position: "relative",
          overflow: "hidden",
          minHeight: isMobile ? "auto" : 334,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 32,
        }}>
          {/* India map silhouette (right side) */}
          <img
            src={s16_map_bg}
            alt=""
            style={{
              position: "absolute", right: "-6%", bottom: "-15%",
              height: "130%", width: "auto",
              pointerEvents: "none", opacity: 0.22,
              zIndex: 0,
            }}
          />
          {/* Bottom white fade overlay */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
            background: "linear-gradient(to top, rgba(255,255,255,0.08), transparent)",
            pointerEvents: "none", zIndex: 1,
          }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Top row: badge+heading (left) + bullets (right) */}
            <div style={{
              display: "flex",
              flexDirection: isMobile || isTablet ? "column" : "row",
              alignItems: isMobile || isTablet ? "flex-start" : "flex-start",
              justifyContent: "space-between",
              gap: isMobile ? 24 : 40,
            }}>
              {/* Left: badge + heading */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{
                  border: "1px solid #885615", borderRadius: 40,
                  padding: "6px 20px", alignSelf: "flex-start",
                }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "#fff" }}>
                    Teacher-Led · Education-Only · Transparent
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "'Lora',serif", fontWeight: 600,
                  fontSize: isMobile ? 28 : 44, lineHeight: 1.28,
                  color: "#fff", margin: 0, textTransform: "capitalize",
                }}>
                  <span style={{ display: "block" }}>One Teacher Started This.</span>
                  <span style={{ display: "block" }}>Many Can Keep It Going.</span>
                </h2>
              </div>

              {/* Right: bullets — plain arrow + text, no circle */}
              {!isMobile && (
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 2, paddingTop: 20 }}>
                  {["Progress is visible & published", "Use of funds reported quarterly", "80G eligible · FCRA registered"].map((txt, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, height: 24 }}>
                      <ArrowIcon color="#fff" size={14} />
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#fff", fontWeight: 300, whiteSpace: "nowrap" }}>
                        {txt}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile bullets */}
            {isMobile && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {["Progress is visible & published", "Use of funds reported quarterly", "80G eligible · FCRA registered"].map((txt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <ArrowIcon color="#fff" size={13} />
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#fff", fontWeight: 300 }}>{txt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom CTAs — right-aligned, matching Figma (CTAs start at x=376 of 1008px = right-aligned) */}
          <div style={{
            position: "relative", zIndex: 2,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "flex-start" : "flex-end",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 12 : 16,
            flexWrap: "wrap",
          }}>
            {/* Partner With Us — no border, plain text + arrow */}
            <a href="#"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "transparent",
                border: "none",
                padding: "12px 4px",
                fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15,
                color: "#fff", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap",
              }}>
              Partner With Us <ArrowIcon color="#fff" size={18} />
            </a>

            {/* Join Teacher Network — outlined white pill */}
            <a href="#"
              style={{
                display: "flex", alignItems: "center", gap: 16,
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.8)",
                borderRadius: 100, padding: "12px 28px",
                fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15,
                color: "#fff", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap",
              }}>
              Join Teacher Network <ArrowIcon color="#fff" size={18} />
            </a>

            {/* Donate Now — white filled pill, gold text */}
            <a href="/donate"
              style={{
                display: "flex", alignItems: "center", gap: 16,
                background: "#fff",
                border: "none",
                borderRadius: 100, padding: "12px 28px",
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15,
                color: "#bf791d", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap",
              }}>
              Donate Now <ArrowIcon color="#bf791d" size={18} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── SECTION 4 — In My Words (copied from HomeV2 Section16) ─────────────────
const CP_S16_SOCIALS: { name: string; icon: (c: string) => React.ReactNode }[] = [
  { name: "LinkedIn",   icon: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke={c} strokeWidth="1.8" fill="none" /><rect x="2" y="9" width="4" height="12" stroke={c} strokeWidth="1.8" fill="none" /><circle cx="4" cy="4" r="2" stroke={c} strokeWidth="1.8" fill="none" /></svg> },
  { name: "Twitter / X",icon: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M4 20L20 4" stroke={c} strokeWidth="1.9" strokeLinecap="round" /></svg> },
  { name: "WhatsApp",   icon: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={c} strokeWidth="1.8" fill="none" /></svg> },
  { name: "Instagram",  icon: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke={c} strokeWidth="1.8" fill="none" /><circle cx="12" cy="12" r="4" stroke={c} strokeWidth="1.8" fill="none" /><circle cx="17.5" cy="6.5" r="1" fill={c} /></svg> },
];

function S16SocialBtn({ name, icon }: { name: string; icon: (c: string) => React.ReactNode }) {
  const [hov, setHov] = useState(false);
  const gold = "#bf791d";
  return (
    <button aria-label={name}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        border: `1.5px solid ${gold}`, background: hov ? gold : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "background 0.18s",
      }}>
      {icon(hov ? "#fff" : gold)}
    </button>
  );
}

function InMyWordsSection() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section ref={sectionRef} className="cp-fade" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0 56px" : "72px 0 80px" }}>
      <div style={{ maxWidth: 1008, margin: "0 auto", padding: isMobile ? "0 20px" : "0", boxSizing: "border-box" }}>
        <div style={{
          display: "flex", flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start", justifyContent: "space-between",
          gap: isMobile ? 10 : 32, marginBottom: isMobile ? 28 : 44,
        }}>
          <span style={{ display: "inline-flex", flexShrink: 0, border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px", fontFamily: "'Poppins',sans-serif", fontWeight: 400, fontSize: 13, color: "#bf791d", whiteSpace: "nowrap" }}>
            In my words
          </span>
          <h2 style={{ fontFamily: "'Lora',serif", fontWeight: 600, fontSize: isMobile ? 26 : "clamp(28px,4vw,40px)", lineHeight: 1.36, color: "#000", margin: 0, textTransform: "capitalize", textAlign: isMobile ? "left" : "right" }}>
            See The Work, Feel The Journey
          </h2>
        </div>

        <div className="cp-s16-grid">
          <div className="cp-s16-left">
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "26px", color: "#636363", margin: 0 }}>
              The full stories, lessons, and lived moments continue across every channel I share.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {CP_S16_SOCIALS.map(s => <S16SocialBtn key={s.name} name={s.name} icon={s.icon} />)}
            </div>
          </div>

          {isMobile || isTablet ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[imgS16Grid1, imgS16Grid2, imgS16Grid3, imgS16Grid4].map((img, i) => (
                <div key={i} style={{ borderRadius: 14, overflow: "hidden", height: 160 }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="cp-s16-right">
              <div className="cp-s16-row">
                <div className="cp-s16-img-wrap" style={{ flex: "1 1 0", height: 185 }}><img src={imgS16Grid1} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></div>
                <div className="cp-s16-img-wrap" style={{ flex: "1 1 0", height: 185 }}><img src={imgS16Grid2} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></div>
              </div>
              <div className="cp-s16-row">
                <div className="cp-s16-img-wrap" style={{ flex: "1 1 0", height: 185 }}><img src={imgS16Grid3} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></div>
                <div className="cp-s16-img-wrap" style={{ flex: "1 1 0", height: 185 }}><img src={imgS16Grid4} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 5 — Education Closing (copied from HomeV2 SectionClosing) ───────
function EducationClosingSection() {
  const sectionRef = useFadeInUp();
  const textRef    = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { setRevealed(e.isIntersecting); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fill = (text: string, color: string, delay: number, weight = 400): React.ReactNode => (
    <span style={{
      background: `linear-gradient(90deg, ${color} 50%, #d0d0d0 50%)`,
      backgroundSize: "200% 100%",
      backgroundPosition: revealed ? "0% 0" : "100% 0",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      backgroundClip: "text", color: "transparent",
      fontWeight: weight, willChange: "background-position",
      transition: `background-position 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>{text}</span>
  );

  return (
    <section ref={sectionRef} className="cp-fade" style={{ width: "100%", background: "#fff", padding: isMobile ? "64px 0" : "100px 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
        <div ref={textRef} style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 14, textAlign: "center", width: "100%" }}>
          <p style={{ fontFamily: "'Lora',serif", fontSize: isMobile ? 22 : 28, lineHeight: 1.36, margin: 0 }}>
            {fill("Education in India has not changed enough in decades.", "#000", 0, 600)}
          </p>
          <p style={{ fontFamily: "'Lora',serif", fontSize: isMobile ? 22 : 28, lineHeight: 1.36, margin: 0 }}>
            {fill("It will not change through criticism or hope alone", "#000", 0.12)}
          </p>
          <p style={{ fontFamily: "'Lora',serif", fontSize: isMobile ? 22 : 28, lineHeight: 1.36, margin: 0 }}>
            {fill("It will change when ordinary people decide to lift it together,", "#000", 0.24)}
          </p>
          <p style={{ fontFamily: "'Lora',serif", fontSize: isMobile ? 28 : 40, lineHeight: 1.3, margin: 0 }}>
            {fill("and help build the उज्ज्वल भारत of 2050.", "#bf791d", 0.46, 600)}
          </p>
        </div>
        <a href="/donate" style={{
          display: "flex", alignItems: "center", gap: 20,
          background: "#bf791d", border: "none",
          borderRadius: 30, padding: "12px 24px",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16,
          color: "#fff", cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none",
        }}>
          I Commit To Education
          <ArrowIcon color="#fff" size={16} />
        </a>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "stretch", overflowX: "clip" }}>
      <style>{PAGE_CSS}</style>
      <ContactHeroSection onOpenModal={() => setModalOpen(true)} />
      <VisitUsSection />
      <CTABoxSection />
      <InMyWordsSection />
      <EducationClosingSection />
      <Footer onOpenModal={() => setModalOpen(true)} />
      {/* Reuse the home modal if needed */}
      {modalOpen && (
        <div onClick={() => setModalOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: 40, maxWidth: 480, width: "100%", textAlign: "center" }}>
            <p style={{ fontFamily: "'Lora',serif", fontSize: 22, color: "#0a2036", margin: "0 0 8px" }}>Get in Touch</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#636363", margin: "0 0 24px" }}>Use the contact form above to reach us directly.</p>
            <button onClick={() => setModalOpen(false)} style={{ background: "#bf791d", color: "#fff", border: "none", borderRadius: 30, padding: "10px 28px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, cursor: "pointer" }}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
