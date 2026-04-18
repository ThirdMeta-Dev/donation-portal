import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
// @ts-ignore
import imgLogo from "@/assets/urw-logo.png";
// @ts-ignore
import imgFooterBg from "@/assets/footer_bg_new.png";

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

function ArrowIcon({ color = "#fff", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WA_LINK = "https://wa.me/919370318308";

const FOOTER_SOCIAL = [
  {
    label: "LinkedIn",
    href: "#",
    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke="#fff" strokeWidth="1.8" fill="none"/><rect x="2" y="9" width="4" height="12" stroke="#fff" strokeWidth="1.8" fill="none"/><circle cx="4" cy="4" r="2" stroke="#fff" strokeWidth="1.8" fill="none"/></svg>,
    outlined: true,
  },
  {
    label: "Twitter",
    href: "#",
    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M4 20L20 4" stroke="#fff" strokeWidth="1.9" strokeLinecap="round"/></svg>,
    outlined: false,
  },
  {
    label: "WhatsApp",
    href: WA_LINK,
    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#fff" strokeWidth="1.8" fill="none"/></svg>,
    outlined: true,
  },
  {
    label: "Instagram",
    href: "#",
    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#fff" strokeWidth="1.8" fill="none"/><circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.8" fill="none"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg>,
    outlined: true,
  },
];

type FooterLink = { label: string; href: string; external?: boolean };

const FOOTER_NAV: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Community",
    links: [
      { label: "Words From The Community", href: "#section16-testimonials" },
      { label: "Join The Community",        href: WA_LINK, external: true },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Contribute To The Cause",  href: "/donate" },
      { label: "CSR/Business",             href: "#section10-csr" },
      { label: "Volunteers",               href: "#section10-volunteers" },
      { label: "Partners",                 href: "#section10-partners" },
      { label: "Join Community",           href: WA_LINK, external: true },
    ],
  },
  {
    heading: "Mission",
    links: [
      { label: "About The Mission",        href: "#section-intro-ngo" },
      { label: "Programs & Initiatives",   href: "#section8-programs" },
      { label: "See The Impact",           href: "#section9-impact" },
      { label: "Adopt a School",           href: "#section8-adopt" },
    ],
  },
  {
    heading: "Ujjwala Wadekar",
    links: [
      { label: "My Story",                 href: "#section14-story" },
      { label: "My Teaching Method",       href: "#section5-teaching" },
      { label: "Awards & Recognition",     href: "#section4-awards" },
      { label: "The Team",                 href: "#section15-team" },
    ],
  },
];

function scrollToHash(hash: string) {
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${hash}`);
  }
}

export function Footer({ onOpenModal }: { onOpenModal?: () => void }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLink = (link: FooterLink) => {
    if (link.external) { window.open(link.href, "_blank", "noopener noreferrer"); return; }
    if (link.href.startsWith("#")) {
      const hash = link.href.slice(1);
      const isHome = location.pathname === "/" || location.pathname === "/home-v2";
      if (isHome) { scrollToHash(hash); } else { navigate("/"); setTimeout(() => scrollToHash(hash), 400); }
      return;
    }
    navigate(link.href);
  };

  return (
    <footer style={{
      width: "100%",
      position: "relative",
      background: "linear-gradient(175.28deg, #0f2a44 1.94%, #174067 80.05%)",
      borderRadius: isMobile ? "20px 20px 0 0" : "30px 30px 0 0",
      overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Background classroom photo (full width) with soft top blend */}
      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 686,
        top: 115,
        pointerEvents: "none",
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
      }}>
        <img src={imgFooterBg} alt="" aria-hidden style={{
          width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center",
          display: "block",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(18, 50, 80, 0.75)" }} />
      </div>

      {/* Content — constrained box */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1200, margin: "0 auto",
        paddingTop: isMobile ? 48 : isTablet ? 56 : 68,
        paddingBottom: isMobile ? 96 : isTablet ? 120 : 180, // Increased bottom padding to create a distinct gap below the 686px image
        paddingLeft: isMobile ? 20 : isTablet ? 40 : 96,
        paddingRight: isMobile ? 20 : isTablet ? 40 : 96,
        display: "flex", flexDirection: "column", gap: isMobile ? 44 : 68,
      }}>

        {/* ── Top row: Logo/address + Nav cols ── */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: isMobile ? 36 : 0,
        }}>

          {/* Left: Logo + address + social */}
          <div style={{ width: isMobile ? "100%" : 291, display: "flex", flexDirection: "column", gap: 24, flexShrink: 0 }}>
            <img src={imgLogo} alt="URW Logo" style={{ height: 54, width: "auto", maxWidth: 160, objectFit: "contain", display: "block", alignSelf: "flex-start" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 14,
                lineHeight: "24px", color: "#fff", margin: 0,
                maxWidth: isMobile ? "100%" : 240,
              }}>
                "Rau" 89/412, Nehru Nagar, Mohadi Road, Jalgaon, 425002
              </p>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {FOOTER_SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
                    width: 32, height: 32, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, overflow: "hidden",
                    background: s.outlined ? "transparent" : "#2e80d0",
                    border: s.outlined ? "1.5px solid #2e80d0" : "none",
                    cursor: "pointer", textDecoration: "none",
                  }}>
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div style={{
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: isMobile ? "28px 32px" : isTablet ? 28 : 40,
            alignItems: "flex-start",
            width: isMobile ? "100%" : "auto",
          }}>
            {FOOTER_NAV.map((col) => (
              <div key={col.heading} style={{
                display: "flex", flexDirection: "column", gap: 12,
                alignItems: isMobile ? "flex-start" : "flex-end",
                flex: isMobile ? "1 1 calc(50% - 16px)" : "none",
                minWidth: isMobile ? 120 : "auto",
              }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 15,
                  lineHeight: "1.6", color: "#fff", margin: 0,
                  textAlign: isMobile ? "left" : "right",
                  textTransform: "uppercase", letterSpacing: "0.03em",
                }}>
                  {col.heading}
                </p>
                <div style={{ width: 43, height: 1, background: "rgba(255,255,255,0.5)" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: isMobile ? "flex-start" : "flex-end" }}>
                  {col.links.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => handleLink(link)}
                      style={{
                        background: "none", border: "none", padding: 0,
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15,
                        lineHeight: "1.6", color: "#fff", cursor: "pointer",
                        textAlign: isMobile ? "left" : "right",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom section ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 36 : 60 }}>

          {/* Quote + buttons */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 24 : 40,
          }}>
            <p style={{
              fontFamily: "'Lora', serif", fontWeight: 400,
              fontSize: isMobile ? 24 : isTablet ? 30 : 40,
              lineHeight: isMobile ? "34px" : "52px",
              color: "#fff", margin: 0,
              maxWidth: isMobile ? "100%" : 574,
            }}>
              Where teachers lead and society lifts.
            </p>
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 10,
              alignItems: isMobile ? "stretch" : "center",
              flexShrink: 0,
              width: isMobile ? "100%" : "auto",
            }}>
              <button onClick={onOpenModal} className="btn-outline-white" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
                background: "transparent", border: "1px solid #fff",
                borderRadius: 30, padding: "12px 24px",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15,
                color: "#fff", cursor: "pointer", whiteSpace: "nowrap",
              }}>
                Join With Us
                <ArrowIcon color="#fff" size={16} />
              </button>
              <button onClick={() => navigate("/donate")} className="btn-white" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
                background: "#fff", border: "none",
                borderRadius: 30, padding: "12px 24px",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15,
                color: "#bf791d", cursor: "pointer", whiteSpace: "nowrap",
              }}>
                Donate Now
                <ArrowIcon color="#bf791d" size={16} />
              </button>
            </div>
          </div>

          {/* Horizontal divider */}
          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.25)" }} />

          {/* Bottom bar */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? 8 : 0,
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13,
              lineHeight: "1.6", color: "#fff", margin: 0,
            }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting.
            </p>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 13,
              lineHeight: "24px", color: "#fff", margin: 0,
              textAlign: isMobile ? "left" : "right",
            }}>
              CIN:U62013PN2023PTC223154
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
