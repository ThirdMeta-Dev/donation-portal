/**
 * HomeV2Page — Figma-accurate (node 280:5999 + 294:94 section 5).
 * Sections: Hero, ProgramBanner, S2 (scroll-reveal), S3 (carousel),
 *           S4 (full-bleed cards), S5 (Beyond Syllabus accordion, 294:94)
 */
import { Link } from "react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "../components/SiteNavbar";
import { Footer } from "../components/SiteFooter";
import { supabase } from "../lib/supabase";

// ── Local asset imports (bundled by Vite for production) ─────────────────
// @ts-ignore
import imgHero from "@/assets/2ca4cd7fc331c012fd6c3a208d30b67ca94bb02a.png";
// @ts-ignore
import imgTeacher from "@/assets/3b08adbd33c0549761095e0db7549411c51bd4ec.png";
// @ts-ignore
import imgTexture from "@/assets/10c9de2356342a2446587a7242a74b82052060e2.svg";
// @ts-ignore
import imgEllipse1 from "@/assets/bfca26775f8ffbbc192c6f8abee068e70d1ec79f.svg";
// @ts-ignore
import imgEllipse2 from "@/assets/7d726aa01847c452773e5fbeaccbbfdb8c917a52.svg";
// @ts-ignore
import imgChevron from "@/assets/8d5928d43f1ad11aaebbaf276ef31f030d752d0e.svg";
// @ts-ignore
import imgChevronGold from "@/assets/e25a4b39e8a9a67792da4b7be40a5cd1efeff3fd.svg";
// @ts-ignore
import imgPlayBtn from "@/assets/94b7d143f7d79dcee5c3ef4a168888c8f0e66ec9.svg";
// @ts-ignore
import imgStatBg from "@/assets/b33ea922189e2f8727c7c9b20f1df35f797556ff.svg";
// @ts-ignore
import s12_cta_pattern from "../../assets/images/s12_cta_pattern.svg";
// @ts-ignore
import s16_map_bg from "../../assets/images/s16_map_bg.svg";
// @ts-ignore
import imgCarousel1 from "@/assets/b025de5e50e257a2a8382e99cc8bc799d9ebaba4.png";

// Section 5
// @ts-ignore
import imgS5Bg from "@/assets/s5_bg_new.png";
// @ts-ignore
import imgS5IconSee from "@/assets/6239a7c8a74115af9a45427cf8fc07127899149e.svg";
// @ts-ignore
import imgS5IconHear from "@/assets/579a5483fb71d125cee21246fb7e91f5563c4bfd.svg";
// @ts-ignore
import imgS5IconRead from "@/assets/7ad164ba0fa91571a1ae01850abe3826d3f6d73d.svg";
// @ts-ignore
import imgS5SepLong from "@/assets/1b48129b855c986260738411455a70e5f4e4a07e.svg";
// @ts-ignore
import imgS5SepShort from "@/assets/b4a6fb0375bb63074e5712fce882ac829cb825a4.svg";

// Section 6 — Testimonials
// @ts-ignore
import imgS6Bg_local from "@/assets/3295e477553d40b1c93909599b04241c3de200a2.png";
// @ts-ignore
import imgS6Over_local from "@/assets/8255568bbb03a1180ca10eba4f98571a0f552af7.png";

const imgS6Bg         = imgS6Bg_local;
const imgS6OverPhoto  = imgS6Over_local;

const IconQuote = () => (
  <svg width="102" height="56" viewBox="0 0 102 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.2407 55.4729C50.9677 55.4729 49.149 55.2487 47.7851 54.8005C46.4213 54.3522 45.853 53.7919 46.0803 53.1195C48.1261 48.4127 50.8539 43.1456 54.2637 37.3181C57.9008 31.2666 61.9925 25.5512 66.5388 20.172C71.0852 14.5686 75.9724 9.9739 81.2007 6.38779C86.6563 2.57752 92.2256 0.44826 97.9084 0H99.6133C101.205 0 102 0.448267 102 1.3448C102 2.46546 100.182 4.70679 96.5445 8.06878C91.0889 12.9997 87.3382 18.2668 85.2924 23.8702C83.4739 29.4734 82.11 34.5164 81.2007 38.9991C80.5187 43.4818 79.0412 46.6196 76.768 48.4127C73.3582 50.8781 69.3803 52.6712 64.8339 53.7919C60.5149 54.9125 56.6505 55.4729 53.2407 55.4729ZM7.20918 55.4729C4.93601 55.4729 3.11748 55.2487 1.75358 54.8005C0.389685 54.3522 -0.178606 53.7919 0.0487106 53.1195C2.09456 48.4127 4.82236 43.1456 8.23211 37.3181C11.6418 31.2666 15.6199 25.5512 20.1662 20.172C24.9398 14.5686 29.9408 9.9739 35.1691 6.38779C40.3974 2.57752 45.853 0.44826 51.5359 0H53.2407C55.0594 0 55.9685 0.448267 55.9685 1.3448C55.9685 2.91372 54.15 5.15505 50.5129 8.06878C45.0573 12.9997 41.3066 18.2668 39.2608 23.8702C37.2149 29.4734 35.7374 34.5164 34.8281 38.9991C34.1462 43.4818 32.6686 46.6196 30.3954 48.4127C27.213 50.8781 23.3487 52.6712 18.8023 53.7919C14.4834 54.9125 10.6189 55.4729 7.20918 55.4729Z" fill="url(#s6-quote-grad)"/>
    <defs>
      <linearGradient id="s6-quote-grad" x1="51" y1="55.4729" x2="51" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F9F2E8"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

// @ts-ignore
import imgS6ProgBg from "@/assets/03dce0304399973bbcca23766d34a2477e51f79f.svg";

type Testimonial = {
  id: string;
  title: string;
  body: string;
  photo: string;
};

const S6_DATA: Record<string, Testimonial[]> = {
  teachers: [
    { id: "t1", title: "Grade-level reading assessments conduct", body: "Grade-level reading assessments conducted each term by teacher facilitators across 120 Grade-level reading lorem ips assessments conducted each term by teacher", photo: imgS6OverPhoto },
    { id: "t2", title: "Empowering educators through tech", body: "Our digital portal has revolutionized how we track student progress. It allows for real-time adjustments and more personalized support in the classroom.", photo: imgS6OverPhoto },
    { id: "t3", title: "A new standard for rural schools", body: "Bringing these assessments to rural areas has leveled the playing field for our students. The data-driven approach is truly transformative for educators.", photo: imgS6OverPhoto },
  ],
  parents: [
    { id: "p1", title: "Seeing my child grow every day", body: "The constant feedback from the portal helps me understand where my child needs help. It's transformed our evening study sessions into bonding time.", photo: imgS6OverPhoto },
    { id: "p2", title: "Transparency in education", body: "I finally feel connected to what's happening at school. The level of detail in the reading reports is unlike anything we've seen before.", photo: imgS6OverPhoto },
    { id: "p3", title: "Simplified learning journeys", body: "My daughter loves the interactive nature of the assignments. The platform makes complex subjects feel accessible and fun for young learners.", photo: imgS6OverPhoto },
  ],
  students: [
    { id: "s1", title: "Learning is now a fun adventure", body: "I used to be afraid of reading tests, but now they feel like games. I can see my progress and earn badges which keeps me really excited to learn.", photo: imgS6OverPhoto },
    { id: "s2", title: "My favorite way to study", body: "The portal is so easy to use! I can practice my reading and get instant help when I'm stuck on a hard word. It makes me feel much more confident.", photo: imgS6OverPhoto },
    { id: "s3", title: "Reaching my full potential", body: "Thanks to the personalized reading tracks, I've improved my grade by two levels this term. I feel ready for high school and beyond!", photo: imgS6OverPhoto },
  ],
};

const S6_TABS = [
  { id: "teachers", label: "Teachers" },
  { id: "parents", label: "Parents" },
  { id: "students", label: "Students" },
];

// ── Responsive hook ───────────────────────────────────────────────────────
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

// ── Global animation CSS ──────────────────────────────────────────────────
const GLOBAL_CSS = `
@keyframes fadeInUp {
  from { opacity:0; transform:translateY(40px) scale(0.96); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
.fade-in-up { opacity: 0; }
.fade-in-up.visible {
  animation: fadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
}
.fade-in-up.delay-1 { animation-delay: 0.1s; }
.fade-in-up.delay-2 { animation-delay: 0.2s; }

/* Section 2 scroll text reveal */
.trw { display:inline; color:#d0d0d0; transition:color 0.35s ease; }
.trw.lit { color:#000; }

/* Section 5 accordion smooth expand */
.accordion-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}
.accordion-body.open {
  grid-template-rows: 1fr;
}
.accordion-body > div { overflow: hidden; }

/* Section 8 card slide-in */
@keyframes s8CardIn {
  from { transform: translateY(480px); }
  to   { transform: translateY(0); }
}
.s8-card-in {
  animation: s8CardIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
}

/* Section 9 — hide scrollbar on card track */
.s9-track { scrollbar-width: none; -ms-overflow-style: none; }
.s9-track::-webkit-scrollbar { display: none; }

/* ── Mobile hamburger menu animation ── */
@keyframes mobileMenuSlideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.v2-mobile-menu {
  animation: mobileMenuSlideDown 0.25s ease forwards;
}

/* ── Navigation Arrows (Sections 3 & 4) ── */
.nav-arrow-btn {
  background: #fff;
  border: 1px solid #174067;
  color: #174067;
  transition: all 0.2s ease;
}
.nav-arrow-btn:hover {
  background: #174067;
  color: #fff;
}
.nav-arrow-btn svg path {
  stroke: currentColor;
}
`;

// ── Hooks ─────────────────────────────────────────────────────────────────
function useFadeInUp(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useTextReveal() {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>(".trw");
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh * 0.3)));
      const litCount = Math.round(progress * words.length);
      words.forEach((w, i) => { if (i < litCount) w.classList.add("lit"); else w.classList.remove("lit"); });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

// ── Arrow icon ────────────────────────────────────────────────────────────
function ArrowIcon({ color = "#fff", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── StatCard ──────────────────────────────────────────────────────────────
function StatCard() {
  return (
    <div style={{ position: "relative", width: 225.924, height: 97, overflow: "hidden" }}>
      <img src={imgStatBg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill" }} />
      <ul style={{ position: "absolute", left: 8, top: 9, width: 198, fontStyle: "italic", fontSize: 12, color: "#f9c56d", fontFamily: "'DM Sans', sans-serif", lineHeight: "22px", listStyle: "disc", paddingLeft: 21, margin: 0, whiteSpace: "nowrap" }}>
        <li style={{ fontWeight: 500 }}>Ujjwala Wadekar</li>
        <li><span style={{ fontWeight: 500 }}>31 years</span><span style={{ fontWeight: 300 }}> in government schools</span></li>
        <li><span style={{ fontWeight: 500 }}>10k+</span><span style={{ fontWeight: 300 }}> characters shaped</span></li>
      </ul>
    </div>
  );
}

// ── VideoCards ────────────────────────────────────────────────────────────
function VideoCards() {
  return (
    <div style={{ display: "inline-grid", gridTemplateColumns: "max-content", gridTemplateRows: "max-content", position: "relative", placeSelf: "start" }}>
      <div style={{ gridColumn: 1, gridRow: 1, background: "#d9d9d9", borderRadius: 12, width: 255, height: 144 }} />
      <div style={{ gridColumn: 1, gridRow: 1, marginLeft: 111, marginTop: 56, width: 32, height: 32, position: "relative" }}>
        <img src={imgPlayBtn} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>
      <div style={{ gridColumn: 1, gridRow: 1, marginLeft: 117, marginTop: 98, display: "flex", alignItems: "center", justifyContent: "center", width: 160, height: 232 }}>
        <div style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
          <div style={{ background: "#c7c7c7", border: "1px solid #112d48", borderRadius: 12, boxShadow: "4px 4px 0px 0px #091c2f", width: 232, height: 160 }} />
        </div>
      </div>
      <div style={{ gridColumn: 1, gridRow: 1, marginLeft: 181, marginTop: 198, width: 32, height: 32, position: "relative" }}>
        <img src={imgPlayBtn} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useFadeInUp(0.05);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmall = isMobile || isTablet;

  return (
    <div ref={ref} className="fade-in-up" style={{ width: "100%", minHeight: isMobile ? "auto" : 724, position: "relative", background: "linear-gradient(114.7deg, #0a2036 0%, #132f4c 100%)", marginBottom: isMobile ? 0 : -131, flexShrink: 0 }}>

      {/* ── Decorative layer: overflow:hidden here clips textures/ellipses ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ width: "100%", margin: "0 auto", position: "relative", height: isMobile ? "100%" : 724, overflow: "hidden" }}>
          {/* Hero image — hidden on mobile, full width on desktop */}
          {!isMobile && (
            <div style={{ position: "absolute", inset: 0 }}>
              <img src={imgHero} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "right bottom" }} />
            </div>
          )}
          {/* Left gradients ×7 — stacked to ensure dark-left fade for readable text */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", top: 0, left: 0, width: isMobile ? "100%" : "70%", height: isMobile ? "100%" : 724, background: isMobile ? "linear-gradient(to bottom, #0b223a 60%, rgba(11,34,58,0.8) 100%)" : "linear-gradient(to right, rgba(11,34,58,1) 0%, rgba(11,34,58,0.9) 30%, rgba(11,34,58,0) 100%)" }} />
          ))}
          {/* Right gradient (restored) — starts transparent, fades to dark at right edge */}
          {!isMobile && (
            <div style={{ position: "absolute", top: 0, right: 0, width: "70%", height: "100%", background: "linear-gradient(to right, rgba(11,34,58,0) 0%, rgba(11,34,58,1) 100%)" }} />
          )}
          <div style={{ position: "absolute", left: -122, top: -25, width: 653, height: 436, opacity: 0.45 }}>
            <img src={imgTexture} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          {!isMobile && (
            <>
              <div style={{ position: "absolute", left: -122, top: 411, width: 653, height: 436, opacity: 0.35 }}>
                <img src={imgTexture} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ position: "absolute", left: -822, top: -447, width: 1591, height: 928, transform: "rotate(90deg)", opacity: 0.25 }}>
                <img src={imgEllipse1} alt="" style={{ width: "100%", height: "100%" }} />
              </div>
              <div style={{ position: "absolute", left: 830, top: 110, width: 277, height: 277 }}>
                <img src={imgEllipse2} alt="" style={{ width: "100%", height: "100%" }} />
              </div>
              <div style={{ position: "absolute", left: 785, top: 53, width: 84, height: 6, background: "#ffa530", borderRadius: 3 }} />
            </>
          )}
        </div>
      </div>

      {/* ── Content layer ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", minHeight: isMobile ? "auto" : 724, zIndex: 2 }}>
        <div style={{ padding: isMobile ? "20px 20px 40px" : isTablet ? "24px 32px 48px" : "28px 96px 60px", display: "flex", flexDirection: "column", gap: isMobile ? 28 : 44, alignItems: isMobile ? "stretch" : "center", position: "relative" }}>
          <div style={{ position: "relative", zIndex: 200, width: "100%" }}>
            <Navbar />
          </div>

          {/* Hero content — stacked on mobile, side-by-side on desktop */}
          {isMobile ? (
            /* ── MOBILE Hero Content ── */
            <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Award 1", "Award 2", "Award 3"].map(a => (
                    <div key={a} style={{ background: "#13304c", borderRadius: 6, height: 32, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 200, fontSize: 11, color: "#fff" }}>{a}</span>
                    </div>
                  ))}
                </div>
                <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 500, fontSize: 30, lineHeight: 1.25, color: "#fff", textTransform: "capitalize", margin: 0 }}>
                  Building Character,<br />Confidence, and Capability in Every Child
                </h1>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "rgba(255,255,255,0.8)", margin: 0 }}>
                  Through practical teaching experiences, I bring classrooms closer to life and children learn by seeing, doing, feeling, and understanding.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Link to="/donate" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                  <button className="btn-gold" style={{ display: "flex", alignItems: "center", gap: 12, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.3)" }}>
                    Support This Mission <ArrowIcon />
                  </button>
                </Link>
                <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: 0 }}>
                  <span className="arrow-bounce"><svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M9 15l-5-5M9 15l5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  See My Teaching Method
                </button>
              </div>
            </div>
          ) : (
            /* ── TABLET / DESKTOP Hero Content ── */
            <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", maxWidth: 1008 }}>
              {/* Teacher images — hidden on tablet */}
              {!isTablet && (
                <>
                  <div style={{ position: "absolute", left: 371, top: -31, width: 385, height: 533, pointerEvents: "none" }}>
                    <div style={{ transform: "scaleX(-1)", width: "100%", height: "100%" }}>
                      <div style={{ width: 385, height: 533, overflow: "hidden", opacity: 0.25, position: "relative" }}>
                        <img src={imgTeacher} alt="" style={{ position: "absolute", height: "108.82%", left: "-0.08%", maxWidth: "none", top: "-8.82%", width: "100.15%" }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ position: "absolute", left: 446, top: 63, width: 315, height: 439, overflow: "hidden", pointerEvents: "none" }}>
                    <img src={imgTeacher} alt="Ujjwala Wadekar" style={{ position: "absolute", height: "107.97%", left: "-0.02%", maxWidth: "none", top: "-7.97%", width: "100.04%" }} />
                  </div>
                  <div style={{ position: "absolute", left: 235, top: -8, zIndex: 5 }}>
                    <StatCard />
                  </div>
                </>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 40, width: isTablet ? "50%" : 364, flexShrink: 0, position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Award 1", "Award 2", "Award 3"].map(a => (
                      <div key={a} style={{ background: "#13304c", borderRadius: 6, height: 40, width: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 200, fontSize: 13, color: "#fff" }}>{a}</span>
                      </div>
                    ))}
                  </div>
                  <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 500, fontSize: isTablet ? 32 : 38, lineHeight: 1.2, color: "#fff", textTransform: "capitalize", width: isTablet ? "100%" : 455, margin: 0 }}>
                    {"Building Character, Confidence, and Capability in Every Child"}
                  </h1>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <Link to="/donate" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                    <button className="btn-gold" style={{ display: "flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.3)" }}>
                      Support This Mission <ArrowIcon />
                    </button>
                  </Link>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, padding: 0 }}>
                    <span className="arrow-bounce"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M9 15l-5-5M9 15l5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    See My Teaching Method
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 36, alignItems: "flex-end", width: isTablet ? "40%" : 245, flexShrink: 0, position: "relative", zIndex: 2 }}>
                {!isTablet && <VideoCards />}
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "22px", color: "#fff", textAlign: "right", maxWidth: 245, margin: 0 }}>
                  Through practical teaching experiences, I bring classrooms closer to life and children learn by seeing, doing, feeling, and understanding.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ProgramBanner ─────────────────────────────────────────────────────────
function ProgramBanner() {
  const ref = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const items = ["Open conversations on real classroom struggles", "Learn from Ujjwala's practical guidance", "Build collective action for change"];
  return (
    <div ref={ref} className="fade-in-up" style={{
      width: isMobile ? "97%" : "100%",
      position: "relative",
      zIndex: 10,
      background: "linear-gradient(-79.93deg, #b77607 0.12%, #885615 99.88%)",
      borderRadius: isMobile ? 16 : 30,
      margin: isMobile ? "-32px auto 0" : undefined,
      marginTop: 37,
    }}>
      <div style={{
        maxWidth: 1008,
        margin: "0 auto",
        padding: isMobile ? "20px 16px 24px" : "24px 24px 60px",
        boxSizing: "border-box",
        position: "relative",
      }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 20 : isTablet ? 40 : 104, alignItems: "flex-start" }}>
          {/* Left: program name + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: isMobile ? "100%" : isTablet ? "55%" : 488, color: "#fff", flexShrink: isMobile ? undefined : 0 }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: isMobile ? 16 : 18, margin: 0 }}>उज्ज्वल संवाद (Ujjwal Sanvaad)</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 14 : 15, lineHeight: "24px", margin: 0 }}>
              Come sit with Ujjwala and a growing community of teachers, parents, and supporters who want better education for every child.
            </p>
          </div>
          {/* Right: bullet list */}
          <div style={{ display: "flex", flexDirection: "column", color: "#fff", flexShrink: 0 }}>
            {items.map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0" }}>
                <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><ArrowIcon size={14} /></div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 13 : 15, lineHeight: "24px", margin: 0, whiteSpace: isMobile ? "normal" : "nowrap" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* "Join Teacher Network" button pinned to anchor */}
        <div style={isMobile ? { marginTop: 20 } : { position: "absolute", right: 24, bottom: 24 }}>
          <a href="#volunteer-form" style={{ textDecoration: "none" }}>
            <button
              onMouseEnter={e => { e.currentTarget.style.background = "#0f2a44"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#174067"; }}
              style={{
                display: "flex", alignItems: "center", gap: isMobile ? 12 : 20,
                background: "#174067", borderRadius: 20, padding: isMobile ? "10px 20px" : "10px 24px",
                border: "none", cursor: "pointer", color: "#fff",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: isMobile ? 14 : 16, whiteSpace: "nowrap",
                position: isMobile ? "static" : "relative", top: isMobile ? undefined : 41,
                width: isMobile ? "100%" : undefined, justifyContent: isMobile ? "center" : undefined,
                transition: "background 0.18s ease",
              }}>
              Let's Rethink Education Together <ArrowIcon />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Section 2: Figma CTA Banner (node 160:4105) ───────────────────────────
function Section2() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Decorative SVG illustration (inline — the tan/gold map shape from Figma)
  const DecorativeIllustration = () => (
    <svg viewBox="0 0 276 435" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: isMobile ? 0 : isTablet ? 140 : 200, height: isMobile ? 0 : isTablet ? 245 : 350, flexShrink: 0, opacity: 0.85 }}>
      <path d="M200.5 2C200.5 2 245 18 261 55C277 92 275.5 128 265.5 158C255.5 188 240 210 225 232C210 254 185 270 170 292C155 314 145 340 130 362C115 384 95 408 70 422C45 436 15 440 5 428C-5 416 8 395 20 378C32 361 50 348 62 330C74 312 78 288 88 268C98 248 118 232 128 212C138 192 138 168 138 148C138 128 130 108 125 88C120 68 118 45 128 28C138 11 165 2 200.5 2Z" fill="#E8D5B0" opacity="0.6"/>
      <path d="M160 50C160 50 195 65 210 95C225 125 222 158 212 182C202 206 185 222 170 242C155 262 138 278 125 300C112 322 105 348 92 368C79 388 60 410 42 420C24 430 5 428 2 416C-1 404 12 385 25 370C38 355 55 342 65 325C75 308 78 285 88 266C98 247 115 232 122 212C129 192 128 168 125 148C122 128 115 108 115 88C115 68 118 48 130 36C142 24 160 28 160 50Z" fill="#D4B896" opacity="0.5"/>
      <path d="M100 120C100 120 135 132 148 158C161 184 156 215 145 235C134 255 118 268 105 288C92 308 83 332 72 350C61 368 45 386 30 394C15 402 2 398 0 388C-2 378 10 363 22 350C34 337 50 326 58 310C66 294 68 272 76 254C84 236 98 222 104 204C110 186 108 166 105 148C102 130 96 112 100 120Z" fill="#C9A87C" opacity="0.4"/>
    </svg>
  );

  return (
    <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#ffffff", padding: isMobile ? "24px 16px" : isTablet ? "32px 24px" : "32px 96px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1008, margin: "0 auto" }}>
        {/* Cream bordered card */}
        <div style={{
          background: "#FDF8F1",
          border: "1px solid #E8D5B0",
          borderRadius: 20,
          padding: isMobile ? "28px 20px 24px" : "32px 36px 32px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 0 : 16,
          position: "relative",
          overflow: "hidden",
          minHeight: isMobile ? undefined : 186,
        }}>
          {/* Left: heading + buttons stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 20 : 24, flex: 1, minWidth: 0 }}>
            {/* Heading */}
            <p style={{
              margin: 0,
              fontFamily: "'Lora', serif",
              fontWeight: 500,
              fontSize: isMobile ? 22 : isTablet ? 24 : 28,
              lineHeight: 1.32,
              color: "#000",
              textTransform: "capitalize",
              maxWidth: isMobile ? "100%" : 630,
            }}>
              We Unlock Scale By Fixing What's Lorem Leaking Conversion?
            </p>

            {/* Buttons — shown under heading on desktop, stacked on mobile */}
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 10 : 10,
              alignItems: isMobile ? "stretch" : "center",
            }}>
              {/* Solid gold button (About Ujjwala) */}
              <Link to="/about" style={{ textDecoration: "none" }}>
                <button
                  className="btn-gold"
                  onMouseEnter={e => { e.currentTarget.style.background = "#AE6E1A"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#bf791d"; }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : undefined,
                    gap: 20, background: "#bf791d",
                    borderRadius: 30, padding: isMobile ? "11px 20px" : "12px 24px",
                    border: "none", cursor: "pointer",
                    color: "#fff", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600, fontSize: 16,
                    whiteSpace: "nowrap", transition: "background 0.18s ease",
                    width: isMobile ? "100%" : undefined,
                  }}>
                  About Ujjwala <ArrowIcon color="#fff" />
                </button>
              </Link>
              {/* Outlined button (Join Ujjwala's Mission) */}
              <Link to="/join" style={{ textDecoration: "none" }}>
                <button
                  className="btn-ujjwala-hover"
                  onMouseEnter={e => { e.currentTarget.style.setProperty("background", "#F9F2E8", "important"); }}
                  onMouseLeave={e => { e.currentTarget.style.setProperty("background", "transparent", "important"); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : undefined,
                    gap: 20, background: "transparent",
                    borderRadius: 30, padding: isMobile ? "11px 20px" : "12px 24px",
                    border: "1px solid #bf791d", cursor: "pointer",
                    color: "#bf791d", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600, fontSize: 16,
                    whiteSpace: "nowrap", transition: "background 0.18s ease",
                    width: isMobile ? "100%" : undefined,
                  }}>
                  Join Ujjwala's Mission <ArrowIcon color="#bf791d" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right: decorative illustration */}
          {!isMobile && (
            <div style={{ flexShrink: 0, position: "relative", alignSelf: "stretch", display: "flex", alignItems: "center" }}>
              <DecorativeIllustration />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Section 3: Image Carousel ─────────────────────────────────────────────
const S3_SLIDES = [
  { img: imgCarousel1, caption: "Children do not lack intelligence. They lack the chance to be seen and guided." },
  { img: imgCarousel1, caption: "Education is not a privilege for a few. It is every child's rightful path forward." },
  { img: imgCarousel1, caption: "When a teacher walks to a child's door, education begins to feel possible again." },
  { img: imgCarousel1, caption: "The purpose of education is not finishing the syllabus. It's beyond the syllabus to build human beings." },
  { img: imgCarousel1, caption: "Education is the only way to break the cycle of survival and open the door to dignity." },
  { img: imgCarousel1, caption: "Education changes faster when teachers lead and the society lifts." },
  { img: imgCarousel1, caption: "When a teacher walks to a child's door, education begins to feel possible again." },
];

function Section3() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [current, setCurrent] = useState(0);
  const total = S3_SLIDES.length;
  const prev = useCallback(() => setCurrent(c => (c === 0 ? total - 1 : c - 1)), [total]);
  const next = useCallback(() => setCurrent(c => (c === total - 1 ? 0 : c + 1)), [total]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Figma: image 1098×565, glass card 528×211, overlaps image by 174px → 37px below image
  const IMG_H = 565;
  const GLASS_H = 211;
  const GLASS_OVERLAP = 174; // glass card overlaps bottom of image
  const TOTAL_H = IMG_H + (GLASS_H - GLASS_OVERLAP); // 602px

  // Shared nav buttons (used in both mobile and desktop)
  const NavButtons = ({ size = 44 }: { size?: number }) => (
    <div style={{ display: "flex", gap: 8 }}>
      {/* Prev */}
      <button onClick={prev} className="nav-arrow-btn" style={{ width: size, height: size, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
        <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {/* Next */}
      <button onClick={next} className="nav-arrow-btn" style={{ width: size, height: size, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
        <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", paddingTop: 40, paddingBottom: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4 / 5" }}>
            {/* All slides stacked — opacity crossfade, no remount */}
            {S3_SLIDES.map((slide, i) => (
              <img key={i} src={slide.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === current ? 1 : 0, transition: "opacity 0.5s ease" }} />
            ))}
            {/* Glassmorphism card */}
            <div style={{
              position: "absolute", left: 16, right: 16, bottom: 16,
              padding: 16, borderRadius: 16,
              background: "rgba(13,36,59,0.30)", backdropFilter: "blur(53px)", WebkitBackdropFilter: "blur(53px)",
              border: "1px solid rgba(0,0,0,0.15)", boxShadow: "0 -4px 6px rgba(5,23,42,0.25)",
              display: "flex", flexDirection: "column", gap: 12, zIndex: 2,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {Array.from({ length: total }).map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} style={{ height: 3, width: i === current ? 25 : 4, borderRadius: 9999, background: i === current ? "#f59e0b" : "rgba(255,255,255,0.5)", border: "none", padding: 0, cursor: "pointer", transition: "width 0.3s ease", flexShrink: 0 }} />
                ))}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, lineHeight: "1.4", color: "#fff", margin: 0 }}>{S3_SLIDES[current].caption}</p>
              <button className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#bf791d", borderRadius: 30, padding: "10px 18px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, alignSelf: "flex-start" }}>
                Read Ujjwala's Story <ArrowIcon size={13} />
              </button>
            </div>
            {/* Nav arrows — top-right on mobile */}
            <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6, zIndex: 5 }}>
              <NavButtons size={36} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isTablet ? "0 32px" : "0 51px" }}>
        {/* Outer wrapper: taller than image to accommodate glass card extending below */}
        <div style={{ position: "relative", maxWidth: 1098, margin: "0 auto", height: TOTAL_H }}>

          {/* Background exact organic blob using CSS Mask to match the frame solid color */}
          <div style={{
            position: "absolute",
            right: -20,
            top: -150,
            width: 480,
            height: 480,
            zIndex: 0,
            pointerEvents: "none",
            background: "#f9f2e8", // Creamy solid fill matching Figma
            WebkitMaskImage: `url(${imgTexture})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskImage: `url(${imgTexture})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            transform: "rotate(-10deg) scaleX(-1)" // Flipping to match the precise slope from the screenshot
          }} />

          {/* ── Image card: all slides stacked, crossfade via opacity ── */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: IMG_H, borderRadius: 20, overflow: "hidden", zIndex: 1 }}>
            {S3_SLIDES.map((slide, i) => (
              <img key={i} src={slide.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: i === current ? 1 : 0, transition: "opacity 0.5s ease" }} />
            ))}
          </div>

          {/* ── Glassmorphism card: bottom-left, overlaps image by 174px ── */}
          <div style={{
            position: "absolute",
            left: 45,
            bottom: 0,
            width: isTablet ? "46%" : 528,
            height: GLASS_H,
            borderRadius: 20,
            background: "rgba(13,36,59,0.30)",
            backdropFilter: "blur(53px)", WebkitBackdropFilter: "blur(53px)",
            border: "1px solid rgba(0,0,0,0.15)",
            boxShadow: "0 -4px 6px rgba(5,23,42,0.25)",
            padding: 28,
            boxSizing: "border-box",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            zIndex: 3,
          }}>
            {/* Progress dots */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {Array.from({ length: total }).map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{ height: 3, width: i === current ? 25 : 4, borderRadius: 9999, background: i === current ? "#f59e0b" : "rgba(255,255,255,0.5)", border: "none", padding: 0, cursor: "pointer", transition: "width 0.3s ease", flexShrink: 0 }} />
              ))}
            </div>
            {/* Quote + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 20, lineHeight: "28px", color: "#fff", margin: 0, transition: "opacity 0.4s ease" }}>
                {S3_SLIDES[current].caption}
              </p>
              <button className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, boxShadow: "0 0 8px rgba(0,0,0,0.25)", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                Read Ujjwala's Story <ArrowIcon size={16} />
              </button>
            </div>
          </div>

          {/* ── Navigation: bottom-right ── */}
          <div style={{ position: "absolute", right: 0, bottom: 4, display: "flex", alignItems: "center", gap: 16, zIndex: 3 }}>
            <NavButtons size={44} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "22px", color: "#174067" }}>
              {current + 1}/{total}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Section 4: Media & Recognitions full-bleed carousel ───────────────────
const S4_CARDS = [
  { label: "National Award 2018", sub: "Ministry of Education", color: "#d9d9d9" },
  { label: "State Merit 2021", sub: "Maharashtra Govt.", color: "#e2ddd6" },
  { label: "Global Impact 2023", sub: "Edu-Global Foundation", color: "#d9d9d9" },
  { label: "Teacher of the Year", sub: "CBSE Council 2019", color: "#e2ddd6" },
  { label: "Innovation Award", sub: "Teach For India", color: "#d9d9d9" },
  { label: "Community Hero", sub: "Jalgaon District", color: "#e2ddd6" },
  { label: "Digital Learning", sub: "UNESCO Recognition", color: "#d9d9d9" },
];

const S4_LOOP = [...S4_CARDS, ...S4_CARDS, ...S4_CARDS];
const S4_N = S4_CARDS.length;

function Section4() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const GAP = 16;
  const [cardWidth, setCardWidth] = useState(268);
  // idx into S4_LOOP — starts at N (middle copy) so we can go prev and next freely
  const [idx, setIdx] = useState(S4_N);
  const [skipAnim, setSkipAnim] = useState(false);

  const updateCardWidth = useCallback(() => {
    const vw = window.innerWidth;
    if (vw < 768) {
      setCardWidth(Math.floor(vw * 0.78));
      return;
    }
    const leftMargin = Math.max(0, (vw - 1200) / 2);
    const leftColOffset = vw < 1024 ? 0 : leftMargin + 96 + 340 + 48;
    const trackW = vw < 1024 ? vw - 32 : vw - leftColOffset;
    const targetVisible = vw >= 1100 ? 2.5 : vw >= 768 ? 2 : 1.2;
    const w = Math.floor((trackW - GAP * (targetVisible - 1)) / targetVisible);
    setCardWidth(Math.max(160, Math.min(420, w)));
  }, []);

  useEffect(() => {
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [updateCardWidth]);

  const stepSize = cardWidth + GAP;
  const offset = idx * stepSize;

  // After each navigation, if idx drifted outside the middle copy, silently teleport back
  useEffect(() => {
    if (idx < S4_N || idx >= 2 * S4_N) {
      const t = setTimeout(() => {
        setSkipAnim(true);
        setIdx(prev => (prev < S4_N ? prev + S4_N : prev - S4_N));
        requestAnimationFrame(() => requestAnimationFrame(() => setSkipAnim(false)));
      }, 520);
      return () => clearTimeout(t);
    }
  }, [idx]);

  const prevSlide = useCallback(() => { setSkipAnim(false); setIdx(prev => prev - 1); }, []);
  const nextSlide = useCallback(() => { setSkipAnim(false); setIdx(prev => prev + 1); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prevSlide(); if (e.key === "ArrowRight") nextSlide(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevSlide, nextSlide]);

  const trackStyle = {
    display: "flex" as const, gap: GAP,
    transform: `translateX(-${offset}px)`,
    transition: skipAnim ? "none" : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
    willChange: "transform" as const,
    alignItems: "stretch" as const,
  };

  const navButtons = (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: isMobile || isTablet ? 8 : 0 }}>
      <button onClick={prevSlide} className="nav-arrow-btn" style={{ width: 44, height: 44, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 5L7 10L12 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button onClick={nextSlide} className="nav-arrow-btn" style={{ width: 44, height: 44, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5L13 10L8 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );

  // Mobile/tablet: stacked layout
  if (isMobile || isTablet) {
    return (
      <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#f8f5ef", paddingTop: isMobile ? 40 : 48, paddingBottom: isMobile ? 40 : 48, overflow: "hidden" }}>
        <div style={{ padding: isMobile ? "0 20px 24px" : "0 32px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "inline-flex", alignItems: "center", padding: "6px 20px", borderRadius: 40, border: "1px solid #e8e8e8", alignSelf: "flex-start" }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>Seen &amp; acknowledged</span>
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 28 : 36, lineHeight: 1.24, color: "#000", margin: 0 }}>Finally, My Voice Reached!!</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "24px", color: "#686868", margin: 0 }}>Awards don't define my work. They confirm that someone is watching and believe it mattered.</p>
          {navButtons}
        </div>
        <div style={{ overflow: "hidden", paddingLeft: isMobile ? 20 : 32 }}>
          <div style={trackStyle}>
            {S4_LOOP.map((card, i) => (
              <div key={i} style={{ width: cardWidth, minHeight: isMobile ? 220 : 300, flexShrink: 0, borderRadius: 12, background: card.color, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20, boxSizing: "border-box", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 16, color: "#112d48", margin: "0 0 4px" }}>{card.label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: "#686868", margin: 0 }}>{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: side-by-side layout
  return (
    <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#f8f5ef", paddingTop: 48, paddingBottom: 48, overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 48, alignItems: "stretch", width: "100%" }}>
        <div style={{ flexShrink: 0, width: "calc(max(96px, (100vw - 1200px) / 2 + 96px) + 340px)", paddingLeft: "max(96px, calc((100vw - 1200px) / 2 + 96px))", display: "flex", flexDirection: "column", gap: 48, paddingTop: 28, boxSizing: "border-box" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 20px", borderRadius: 40, border: "1px solid #e8e8e8", alignSelf: "flex-start" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d", whiteSpace: "nowrap" }}>Seen &amp; acknowledged</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 44, lineHeight: 1.24, color: "#000", margin: 0 }}>Finally, My Voice Reached!!</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "24px", color: "#686868", margin: 0 }}>Awards don't define my work. They confirm that someone is watching and believe it mattered.</p>
            </div>
          </div>
          {navButtons}
        </div>
        <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
          <div style={trackStyle}>
            {S4_LOOP.map((card, i) => (
              <div key={i} style={{ width: cardWidth, minHeight: 386, flexShrink: 0, borderRadius: 12, background: card.color, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24, boxSizing: "border-box", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)")}>
                <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 18, color: "#112d48", margin: "0 0 4px" }}>{card.label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "#686868", margin: 0 }}>{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section 5: Beyond Syllabus ────────────────────────────────────────────
const S5_ITEMS = [
  { id: "see",  label: "See • Hear • Read • Do",          body: "Every lesson becomes real when children first observe, listen, read, and then learn by doing.", sepWidth: 220 },
  { id: "hear", label: "Beyond Syllabus, Closer to Life", body: "Children step beyond textbooks into shops, streets, and spaces where learning meets the real world.", sepWidth: 177 },
  { id: "read", label: "Read the World",                  body: "Wrappers, signboards, labels, and surroundings become reading lessons when children learn to notice meaning everywhere.", sepWidth: 177 },
  { id: "do",   label: "Confidence Before Marks",         body: "When children feel seen, understood, and capable, learning begins to stay with them for life.", sepWidth: 0 },
];

function S5PlayIcon({ active }: { active: boolean }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
      background: active ? "#bf791d" : "#174067",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background 0.25s",
    }}>
      {/* white play triangle */}
      <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
        <path d="M1 1.2L10 6.5L1 11.8V1.2Z" fill="#fff" />
      </svg>
    </div>
  );
}

function Section5() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [activeId, setActiveId] = useState<string>("see");

  const hPad = isMobile ? 20 : isTablet ? 40 : 350;

  return (
    <div ref={sectionRef} className="fade-in-up" style={{
      width: "100%",
      minHeight: isMobile ? "auto" : 808,
      background: "#fff",
      position: "relative",
      overflow: "hidden",
      isolation: "isolate",
    }}>
      {/* Background image — full width, covers whole section */}
      <img src={imgS5Bg} alt="" aria-hidden style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Left white fade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #fff 0%, rgba(255,255,255,0.6) 14%, transparent 28%)", pointerEvents: "none", zIndex: 1 }} />
      {/* Right white fade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, #fff 0%, rgba(255,255,255,0.6) 14%, transparent 28%)", pointerEvents: "none", zIndex: 1 }} />
      {/* Top / bottom white fade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #fff 0%, transparent 10%, transparent 88%, #fff 100%)", pointerEvents: "none", zIndex: 2 }} />

      {/* Content */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 3,
        padding: isMobile ? "40px 20px 48px" : isTablet ? "48px 32px 60px" : undefined,
      }}>
        <div style={{ width: isMobile || isTablet ? "100%" : 1008, paddingTop: isMobile ? 0 : 56, paddingBottom: isMobile ? 0 : 80 }}>

          {/* Heading group */}
          <div style={{ paddingLeft: isMobile ? 0 : hPad, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Pill badge — indented another 164px in Figma */}
            <div style={{ paddingLeft: isMobile ? 0 : isTablet ? 0 : 164 }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 20px", borderRadius: 40, border: "1px solid #e8e8e8", background: "rgba(255,255,255,0.9)" }}>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>Glimpse of my teaching!</span>
              </div>
            </div>
            <div style={{ width: isMobile || isTablet ? "100%" : "auto", maxWidth: 657 }}>
              <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 26 : isTablet ? 30 : 36, lineHeight: 1.32, color: "#000", textTransform: "capitalize", margin: 0 }}>
                Creating Experiences That Live For Life. Beyond Syllabus, Closer To Life.
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div style={{ paddingLeft: isMobile ? 0 : hPad, paddingTop: isMobile ? 24 : 44 }}>
            <div style={{ width: isMobile || isTablet ? "100%" : "auto", maxWidth: 562, display: "flex", flexDirection: "column" }}>
              {S5_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <div key={item.id}>
                    {/* Row: icon + label */}
                    <button
                      onClick={() => setActiveId(item.id)}
                      style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", background: "none", border: "none", padding: "12px 0", cursor: "pointer", textAlign: "left" }}
                    >
                      <S5PlayIcon active={isActive} />
                      <span style={{
                        fontFamily: "'Rubik', sans-serif",
                        fontWeight: isActive ? 500 : 400,
                        fontSize: isActive ? 17 : 16,
                        lineHeight: "26px",
                        color: isActive ? "#bf791d" : "#000",
                        transition: "color 0.25s",
                      }}>
                        {item.label}
                      </span>
                    </button>

                    {/* Expanded body (active only) */}
                    <div className={`accordion-body${isActive ? " open" : ""}`}>
                      <div>
                        <div style={{ paddingLeft: isMobile ? 0 : 48, display: "flex", flexDirection: "column", gap: 20, paddingBottom: 8 }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 14 : 16, lineHeight: "25px", color: "#636363", margin: 0, maxWidth: isMobile ? "100%" : 459 }}>
                            {item.body}
                          </p>
                          <button className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: isMobile ? 10 : 20, background: "#bf791d", borderRadius: 30, height: 44, padding: "0 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: isMobile ? 14 : 16, whiteSpace: "nowrap", alignSelf: isMobile ? "stretch" : "flex-start", justifyContent: isMobile ? "center" : undefined }}>
                            Donate for Cause <ArrowIcon />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Separator line */}
                    {item.sepWidth > 0 && !isMobile && (
                      <div style={{ height: 1, width: item.sepWidth, background: "rgba(0,0,0,0.15)", margin: "4px 0 4px 0" }} />
                    )}
                    {isMobile && <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "4px 0" }} />}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Section6() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [activeTab, setActiveTab] = useState("teachers");
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 5000;
  const activeData = S6_DATA[activeTab];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = (elapsed / duration) * 100;
      if (currentProgress >= 100) {
        setSlideIndex((prev) => (prev + 1) % activeData.length);
        setProgress(0);
        clearInterval(interval);
      } else {
        setProgress(currentProgress);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [slideIndex, activeTab, activeData.length]);

  const handleNext = () => { setSlideIndex((prev) => (prev + 1) % activeData.length); setProgress(0); };
  const handlePrev = () => { setSlideIndex((prev) => (prev - 1 + activeData.length) % activeData.length); setProgress(0); };
  const currentSlide = activeData[slideIndex];

  return (
    <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0" : "100px 0", isolation: "isolate" }}>
      <div style={{ maxWidth: 1006, margin: "0 auto", padding: isMobile ? "0 20px" : isTablet ? "0 32px" : "0" }}>
        {/* Top Header Row */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", marginBottom: isMobile ? 24 : 48, gap: isMobile ? 8 : 0 }}>
          <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 26 : 40, color: "#000", margin: 0, textTransform: "capitalize" }}>
            When education impacts lives…
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 14 : 16, lineHeight: "22px", color: "#686868", margin: 0, width: isMobile ? "100%" : 206, textAlign: isMobile ? "left" : "right" }}>
            Their voices inspire me.
          </p>
        </div>

        {/* Navigation & Tabs Row */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: isMobile ? "flex-start" : "space-between", alignItems: isMobile ? "flex-start" : "center", marginBottom: isMobile ? 16 : 24, gap: isMobile ? 16 : 0 }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {S6_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSlideIndex(0); setProgress(0); }} style={{
                  padding: isMobile ? "5px 16px" : "6px 24px", borderRadius: 40,
                  border: isActive ? "none" : "1px solid #e8e8e8",
                  background: isActive ? "#bf791d" : "#fff",
                  color: isActive ? "#fff" : "#bf791d",
                  fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 12 : 13, cursor: "pointer", transition: "all 0.3s"
                }}>{tab.label}</button>
              );
            })}
          </div>

          {/* Progress & Nav Arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 16 : 28 }}>
            {!isMobile && (
              <div style={{ width: 233, height: 1, background: "#e8e8e8", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress}%`, background: "#bf791d", transition: progress === 0 ? "none" : "width 50ms linear" }} />
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              {[{ onClick: handlePrev, path: "M11 4L6 9L11 14" }, { onClick: handleNext, path: "M7 4L12 9L7 14" }].map(({ onClick, path }, i) => (
                <button key={i} onClick={onClick}
                  onMouseEnter={e => { e.currentTarget.style.background = "#174067"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#174067"; }}
                  style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #174067", background: "transparent", color: "#174067", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.18s ease, color 0.18s ease" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div style={{
          width: "100%", minHeight: isMobile ? "auto" : 300,
          borderRadius: 20, background: "linear-gradient(-52.65deg, #BF791D 0.4%, #885615 99.6%)",
          display: "flex", flexDirection: isMobile ? "column" : "row",
          overflow: "hidden", border: "1px solid #895615"
        }}>
          {/* Content */}
          <div style={{ flex: 1, padding: isMobile ? "24px" : "36px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: isMobile ? 12 : 20 }}>
            <IconQuote />
            <div style={{ display: "flex", flexDirection: "column", gap: 6, color: "#fff" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: isMobile ? 17 : 20, margin: 0 }}>{currentSlide.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 14 : 16, lineHeight: "26px", margin: 0, opacity: 0.9 }}>{currentSlide.body}</p>
            </div>
          </div>

          {/* Right Image — hide on mobile */}
          {!isMobile && (
            <div style={{ width: isTablet ? 280 : 475, position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(99.12deg, #A26719 3.4%, rgba(161, 102, 25, 0) 96.6%)" }} />
              <div style={{ position: "absolute", left: 0, top: 0, width: "176px", height: "100%", zIndex: 2, background: "linear-gradient(93.41deg, #A26719 3.4%, rgba(161, 102, 25, 0) 96.6%)" }} />
              <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 0 }}>
                <img src={imgS6Bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(0.5px)" }} />
                <img src={currentSlide.photo} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", zIndex: 1 }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ── Section 7 — CTA Banner (Figma 276:1757) ─────────────────────────────

function Section7() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const ArrowIcon = ({ color = "#bf791d" }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 15L15 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 5H15V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{
      width: "100%", background: "#ffffff",
      padding: isMobile ? "48px 20px 60px" : isTablet ? "60px 32px 80px" : "80px 0 100px",
      boxSizing: "border-box",
    }}>
      <div style={{
        maxWidth: 1006, margin: "0 auto",
        display: "flex", flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "flex-end",
        justifyContent: "space-between",
        gap: isMobile ? 32 : 24,
      }}>
        {/* Left — Large Heading */}
        <h2 style={{
          fontFamily: "'Lora', serif", fontWeight: 600,
          fontSize: isMobile ? 28 : isTablet ? 36 : 48,
          lineHeight: 1.28, color: "#000", margin: 0,
          maxWidth: isMobile ? "100%" : 651,
          textTransform: "capitalize",
        }}>
          I can teach many children, but creating a lasting impact for Ujjwal Bharat demands a larger mission.
        </h2>

        {/* Right — Subtext + Buttons */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: isMobile ? "stretch" : "flex-end",
          gap: isMobile ? 20 : 40, flexShrink: 0,
          width: isMobile ? "100%" : undefined,
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: isMobile ? 14 : 16, lineHeight: "22px", color: "#686868",
            textAlign: isMobile ? "left" : "right",
            width: isMobile ? "100%" : 302, margin: 0,
          }}>
            This larger mission needs all of us to unite. Teachers, students, parents, and society.
          </p>

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, width: isMobile ? "100%" : undefined }}>
            <Link to="/join" 
              className="btn-ujjwala-hover" 
              onMouseEnter={e => { e.currentTarget.style.setProperty("background", "#F9F2E8", "important"); }}
              onMouseLeave={e => { e.currentTarget.style.setProperty("background", "transparent", "important"); }}
              style={{
              display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : undefined,
              gap: 12, padding: "12px 24px", borderRadius: 30,
              border: "1px solid #bf791d", background: "transparent",
              textDecoration: "none", cursor: "pointer",
              transition: "background 0.18s ease",
            }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: isMobile ? 15 : 16, color: "#bf791d", whiteSpace: "nowrap", pointerEvents: "none" }}>Join Ujjwala's Mission</span>
              <div style={{ pointerEvents: "none" }}><ArrowIcon color="#bf791d" /></div>
            </Link>

            <Link to="/donate" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 12, padding: "12px 24px", borderRadius: 30,
              background: "#bf791d", border: "none",
              textDecoration: "none", cursor: "pointer", flex: isMobile ? undefined : 1,
            }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: isMobile ? 15 : 16, color: "#fff", whiteSpace: "nowrap" }}>Donate Now</span>
              <ArrowIcon color="#fff" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section 8 — Sticky Card Stack (Figma 329:357) ────────────────────────
// @ts-ignore
import imgS8Teacher from "@/assets/fb67f8b019282de8f29678da8c918384c128715b.png";
// @ts-ignore
import imgS9IntroBg from "@/assets/s9_intro_bg.png";
// @ts-ignore
import imgS9TeacherOverlay from "@/assets/s9_teacher_overlay.png";

// Section 10 — Get Involved, In Detail
// @ts-ignore
import imgS10TeacherRmBg from "@/assets/s10_teacher_removebg.png";
// @ts-ignore
import imgS10Classroom from "@/assets/s10_card_bg_classroom.jpg";

// Section 16 — Our Channels
// @ts-ignore
import imgS16Youtube from "@/assets/s16_img_youtube.png";
// @ts-ignore
import imgS16Instagram from "@/assets/s16_img_instagram.png";

// Section 15 — Team
// @ts-ignore
import imgS15PhotoKalpesh from "@/assets/s15_photo_kalpesh.png";
// @ts-ignore
import imgS15PhotoUrvi from "@/assets/s15_photo_urvi.png";
// @ts-ignore
import imgS15PhotoKalpesh2 from "@/assets/s15_photo_kalpesh2.png";

// Section 13 — Hero CTA banner
// @ts-ignore
import imgS13Bg from "@/assets/s13_bg.png";
// @ts-ignore
import imgS13Teacher from "@/assets/s13_teacher.png";

// Section 14 — About teacher & org
// @ts-ignore
import imgS14Teacher from "@/assets/s14_teacher.png";
// @ts-ignore
import imgS14PatternA from "@/assets/s14_pattern_a.svg";
// @ts-ignore
import imgS14PatternB from "@/assets/s14_pattern_b.svg";

/* ── OLD Section 8 data (backed up) ────────────────────────────────────────
type S8Card = {
  id: string;
  tabIndex: number;
  programName: string;
  title: string;
  desc: string;
  bullets: string[];
  photo: string;
};

const SECTION_8_TABS = ["Ujjwal Sanvaad", "Shikshak Unnati", "Unhali Shala", "ShikshanSaath", "Shala Abhiyan"];

const S8_PHOTOS = [imgS8Teacher, imgTeacher, imgCarousel1];

const S8_CARDS_DATA = [
  {
    programName: "उज्ज्वल संवाद",
    title: "Ujjwal Sanvaad",
    desc: "An open, heartfelt space where Ujjwala listens to real struggles, and people come together to rethink education with honesty.",
    bullets: ["Hear real pain from teachers and parents", "Bring local education problems into the room", "Openly discuss what children truly need", "Turn concern into community-led next steps"],
  },
  {
    programName: "शिक्षक उन्नती मंच",
    title: "Shikshak Unnati Manch",
    desc: "A learning space where teachers rediscover purpose, learn practical methods, and grow into the kind of educators children remember.",
    bullets: ["Train teachers beyond textbook-led teaching", "Demonstrate Ujjwala's real classroom methods", "Help teachers build confidence and clarity", "Grow more life-shaping teachers across schools"],
  },
  {
    programName: "उज्ज्वल उन्हाळी शाळा",
    title: "Ujjwal Unhali Shala",
    desc: "A free summer experience where children learn through joy, curiosity, action, and real life instead of routine and pressure.",
    bullets: ["Group-wise learning for every age band", "Explore life through play and projects", "Meet people, places, and real professions", "Build curiosity, confidence, and expression"],
  },
  {
    programName: "उज्ज्वल शिक्षणसाथ",
    title: "Ujjwal ShikshanSaath",
    desc: "A caring support journey for bright children whose learning begins to break under the weight of money, need, and circumstance.",
    bullets: ["Support books, travel, tools, and access", "Protect learning from financial hardship", "Help bright children stay in school", "Restore continuity, dignity, and hope"],
  },
  {
    programName: "उज्ज्वल शाळा अभियान",
    title: "Ujjwal Shala Abhiyan",
    desc: "A shared school-strengthening journey where people come together to rebuild learning spaces with care, resources, guidance, and dignity.",
    bullets: ["Strengthen one school in meaningful ways", "Improve resources, learning spaces, and support", "Bring mentors, volunteers, and community together", "Help children return with pride and hope"],
  },
];

const SECTION_8_CARDS: S8Card[] = S8_CARDS_DATA.map((data, i) => ({
  id: `s8-card-${i}`,
  tabIndex: i,
  photo: S8_PHOTOS[i % S8_PHOTOS.length],
  ...data,
}));
── END OLD Section 8 data ─────────────────────────────────────────────── */

// ── Section 8 data (NEW — 5 tabs, 1 card each, scroll stack) ─────────────
const S8_PROGRAMS = [
  {
    id: "s8-0",
    tab: "Ujjwal Sanvaad",
    hindi: "उज्ज्वल संवाद",
    english: "Ujjwal Sanvaad",
    desc: "An open, heartfelt space where Ujjwala listens to real struggles, and people come together to rethink education with honesty.",
    bullets: [
      "Hear real pain from teachers and parents",
      "Bring local education problems into the room",
      "Openly discuss what children truly need",
      "Turn concern into community-led next steps",
    ],
    punchline: "When people finally sit together and speak honestly, education stops feeling helpless and starts feeling possible.",
    cta: "Join Ujjwal Sanvaad",
    photo: imgS8Teacher,
  },
  {
    id: "s8-1",
    tab: "Shikshak Unnati",
    hindi: "शिक्षक उन्नती मंच",
    english: "Shikshak Unnati Manch",
    desc: "A learning space where teachers rediscover purpose, learn practical methods, and grow into the kind of educators children remember.",
    bullets: [
      "Train teachers beyond textbook-led teaching",
      "Demonstrate Ujjwala's real classroom methods",
      "Help teachers build confidence and clarity",
      "Grow more life-shaping teachers across schools",
    ],
    punchline: "When one teacher changes the way they teach, hundreds of children begin learning differently.",
    cta: "Grow With Ujjwala",
    photo: imgTeacher,
  },
  {
    id: "s8-2",
    tab: "Unhali Shala",
    hindi: "उज्ज्वल उन्हाळी शाळा",
    english: "Ujjwal Unhali Shala",
    desc: "A free summer experience where children learn through joy, curiosity, action, and real life instead of routine and pressure.",
    bullets: [
      "Group-wise learning for every age band",
      "Explore life through play and projects",
      "Meet people, places, and real professions",
      "Build curiosity, confidence, and expression",
    ],
    punchline: "Sometimes one meaningful summer can awaken the kind of learning school alone could not.",
    cta: "Enroll A Child",
    photo: imgCarousel1,
  },
  {
    id: "s8-3",
    tab: "ShikshanSaath",
    hindi: "उज्ज्वल शिक्षणसाथ",
    english: "Ujjwal ShikshanSaath",
    desc: "A caring support journey for bright children whose learning begins to break under the weight of money, need, and circumstance.",
    bullets: [
      "Support books, travel, tools, and access",
      "Protect learning from financial hardship",
      "Help bright children stay in school",
      "Restore continuity, dignity, and hope",
    ],
    punchline: "A child should never lose education simply because life at home became heavier than learning.",
    cta: "Support A Child",
    photo: imgS8Teacher,
  },
  {
    id: "s8-4",
    tab: "Shala Abhiyan",
    hindi: "उज्ज्वल शाळा अभियान",
    english: "Ujjwal Shala Abhiyan",
    desc: "A shared school-strengthening journey where people come together to rebuild learning spaces with care, resources, guidance, and dignity.",
    bullets: [
      "Strengthen one school in meaningful ways",
      "Improve resources, learning spaces, and support",
      "Bring mentors, volunteers, and community together",
      "Help children return with pride and hope",
    ],
    punchline: "A school changes deeply when it stops waiting for help and starts receiving the strength of a whole community.",
    cta: "Strengthen A School",
    photo: imgTeacher,
  },
];

// ── IntroNGOSection (Figma 773:754) ──────────────────────────────────────
function IntroNGOSection() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Dot-matrix decoration for Mission card (replaces the 600+ Figma vectors)
  const DotGrid = () => (
    <svg
      width="220" height="220" viewBox="0 0 220 220" fill="none"
      style={{ position: "absolute", top: -40, right: -16, opacity: 0.13, pointerEvents: "none", zIndex: 0 }}
    >
      {Array.from({ length: 13 }).map((_, row) =>
        Array.from({ length: 13 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 18 + 9} cy={row * 18 + 9} r="3.2" fill="#5C3D11" />
        ))
      )}
    </svg>
  );

  if (isMobile || isTablet) {
    return (
      <section style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 20px 0" : "60px 32px 0", boxSizing: "border-box" }}>
        <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 26 : 32, lineHeight: 1.3, color: "#000", textAlign: "center", margin: "0 0 32px" }}>
          Introducing,<br />Shiksha Raj, Ujjwal Bharat Foundation
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {/* Vision */}
          <div style={{ background: "#f8f5ef", borderRadius: 20, border: "1px solid #ebd5b9", padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: isMobile ? 40 : 48, lineHeight: 1, background: "linear-gradient(to bottom, #d68a09 0%, #f8f5ef 75%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Vision</span>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#000", margin: 0 }}>
              To build education leadership (Shiksha Raj) for a Brighter India (Ujjwal Bharat) where every child receives free, accessible education that shapes confidence, capability, and character.
            </p>
          </div>
          {/* Mission */}
          <div style={{ background: "linear-gradient(-21deg, #f8f5ef 41%, #fff 106%)", borderRadius: 20, border: "1px solid #ebd5b9", padding: "28px 24px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
            <DotGrid />
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: isMobile ? 44 : 52, lineHeight: 1, textAlign: "right", position: "relative", zIndex: 1, background: "linear-gradient(to bottom, #d68a09 0%, #f8f5ef 75%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mission</span>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#000", margin: 0, textAlign: "right", position: "relative", zIndex: 1 }}>
              To transform education into a practical, experiential, life-connected, digitally ready, teacher-led, community-supported system that goes beyond textbooks to give every child free, meaningful learning and prepare them for life.
            </p>
          </div>
        </div>
        {/* Background image strip at bottom */}
        <div style={{ width: "100%", height: 200, borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
          <img src={imgS9IntroBg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
      </section>
    );
  }

  // ── DESKTOP — pixel-perfect from Figma node 773:754 ──
  // Section: 1200×954. Background card starts at y=443 (h=511). Content frame 1008px centered.
  // Cards group 1008×405: Vision (588×250 at left=0,top=0), Mission (751×334 at left=257,top=71).
  return (
    <section style={{ width: "100%", background: "#fff", position: "relative", height: 954, overflow: "hidden" }}>

      {/* Layer 1 (back) — background image card */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 443, height: 511,
        borderRadius: 20,
        border: "1px solid #ebd5b9",
        boxShadow: "0 4px 6px rgba(5,23,42,0.7)",
        overflow: "hidden",
      }}>
        <img src={imgS9IntroBg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.55) 35%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.75) 0%, transparent 40%)", pointerEvents: "none" }} />
      </div>

      {/* Layer 2 — teacher photo overlay (removebg PNG, 912×350) */}
      <img
        src={imgS9TeacherOverlay}
        alt="Ujjwala Wadekar"
        style={{
          position: "absolute", left: 0, bottom: 0,
          width: "76%", height: 350,
          objectFit: "cover", objectPosition: "top center",
          borderBottomLeftRadius: 20,
          zIndex: 1, pointerEvents: "none",
        }}
      />

      {/* Layer 3 (front) — content: title + two overlapping cards */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 1008, zIndex: 2,
        display: "flex", flexDirection: "column",
        gap: 52, paddingTop: 60, boxSizing: "border-box",
      }}>
        {/* Title: Lora 600 40px centered */}
        <h2 style={{
          fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 40,
          lineHeight: 1.3, color: "#000", textAlign: "center", margin: 0,
        }}>
          Introducing,<br />Shiksha Raj, Ujjwal Bharat Foundation
        </h2>

        {/* Cards group — 1008×405, absolute children */}
        <div style={{ position: "relative", height: 405, width: "100%" }}>

          {/* Vision card — 588×250, left=0, top=0, z=1 */}
          <div style={{
            position: "absolute", left: 0, top: 0,
            width: 588, height: 250,
            background: "#f8f5ef", borderRadius: 20,
            border: "1px solid #ebd5b9",
            padding: "36px 40px", boxSizing: "border-box",
            display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 16,
            zIndex: 1,
          }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 56, lineHeight: 1,
              background: "linear-gradient(to bottom, #d68a09 0%, #f8f5ef 75%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Vision
            </span>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "22px", color: "#000", margin: 0 }}>
              To build education leadership (Shiksha Raj) for a Brighter India (Ujjwal Bharat) where every child receives free, accessible education that shapes confidence, capability, and character.
            </p>
          </div>

          {/* Mission card — 751×334, left=257, top=71, overlaps Vision, z=2 */}
          <div style={{
            position: "absolute", left: 257, top: 71,
            width: 751, height: 334,
            background: "linear-gradient(-21deg, #f8f5ef 41%, #ffffff 106%)",
            borderRadius: 20,
            border: "1px solid #ebd5b9",
            padding: "100px 40px 44px 68px", boxSizing: "border-box",
            display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", gap: 16,
            zIndex: 2, overflow: "hidden",
          }}>
            <DotGrid />
            <span style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 64, lineHeight: 1,
              alignSelf: "flex-end", position: "relative", zIndex: 1,
              background: "linear-gradient(to bottom, #d68a09 0%, #f8f5ef 75%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Mission
            </span>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "22px", color: "#000", margin: 0, textAlign: "right", position: "relative", zIndex: 1 }}>
              To transform education into a practical, experiential, life-connected, digitally ready, teacher-led, community-supported system that goes beyond textbooks to give every child free, meaningful learning and prepare them for life.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

function Section8() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  // Lock scroll-listener while a tab-click navigation is animating
  const isTabNavRef = useRef(false);
  const tabNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const TOTAL = S8_PROGRAMS.length; // 5
  const STEP = 350; // px of scroll per card advance
  const RUNWAY = TOTAL * STEP;

  // Card dimensions — extra 60px at TOP so stacked edges peek above active card
  const CARD_H = 460;
  const PEEK_TOP = 60; // space above active card for peeking stack tops
  const CONTAINER_H = CARD_H + PEEK_TOP;

  // Stack transform per depth — cards peek from the TOP of the active card
  // translateY(-N) shifts each past card UP so its top edge is visible above the active card
  // scaleX narrows slightly to give a perspective / depth illusion
  // blur increases with depth
  const getStackStyle = (depth: number): React.CSSProperties => {
    const ty = -(depth + 1) * 13;   // shift UP: deeper = higher above active card top
    const sx = 1 - (depth + 1) * 0.025;
    const blur = (depth + 1) * 2;   // px of blur per depth level
    return {
      transform: `translateY(${ty}px) scaleX(${sx})`,
      transformOrigin: "top center",
      filter: `blur(${blur}px)`,
      zIndex: 9 - depth,
      opacity: Math.max(0.4, 1 - (depth + 1) * 0.15),
    };
  };

  // Scroll-driven active index (1 step per card) — skipped during tab-click navigation
  useEffect(() => {
    if (isMobile || isTablet) return;
    const onScroll = () => {
      if (isTabNavRef.current) return; // ignore during tab-click smooth scroll
      if (!wrapperRef.current) return;
      const scrolled = Math.max(0, -wrapperRef.current.getBoundingClientRect().top);
      setActiveIdx(Math.min(Math.floor(scrolled / STEP), TOTAL - 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, isTablet, TOTAL, STEP]);

  const handleTabClick = (idx: number) => {
    if (isMobile || isTablet) { setActiveIdx(idx); return; }
    // Immediately show the clicked card — no waiting for scroll to catch up
    setActiveIdx(idx);
    // Lock scroll listener so intermediate scroll positions don't fight the click
    isTabNavRef.current = true;
    if (tabNavTimerRef.current) clearTimeout(tabNavTimerRef.current);
    // Compute fresh scroll target (avoids stale wrapperAbsTopRef)
    if (wrapperRef.current) {
      const freshTop = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: freshTop + idx * STEP, behavior: "smooth" });
    }
    // Re-enable scroll tracking after smooth scroll finishes (~600ms)
    tabNavTimerRef.current = setTimeout(() => { isTabNavRef.current = false; }, 700);
  };

  const S8Arrow = ({ color = "#174067" }: { color?: string }) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2.91 7H11.08" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 2.91L11.08 7L7 11.08" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // ── Mobile / Tablet ──────────────────────────────────────────────────────
  if (isMobile || isTablet) {
    const prog = S8_PROGRAMS[activeIdx];
    return (
      <div style={{ width: "100%", background: "#fff", padding: isMobile ? "40px 20px 48px" : "48px 32px 60px", boxSizing: "border-box" }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 26 : 34, lineHeight: 1.28, color: "#000", margin: 0 }}>What the Trust Builds Ground</h2>
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 40, padding: "5px 16px", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#bf791d" }}>On the Ground</span>
            </div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#686868", margin: 0 }}>
            Five programmes built from 31 years of classroom truth — each one addresses a real need.
          </p>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {S8_PROGRAMS.map((p, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button key={idx} onClick={() => handleTabClick(idx)} style={{
                background: isActive ? "#174067" : "transparent", border: "1px solid #174067", borderRadius: 40,
                padding: "7px 18px", color: isActive ? "#fff" : "#174067",
                fontFamily: "'Poppins', sans-serif", fontSize: 13, cursor: "pointer",
              }}>{p.tab}</button>
            );
          })}
        </div>
        {/* Card */}
        <div style={{ background: "#f8f5ef", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(5,23,42,0.08)" }}>
          <div style={{ height: 180, overflow: "hidden" }}>
            <img src={prog.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "20px" }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, color: "#bf791d", margin: "0 0 2px" }}>{prog.hindi}</p>
            <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 18, color: "#000", margin: "0 0 10px" }}>{prog.english}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "24px", color: "#636363", margin: "0 0 12px" }}>{prog.desc}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              {prog.bullets.map((b, bi) => (
                <li key={bi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <S8Arrow /><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "#636363" }}>{b}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", fontWeight: 300, fontSize: 13, lineHeight: "22px", color: "#8a6a2a", margin: "0 0 16px" }}>{prog.punchline}</p>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#bf791d", borderRadius: 30, padding: "10px 24px", border: "none", cursor: "pointer" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>{prog.cta}</span>
              <S8Arrow color="#fff" />
            </button>
          </div>
        </div>
        {/* Prev / Next */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <button onClick={() => setActiveIdx(i => Math.max(0, i - 1))} disabled={activeIdx === 0}
            style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #174067", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: activeIdx === 0 ? "not-allowed" : "pointer", opacity: activeIdx === 0 ? 0.4 : 1 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="#174067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#686868" }}>{activeIdx + 1} / {TOTAL}</span>
          <button onClick={() => setActiveIdx(i => Math.min(TOTAL - 1, i + 1))} disabled={activeIdx === TOTAL - 1}
            style={{ width: 40, height: 40, borderRadius: "50%", background: "#174067", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: activeIdx === TOTAL - 1 ? "not-allowed" : "pointer", opacity: activeIdx === TOTAL - 1 ? 0.4 : 1 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    );
  }

  // ── Desktop: sticky scroll-driven card stack ─────────────────────────────
  return (
    <div ref={wrapperRef} style={{ position: "relative", height: `calc(100vh + ${RUNWAY}px)` }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", background: "#fff", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 1008, display: "flex", flexDirection: "column", gap: 48 }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 634 }}>
              <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 40, lineHeight: "54.4px", color: "#000", margin: 0, textTransform: "capitalize" }}>
                What the Trust Builds Ground
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "22px", color: "#686868", margin: 0 }}>
                Five programmes built from 31 years of classroom truth — each one addresses a real need.
              </p>
            </div>
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>On the Ground</span>
            </div>
          </div>

          {/* Body: tabs + card stack */}
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>

            {/* Left: programme tabs */}
            <div style={{ width: 212, display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
              {S8_PROGRAMS.map((p, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button key={idx} onClick={() => handleTabClick(idx)} style={{
                    background: isActive ? "#174067" : "transparent",
                    border: "1px solid #174067", borderRadius: 40,
                    padding: "10px 24px", width: "100%", textAlign: "center",
                    color: isActive ? "#fff" : "#174067",
                    fontFamily: "'Poppins', sans-serif", fontWeight: isActive ? 500 : 400, fontSize: 15,
                    cursor: "pointer", transition: "background 0.25s, color 0.25s", outline: "none",
                  }}>{p.tab}</button>
                );
              })}
            </div>

            {/* Right: card stack — all 5 cards in DOM, past ones peek from the TOP */}
            <div style={{ flex: 1, position: "relative", height: CONTAINER_H }}>
              {S8_PROGRAMS.map((prog, idx) => {
                const isActive = idx === activeIdx;
                const isPast   = idx < activeIdx;
                const isFuture = idx > activeIdx;
                const depth    = isPast ? activeIdx - idx - 1 : -1;

                const stackStyle = isPast ? getStackStyle(depth) : {};
                const zIndex     = isActive ? 10 : isPast ? (9 - depth) : 0;
                const opacity    = isFuture ? 0 : (isPast ? (stackStyle as React.CSSProperties).opacity : 1);
                const transform  = isPast
                  ? (stackStyle as React.CSSProperties).transform as string
                  : "translateY(0px) scaleX(1)";
                const filterVal  = isPast ? (stackStyle as React.CSSProperties).filter as string : "none";

                return (
                  <div
                    key={prog.id}
                    style={{
                      position: "absolute",
                      // All cards sit at PEEK_TOP offset so there's room above for stack tops to show
                      top: PEEK_TOP, left: 0, right: 0,
                      height: CARD_H,
                      background: "#f8f5ef",
                      borderRadius: 20,
                      overflow: "hidden",
                      zIndex,
                      opacity: opacity as number,
                      transform,
                      transformOrigin: "top center",
                      filter: filterVal,
                      boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.10)" : "0 2px 8px rgba(0,0,0,0.06)",
                      pointerEvents: isActive ? "auto" : "none",
                      transition: [
                        "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
                        "filter 0.35s ease",
                        "opacity 0.35s ease",
                        "box-shadow 0.35s ease",
                      ].join(", "),
                    }}
                  >
                    <div style={{ display: "flex", height: "100%", boxSizing: "border-box" }}>
                      {/* Left content */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", padding: "28px 32px", boxSizing: "border-box", minWidth: 0 }}>
                        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, color: "#bf791d", margin: 0 }}>{prog.hindi}</p>
                        <h3 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 24, lineHeight: 1.28, color: "#000", margin: 0 }}>{prog.english}</h3>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "24px", color: "#636363", margin: 0 }}>{prog.desc}</p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5 }}>
                          {prog.bullets.map((b, bi) => (
                            <li key={bi} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <S8Arrow />
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "#636363" }}>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", fontWeight: 300, fontSize: 13, lineHeight: "22px", color: "#8a6a2a", margin: 0 }}>{prog.punchline}</p>
                        <button style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#bf791d", border: "none", borderRadius: 30, padding: "10px 24px", cursor: "pointer", alignSelf: "flex-start" }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>{prog.cta}</span>
                          <S8Arrow color="#fff" />
                        </button>
                      </div>
                      {/* Right photo */}
                      <div style={{ width: 260, flexShrink: 0, overflow: "hidden", position: "relative", background: "#ddd4c7" }}>
                        <img src={prog.photo} alt={prog.english} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>{/* end card stack */}

          </div>{/* end body */}
        </div>
      </div>
    </div>
  );
}

// ── Section 9 — What Progress Looks Like ─────────────────────────────────
const S9_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

type S9Card = {
  id: string;
  type: "video" | "content";
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  thumbnail: string;
};

const SECTION_9_CARDS: S9Card[] = [
  {
    id: "s9-0", type: "content",
    tag: "They stop feeling small inside.",
    title: "Children Return With Confidence Again",
    desc: "Meaningful learning helps children speak, try, ask, and see themselves with pride.",
    bullets: ["Stronger classroom participation", "Steadier school attendance", "More confident speaking", "Greater willingness to try"],
    thumbnail: imgS8Teacher,
  },
  {
    id: "s9-1", type: "content",
    tag: "Lessons finally meet real life.",
    title: "Learning Starts Making Sense In Life",
    desc: "Children begin connecting words, numbers, and ideas with the world they actually live in.",
    bullets: ["Real-world understanding grows", "Projects show deeper learning", "Concepts connect with daily life", "Fear of textbooks reduces"],
    thumbnail: imgTeacher,
  },
  {
    id: "s9-2", type: "content",
    tag: "Classrooms feel human and alive.",
    title: "Teaching Begins To Feel Alive",
    desc: "Teaching moves beyond rote delivery and becomes practical, engaging, responsive, and full of meaning.",
    bullets: ["More active classrooms", "Practical methods replace routine", "Teachers lead with confidence", "Children participate more freely"],
    thumbnail: imgCarousel1,
  },
  {
    id: "s9-3", type: "content",
    tag: "Home stops pulling learning apart.",
    title: "Families Start Believing In School Again",
    desc: "Parents feel included, trusted, and better able to support children without fear or pressure.",
    bullets: ["Stronger parent-school trust", "More regular school attendance", "Less pressure at home", "Children feel supported both sides"],
    thumbnail: imgS8Teacher,
  },
  {
    id: "s9-4", type: "content",
    tag: "Children want to come back.",
    title: "Schools Become Places Of Pride",
    desc: "Schools feel more alive, respected, and worth returning to for children and families.",
    bullets: ["Improved attendance and retention", "More joyful school spaces", "Stronger school-community bond", "Learning feels meaningful"],
    thumbnail: imgTeacher,
  },
  {
    id: "s9-5", type: "content",
    tag: "One classroom begins changing many.",
    title: "One Teacher's Work Starts Travelling",
    desc: "What worked for one teacher begins reaching more classrooms, schools, communities, and children.",
    bullets: ["Teacher models travel further", "Programmes reach new places", "Communities carry the mission", "Support grows with trust"],
    thumbnail: imgCarousel1,
  },
];

// ── Section 9 icons ───────────────────────────────────────────────────────
const S9PlayIcon = ({ color = "#fff" }: { color?: string }) => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
    <path d="M1 1.5L13 8L1 14.5V1.5Z" fill={color} />
  </svg>
);
const S9PauseIcon = ({ color = "#fff" }: { color?: string }) => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
    <rect x="1" y="1" width="4" height="14" rx="1.5" fill={color} />
    <rect x="9" y="1" width="4" height="14" rx="1.5" fill={color} />
  </svg>
);
const S9FullscreenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 5.5V1.5H5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 1.5H15V5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 10.5V14.5H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 14.5H1V10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const S9NetworkIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="7" r="4" stroke="#bf791d" strokeWidth="1.5" fill="none"/>
    <circle cx="7"  cy="30" r="4" stroke="#bf791d" strokeWidth="1.5" fill="none"/>
    <circle cx="33" cy="30" r="4" stroke="#bf791d" strokeWidth="1.5" fill="none"/>
    <line x1="20" y1="11" x2="8"  y2="26" stroke="#bf791d" strokeWidth="1.5"/>
    <line x1="20" y1="11" x2="32" y2="26" stroke="#bf791d" strokeWidth="1.5"/>
    <line x1="11" y1="30" x2="29" y2="30" stroke="#bf791d" strokeWidth="1.5"/>
  </svg>
);
const S9ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
    <path d="M2.91 7H11.08" stroke="#174067" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 2.91L11.08 7L7 11.08" stroke="#174067" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Video Card (card 0) ───────────────────────────────────────────────────
function VideoCard9({ card, width, height }: { card: S9Card; width: number; height: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress]   = useState(0);

  const R    = 20;
  const CIRC = 2 * Math.PI * R;

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ width, height, borderRadius: 20, flexShrink: 0, position: "relative", overflow: "hidden", boxShadow: "0px 4px 6px rgba(5,23,42,0.25)" }}>
      {/* Thumbnail — hidden when playing */}
      <img src={card.thumbnail} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: isPlaying ? 0 : 1, transition: "opacity 0.4s ease" }} />

      {/* Video */}
      <video
        ref={videoRef}
        src={S9_VIDEO}
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (v?.duration) setProgress(v.currentTime / v.duration);
        }}
        onEnded={() => { setIsPlaying(false); setProgress(0); }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: isPlaying ? 1 : 0, transition: "opacity 0.4s ease" }}
        playsInline
      />

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)", pointerEvents: "none" }} />

      {/* Bottom controls row */}
      <div style={{ position: "absolute", bottom: 28, left: 28, right: 28, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>

        {/* Play/pause + ring */}
        <div
          style={{ position: "relative", width: 48, height: 48, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={togglePlay}
        >
          <svg width="52" height="52" style={{ position: "absolute", top: -2, left: -2, pointerEvents: "none" }}>
            <circle cx="26" cy="26" r={R} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5"/>
            <circle
              cx="26" cy="26" r={R} fill="none" stroke="#fff" strokeWidth="2.5"
              strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)}
              strokeLinecap="round" transform="rotate(-90 26 26)"
              style={{ transition: "stroke-dashoffset 0.15s linear" }}
            />
          </svg>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#bf791d", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {isPlaying ? <S9PauseIcon /> : <S9PlayIcon />}
          </div>
        </div>

        {/* Fullscreen (visible when playing) */}
        <button
          onClick={() => videoRef.current?.requestFullscreen?.()}
          style={{ opacity: isPlaying ? 1 : 0, pointerEvents: isPlaying ? "auto" : "none", transition: "opacity 0.2s", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}
        >
          <S9FullscreenIcon />
        </button>
      </div>
    </div>
  );
}

// ── Content Card ──────────────────────────────────────────────────────────
function ContentCard9({ card, width, height }: { card: S9Card; width: number; height: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress]   = useState(0);

  const R    = 20;
  const CIRC = 2 * Math.PI * R;

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ width, height, borderRadius: 20, flexShrink: 0, position: "relative", overflow: "hidden", background: "#fff", border: "1px solid #ebd5b9" }}>

      {/* Top amber banner — hidden when video plays */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "#f9f2e8", padding: "8px 20px", borderRadius: "20px 20px 0 0", zIndex: 2, opacity: isPlaying ? 0 : 1, transition: "opacity 0.3s ease", pointerEvents: isPlaying ? "none" : "auto" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "#bf791d", lineHeight: "22px" }}>
          {card.tag}
        </span>
      </div>

      {/* Card content — fades out when video plays */}
      <div style={{
        position: "absolute", inset: 0,
        padding: "72px 28px 28px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        opacity: isPlaying ? 0 : 1,
        transition: "opacity 0.3s ease",
        pointerEvents: isPlaying ? "none" : "auto",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <S9NetworkIcon />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <strong style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 18, color: "#000", lineHeight: "28px" }}>
              {card.title}
            </strong>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, color: "#636363", lineHeight: "22px", margin: 0 }}>
              {card.desc}
            </p>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {card.bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <S9ArrowIcon />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, color: "#636363" }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Spacer pushes the play button area to bottom */}
        <div style={{ height: 52 }} />
      </div>

      {/* Video fills card when playing */}
      <video
        ref={videoRef}
        src={S9_VIDEO}
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (v?.duration) setProgress(v.currentTime / v.duration);
        }}
        onEnded={() => { setIsPlaying(false); setProgress(0); }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: isPlaying ? 1 : 0, transition: "opacity 0.35s ease", zIndex: 1 }}
        playsInline
      />

      {/* Gradient over video */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)", opacity: isPlaying ? 1 : 0, transition: "opacity 0.35s", pointerEvents: "none", zIndex: 2 }} />

      {/* Bottom controls row */}
      <div style={{ position: "absolute", bottom: 28, left: 28, right: 28, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 3 }}>

        {/* Play/pause + ring */}
        <div
          style={{ position: "relative", width: 48, height: 48, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={togglePlay}
        >
          <svg width="52" height="52" style={{ position: "absolute", top: -2, left: -2, pointerEvents: "none" }}>
            <circle cx="26" cy="26" r={R} fill="none" stroke={isPlaying ? "rgba(255,255,255,0.25)" : "rgba(191,121,29,0.35)"} strokeWidth="2.5"/>
            <circle
              cx="26" cy="26" r={R} fill="none"
              stroke={isPlaying ? "#fff" : "#bf791d"}
              strokeWidth="2.5"
              strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)}
              strokeLinecap="round" transform="rotate(-90 26 26)"
              style={{ transition: "stroke-dashoffset 0.15s linear" }}
            />
          </svg>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: isPlaying ? "#bf791d" : "transparent",
            border: isPlaying ? "none" : "1.5px solid #bf791d",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s, border 0.2s",
          }}>
            {isPlaying ? <S9PauseIcon color="#fff" /> : <S9PlayIcon color="#bf791d" />}
          </div>
        </div>

        {/* Fullscreen */}
        <button
          onClick={() => videoRef.current?.requestFullscreen?.()}
          style={{ opacity: isPlaying ? 1 : 0, pointerEvents: isPlaying ? "auto" : "none", transition: "opacity 0.2s", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}
        >
          <S9FullscreenIcon />
        </button>
      </div>
    </div>
  );
}

// ── Section 9 shell ───────────────────────────────────────────────────────
function Section9() {
  const sectionRef = useFadeInUp();
  const [winW, setWinW] = useState(1200);
  const trackRef   = useRef<HTMLDivElement>(null);
  const dragging   = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollL= useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const update = () => setWinW(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Responsive card geometry — cards bleed to right edge
  const isMobile = winW < 640;
  const isTablet = winW >= 640 && winW < 1024;
  const hPad   = isMobile ? 20 : isTablet ? 40 : 60;
  const visible = isMobile ? 1.15 : isTablet ? 1.8 : winW >= 1600 ? 4.5 : winW >= 1400 ? 4 : winW >= 1200 ? 3.5 : 2.5;
  const GAP    = 20;
  // Available width = full viewport minus left padding only (right side bleeds to edge)
  const availableW = winW - hPad;
  const cardW  = Math.round(availableW / visible - GAP * (visible - 1) / visible);
  const cardH  = Math.min(500, Math.round(cardW * 1.36));

  // Drag-to-scroll handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    dragging.current   = true;
    dragStartX.current = e.pageX - trackRef.current.getBoundingClientRect().left;
    dragScrollL.current= trackRef.current.scrollLeft;
    setIsDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.getBoundingClientRect().left;
    trackRef.current.scrollLeft = dragScrollL.current - (x - dragStartX.current);
  };
  const stopDrag = () => { dragging.current = false; setIsDragging(false); };

  return (
    <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#f8f5ef", borderRadius: 30, margin: "40px 0", overflow: "hidden" }}>

      {/* Header — full width so subtitle reaches the right edge */}
      <div style={{ paddingTop: 68, paddingBottom: 52, paddingLeft: hPad, paddingRight: hPad, width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px", alignSelf: "flex-start" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>Real change!</span>
            </div>
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 28 : 40, lineHeight: "1.36", color: "#000", margin: 0, textTransform: "capitalize" }}>
              What Real Progress Feels Like
            </h2>
          </div>
          {!isMobile && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "22px", color: "#686868", margin: 0, maxWidth: 255, textAlign: "right" }}>
              Changes that begin when learning becomes meaningful and alive.
            </p>
          )}
        </div>
      </div>

      {/* Card track — left-padded, bleeds to right screen edge */}
      <div
        ref={trackRef}
        className="s9-track"
        style={{ overflowX: "auto", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", paddingLeft: hPad, paddingBottom: 68 }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <div style={{ display: "flex", gap: GAP, width: "max-content" }}>
          {SECTION_9_CARDS.map(card => (
            <ContentCard9 key={card.id} card={card} width={cardW} height={cardH} />
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Section 10 — Get Involved, In Detail ─────────────────────────────────
interface S10TabData {
  label: string;
  forLabel: string;
  desc: string;
  bullets: string[];
  cta: string;
  photo: string;
  photoBg?: string;
}

const S10_TABS: S10TabData[] = [
  {
    label: "Teachers",
    forLabel: "For Teachers who want to be part of something larger",
    desc: "You already show up every day. The Teacher Reformers Network gives the methods, the tools, infrastructure and the community which powers the ignited and passionate teacher within you. A space built by teachers, for teachers.",
    bullets: [
      "Peer mentoring circles across schools",
      "Structured professional development sessions",
      "Direct access to Ujjwala's methods and guidance",
      "Community recognition for teachers driving change",
      "Providing tools, shared resources and infrastructure to your school",
    ],
    cta: "Join Teacher Network",
    photo: imgS10TeacherRmBg,
    photoBg: imgS10Classroom,
  },
  {
    label: "Volunteers",
    forLabel: "For People who want to give their time or skill",
    desc: "A designer can create learning materials. A doctor can run a health awareness session. A local business can host an exposure visit. Whether you have a skill to teach, time to give or energy to contribute on the ground, bring your world to a child's education.",
    bullets: [
      "Meaningful work tied directly to program outcomes",
      "Skill-based roles matched to your background",
      "A coordinator who stays in touch throughout",
      "Flexible time commitments, no rigid obligations",
      "A reference and recognition letter on request",
    ],
    cta: "Offer My Skills",
    photo: imgTeacher,
  },
  {
    label: "Partners",
    forLabel: "For Businesses that want to offer real-world learning experiences",
    desc: "Children learn best when learning connects to life. If your business or workplace can give a child a real glimpse of how the world works, you are already a potential partner in this mission. These visits become lessons no textbook can replicate.",
    bullets: [
      "Clear structure for every visit so your time is respected",
      "No financial obligation, your time and space is the contribution",
      "Community recognition for businesses that open their doors",
      "Teacher present throughout every visit",
      "Child consent and safety fully managed",
    ],
    cta: "I want to show the world to every child",
    photo: imgCarousel1,
  },
  {
    label: "CSR / Business",
    forLabel: "For Companies ready to invest in change that lasts",
    desc: "The trust works with businesses who want their education investment to connect directly to a child's learning. Your company's contribution goes into specific programs, is tracked against defined outcomes and is reported back to you honestly, whether the results are strong or still growing.",
    bullets: [
      "Detailed CSR proposal aligned to your focus area",
      "80G compliance documentation where applicable",
      "Employee volunteering integration into the partnership",
      "Public acknowledgement in reports and communications",
      "Transparent financial reporting and audit access",
    ],
    cta: "Request CSR Proposal",
    photo: imgS6Bg,
  },
];

const S10ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.75 9H14.25M14.25 9L10.5 5.25M14.25 9L10.5 12.75" stroke="#174067" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Generates the SVG path for the Section 10 card panel.
 * Replicates the Figma "Subtract" boolean operation — a rounded rectangle
 * with a raised bump at the top matching the active tab's position.
 *
 * Coordinates are in the 1008 × 477 card viewport.
 */
function getS10CardPath(N: number, H = 477): string {
  const W = 1008;
  const TW = 244.5, GAP = 10;
  const BH = 56;     // bump height (top of card to top of body)
  const R = 20;      // standard corner radius
  const OUTER = 30;  // outer concave horizontal+vertical span
  const INNER = 26;  // inner concave horizontal+vertical span
  const TR = 41;     // top-right body corner radius (Figma: 967→1008 = 41px)
  const cp = 0.5523; // bezier quarter-circle control-point factor

  const cpR  = R * cp;
  const cpO  = OUTER * cp;
  const cpI  = INNER * cp;
  const cpTR = TR * cp;

  const tx1 = N * (TW + GAP);
  const tx2 = tx1 + TW;
  const isFirst = N === 0;
  const isLast  = tx2 >= W - 1; // bump reaches the right edge

  const n = (v: number) => +v.toFixed(3);
  const p: string[] = [];

  if (isLast) {
    // Bump at right edge → start from top-right corner of card (inside bump)
    p.push(`M${n(W - R)} 0`);
    p.push(`C${n(W - R + cpR)} 0 ${W} ${n(R - cpR)} ${W} ${R}`);
  } else {
    // Normal: start at right inner-concave of bump
    p.push(`M${n(tx2)} ${n(INNER)}`);
    // Right outer concave  (bump level → body level)
    p.push(`C${n(tx2)} ${n(BH - OUTER + cpO)} ${n(tx2 + OUTER - cpO)} ${BH} ${n(tx2 + OUTER)} ${BH}`);
    // Body top (right portion)
    p.push(`H${W - TR}`);
    // Top-right body corner (TR = 41 px)
    p.push(`C${n(W - TR + cpTR)} ${BH} ${W} ${n(BH + TR - cpTR)} ${W} ${n(BH + TR)}`);
  }

  // Right edge ↓
  p.push(`V${H - R}`);
  // Bottom-right corner
  p.push(`C${W} ${n(H - R + cpR)} ${n(W - R + cpR)} ${H} ${n(W - R)} ${H}`);
  // Bottom edge ←
  p.push(`H${R}`);
  // Bottom-left corner
  p.push(`C${n(R - cpR)} ${H} 0 ${n(H - R + cpR)} 0 ${H - R}`);

  if (isFirst) {
    // Left edge all the way up to top of bump ↑
    p.push(`V${R}`);
    // Top-left corner of bump
    p.push(`C0 ${n(R - cpR)} ${n(R - cpR)} 0 ${R} 0`);
    // Bump top →
    p.push(`H${n(tx2 - INNER)}`);
    // Right inner concave (closes path)
    p.push(`C${n(tx2 - INNER + cpI)} 0 ${n(tx2)} ${n(INNER - cpI)} ${n(tx2)} ${n(INNER)}`);
  } else if (isLast) {
    // Left edge up to body top ↑
    p.push(`V${BH + R}`);
    // Body top-left corner
    p.push(`C0 ${n(BH + R - cpR)} ${n(R - cpR)} ${BH} ${R} ${BH}`);
    // Body top → up to left outer concave
    p.push(`H${n(tx1 - OUTER)}`);
    // Left outer concave (body level → bump level)
    p.push(`C${n(tx1 - OUTER + cpO)} ${BH} ${n(tx1)} ${n(BH - OUTER + cpO)} ${n(tx1)} ${n(BH - OUTER)}`);
    // Left inner concave (bump level → top)
    p.push(`C${n(tx1)} ${n(INNER - cpI)} ${n(tx1 + INNER - cpI)} 0 ${n(tx1 + INNER)} 0`);
    // Bump top → to start (top-right corner)
    p.push(`H${n(W - R)}`);
  } else {
    // Middle tabs: body on both sides, bump in centre
    p.push(`V${BH + R}`);
    p.push(`C0 ${n(BH + R - cpR)} ${n(R - cpR)} ${BH} ${R} ${BH}`);
    p.push(`H${n(tx1 - OUTER)}`);
    p.push(`C${n(tx1 - OUTER + cpO)} ${BH} ${n(tx1)} ${n(BH - OUTER + cpO)} ${n(tx1)} ${n(BH - OUTER)}`);
    p.push(`C${n(tx1)} ${n(INNER - cpI)} ${n(tx1 + INNER - cpI)} 0 ${n(tx1 + INNER)} 0`);
    p.push(`H${n(tx2 - INNER)}`);
    p.push(`C${n(tx2 - INNER + cpI)} 0 ${n(tx2)} ${n(INNER - cpI)} ${n(tx2)} ${n(INNER)}`);
  }

  p.push('Z');
  return p.join(' ');
}

function Section10() {
  const sectionRef = useFadeInUp();
  const [activeTab, setActiveTab] = useState(0);
  const [fading, setFading] = useState(false);
  const [winW, setWinW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [cardH, setCardH] = useState(477);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Measure content height after each tab switch (after fade-in completes) and
  // expand the card so the CTA is never clipped by the fixed-H clipPath.
  useEffect(() => {
    if (!contentRef.current) return;
    // 100 = top offset of content inside card, 48 = bottom padding
    const needed = 100 + contentRef.current.offsetHeight + 48;
    setCardH(Math.max(477, needed));
  }, [activeTab, fading]);

  const isMobile = winW < 640;
  const isTablet = winW >= 640 && winW < 1100;

  const handleTabClick = (i: number) => {
    if (i === activeTab || fading) return;
    setFading(true);
    setTimeout(() => {
      setActiveTab(i);
      setFading(false);
    }, 220);
  };

  const tab    = S10_TABS[activeTab];
  const TAB_W  = 244.5;
  const GAP    = 10;
  const CARD_H = cardH;
  const CARD_W = 1008;
  const BH     = 56;   // bump height in SVG path (tab sits inside this)
  const TAB_H  = 44;   // actual tab button height
  const TAB_TOP = Math.round((BH - TAB_H) / 2); // 6px — centres tab inside bump

  const cardPath = getS10CardPath(activeTab, CARD_H);

  // Gradient: starts #174067 at the bump's centre-top, fades to cream — matches Figma
  const tx1     = activeTab * (TAB_W + GAP);
  const gradX1  = tx1 + TAB_W * 0.65;
  const gradY1  = BH * 0.17;
  const gradX2  = gradX1 - 100;
  const gradY2  = gradY1 + 290;

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "60px 0 80px" : "88px 0 100px" }}>
      <div style={{ maxWidth: CARD_W, margin: "0 auto", padding: `0 ${isMobile ? 16 : isTablet ? 24 : 0}px`, boxSizing: "border-box" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 52 }}>
          <h2 style={{
            fontFamily: "'Lora', serif", fontWeight: 600,
            fontSize: isMobile ? 28 : 40, lineHeight: "1.36",
            color: "#000", margin: "0 0 12px", textTransform: "capitalize",
          }}>
            Find Your Role In This Mission
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: 16, lineHeight: "22px", color: "#686868",
            margin: "0 auto", maxWidth: 556,
          }}>
            Choose what fits your life and your capacity. Every role here connects directly to the way India educates.
          </p>
        </div>

        {/* ── Tab + Card unified block ── */}
        {isMobile ? (
          /* Mobile: simple flex tabs above a rounded card */
          <div>
            <div style={{ display: "flex", gap: GAP, marginBottom: 0 }}>
              {S10_TABS.map((t, i) => {
                const isActive = i === activeTab;
                return (
                  <button key={t.label} onClick={() => handleTabClick(i)} style={{
                    flex: "1 1 0", height: 40,
                    border: isActive ? "none" : "1px solid #174067",
                    background: isActive ? "#174067" : "transparent",
                    color: isActive ? "#fff" : "#174067",
                    borderRadius: 40, fontFamily: "'Poppins', sans-serif",
                    fontSize: 11, fontWeight: isActive ? 500 : 400,
                    cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden",
                    textOverflow: "ellipsis", padding: "0 6px",
                    transition: "background 0.25s, color 0.25s",
                  }}>
                    {t.label}
                  </button>
                );
              })}
            </div>
            <div style={{ background: "#f8f5ef", borderRadius: 20, padding: "32px 24px", marginTop: 0, opacity: fading ? 0 : 1, transition: "opacity 0.22s" }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: "#bf791d", margin: "0 0 8px" }}>
                For: {tab.forLabel}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "24px", color: "#636363", margin: "0 0 24px" }}>
                {tab.desc}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#000", margin: "0 0 8px", letterSpacing: "0.03em" }}>WHAT THE TRUST PROVIDES</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 24 }}>
                {tab.bullets.map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <S10ArrowRight />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#636363" }}>{b}</span>
                  </div>
                ))}
              </div>
              <button className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 40, padding: "0 20px", background: "#bf791d", border: "none", borderRadius: 30, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", cursor: "pointer" }}>
                {tab.cta} <span>→</span>
              </button>
            </div>
          </div>
        ) : (
          /* Desktop/tablet: card starts at y=0, tabs float over the bump area */
          <div style={{ position: "relative" }}>

            {/* ── Card panel ──
                Full height 477px, clipped to SVG path (includes the 56px bump at top).
                Content padded 100px from top (matches Figma pt-[100px]).
                The bump area (0–56px) is visible and holds the active tab pill. */}
            <div style={{
              position: "relative",
              height: CARD_H,
              background: "#f8f5ef",
              clipPath: `path("${cardPath}")`,
            }}>

              {/* Image: right 66%, full height */}
              <div style={{ position: "absolute", right: 0, top: 0, width: "66%", height: "100%", zIndex: 0 }}>
                {tab.photoBg ? (
                  <img src={tab.photoBg} alt="" style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center top",
                    opacity: fading ? 0 : 1, transition: "opacity 0.22s",
                  }} />
                ) : (
                  <div style={{ position: "absolute", inset: 0, background: "#ddd6ca", opacity: fading ? 0 : 1, transition: "opacity 0.22s" }} />
                )}
                <img src={tab.photo} alt="" style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: tab.photoBg ? "contain" : "cover",
                  objectPosition: tab.photoBg ? "right bottom" : "center top",
                  opacity: fading ? 0 : 1, transition: "opacity 0.22s",
                }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(99.1deg, #f8f5ef 3.43%, rgba(248,245,239,0) 96.57%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, width: "38%", background: "linear-gradient(93.4deg, #f8f5ef 3.43%, rgba(248,245,239,0) 100%)", pointerEvents: "none" }} />
              </div>

              {/* Content: 100px from card top, 47px left padding — matches Figma */}
              <div ref={contentRef} style={{
                position: "absolute", top: 100, left: 47, maxWidth: 520, zIndex: 1,
                opacity: fading ? 0 : 1,
                transform: fading ? "translateY(10px)" : "none",
                transition: "opacity 0.22s, transform 0.22s",
              }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 18, color: "#bf791d", margin: "0 0 10px", lineHeight: "normal" }}>
                  For: {tab.forLabel}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "26px", color: "#636363", margin: "0 0 32px", maxWidth: 480 }}>
                  {tab.desc}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, lineHeight: "28px", color: "#000", margin: "0 0 8px", letterSpacing: "0.03em" }}>
                  WHAT THE TRUST PROVIDES
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 28 }}>
                  {tab.bullets.map(bullet => (
                    <div key={bullet} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }}>
                        <S10ArrowRight />
                      </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "24px", color: "#636363" }}>
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="btn-gold"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 20,
                    height: 44, padding: "10px 24px",
                    background: "#bf791d", border: "1px solid #bf791d", borderRadius: 30,
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16,
                    color: "#fff", cursor: "pointer", whiteSpace: "nowrap", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {tab.cta}
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4.5 11H17.5M17.5 11L13 6.5M17.5 11L13 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>{/* end card */}

            {/* ── Tab row: floats over the card's bump ──
                position:absolute + top:TAB_TOP centres each 44px pill in the 56px bump.
                All tabs = FULL PILLS (borderRadius:40 all sides, no cut-off).
                Active tab (filled #174067) sits inside the bump; its pill shape
                is fully visible. Inactive tabs sit above the body area (white bg shows
                between card body top and tab bottom — intentional per Figma). */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              gap: GAP,
              zIndex: 10,
            }}>
              {S10_TABS.map((t, i) => {
                const isActive = i === activeTab;
                return (
                  <button
                    key={t.label}
                    onClick={() => handleTabClick(i)}
                    style={{
                      flex: `0 0 ${TAB_W}px`,
                      height: TAB_H,
                      border: isActive ? "none" : "1px solid #174067",
                      background: isActive ? "#174067" : "transparent",
                      color: isActive ? "#fff" : "#174067",
                      borderRadius: 40, // ← FULL PILL — not cut off
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 16,
                      fontWeight: isActive ? 500 : 400,
                      cursor: "pointer",
                      transition: "background 0.25s, color 0.25s",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      padding: "0 8px",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* ── SVG gradient border ──
                Sibling of the card (outside its clip), renders on top.
                Draws the exact Figma card outline: #174067 at the active bump,
                fading to #f8f5ef elsewhere — creating the "tab grows out of card" effect. */}
            <svg
              viewBox={`0 0 ${CARD_W} ${CARD_H}`}
              preserveAspectRatio="none"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                pointerEvents: "none", display: "block", zIndex: 5,
              }}
            >
              <defs>
                <linearGradient id={`s10B${activeTab}`} x1={gradX1} y1={gradY1} x2={gradX2} y2={gradY2} gradientUnits="userSpaceOnUse">
                  <stop stopColor="#174067" />
                  <stop offset="1" stopColor="#F8F5EF" />
                </linearGradient>
              </defs>
              <path d={cardPath} fill="none" stroke={`url(#s10B${activeTab})`} strokeWidth="1.5" />
            </svg>

          </div>
        )}

      </div>
    </section>
  );
}

// ── Section 12 ─────────────────────────────────────────────────────────────
const S12_TAGS_ROW1 = ["Community Outreach Sessions", "Uniforms & Stationery (access)"];
const S12_TAGS_ROW2 = ["Books & Reading Materials", "Learning Kits & Lab Supplies", "Exposure Learning Visits", "Teacher Workshop Costs"];
const S12_CARDS = [
  {
    num: "01",
    title: "Receive With Care",
    desc: "Every contribution begins with trust, and is received with clarity, purpose, and responsibility.",
  },
  {
    num: "02",
    title: "Direct With Purpose",
    desc: "Your support is placed where children, schools, or programmes need it most.",
  },
  {
    num: "03",
    title: "Show The Change",
    desc: "We share how your support helped learning grow, with visible progress and honest updates.",
  },
];

function Section12() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const TAG_PILL: React.CSSProperties = {
    border: "1px solid #bf791d",
    borderRadius: 100,
    padding: "6px 20px",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
    fontSize: 14,
    lineHeight: "20px",
    color: "#bf791d",
    whiteSpace: "nowrap",
    background: "transparent",
  };

  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const cardPadding = isMobile ? "24px 24px 24px 24px" : "108px 32px 32px 32px";
  const cardHeight = isMobile ? "auto" : 242;

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0 0 0" : "88px 0 0 0", marginBottom: isMobile ? 60 : 100 }}>
      <div style={{ maxWidth: 1008, margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Lora', serif",
          fontWeight: 600,
          fontSize: isMobile ? 28 : isTablet ? 36 : 48,
          lineHeight: 1.2,
          textAlign: "center",
          color: "#111",
          margin: isMobile ? "0 0 32px 0" : "0 0 48px 0",
        }}>
          How Your Support Turns Into Learning
        </h2>

        {/* Tag pills — two rows */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: isMobile ? 28 : 40 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {S12_TAGS_ROW1.map(tag => <span key={tag} style={TAG_PILL}>{tag}</span>)}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {S12_TAGS_ROW2.map(tag => <span key={tag} style={TAG_PILL}>{tag}</span>)}
          </div>
        </div>

        {/* Process cards */}
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 16, marginBottom: 24 }}>
          {S12_CARDS.map(card => (
            <div key={card.num} style={{
              position: "relative",
              background: "#f8f5ef",
              borderRadius: 12,
              height: cardHeight,
              overflow: "hidden",
              padding: cardPadding,
              boxSizing: "border-box",
            }}>
              {/* Watermark number */}
              <span style={{
                position: isMobile ? "relative" : "absolute",
                top: isMobile ? undefined : 18,
                right: isMobile ? undefined : 20,
                display: isMobile ? "block" : undefined,
                fontFamily: "'Lora', serif",
                fontWeight: 300,
                fontSize: isMobile ? 64 : 96,
                lineHeight: 1,
                color: "rgba(191,121,29,0.15)",
                pointerEvents: "none",
                userSelect: "none",
                marginBottom: isMobile ? 8 : 0,
              }}>{card.num}</span>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 18,
                color: "#111",
                marginBottom: 8,
              }}>{card.title}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.6,
                color: "#555",
              }}>{card.desc}</div>
            </div>
          ))}
        </div>

        {/* ══ CTA BANNER (Node 160:4105) — Final Polish ═════════════════════════════ */}
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          background: "transparent", border: "1px solid #EBE3D5", borderRadius: 32,
          minHeight: isMobile ? "auto" : 186,
          position: "relative", overflow: "hidden",
        }}>
          {/* Decorative Pattern — positioned to match figma visually */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 320,
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}>
              <img
                src={s12_cta_pattern}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.6 }}
              />
            </div>
          )}

          <div style={{
            position: "relative",
            zIndex: 1,
            padding: isMobile ? "24px 20px" : isTablet ? "32px 32px" : "32px 36px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? 24 : 32,
            height: "100%",
            minHeight: isMobile ? "auto" : 186,
            boxSizing: "border-box",
          }}>
            {/* Left: heading */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                margin: 0,
                fontFamily: "'Lora', serif",
                fontWeight: 500,
                fontSize: isMobile ? 22 : isTablet ? 26 : 28,
                lineHeight: 1.32,
                color: "#111",
                maxWidth: "100%",
              }}>
                Stand with a mission where every contribution is valued, placed with care, and reflected in real change.
              </h3>
            </div>

            {/* Right: buttons */}
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 16,
              alignItems: "center",
              flexShrink: 0,
              width: isMobile ? "100%" : "auto",
              paddingBottom: isMobile ? 0 : 0,
            }}>
              {/* Outlined gold button */}
              <Link to="/causes" style={{ textDecoration: "none", width: isMobile ? "100%" : "auto" }}>
                <button
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(191,121,29,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 12, background: "white",
                    borderRadius: 100, padding: "14px 28px",
                    border: "1px solid #BF791D", cursor: "pointer",
                    color: "#BF791D", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600, fontSize: 16,
                    whiteSpace: "nowrap", transition: "all 0.2s ease",
                    width: isMobile ? "100%" : "auto",
                  }}>
                  Support This Mission <ArrowIcon color="#BF791D" size={16} />
                </button>
              </Link>
              {/* Solid gold button */}
              <Link to="/donate" style={{ textDecoration: "none", width: isMobile ? "100%" : "auto" }}>
                <button
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 12, background: "#BF791D",
                    borderRadius: 100, padding: "14px 28px",
                    border: "none", cursor: "pointer",
                    color: "#fff", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600, fontSize: 16,
                    whiteSpace: "nowrap", transition: "all 0.2s ease",
                    width: isMobile ? "100%" : "auto",
                  }}>
                  Donate Now <ArrowIcon color="#fff" size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Honest Impact (Sticky Horizontal Scroll) ────────────────────
const HONEST_CARDS_DATA = [
  {
    tags: ["Honest Impact", "Science"],
    rows: [
      { label: "SITUATION", text: "Class 5 children in Bhusawal had never seen a functioning lab — their science textbook remained theory." },
      { label: "WHAT WAS DONE", text: "A Hands-On Learning Kit was introduced: magnets, lenses, circuits, seeds. The teacher ran six sessions." },
      { label: "WHAT CHANGED", text: "Three months later, science scores improved by 22%. Children began asking questions unprompted." },
    ],
  },
  {
    tags: ["Honest Impact", "Reading"],
    rows: [
      { label: "WHAT CHANGED", text: "Reading comprehension scores improved by 35% and children began borrowing books voluntarily each week." },
    ],
  },
  {
    tags: ["Honest Impact", "Community"],
    rows: [
      { label: "SITUATION", text: "Rural schools lacked basic reading materials, limiting children's early language development." },
      { label: "WHAT WAS DONE", text: "Mobile libraries with curated books were introduced across 40 villages in the district." },
      { label: "WHAT CHANGED", text: "Reading comprehension scores improved by 35% within one academic year of the program launch." },
    ],
  },
  {
    tags: ["Honest Impact", "Teachers"],
    rows: [
      { label: "WHAT CHANGED", text: "Teacher attendance improved by 28% and parent engagement in school activities tripled over the year." },
    ],
  },
];

function HonestImpactCard({ cardIdx, style }: { cardIdx: number; style?: React.CSSProperties }) {
  const card = HONEST_CARDS_DATA[cardIdx];
  return (
    <div style={{
      background: "#f8f5ef", borderRadius: 16, padding: "28px 32px",
      display: "flex", flexDirection: "column", gap: 20,
      boxSizing: "border-box", ...style,
    }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {card.tags.map(t => (
          <span key={t} style={{
            border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px",
            fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d",
            whiteSpace: "nowrap", lineHeight: "normal",
          }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {card.rows.map(row => (
          <div key={row.label}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, lineHeight: "24px", color: "#000", margin: "0 0 2px" }}>{row.label}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "24px", color: "#636363", margin: 0 }}>{row.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HonestPlayBtn() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: "rgba(255,255,255,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M5 3.5L14.5 9L5 14.5V3.5Z" fill="#2e80d0" />
        </svg>
      </div>
    </div>
  );
}

function HonestGrayBlock({ style }: { style?: React.CSSProperties }) {
  return <div style={{ background: "#d9d9d9", borderRadius: 16, ...style }} />;
}

function SectionHonestImpact() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const outerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile || isTablet) return;
    const outer = outerRef.current;
    const strip = stripRef.current;
    if (!outer || !strip) return;

    const updateHeight = () => {
      // Dynamically align the strip's left padding with the 1008px max-width text container above it
      const pLeft = Math.max(24, (window.innerWidth - 1008) / 2 + 24);
      strip.style.paddingLeft = `${pLeft}px`;

      const scrollable = Math.max(0, strip.scrollWidth - window.innerWidth);
      outer.style.height = `calc(100vh + ${scrollable}px)`;
    };

    const onScroll = () => {
      const totalScroll = outer.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled = -outer.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const maxTranslate = strip.scrollWidth - window.innerWidth;
      strip.style.transform = `translateX(${-progress * maxTranslate}px)`;
    };

    const onResize = () => { updateHeight(); onScroll(); };

    requestAnimationFrame(() => { updateHeight(); onScroll(); });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile, isTablet]);

  // ── Mobile / Tablet: simple vertical layout ──────────────────────────────
  if (isMobile || isTablet) {
    return (
      <div style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0" : "64px 0" }}>
        <div style={{ maxWidth: 1008, margin: "0 auto", padding: "0 20px", boxSizing: "border-box" }}>

          {/* Header */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            <span style={{
              border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px",
              fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d",
              display: "inline-block", width: "fit-content",
            }}>
              Honest Impact
            </span>
            <div style={{ display: "flex", flexDirection: isTablet ? "row" : "column", alignItems: isTablet ? "flex-end" : "flex-start", justifyContent: "space-between", gap: 12 }}>
              <h2 style={{
                fontFamily: "'Lora', serif", fontWeight: 600,
                fontSize: isMobile ? 26 : 32, lineHeight: 1.36,
                color: "#000", margin: 0, textTransform: "capitalize",
              }}>
                What Changed When We Showed Up
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15,
                lineHeight: "22px", color: "#686868",
                maxWidth: isTablet ? 240 : "100%", margin: 0,
                textAlign: isTablet ? "right" : "left",
              }}>
                Real stories, real changes — from classrooms where Ujjwala's methods were applied.
              </p>
            </div>
          </div>

          {/* Impact cards — vertical stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {HONEST_CARDS_DATA.map((_, idx) => (
              <HonestImpactCard key={idx} cardIdx={idx} />
            ))}
          </div>

        </div>
      </div>
    );
  }

  const STRIP_H = "clamp(420px, 55vh, 600px)";

  return (
    <div ref={outerRef} style={{ position: "relative", background: "#fff" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: "#fff", display: "flex", flexDirection: "column",
        justifyContent: "center", gap: 48, boxSizing: "border-box",
        padding: "48px 0",
      }}>

        {/* Header row */}
        <div style={{
          maxWidth: 1008, margin: "0 auto", width: "100%",
          padding: "0 24px", boxSizing: "border-box",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 24, flexShrink: 0,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{
              border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px",
              fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d",
              display: "inline-block", width: "fit-content",
            }}>
              Honest Impact
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600,
              fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.36,
              color: "#000", margin: 0, textTransform: "capitalize",
            }}>
              Grid Lorem ipsum is simply
            </h2>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16,
            lineHeight: "22px", color: "#686868", textAlign: "right",
            maxWidth: 255, margin: 0, flexShrink: 0,
          }}>
            Real stories, real changes — from classrooms where Ujjwala's methods were applied.
          </p>
        </div>

        {/* Scrolling column strip */}
        <div ref={stripRef} style={{
          display: "flex", gap: 16, alignItems: "stretch",
          paddingRight: 24, /* paddingLeft is set dynamically in updateHeight */
          boxSizing: "border-box",
          height: 600, // Exact Figma height
          willChange: "transform",
          flexShrink: 0,
        }}>

          {/* Col 1: image (flex) + cream text card */}
          <div style={{ width: 459, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestImpactCard cardIdx={0} style={{ flexShrink: 0 }} />
          </div>

          {/* Col 2: full-height video block + play button */}
          <div style={{ width: 350, position: "relative", flexShrink: 0 }}>
            <HonestGrayBlock style={{ width: "100%", height: "100%" }} />
            <HonestPlayBtn />
          </div>

          {/* Col 3: 2 stacked image blocks */}
          <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestGrayBlock style={{ flex: 1 }} />
          </div>

          {/* Col 4: cream text card (flex) + image bottom */}
          <div style={{ width: 350, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestImpactCard cardIdx={1} style={{ flex: 1, minHeight: 0 }} />
            <HonestGrayBlock style={{ height: 352, flexShrink: 0 }} />
          </div>

          {/* Col 5: 2 stacked blocks + play button overlay */}
          <div style={{ width: 302, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0, position: "relative" }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestGrayBlock style={{ height: 184, flexShrink: 0 }} />
            <HonestPlayBtn />
          </div>

          {/* Col 6: image (flex) + cream text card (different content) */}
          <div style={{ width: 459, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestImpactCard cardIdx={2} style={{ flexShrink: 0 }} />
          </div>

          {/* Col 7: full-height video block + play button */}
          <div style={{ width: 350, position: "relative", flexShrink: 0 }}>
            <HonestGrayBlock style={{ width: "100%", height: "100%" }} />
            <HonestPlayBtn />
          </div>

          {/* Col 8: 2 stacked image blocks */}
          <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestGrayBlock style={{ flex: 1 }} />
          </div>

          {/* Col 9: cream text card (flex) + image bottom */}
          <div style={{ width: 350, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestImpactCard cardIdx={3} style={{ flex: 1, minHeight: 0 }} />
            <HonestGrayBlock style={{ height: 352, flexShrink: 0 }} />
          </div>

          {/* Col 10: 2 stacked image blocks */}
          <div style={{ width: 302, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestGrayBlock style={{ height: 184, flexShrink: 0 }} />
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Section 15 ─────────────────────────────────────────────────────────────
const S15_TEAM = [
  {
    name: "Mr. Unmesh Wadekar",
    role: "Lorem Ispum Strategist",
    photo: imgS15PhotoKalpesh2,
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has Lorem Ipsum is simply dummy Lorem Ipsum is simply lorem ips",
  },
  {
    name: "Mr. Kalpesh Wadekar",
    role: "Lorem Strategist",
    photo: imgS15PhotoKalpesh,
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since.",
  },
  {
    name: "Mrs. Urvi Mandge",
    role: "Lorem Strategist",
    photo: imgS15PhotoUrvi,
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since.",
  },
  {
    name: "Mr. Kalpesh Wadekar",
    role: "Lorem Strategist",
    photo: imgS15PhotoKalpesh2,
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since.",
  },
];

// Simplified world map SVG for card background decoration
const S15_MAP_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236 280" fill="none">
  <path d="M30 100 Q40 85 55 90 Q65 80 75 88 Q80 75 90 78 Q95 68 105 72 Q115 60 125 65 Q135 58 145 62 Q155 55 165 60 Q175 52 185 58 Q192 50 200 55 L205 70 Q195 75 190 85 Q195 95 188 105 Q180 100 175 110 Q180 120 172 130 Q165 125 158 135 Q162 145 155 152 Q148 148 142 158 Q145 168 138 175 Q130 170 125 180 Q128 190 120 197 Q112 192 108 202 Q110 215 102 220 Q93 215 90 225 Q88 238 80 240 Q72 235 70 245 Q62 243 58 235 Q52 240 45 232 Q40 225 44 215 Q38 210 35 200 Q28 198 25 188 Q20 180 25 170 Q18 162 22 152 Q16 145 20 135 Q14 128 18 118 Q12 110 18 103 Q24 96 30 100Z" stroke="white" stroke-width="0.6" fill="none" opacity="0.6"/>
  <path d="M115 180 Q122 172 130 175 Q138 168 145 172 Q150 162 158 165 Q165 158 172 162 Q178 155 185 160 Q190 152 196 157 L200 170 Q193 176 190 186 Q195 196 188 204 Q180 200 175 210 Q178 220 170 226 Q162 222 158 232 Q160 242 152 248 Q144 244 140 252 Q138 264 130 265 Q122 260 120 250 Q112 252 108 242 Q110 232 104 226 Q96 228 94 218 Q98 208 94 200 Q100 196 105 188 Q110 182 115 180Z" stroke="white" stroke-width="0.6" fill="none" opacity="0.5"/>
  <ellipse cx="185" cy="230" rx="22" ry="14" stroke="white" stroke-width="0.6" fill="none" opacity="0.5"/>
  <path d="M50 50 Q58 42 68 46 Q76 38 85 42 Q92 35 100 38 L102 52 Q94 58 90 68 Q96 78 88 85 Q80 80 74 90 Q76 100 68 105 Q60 100 56 110 Q48 108 44 98 Q38 93 40 83 Q32 78 36 68 Q40 60 50 50Z" stroke="white" stroke-width="0.6" fill="none" opacity="0.55"/>
</svg>`;

function S15Card({ member, cardWidth = 236 }: { member: typeof S15_TEAM[0]; cardWidth?: number | string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ width: cardWidth, cursor: "pointer", flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card image/content area */}
      <div style={{
        width: "100%",
        height: 280,
        borderRadius: "16px 16px 0 0",
        position: "relative",
        background: "#bf791d",
        marginTop: 64, // Margin to make room for overlapping head
      }}>
        {/* World map decoration */}
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: "16px 16px 0 0" }}
          dangerouslySetInnerHTML={{ __html: S15_MAP_SVG }}
        />

        {/* Person photo */}
        <img
          src={member.photo}
          alt={member.name}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "auto", // Allow natural aspect ratio to push head up
            objectFit: "contain",
            objectPosition: "bottom center",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.3s ease",
            zIndex: 2,
          }}
        />

        {/* Hover overlay — bio + social icons */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "#bf791d",
          borderRadius: "16px 16px 0 0",
          overflow: "hidden", // Ensure text doesn't spill
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 20px",
          gap: 20,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 3,
          pointerEvents: hovered ? "auto" : "none",
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            lineHeight: "22px",
            color: "#fff",
            textAlign: "center",
            margin: 0,
          }}>{member.bio}</p>

          {/* Social icons — white, borderless on amber */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke="#fff" strokeWidth="1.8" fill="none"/><rect x="2" y="9" width="4" height="12" stroke="#fff" strokeWidth="1.8" fill="none"/><circle cx="4" cy="4" r="2" stroke="#fff" strokeWidth="1.8" fill="none"/></svg>,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M4 20L20 4" stroke="#fff" strokeWidth="1.9" strokeLinecap="round"/></svg>,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#fff" strokeWidth="1.8" fill="none"/></svg>,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#fff" strokeWidth="1.8" fill="none"/><circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.8" fill="none"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg>,
            ].map((icon, i) => (
              <div key={i} style={{
                width: 28, height: 28,
                border: "1.5px solid rgba(255,255,255,0.55)",
                borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent",
              }}>{icon}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Card info bar: name + role + nav indicator */}
      <div style={{
        background: "#f8f5ef", // Cream background as per Figma
        padding: "16px 20px 0",
        height: 98,
        boxSizing: "border-box",
        borderRadius: "0 0 16px 16px", // Added border radius to match Figma since top has 16px
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          lineHeight: "28px",
          color: "#583804",
          margin: 0,
          textAlign: "center",
        }}>{member.name}</p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 15,
          lineHeight: "24px",
          color: "#583804",
          margin: 0,
          textAlign: "center",
        }}>{member.role}</p>

        {/* Nav indicator — hidden as requested */}
        <div style={{ display: "none", gap: 8, justifyContent: "center", marginTop: 12, paddingBottom: 16 }}>
          <div style={{
            width: 16, height: 3, borderRadius: 2,
            background: hovered ? "#bf791d" : "#d9d9d9",
            transition: "background 0.3s",
          }} />
          <div style={{
            width: 16, height: 3, borderRadius: 2,
            background: "#d9d9d9",
          }} />
        </div>
      </div>
    </div>
  );
}

function Section15() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Card width: full fluid on mobile, fixed 236 on desktop
  const cardWidth = isMobile ? "80vw" : isTablet ? "calc(50% - 10px)" : 236;

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0 56px" : "60px 0 80px" }}>
      <div style={{ maxWidth: 1008, margin: "0 auto", padding: isMobile ? "0 20px" : "0 1px", boxSizing: "border-box" }}>

        {/* Header */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            <span style={{
              display: "inline-block", border: "1px solid #e8e8e8", borderRadius: 40,
              padding: "6px 20px", fontFamily: "'Poppins', sans-serif",
              fontWeight: 400, fontSize: 13, color: "#bf791d", width: "fit-content",
            }}>
              My support system
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 28,
              lineHeight: 1.36, color: "#000", margin: 0, textTransform: "capitalize",
            }}>
              Meet the faces that keep the mission alive
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15,
              lineHeight: "22px", color: "#686868", margin: 0,
            }}>
              The first ones to inspire &amp; believe in me. The first ones to carry the mission on their shoulders.
            </p>
          </div>
        ) : (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 48,
          }}>
            <span style={{
              display: "inline-flex", border: "1px solid #e8e8e8", borderRadius: 40,
              padding: "6px 20px", fontFamily: "'Poppins', sans-serif",
              fontWeight: 400, fontSize: 13, color: "#bf791d", whiteSpace: "nowrap",
            }}>
              My support system
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600,
              fontSize: isTablet ? 30 : 40, lineHeight: 1.36,
              color: "#000", margin: 0, textTransform: "capitalize",
              textAlign: "center",
            }}>
              Meet the faces that keep the mission alive
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15,
              lineHeight: "22px", color: "#686868",
              width: isTablet ? 160 : 206, textAlign: "right", margin: 0,
            }}>
              The first ones to inspire &amp; believe in me. The first ones to carry the mission on their shoulders.
            </p>
          </div>
        )}

        {/* Cards row — scrollable on mobile, wrap on tablet, flex on desktop */}
        {isMobile ? (
          <div style={{
            display: "flex", gap: 16, overflowX: "auto",
            paddingBottom: 16, marginLeft: -20, marginRight: -20,
            paddingLeft: 20, paddingRight: 20,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}>
            {S15_TEAM.map((member, i) => (
              <div key={i} style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
                <S15Card member={member} cardWidth={cardWidth} />
              </div>
            ))}
          </div>
        ) : isTablet ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {S15_TEAM.map((member, i) => (
              <S15Card key={i} member={member} cardWidth={cardWidth} />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", gap: 20 }}>
            {S15_TEAM.map((member, i) => (
              <S15Card key={i} member={member} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

// ── Section 13 ─────────────────────────────────────────────────────────────
const S13_BULLETS = [
  "Progress is visible & published",
  "Use of funds reported quarterly",
  "80G eligible · FCRA",
];

const ArrowCircle = ({ color = "#bf791d", bg = "transparent" }: { color?: string; bg?: string }) => (
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="11.5" cy="11.5" r="10.5" stroke={color} strokeWidth="1.5" fill={bg} />
    <path d="M7.5 11.5h8M13 8.5l3.5 3-3.5 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Section13() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section style={{
      width: "100%", position: "relative",
      height: isMobile ? "auto" : 600,
      minHeight: isMobile ? 480 : "auto",
      overflow: "hidden",
    }}>

      {/* Full-bleed background photo — anchored to bottom */}
      <img
        src={imgS13Bg}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "110%",
          objectFit: "cover",
          objectPosition: "bottom center",
        }}
      />

      {/* Removebg teacher — full width, anchored bottom so figures sit at base */}
      <img
        src={imgS13Teacher}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: isMobile ? "55%" : "75%",
          objectFit: "cover",
          objectPosition: "bottom center",
          pointerEvents: "none",
        }}
      />

      {/* Primary gradient: white top → transparent bottom */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: isMobile
          ? "linear-gradient(to bottom, #ffffff 0%, #ffffff 40%, rgba(255,255,255,0.85) 65%, rgba(255,255,255,0.2) 85%, transparent 100%)"
          : "linear-gradient(to bottom, #ffffff 0%, #ffffff 28%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.1) 68%, transparent 85%)",
        pointerEvents: "none",
      }} />

      {/* Secondary gradient: white left → transparent right */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: isMobile
          ? "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.95) 55%, transparent 100%)"
          : "linear-gradient(to right, #ffffff 0%, #ffffff 32%, rgba(255,255,255,0.6) 50%, transparent 68%)",
        pointerEvents: "none",
      }} />

      {/* Content container */}
      <div style={{
        maxWidth: 1100,
        width: "100%",
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
        padding: isMobile ? "48px 20px 200px" : "60px 28px 40px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        gap: isMobile ? 20 : 28,
        height: isMobile ? "auto" : "100%",
      }}>

        {/* Left column: badge → heading → buttons */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 16 : 20,
          flex: isMobile ? "none" : isTablet ? "0 0 420px" : "0 0 560px",
          width: isMobile ? "100%" : "auto",
        }}>
          {/* Badge pill */}
          <span style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            border: "1px solid #e8e8e8",
            borderRadius: 40,
            padding: "6px 20px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "#bf791d",
            whiteSpace: "nowrap",
            background: "rgba(255,255,255,0.6)",
          }}>
            One Mission · Many Hands ·
          </span>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Lora', serif",
            fontWeight: 600,
            fontSize: isMobile ? 28 : isTablet ? 36 : 48,
            lineHeight: 1.28,
            color: "#000",
            margin: 0,
            textTransform: "capitalize",
          }}>
            One Teacher Started This. Many Can Keep It Going.
          </h2>

          {/* Bullets — inline on mobile */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {S13_BULLETS.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2 8h12M10 4l4 4-4 4" stroke="#bf791d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                    fontSize: 14, lineHeight: "24px", color: "#000",
                  }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 10,
            alignItems: isMobile ? "stretch" : "center",
            marginTop: isMobile ? 4 : 20,
          }}>
            <button className="btn-gold" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
              background: "#bf791d", borderRadius: 30, padding: "12px 24px",
              border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: isMobile ? 15 : 16,
              color: "#fff", whiteSpace: "nowrap",
            }}>
              Donate Now
              <ArrowCircle color="rgba(255,255,255,0.7)" />
            </button>

            <button className="btn-white" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
              background: "#fff", border: "1px solid #bf791d",
              borderRadius: 30, padding: "12px 24px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: isMobile ? 15 : 16,
              color: "#bf791d", whiteSpace: "nowrap",
            }}>
              Join Teacher Network
              <ArrowCircle color="#bf791d" />
            </button>

            <button style={{
              display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 20,
              background: "transparent", border: "none",
              padding: "12px 0", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: isMobile ? 15 : 16,
              color: "#bf791d", whiteSpace: "nowrap",
            }}>
              Partner With Us
              <ArrowCircle color="#bf791d" />
            </button>
          </div>
        </div>

        {/* Right column: description + bullet list — desktop/tablet only */}
        {!isMobile && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            paddingTop: isTablet ? 36 : 44,
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 15, lineHeight: "26px", color: "#636363",
              margin: 0, maxWidth: 380,
            }}>
              What Ujjwala built inside her classroom over 31 years is now a structure that can travel — to other schools, other teachers, and other children who deserve the same quality of care and learning.
            </p>
            {S13_BULLETS.map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2 8h12M10 4l4 4-4 4" stroke="#bf791d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 15,
                  lineHeight: "24px",
                  color: "#000",
                  whiteSpace: "nowrap",
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

// ── Section 14 ─────────────────────────────────────────────────────────────


const S14_SOCIAL = [
  {
    name: "LinkedIn",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="2" y="9" width="4" height="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="4" cy="4" r="2" stroke={color} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 4l16 16M4 20L20 4" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" fill="none" />
        <circle cx="17.5" cy="6.5" r="1" fill={color} />
      </svg>
    ),
  },
];

function SocialIcon({ name, icon }: { name: string; icon: (c: string) => React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const blue = "#2e80d0";
  return (
    <button
      aria-label={name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36, height: 36,
        borderRadius: 8,
        border: hovered ? "none" : `1.5px solid ${blue}`,
        background: hovered ? blue : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.18s, border 0.18s",
        flexShrink: 0,
      }}
    >
      {icon(hovered ? "#fff" : blue)}
    </button>
  );
}

function Section14() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", marginTop: 0 }}>

      {/* Decorative pattern strip */}
      <div style={{
        display: "flex", width: "100%",
        height: isMobile ? 180 : isTablet ? 280 : 524,
        overflow: "hidden", pointerEvents: "none",
      }}>
        <img src={imgS14PatternA} alt="" aria-hidden style={{ flex: "0 0 50%", width: "50%", height: "100%", objectFit: "cover" }} />
        <img src={imgS14PatternB} alt="" aria-hidden style={{ flex: "0 0 50%", width: "50%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Main content box */}
      <div style={{
        maxWidth: 1008,
        margin: isMobile ? "-80px auto 0" : isTablet ? "-220px auto 0" : "-420px auto 0",
        padding: isMobile ? "0 20px 56px" : "0 0 80px",
        position: "relative", zIndex: 2,
        boxSizing: isMobile ? "border-box" : "content-box",
      }}>

        {/* ── Row 1 ── */}
        {isMobile ? (
          // Mobile: fully stacked layout
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

            {/* Text content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{
                display: "inline-flex", alignSelf: "flex-start",
                border: "1px solid #e8e8e8", borderRadius: 40,
                padding: "6px 20px",
                fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 13,
                color: "#bf791d", whiteSpace: "nowrap",
                background: "rgba(255,255,255,0.85)",
              }}>
                About Ujjwal Mam
              </span>
              <h2 style={{
                fontFamily: "'Lora', serif", fontWeight: 600,
                fontSize: 28, lineHeight: 1.28,
                color: "#000", margin: 0, textTransform: "capitalize",
              }}>
                After 31 years, I still feel like a young teacher joined on 5th July, 1995.
              </h2>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                fontSize: 15, lineHeight: "26px", color: "#636363",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <p style={{ margin: 0 }}>Teaching found me because my family had always been teachers. My father, my mother, my grandmother. When I walked into my first government school classroom in 1995, I felt like I was continuing the family legacy.</p>
                <p style={{ margin: 0 }}>I have taught children who could not afford ten rupees for a school fee. I have gone to their homes at night without telling anyone. I have helped families get the documents that opened doors their children would otherwise never have found. I have done all of this because a teacher's job does not end when the bell rings.</p>
                <p style={{ margin: 0 }}>Its selfless service to the powerhouse of my country. No better satisfaction than shaping the bright minds of this country.</p>
              </div>
              {/* Social icons row */}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                {S14_SOCIAL.map(s => <SocialIcon key={s.name} name={s.name} icon={s.icon} />)}
              </div>
            </div>

            {/* Teacher photo */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 32 }}>
              <img
                src={imgS14Teacher}
                alt="Ujjwal Mam"
                style={{ width: "70%", maxWidth: 280, objectFit: "contain", objectPosition: "bottom center" }}
              />
            </div>
          </div>
        ) : (
          // Tablet / Desktop: 3-column layout
          <div style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>

            {/* Left column */}
            <div style={{ flex: isTablet ? "0 0 340px" : "0 0 507px", display: "flex", flexDirection: "column", gap: isTablet ? 24 : 36 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{
                  display: "inline-flex", alignSelf: "flex-start",
                  border: "1px solid #e8e8e8", borderRadius: 40,
                  padding: "6px 20px",
                  fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 13,
                  color: "#bf791d", whiteSpace: "nowrap",
                  background: "rgba(255,255,255,0.85)",
                }}>
                  More about me!
                </span>
                <h2 style={{
                  fontFamily: "'Lora', serif", fontWeight: 600,
                  fontSize: isTablet ? 32 : 48, lineHeight: 1.24,
                  color: "#000", margin: 0, textTransform: "capitalize",
                }}>
                  After 31 Years, I Still Feel Like A Young Teacher
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                  fontSize: 15, lineHeight: "26px", color: "#636363",
                  width: isTablet ? "100%" : 392,
                  display: "flex", flexDirection: "column", gap: 12,
                }}>
                  <p style={{ margin: 0 }}>Teaching found me because my family had always been teachers. My father, my mother, my grandmother. When I walked into my first government school classroom in 1995, I felt like I was continuing the family legacy.</p>
                  <p style={{ margin: 0 }}>I have taught children who could not afford ten rupees for a school fee. I have gone to their homes at night without telling anyone. I have helped families get the documents that opened doors their children would otherwise never have found. I have done all of this because a teacher's job does not end when the bell rings.</p>
                  <p style={{ margin: 0 }}>Its selfless service to the powerhouse of my country. No better satisfaction than shaping the bright minds of this country.</p>
                </div>
              </div>
            </div>

            {/* Center — teacher photo */}
            <div style={{ flex: 1, position: "relative", height: isTablet ? 400 : 560, overflow: "visible" }}>
              <img
                src={imgS14Teacher}
                alt="Ujjwal Mam"
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 0,
                  transform: "translateX(-50%)",
                  height: isTablet ? "100%" : "120%",
                  width: "auto",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                }}
              />
            </div>

            {/* Right column */}
            <div style={{
              flex: isTablet ? "0 0 160px" : "0 0 197px",
              display: "flex", flexDirection: "column",
              justifyContent: "space-between",
              height: isTablet ? 400 : 560,
              paddingTop: 24,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                  fontSize: 15, color: "#000", textAlign: "right", margin: 0,
                }}>
                  Guiding rural generations
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {["12,400+ children taught directly", "31 years in government schools", "150,000+ community who believe in the change"].map(t => (
                    <p key={t} style={{
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                      fontSize: 14, lineHeight: "24px", color: "#636363",
                      textAlign: "right", margin: 0,
                    }}>→ {t}</p>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
                {S14_SOCIAL.map(s => <SocialIcon key={s.name} name={s.name} icon={s.icon} />)}
              </div>
            </div>
          </div>
        )}

        {/* ── Row 2: About Organization ── */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 24 : 68,
          alignItems: isMobile ? "flex-start" : "center",
          paddingTop: isMobile ? 36 : 48,
          marginTop: isMobile ? 24 : 0,
        }}>

          {/* Left: text */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 500,
              fontSize: isMobile ? 16 : 17, color: "#000", margin: 0,
            }}>
              A Trust Built Because One Classroom Was Never Going To Be Enough
            </p>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: isMobile ? 14 : 16, lineHeight: "26px", color: "#636363",
              display: "flex", flexDirection: "column", gap: 2,
            }}>
              <p style={{ margin: 0 }}>For 31 years, I saw bright, curious children slowly grow distant from learning. Not because they were weak, but because the system around them stopped speaking to their life, their struggle, and their reality.</p>
              <p style={{ margin: 0, maxWidth: 394 }}>Shiksha Raj Ujjwal Bharat Foundation was born from that journey — an education-only trust created to carry practical, teacher-led learning into schools and communities that need it most, with full transparency on every contribution and every change it helps bring.</p>
            </div>
          </div>

          {/* Right: photo grid */}
          {isMobile ? (
            <div style={{ display: "flex", gap: 10, width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div style={{ height: 100, background: "#d9d9d9", borderRadius: 10 }} />
                <div style={{ height: 94, background: "#d9d9d9", borderRadius: 10 }} />
              </div>
              <div style={{ flex: 1, background: "#d9d9d9", borderRadius: 10, border: "3px solid #fff", minHeight: 210 }} />
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12, flexShrink: 0, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: isTablet ? 160 : 220, height: 132, background: "#d9d9d9", borderRadius: 12 }} />
                <div style={{ width: isTablet ? 150 : 207, height: 124, background: "#d9d9d9", borderRadius: 12 }} />
              </div>
              <div style={{ width: isTablet ? 160 : 220, height: 292, background: "#d9d9d9", borderRadius: 12, border: "3px solid #fff" }} />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ── Section 16 ─────────────────────────────────────────────────────────────
const S16_SOCIALS: { name: string; icon: (c: string) => React.ReactNode }[] = [
  {
    name: "LinkedIn",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="2" y="9" width="4" height="12" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="4" cy="4" r="2" stroke={c} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 4l16 16M4 20L20 4" stroke={c} strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke={c} strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="4" stroke={c} strokeWidth="1.8" fill="none" />
        <circle cx="17.5" cy="6.5" r="1" fill={c} />
      </svg>
    ),
  },
];

function S16SocialBtn({ name, icon }: { name: string; icon: (c: string) => React.ReactNode }) {
  const [hov, setHov] = useState(false);
  const blue = "#2e80d0";
  return (
    <button
      aria-label={name}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        border: hov ? "none" : `1.5px solid ${blue}`,
        background: hov ? blue : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.18s, border 0.18s",
      }}
    >
      {icon(hov ? "#fff" : blue)}
    </button>
  );
}

function SectionVolunteerForm() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.purpose.trim()) newErrors.purpose = "Please select a purpose";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("volunteer_submissions")
        .insert([{
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          purpose: formData.purpose,
          message: formData.message,
        }]);

      if (error) throw error;
      setIsSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      // Fallback success if table doesn't exist yet for local testing
      alert("Note: If 'volunteer_submissions' table is missing in Supabase, this will fail. Showing success state for demonstration.");
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const INPUT_STYLE = {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(2px)",
    border: "1px solid #885615",
    borderRadius: 12,
    height: 48,
    padding: "0 15px",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    width: "100%",
    boxSizing: "border-box" as const,
    outline: "none",
  };

  const ERROR_STYLE = {
    color: "#ffcdd2",
    fontSize: 12,
    fontFamily: "'DM Sans', sans-serif",
    marginTop: 4,
  };

  return (
    <section id="volunteer-form" ref={sectionRef} className="fade-in-up" style={{
      width: "100%",
      background: "linear-gradient(to right, #714001, #965e00)",
      padding: isMobile ? "60px 0" : "80px 0",
      position: "relative",
      borderRadius: 30,
      overflow: "hidden",
    }}>
      {/* Background SVG map decoration */}
      <img 
        src={s16_map_bg} 
        alt="" 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-10%, -50%)",
          height: 503,
          width: 755,
          pointerEvents: "none",
          zIndex: 0,
        }} 
      />

      <div style={{ maxWidth: 1008, margin: "0 auto", padding: "0 16px", boxSizing: "border-box", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          alignItems: isMobile || isTablet ? "flex-start" : "center",
          gap: isMobile ? 48 : 44,
        }}>

          {/* Left Text Column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
              <div style={{ border: "1px solid #ae6e1a", borderRadius: 40, padding: "6px 20px" }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#fff", margin: 0 }}>
                  Teacher-Led · Education-Only · Transparent
                </p>
              </div>
              <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 32 : 44, lineHeight: 1.28, color: "#fff", margin: 0, maxWidth: 500 }}>
                One Teacher Started This Lorem Many Can Keep It Going.
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Progress is visible & published",
                "Use of funds reported quarterly",
                "80G eligible · FCRA registered"
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, color: "#fff", margin: 0 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form Column */}
          {isSuccess ? (
            <div style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid #885615",
              borderRadius: 20,
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: isMobile ? "100%" : 424,
              minHeight: 350,
              boxSizing: "border-box"
            }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#4caf50", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h3 style={{ fontFamily: "'Lora', serif", color: "#fff", fontSize: 24, margin: "0 0 10px 0" }}>Thank You!</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0", fontSize: 16, margin: 0, lineHeight: 1.5 }}>
                Your submission has been successfully received. We will get back to you shortly.
              </p>
            </div>
          ) : (
            <div style={{ flex: "0 0 auto", width: isMobile ? "100%" : 424, display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                
                {/* Name */}
                <div style={{ width: "100%" }}>
                  <input
                    placeholder="Tell us your name"
                    style={{ ...INPUT_STYLE, border: errors.name ? "1px solid #ef5350" : INPUT_STYLE.border }}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <div style={ERROR_STYLE}>{errors.name}</div>}
                </div>

                {/* Phone & Email */}
                <div style={{ display: "flex", gap: 12, width: "100%", flexDirection: isMobile ? "column" : "row" }}>
                  <div style={{ flex: 1 }}>
                    <input
                      placeholder="Number for a quick call"
                      style={{ ...INPUT_STYLE, border: errors.phone ? "1px solid #ef5350" : INPUT_STYLE.border }}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <div style={ERROR_STYLE}>{errors.phone}</div>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      placeholder="Drop your email ID"
                      style={{ ...INPUT_STYLE, border: errors.email ? "1px solid #ef5350" : INPUT_STYLE.border }}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <div style={ERROR_STYLE}>{errors.email}</div>}
                  </div>
                </div>

                {/* Dropdown Purpose */}
                <div style={{ width: "100%" }}>
                  <div style={{ position: "relative" }}>
                    <select
                      style={{ 
                        ...INPUT_STYLE, 
                        border: errors.purpose ? "1px solid #ef5350" : INPUT_STYLE.border,
                        appearance: "none",
                        color: formData.purpose ? "#fff" : "rgba(255,255,255,0.7)",
                        cursor: "pointer"
                      }}
                      value={formData.purpose}
                      onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                    >
                      <option value="" disabled>Joining for Lorem ipsum is simply?</option>
                      <option value="Volunteer" style={{ color: "#000" }}>Volunteer Work</option>
                      <option value="Donation" style={{ color: "#000" }}>Make a Donation</option>
                      <option value="Partnership" style={{ color: "#000" }}>Corporate Partnership</option>
                      <option value="Other" style={{ color: "#000" }}>Other Inquiry</option>
                    </select>
                    <div style={{ position: "absolute", right: 15, top: 14, pointerEvents: "none" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>
                  {errors.purpose && <div style={ERROR_STYLE}>{errors.purpose}</div>}
                </div>

                {/* Message */}
                <div style={{ width: "100%" }}>
                  <textarea
                    placeholder="What are you looking for?"
                    style={{ ...INPUT_STYLE, height: 123, padding: "15px", resize: "none", border: errors.message ? "1px solid #ef5350" : INPUT_STYLE.border }}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <div style={ERROR_STYLE}>{errors.message}</div>}
                </div>

              </div>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  background: "#0f2a44",
                  borderRadius: 30,
                  padding: "12px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  width: "fit-content",
                  alignSelf: "flex-start",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", whiteSpace: "nowrap" }}>
                  {isSubmitting ? "Submitting..." : "Join Ujjwala’s Mission"}
                </span>
                {!isSubmitting && (
                  <div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-45deg)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Section16() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0 56px" : "72px 0 80px" }}>
      <style>{`
        .s16-grid { display: flex; gap: 48px; align-items: flex-start; }
        .s16-left { flex: 0 0 auto; width: 240px; display: flex; flex-direction: column; gap: 20px; padding-top: 24px; }
        .s16-right { flex: 1; display: flex; flex-direction: column; gap: 17px; min-width: 0; }
        .s16-row { display: flex; gap: 17px; align-items: stretch; }
        .s16-img-wrap { position: relative; border-radius: 17px; overflow: hidden; border: 0.866px solid #a1a1a1; flex-shrink: 0; }
        .s16-placeholder { border-radius: 14px; background: #d9d9d9; flex-shrink: 0; }
        @media (max-width: 860px) {
          .s16-grid { flex-direction: column; gap: 32px; }
          .s16-left { width: 100%; padding-top: 0; }
        }
      `}</style>

      <div style={{ maxWidth: 1008, margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: isMobile ? 10 : 32,
          marginBottom: isMobile ? 28 : 44,
        }}>
          <span style={{
            display: "inline-flex", flexShrink: 0,
            border: "1px solid #e8e8e8", borderRadius: 40,
            padding: "6px 20px",
            fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 13,
            color: "#bf791d", whiteSpace: "nowrap",
          }}>
            In my words
          </span>
          <h2 style={{
            fontFamily: "'Lora', serif", fontWeight: 600,
            fontSize: isMobile ? 26 : "clamp(28px, 4vw, 40px)", lineHeight: 1.36,
            color: "#000", margin: 0, textTransform: "capitalize",
            textAlign: isMobile ? "left" : "right",
          }}>
            See The Work, Feel The Journey
          </h2>
        </div>

        {/* ── Body ── */}
        <div className="s16-grid">

          {/* Left — description + social icons */}
          <div className="s16-left">
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 15, lineHeight: "26px", color: "#636363",
              margin: 0,
            }}>
              The full stories, lessons, and lived moments continue across every channel I share.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {S16_SOCIALS.map((s) => (
                <S16SocialBtn key={s.name} name={s.name} icon={s.icon} />
              ))}
            </div>
          </div>

          {/* Right — image grid */}
          {isMobile || isTablet ? (
            // Mobile/Tablet: simple 2-column grid with objectFit cover
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #a1a1a1", height: 170 }}>
                <img src={imgS16Youtube} alt="YouTube channel" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }} />
              </div>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #a1a1a1", height: 170 }}>
                <img src={imgS16Instagram} alt="Instagram profile" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
              </div>
              <div style={{ borderRadius: 14, background: "#d9d9d9", height: 150 }} />
              <div style={{ borderRadius: 14, background: "#d9d9d9", height: 150 }} />
            </div>
          ) : (
            // Desktop: original absolute-positioned layout
            <div className="s16-right">
              {/* Row 1 — real screenshots */}
              <div className="s16-row">
                <div className="s16-img-wrap" style={{ flex: "0 0 calc(53% - 8.5px)", height: 200 }}>
                  <img
                    src={imgS16Youtube}
                    alt="YouTube channel"
                    style={{ position: "absolute", width: "118.06%", height: "120%", left: 0, top: "-12.5%", objectFit: "cover" }}
                  />
                </div>
                <div className="s16-img-wrap" style={{ flex: "1 1 0", height: 200 }}>
                  <img
                    src={imgS16Instagram}
                    alt="Instagram profile"
                    style={{ position: "absolute", width: "187.12%", height: "162.28%", left: "-42.88%", top: "-18.81%", objectFit: "cover" }}
                  />
                </div>
              </div>
              {/* Row 2 — placeholders */}
              <div className="s16-row">
                <div className="s16-placeholder" style={{ flex: "0 0 calc(39% - 8.5px)", height: 215 }} />
                <div className="s16-placeholder" style={{ flex: "1 1 0", height: 215 }} />
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

// ── Section 17 ─────────────────────────────────────────────────────────────
const S17_FAQS = [
  // About Ujjwala
  {
    q: "Who is Ujjwala Sharma and what does she do?",
    a: "Ujjwala Sharma is a government school teacher from Rajasthan with 31 years of experience. She teaches children who come from the most marginalised communities — families of daily-wage labourers, farmers, and migrant workers. She has built a full learning ecosystem inside her classroom: libraries, science kits, art corners, and child-led activities — all without requesting additional government funds.",
  },
  {
    q: "Is this a registered organisation?",
    a: "Yes. The work operates under Shiksha Raj, a registered trust that provides the legal and financial structure for receiving donations and managing the programme transparently.",
  },
  {
    q: "Why is she called Ujjwala Bharat Foundation?",
    a: "Ujjwala Bharat Foundation is the public-facing identity of her mission — named after her personal belief that a truly bright (Ujjwala) India begins with educating every child with dignity. The foundation reflects her long-term vision beyond a single classroom.",
  },
  // Support, Donations & Transparency
  {
    q: "Where does the donated money go?",
    a: "Every rupee donated is used directly for: classroom materials (books, stationery, science tools), child nutrition (mid-day meal supplements), infrastructure for the learning library, and teacher-community outreach events. No amount is used for admin salaries or overhead. A monthly expense report is shared with donors.",
  },
  {
    q: "How transparent is the use of funds?",
    a: "Complete receipts and utilisation reports are shared with every donor. You will receive a donation receipt, a quarterly impact report, and access to real-time updates via our WhatsApp donor group. We believe your trust is earned — not assumed.",
  },
  {
    q: "Can I donate in kind instead of cash?",
    a: "Yes! Books, stationery, science kits, art supplies, and sports equipment are always welcome. Please reach out via the contact form or WhatsApp to coordinate a kind donation. We will confirm the items needed and arrange logistics.",
  },
  // Participation
  {
    q: "Can I volunteer with Ujjwala's programme?",
    a: "Yes. We welcome volunteers who can contribute in areas like: teaching support or tutoring, content creation (writing, photography, video), fundraising or community outreach, and digital skills or IT support. Fill in the volunteer form on this page and our team will reach out within 5 working days.",
  },
  {
    q: "Can organisations partner with this programme?",
    a: "Absolutely. We are open to partnerships with CSR arms, educational NGOs, media organisations, and government bodies. A partnership can be in the form of funding, content collaboration, infrastructure support, or programme co-design. Write to us at the contact address shared on this page.",
  },
  // Programmes & Scale
  {
    q: "What age group does the programme serve?",
    a: "The programme currently serves children between the ages of 6 and 14 — Classes 1 through 8. These are the foundational years where learning habits, curiosity, and self-worth are shaped. Reaching children at this stage is the most impactful intervention possible.",
  },
  {
    q: "Does Ujjwala train other teachers too?",
    a: "Yes. A core part of the long-term mission is to train government school teachers across Rajasthan using the same methods Ujjwala developed over 31 years. Workshops, peer-learning sessions, and digital training modules are being developed as part of this scale plan.",
  },
  {
    q: "How many children has this programme reached?",
    a: "Over the past 31 years, Ujjwala has directly impacted 1,400+ children through her classroom. With the structured Shiksha Raj model, the goal is to reach 10,000 children across 50 government schools in the next 3 years through teacher training and resource distribution.",
  },
];

function S17AccordionItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ width: "100%" }}>
      {open ? (
        /* ── Open state ── */
        <div
          onClick={onToggle}
          className="s17-accordion-open"
          style={{
            background: "#f9f2e8",
            border: "1px solid #ebd5b9",
            borderRadius: 20,
            padding: 28,
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
            <p className="s17-accordion-q-open" style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              fontSize: 17, lineHeight: "26px", color: "#bf791d",
              margin: 0, flex: 1,
            }}>{q}</p>
            {/* Chevron up */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M6 15l6-6 6 6" stroke="#bf791d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="s17-accordion-a" style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
            fontSize: 15, lineHeight: "26px", color: "#727272",
            margin: 0,
          }}>{a}</p>
        </div>
      ) : (
        /* ── Closed state ── */
        <div
          onClick={onToggle}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 16, cursor: "pointer",
            borderBottom: "1px solid #ebebeb",
            paddingBottom: 20,
          }}
        >
          <p className="s17-accordion-q-closed" style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
            fontSize: 16, lineHeight: "28px", color: "#000",
            margin: 0, flex: 1,
          }}>{q}</p>
          {/* Chevron down */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M6 9l6 6 6-6" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

function Section17() {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIdx(prev => (prev === i ? null : i));

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0" : "80px 0" }}>
      <style>{`
        .s17-wrap { display: flex; gap: 60px; align-items: flex-start; }
        .s17-left { flex: 0 0 316px; padding-top: 20px; display: flex; flex-direction: column; gap: 20px; }
        .s17-right { flex: 1; display: flex; flex-direction: column; gap: 29px; min-width: 0; }
        @media (max-width: 720px) {
          .s17-wrap { flex-direction: column; gap: 28px; }
          .s17-left { flex: none; width: 100%; padding-top: 0; }
          .s17-right { gap: 20px; }
          .s17-accordion-open { padding: 20px !important; }
          .s17-accordion-q-open { font-size: 15px !important; }
          .s17-accordion-a { font-size: 14px !important; }
          .s17-accordion-q-closed { font-size: 15px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1008, margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>
        <div className="s17-wrap">

          {/* Left — label + heading */}
          <div className="s17-left">
            <span style={{
              display: "inline-flex", alignSelf: "flex-start",
              border: "1px solid #e8e8e8", borderRadius: 40,
              padding: "6px 20px",
              fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 13,
              color: "#bf791d", whiteSpace: "nowrap",
            }}>
              FAQs
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600,
              fontSize: "clamp(30px, 3.5vw, 40px)", lineHeight: 1.24,
              color: "#000", margin: 0,
            }}>
              Before You Walk Further
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 15, lineHeight: "26px", color: "#636363",
              margin: 0,
            }}>
              From donations to teaching to transparency, here are the answers that bring more clarity.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="s17-right">
            {S17_FAQS.map((faq, i) => (
              <S17AccordionItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openIdx === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Section 18 ─────────────────────────────────────────────────────────────
// Words + their weight — bold for key phrases, light for connective words
const S18_WORDS: { word: string; weight: 400 | 600 }[] = [
  { word: "Let's",       weight: 400 },
  { word: "Rethink",     weight: 600 },
  { word: "Education",   weight: 600 },
  { word: "Together",    weight: 400 },
];

function Section18() {
  const sectionRef = useFadeInUp();
  const textRef = useTextReveal();
  const isMobile = useIsMobile();

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "56px 0 52px" : "100px 0 96px" }}>
      <div style={{
        maxWidth: 1008,
        margin: "0 auto",
        padding: "0 24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? 32 : 48,
      }}>

        {/* Scroll-reveal heading */}
        <p
          ref={textRef}
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "clamp(22px, 4.5vw, 52px)",
            lineHeight: 1.28,
            textAlign: "center",
            margin: 0,
            maxWidth: 960,
            width: "100%",
            boxSizing: "border-box",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {S18_WORDS.map(({ word, weight }, i) => (
            <span
              key={i}
              className="trw"
              style={{ fontWeight: weight, marginRight: "0.28em", display: "inline" }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* CTA buttons */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 12 : 20,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          width: isMobile ? "100%" : "auto",
        }}>
          <button className="btn-gold" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
            background: "#bf791d", border: "none",
            borderRadius: 30, padding: "12px 24px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16,
            color: "#fff", cursor: "pointer", whiteSpace: "nowrap",
            width: isMobile ? "100%" : "auto",
          }}>
            I Commit To Education
            <ArrowIcon color="#fff" size={16} />
          </button>

          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
            background: "transparent", border: "1px solid #bf791d",
            borderRadius: 30, padding: "12px 24px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16,
            color: "#bf791d", cursor: "pointer", whiteSpace: "nowrap",
            width: isMobile ? "100%" : "auto",
          }}>
            Join Ujjwala's Mission
            <ArrowIcon color="#bf791d" size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
// ── Page ──────────────────────────────────────────────────────────────────
export function HomeV2Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column", alignItems: "stretch", overflowX: "clip" }}>
      <style>{GLOBAL_CSS}</style>
      <HeroSection />
      <ProgramBanner />
      <Section18 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <IntroNGOSection />
      <Section8 />
      <Section9 />
      <Section10 />
      <Section12 />
      <SectionHonestImpact />
      <Section13 />
      <Section14 />
      <Section15 />
      <SectionVolunteerForm />
      <Section16 />
      <Section17 />
      <Section18 />
      <Footer />
    </div>
  );
}
