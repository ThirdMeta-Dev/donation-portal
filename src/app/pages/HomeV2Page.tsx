/**
 * HomeV2Page — Figma-accurate (node 280:5999 + 294:94 section 5).
 * Sections: Hero, ProgramBanner, S2 (scroll-reveal), S3 (carousel),
 *           S4 (full-bleed cards), S5 (Beyond Syllabus accordion, 294:94)
 */
import { Link } from "react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Navbar } from "../components/SiteNavbar";
import { Footer } from "../components/SiteFooter";
import { supabase } from "../lib/supabase";

// ── Local asset imports (bundled by Vite for production) ─────────────────
// @ts-ignore
import imgHero from "@/assets/urwbanner.png";
// @ts-ignore
import imgTeacher from "@/assets/3b08adbd33c0549761095e0db7549411c51bd4ec.png";
// @ts-ignore
import imgMedia1 from "@/assets/s_media_1.jpg";
// @ts-ignore
import imgMedia2 from "@/assets/s_media_2.jpg";
// @ts-ignore
import imgMedia3 from "@/assets/s_media_3.jpg";
// @ts-ignore
import imgMedia4 from "@/assets/s_media_4.jpg";
// @ts-ignore
import imgMedia5 from "@/assets/s_media_5.jpg";
// @ts-ignore
import imgMedia6 from "@/assets/s_media_6.jpg";
// @ts-ignore
import imgMedia7 from "@/assets/s_media_7.jpg";
// @ts-ignore
import imgMedia8 from "@/assets/s_media_8.jpg";
// @ts-ignore
import imgMedia9 from "@/assets/s_media_9.jpg";
// @ts-ignore
import imgMedia10 from "@/assets/s_media_10.jpg";
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
import imgHeroVideo2 from "@/assets/hero_video2.png";
// @ts-ignore
import imgMobileTeacher from "@/assets/mobile_hero_teacher.png";
// @ts-ignore
import videoHorizontalBanner from "@/assets/horizontal-banner-video.mp4";
// @ts-ignore
import videoVerticalBanner from "@/assets/vertical-banner-video.mp4";
// @ts-ignore
import imgStatBg from "@/assets/b33ea922189e2f8727c7c9b20f1df35f797556ff.svg";
// @ts-ignore
import s12_cta_pattern from "../../assets/images/s12_cta_pattern.svg";
// @ts-ignore
import s16_map_bg from "../../assets/images/s16_map_bg.svg";
// @ts-ignore
import imgCarousel1 from "@/assets/b025de5e50e257a2a8382e99cc8bc799d9ebaba4.png";
// @ts-ignore
import imgS3Slide1 from "@/assets/s3_slide1.jpg";
// @ts-ignore
import imgS3Slide2 from "@/assets/s3_slide2.jpg";
// @ts-ignore
import imgS3Slide3 from "@/assets/s3_slide3.jpg";
// @ts-ignore
import imgS3Slide4 from "@/assets/s3_slide4.jpg";
// @ts-ignore
import imgS3Slide5 from "@/assets/s3_slide5.jpg";
// @ts-ignore
import imgS3Slide6 from "@/assets/s3_slide6.jpg";
// @ts-ignore
import imgS3Slide7 from "@/assets/s3_slide7.jpg";
// @ts-ignore
import imgS3Slide8 from "@/assets/s3_slide8.jpg";
// @ts-ignore
import imgS3Slide9 from "@/assets/s3_slide9.png";

// Section 5
// @ts-ignore
import imgS5Bg from "@/assets/s5_bg_figma.png";
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
      <ul style={{ position: "absolute", left: 8, top: 8, width: 198, fontStyle: "italic", fontSize: 11, color: "#f9c56d", fontFamily: "'DM Sans', sans-serif", lineHeight: "19px", listStyle: "disc", paddingLeft: 21, margin: 0, whiteSpace: "nowrap" }}>
        <li><span style={{ fontWeight: 500 }}>Ujjwala Wadekar</span></li>
        <li><span style={{ fontWeight: 500 }}>31 years</span><span style={{ fontWeight: 300 }}> in government schools</span></li>
        <li><span style={{ fontWeight: 300 }}>Guiding rural generations</span></li>
        <li><span style={{ fontWeight: 300 }}>Shaped </span><span style={{ fontWeight: 500 }}>10k+</span><span style={{ fontWeight: 300 }}> characters</span></li>
      </ul>
    </div>
  );
}

// ── MobileHeroPhotoBlock ──────────────────────────────────────────────────
function MobileHeroPhotoBlock() {
  const [lightbox, setLightbox] = useState<"youtube" | "instagram" | null>(null);

  return (
    <>
      {/* Teacher photo + stats bubble + play buttons */}
      <div style={{ position: "relative", width: "100%", height: 303, marginTop: 12, flexShrink: 0 }}>

        {/* Teacher photo — right 78% */}
        <img
          src={imgMobileTeacher}
          alt="Ujjwala Wadekar"
          style={{
            position: "absolute", right: 0, top: 0,
            width: "78%", height: "100%",
            objectFit: "contain", objectPosition: "bottom right",
            display: "block",
          }}
        />

        {/* Stats bubble — top left */}
        <div style={{ position: "absolute", left: 0, top: 8, width: 126, height: 98, overflow: "visible" }}>
          <img src={imgStatBg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill" }} />
          <ul style={{
            position: "absolute", left: 8, top: 6, width: 106,
            fontStyle: "italic", fontSize: 10, color: "#f9c56d",
            fontFamily: "'DM Sans', sans-serif", lineHeight: "17px",
            listStyle: "disc", paddingLeft: 18, margin: 0,
          }}>
            <li><span style={{ fontWeight: 500 }}>Ujjwala Wadekar</span></li>
            <li><span style={{ fontWeight: 500 }}>31 yrs</span><span style={{ fontWeight: 300 }}> Teaching<br />Experience</span></li>
            <li><span style={{ fontWeight: 500 }}>12,400+</span><span style={{ fontWeight: 300 }}> Children Reached</span></li>
          </ul>
        </div>

        {/* Instagram play button (vertical video) */}
        <button
          onClick={() => setLightbox("instagram")}
          style={{
            position: "absolute", left: 0, top: 123,
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
            border: "2px solid rgba(255,255,255,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
            padding: 0,
          }}
          aria-label="Play Instagram video"
        >
          <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
            <path d="M1.5 1.5L11.5 7.5L1.5 13.5V1.5Z" fill="#fff" />
          </svg>
        </button>

        {/* YouTube play button (horizontal video) */}
        <button
          onClick={() => setLightbox("youtube")}
          style={{
            position: "absolute", left: 0, top: 165,
            width: 36, height: 36, borderRadius: "50%",
            background: "#FF0000",
            border: "2px solid rgba(255,255,255,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
            padding: 0,
          }}
          aria-label="Play YouTube video"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M13.5 1.5s-.168-1.18-.682-1.7c-.652-.683-1.382-.686-1.717-.726C9.356 0 7 0 7 0S4.645 0 2.9.074c-.335.04-1.065.043-1.717.726C.67.32.5 1.5.5 1.5S.33 2.877.33 4.254v1.287c0 1.377.168 2.754.168 2.754s.168 1.18.682 1.7c.652.683 1.535.661 1.922.733C4.33 10.06 7 10.083 7 10.083s2.359-.003 4.101-.077c.335-.04 1.065-.043 1.717-.726.514-.52.682-1.7.682-1.7S13.67 6.918 13.67 5.541V4.254c0-1.377-.17-2.754-.17-2.754zM5.545 6.818V2.864l4.636 1.984-4.636 1.97z" fill="#fff"/>
          </svg>
        </button>
      </div>

      {/* Lightbox portal */}
      {lightbox && createPortal(
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "rgba(0,0,0,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute", top: 20, right: 20,
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 1,
            }}
            aria-label="Close video"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <video
            src={lightbox === "youtube" ? videoHorizontalBanner : videoVerticalBanner}
            autoPlay controls playsInline
            style={{
              maxHeight: "88vh", maxWidth: "92vw",
              borderRadius: 12,
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}

// ── HorizontalVideoCard — scroll-driven expand then scroll-up ─────────────
function HorizontalVideoCard() {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const startRectRef   = useRef<{ top: number; left: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted]     = useState(true);

  // Measure placeholder absolute position once layout is stable
  useEffect(() => {
    const measure = () => {
      if (!placeholderRef.current) return;
      const r = placeholderRef.current.getBoundingClientRect();
      startRectRef.current = { top: r.top + window.scrollY, left: r.left };
      if (!mounted) setMounted(true);
    };
    const t = setTimeout(measure, 60);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, []);

  // Sync muted state to video element
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Direct DOM scroll handler — no setState → smooth 60fps
  useEffect(() => {
    if (!mounted) return;

    const CARD_W = 255, CARD_H = 144;
    const EXPAND_END = 450;  // scroll px → fully fullscreen
    const SHRINK_END = 850;  // scroll px → video fully collapsed & gone

    const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    const ease  = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const rect    = startRectRef.current;
      const overlay = overlayRef.current;
      if (!rect || !overlay) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const expandT = ease(clamp(scrollY / EXPAND_END, 0, 1));
      const shrinkT = ease(clamp((scrollY - EXPAND_END) / (SHRINK_END - EXPAND_END), 0, 1));

      // Phase 1 — expand: card position → fullscreen
      // Phase 2 — shrink: height collapses upward (top pinned at 0)
      const w = lerp(CARD_W, vw, expandT); // width stays full during shrink
      const h = expandT < 1
        ? lerp(CARD_H, vh, expandT)
        : lerp(vh, 0, shrinkT);            // bottom edge rises up

      const left = lerp(rect.left, 0, expandT);
      const top  = expandT < 1
        ? lerp(rect.top - scrollY, 0, expandT)
        : 0;                               // pinned to top during shrink

      const radius = expandT < 1
        ? lerp(12, 0, expandT)
        : 0;

      const gone = shrinkT >= 1;

      overlay.style.left         = `${left}px`;
      overlay.style.top          = `${top}px`;
      overlay.style.width        = `${w}px`;
      overlay.style.height       = `${h}px`;
      overlay.style.borderRadius = `${radius}px`;
      overlay.style.transform    = "none";
      overlay.style.opacity      = gone ? "0" : "1";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  return (
    <>
      {/* Placeholder — reserves grid space; hidden once overlay is live */}
      <div
        ref={placeholderRef}
        style={{
          gridColumn: 1, gridRow: 1,
          width: 255, height: 144,
          borderRadius: 12,
          visibility: mounted ? "hidden" : "visible",
          overflow: "hidden",
        }}
      />

      {/* Fixed overlay portal — sole video, animates on scroll */}
      {mounted && createPortal(
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: 255, height: 144,
            borderRadius: 12,
            overflow: "hidden",
            zIndex: 9990,
            pointerEvents: "none",
            willChange: "top, left, width, height, border-radius, transform",
          }}
        >
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src={videoHorizontalBanner} type="video/mp4" />
          </video>

          {/* Mute / unmute button */}
          <button
            onClick={() => setMuted(m => !m)}
            style={{
              position: "absolute", bottom: 10, right: 10,
              width: 32, height: 32,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              pointerEvents: "auto",
              zIndex: 1,
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? (
              /* Speaker with X */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="23" y1="9" x2="17" y2="15" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="17" y1="9" x2="23" y2="15" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              /* Speaker with waves */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

// ── VerticalVideoCard — thumbnail + pulse play btn + lightbox ────────────
function VerticalVideoCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail card */}
      <div
        style={{
          gridColumn: 1, gridRow: 1, marginLeft: 117, marginTop: 98,
          border: "1px solid #112d48", borderRadius: 12,
          boxShadow: "4px 4px 0px 0px #091c2f",
          width: 163, height: 204,
          overflow: "hidden", position: "relative", cursor: "pointer", flexShrink: 0,
        }}
        onClick={() => setOpen(true)}
      >
        {/* Static thumbnail image */}
        <img
          src={imgHeroVideo2}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
        />
        {/* Dark scrim so play btn stands out */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
        {/* Pulsing play button */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            className="play-pulse"
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M2 1.5L12.5 8L2 14.5V1.5Z" fill="#0b223a" />
            </svg>
          </div>
        </div>
      </div>

      {/* Lightbox portal */}
      {open && createPortal(
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "rgba(0,0,0,0.88)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={() => setOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute", top: 20, right: 24,
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 1,
            }}
            aria-label="Close video"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Video — stop click from bubbling to backdrop */}
          <video
            src={videoVerticalBanner}
            autoPlay
            controls
            playsInline
            style={{
              maxHeight: "88vh", maxWidth: "90vw",
              borderRadius: 16,
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}

// ── VideoCards ────────────────────────────────────────────────────────────
function VideoCards() {
  return (
    <div style={{ display: "inline-grid", gridTemplateColumns: "max-content", gridTemplateRows: "max-content", position: "relative", placeSelf: "start" }}>
      <HorizontalVideoCard />
      <div style={{ gridColumn: 1, gridRow: 1, marginLeft: 111, marginTop: 56, width: 32, height: 32, position: "relative" }}>
        <img src={imgPlayBtn} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>
      <VerticalVideoCard />
    </div>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────
function HeroSection({ onOpenModal, data }: { onOpenModal: () => void; data?: any }) {
  const ref = useFadeInUp(0.05);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const content = (data?.content ?? {}) as any;

  return (
    <div ref={ref} className="fade-in-up" style={{ width: "100%", minHeight: isMobile ? "auto" : 724, position: "relative", background: "linear-gradient(114.7deg, #0a2036 0%, #132f4c 100%)", marginBottom: isMobile ? 0 : -131, flexShrink: 0 }}>

      {/* ── Decorative layer ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ width: "100%", margin: "0 auto", position: "relative", height: isMobile ? "100%" : 724, overflow: "hidden" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", top: 0, left: 0, width: isMobile ? "100%" : "70%", height: isMobile ? "100%" : 724, background: isMobile ? "linear-gradient(to bottom, #0b223a 60%, rgba(11,34,58,0.8) 100%)" : "linear-gradient(to right, rgba(11,34,58,1) 0%, rgba(11,34,58,0.9) 30%, rgba(11,34,58,0) 100%)" }} />
          ))}
          {!isMobile && (
            <div style={{ position: "absolute", top: 0, right: 0, width: "70%", height: "100%", zIndex: 2, background: "linear-gradient(to right, rgba(11,34,58,0) 0%, rgba(11,34,58,1) 100%)" }} />
          )}
          {!isMobile && (
            <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
              <img src={content.heroImage || imgHero} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "42% bottom" }} />
            </div>
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
            <Navbar onOpenModal={onOpenModal} />
          </div>

          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(content.awards || "Award 1, Award 2, Award 3").split(",").map((a: string) => (
                    <div key={a} style={{ background: "#13304c", borderRadius: 6, height: 32, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 200, fontSize: 11, color: "#fff" }}>{a.trim()}</span>
                    </div>
                  ))}
                </div>
                <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 500, fontSize: 30, lineHeight: 1.25, color: "#fff", textTransform: "capitalize", margin: 0 }}>
                  {content.heading || "Building Character, Confidence, and Capability in Every Child"}
                </h1>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "rgba(255,255,255,0.8)", margin: 0 }}>
                  {content.subtext || "Through practical teaching experiences, I bring classrooms closer to life and children learn by seeing, doing, feeling, and understanding."}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <button className="btn-gold" onClick={onOpenModal} style={{ display: "flex", alignItems: "center", gap: 12, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.3)", alignSelf: "flex-start" }}>
                  {content.ctaPrimary || "Donate Now"} <ArrowIcon />
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: 0 }}>
                  <span className="arrow-bounce"><svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M9 15l-5-5M9 15l5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  {content.ctaSecondary || "Problems we are working on"}
                </button>
              </div>
              <MobileHeroPhotoBlock />
            </div>
          ) : (
            <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", maxWidth: 1008 }}>
              {!isTablet && (
                <div style={{ position: "absolute", left: 235, top: 60, zIndex: 5 }}>
                  <StatCard />
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 40, width: isTablet ? "50%" : 364, flexShrink: 0, position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(content.awards || "Award 1, Award 2, Award 3").split(",").map((a: string) => (
                      <div key={a} style={{ background: "#13304c", borderRadius: 6, height: 40, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 200, fontSize: 13, color: "#fff" }}>{a.trim()}</span>
                      </div>
                    ))}
                  </div>
                  <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 500, fontSize: isTablet ? 32 : 38, lineHeight: 1.2, color: "#fff", textTransform: "capitalize", width: isTablet ? "100%" : 455, margin: 0 }}>
                    {content.heading || "Building Character, Confidence, and Capability in Every Child"}
                  </h1>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <button className="btn-gold" onClick={onOpenModal} style={{ display: "flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.3)", alignSelf: "flex-start" }}>
                    {content.ctaPrimary || "Donate Now"} <ArrowIcon />
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, padding: 0 }}>
                    <span className="arrow-bounce"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M9 15l-5-5M9 15l5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    {content.ctaSecondary || "Problems we are working on"}
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 36, alignItems: "flex-end", width: isTablet ? "40%" : 245, flexShrink: 0, position: "relative", zIndex: 2 }}>
                {!isTablet && <VideoCards />}
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "22px", color: "#fff", textAlign: "right", maxWidth: 245, margin: 0 }}>
                  {content.subtext || "Through practical teaching experiences, I bring classrooms closer to life and children learn by seeing, doing, feeling, and understanding."}
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
function ProgramBanner({ onOpenModal, data }: { onOpenModal: () => void; data?: any }) {
  const ref = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const content = (data?.content ?? {}) as any;
  const DEFAULT_ITEMS = ["Open conversations on real classroom struggles", "Learn from Ujjwala's practical guidance", "Build collective action for change"];
  const items = content.bullet1
    ? [content.bullet1, content.bullet2, content.bullet3].filter(Boolean)
    : DEFAULT_ITEMS;
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
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: isMobile ? 16 : 18, margin: 0 }}>{content.title || "उज्ज्वल संवाद (Ujjwal Sanvaad)"}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: isMobile ? 14 : 15, lineHeight: "24px", margin: 0 }}>
              {content.subtitle || "Come sit with Ujjwala and a growing community of teachers, parents, and supporters who want better education for every child."}
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
          <button
            onClick={onOpenModal}
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
            {content.ctaText || "Let's Rethink Education Together"} <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Section 2: Figma CTA Banner (node 160:4105) ───────────────────────────
function _Section2_unused({ onOpenModal }: { onOpenModal: () => void }) {
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

            {/* Buttons */}
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 10,
              alignItems: isMobile ? "stretch" : "center",
            }}>
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
              <button
                className="btn-ujjwala-hover"
                onClick={onOpenModal}
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
  { img: imgS3Slide1, category: "Family Problems", caption: "I met Atharva's parents and asked, \"Why isn't he coming to school?\" They looked at me and said, \"Madam, can education feed us through our basic needs today? We had to send him to the farm to survive.\"" },
  { img: imgS3Slide2, category: "Family Problems", caption: "A child spends 6 hours in school and 18 at home. If learning finds no support, no encouragement, no environment there, even the brightest child slowly stops taking education seriously." },
  { img: imgS3Slide3, category: "Student Problems", caption: "A bright village boy once went to the city, and his confidence shattered. Fancy showrooms, malls, pizza shops, premium cars. One look at that world, and he quietly felt, \"I do not belong here.\"" },
  { img: imgS3Slide4, category: "Student Problems", caption: "Students top exams and merit lists, but when life asks for difficult decisions, many end up choosing careers forced on them. Years later, they realize they lived someone else's dream, not their own." },
  { img: imgS3Slide5, category: "Teacher Problems", caption: "When I first joined, ZP schools were full of children. Today, many classrooms stand half empty. Not because children disappeared, but because school stopped feeling worth returning to." },
  { img: imgS3Slide6, category: "Teacher Problems", caption: "Do we ever ask a fish to fly? Every child is made differently. But many classrooms still reduce them to fixed hours, fixed syllabus, and fixed exams." },
  { img: imgS3Slide7, category: "Teacher Problems", caption: "Life often feels heavier than education. But how often do teachers truly pause and ask a child, \"Tell me, how is life treating you?\"" },
  { img: imgS3Slide8, category: "Society Problems", caption: "One missing birth certificate, one delayed caste document, and a child's hard-earned chance slips away quietly. Dreams do not always break with noise. Sometimes, paperwork breaks them in silence." },
  { img: imgS3Slide9, category: "Society Problems", caption: "He stopped telling his classmates what his father did for work. No one taught him that labour has dignity, so he learned shame much before he ever learned pride." },
];

function Section3({ data }: { data?: any }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const cmsItems = data?.items ?? [];
  const slides = cmsItems.length > 0
    ? cmsItems.map((it: any, i: number) => ({
        img: it.image || S3_SLIDES[i % S3_SLIDES.length]?.img || "",
        category: it.category || S3_SLIDES[i % S3_SLIDES.length]?.category || "",
        caption: it.caption || S3_SLIDES[i % S3_SLIDES.length]?.caption || "",
      }))
    : S3_SLIDES;
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const prev = useCallback(() => setCurrent(c => (c === 0 ? total - 1 : c - 1)), [total]);
  const next = useCallback(() => setCurrent(c => (c === total - 1 ? 0 : c + 1)), [total]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Figma: image 1098×565, glass card 758×240, overlaps image by 174px → 66px below image
  const IMG_H = 565;
  const GLASS_H = 240;
  const GLASS_OVERLAP = 174;
  const TOTAL_H = IMG_H + (GLASS_H - GLASS_OVERLAP); // 631px

  // Shared nav buttons — prev: outlined #174067, next: filled #174067 (Figma spec)
  const NavButtons = ({ size = 44 }: { size?: number }) => (
    <div style={{ display: "flex", gap: 8 }}>
      {/* Prev — outlined */}
      <button onClick={prev} style={{ width: size, height: size, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, background: "transparent", border: "1px solid #174067" }}>
        <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="#174067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {/* Next — filled */}
      <button onClick={next} style={{ width: size, height: size, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, background: "#174067", border: "none" }}>
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
            {slides.map((slide: any, i: number) => (
              <img key={i} src={slide.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === current ? 1 : 0, transition: "opacity 0.5s ease" }} />
            ))}
            {/* Glassmorphism card */}
            <div style={{
              position: "absolute", left: 16, right: 16, bottom: 16,
              padding: 16, borderRadius: 16,
              background: "rgba(13,36,59,0.30)", backdropFilter: "blur(26.5px)", WebkitBackdropFilter: "blur(26.5px)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex", flexDirection: "column", gap: 16, zIndex: 2,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                {Array.from({ length: total }).map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} style={{ height: 3, width: i === current ? 25 : 4, borderRadius: 9999, background: i === current ? "#f59e0b" : "rgba(255,255,255,0.5)", border: "none", padding: 0, cursor: "pointer", transition: "width 0.3s ease", flexShrink: 0 }} />
                ))}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, lineHeight: "1.4", color: "#fff", margin: 0 }}>{slides[current]?.caption}</p>
              <a href="#section14-story" style={{ textDecoration: "none" }}>
                <button className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#bf791d", borderRadius: 30, padding: "10px 18px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, alignSelf: "flex-start" }}>
                  Read Ujjwala's Story <ArrowIcon size={13} />
                </button>
              </a>
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
            {slides.map((slide: any, i: number) => (
              <img key={i} src={slide.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: i === current ? 1 : 0, transition: "opacity 0.5s ease" }} />
            ))}
          </div>

          {/* ── Glassmorphism card: bottom-left, 758×240, overlaps image by 174px ── */}
          <div style={{
            position: "absolute",
            left: 45,
            bottom: 0,
            width: isTablet ? "60%" : 758,
            minHeight: GLASS_H,
            borderRadius: 20,
            background: "rgba(13,36,59,0.30)",
            backdropFilter: "blur(26.5px)", WebkitBackdropFilter: "blur(26.5px)",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: 28,
            boxSizing: "border-box",
            display: "flex", flexDirection: "column", gap: 40,
            justifyContent: "space-between",
            zIndex: 3,
          }}>
            {/* Dots + quote group */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {Array.from({ length: total }).map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} style={{ height: 3, width: i === current ? 25 : 4, borderRadius: 9999, background: i === current ? "#f59e0b" : "rgba(255,255,255,0.5)", border: "none", padding: 0, cursor: "pointer", transition: "width 0.3s ease", flexShrink: 0 }} />
                ))}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "25px", color: "#fff", margin: 0 }}>
                {slides[current]?.caption}
              </p>
            </div>
            {/* CTA */}
            <button className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, boxShadow: "0 0 8px rgba(0,0,0,0.25)", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Choose How You Want To Help <ArrowIcon size={16} />
            </button>
          </div>

          {/* ── Navigation: bottom-right aligned to bottom of section ── */}
          <div style={{ position: "absolute", right: 0, bottom: 0, display: "flex", alignItems: "center", gap: 16, zIndex: 3 }}>
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
  { label: "Recognition 1",  sub: "", color: "#d9d9d9", img: imgMedia1 },
  { label: "Recognition 2",  sub: "", color: "#e2ddd6", img: imgMedia2 },
  { label: "Recognition 3",  sub: "", color: "#d9d9d9", img: imgMedia3 },
  { label: "Recognition 4",  sub: "", color: "#e2ddd6", img: imgMedia4 },
  { label: "Recognition 5",  sub: "", color: "#d9d9d9", img: imgMedia5 },
  { label: "Recognition 6",  sub: "", color: "#e2ddd6", img: imgMedia6 },
  { label: "Recognition 7",  sub: "", color: "#d9d9d9", img: imgMedia7 },
  { label: "Recognition 8",  sub: "", color: "#e2ddd6", img: imgMedia8 },
  { label: "Recognition 9",  sub: "", color: "#d9d9d9", img: imgMedia9 },
  { label: "Recognition 10", sub: "", color: "#e2ddd6", img: imgMedia10 },
];

const S4_LOOP = [...S4_CARDS, ...S4_CARDS, ...S4_CARDS];
const S4_N = S4_CARDS.length;

function Section4({ data }: { data?: any }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const content = (data?.content ?? {}) as any;
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
      <div id="section4-awards" ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#f8f5ef", paddingTop: isMobile ? 40 : 48, paddingBottom: isMobile ? 40 : 48, overflow: "hidden" }}>
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
              <div key={i} style={{ width: cardWidth, minHeight: isMobile ? 220 : 300, flexShrink: 0, borderRadius: 12, overflow: "hidden", position: "relative", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <img src={card.img} alt={card.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: side-by-side layout
  return (
    <div id="section4-awards" ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#f8f5ef", paddingTop: 48, paddingBottom: 48, overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 48, alignItems: "stretch", width: "100%" }}>
        <div style={{ flexShrink: 0, width: "calc(max(96px, (100vw - 1200px) / 2 + 96px) + 340px)", paddingLeft: "max(96px, calc((100vw - 1200px) / 2 + 96px))", display: "flex", flexDirection: "column", gap: 48, paddingTop: 28, boxSizing: "border-box" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 20px", borderRadius: 40, border: "1px solid #e8e8e8", alignSelf: "flex-start" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d", whiteSpace: "nowrap" }}>{content.badge || "Seen & acknowledged"}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 44, lineHeight: 1.24, color: "#000", margin: 0 }}>{content.title || "Finally, My Voice Reached!!"}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "24px", color: "#686868", margin: 0 }}>{content.description || "Awards don't define my work. They confirm that someone is watching and believe it mattered."}</p>
            </div>
          </div>
          {navButtons}
        </div>
        <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
          <div style={trackStyle}>
            {S4_LOOP.map((card, i) => (
              <div key={i} style={{ width: cardWidth, minHeight: 386, flexShrink: 0, borderRadius: 12, overflow: "hidden", position: "relative", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)")}>
                <img src={card.img} alt={card.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
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
  { id: "see",      label: "See • Hear • Read • Do",          body: "Every lesson becomes real when children first observe, listen, read, and then learn by doing.",                                              cta: "Watch This Method",    sepWidth: 220 },
  { id: "hear",     label: "Beyond Syllabus, Closer to Life", body: "Children step beyond textbooks into shops, streets, and spaces where learning meets the real world.",                                       cta: "See It In Action",     sepWidth: 177 },
  { id: "read",     label: "Read the World",                  body: "Wrappers, signboards, labels, and surroundings become reading lessons when children learn to notice meaning everywhere.",                   cta: "Watch How I Teach",    sepWidth: 177 },
  { id: "do",       label: "Confidence Before Marks",         body: "When children feel seen, understood, and capable, learning begins to stay with them for life.",                                            cta: "See Children Grow",    sepWidth: 177 },
  { id: "together", label: "Home, School, Society Together",  body: "A child learns stronger when teachers, families, and the community stand together around their journey.",                                  cta: "See This Connection",  sepWidth: 177 },
  { id: "future",   label: "Future-Ready Learning",           body: "Classrooms grow richer when curiosity, technology, and practical thinking prepare children for the world ahead.",                          cta: "Watch The Future",     sepWidth: 0   },
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

function Section5({ data }: { data?: any }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const content = (data?.content ?? {}) as any;
  const cmsItems = data?.items ?? [];
  const items = cmsItems.length > 0
    ? cmsItems.map((it: any, i: number) => ({
        ...S5_ITEMS[i % S5_ITEMS.length],
        ...Object.fromEntries(Object.entries(it).filter(([, v]) => v !== "" && v != null)),
        id: it.id ?? S5_ITEMS[i % S5_ITEMS.length]?.id ?? String(i),
      }))
    : S5_ITEMS;
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "see");

  const hPad = isMobile ? 20 : isTablet ? 40 : 350;

  return (
    <div id="section5-teaching" ref={sectionRef} className="fade-in-up" style={{
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
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>{content.badge || "Glimpse of my teaching!"}</span>
              </div>
            </div>
            <div style={{ width: isMobile || isTablet ? "100%" : "auto", maxWidth: 657 }}>
              <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 26 : isTablet ? 30 : 36, lineHeight: 1.32, color: "#000", textTransform: "capitalize", margin: 0 }}>
                {content.heading || "Creating Experiences That Live For Life. Beyond Syllabus, Closer To Life."}
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div style={{ paddingLeft: isMobile ? 0 : hPad, paddingTop: isMobile ? 24 : 44 }}>
            <div style={{ width: isMobile || isTablet ? "100%" : "auto", maxWidth: 562, display: "flex", flexDirection: "column" }}>
              {items.map((item: any, idx: number) => {
                const itemId = item.id ?? String(idx);
                const isActive = activeId === itemId;
                return (
                  <div key={itemId}>
                    {/* Row: icon + label */}
                    <button
                      onClick={() => setActiveId(itemId)}
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
                            {item.cta} <ArrowIcon />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Separator line */}
                    {(item.sepWidth === undefined || item.sepWidth > 0) && !isMobile && (
                      <div style={{ height: 1, width: item.sepWidth ?? 177, background: "rgba(0,0,0,0.15)", margin: "4px 0 4px 0" }} />
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

function Section6({ data }: { data?: any }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [activeTab, setActiveTab] = useState("teachers");
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 5000;
  const cmsItems = data?.items ?? [];
  const s6DataMerged: Record<string, Testimonial[]> = cmsItems.length > 0
    ? cmsItems.reduce((acc: Record<string, Testimonial[]>, it: any) => {
        const cat = it.category || "teachers";
        if (!acc[cat]) acc[cat] = [];
        const fallbackIdx = (S6_DATA[cat] ?? []).findIndex((t) => !acc[cat].some((a) => a.id === t.id));
        const fallback = (S6_DATA[cat] ?? [])[Math.max(0, fallbackIdx)];
        acc[cat].push({
          id: it.id || String(Math.random()),
          title: it.title || fallback?.title || "",
          body: it.body || fallback?.body || "",
          photo: it.photo || imgS6OverPhoto,
        });
        return acc;
      }, {})
    : S6_DATA;
  const tabs = Object.keys(s6DataMerged).map(id => ({ id, label: id.charAt(0).toUpperCase() + id.slice(1) }));
  const activeData = s6DataMerged[activeTab] ?? s6DataMerged[tabs[0]?.id] ?? [];

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
            {tabs.map((tab) => {
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

function Section7({ data }: { data?: any }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const content = (data?.content ?? {}) as any;

  // Scroll-triggered fill
  const textRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setInView(entry.isIntersecting); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const ArrowIcon = ({ color = "#bf791d" }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
      <div style={{ maxWidth: 1006, margin: "0 auto", position: "relative" }}>

        {/* Full-width text block — matches Figma w-[1008px] */}
        <div
          ref={textRef}
          style={{
            width: "100%",
            display: "flex", flexDirection: "column", gap: 12,
            /* paddingBottom = right column height (~66 subtext + 40 gap + 44 buttons) + top gap */
            paddingBottom: isMobile ? 0 : 200,
          }}
        >
          {/* Line 1 — Lora Regular 32px */}
          <p style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontSize: isMobile ? 20 : isTablet ? 26 : 32, lineHeight: 1.28, margin: 0 }}>
            <span style={{
              background: "linear-gradient(90deg, #000 50%, #d8d8d8 50%)",
              backgroundSize: "200% 100%",
              backgroundPosition: inView ? "0% 0" : "100% 0",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent", color: "transparent",
              willChange: "background-position",
              transition: "background-position 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0s",
            }}>
              {content.line1 || "I can teach and enlighten many children."}
            </span>
          </p>
          {/* Line 2 — Lora SemiBold 48px: dark + grey */}
          <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 28 : isTablet ? 36 : 48, lineHeight: 1.28, margin: 0 }}>
            <span style={{
              background: "linear-gradient(90deg, #000 50%, #d8d8d8 50%)",
              backgroundSize: "200% 100%",
              backgroundPosition: inView ? "0% 0" : "100% 0",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent", color: "transparent",
              willChange: "background-position",
              transition: "background-position 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
            }}>
              {content.line2Part1 || "But teaching every child that creates a lasting impact"}
            </span>
            <span style={{
              background: "linear-gradient(90deg, #bcbcbc 50%, #f0f0f0 50%)",
              backgroundSize: "200% 100%",
              backgroundPosition: inView ? "0% 0" : "100% 0",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent", color: "transparent",
              willChange: "background-position",
              transition: "background-position 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.35s",
            }}>
              {" "}{content.line2Part2 || "towards Ujjwal Bharat needs a larger mission"}
            </span>
          </p>
        </div>

        {/* Right column — absolute bottom-right, sits inside paddingBottom area */}
        {!isMobile ? (
          <div style={{
            position: "absolute", right: 0, bottom: 0,
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 40,
            paddingTop: 48,
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 16, lineHeight: "22px", color: "#686868",
              textAlign: "right", width: 243, margin: 0,
            }}>
              {content.supportText || "This larger mission needs all of us to unite. Teachers, students, parents, and society."}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Link to="/join"
                onMouseEnter={e => { e.currentTarget.style.setProperty("background", "#F9F2E8", "important"); }}
                onMouseLeave={e => { e.currentTarget.style.setProperty("background", "transparent", "important"); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 24px", borderRadius: 30,
                  border: "1px solid #bf791d", background: "transparent",
                  textDecoration: "none", cursor: "pointer", transition: "background 0.18s ease",
                }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#bf791d", whiteSpace: "nowrap" }}>{content.cta1Text || "Join Ujjwala's Mission"}</span>
                <ArrowIcon color="#bf791d" />
              </Link>
              <Link to="/donate" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 12, padding: "12px 24px", borderRadius: 30,
                background: "#bf791d", border: "none",
                textDecoration: "none", cursor: "pointer",
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", whiteSpace: "nowrap" }}>{content.cta2Text || "Donate Now"}</span>
                <ArrowIcon color="#fff" />
              </Link>
            </div>
          </div>
        ) : (
          /* Mobile: stacked below text */
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 24 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#686868", margin: 0 }}>
              {content.supportText || "This larger mission needs all of us to unite. Teachers, students, parents, and society."}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link to="/join" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "12px 24px", borderRadius: 30, border: "1px solid #bf791d", background: "transparent", textDecoration: "none" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#bf791d", whiteSpace: "nowrap" }}>{content.cta1Text || "Join Ujjwala's Mission"}</span>
                <ArrowIcon color="#bf791d" />
              </Link>
              <Link to="/donate" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "12px 24px", borderRadius: 30, background: "#bf791d", border: "none", textDecoration: "none" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", whiteSpace: "nowrap" }}>{content.cta2Text || "Donate Now"}</span>
                <ArrowIcon color="#fff" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section 8 — Sticky Card Stack (Figma 329:357) ────────────────────────
// @ts-ignore
import imgS8Teacher from "@/assets/fb67f8b019282de8f29678da8c918384c128715b.png";
// @ts-ignore
import imgS8PanelT0 from "@/assets/s8_panel_t0.jpg";
// @ts-ignore
import imgS8PanelT1 from "@/assets/s8_panel_t1.jpg";
// @ts-ignore
import imgS8PanelT2 from "@/assets/s8_panel_t2.jpg";
// @ts-ignore
import imgS8PanelT3 from "@/assets/s8_panel_t3.jpg";
// @ts-ignore
import imgS8PanelT4 from "@/assets/s8_panel_t4.jpg";
// @ts-ignore
import imgS8ShikshakUnnati from "@/assets/s8_shikshak_unnati.jpg";
// @ts-ignore
import imgS8UjjwalShala from "@/assets/s8_ujjwal_shala.jpg";
// @ts-ignore
import imgS8T1A from "@/assets/s8_t1_a.jpg";
// @ts-ignore
import imgS8T1B from "@/assets/s8_t1_b.jpg";
// @ts-ignore
import imgS8T2C from "@/assets/s8_t2_c.jpg";
// @ts-ignore
import imgS8T2D from "@/assets/s8_t2_d.jpg";
// @ts-ignore
import imgS8T3A from "@/assets/s8_t3_a.jpg";
// @ts-ignore
import imgS8T3B from "@/assets/s8_t3_b.jpg";
// @ts-ignore
import imgS8T3C from "@/assets/s8_t3_c.jpg";
// @ts-ignore
import imgS8T4B from "@/assets/s8_t4_b.jpg";
// @ts-ignore
import imgS8T4C from "@/assets/s8_t4_c.jpg";
// @ts-ignore
import imgS8T5A from "@/assets/s8_t5_a.jpg";
// @ts-ignore
import imgS8T5B from "@/assets/s8_t5_b.jpg";
// @ts-ignore
import imgS9IntroBg from "@/assets/s9_intro_bg.png";
// @ts-ignore
import imgVisionMissionBg from "@/assets/s_vision_mission_bg.jpg";
// @ts-ignore
import imgS9TeacherOverlay from "@/assets/s9_teacher_overlay.png";

// Section 10 — Get Involved, In Detail
// @ts-ignore
import imgS10TeacherRmBg from "@/assets/s10_teacher_removebg.png";
// @ts-ignore
import imgS10Classroom from "@/assets/s10_card_bg_classroom.jpg";
// @ts-ignore
import imgS10BgTeachers from "@/assets/s10_bg_teachers.jpg";
// @ts-ignore
import imgS10BgVolunteers from "@/assets/s10_bg_volunteers.jpg";
// @ts-ignore
import imgS10BgPartners from "@/assets/s10_bg_partners.jpg";
// @ts-ignore
import imgS10BgCsr from "@/assets/s10_bg_csr.jpg";

// Section 16 — Our Channels
// @ts-ignore
import imgS16Youtube from "@/assets/s16_img_youtube.png";
// @ts-ignore
import imgS16Instagram from "@/assets/s16_img_instagram.png";
// @ts-ignore
import imgS16Grid1 from "@/assets/s16_grid1.png";
// @ts-ignore
import imgS16Grid2 from "@/assets/s16_grid2.png";
// @ts-ignore
import imgS16Grid3 from "@/assets/s16_grid3.png";
// @ts-ignore
import imgS16Grid4 from "@/assets/s16_grid4.png";

// Section 15 — Team
// @ts-ignore
import imgS15PhotoKalpesh from "@/assets/s15_photo_kalpesh.png";
// @ts-ignore
import imgS15PhotoUrvi from "@/assets/s15_photo_urvi.png";
// @ts-ignore
import imgS15PhotoKalpesh2 from "@/assets/s15_photo_kalpesh2.png";

// Section 13 — Hero CTA banner
// @ts-ignore
import imgS13Bg from "@/assets/s13_bg_figma.png";
// @ts-ignore
import imgS13Teacher from "@/assets/s13_teacher.png";
// @ts-ignore
import imgS13Photo1 from "@/assets/s13_photo_1.jpg";
// @ts-ignore
import imgS13Photo2 from "@/assets/s13_photo_2.jpg";
// @ts-ignore
import imgS13Photo3 from "@/assets/s13_photo_3.jpg";
// Honest Impact section photos
// @ts-ignore
import imgHI1 from "@/assets/hi_1.jpg";
// @ts-ignore
import imgHI2 from "@/assets/hi_2.jpg";
// @ts-ignore
import imgHI3 from "@/assets/hi_3.jpg";
// @ts-ignore
import imgHI4 from "@/assets/hi_4.jpg";
// @ts-ignore
import imgHI5 from "@/assets/hi_5.jpg";
// @ts-ignore
import imgHI6 from "@/assets/hi_6.jpg";
// @ts-ignore
import imgHI7 from "@/assets/hi_7.jpg";
// @ts-ignore
import imgHI8 from "@/assets/hi_8.jpg";
// @ts-ignore
import imgHI9 from "@/assets/hi_9.jpg";
// @ts-ignore
import imgHI10 from "@/assets/hi_10.jpg";
// @ts-ignore
import imgHI11 from "@/assets/hi_11.jpg";
// @ts-ignore
import imgHI12 from "@/assets/hi_12.jpg";
// @ts-ignore
import imgHI13 from "@/assets/hi_13.jpg";
// @ts-ignore
import imgHI14 from "@/assets/hi_14.jpg";

// Section 14 — About teacher & org
// @ts-ignore
import imgS14Teacher from "@/assets/s14_photo_teacher.png";
// @ts-ignore
import imgS14PhotoBg from "@/assets/s14_photo_bg.png";
// @ts-ignore
import imgS14PhotoKids from "@/assets/s14_photo_kids.png";
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

// ── Section 8 collage photo panels (one per tab) ─────────────────────────
const s8Divider = { position: "absolute" as const, left: 0, right: 0, height: 1, background: "#d8cfc3", zIndex: 2 };
const s8VDivider = { position: "absolute" as const, top: 0, bottom: 0, width: 1, background: "#d8cfc3", zIndex: 2 };

// Tab 0 — Ujjwal Sanvaad: portrait (top 41%) | crowd (bottom)
const s8Collage0 = (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "41%" }}>
      <img src={imgS8T1A} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ ...s8Divider, top: "41%" }} />
    <div style={{ position: "absolute", top: "41%", left: 0, right: 0, bottom: 0 }}>
      <img src={imgS8T1B} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  </div>
);

// Tab 1 — Shikshak Unnati: teacher/robot (top 50%) | classroom session (bottom)
const s8Collage1 = (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%" }}>
      <img src={imgS8T2C} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
    </div>
    <div style={{ ...s8Divider, top: "50%" }} />
    <div style={{ position: "absolute", top: "50%", left: 0, right: 0, bottom: 0 }}>
      <img src={imgS8T2D} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  </div>
);

// Tab 2 — Unhali Shala: outdoor activity (top 69%) | two photos side-by-side (bottom)
const s8Collage2 = (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "69%" }}>
      <img src={imgS8T3A} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ ...s8Divider, top: "69%" }} />
    <div style={{ position: "absolute", top: "69%", left: 0, right: "48%", bottom: 0 }}>
      <img src={imgS8T3C} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ ...s8VDivider, left: "52%" }} />
    <div style={{ position: "absolute", top: "69%", left: "52%", right: 0, bottom: 0 }}>
      <img src={imgS8T3B} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  </div>
);

// Tab 3 — ShikshanSaath: group gathering (top 60%) | portrait bottom-right
const s8Collage3 = (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%" }}>
      <img src={imgS8T4B} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
    </div>
    <div style={{ ...s8Divider, top: "60%" }} />
    <div style={{ position: "absolute", top: "60%", left: 0, right: "48%", bottom: 0, background: "#f0ebe3" }} />
    <div style={{ ...s8VDivider, left: "52%" }} />
    <div style={{ position: "absolute", top: "60%", left: "52%", right: 0, bottom: 0 }}>
      <img src={imgS8T4C} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
    </div>
  </div>
);

// Tab 4 — Shala Abhiyan: school trip (top 50%) | distribution/crowd (bottom)
const s8Collage4 = (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%" }}>
      <img src={imgS8T5B} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ ...s8Divider, top: "50%" }} />
    <div style={{ position: "absolute", top: "50%", left: 0, right: 0, bottom: 0 }}>
      <img src={imgS8T5A} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  </div>
);

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
    photo: imgS8PanelT0,
    photoNode: undefined,
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
    photo: imgS8PanelT1,
    photoNode: undefined,
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
    photo: imgS8PanelT2,
    photoNode: undefined,
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
    photo: imgS8PanelT3,
    photoNode: undefined,
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
    photo: imgS8PanelT4,
    photoNode: undefined,
  },
];

// ── IntroNGOSection (Figma 773:754) ──────────────────────────────────────
function IntroNGOSection({ data }: { data?: any }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const content = (data?.content ?? {}) as any;

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
      <section id="section-intro-ngo" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 20px 0" : "60px 32px 0", boxSizing: "border-box" }}>
        <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 26 : 32, lineHeight: 1.3, color: "#000", textAlign: "center", margin: "0 0 32px" }}>
          {content.titleLine1 || "Introducing,"}<br />{content.titleLine2 || "Shiksha Raj, Ujjwal Bharat Foundation"}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {/* Vision */}
          <div style={{ background: "#f8f5ef", borderRadius: 20, border: "1px solid #ebd5b9", padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: isMobile ? 40 : 48, lineHeight: 1, background: "linear-gradient(to bottom, #d68a09 0%, #f8f5ef 75%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Vision</span>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#000", margin: 0 }}>
              {content.visionText || "To build education leadership (Shiksha Raj) for a Brighter India (Ujjwal Bharat) where every child receives free, accessible education that shapes confidence, capability, and character."}
            </p>
          </div>
          {/* Mission */}
          <div style={{ background: "linear-gradient(-21deg, #f8f5ef 41%, #fff 106%)", borderRadius: 20, border: "1px solid #ebd5b9", padding: "28px 24px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
            <DotGrid />
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: isMobile ? 44 : 52, lineHeight: 1, textAlign: "right", position: "relative", zIndex: 1, background: "linear-gradient(to bottom, #d68a09 0%, #f8f5ef 75%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mission</span>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#000", margin: 0, textAlign: "right", position: "relative", zIndex: 1 }}>
              {content.missionText || "To transform education into a practical, experiential, life-connected, digitally ready, teacher-led, community-supported system that goes beyond textbooks to give every child free, meaningful learning and prepare them for life."}
            </p>
          </div>
        </div>
        {/* Background image strip at bottom */}
        <div style={{ width: "100%", height: 200, borderRadius: "0 0 20px 20px", overflow: "hidden", position: "relative" }}>
          <img src={imgVisionMissionBg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #fff 0%, transparent 40%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #fff 0%, transparent 15%, transparent 85%, #fff 100%)", pointerEvents: "none" }} />
        </div>
      </section>
    );
  }

  // ── DESKTOP — pixel-perfect from Figma node 746:172 ──
  // Section: 1200×1052. Image frame (965:1130): top=541, height=511, full-width, rounded bottom.
  // Image inset: top=-127px (−24.85% of 511), clipped by overflow:hidden.
  return (
    <section id="section-intro-ngo" style={{ width: "100%", background: "#fff", position: "relative", height: 1120, overflow: "hidden" }}>

      {/* Background image — bottom portion of section */}
      <div style={{
        position: "absolute", left: 0, right: 0,
        top: 560, bottom: 0,
        overflow: "hidden",
        borderRadius: "0 0 30px 30px",
      }}>
        <img
          src={imgVisionMissionBg}
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            display: "block",
          }}
        />
        {/* Top fade — blends into white section above */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 40%)", pointerEvents: "none" }} />
        {/* Left fade */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #fff 0%, transparent 18%)", pointerEvents: "none" }} />
        {/* Right fade */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, #fff 0%, transparent 18%)", pointerEvents: "none" }} />
      </div>

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
          {content.titleLine1 || "Introducing,"}<br />{content.titleLine2 || "Shiksha Raj, Ujjwal Bharat Foundation"}
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
            zIndex: 2,
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
              {content.visionText || "To build education leadership (Shiksha Raj) for a Brighter India (Ujjwal Bharat) where every child receives free, accessible education that shapes confidence, capability, and character."}
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
            zIndex: 1, overflow: "hidden",
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
              {content.missionText || "To transform education into a practical, experiential, life-connected, digitally ready, teacher-led, community-supported system that goes beyond textbooks to give every child free, meaningful learning and prepare them for life."}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

function Section8({ onOpenModal, data }: { onOpenModal: () => void; data?: any }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  // Lock scroll-listener while a tab-click navigation is animating
  const isTabNavRef = useRef(false);
  const tabNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cmsItems = data?.items ?? [];
  const programs = cmsItems.length > 0
    ? cmsItems.map((it: any, i: number) => {
        const fallback = S8_PROGRAMS[i % S8_PROGRAMS.length];
        return {
          id: `s8-${i}`,
          tab: it.tab || fallback?.tab || "",
          hindi: it.hindi || fallback?.hindi || "",
          english: it.english || fallback?.english || "",
          desc: it.desc || fallback?.desc || "",
          bullets: fallback?.bullets ?? [],
          punchline: it.punchline || fallback?.punchline || "",
          cta: it.cta || fallback?.cta || "Learn More",
          photo: it.photo || fallback?.photo,
          photoNode: undefined,
        };
      })
    : S8_PROGRAMS;

  const TOTAL = programs.length; // 5
  const STEP = 350; // px of scroll per card advance
  const RUNWAY = TOTAL * STEP;

  // Card dimensions — extra 60px at TOP so stacked edges peek above active card
  const CARD_H = 460;
  const PEEK_TOP = 0;
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
    const prog = programs[activeIdx];
    return (
      <div id="section8-programs" style={{ width: "100%", background: "#fff", padding: isMobile ? "40px 20px 48px" : "48px 32px 60px", boxSizing: "border-box", position: "relative" }}>
        <span id="section8-adopt" style={{ position: "absolute", top: 0, left: 0, display: "block", height: 0, pointerEvents: "none" }} />
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 26 : 34, lineHeight: 1.28, color: "#000", margin: 0 }}>{(data?.content as any)?.title || "What the Trust Builds Ground"}</h2>
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 40, padding: "5px 16px", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#bf791d" }}>{(data?.content as any)?.badge || "On the Ground"}</span>
            </div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#686868", margin: 0 }}>
            {(data?.content as any)?.subtitle || "Five programmes built from 31 years of classroom truth — each one addresses a real need."}
          </p>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {programs.map((p: any, idx: number) => {
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
            {prog.tab === "ShikshanSaath" ? (
              <Link to="/donate" style={{ textDecoration: "none" }}>
                <button style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#bf791d", borderRadius: 30, padding: "10px 24px", border: "none", cursor: "pointer" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>{prog.cta}</span>
                  <S8Arrow color="#fff" />
                </button>
              </Link>
            ) : (
              <button onClick={onOpenModal} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#bf791d", borderRadius: 30, padding: "10px 24px", border: "none", cursor: "pointer" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>{prog.cta}</span>
                <S8Arrow color="#fff" />
              </button>
            )}
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
    <div id="section8-programs" ref={wrapperRef} style={{ position: "relative", height: `calc(100vh + ${RUNWAY}px)` }}>
      <span id="section8-adopt" style={{ position: "absolute", top: 0, left: 0, display: "block", height: 0, pointerEvents: "none" }} />
      <div style={{ position: "sticky", top: 0, height: "100vh", background: "#fff", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 1008, display: "flex", flexDirection: "column", gap: 48 }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 634 }}>
              <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 40, lineHeight: "54.4px", color: "#000", margin: 0, textTransform: "capitalize" }}>
                {(data?.content as any)?.title || "What the Trust Builds Ground"}
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "22px", color: "#686868", margin: 0 }}>
                {(data?.content as any)?.subtitle || "Five programmes built from 31 years of classroom truth — each one addresses a real need."}
              </p>
            </div>
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>{(data?.content as any)?.badge || "On the Ground"}</span>
            </div>
          </div>

          {/* Body: tabs + card stack */}
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>

            {/* Left: programme tabs */}
            <div style={{ width: 212, display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
              {programs.map((p: any, idx: number) => {
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
              {programs.map((prog: any, idx: number) => {
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
                        {prog.tab === "ShikshanSaath" ? (
                          <Link to="/donate" style={{ textDecoration: "none" }}>
                            <button style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#bf791d", border: "none", borderRadius: 30, padding: "10px 24px", cursor: "pointer", alignSelf: "flex-start" }}>
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>{prog.cta}</span>
                              <S8Arrow color="#fff" />
                            </button>
                          </Link>
                        ) : (
                          <button onClick={onOpenModal} style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#bf791d", border: "none", borderRadius: 30, padding: "10px 24px", cursor: "pointer", alignSelf: "flex-start" }}>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff" }}>{prog.cta}</span>
                            <S8Arrow color="#fff" />
                          </button>
                        )}
                      </div>
                      {/* Right photo */}
                      <div style={{ width: 260, flexShrink: 0, overflow: "hidden", position: "relative", background: "#ddd4c7" }}>
                        {prog.photoNode ?? <img src={prog.photo} alt={prog.english} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
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

// ── Shared type for CMS-wired sections ────────────────────────────────────
interface SectionData {
  content: Record<string, unknown>;
  items: Record<string, unknown>[];
  enabled: boolean;
  loading: boolean;
}

// ── Section 9 shell ───────────────────────────────────────────────────────
function Section9({ data }: { data: SectionData }) {
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

  const cards: S9Card[] = data.items.length > 0
    ? data.items.map((item, i) => ({
        id: `cms-${i}`,
        type: String(item.type || "content") as "video" | "content",
        tag: String(item.tag || ""),
        title: String(item.title || ""),
        desc: String(item.desc || ""),
        bullets: [item.bullet1, item.bullet2, item.bullet3, item.bullet4]
          .filter(Boolean).map(String),
        thumbnail: String(item.thumbnail || ""),
      }))
    : SECTION_9_CARDS;

  const s9Badge = String(data.content.badge || "Real change!");
  const s9Title = String(data.content.title || "What Real Progress Feels Like");

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
    <div id="section9-impact" ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#f8f5ef", borderRadius: 30, margin: "40px 0", overflow: "hidden" }}>

      {/* Header — full width so subtitle reaches the right edge */}
      <div style={{ paddingTop: 68, paddingBottom: 52, paddingLeft: hPad, paddingRight: hPad, width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px", alignSelf: "flex-start" }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>{s9Badge}</span>
            </div>
            <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: isMobile ? 28 : 40, lineHeight: "1.36", color: "#000", margin: 0, textTransform: "capitalize" }}>
              {s9Title}
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
          {cards.map(card => (
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
    photoBg: imgS10BgTeachers,
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
    photo: imgS10BgVolunteers,
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
    photo: imgS10BgPartners,
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
    photo: imgS10BgCsr,
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

function Section10({ onOpenModal, data }: { onOpenModal: () => void; data?: any }) {
  const sectionRef = useFadeInUp();
  const [activeTab, setActiveTab] = useState(0);
  const [fading, setFading] = useState(false);
  const [winW, setWinW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [cardH, setCardH] = useState(477);
  const contentRef = useRef<HTMLDivElement>(null);
  const cmsItems = data?.items ?? [];
  const tabs: S10TabData[] = cmsItems.length > 0
    ? cmsItems.map((it: any, i: number) => {
        const fallback = S10_TABS[i % S10_TABS.length];
        return {
          label: it.tab || fallback?.label || `Tab ${i + 1}`,
          forLabel: it.forLabel || fallback?.forLabel || "",
          desc: it.desc || fallback?.desc || "",
          bullets: fallback?.bullets ?? [],
          cta: it.cta || fallback?.cta || "Learn More",
          photo: it.photo || fallback?.photo,
          photoBg: fallback?.photoBg,
        };
      })
    : S10_TABS;

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

  // Hash-based tab deep-link activation
  useEffect(() => {
    const tabMap: Record<string, number> = {
      "section10-teachers": 0,
      "section10-volunteers": 1,
      "section10-partners": 2,
      "section10-csr": 3,
    };
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash in tabMap) setActiveTab(tabMap[hash]);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const tab    = tabs[activeTab];
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
    <section id="section10" ref={sectionRef} className="fade-in-up" style={{ position: "relative", width: "100%", background: "#fff", padding: isMobile ? "60px 0 80px" : "88px 0 100px" }}>
      <span id="section10-teachers"   style={{ position: "absolute", top: 0, left: 0, display: "block", height: 0, pointerEvents: "none" }} />
      <span id="section10-volunteers" style={{ position: "absolute", top: 0, left: 0, display: "block", height: 0, pointerEvents: "none" }} />
      <span id="section10-partners"   style={{ position: "absolute", top: 0, left: 0, display: "block", height: 0, pointerEvents: "none" }} />
      <span id="section10-csr"        style={{ position: "absolute", top: 0, left: 0, display: "block", height: 0, pointerEvents: "none" }} />
      <div style={{ maxWidth: CARD_W, margin: "0 auto", padding: `0 ${isMobile ? 16 : isTablet ? 24 : 0}px`, boxSizing: "border-box" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 52 }}>
          <h2 style={{
            fontFamily: "'Lora', serif", fontWeight: 600,
            fontSize: isMobile ? 28 : 40, lineHeight: "1.36",
            color: "#000", margin: "0 0 12px", textTransform: "capitalize",
          }}>
            {(data?.content as any)?.title || "Find Your Role In This Mission"}
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: 16, lineHeight: "22px", color: "#686868",
            margin: "0 auto", maxWidth: 556,
          }}>
            {(data?.content as any)?.subtitle || "Choose what fits your life and your capacity. Every role here connects directly to the way India educates."}
          </p>
        </div>

        {/* ── Tab + Card unified block ── */}
        {isMobile ? (
          /* Mobile: simple flex tabs above a rounded card */
          <div>
            <div style={{ display: "flex", gap: GAP, marginBottom: 0 }}>
              {tabs.map((t, i) => {
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
              <button onClick={onOpenModal} className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 40, padding: "0 20px", background: "#bf791d", border: "none", borderRadius: 30, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", cursor: "pointer" }}>
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
                  onClick={onOpenModal}
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
              {tabs.map((t, i) => {
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

function Section12({ onOpenModal, data }: { onOpenModal: () => void; data?: any }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const content = (data?.content ?? {}) as any;
  const cmsItems = data?.items ?? [];
  const cards = cmsItems.length > 0
    ? cmsItems.map((it: any, i: number) => ({ num: String(it.num ?? i + 1).padStart(2, "0"), title: it.title || "", desc: it.desc || "" }))
    : S12_CARDS;
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

        {/* Single pill above title */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: isMobile ? 16 : 20 }}>
          <span style={TAG_PILL}>{content.badge || "Your Contribution"}</span>
        </div>

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
          {content.title || "How Your Support Turns Into Learning"}
        </h2>

        {/* Process cards */}
        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 16, marginBottom: 24 }}>
          {cards.map((card: any) => (
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
                {content.ctaBannerText || "Stand with a mission where every contribution is valued, placed with care, and reflected in real change."}
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
              <button
                onClick={onOpenModal}
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
                {content.cta1Text || "Support This Mission"} <ArrowIcon color="#BF791D" size={16} />
              </button>
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
                  {content.cta2Text || "Donate Now"} <ArrowIcon color="#fff" size={16} />
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

function HonestImpactCard({ cardIdx, style, compact, overrideData }: { cardIdx: number; style?: React.CSSProperties; compact?: boolean; overrideData?: any }) {
  const fallback = HONEST_CARDS_DATA[cardIdx];
  const cms = overrideData;
  const card = cms ? {
    tags: [cms.tag1, cms.tag2].filter(Boolean),
    rows: [
      cms.row1Label ? { label: cms.row1Label, text: cms.row1Text || "" } : null,
      cms.row2Label ? { label: cms.row2Label, text: cms.row2Text || "" } : null,
      cms.row3Label ? { label: cms.row3Label, text: cms.row3Text || "" } : null,
    ].filter(Boolean) as { label: string; text: string }[],
  } : fallback;
  return (
    <div style={{
      background: "#f8f5ef", borderRadius: 16,
      padding: compact ? "16px 18px" : "28px 32px",
      display: "flex", flexDirection: "column",
      gap: compact ? 10 : 20,
      boxSizing: "border-box", overflow: "hidden", ...style,
    }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {card.tags.map(t => (
          <span key={t} style={{
            border: "1px solid #e8e8e8", borderRadius: 40,
            padding: compact ? "4px 12px" : "6px 20px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: compact ? 11 : 13, color: "#bf791d",
            whiteSpace: "nowrap", lineHeight: "normal",
          }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: compact ? 8 : 16, overflow: "hidden" }}>
        {card.rows.slice(0, compact ? 1 : undefined).map(row => (
          <div key={row.label}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: compact ? 12 : 15, lineHeight: "1.5", color: "#000", margin: "0 0 2px" }}>{row.label}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: compact ? 12 : 15, lineHeight: "1.6", color: "#636363", margin: 0,
              display: "-webkit-box", WebkitLineClamp: compact ? 4 : 999, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
            }}>{row.text}</p>
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

function HonestPhotoBlock({ src, style }: { src: string; style?: React.CSSProperties }) {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", flexShrink: 0, ...style }}>
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
}

function SectionHonestImpact({ data }: { data?: any }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const outerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const content = (data?.content ?? {}) as any;
  const cmsItems = data?.items ?? [];

  // Unified sticky-scroll: works for mobile, tablet, and desktop
  useEffect(() => {
    const outer = outerRef.current;
    const strip = stripRef.current;
    if (!outer || !strip) return;

    const updateHeight = () => {
      if (!isMobile && !isTablet) {
        // Desktop: align left padding with 1008px container
        const pLeft = Math.max(24, (window.innerWidth - 1008) / 2 + 24);
        strip.style.paddingLeft = `${pLeft}px`;
      }
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

  // ── Mobile / Tablet: sticky horizontal scroll, 1 full col + half peek ───
  if (isMobile || isTablet) {
    // Column width: exactly 1.5 cols fill the viewport → 1 full + half-cut peek
    const colW = "calc((100vw - 52px) / 1.5)"; // 52 = 20 left pad + 12 gap + 20 right pad
    const STRIP_H = isMobile ? 360 : 460;
    const GAP = 12;

    const MCol = ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: colW, flexShrink: 0, display: "flex", flexDirection: "column", gap: GAP, height: "100%" }}>
        {children}
      </div>
    );

    return (
      <div ref={outerRef} style={{ position: "relative", background: "#fff" }}>
        <div style={{
          position: "sticky", top: 0, height: "100vh", overflow: "hidden",
          background: "#fff", display: "flex", flexDirection: "column",
          justifyContent: "center", gap: 20, boxSizing: "border-box",
          padding: "32px 0",
        }}>

          {/* Header */}
          <div style={{ padding: "0 20px", flexShrink: 0 }}>
            <span style={{
              border: "1px solid #e8e8e8", borderRadius: 40, padding: "5px 16px",
              fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#bf791d",
              display: "inline-block", marginBottom: 10,
            }}>{content.badge || "Honest Impact"}</span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600,
              fontSize: isMobile ? 22 : 28, lineHeight: 1.3,
              color: "#000", margin: 0, textTransform: "capitalize",
            }}>{content.heading || "This mission touched lives deeply."}</h2>
          </div>

          {/* Scrolling strip — 10 columns, all same colW */}
          <div ref={stripRef} style={{
            display: "flex", gap: GAP, alignItems: "stretch",
            paddingLeft: 20, paddingRight: 20,
            height: STRIP_H, flexShrink: 0,
            willChange: "transform",
          }}>

            {/* Col 1: photo top + text card */}
            <MCol>
              <HonestPhotoBlock src={imgHI1} style={{ flex: 1 }} />
              <HonestImpactCard cardIdx={0} compact style={{ flexShrink: 0 }} overrideData={cmsItems[0]} />
            </MCol>

            {/* Col 2: full photo */}
            <div style={{ width: colW, flexShrink: 0, borderRadius: 16, overflow: "hidden" }}>
              <img src={imgHI2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* Col 3: 2 stacked photos */}
            <MCol>
              <HonestPhotoBlock src={imgHI3} style={{ flex: 1 }} />
              <HonestPhotoBlock src={imgHI4} style={{ flex: 1 }} />
            </MCol>

            {/* Col 4: text card + photo */}
            <MCol>
              <HonestImpactCard cardIdx={1} compact style={{ flexShrink: 0 }} overrideData={cmsItems[1]} />
              <HonestPhotoBlock src={imgHI5} style={{ flex: 1 }} />
            </MCol>

            {/* Col 5: 2 stacked photos */}
            <MCol>
              <HonestPhotoBlock src={imgHI6} style={{ flex: 1 }} />
              <HonestPhotoBlock src={imgHI7} style={{ flexShrink: 0, height: "35%" }} />
            </MCol>

            {/* Col 6: photo + text card */}
            <MCol>
              <HonestPhotoBlock src={imgHI8} style={{ flex: 1 }} />
              <HonestImpactCard cardIdx={2} compact style={{ flexShrink: 0 }} overrideData={cmsItems[2]} />
            </MCol>

            {/* Col 7: full photo */}
            <div style={{ width: colW, flexShrink: 0, borderRadius: 16, overflow: "hidden" }}>
              <img src={imgHI9} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* Col 8: 2 stacked photos */}
            <MCol>
              <HonestPhotoBlock src={imgHI10} style={{ flex: 1 }} />
              <HonestPhotoBlock src={imgHI11} style={{ flex: 1 }} />
            </MCol>

            {/* Col 9: text card + photo */}
            <MCol>
              <HonestImpactCard cardIdx={3} compact style={{ flexShrink: 0 }} overrideData={cmsItems[3]} />
              <HonestPhotoBlock src={imgHI12} style={{ flex: 1 }} />
            </MCol>

            {/* Col 10: 2 stacked photos */}
            <MCol>
              <HonestPhotoBlock src={imgHI13} style={{ flex: 1 }} />
              <HonestPhotoBlock src={imgHI14} style={{ flexShrink: 0, height: "35%" }} />
            </MCol>

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
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{
              border: "1px solid #e8e8e8", borderRadius: 40, padding: "6px 20px",
              fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d",
              display: "inline-block", width: "fit-content",
            }}>
              {content.badge || "Honest Impact"}
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600,
              fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.36,
              color: "#000", margin: 0, textTransform: "capitalize",
            }}>
              {content.heading || "This mission touched lives deeply."}
            </h2>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16,
            lineHeight: "22px", color: "#686868", textAlign: "right",
            maxWidth: 255, margin: 0, flexShrink: 0,
          }}>
            {content.subtitle || "In voices, journeys, and moments where children, families, and teachers, lives quietly transform."}
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

          {/* Col 1: photo (flex) + text card */}
          <div style={{ width: 459, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestPhotoBlock src={imgHI1} style={{ flex: 1 }} />
            <HonestImpactCard cardIdx={0} style={{ flexShrink: 0 }} overrideData={cmsItems[0]} />
          </div>

          {/* Col 2: full-height photo */}
          <div style={{ width: 350, flexShrink: 0, borderRadius: 16, overflow: "hidden" }}>
            <img src={imgHI2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>

          {/* Col 3: 2 stacked photos */}
          <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestPhotoBlock src={imgHI3} style={{ flex: 1 }} />
            <HonestPhotoBlock src={imgHI4} style={{ flex: 1 }} />
          </div>

          {/* Col 4: text card (flex) + photo bottom */}
          <div style={{ width: 350, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestImpactCard cardIdx={1} style={{ flex: 1, minHeight: 0 }} overrideData={cmsItems[1]} />
            <HonestPhotoBlock src={imgHI5} style={{ height: 352 }} />
          </div>

          {/* Col 5: 2 stacked photos */}
          <div style={{ width: 302, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestPhotoBlock src={imgHI6} style={{ flex: 1 }} />
            <HonestPhotoBlock src={imgHI7} style={{ height: 184 }} />
          </div>

          {/* Col 6: photo (flex) + text card */}
          <div style={{ width: 459, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestPhotoBlock src={imgHI8} style={{ flex: 1 }} />
            <HonestImpactCard cardIdx={2} style={{ flexShrink: 0 }} overrideData={cmsItems[2]} />
          </div>

          {/* Col 7: full-height photo */}
          <div style={{ width: 350, flexShrink: 0, borderRadius: 16, overflow: "hidden" }}>
            <img src={imgHI9} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>

          {/* Col 8: 2 stacked photos */}
          <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestPhotoBlock src={imgHI10} style={{ flex: 1 }} />
            <HonestPhotoBlock src={imgHI11} style={{ flex: 1 }} />
          </div>

          {/* Col 9: text card (flex) + photo bottom */}
          <div style={{ width: 350, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestImpactCard cardIdx={3} style={{ flex: 1, minHeight: 0 }} overrideData={cmsItems[3]} />
            <HonestPhotoBlock src={imgHI12} style={{ height: 352 }} />
          </div>

          {/* Col 10: 2 stacked photos */}
          <div style={{ width: 302, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
            <HonestPhotoBlock src={imgHI13} style={{ flex: 1 }} />
            <HonestPhotoBlock src={imgHI14} style={{ height: 184 }} />
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
function S15MapSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236 280" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M30 100 Q40 85 55 90 Q65 80 75 88 Q80 75 90 78 Q95 68 105 72 Q115 60 125 65 Q135 58 145 62 Q155 55 165 60 Q175 52 185 58 Q192 50 200 55 L205 70 Q195 75 190 85 Q195 95 188 105 Q180 100 175 110 Q180 120 172 130 Q165 125 158 135 Q162 145 155 152 Q148 148 142 158 Q145 168 138 175 Q130 170 125 180 Q128 190 120 197 Q112 192 108 202 Q110 215 102 220 Q93 215 90 225 Q88 238 80 240 Q72 235 70 245 Q62 243 58 235 Q52 240 45 232 Q40 225 44 215 Q38 210 35 200 Q28 198 25 188 Q20 180 25 170 Q18 162 22 152 Q16 145 20 135 Q14 128 18 118 Q12 110 18 103 Q24 96 30 100Z" stroke="white" strokeWidth="0.6" fill="none" opacity={0.6}/>
      <path d="M115 180 Q122 172 130 175 Q138 168 145 172 Q150 162 158 165 Q165 158 172 162 Q178 155 185 160 Q190 152 196 157 L200 170 Q193 176 190 186 Q195 196 188 204 Q180 200 175 210 Q178 220 170 226 Q162 222 158 232 Q160 242 152 248 Q144 244 140 252 Q138 264 130 265 Q122 260 120 250 Q112 252 108 242 Q110 232 104 226 Q96 228 94 218 Q98 208 94 200 Q100 196 105 188 Q110 182 115 180Z" stroke="white" strokeWidth="0.6" fill="none" opacity={0.5}/>
      <ellipse cx="185" cy="230" rx="22" ry="14" stroke="white" strokeWidth="0.6" fill="none" opacity={0.5}/>
      <path d="M50 50 Q58 42 68 46 Q76 38 85 42 Q92 35 100 38 L102 52 Q94 58 90 68 Q96 78 88 85 Q80 80 74 90 Q76 100 68 105 Q60 100 56 110 Q48 108 44 98 Q38 93 40 83 Q32 78 36 68 Q40 60 50 50Z" stroke="white" strokeWidth="0.6" fill="none" opacity={0.55}/>
    </svg>
  );
}

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
        >
          <S15MapSVG />
        </div>

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

function Section15({ data }: { data?: any }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const content = (data?.content ?? {}) as any;
  const cmsItems = data?.items ?? [];
  const teamMembers = cmsItems.length > 0
    ? cmsItems.map((it: any, i: number) => {
        const fallback = S15_TEAM[i % S15_TEAM.length];
        return {
          name: it.name || fallback?.name || "",
          role: it.role || fallback?.role || "",
          photo: it.photo || fallback?.photo,
          bio: it.bio || fallback?.bio || "",
        };
      })
    : S15_TEAM;

  // Card width: full fluid on mobile, fixed 236 on desktop
  const cardWidth = isMobile ? "80vw" : isTablet ? "calc(50% - 10px)" : 236;

  return (
    <section id="section15-team" ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0 56px" : "60px 0 80px" }}>
      <div style={{ maxWidth: 1008, margin: "0 auto", padding: isMobile ? "0 20px" : "0 1px", boxSizing: "border-box" }}>

        {/* Header */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            <span style={{
              display: "inline-block", border: "1px solid #e8e8e8", borderRadius: 40,
              padding: "6px 20px", fontFamily: "'Poppins', sans-serif",
              fontWeight: 400, fontSize: 13, color: "#bf791d", width: "fit-content",
            }}>
              {content.badge || "My support system"}
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 28,
              lineHeight: 1.36, color: "#000", margin: 0, textTransform: "capitalize",
            }}>
              {content.title || "Meet the faces that keep the mission alive"}
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15,
              lineHeight: "22px", color: "#686868", margin: 0,
            }}>
              {content.subtitle || "The first ones to inspire & believe in me. The first ones to carry the mission on their shoulders."}
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
              {content.badge || "My support system"}
            </span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600,
              fontSize: isTablet ? 30 : 40, lineHeight: 1.36,
              color: "#000", margin: 0, textTransform: "capitalize",
              textAlign: "center",
            }}>
              {content.title || "Meet the faces that keep the mission alive"}
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15,
              lineHeight: "22px", color: "#686868",
              width: isTablet ? 160 : 206, textAlign: "right", margin: 0,
            }}>
              {content.subtitle || "The first ones to inspire & believe in me. The first ones to carry the mission on their shoulders."}
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
            {teamMembers.map((member: any, i: number) => (
              <div key={i} style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
                <S15Card member={member} cardWidth={cardWidth} />
              </div>
            ))}
          </div>
        ) : isTablet ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {teamMembers.map((member: any, i: number) => (
              <S15Card key={i} member={member} cardWidth={cardWidth} />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", gap: 20 }}>
            {teamMembers.map((member: any, i: number) => (
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

function Section13({ onOpenModal, data }: { onOpenModal: () => void; data?: any }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const content = (data?.content ?? {}) as any;
  const bullets = [
    content.bullet1 || "Progress is visible & published",
    content.bullet2 || "Use of funds reported quarterly",
    content.bullet3 || "80G eligible · FCRA",
  ];

  return (
    <section style={{
      width: "100%", position: "relative",
      height: isMobile ? "auto" : 600,
      minHeight: isMobile ? 480 : "auto",
      overflow: "hidden",
    }}>

      {/* Full-bleed Figma frame background */}
      <img
        src={imgS13Bg}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Content container */}
      <div style={{
        maxWidth: 1190,
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
            {content.badge || "One Mission · Many Hands ·"}
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
            {content.heading || "One Teacher Started This. Many Can Keep It Going."}
          </h2>

          {/* Bullets — inline on mobile */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {bullets.map(item => (
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
              {content.cta1Text || "Donate Now"}
              <ArrowCircle color="rgba(255,255,255,0.7)" />
            </button>

            <button onClick={onOpenModal} className="btn-white" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
              background: "#fff", border: "1px solid #bf791d",
              borderRadius: 30, padding: "12px 24px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: isMobile ? 15 : 16,
              color: "#bf791d", whiteSpace: "nowrap",
            }}>
              {content.cta2Text || "Join Teacher Network"}
              <ArrowCircle color="#bf791d" />
            </button>

            <button onClick={onOpenModal} style={{
              display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 20,
              background: "transparent", border: "none",
              padding: "12px 0", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: isMobile ? 15 : 16,
              color: "#bf791d", whiteSpace: "nowrap",
            }}>
              {content.cta3Text || "Partner With Us"}
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
              {content.description || "What Ujjwala built inside her classroom over 31 years is now a structure that can travel — to other schools, other teachers, and other children who deserve the same quality of care and learning."}
            </p>
            {bullets.map(item => (
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
    name: "LinkedIn", href: "https://www.linkedin.com/in/ujjwala-wadekar-317094247/",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="2" y="9" width="4" height="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="4" cy="4" r="2" stroke={color} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    name: "WhatsApp", href: "https://wa.me/919370318308",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Instagram", href: "https://www.instagram.com/zp_teacher_ujjwala_wadekar/",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" fill="none" />
        <circle cx="17.5" cy="6.5" r="1" fill={color} />
      </svg>
    ),
  },
  {
    name: "YouTube", href: "https://www.youtube.com/channel/UCJOILwGRJVFODGp6uQGDF1w",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke={color} strokeWidth="1.8" fill="none" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={color} />
      </svg>
    ),
  },
];

function SocialIcon({ name, href, icon }: { name: string; href: string; icon: (c: string) => React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const blue = "#2e80d0";
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
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
        flexShrink: 0, textDecoration: "none",
      }}
    >
      {icon(hovered ? "#fff" : blue)}
    </a>
  );
}

function Section14({ data }: { data: SectionData }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const c = data.content;
  const s14Badge      = String(c.badge      || "About Ujjwal Mam");
  const s14Title      = String(c.title      || "After 31 years, I still feel like a young teacher joined on 5th July, 1995.");
  const s14Para1      = String(c.para1      || "Teaching found me because my family had always been teachers. My father, my mother, my grandmother. When I walked into my first government school classroom in 1995, I felt like I was continuing the family legacy.");
  const s14Para2      = String(c.para2      || "I have taught children who could not afford ten rupees for a school fee. I have gone to their homes at night without telling anyone. I have helped families get the documents that opened doors their children would otherwise never have found. I have done all of this because a teacher's job does not end when the bell rings.");
  const s14Para3      = String(c.para3      || "Its selfless service to the powerhouse of my country. No better satisfaction than shaping the bright minds of this country.");
  const s14TeacherImg = String(c.image      || "") || imgS14Teacher;
  const s14TrustTitle = String(c.trustTitle || "A Trust Built Because One Classroom Was Never Going To Be Enough");
  const s14TrustP1   = String(c.trustPara1 || "For 31 years, I saw bright, curious children slowly grow distant from learning. Not because they were weak, but because the system around them stopped speaking to their life, their struggle, and their reality.");
  const s14TrustP2   = String(c.trustPara2 || "Shiksha Raj Ujjwal Bharat Foundation was born from that journey — an education-only trust created to carry practical, teacher-led learning into schools and communities that need it most, with full transparency on every contribution and every change it helps bring.");

  return (
    <section id="section14-story" ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", marginTop: 0 }}>

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
                {s14Badge}
              </span>
              <h2 style={{
                fontFamily: "'Lora', serif", fontWeight: 600,
                fontSize: 28, lineHeight: 1.28,
                color: "#000", margin: 0, textTransform: "capitalize",
              }}>
                {s14Title}
              </h2>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                fontSize: 15, lineHeight: "26px", color: "#636363",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <p style={{ margin: 0 }}>{s14Para1}</p>
                <p style={{ margin: 0 }}>{s14Para2}</p>
                <p style={{ margin: 0 }}>{s14Para3}</p>
              </div>
              {/* Social icons row */}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                {S14_SOCIAL.map(s => <SocialIcon key={s.name} name={s.name} icon={s.icon} />)}
              </div>
            </div>

            {/* Teacher photo */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 32 }}>
              <img
                src={s14TeacherImg}
                alt="Ujjwal Mam"
                style={{ width: "70%", maxWidth: 280, objectFit: "contain", objectPosition: "bottom center" }}
              />
            </div>
          </div>
        ) : (
          // Tablet / Desktop: Figma 3-column layout with overlapping photo collage
          <div style={{ position: "relative", height: isTablet ? 400 : 452, overflow: "hidden" }}>

            {/* === Photo collage (absolutely positioned) === */}
            {/* Background scene */}
            <img src={imgS14PhotoBg} alt="" aria-hidden style={{
              position: "absolute",
              left: isTablet ? "36%" : 284,
              top: isTablet ? "42%" : 183,
              width: isTablet ? "46%" : 498,
              height: isTablet ? "52%" : 332,
              objectFit: "cover",
              zIndex: 0,
            }} />
            {/* Standing teacher — main portrait */}
            <img src={s14TeacherImg} alt="Ujjwal Mam" style={{
              position: "absolute",
              left: isTablet ? "46%" : 407,
              top: 0,
              width: isTablet ? "37%" : 420,
              height: "115%",
              objectFit: "cover",
              objectPosition: "top center",
              zIndex: 1,
            }} />
            {/* Kids group photo — bottom right */}
            <img src={imgS14PhotoKids} alt="" aria-hidden style={{
              position: "absolute",
              left: isTablet ? "66%" : 644,
              top: isTablet ? "52%" : 265,
              width: isTablet ? "34%" : 374,
              height: isTablet ? "48%" : 249,
              objectFit: "cover",
              zIndex: 2,
            }} />

            {/* White fade overlay — keeps text readable, lets images show through */}
            <div style={{
              position: "absolute",
              left: 0, top: 0,
              width: isTablet ? "70%" : "62%",
              height: "100%",
              background: "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.85) 55%, transparent 100%)",
              zIndex: 3, pointerEvents: "none",
            }} />

            {/* Left column — transparent so images show through */}
            <div style={{
              position: "absolute", left: 0, top: 0,
              width: isTablet ? 340 : 507,
              height: "100%", zIndex: 4,
              background: "none",
              display: "flex", flexDirection: "column",
              gap: isTablet ? 24 : 36,
              justifyContent: "center",
              paddingRight: 24,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{
                  display: "inline-flex", alignSelf: "flex-start",
                  border: "1px solid #e8e8e8", borderRadius: 40,
                  padding: "6px 20px",
                  fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 13,
                  color: "#bf791d", whiteSpace: "nowrap",
                }}>
                  {s14Badge}
                </span>
                <h2 style={{
                  fontFamily: "'Lora', serif", fontWeight: 600,
                  fontSize: isTablet ? 32 : 48, lineHeight: 1.24,
                  color: "#000", margin: 0, textTransform: "capitalize",
                }}>
                  {s14Title}
                </h2>
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                fontSize: 15, lineHeight: "26px", color: "#636363",
                width: isTablet ? "100%" : 392,
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <p style={{ margin: 0 }}>{s14Para1}</p>
                <p style={{ margin: 0 }}>{s14Para2}</p>
                <p style={{ margin: 0 }}>{s14Para3}</p>
              </div>
            </div>

            {/* Right column */}
            <div style={{
              position: "absolute", right: 0, top: 0,
              width: isTablet ? 160 : 197,
              height: "100%", zIndex: 4,
              display: "flex", flexDirection: "column",
              justifyContent: "space-between",
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
              {s14TrustTitle}
            </p>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: isMobile ? 14 : 16, lineHeight: "26px", color: "#636363",
              display: "flex", flexDirection: "column", gap: 2,
            }}>
              <p style={{ margin: 0 }}>{s14TrustP1}</p>
              <p style={{ margin: 0, maxWidth: 394 }}>{s14TrustP2}</p>
            </div>
          </div>

          {/* Right: photo grid */}
          {isMobile ? (
            <div style={{ display: "flex", gap: 10, width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div style={{ height: 100, borderRadius: 10, overflow: "hidden" }}>
                  <img src={imgS13Photo1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ height: 94, borderRadius: 10, overflow: "hidden" }}>
                  <img src={imgS13Photo2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
              <div style={{ flex: 1, borderRadius: 10, overflow: "hidden", border: "3px solid #fff", minHeight: 210 }}>
                <img src={imgS13Photo3} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12, flexShrink: 0, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: isTablet ? 160 : 220, height: 132, borderRadius: 12, overflow: "hidden" }}>
                  <img src={imgS13Photo1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ width: isTablet ? 150 : 207, height: 124, borderRadius: 12, overflow: "hidden" }}>
                  <img src={imgS13Photo2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
              <div style={{ width: isTablet ? 160 : 220, height: 292, borderRadius: 12, overflow: "hidden", border: "3px solid #fff" }}>
                <img src={imgS13Photo3} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ── Section 16 ─────────────────────────────────────────────────────────────
const S16_SOCIALS: { name: string; href: string; icon: (c: string) => React.ReactNode }[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ujjwala-wadekar-317094247/",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="2" y="9" width="4" height="12" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="4" cy="4" r="2" stroke={c} strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919370318308",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/zp_teacher_ujjwala_wadekar/",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke={c} strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="4" stroke={c} strokeWidth="1.8" fill="none" />
        <circle cx="17.5" cy="6.5" r="1" fill={c} />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCJOILwGRJVFODGp6uQGDF1w",
    icon: (c) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke={c} strokeWidth="1.8" fill="none" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={c} />
      </svg>
    ),
  },
];

function S16SocialBtn({ name, href, icon }: { name: string; href: string; icon: (c: string) => React.ReactNode }) {
  const [hov, setHov] = useState(false);
  const gold = "#bf791d";
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        border: `1.5px solid ${gold}`,
        background: hov ? gold : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", textDecoration: "none",
        transition: "background 0.18s, border 0.18s",
      }}
    >
      {icon(hov ? "#fff" : gold)}
    </a>
  );
}

function SupportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", city: "", role: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) { setFormData({ name: "", phone: "", email: "", city: "", role: "", message: "" }); setErrors({}); setIsSuccess(false); }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.message.trim()) newErrors.message = "Required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("volunteer_submissions").insert([{ name: formData.name, phone: formData.phone, email: formData.email, city: formData.city, role: formData.role, message: formData.message }]);
      if (error) throw error;
      setIsSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const INPUT: React.CSSProperties = {
    background: "rgba(255,255,255,0.25)",
    border: "1px solid #885615",
    borderRadius: 12,
    height: 48,
    padding: "0 15px",
    color: "#fff",
    fontFamily: "’DM Sans’, sans-serif",
    fontSize: 15,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };
  const ERR: React.CSSProperties = { color: "#ffcdd2", fontSize: 11, fontFamily: "’DM Sans’, sans-serif", marginTop: 3 };
  const chevron = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "16px" : "24px" }}
    >
      {/* Modal box */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%", maxWidth: 1080,
          background: "linear-gradient(to right, #714001, #965e00)",
          borderRadius: 30,
          padding: isMobile ? "40px 20px" : "60px 40px",
          overflow: "hidden",
          boxSizing: "border-box",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Background decoration */}
        <img src={s16_map_bg} alt="" style={{ position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)", height: 503, width: 755, pointerEvents: "none", zIndex: 0, opacity: 0.6 }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, zIndex: 10, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: isMobile || isTablet ? "column" : "row", gap: isMobile ? 40 : 44, alignItems: isMobile || isTablet ? "flex-start" : "center" }}>

          {/* Left — heading + bullets */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 32, minWidth: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ border: "1px solid #ae6e1a", borderRadius: 40, padding: "6px 20px", alignSelf: "flex-start" }}>
                <p style={{ fontFamily: "’Poppins’, sans-serif", fontSize: 13, color: "#fff", margin: 0, whiteSpace: "nowrap" }}>
                  Teacher-Led · Education-Only · Transparent
                </p>
              </div>
              <h2 style={{ fontFamily: "’Lora’, serif", fontWeight: 600, fontSize: isMobile ? 30 : 44, lineHeight: 1.28, color: "#fff", margin: 0, textTransform: "capitalize" }}>
                One Teacher Started This. Many Can Keep It Going.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Progress is visible & published", "Use of funds reported quarterly", "80G eligible · FCRA registered"].map((txt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                  <p style={{ fontFamily: "’DM Sans’, sans-serif", fontWeight: 300, fontSize: 15, color: "#fff", margin: 0, lineHeight: "24px" }}>{txt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          {isSuccess ? (
            <div style={{ flexShrink: 0, width: isMobile ? "100%" : 424, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16, padding: "40px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#4caf50", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h3 style={{ fontFamily: "’Lora’, serif", color: "#fff", fontSize: 24, margin: 0 }}>Thank You!</h3>
              <p style={{ fontFamily: "’DM Sans’, sans-serif", color: "#e0e0e0", fontSize: 16, margin: 0, lineHeight: 1.5 }}>We’ll be in touch soon.</p>
            </div>
          ) : (
            <div style={{ flexShrink: 0, width: isMobile ? "100%" : 424, display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Name */}
                <div>
                  <input placeholder="Tell us your name" style={{ ...INPUT, borderColor: errors.name ? "#ef5350" : "#885615" }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  {errors.name && <div style={ERR}>{errors.name}</div>}
                </div>

                {/* Phone + Email row */}
                <div style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <input placeholder="Number for a quick call" style={{ ...INPUT, borderColor: errors.phone ? "#ef5350" : "#885615" }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    {errors.phone && <div style={ERR}>{errors.phone}</div>}
                  </div>
                  <div style={{ flex: "0 0 auto", width: isMobile ? "100%" : 185 }}>
                    <input placeholder="Drop your email ID" style={{ ...INPUT, borderColor: errors.email ? "#ef5350" : "#885615" }} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    {errors.email && <div style={ERR}>{errors.email}</div>}
                  </div>
                </div>

                {/* City dropdown */}
                <div style={{ position: "relative" }}>
                  <select style={{ ...INPUT, appearance: "none", cursor: "pointer", color: formData.city ? "#fff" : "rgba(255,255,255,0.8)" }} value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
                    <option value="" disabled style={{ color: "#000" }}>City</option>
                    {["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad", "Other"].map(c => <option key={c} value={c} style={{ color: "#000" }}>{c}</option>)}
                  </select>
                  <div style={{ position: "absolute", right: 14, top: 15, pointerEvents: "none" }}>{chevron}</div>
                </div>

                {/* I am a... dropdown */}
                <div style={{ position: "relative" }}>
                  <select style={{ ...INPUT, appearance: "none", cursor: "pointer", color: formData.role ? "#fff" : "rgba(255,255,255,0.8)" }} value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                    <option value="" disabled style={{ color: "#000" }}>I am a…</option>
                    {["Teacher", "Parent", "Student", "Donor", "Volunteer", "Organisation", "Other"].map(r => <option key={r} value={r} style={{ color: "#000" }}>{r}</option>)}
                  </select>
                  <div style={{ position: "absolute", right: 14, top: 15, pointerEvents: "none" }}>{chevron}</div>
                </div>

                {/* Message */}
                <div>
                  <textarea placeholder="What brings you here today?" style={{ ...INPUT, height: 100, padding: "13px 15px", resize: "none", borderColor: errors.message ? "#ef5350" : "#885615" }} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  {errors.message && <div style={ERR}>{errors.message}</div>}
                </div>

              </div>

              <button onClick={handleSubmit} disabled={isSubmitting} style={{ display: "flex", alignItems: "center", gap: 20, background: "#0f2a44", border: "none", borderRadius: 30, padding: "12px 24px", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1, alignSelf: "center" }}>
                <span style={{ fontFamily: "’DM Sans’, sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", whiteSpace: "nowrap" }}>
                  {isSubmitting ? "Sending…" : "Send Your Message"}
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

function Section16({ data }: { data: SectionData }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const c = data.content;
  const s16Badge    = String(c.badge    || "In my words");
  const s16Title    = String(c.title    || "See The Work, Feel The Journey");
  const s16Subtitle = String(c.subtitle || "The full stories, lessons, and lived moments continue across every channel I share.");

  const socials = S16_SOCIALS.map((s) => ({
    ...s,
    href: (s.name === "LinkedIn"  && c.linkedinUrl  ? String(c.linkedinUrl)  :
           s.name === "WhatsApp"  && c.whatsappUrl  ? String(c.whatsappUrl)  :
           s.name === "Instagram" && c.instagramUrl ? String(c.instagramUrl) :
           s.name === "YouTube"   && c.youtubeUrl   ? String(c.youtubeUrl)   :
           s.href),
  }));

  const gridImages: string[] = data.items.length > 0
    ? data.items.map((item) => String(item.image || "")).filter(Boolean)
    : [imgS16Grid1, imgS16Grid2, imgS16Grid3, imgS16Grid4];

  const [gi1, gi2, gi3, gi4] = [
    gridImages[0] || imgS16Grid1,
    gridImages[1] || imgS16Grid2,
    gridImages[2] || imgS16Grid3,
    gridImages[3] || imgS16Grid4,
  ];

  return (
    <section id="section16-testimonials" ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0 56px" : "72px 0 80px" }}>
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
            {s16Badge}
          </span>
          <h2 style={{
            fontFamily: "'Lora', serif", fontWeight: 600,
            fontSize: isMobile ? 26 : "clamp(28px, 4vw, 40px)", lineHeight: 1.36,
            color: "#000", margin: 0, textTransform: "capitalize",
            textAlign: isMobile ? "left" : "right",
          }}>
            {s16Title}
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
              {s16Subtitle}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {socials.map((s) => (
                <S16SocialBtn key={s.name} name={s.name} href={s.href} icon={s.icon} />
              ))}
            </div>
          </div>

          {/* Right — image grid */}
          {isMobile || isTablet ? (
            // Mobile/Tablet: simple 2-column grid with objectFit cover
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[gi1, gi2, gi3, gi4].map((img, i) => (
                <div key={i} style={{ borderRadius: 14, overflow: "hidden", height: 160 }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          ) : (
            // Desktop: 2×2 grid with Figma images
            <div className="s16-right">
              <div className="s16-row">
                <div className="s16-img-wrap" style={{ flex: "1 1 0", height: 185 }}>
                  <img src={gi1} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="s16-img-wrap" style={{ flex: "1 1 0", height: 185 }}>
                  <img src={gi2} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
              <div className="s16-row">
                <div className="s16-img-wrap" style={{ flex: "1 1 0", height: 185 }}>
                  <img src={gi3} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="s16-img-wrap" style={{ flex: "1 1 0", height: 185 }}>
                  <img src={gi4} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

// ── Section 17 ─────────────────────────────────────────────────────────────
const S17_CATEGORIES = [
  {
    label: "About Ujjwala and the Trust",
    faqs: [
      {
        q: "How is Ujjwala Wadekar related to the trust?",
        a: "Ujjwala is the founder's inspiration and the lived force behind the trust. Her life's work gave this mission its voice, values, and direction.",
      },
      {
        q: "What does \"Where Teachers Lead And Society Lifts\" really mean?",
        a: "It means teachers should not carry change alone. When society stands beside them, education becomes stronger, more equal, and more lasting.",
      },
    ],
  },
  {
    label: "Support, Donations, and Transparency",
    faqs: [
      {
        q: "How will my donation actually be used?",
        a: "Your support goes into real learning needs — materials, programmes, mentorship, books, exposure, digital access, and school-strengthening support.",
      },
      {
        q: "Do you directly give cash to children or families?",
        a: "No. The focus is on meaningful educational support that helps children continue learning with dignity and continuity.",
      },
      {
        q: "Can I claim tax benefits on my donation under Section 80G?",
        a: "Yes, only if the trust has active 80G approval at the time of donation. Also, cash donations above ₹2,000 are not eligible, and 80G cannot be claimed under the new tax regime.",
      },
      {
        q: "Can I support a specific child, school, or programme directly?",
        a: "Yes. Support can be meaningfully directed through clear routes like a child's learning journey, a school-strengthening effort, or a defined programme.",
      },
    ],
  },
  {
    label: "Participation and Contribution",
    faqs: [
      {
        q: "How can someone help if they cannot donate money right now?",
        a: "You can still be part of this mission — by teaching, volunteering, mentoring, opening doors, spreading the word, or simply staying involved.",
      },
      {
        q: "I am not ready to donate yet. Can I still stay involved?",
        a: "Of course. This mission needs people, not only money — teachers, parents, volunteers, supporters, and communities all have a role here.",
      },
      {
        q: "Can teachers join this mission even if they are from another school or city?",
        a: "Yes. The trust is built to grow beyond one classroom and one place, through teacher networks, training, and replicable school models.",
      },
    ],
  },
  {
    label: "Programmes and Scale",
    faqs: [
      {
        q: "What kind of programmes will the trust actually run on the ground?",
        a: "From teacher training and Beyond Syllabus learning to student support, parent workshops, community events, and school-strengthening programmes — the work is meant to stay practical and real.",
      },
      {
        q: "How will these programmes reach children outside one school or one city?",
        a: "By building teacher-led models, training networks, scalable playbooks, and community-supported programmes that can travel from one place to many.",
      },
      {
        q: "What does \"Adopt A School\" really include?",
        a: "It includes more than funding — books, tools, mentoring, teaching support, workshops, and even school improvement drives led by the community.",
      },
    ],
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

function Section17({ data }: { data: SectionData }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  type FaqCat = { label: string; faqs: { q: string; a: string }[] };
  const categories: FaqCat[] = data.items.length > 0
    ? (() => {
        const map: Record<string, FaqCat> = {};
        data.items.forEach((item) => {
          const cat = String(item.category || "General");
          if (!map[cat]) map[cat] = { label: cat, faqs: [] };
          map[cat].faqs.push({ q: String(item.question || ""), a: String(item.answer || "") });
        });
        return Object.values(map);
      })()
    : S17_CATEGORIES;

  const s17Title = String(data.content.title || "Frequently Asked Questions");

  const handleCategoryChange = (i: number) => {
    setActiveCategory(i);
    setOpenIdx(0);
  };

  const toggle = (i: number) => setOpenIdx(prev => (prev === i ? null : i));

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "48px 0" : "80px 0" }}>
      <style>{`
        .s17-wrap { display: flex; gap: 60px; align-items: flex-start; }
        .s17-left { flex: 0 0 316px; display: flex; flex-direction: column; gap: 24px; }
        .s17-right { flex: 1; display: flex; flex-direction: column; gap: 29px; min-width: 0; }
        @media (max-width: 720px) {
          .s17-wrap { flex-direction: column; gap: 28px; }
          .s17-left { flex: none; width: 100%; }
          .s17-right { gap: 20px; }
          .s17-accordion-open { padding: 20px !important; }
          .s17-accordion-q-open { font-size: 15px !important; }
          .s17-accordion-a { font-size: 14px !important; }
          .s17-accordion-q-closed { font-size: 15px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1008, margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>
        <div className="s17-wrap">

          {/* Left — heading + category tabs */}
          <div className="s17-left">
            <h2 style={{
              fontFamily: "'Lora', serif", fontWeight: 600,
              fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 1.28,
              color: "#000", margin: 0,
            }}>
              {s17Title}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {categories.map((cat, i) => {
                const isActive = i === activeCategory;
                return (
                  <button
                    key={i}
                    onClick={() => handleCategoryChange(i)}
                    style={{
                      display: "inline-flex", alignSelf: "flex-start",
                      padding: "10px 24px", borderRadius: 30,
                      border: `1px solid #bf791d`,
                      background: isActive ? "#bf791d" : "transparent",
                      color: isActive ? "#fff" : "#bf791d",
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 14,
                      cursor: "pointer", transition: "all 0.2s ease",
                      textAlign: "left", lineHeight: 1.4,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — accordion for active category */}
          <div className="s17-right">
            {(categories[activeCategory]?.faqs ?? []).map((faq, i) => (
              <S17AccordionItem
                key={`${activeCategory}-${i}`}
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
const S18_QUOTES = [
  "Children do not lack intelligence. They lack the chance to be seen and guided.",
  "Education is not a privilege for a few. It is every child's rightful path forward.",
  "When a teacher walks to a child's door, education begins to feel possible again.",
  "The purpose of education is not finishing the syllabus. It's beyond the syllabus to build human beings.",
  "Education is the only way to break the cycle of survival and open the door to dignity.",
  "Education changes faster when teachers lead and the society lifts.",
  "When a teacher walks to a child's door, education begins to feel possible again.",
];

function Section18({ data }: { data?: any }) {
  const sectionRef = useFadeInUp();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const cmsItems = data?.items ?? [];
  const quotes: string[] = cmsItems.length > 0 ? cmsItems.map((it: any) => it.quote || "") : S18_QUOTES;
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const total = quotes.length;

  const go = useCallback((dir: "next" | "prev") => {
    setAnimKey(k => k + 1);
    setCurrent(c => dir === "next" ? (c === total - 1 ? 0 : c + 1) : (c === 0 ? total - 1 : c - 1));
  }, [total]);

  // Auto-advance every 4.5 s
  useEffect(() => {
    const t = setInterval(() => go("next"), 4500);
    return () => clearInterval(t);
  }, [go]);

  // Drag / swipe support
  const dragStartX = useRef<number | null>(null);
  const onDragStart = (clientX: number) => { dragStartX.current = clientX; };
  const onDragEnd   = (clientX: number) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? "next" : "prev");
    dragStartX.current = null;
  };

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "56px 0 52px" : "100px 0 96px" }}>
      <div style={{
        maxWidth: 1008,
        margin: "0 auto",
        padding: isMobile ? "0 20px" : "0 48px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? 32 : 48,
      }}>

        {/* Quote — reveal animation, two-tone, draggable */}
        <div
          style={{ width: "100%", maxWidth: 960, cursor: "grab", userSelect: "none" }}
          onMouseDown={e => onDragStart(e.clientX)}
          onMouseUp={e => onDragEnd(e.clientX)}
          onMouseLeave={() => { dragStartX.current = null; }}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
        >
          {(() => {
            const quote = quotes[current];
            const splitIdx = quote.indexOf(". ");
            const first = splitIdx !== -1 ? quote.slice(0, splitIdx + 1) : quote;
            const rest  = splitIdx !== -1 ? quote.slice(splitIdx + 1) : "";
            return (
              <p
                key={animKey}
                className="s18-reveal"
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: isMobile ? 26 : isTablet ? 36 : 52,
                  lineHeight: 1.24,
                  textAlign: "center",
                  margin: 0,
                }}
              >
                <span className="s18-fill-dark" style={{ fontWeight: 600 }}>{first}</span>
                {rest && <span className="s18-fill-grey" style={{ fontWeight: 400 }}>{" "}{rest}</span>}
              </p>
            );
          })()}
        </div>

        {/* CTA row: button + counter circle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="btn-gold" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
            background: "#bf791d", border: "none",
            borderRadius: 30, padding: "12px 24px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16,
            color: "#fff", cursor: "pointer", whiteSpace: "nowrap",
          }}>
            Read Ujjwala's Story
            <ArrowIcon color="#fff" size={16} />
          </button>

          {/* Counter circle with SVG progress ring */}
          <div style={{ position: "relative", width: 44, height: 44, flexShrink: 0, userSelect: "none" }}>
            <svg width="44" height="44" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
              {/* Track */}
              <circle cx="22" cy="22" r="19" fill="none" stroke="#e8e8e8" strokeWidth="1.5" />
              {/* Animated fill ring — key resets animation on every slide change */}
              <circle
                key={animKey}
                cx="22" cy="22" r="19" fill="none"
                stroke="#bf791d" strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="119.4"
                strokeDashoffset="119.4"
                style={{ animation: "s18Ring 4.5s linear forwards" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              fontSize: 12, color: "#174067",
            }}>
              {current + 1}/{total}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
// ── Section Closing ────────────────────────────────────────────────────────
function SectionClosing({ onOpenModal, data }: { onOpenModal: () => void; data?: any }) {
  const sectionRef = useFadeInUp();
  const textRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isMobile = useIsMobile();
  const content = (data?.content ?? {}) as any;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setRevealed(entry.isIntersecting); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fillSpan = (text: string, color: string, delay: number, weight: number = 400): React.ReactNode => (
    <span style={{
      background: `linear-gradient(90deg, ${color} 50%, #d0d0d0 50%)`,
      backgroundSize: "200% 100%",
      backgroundPosition: revealed ? "0% 0" : "100% 0",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      fontWeight: weight,
      willChange: "background-position",
      transition: `background-position 1.3s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    }}>{text}</span>
  );

  return (
    <section ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: isMobile ? "64px 0" : "100px 0" }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        padding: "0 16px", boxSizing: "border-box",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 48,
      }}>

        {/* Text block */}
        <div ref={textRef} style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 14, textAlign: "center", width: "100%" }}>

          {/* Line 1 — SemiBold black 28px */}
          <p style={{ fontFamily: "'Lora', serif", fontSize: isMobile ? 22 : 28, lineHeight: 1.36, margin: 0 }}>
            {fillSpan(content.line1 || "Education in India has not changed enough in decades.", "#000", 0, 600)}
          </p>

          {/* Line 2 — Regular 28px black */}
          <p style={{ fontFamily: "'Lora', serif", fontSize: isMobile ? 22 : 28, lineHeight: 1.36, margin: 0 }}>
            {fillSpan(content.line2 || "It will not change through criticism or hope alone", "#000", 0.12)}
          </p>

          {/* Line 3 — Regular 28px black */}
          <p style={{ fontFamily: "'Lora', serif", fontSize: isMobile ? 22 : 28, lineHeight: 1.36, margin: 0 }}>
            {fillSpan(content.line3 || "It will change when ordinary people decide to lift it together,", "#000", 0.24)}
          </p>

          {/* Line 4 — SemiBold 40px brown */}
          <p style={{ fontFamily: "'Lora', serif", fontSize: isMobile ? 28 : 40, lineHeight: 1.3, margin: 0 }}>
            {fillSpan(content.line4 || "and help build the उज्ज्वल भारत of 2050.", "#bf791d", 0.46, 600)}
          </p>

        </div>

        {/* CTA Button */}
        <button onClick={onOpenModal} style={{
          display: "flex", alignItems: "center", gap: 20,
          background: "#bf791d", border: "none",
          borderRadius: 30, padding: "12px 24px",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16,
          color: "#fff", cursor: "pointer", whiteSpace: "nowrap",
        }}>
          {content.ctaText || "I Commit To Education"}
          <ArrowIcon color="#fff" size={16} />
        </button>

      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
import { useCmsPage } from "../hooks/useCmsPage";

export function HomeV2Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const { getSection: getHomeSection } = useCmsPage("home");
  const { getSection: getBrandSection } = useCmsPage("brand");
  const openModal = () => setModalOpen(true);

  // Pre-fetch all section data so we can check `enabled` before rendering
  const dHero          = getHomeSection("HeroSection");
  const dProgramBanner = getHomeSection("ProgramBannerSection");
  const dQuotes        = getHomeSection("QuotesCarouselSection");
  const dS3            = getHomeSection("S3CarouselSection");
  const dRecognitions  = getHomeSection("RecognitionsSection");
  const dBeyond        = getHomeSection("BeyondSyllabusSection");
  const dTestimonials  = getHomeSection("TestimonialsSection");
  const dTextReveal    = getHomeSection("TextRevealSection");
  const dIntroNGO      = getHomeSection("IntroNGOSection");
  const dPrograms      = getHomeSection("ProgramsSection");
  const dGetInvolved   = getHomeSection("GetInvolvedSection");
  const dProcess       = getHomeSection("ProcessFlowSection");
  const dHonestImpact  = getHomeSection("HonestImpactSection");
  const dSupportCTA    = getHomeSection("SupportCTASection");
  const dTeam          = getHomeSection("TeamSection");
  const dClosing       = getHomeSection("ClosingSection");
  const dWhatProgress  = getHomeSection("WhatProgressSection");
  const dFeelTeacher   = getHomeSection("FeelTeacherSection");
  const dOurChannels   = getHomeSection("OurChannelsSection");
  const dFaq           = getHomeSection("FaqSection");

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column", alignItems: "stretch", overflowX: "clip" }}>
      <style>{GLOBAL_CSS}</style>
      {dHero.enabled         && <HeroSection onOpenModal={openModal} data={dHero} />}
      {dProgramBanner.enabled && <ProgramBanner onOpenModal={openModal} data={dProgramBanner} />}
      {dQuotes.enabled       && <Section18 data={dQuotes} />}
      {dS3.enabled           && <Section3 data={dS3} />}
      {dRecognitions.enabled && <Section4 data={dRecognitions} />}
      {dBeyond.enabled       && <Section5 data={dBeyond} />}
      {dTestimonials.enabled && <Section6 data={dTestimonials} />}
      {dTextReveal.enabled   && <Section7 data={dTextReveal} />}
      {dIntroNGO.enabled     && <IntroNGOSection data={dIntroNGO} />}
      {dPrograms.enabled     && <Section8 onOpenModal={openModal} data={dPrograms} />}
      <Section9 data={dWhatProgress} />
      {dGetInvolved.enabled  && <Section10 onOpenModal={openModal} data={dGetInvolved} />}
      {dProcess.enabled      && <Section12 onOpenModal={openModal} data={dProcess} />}
      {dHonestImpact.enabled && <SectionHonestImpact data={dHonestImpact} />}
      {dSupportCTA.enabled   && <Section13 onOpenModal={openModal} data={dSupportCTA} />}
      <Section14 data={dFeelTeacher} />
      {dTeam.enabled         && <Section15 data={dTeam} />}
      <Section16 data={dOurChannels} />
      <Section17 data={dFaq} />
      {dClosing.enabled      && <SectionClosing onOpenModal={openModal} data={dClosing} />}
      <Footer onOpenModal={openModal} />
      <SupportModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
