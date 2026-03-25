import { useState, useEffect } from "react";
// @ts-ignore
import imgFooterBg from "@/assets/footer_bg.png";
// @ts-ignore
import imgFooterLinkedin from "@/assets/footer_ic_linkedin.png";
// @ts-ignore
import imgFooterTwitter from "@/assets/footer_ic_twitter.png";
// @ts-ignore
import imgFooterWhatsapp from "@/assets/footer_ic_whatsapp.png";
// @ts-ignore
import imgFooterInstagram from "@/assets/footer_ic_instagram.png";

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

const FOOTER_SOCIAL = [
  { img: imgFooterLinkedin,  filled: false, label: "LinkedIn" },
  { img: imgFooterTwitter,   filled: true,  label: "Twitter" },
  { img: imgFooterWhatsapp,  filled: false, label: "WhatsApp" },
  { img: imgFooterInstagram, filled: false, label: "Instagram" },
];

const FOOTER_NAV = [
  {
    heading: "Shikha Raj Ujjwal Bharat Foundation",
    links: ["About the trust", "Programs and Initiatives", "Adopt a School"],
  },
  {
    heading: "Ujjwala Wadekar",
    links: ["About Ujjwala", "Teaching Method", "Founder Story", "News and Talks"],
  },
  {
    heading: "Get Involved",
    links: ["Retail Donor", "CSR/Businesses", "Volunteers", "Teachers", "Partners (Non CSR)", "Join Community"],
  },
];

export function Footer() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <footer style={{
      width: "100%",
      position: "relative",
      background: "linear-gradient(175.28deg, #0f2a44 1.94%, #174067 80.05%)",
      borderRadius: isMobile ? "20px 20px 0 0" : "30px 30px 0 0",
      overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Background classroom photo with overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <img src={imgFooterBg} alt="" aria-hidden style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
          display: "block",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(15, 42, 68, 0.82)" }} />
      </div>

      {/* Content — constrained box */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "48px 20px" : isTablet ? "56px 40px" : "68px 96px",
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
            <div style={{
              width: 160, height: 54, borderRadius: 40,
              background: "rgba(217,217,217,0.3)",
              border: "1px solid rgba(255,255,255,0.2)",
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 14,
                lineHeight: "24px", color: "#fff", margin: 0,
                maxWidth: isMobile ? "100%" : 240,
              }}>
                Arcadion Building, North Main Road, Koregoan Park, Pune, Maharashtra Pin: 411001
              </p>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {FOOTER_SOCIAL.map((s) => (
                  <div key={s.label} style={{
                    width: 32, height: 32, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, overflow: "hidden",
                    background: s.filled ? "#2e80d0" : "transparent",
                    border: s.filled ? "none" : "1.5px solid #2e80d0",
                    cursor: "pointer",
                  }}>
                    <img src={s.img} alt={s.label} style={{ width: 20, height: 20, display: "block" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div style={{
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: isMobile ? "24px 32px" : isTablet ? 28 : 44,
            alignItems: "flex-start",
            width: isMobile ? "100%" : "auto",
          }}>
            {FOOTER_NAV.map((col) => (
              <div key={col.heading} style={{
                display: "flex", flexDirection: "column", gap: 10,
                alignItems: isMobile ? "flex-start" : "flex-end",
                flex: isMobile ? "1 1 calc(50% - 16px)" : "none",
                minWidth: isMobile ? 120 : "auto",
              }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14,
                  lineHeight: "1.6", color: "#fff", margin: 0,
                  textAlign: isMobile ? "left" : "right",
                }}>
                  {col.heading}
                </p>
                <div style={{ width: 43, height: 1, background: "rgba(255,255,255,0.5)" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: isMobile ? "flex-start" : "flex-end" }}>
                  {col.links.map((link) => (
                    <a key={link} href="#" style={{
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14,
                      lineHeight: "1.6", color: "#fff", textDecoration: "none",
                      textAlign: isMobile ? "left" : "right",
                    }}>
                      {link}
                    </a>
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
              Lorem Ipsum is simply dummy text of the printing and?
            </p>
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 10,
              alignItems: isMobile ? "stretch" : "center",
              flexShrink: 0,
              width: isMobile ? "100%" : "auto",
            }}>
              <button className="btn-outline-white" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
                background: "transparent", border: "1px solid #fff",
                borderRadius: 30, padding: "12px 24px",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15,
                color: "#fff", cursor: "pointer", whiteSpace: "nowrap",
              }}>
                Join With Us
                <ArrowIcon color="#fff" size={16} />
              </button>
              <button className="btn-white" style={{
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
