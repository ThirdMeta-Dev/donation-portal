/**
 * HomeV2Page — Figma-accurate (node 280:5999 + 294:94 section 5).
 * Sections: Hero, ProgramBanner, S2 (scroll-reveal), S3 (carousel),
 *           S4 (full-bleed cards), S5 (Beyond Syllabus accordion, 294:94)
 */
import { Link } from "react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "../components/SiteNavbar";
import { Footer } from "../components/SiteFooter";

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
  from { opacity:0; transform:translateY(40px); }
  to   { opacity:1; transform:translateY(0); }
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
    <div style={{ position: "relative", width: 225.924, height: 97 }}>
      <img src={imgStatBg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill" }} />
      <ul style={{ position: "absolute", left: 8, top: 11, width: 198, fontStyle: "italic", fontSize: 14, color: "#f9c56d", fontFamily: "'DM Sans', sans-serif", lineHeight: "25px", listStyle: "disc", paddingLeft: 21, margin: 0 }}>
        <li style={{ fontWeight: 500 }}>Ujjwala Wadekar</li>
        <li><span style={{ fontWeight: 500 }}>31 yrs</span><span style={{ fontWeight: 300 }}> Teaching Experience</span></li>
        <li><span style={{ fontWeight: 500 }}>12,400+</span><span style={{ fontWeight: 300 }}> Children Reached</span></li>
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
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", height: isMobile ? "100%" : 724, overflow: "hidden" }}>
          {/* Hero image — hidden on mobile, positioned on tablet/desktop */}
          {!isMobile && (
            <div style={{ position: "absolute", left: isTablet ? "50%" : 645, top: 0, width: isTablet ? "60%" : 646, height: 632, overflow: "hidden" }}>
              <img src={imgHero} alt="" style={{ width: "155.42%", height: "100%", objectFit: "cover", objectPosition: "left center", maxWidth: "none", position: "absolute", left: "-55.42%" }} />
            </div>
          )}
          {/* Left gradients ×7 — stacked to create a strong dark-left fade (matches Figma) */}
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: isMobile ? "100%" : 632, background: isMobile ? "linear-gradient(to bottom, #0b223a 60%, rgba(11,34,58,0.8) 100%)" : "linear-gradient(to right, rgba(11,34,58,1) 0%, rgba(11,34,58,0) 100%)" }} />
          ))}
          {/* Right gradient — starts transparent at x=830 (right side of image), fades to dark at right edge */}
          {!isMobile && (
            <div style={{ position: "absolute", top: 0, left: 830, right: 0, height: 687, background: "linear-gradient(to right, rgba(11,34,58,0) 0%, rgba(11,34,58,1) 100%)" }} />
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
                  A Teacher's Work,<br />Scaled Into a Public
                </h1>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "rgba(255,255,255,0.8)", margin: 0 }}>
                  Short explanation that Hexanovate powers two lorem ips specialized domains is simply
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Link to="/donate" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                  <button className="btn-gold" style={{ display: "flex", alignItems: "center", gap: 12, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.3)" }}>
                    Donate Now <ArrowIcon />
                  </button>
                </Link>
                <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: 0 }}>
                  <span className="arrow-bounce"><svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M9 15l-5-5M9 15l5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  Problems we are working on
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
                  <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 500, fontSize: isTablet ? 36 : 48, lineHeight: 1.2, color: "#fff", textTransform: "capitalize", width: isTablet ? "100%" : 455, margin: 0 }}>
                    {"A Teacher's Work, "}<br />{"Scaled Into a Public"}
                  </h1>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <Link to="/donate" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                    <button className="btn-gold" style={{ display: "flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.3)" }}>
                      Donate Now <ArrowIcon />
                    </button>
                  </Link>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, padding: 0 }}>
                    <span className="arrow-bounce"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M9 15l-5-5M9 15l5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    Problems we are working on
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 36, alignItems: "flex-end", width: isTablet ? "40%" : 245, flexShrink: 0, position: "relative", zIndex: 2 }}>
                {!isTablet && <VideoCards />}
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "22px", color: "#fff", textAlign: "right", maxWidth: 245, margin: 0 }}>
                  Short explanation that Hexanovate powers two lorem ips specialized domains is simply
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
  const items = ["Monthly workshops (in-person, Jalgaon)", "Access to shared lesson resource library", "Peer mentoring circles"];
  return (
    <div ref={ref} className="fade-in-up" style={{
      width: isMobile ? "97%" : "100%",
      position: "relative",
      zIndex: 10,
      background: "linear-gradient(-79.93deg, #b77607 0.12%, #885615 99.88%)",
      borderRadius: isMobile ? 16 : 30,
      margin: isMobile ? "-32px auto 0" : undefined,
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
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: isMobile ? 16 : 18, margin: 0 }}>Name of the Program 4</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 14 : 15, lineHeight: "24px", margin: 0 }}>
              Join the Teacher Reformers Network — a community of 340+ teachers sharing methods, resources, and practical innovations.
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

        {/* "Join Teacher Network" button */}
        <div style={isMobile ? { marginTop: 20 } : { position: "absolute", right: 24, bottom: 24 }}>
          <button
            onMouseEnter={e => { e.currentTarget.style.background = "#AE6E1A"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#bf791d"; }}
            style={{
              display: "flex", alignItems: "center", gap: isMobile ? 12 : 20,
              background: "#bf791d", borderRadius: 20, padding: isMobile ? "10px 20px" : "10px 24px",
              border: "none", cursor: "pointer", color: "#fff",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: isMobile ? 14 : 16, whiteSpace: "nowrap",
              position: isMobile ? "static" : "relative", top: isMobile ? undefined : 41,
              width: isMobile ? "100%" : undefined, justifyContent: isMobile ? "center" : undefined,
              transition: "background 0.18s ease",
            }}>
            Join Teacher Network <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Section 2: Scroll text-reveal ─────────────────────────────────────────
const S2_TEXT = "We unlock scale by fixing what's leaking conversion, retention, repeat so growth lorem";

function Section2() {
  const sectionRef = useFadeInUp();
  const textRef = useTextReveal();
  const isMobile = useIsMobile();
  const words = S2_TEXT.split(" ");
  return (
    <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "48px 20px" : "80px 96px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 28 : 48, alignItems: "center", width: "100%" }}>
          <div style={{ textAlign: "center", width: "100%", maxWidth: 960 }}>
            <p ref={textRef} style={{ margin: 0, fontSize: isMobile ? 28 : 52, lineHeight: 1.28, fontFamily: "'Lora', serif", fontWeight: 700 }}>
              {words.map((word, i) => (<span key={i} className="trw">{word}{" "}</span>))}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 20, alignItems: isMobile ? "stretch" : "center", width: isMobile ? "100%" : undefined }}>
            <button className="btn-gold" style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : undefined, gap: 12, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: isMobile ? 15 : 16, whiteSpace: "nowrap" }}>
              About Ujjwala <ArrowIcon />
            </button>
            <button
              onMouseEnter={e => { e.currentTarget.style.background = "#F9F2E8"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : undefined, gap: 12, background: "transparent", borderRadius: 30, padding: "12px 24px", border: "1px solid #bf791d", cursor: "pointer", color: "#bf791d", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: isMobile ? 15 : 16, whiteSpace: "nowrap", transition: "background 0.18s ease" }}>
              Join Ujjwala's Mission <ArrowIcon color="#bf791d" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section 3: Image Carousel ─────────────────────────────────────────────
const S3_SLIDES = [
  { img: imgCarousel1, caption: "When a family is choosing between food and fees, education starts to feel like a luxury." },
  { img: imgHero,      caption: "Ujjwala Wadekar has reached 12,400+ children across 120 schools in Jalgaon." },
  { img: imgCarousel1, caption: "340+ teachers have joined the Shiksha Raj reformers network and changed classrooms." },
  { img: imgHero,      caption: "Every lesson delivered by a trained teacher is a lifetime impact on a child." },
  { img: imgCarousel1, caption: "Art, Science & Literature — taken beyond the textbook into the real world." },
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
      {/* Prev — white fill, navy border, navy chevron */}
      <button onClick={prev} style={{ width: size, height: size, borderRadius: "50%", background: "#fff", border: "1px solid #174067", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
        <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="#174067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {/* Next — navy fill, white chevron */}
      <button onClick={next} style={{ width: size, height: size, borderRadius: "50%", background: "#174067", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
        <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
                Choose How You Want To Help <ArrowIcon size={13} />
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
                Choose How You Want To Help <ArrowIcon size={16} />
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
      <button onClick={prevSlide} style={{ width: 44, height: 44, borderRadius: 30, border: "1px solid #174067", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(23,64,103,0.08)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 5L7 10L12 15" stroke="#174067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button onClick={nextSlide} style={{ width: 44, height: 44, borderRadius: 30, background: "#174067", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5L13 10L8 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );

  // Mobile/tablet: stacked layout
  if (isMobile || isTablet) {
    return (
      <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#f8f5ef", paddingTop: isMobile ? 40 : 48, paddingBottom: isMobile ? 40 : 48, overflow: "hidden" }}>
        <div style={{ padding: isMobile ? "0 20px 24px" : "0 32px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "inline-flex", alignItems: "center", padding: "6px 20px", borderRadius: 40, border: "1px solid #e8e8e8", alignSelf: "flex-start" }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>On the Ground</span>
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 28 : 36, lineHeight: 1.24, color: "#000", margin: 0 }}>Media & Recognitions</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "24px", color: "#686868", margin: 0 }}>Find your role and see exactly what it means, what you get, and what your next step is.</p>
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
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d", whiteSpace: "nowrap" }}>On the Ground</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 44, lineHeight: 1.24, color: "#000", margin: 0, textTransform: "capitalize" }}>Media &amp; Recognitions</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "24px", color: "#686868", margin: 0 }}>Find your role and see exactly what it means, what you get, and what your next step is.</p>
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
  { id: "see",  label: "See lorem ipsum is",  body: "We unlock scale by fixing what's leaking lorem is conversion, retention, repeat simply We unlock scale by fixing", sepWidth: 220 },
  { id: "hear", label: "Hear lorem ipsum is", body: "Hear the stories that shaped the mission — teachers, students, and communities speaking for themselves.", sepWidth: 177 },
  { id: "read", label: "Read lorem ipsu",     body: "Read reports, research and on-ground data from Ujjwala Wadekar's 31-year mission across Jalgaon.", sepWidth: 177 },
  { id: "do",   label: "Do lorem ipsu",       body: "Join hands — donate, volunteer, or partner with us to extend the reach of quality education.", sepWidth: 0 },
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

  const hPad = isMobile ? 20 : isTablet ? 32 : 260;

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
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>Beyond Syllabus</span>
              </div>
            </div>
            <div style={{ width: isMobile ? "100%" : isTablet ? "100%" : 657 }}>
              <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 26 : isTablet ? 30 : 36, lineHeight: 1.32, color: "#000", textTransform: "capitalize", margin: 0 }}>
                Beyond Syllabus simply{"\n"}We unlock scale by fixing dum{"\n"}text of the
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div style={{ paddingLeft: isMobile ? 0 : hPad, paddingTop: isMobile ? 24 : 44 }}>
            <div style={{ width: isMobile ? "100%" : isTablet ? "100%" : 562, display: "flex", flexDirection: "column" }}>
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
            Testimonial Lorem Ipsum
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 14 : 16, lineHeight: "22px", color: "#686868", margin: 0, width: isMobile ? "100%" : 206, textAlign: isMobile ? "left" : "right" }}>
            Find your role and see exactly what it means, what you get, and what your
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
          We Unlock Scale By Fixing What's Leaking Conversion, Retention Repeat
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
            Short explanation that Hexanovate powers two lorem ips specialized domains is simply
          </p>

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, width: isMobile ? "100%" : undefined }}>
            <Link to="/join" style={{
              display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : undefined,
              gap: 12, padding: "12px 24px", borderRadius: 30,
              border: "1px solid #bf791d", background: "transparent",
              textDecoration: "none", cursor: "pointer",
            }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: isMobile ? 15 : 16, color: "#bf791d", whiteSpace: "nowrap" }}>Join Ujjwala's Mission</span>
              <ArrowIcon color="#bf791d" />
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

type S8Card = {
  id: string;
  tabIndex: number;
  programName: string;
  title: string;
  desc: string;
  bullets: string[];
  photo: string;
};

const SECTION_8_TABS = ["Program 1", "Program 2", "Program 3", "Program 4"];

const S8_PHOTOS = [imgS8Teacher, imgTeacher, imgCarousel1];

const S8_CARDS_DATA = [
  {
    programName: "Teacher Reformers Network",
    title: "Community & Collaboration",
    desc: "Join a community of 340+ teachers sharing methods, resources, and practical classroom innovations across districts.",
    bullets: ["Monthly workshops (in-person, Jalgaon)", "Access to shared lesson resource library", "Peer mentoring circles"],
  },
  {
    programName: "Digital Learning Initiative",
    title: "Technology in Classrooms",
    desc: "Equip students with 21st-century digital skills through hands-on labs, coding bootcamps, and structured tech curriculum.",
    bullets: ["Weekly coding & STEM labs", "Device lending program for students", "Digital literacy certification"],
  },
  {
    programName: "Parent Engagement Program",
    title: "Home–School Connection",
    desc: "Bridge the gap between home and school with structured parent sessions, communication tools, and involvement frameworks.",
    bullets: ["Bi-monthly parent-teacher forums", "Multilingual resource kits", "Family learning workshops"],
  },
  {
    programName: "Science Exploration Labs",
    title: "Hands-On Science Learning",
    desc: "Spark curiosity through guided experiments, science fairs, and a rotating mobile lab that visits partner schools.",
    bullets: ["Monthly mobile science lab visits", "Student-led experiment competitions", "Teacher training in inquiry-based learning"],
  },
  {
    programName: "Reading Champions",
    title: "Literacy & Language",
    desc: "Build strong readers through structured literacy programs, book clubs, and partnerships with local libraries and publishers.",
    bullets: ["Daily guided reading circles", "Take-home book library access", "Storytelling & drama integration"],
  },
  {
    programName: "Girls STEM Scholars",
    title: "Gender-Inclusive Education",
    desc: "Encourage girls in underserved areas to pursue STEM through mentorship, scholarships, and role-model sessions.",
    bullets: ["Quarterly STEM career workshops", "Female mentor matching program", "Annual scholarship awards"],
  },
  {
    programName: "Early Childhood Program",
    title: "Foundation Years Support",
    desc: "Invest in the earliest years with play-based learning kits, anganwadi partnerships, and caregiver education sessions.",
    bullets: ["Play-based curriculum kits for ages 3–6", "Caregiver training sessions", "Nutritional awareness workshops"],
  },
  {
    programName: "Sports for Development",
    title: "Health, Teamwork & Resilience",
    desc: "Use structured sports programs to build physical health, leadership, and teamwork in primary and secondary students.",
    bullets: ["After-school sports leagues", "Coach training & certification", "Inter-school tournaments"],
  },
  {
    programName: "Scholarship & Awards",
    title: "Recognising Excellence",
    desc: "Reward academic achievement and community contributions through annual scholarships, medals, and recognition events.",
    bullets: ["Annual merit-based scholarships", "Community contribution awards", "Public recognition ceremonies"],
  },
  {
    programName: "Vocational Skill Builders",
    title: "Career Readiness",
    desc: "Prepare secondary students for the workforce with practical vocational training aligned to local industry needs.",
    bullets: ["Trades & crafts certification courses", "Industry visit & internship program", "Resume & interview workshops"],
  },
  {
    programName: "Mental Health & Wellbeing",
    title: "Whole-Child Care",
    desc: "Support students' emotional health with trained counsellors, mindfulness sessions, and teacher wellbeing resources.",
    bullets: ["On-site counsellor visits (fortnightly)", "Mindfulness & resilience curriculum", "Teacher burnout prevention workshops"],
  },
  {
    programName: "Village Library Network",
    title: "Access to Knowledge",
    desc: "Establish and sustain village-level libraries stocked with curated books, digital devices, and learning materials.",
    bullets: ["200+ books per village library", "Weekly librarian volunteer program", "Digital e-reader lending"],
  },
];

const SECTION_8_CARDS: S8Card[] = S8_CARDS_DATA.map((data, i) => ({
  id: `s8-card-${i}`,
  tabIndex: Math.floor(i / 3),
  photo: S8_PHOTOS[i % S8_PHOTOS.length],
  ...data,
}));

function Section8() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperAbsTopRef = useRef<number>(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  const TOTAL = SECTION_8_CARDS.length;
  const STEP = 320;
  const RUNWAY = TOTAL * STEP;
  const N_PHOTOS = S8_PHOTOS.length;

  // Store wrapper absolute top once after mount (for stable tab-click scrolling)
  useEffect(() => {
    const compute = () => {
      if (wrapperRef.current) {
        wrapperAbsTopRef.current = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };
    requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Scroll-driven card index update
  useEffect(() => {
    if (isMobile || isTablet) return;
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const scrolled = Math.max(0, -wrapperRef.current.getBoundingClientRect().top);
      setCardIndex(Math.min(Math.floor(scrolled / STEP), TOTAL - 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, isTablet, TOTAL, STEP]);

  // Reset photo index on card change; auto-advance carousel
  useEffect(() => { setPhotoIdx(0); }, [cardIndex]);
  useEffect(() => {
    const t = setInterval(() => setPhotoIdx(i => (i + 1) % N_PHOTOS), 3000);
    return () => clearInterval(t);
  }, [cardIndex, N_PHOTOS]);

  const activeTab = Math.floor(cardIndex / 3);
  const currentCard = SECTION_8_CARDS[cardIndex];

  const handleTabClick = (tabIdx: number) => {
    if (isMobile || isTablet) { setCardIndex(tabIdx * 3); return; }
    setCardIndex(tabIdx * 3); // immediate UI update fixes forward-click lag
    window.scrollTo({ top: wrapperAbsTopRef.current + tabIdx * 3 * STEP, behavior: "smooth" });
  };

  const S8Arrow = ({ color = "#174067" }: { color?: string }) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2.91 7H11.08" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 2.91L11.08 7L7 11.08" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // ── Mobile / Tablet ──────────────────────────────────────────────────────────
  if (isMobile || isTablet) {
    return (
      <div style={{ width: "100%", background: "#fff", padding: isMobile ? "40px 20px 48px" : "48px 32px 60px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 26 : 34, lineHeight: 1.28, color: "#000", margin: 0 }}>What the Trust Builds Ground</h2>
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 40, padding: "5px 16px", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#bf791d" }}>On the Ground</span>
            </div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#686868", margin: 0 }}>
            Find your role and see exactly what it means, what you get, and what your next step is. lorem ipsum is simply dummy text
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {SECTION_8_TABS.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button key={idx} onClick={() => handleTabClick(idx)} style={{
                background: isActive ? "#174067" : "transparent", border: "1px solid #174067", borderRadius: 40,
                padding: "7px 18px", color: isActive ? "#fff" : "#174067",
                fontFamily: "'Poppins', sans-serif", fontSize: 13, cursor: "pointer",
              }}>{tab}</button>
            );
          })}
        </div>
        <div style={{ background: "#f8f5ef", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(5,23,42,0.08)" }}>
          <div style={{ position: "relative", height: 200 }}>
            {S8_PHOTOS.map((photo, pi) => (
              <img key={pi} src={photo} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: pi === photoIdx ? 1 : 0, transition: "opacity 0.5s ease" }} />
            ))}
            <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 5 }}>
              {S8_PHOTOS.map((_, di) => (
                <button key={di} onClick={() => setPhotoIdx(di)} style={{ width: di === photoIdx ? 16 : 6, height: 6, borderRadius: 3, background: "#fff", border: "none", padding: 0, cursor: "pointer", opacity: di === photoIdx ? 1 : 0.55, transition: "width 0.2s" }} />
              ))}
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: "#bf791d" }}>{currentCard.programName}</span>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "24px", color: "#636363", margin: "8px 0" }}>{currentCard.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
              <strong style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 13, color: "#000" }}>{currentCard.title}</strong>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                {currentCard.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <S8Arrow /><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "#636363" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/join-network" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#bf791d", borderRadius: 30, padding: "10px 24px", textDecoration: "none" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>Join Teacher Network</span>
              <S8Arrow color="#fff" />
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <button onClick={() => setCardIndex(i => Math.max(0, i - 1))} disabled={cardIndex === 0}
            style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #174067", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: cardIndex === 0 ? "not-allowed" : "pointer", opacity: cardIndex === 0 ? 0.4 : 1 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="#174067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#686868" }}>{cardIndex + 1} / {TOTAL}</span>
          <button onClick={() => setCardIndex(i => Math.min(TOTAL - 1, i + 1))} disabled={cardIndex === TOTAL - 1}
            style={{ width: 40, height: 40, borderRadius: "50%", background: "#174067", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: cardIndex === TOTAL - 1 ? "not-allowed" : "pointer", opacity: cardIndex === TOTAL - 1 ? 0.4 : 1 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    );
  }

  // ── Desktop: sticky scroll-driven stack ─────────────────────────────────────
  // Card container: 764px wide, 511px tall
  // Back cards (decorative, widths 712/732/752) peek from top-center
  // Active card (764×448) positioned at top=63 (511-448)
  const CARD_CONTAINER_H = 511;
  const FRONT_CARD_H = 448;
  const FRONT_TOP = CARD_CONTAINER_H - FRONT_CARD_H; // 63px
  const BACK_CARDS = [
    { inset: 26, top: 0,  zIndex: 1 }, // w=712
    { inset: 16, top: 8,  zIndex: 2 }, // w=732
    { inset: 6,  top: 16, zIndex: 3 }, // w=752
  ];

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
                Find your role and see exactly what it means, what you get, and what your next step is. lorem ipsum is simply dummy text
              </p>
            </div>
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>On the Ground</span>
            </div>
          </div>

          {/* Body: tabs + card stack */}
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>

            {/* Left: program tabs — aligned with active card top */}
            <div style={{ width: 212, display: "flex", flexDirection: "column", gap: 10, flexShrink: 0, paddingTop: FRONT_TOP }}>
              {SECTION_8_TABS.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button key={idx} onClick={() => handleTabClick(idx)} style={{
                    background: isActive ? "#174067" : "transparent",
                    border: "1px solid #174067", borderRadius: 40,
                    padding: "10px 24px", width: "100%", textAlign: "center",
                    color: isActive ? "#fff" : "#174067",
                    fontFamily: "'Poppins', sans-serif", fontWeight: isActive ? 500 : 400, fontSize: 16,
                    cursor: "pointer", transition: "background 0.25s, color 0.25s", outline: "none",
                  }}>{tab}</button>
                );
              })}
            </div>

            {/* Right: card stack */}
            <div style={{ flex: 1, position: "relative", height: CARD_CONTAINER_H }}>

              {/* Decorative back cards peeking from above */}
              {BACK_CARDS.map((bc, i) => (
                <div key={i} style={{
                  position: "absolute", top: bc.top,
                  left: bc.inset, right: bc.inset,
                  height: 411,
                  background: "#f8f5ef",
                  borderRadius: 20,
                  zIndex: bc.zIndex,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }} />
              ))}

              {/* Active front card */}
              <div key={currentCard.id} style={{
                position: "absolute", top: FRONT_TOP, left: 0, right: 0,
                height: FRONT_CARD_H,
                background: "#f8f5ef",
                borderRadius: 20,
                zIndex: 10,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                display: "flex",
                padding: "0 20px",
                boxSizing: "border-box",
                gap: 36,
                alignItems: "stretch",
              }}>
                {/* Left content area: w=404, vertically centered */}
                <div style={{ width: 404, flexShrink: 0, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center", paddingTop: 26, paddingBottom: 26, boxSizing: "border-box" }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 18, color: "#bf791d" }}>
                    {currentCard.programName}
                  </span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "24px", color: "#636363", margin: 0 }}>
                    {currentCard.desc}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <strong style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#000" }}>
                      {currentCard.title}
                    </strong>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                      {currentCard.bullets.map((b, bi) => (
                        <li key={bi} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <S8Arrow />
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, color: "#636363" }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#636363", margin: 0 }}>
                    Join the Teacher Reformers Network - a community of 340+ teachers lorem ipsum is
                  </p>
                  <Link to="/join-network" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#bf791d", border: "1px solid #bf791d", borderRadius: 30, padding: "10px 24px", alignSelf: "flex-start", textDecoration: "none" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#fff" }}>Join Teacher Network</span>
                    <S8Arrow color="#fff" />
                  </Link>
                </div>

                {/* Right photo panel: w=284, full card height, rounded corners */}
                <div style={{ width: 284, flexShrink: 0, borderRadius: 20, overflow: "hidden", position: "relative", background: "#ddd4c7" }}>
                  {S8_PHOTOS.map((photo, pi) => (
                    <img key={pi} src={photo} alt="" style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", display: "block",
                      opacity: pi === photoIdx ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }} />
                  ))}
                  {/* Carousel dots */}
                  <div style={{ position: "absolute", bottom: 14, right: 14, display: "flex", gap: 5, zIndex: 2 }}>
                    {S8_PHOTOS.map((_, di) => (
                      <button key={di} onClick={() => setPhotoIdx(di)} style={{
                        width: di === photoIdx ? 18 : 6, height: 6, borderRadius: 3,
                        background: "#fff", border: "none", padding: 0, cursor: "pointer",
                        opacity: di === photoIdx ? 1 : 0.55,
                        transition: "width 0.2s ease, opacity 0.2s ease",
                      }} />
                    ))}
                  </div>
                </div>

              </div>{/* end active card */}
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
    tag: "Foundational skills improving across grade levels",
    title: "Teachers Leading Change",
    desc: "A network of 340+ teachers sharing methods and innovations to reshape education in rural Maharashtra.",
    bullets: ["Structured professional development", "Cross-school resource sharing", "Reflective teaching practice"],
    thumbnail: imgS8Teacher,
  },
  {
    id: "s9-1", type: "content",
    tag: "Early results show improvement in 6 pilot schools",
    title: "Reading & Comprehension",
    desc: "Grade-level reading assessments conducted each term by teacher facilitators across 120 schools.",
    bullets: ["Monthly workshops in-person", "Access to shared lesson resources", "Peer mentoring circles"],
    thumbnail: imgTeacher,
  },
  {
    id: "s9-2", type: "content",
    tag: "6 months in — enrolment growing steadily",
    title: "Student Attendance Rate",
    desc: "Consistent daily attendance tracking across partner schools using mobile-first tools and teacher reports.",
    bullets: ["Automated attendance reminders", "Parent SMS notifications", "Monthly attendance review"],
    thumbnail: imgCarousel1,
  },
  {
    id: "s9-3", type: "content",
    tag: "Community response has been overwhelmingly positive",
    title: "Parent Engagement Score",
    desc: "Bi-monthly parent-school forums and structured home learning kits improve household learning time.",
    bullets: ["Home learning kit distribution", "Parent forum participation", "Caregiver feedback loops"],
    thumbnail: imgS8Teacher,
  },
  {
    id: "s9-4", type: "content",
    tag: "Teachers report measurable confidence gains",
    title: "Teacher Capability Index",
    desc: "Structured peer coaching and reflective practice journals build long-term teaching excellence.",
    bullets: ["Peer observation cycles", "Reflective practice journals", "Skill certification pathway"],
    thumbnail: imgTeacher,
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

  const onEnterBtn = () => {
    videoRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };
  const onLeaveBtn = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div style={{ width, height, borderRadius: 20, flexShrink: 0, position: "relative", overflow: "hidden", boxShadow: "0px 4px 6px rgba(5,23,42,0.25)" }}>
      {/* Thumbnail */}
      <img src={card.thumbnail} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />

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
          onMouseEnter={onEnterBtn}
          onMouseLeave={onLeaveBtn}
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

  const onEnterBtn = () => {
    videoRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };
  const onLeaveBtn = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div style={{ width, height, borderRadius: 20, flexShrink: 0, position: "relative", overflow: "hidden", background: "#fff", border: "1px solid #ebd5b9" }}>

      {/* Top amber banner */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "#f9f2e8", padding: "8px 20px", borderRadius: "20px 20px 0 0", zIndex: 2 }}>
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
          onMouseEnter={onEnterBtn}
          onMouseLeave={onLeaveBtn}
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

      {/* Header — left-aligned with hPad, right side constrained */}
      <div style={{ paddingTop: 68, paddingBottom: 52, paddingLeft: hPad, paddingRight: hPad, maxWidth: 1100, boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px", alignSelf: "flex-start" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>Honest Impact</span>
            </div>
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 28 : 40, lineHeight: "1.36", color: "#000", margin: 0, textTransform: "capitalize" }}>
              What Progress Looks Like
            </h2>
          </div>
          {!isMobile && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "22px", color: "#686868", margin: 0, maxWidth: 255, textAlign: "right" }}>
              We track outcomes that matter in education — not vanity metrics. Four categories we measure honestly.
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
    forLabel: "Government school teachers looking to grow",
    desc: "Join the Teacher Reformers Network — a community of 340+ teachers sharing methods, resources, and practical innovations.",
    bullets: [
      "Monthly workshops (in-person, Jalgaon)",
      "Access to shared lesson resource library",
      "Peer mentoring circles",
      "Recognition in annual teacher summit",
    ],
    cta: "Join Teacher Network",
    photo: imgS10TeacherRmBg,
    photoBg: imgS10Classroom,
  },
  {
    label: "Volunteers",
    forLabel: "Passionate individuals ready to make a difference",
    desc: "Join our volunteer corps — support classroom learning, community programs, and administrative initiatives across Jalgaon.",
    bullets: [
      "Weekend workshop facilitation",
      "Mentoring underprivileged students",
      "Community outreach campaigns",
      "Certificate of recognition",
    ],
    cta: "Volunteer with Us",
    photo: imgTeacher,
  },
  {
    label: "Partners",
    forLabel: "NGOs and institutions aligned with our mission",
    desc: "Collaborate with URW — co-design programs, share resources, and amplify collective impact in government school education.",
    bullets: [
      "Co-branded program delivery",
      "Shared monitoring & evaluation",
      "Access to our school network",
      "Annual partner summit invitation",
    ],
    cta: "Become a Partner",
    photo: imgCarousel1,
  },
  {
    label: "CSR / Business",
    forLabel: "Corporates looking to invest in education impact",
    desc: "Channel your CSR funds towards high-accountability programs in government school education — with full transparent reporting.",
    bullets: [
      "Tax-exempted contributions (80G)",
      "Quarterly impact reports",
      "Site visits and school access",
      "Brand visibility in annual reports",
    ],
    cta: "Start CSR Conversation",
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
function getS10CardPath(N: number): string {
  const W = 1008, H = 477;
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

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
  const CARD_H = 477;
  const CARD_W = 1008;
  const BH     = 56;   // bump height in SVG path (tab sits inside this)
  const TAB_H  = 44;   // actual tab button height
  const TAB_TOP = Math.round((BH - TAB_H) / 2); // 6px — centres tab inside bump

  const cardPath = getS10CardPath(activeTab);

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
            Get Involved, In Detail
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: 16, lineHeight: "22px", color: "#686868",
            margin: "0 auto", maxWidth: 556,
          }}>
            Find your role and see exactly what it means, what you get, and what your next step is. lorem ipsum is simply dummy text
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
              <div style={{
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
    title: "Support Received",
    desc: "Your contribution is acknowledged immediately. A receipt and 80G certificate are generated",
  },
  {
    num: "02",
    title: "Allocated to a Defined Need",
    desc: "Funds are assigned to specific programme budgets — not pooled into a general fund without purpose.",
  },
  {
    num: "03",
    title: "Allocated to a Defined Need",
    desc: "Funds are assigned to specific programme budgets — not pooled into a general fund without purpose.",
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
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0 0 0" : "88px 0 0 0" }}>
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
                fontWeight: 700,
                fontSize: isMobile ? 48 : 80,
                lineHeight: 1,
                color: "rgba(191,121,29,0.18)",
                pointerEvents: "none",
                userSelect: "none",
                marginBottom: isMobile ? 8 : 0,
              }}>{card.num}</span>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 18,
                color: "#111",
                marginBottom: 10,
              }}>{card.title}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.6,
                color: "#555",
              }}>{card.desc}</div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          background: "#f8f5ef",
          borderRadius: 16,
          padding: isMobile ? "28px 24px" : "32px 36px",
          position: "relative",
          overflow: "hidden",
          marginBottom: isMobile ? 48 : 88,
          minHeight: isMobile ? "auto" : 122,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? 24 : 32,
        }}>
          {/* Decorative map — faint SVG dots/lines over right side */}
          {!isMobile && (
            <svg
              aria-hidden
              viewBox="0 0 276 435"
              style={{
                position: "absolute",
                right: 160,
                top: "50%",
                transform: "translateY(-50%)",
                height: "240%",
                width: "auto",
                opacity: 0.12,
                pointerEvents: "none",
              }}
            >
              <ellipse cx="138" cy="217" rx="100" ry="150" stroke="#bf791d" strokeWidth="1.5" fill="none" />
              <ellipse cx="138" cy="217" rx="60" ry="90" stroke="#bf791d" strokeWidth="1" fill="none" />
              <line x1="38" y1="217" x2="238" y2="217" stroke="#bf791d" strokeWidth="1" />
              <line x1="138" y1="67" x2="138" y2="367" stroke="#bf791d" strokeWidth="1" />
              <circle cx="138" cy="217" r="5" fill="#bf791d" />
              <circle cx="180" cy="170" r="3" fill="#bf791d" />
              <circle cx="100" cy="260" r="3" fill="#bf791d" />
              <circle cx="160" cy="280" r="3" fill="#bf791d" />
              <circle cx="90" cy="180" r="3" fill="#bf791d" />
            </svg>
          )}

          {/* Left: heading */}
          <div style={{
            fontFamily: "'Lora', serif",
            fontWeight: 700,
            fontSize: isMobile ? 20 : isTablet ? 22 : 28,
            lineHeight: 1.35,
            color: "#111",
            maxWidth: isMobile ? "100%" : 500,
            position: "relative",
            zIndex: 1,
          }}>
            We Unlock Scale By Fixing What's Lorem Leaking Conversion?
          </div>

          {/* Right: buttons */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 12,
            alignItems: isMobile ? "stretch" : "center",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
            width: isMobile ? "100%" : "auto",
          }}>
            <button style={{
              border: "1.5px solid #bf791d",
              background: "transparent",
              borderRadius: 100,
              padding: "12px 24px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? 15 : 16,
              color: "#bf791d",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              whiteSpace: "nowrap",
            }}>
              Sponsor a Learning Kit
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none"><circle cx="11.5" cy="11.5" r="10.5" stroke="#bf791d" strokeWidth="1.5"/><path d="M8 11.5h7M12.5 9l2.5 2.5-2.5 2.5" stroke="#bf791d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="btn-gold" style={{
              border: "none",
              background: "#bf791d",
              borderRadius: 100,
              padding: "12px 24px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? 15 : 16,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              whiteSpace: "nowrap",
            }}>
              Donate Now
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none"><circle cx="11.5" cy="11.5" r="10.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/><path d="M8 11.5h7M12.5 9l2.5 2.5-2.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
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
                Grid Lorem ipsum is simply
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15,
                lineHeight: "22px", color: "#686868",
                maxWidth: isTablet ? 240 : "100%", margin: 0,
                textAlign: isTablet ? "right" : "left",
              }}>
                We track outcomes that matter in education — not vanity metrics. Four categories we
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
            We track outcomes that matter in education — not vanity metrics. Four categories we
          </p>
        </div>

        {/* Scrolling column strip */}
        <div ref={stripRef} style={{
          display: "flex", gap: 16, alignItems: "stretch",
          paddingLeft: 24, paddingRight: 24,
          boxSizing: "border-box",
          height: STRIP_H,
          willChange: "transform",
          flexShrink: 0,
        }}>

          {/* Col 1: image (flex) + cream text card */}
          <div style={{ minWidth: "clamp(220px, 30vw, 459px)", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestImpactCard cardIdx={0} style={{ flexShrink: 0 }} />
          </div>

          {/* Col 2: full-height video block + play button */}
          <div style={{ minWidth: "clamp(150px, 22vw, 350px)", position: "relative", flexShrink: 0 }}>
            <HonestGrayBlock style={{ width: "100%", height: "100%" }} />
            <HonestPlayBtn />
          </div>

          {/* Col 3: 2 stacked image blocks */}
          <div style={{ minWidth: "clamp(100px, 15vw, 220px)", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestGrayBlock style={{ flex: 1 }} />
          </div>

          {/* Col 4: cream text card (flex) + image bottom */}
          <div style={{ minWidth: "clamp(150px, 22vw, 350px)", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestImpactCard cardIdx={1} style={{ flex: 1, minHeight: 0 }} />
            <HonestGrayBlock style={{ height: "clamp(100px, 20%, 200px)", flexShrink: 0 }} />
          </div>

          {/* Col 5: 2 stacked blocks + play button overlay */}
          <div style={{ minWidth: "clamp(120px, 18vw, 302px)", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0, position: "relative" }}>
            <HonestGrayBlock style={{ flex: 2 }} />
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestPlayBtn />
          </div>

          {/* Col 6: image (flex) + cream text card (different content) */}
          <div style={{ minWidth: "clamp(220px, 30vw, 459px)", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestImpactCard cardIdx={2} style={{ flexShrink: 0 }} />
          </div>

          {/* Col 7: full-height video block + play button */}
          <div style={{ minWidth: "clamp(150px, 22vw, 350px)", position: "relative", flexShrink: 0 }}>
            <HonestGrayBlock style={{ width: "100%", height: "100%" }} />
            <HonestPlayBtn />
          </div>

          {/* Col 8: 2 stacked image blocks */}
          <div style={{ minWidth: "clamp(100px, 15vw, 220px)", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestGrayBlock style={{ flex: 1 }} />
          </div>

          {/* Col 9: cream text card (flex) + image bottom */}
          <div style={{ minWidth: "clamp(150px, 22vw, 350px)", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestImpactCard cardIdx={3} style={{ flex: 1, minHeight: 0 }} />
            <HonestGrayBlock style={{ height: "clamp(100px, 20%, 200px)", flexShrink: 0 }} />
          </div>

          {/* Col 10: 2 stacked image blocks */}
          <div style={{ minWidth: "clamp(120px, 18vw, 302px)", display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestGrayBlock style={{ flex: 1 }} />
            <HonestGrayBlock style={{ flex: 1 }} />
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
        height: 324,
        borderRadius: "16px 16px 0 0",
        position: "relative",
        overflow: "hidden",
        background: "#bf791d",
      }}>
        {/* World map decoration */}
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          dangerouslySetInnerHTML={{ __html: S15_MAP_SVG }}
        />

        {/* Person photo */}
        <img
          src={member.photo}
          alt={member.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Hover overlay — bio + social icons */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "#bf791d",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 20px",
          gap: 20,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
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
        background: "#fff",
        padding: "16px 20px 0",
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

        {/* Nav indicator — two dashes */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12, paddingBottom: 16 }}>
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
              Our Team
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 28,
              lineHeight: 1.36, color: "#000", margin: 0, textTransform: "capitalize",
            }}>
              Meet The Team Lorem
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15,
              lineHeight: "22px", color: "#686868", margin: 0,
            }}>
              Find your role and see exactly what it means, what you get, and what your
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
              Our Team
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600,
              fontSize: isTablet ? 30 : 40, lineHeight: 1.36,
              color: "#000", margin: 0, textTransform: "capitalize",
              textAlign: "center", whiteSpace: "nowrap",
            }}>
              Meet The Team Lorem
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15,
              lineHeight: "22px", color: "#686868",
              width: isTablet ? 160 : 206, textAlign: "right", margin: 0,
            }}>
              Find your role and see exactly what it means, what you get, and what your
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
            Teacher-Led · Education-Only · Transparent
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
            One Teacher Started This Lorem Many Can Keep
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

        {/* Right column: bullet list — desktop/tablet only */}
        {!isMobile && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            paddingTop: isTablet ? 36 : 44,
          }}>
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
const S14_BULLETS = [
  "Monthly workshops in-person",
  "Access to shared lesson resources",
  "Peer mentoring circles",
];

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
        height: isMobile ? 180 : isTablet ? 280 : 469,
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
                One Teacher Start This Lorem Many Can
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                fontSize: 15, lineHeight: "26px", color: "#636363", margin: 0,
              }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {S14_BULLETS.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M2 8h12M10 4l4 4-4 4" stroke="#bf791d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                      fontSize: 14, lineHeight: "24px", color: "#636363",
                    }}>{item}</span>
                  </div>
                ))}
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
          <div style={{ display: "flex", gap: 0, alignItems: "flex-start", height: isTablet ? "auto" : 452 }}>

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
                  About Ujjwal Mam
                </span>
                <h2 style={{
                  fontFamily: "'Lora', serif", fontWeight: 600,
                  fontSize: isTablet ? 32 : 48, lineHeight: 1.24,
                  color: "#000", margin: 0, textTransform: "capitalize",
                }}>
                  One Teacher Start{"\n"}This Lorem Many Can
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                  fontSize: 15, lineHeight: "26px", color: "#636363",
                  margin: 0, width: isTablet ? "100%" : 392,
                }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley Lorem Ipsum is simply dummy text of the printing
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {S14_BULLETS.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M2 8h12M10 4l4 4-4 4" stroke="#bf791d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                        fontSize: 15, lineHeight: "24px", color: "#636363",
                      }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center — teacher photo */}
            <div style={{ flex: 1, position: "relative", height: isTablet ? 400 : "100%", overflow: "visible" }}>
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
              height: isTablet ? 400 : "100%",
              paddingTop: 24,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                  fontSize: 15, color: "#000", textAlign: "right", margin: 0,
                }}>
                  Lorem ipsum is Strategy
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {["Monthly workshops #", "Access to shared #", "Peer mentoring circles #", "Access to shared #"].map(t => (
                    <p key={t} style={{
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                      fontSize: 14, lineHeight: "24px", color: "#636363",
                      textAlign: "right", margin: 0,
                    }}>{t}</p>
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
          borderTop: "1px solid #f0f0f0",
          marginTop: isMobile ? 24 : 0,
        }}>

          {/* Left: text */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 500,
              fontSize: isMobile ? 16 : 17, color: "#000", margin: 0,
            }}>
              About Organization lorem is
            </p>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: isMobile ? 14 : 16, lineHeight: "26px", color: "#636363",
              display: "flex", flexDirection: "column", gap: 2,
            }}>
              <p style={{ margin: 0 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took</p>
              <p style={{ margin: 0, maxWidth: 394 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has Lorem</p>
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
            Our channels
          </span>
          <h2 style={{
            fontFamily: "'Lora', serif", fontWeight: 600,
            fontSize: isMobile ? 26 : "clamp(28px, 4vw, 40px)", lineHeight: 1.36,
            color: "#000", margin: 0, textTransform: "capitalize",
            textAlign: isMobile ? "left" : "right",
          }}>
            Our Channels Ipsum Is
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
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
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
  {
    q: "Lorem Ipsum is simply dummy text of the printing and?",
    a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
  },
  {
    q: "Lorem Ipsum is simply dummy text of the printing and typesettin?",
    a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
  },
  {
    q: "Lorem Ipsum is simply dummy text of the printing and typesettin?",
    a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
  },
  {
    q: "Lorem Ipsum is simply dummy text of the printing?",
    a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
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
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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
              FAQ's Lorem ipsum
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600,
              fontSize: "clamp(30px, 3.5vw, 40px)", lineHeight: 1.24,
              color: "#000", margin: 0, textTransform: "capitalize",
            }}>
              Frequently Asked Questions
            </h2>
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
// Words + their weight — SemiBold for "We unlock scale by fixing", Regular for the rest
const S18_WORDS: { word: string; weight: 400 | 600 }[] = [
  { word: "We",           weight: 600 },
  { word: "unlock",       weight: 600 },
  { word: "scale",        weight: 600 },
  { word: "by",           weight: 600 },
  { word: "fixing",       weight: 600 },
  { word: "what's",       weight: 400 },
  { word: "leaking",      weight: 400 },
  { word: "conversion,",  weight: 400 },
  { word: "retention,",   weight: 400 },
  { word: "repeat",       weight: 400 },
  { word: "so",           weight: 400 },
  { word: "growth",       weight: 400 },
  { word: "lorem",        weight: 400 },
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
            About Ujjwala
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
      <Section8 />
      <Section9 />
      <Section10 />
      <Section12 />
      <SectionHonestImpact />
      <Section13 />
      <Section14 />
      <Section15 />
      <Section16 />
      <Section17 />
      <Section18 />
      <Footer />
    </div>
  );
}
