import { useRef, useState, useEffect, useLayoutEffect } from "react";
import imgUnsplashDWelE1WZkFu from "figma:asset/3295e477553d40b1c93909599b04241c3de200a2.png";
import founderPhoto from "figma:asset/8255568bbb03a1180ca10eba4f98571a0f552af7.png";
import type { CSSProperties } from "react";

// ── Design System Tokens ──────────────────────────────────────────────────────
// PRIMARY  100:#b9d5f0  200:#96c0e8  300:#73abe0  400:#5096d8  500:#2e80d0
//          600:#266bad  700:#1e558a  800:#174067  900:#0f2a44  1000:#0a1b2c
// SECONDARY 100:#fdecce 200:#fbd89d 300:#f9c56d  400:#f7b13c  500:#f59e0b
//           600:#d68a09 700:#b77607 800:#976106  900:#774d05  1000:#583804
// FONTS: Lora (headings), DM Sans (body), Plus Jakarta Sans (labels)
// ─────────────────────────────────────────────────────────────────────────────

const highlights = [
  "50,000+ Lives Positively Impacted",
  "Free Quality Education For All",
  "Focused On Rural Maharashtra Communities",
];

const VIDEO_1_SRC =
  "https://www.youtube.com/embed/eIho2S0ZahI?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=eIho2S0ZahI";
const VIDEO_2_SRC =
  "https://www.youtube.com/embed/K1SzvvFtEww?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=K1SzvvFtEww";
const VIDEO_POSTER_1 =
  "https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const VIDEO_POSTER_2 =
  "https://images.unsplash.com/photo-1723564211731-21ceb97443a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";

// ── Dot pattern overlay ───────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "radial-gradient(rgba(150,192,232,0.055) 1px, transparent 1px)",
        backgroundSize: "34px 34px",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ── Background glows ──────────────────────────────────────────────────────────
function BgGlows() {
  return (
    <>
      {/* top-right blue glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center,rgba(46,128,208,0.15) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* bottom-center warm gold glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 640,
          height: 220,
          background:
            "radial-gradient(ellipse at center,rgba(245,158,11,0.08) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* left vertical gold line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "8%",
          left: 0,
          width: 1,
          height: "65%",
          background:
            "linear-gradient(to bottom,transparent,rgba(245,158,11,0.3),transparent)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

// ── Speech Bubble card ────────────────────────────────────────────────────────
function SpeechBubble() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          background: "rgba(23,64,103,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: "16px",
          padding: "18px 22px",
          boxShadow:
            "0 12px 36px rgba(0,0,0,0.38),inset 0 1px 0 rgba(255,255,255,0.06)",
          width: "max-content",
        }}
      >
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            color: "#f59e0b",
            marginBottom: 12,
          }}
        >
          WHY SHIKSHA RAJ?
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {highlights.map((text, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 9 }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#f59e0b,#f7b13c)",
                  flexShrink: 0,
                  boxShadow: "0 0 6px rgba(245,158,11,0.55)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.88)",
                  lineHeight: 1.4,
                  whiteSpace: "nowrap",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* tail pointing downward-left */}
      <div
        style={{
          position: "absolute",
          bottom: -9,
          left: 28,
          width: 0,
          height: 0,
          borderLeft: "9px solid transparent",
          borderRight: "9px solid transparent",
          borderTop: "9px solid rgba(23,64,103,0.6)",
        }}
      />
    </div>
  );
}

// ── Tag pill ──────────────────────────────────────────────────────────────────
function Tag() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: "rgba(245,158,11,0.12)",
        border: "1px solid rgba(245,158,11,0.32)",
        borderRadius: 100,
        padding: "5px 14px",
        fontFamily: "'Plus Jakarta Sans',sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.5px",
        color: "#f7b13c",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#f59e0b",
          boxShadow: "0 0 5px rgba(245,158,11,0.7)",
          display: "inline-block",
        }}
      />
      Ujjwal Bharat Mission
    </span>
  );
}

// ── Hero title ────────────────────────────────────────────────────────────────
function HeroTitle({ small = false }: { small?: boolean }) {
  const fs = small ? "clamp(34px,5.5vw,44px)" : "clamp(38px,3.2vw,58px)";
  return (
    <h1
      style={{
        fontFamily: "'Lora',Georgia,serif",
        fontSize: fs,
        fontWeight: 700,
        lineHeight: 1.2,
        color: "#ffffff",
        letterSpacing: "-0.4px",
        whiteSpace: "nowrap",
        display: "inline-block",
        maxWidth: "100%",
        overflow: "visible",
      }}
    >
      Shiksha Raj,
      <br />
      <span
        style={{
          background:
            "linear-gradient(90deg,#f59e0b 0%,#f7b13c 60%,#fbd89d 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Ujjwal Bharat
      </span>{" "}
      Mission
    </h1>
  );
}

// ── CTA buttons ───────────────────────────────────────────────────────────────
function CTAButtons() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <button
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "linear-gradient(135deg,#f59e0b 0%,#f7b13c 100%)",
          color: "#0a1b2c",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 15,
          fontWeight: 700,
          padding: "14px 28px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          boxShadow:
            "0 6px 22px rgba(245,158,11,0.38),0 2px 8px rgba(0,0,0,0.2)",
          width: "fit-content",
          letterSpacing: "0.2px",
        }}
      >
        Donate Now
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#0a1b2c"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// ── Single video card ─────────────────────────────────────────────────────────
function VideoCard({
  src,
  poster,
  label,
  style: extraStyle = {},
}: {
  src: string;
  poster: string;
  label: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(150,192,232,0.15)",
        boxShadow:
          "0 10px 36px rgba(0,0,0,0.5),0 2px 8px rgba(0,0,0,0.3)",
        background: "#0a1b2c",
        position: "absolute",
        ...extraStyle,
      }}
    >
      {/* poster behind iframe as fallback */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
        }}
      />
      <iframe
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 1,
        }}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={label}
      />
      {/* label badge */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          background: "rgba(10,27,44,0.75)",
          backdropFilter: "blur(8px)",
          borderRadius: 6,
          padding: "4px 10px",
          fontSize: 10,
          fontFamily: "'DM Sans',sans-serif",
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#f59e0b",
          }}
        />
        {label}
      </div>
    </div>
  );
}

// ── Overlapping videos composition ────────────────────────────────────────────
function OverlappingVideos({
  containerH = 360,
  containerRef,
  hideVideo1 = false,
}: {
  containerH?: number;
  containerRef?: React.RefObject<HTMLDivElement>;
  hideVideo1?: boolean;
}) {
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: containerH,
      }}
    >
      {/* Video 1 — hidden when flying video takes over */}
      <VideoCard
        src={VIDEO_1_SRC}
        poster={VIDEO_POSTER_1}
        label="Our Mission"
        style={{
          top: 0,
          left: 0,
          width: "calc(68% + 60px)",
          paddingBottom: "calc(38.25% + 33.75px)",
          zIndex: 1,
          visibility: hideVideo1 ? "hidden" : "visible",
        }}
      />
      {/* Video 2 — portrait, lower-right, in front */}
      <VideoCard
        src={VIDEO_2_SRC}
        poster={VIDEO_POSTER_2}
        label="Impact Stories"
        style={{
          top: "28%",
          right: 0,
          width: "58%",
          paddingBottom: "77.3%",
          zIndex: 2,
          boxShadow:
            "0 16px 48px rgba(0,0,0,0.6),0 4px 12px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
}

// ── Bottom-right subtitle ─────────────────────────────────────────────────────
function Subtitle() {
  return (
    <div>
      <div
        style={{
          width: 28,
          height: 2,
          background: "linear-gradient(90deg,transparent,#f59e0b)",
          marginBottom: 10,
          borderRadius: 2,
          marginLeft: "auto",
        }}
      />
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.75,
          color: "rgba(150,192,232,0.72)",
          letterSpacing: "0.1px",
          textAlign: "right",
        }}
      >
        Empowering communities through
        <br />
        education — every contribution
        <br />
        fuels a brighter tomorrow.
      </p>
    </div>
  );
}

// ── Teacher PNG (no background) ───────────────────────────────────────────────
const TEACHER_IMG_URL =
  "https://images.unsplash.com/photo-1622460241924-a114e6abe1ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

function TeacherImage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <img
        alt="Ujjwala Wadekar — Founder & Educator"
        src={founderPhoto}
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          height: "100%",
          width: "auto",
          objectFit: "contain",
          objectPosition: "bottom center",
          display: "block",
        }}
      />
    </div>
  );
}

// ── Scroll-reveal line wrapper ────────────────────────────────────────────────
// Fully scroll-driven: reveals on scroll-down, hides on scroll-up (no IntersectionObserver)
function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealP, setRevealP] = useState(0);

  useEffect(() => {
    let rafId: number;
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const wh = window.innerHeight;
        // 0 when line is at viewport bottom, 1 when line is 35% up the viewport
        const p = clamp((wh - rect.top) / (wh * 0.35), 0, 1);
        setRevealP(p);
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={ref} style={{ overflow: "hidden", display: "block" }}>
      <div
        style={{
          transform: `translateY(${lerp(105, 0, easeInOut(revealP))}%)`,
          opacity: revealP,
          // No CSS transition — scroll position drives this directly via rAF
          willChange: "transform, opacity",
          // delay shifts the start threshold so lines stagger naturally
          ...(delay > 0
            ? {} // delay is now baked into stagger via different start thresholds
            : {}),
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MISSION CTA SECTION
// ════════════════════════════════════════════════════════════════════════════
function MissionCTASection() {
  return (
    <section
      style={{
        background: "#ffffff",
        marginTop: 0,
        padding: "110px 24px 120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 3-line title — each line reveals independently */}
        <h2
          style={{
            fontFamily: "'Lora',Georgia,serif",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#0f2a44",
            letterSpacing: "-1px",
            margin: 0,
            maxWidth: 900,
          }}
        >
          <RevealLine delay={0}>Every Child Deserves</RevealLine>
          <RevealLine delay={120}>Quality Education</RevealLine>
          <RevealLine delay={240}>
            <span
              style={{
                background:
                  "linear-gradient(90deg,#f59e0b 0%,#f7b13c 60%,#fbd89d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Start Today
            </span>
          </RevealLine>
        </h2>

        {/* CTA row */}
        <RevealLine delay={380}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 52,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* Primary CTA */}
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "linear-gradient(135deg,#f59e0b 0%,#f7b13c 100%)",
                color: "#0a1b2c",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 16,
                fontWeight: 700,
                padding: "16px 36px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0 6px 24px rgba(245,158,11,0.35),0 2px 8px rgba(0,0,0,0.12)",
                letterSpacing: "0.2px",
              }}
            >
              Make a Donation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="#0a1b2c"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Secondary CTA */}
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "transparent",
                color: "#0f2a44",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 16,
                fontWeight: 700,
                padding: "15px 36px",
                borderRadius: 10,
                border: "2px solid #0f2a44",
                cursor: "pointer",
                letterSpacing: "0.2px",
              }}
            >
              Explore Our Courses
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="#0f2a44"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </RevealLine>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════════════════
export function Variation2Page() {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const scrollZoneRef = useRef<HTMLDivElement>(null);
  const ovRef = useRef<HTMLDivElement>(null);

  // ── State ─────────────────────────────────────────────────────────────────
  const [progress, setProgress] = useState(0);
  const [startRect, setStartRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  // ── Measure Video 1's natural rect (called once + on resize) ─────────────
  useLayoutEffect(() => {
    const measure = () => {
      const el = ovRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const W = el.offsetWidth;
      setStartRect({
        top: rect.top,
        left: rect.left,
        width: W * 0.68 + 60,
        height: W * 0.3825 + 33.75,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  // ── rAF scroll loop — drives progress 0→1 through scroll zone ────────────
  useEffect(() => {
    let rafId: number;
    const update = () => {
      if (scrollZoneRef.current) {
        const rect = scrollZoneRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // Animation spans 1.5× viewport heights of scrolling distance
        const animPx = 1.5 * vh;
        const p = clamp(-rect.top / animPx, 0, 1);
        setProgress(p);
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Derived values ────────────────────────────────────────────────────────
  const ep = easeInOut(progress); // eased progress for smooth feel
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;

  // Hero content fades out over first 45% of scroll
  const heroOpacity = clamp(1 - progress / 0.45, 0, 1);

  // Flying video: grows from card rect → full viewport
  const flyTop    = startRect ? lerp(startRect.top,    0,  ep) : 0;
  const flyLeft   = startRect ? lerp(startRect.left,   0,  ep) : 0;
  const flyWidth  = startRect ? lerp(startRect.width,  vw, ep) : vw;
  const flyHeight = startRect ? lerp(startRect.height, vh, ep) : vh;
  const flyRadius = lerp(14, 0, ep);
  // Phase 1 (0 → 0.04): snap visible instantly
  // Phase 2 (0.04 → 0.70): stay at full opacity while growing
  // Phase 3 (0.70 → 1.00): fade from 1 → 0.1 as video fills the screen
  const flyOpacity =
    progress < 0.04
      ? clamp(progress / 0.04, 0, 1)
      : progress < 0.7
      ? 1
      : lerp(1, 0.1, (progress - 0.7) / 0.3);

  // ── Overlay text stagger (keyed to scroll progress, fully reversible) ───────
  // Each value runs 0 → 1 as progress moves through its window, and reverses on scroll-up
  const overlayGradP = clamp((progress - 0.70) / 0.20, 0, 1); // gradient backdrop
  const labelP       = clamp((progress - 0.75) / 0.10, 0, 1); // tag pill
  const ol1P         = clamp((progress - 0.80) / 0.09, 0, 1); // "Every Child Deserves"
  const ol2P         = clamp((progress - 0.86) / 0.08, 0, 1); // "Quality Education"
  const ol3P         = clamp((progress - 0.91) / 0.07, 0, 1); // "Start Today"
  const ctaP         = clamp((progress - 0.95) / 0.05, 0, 1); // CTA buttons
  return (
    <div style={{ background: "#f4f6f9" }}>

      {/* ═══════════════════════════════════════════════════════════════════
          SCROLL ZONE  (300 vh)
          ├─ Sticky frame sticks for first 200 vh of scrolling
          │   ├─ Hero content  (fades out at progress > 0.45)
          │   └─ Flying video  (grows from card → full-screen at progress = 1)
          └─ After 200 vh: sticky frame scrolls away, MissionCTA enters
          ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={scrollZoneRef}
        style={{ height: "300vh", position: "relative" }}
      >
        {/* Sticky viewport — always 100 vh, sticks at top */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >

          {/* ── HERO CONTENT ─────────────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: heroOpacity,
              pointerEvents: heroOpacity < 0.05 ? "none" : "auto",
              background:
                "linear-gradient(155deg,#0a1b2c 0%,#0f2a44 45%,#122d4a 75%,#132f4f 100%)",
              borderBottomLeftRadius: lerp(30, 0, ep),
              borderBottomRightRadius: lerp(30, 0, ep),
            }}
          >
            <DotGrid />
            <BgGlows />

            {/* ── DESKTOP ≥ 1024 px ─────────────────────────────────────── */}
            <div
              className="hidden lg:block"
              style={{ position: "relative", zIndex: 1, height: "100%" }}
            >
              <img
                aria-hidden
                src="https://images.unsplash.com/photo-1758797316117-8d133af25f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb3V0c2lkZSUyMHNjaG9vbCUyMEluZGlhfGVufDF8fHx8MTc3MzY3MDE2MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: 0.1,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 380px 1fr",
                  height: "100%",
                  maxWidth: 1260,
                  margin: "0 auto",
                  padding: "0 44px",
                  gap: 28,
                  position: "relative",
                }}
              >
                {/* Col 1 */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingTop: 52,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div style={{ paddingBottom: 68 }}>
                    <Tag />
                    <div style={{ marginTop: 12 }}>
                      <HeroTitle />
                    </div>
                    <div style={{ marginTop: 32 }}>
                      <CTAButtons />
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 60 }}>
                      {[
                        { icon: "🏆", label: "National Award", year: "2022" },
                        { icon: "🌟", label: "Best NGO", year: "2023" },
                        { icon: "🎖️", label: "Impact Prize", year: "2024" },
                      ].map((award) => (
                        <div
                          key={award.label}
                          style={{
                            width: 120,
                            height: 60,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 4,
                            background: "rgba(23,64,103,0.45)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(245,158,11,0.22)",
                            borderRadius: 10,
                            boxShadow: "0 4px 14px rgba(0,0,0,0.28)",
                            flexShrink: 0,
                          }}
                        >
                          <span style={{ fontSize: 16, lineHeight: 1 }}>{award.icon}</span>
                          <span
                            style={{
                              fontFamily: "'Plus Jakarta Sans',sans-serif",
                              fontSize: 9,
                              fontWeight: 700,
                              color: "#f7b13c",
                              letterSpacing: "0.4px",
                              textAlign: "center",
                              lineHeight: 1.2,
                            }}
                          >
                            {award.label}
                          </span>
                          <span
                            style={{
                              fontFamily: "'DM Sans',sans-serif",
                              fontSize: 8,
                              fontWeight: 400,
                              color: "rgba(150,192,232,0.65)",
                              lineHeight: 1,
                            }}
                          >
                            {award.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Col 2 — teacher */}
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    overflow: "hidden",
                    zIndex: 1,
                  }}
                >
                  <TeacherImage />
                </div>

                {/* Col 3 — videos (Video 1 hidden when flying video active) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingTop: 44,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <OverlappingVideos
                    containerH={370}
                    containerRef={ovRef}
                    hideVideo1={progress > 0.02}
                  />
                  <div style={{ paddingBottom: 36 }}>
                    <Subtitle />
                  </div>
                </div>
              </div>
            </div>

            {/* ── TABLET 768–1023 px ──────────────────────────────────── */}
            <div
              className="hidden md:block lg:hidden"
              style={{ position: "relative", zIndex: 1, height: "100%" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 260px",
                  height: "72%",
                  padding: "40px 28px 0",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingBottom: 40,
                  }}
                >
                  <SpeechBubble />
                  <div>
                    <Tag />
                    <div style={{ marginTop: 12 }}>
                      <HeroTitle small />
                    </div>
                    <div style={{ marginTop: 32 }}>
                      <CTAButtons />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    minHeight: 340,
                  }}
                >
                  <TeacherImage />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                  padding: "0 28px 36px",
                  alignItems: "flex-end",
                }}
              >
                <OverlappingVideos containerH={280} hideVideo1={progress > 0.02} />
                <div style={{ paddingBottom: 4 }}>
                  <Subtitle />
                </div>
              </div>
            </div>

            {/* ── MOBILE < 768 px ─────────────────────────────────────── */}
            <div
              className="flex md:hidden"
              style={{
                flexDirection: "column",
                position: "relative",
                zIndex: 1,
                height: "100%",
                padding: "32px 20px 36px",
                gap: 28,
              }}
            >
              <div>
                <Tag />
                <div style={{ marginTop: 12 }}>
                  <HeroTitle small />
                </div>
                <div style={{ marginTop: 32 }}>
                  <CTAButtons />
                </div>
              </div>
              <SpeechBubble />
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  height: 300,
                  position: "relative",
                  background:
                    "linear-gradient(135deg,rgba(15,42,68,0.5),rgba(10,27,44,0.3))",
                }}
              >
                <TeacherImage />
              </div>
              <OverlappingVideos containerH={260} hideVideo1={progress > 0.02} />
              <Subtitle />
            </div>
          </div>
          {/* end HERO CONTENT */}

          {/* ── FLYING VIDEO ─────────────────────────────────────────────── */}
          {/* Rendered only once startRect is known; grows from card → full-screen */}
          {startRect && (
            <div
              style={{
                position: "absolute",
                top: flyTop,
                left: flyLeft,
                width: flyWidth,
                height: flyHeight,
                borderRadius: flyRadius,
                overflow: "hidden",
                zIndex: 25,
                // opacity moved to <iframe> so overlay text stays fully opaque
                willChange: "top, left, width, height, border-radius",
                boxShadow:
                  progress < 0.98
                    ? `0 ${lerp(10, 0, ep)}px ${lerp(40, 0, ep)}px rgba(0,0,0,${lerp(0.55, 0, ep)})`
                    : "none",
              }}
            >
              <iframe
                src={VIDEO_1_SRC}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block",
                  opacity: flyOpacity,
                }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Our Mission"
              />

              {/* ── OVERLAY SECTION — appears above the video as it goes full-screen ── */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // No background — overlay sits clean over the video
                  pointerEvents: ctaP > 0.5 ? "auto" : "none",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    maxWidth: 900,
                    padding: "0 32px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  {/* ── Tag pill ── */}
                  <div
                    style={{
                      opacity: easeInOut(labelP),
                      transform: `translateY(${lerp(32, 0, easeInOut(labelP))}px)`,
                      marginBottom: 24,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        background: "rgba(0,0,0,0.07)",
                        border: "1px solid rgba(0,0,0,0.25)",
                        borderRadius: 100,
                        padding: "6px 18px",
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "1.4px",
                        textTransform: "uppercase" as const,
                        color: "#000000",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#000000",
                          display: "inline-block",
                        }}
                      />
                      Ujjwal Bharat Mission
                    </span>
                  </div>

                  {/* ── Headline — 3 lines, each its own stagger window ── */}
                  <h2
                    style={{
                      fontFamily: "'Lora',Georgia,serif",
                      fontSize: "clamp(36px,5vw,72px)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      color: "#000000",
                      letterSpacing: "-0.5px",
                      margin: 0,
                    }}
                  >
                    {/* Line 1 */}
                    <div style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          opacity: easeInOut(ol1P),
                          transform: `translateY(${lerp(100, 0, easeInOut(ol1P))}%)`,
                          willChange: "transform, opacity",
                        }}
                      >
                        Every Child Deserves
                      </div>
                    </div>

                    {/* Line 2 */}
                    <div style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          opacity: easeInOut(ol2P),
                          transform: `translateY(${lerp(100, 0, easeInOut(ol2P))}%)`,
                          willChange: "transform, opacity",
                        }}
                      >
                        Quality Education
                      </div>
                    </div>

                    {/* Line 3 — black (no gradient) */}
                    <div style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          opacity: easeInOut(ol3P),
                          transform: `translateY(${lerp(100, 0, easeInOut(ol3P))}%)`,
                          willChange: "transform, opacity",
                        }}
                      >
                        Start Today
                      </div>
                    </div>
                  </h2>

                  {/* ── CTA buttons ── */}
                  <div
                    style={{
                      opacity: easeInOut(ctaP),
                      transform: `translateY(${lerp(40, 0, easeInOut(ctaP))}px)`,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginTop: 48,
                      flexWrap: "wrap" as const,
                      justifyContent: "center",
                    }}
                  >
                    <button
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 9,
                        background: "linear-gradient(135deg,#f59e0b 0%,#f7b13c 100%)",
                        color: "#0a1b2c",
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 15,
                        fontWeight: 700,
                        padding: "14px 32px",
                        borderRadius: 10,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 6px 24px rgba(245,158,11,0.4),0 2px 8px rgba(0,0,0,0.25)",
                        letterSpacing: "0.2px",
                      }}
                    >
                      Make a Donation
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="#0a1b2c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 9,
                        background: "rgba(0,0,0,0.07)",
                        color: "#000000",
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 15,
                        fontWeight: 700,
                        padding: "13px 32px",
                        borderRadius: 10,
                        border: "1px solid rgba(0,0,0,0.25)",
                        cursor: "pointer",
                        letterSpacing: "0.2px",
                      }}
                    >
                      Explore Our Courses
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* end overlay section */}

            </div>
          )}

        </div>
        {/* end sticky frame */}
      </div>
      {/* end scroll zone */}

      {/* ── MISSION CTA SECTION ─────────────────────────────────────────── */}
      <MissionCTASection />

    </div>
  );
}