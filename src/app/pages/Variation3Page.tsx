import svgPaths from "../../imports/svg-7xvvus1vz0";
import imgWoman from "figma:asset/3295e477553d40b1c93909599b04241c3de200a2.png";

/* ─────────────────────────────────────────────
   SHARED TINY COMPONENTS
───────────────────────────────────────────── */

function ChevronDown({ color = "white" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 10L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <div
      style={{
        width: 22.627,
        height: 22.627,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* rotate(135deg) scaleY(-1) matches Figma: -scale-y-100 rotate-135 */}
      <div style={{ transform: "rotate(135deg) scaleY(-1)", display: "flex" }}>
        <div style={{ width: 16, height: 16, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: "5%" }}>
            <div style={{ position: "absolute", inset: "-9.8% -9.8% -8.88% -8.88%" }}>
              <svg width="100%" height="100%" viewBox="0 0 17.09 17.0901" fill="none">
                <path d={svgPaths.pe61a680} fill="white" stroke="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayCircle() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#1B61DB" />
      <path d={svgPaths.p27d853c0} fill="white" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   NAVIGATION BAR
───────────────────────────────────────────── */

function NavBar() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* 1200px centred header row */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO pill */}
        <div
          style={{
            width: 180,
            height: 60,
            background: "#D9D9D9",
            borderRadius: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#000",
              lineHeight: 1.6,
            }}
          >
            LOGO
          </span>
        </div>

        {/* Glassmorphism pill nav — hidden on small screens */}
        <div
          className="hidden md:flex"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 60,
            height: 59,
            paddingLeft: 40,
            paddingRight: 6,
            alignItems: "center",
            gap: 28,
            position: "relative",
          }}
        >
          {/* Blue active-indicator bar above Company */}
          <div
            style={{
              position: "absolute",
              top: -5,
              /* align above Company — 4th item, roughly 158px from right edge */
              right: 155,
              width: 86,
              height: 5,
              background: "#1B61DB",
              borderRadius: "16px 16px 0 0",
            }}
          />

          {/* Nav items group */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, height: 26 }}>
            {/* Services */}
            <button className="nav-item-btn" style={navItemStyle(false)}>
              <span>Services</span>
              <ChevronDown />
            </button>
            {/* Solutions */}
            <button className="nav-item-btn" style={navItemStyle(false)}>
              <span>Solutions</span>
              <ChevronDown />
            </button>
            {/* Case Studies */}
            <button className="nav-item-btn" style={navItemStyle(false)}>
              <span>Case Studies</span>
            </button>
            {/* Company – active */}
            <button className="nav-item-btn" style={navItemStyle(true)}>
              <span>Company</span>
              <ChevronDown color="#1B61DB" />
            </button>
          </div>

          {/* Donate Now – blue */}
          <div style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.3)", borderRadius: 30, flexShrink: 0 }}>
            <button style={donateBtnStyle("#1B61DB", 500)}>
              <span>Donate Now</span>
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* Mobile: just Donate Now */}
        <div className="flex md:hidden" style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.3)", borderRadius: 30 }}>
          <button style={donateBtnStyle("#1B61DB", 500)}>
            <span>Donate Now</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function navItemStyle(active: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: 2,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    color: active ? "#1B61DB" : "white",
    lineHeight: 1.6,
    whiteSpace: "nowrap",
  };
}

function donateBtnStyle(bg: string, weight: number): React.CSSProperties {
  return {
    background: bg,
    borderRadius: 30,
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 20,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 16,
    fontWeight: weight,
    color: "white",
    whiteSpace: "nowrap",
  };
}

/* ─────────────────────────────────────────────
   SPEECH BUBBLE  (glassmorphism over SVG shape)
───────────────────────────────────────────── */

function SpeechBubble() {
  return (
    <div
      style={{
        position: "absolute",
        left: 282,
        top: 2,
        width: 155,
        height: 67,
        zIndex: 4,
      }}
    >
      {/* SVG clip-path shape */}
      <svg
        style={{ position: "absolute", inset: 0, display: "block" }}
        width="155"
        height="67"
        viewBox="0 0 155 67"
        fill="none"
      >
        <defs>
          <clipPath id="bubble-clip">
            <path d={svgPaths.pe617c00} />
          </clipPath>
        </defs>
        {/* Glass fill */}
        <path
          d={svgPaths.pe617c00}
          fill="rgba(217,217,217,0.18)"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
        />
      </svg>

      {/* Backdrop blur layer clipped to bubble shape */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          clipPath: `path("${svgPaths.pe617c00}")`,
          WebkitClipPath: `path("${svgPaths.pe617c00}")`,
        }}
      />

      {/* Text content inside bubble (top portion, avoiding the tail) */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 12,
          right: 20,
          bottom: 14,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: "white",
            lineHeight: 1.4,
            whiteSpace: "nowrap",
          }}
        >
          Education First
        </span>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 11,
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.4,
            whiteSpace: "nowrap",
          }}
        >
          Ujjwal Bharat
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RIGHT — VIDEO BOXES COMPOSITION
───────────────────────────────────────────── */

function VideoBoxes() {
  return (
    /* Exact grid from Figma: inline-grid, place-items-start, leading-[0] */
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: "max-content",
        gridTemplateRows: "max-content",
        lineHeight: 0,
        placeItems: "start",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Top grey video box — row 1 col 1 */}
      <div
        style={{
          gridColumn: 1,
          gridRow: 1,
          width: 223,
          height: 126,
          background: "#D9D9D9",
          borderRadius: 12,
          marginLeft: 0,
          marginTop: 0,
        }}
      />

      {/* Top play button — row 1 col 1, offset ml-[101.75px] mt-[43px] */}
      <div
        style={{
          gridColumn: 1,
          gridRow: 1,
          marginLeft: 101.75,
          marginTop: 43,
          width: 32,
          height: 32,
          zIndex: 2,
        }}
      >
        <PlayCircle />
      </div>

      {/* Bottom rotated video box wrapper — row 1 col 1, offset */}
      <div
        style={{
          gridColumn: 1,
          gridRow: 1,
          marginLeft: 109.75,
          marginTop: 97.69,
          width: 135.255,
          height: 196.308,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
          <div
            style={{
              width: 196.308,
              height: 135.255,
              background: "#C7C7C7",
              border: "2px solid #112D48",
              borderRadius: 12,
            }}
          />
        </div>
      </div>

      {/* Bottom play button — row 1 col 1, offset ml-[160.75px] mt-[180px] */}
      <div
        style={{
          gridColumn: 1,
          gridRow: 1,
          marginLeft: 160.75,
          marginTop: 180,
          width: 32,
          height: 32,
          zIndex: 2,
        }}
      >
        <PlayCircle />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP HERO  (≥ 1024px)
───────────────────────────────────────────── */

function DesktopHero() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        padding: "0 16px",
        margin: "0 auto",
      }}
    >
      {/* 1008px inner content row */}
      <div
        style={{
          width: "100%",
          maxWidth: 1008,
          margin: "0 auto",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          minHeight: 520,
        }}
      >
        {/* ── LEFT (364px) ── */}
        <div
          style={{
            width: 364,
            paddingBottom: 40,
            display: "flex",
            flexDirection: "column",
            gap: 40,
            flexShrink: 0,
            zIndex: 2,
          }}
        >
          {/* Tags row + Heading stacked with 20px gap */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Three #171717 tags, 86×40 each, 12px gap */}
            <div style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 86,
                    height: 40,
                    background: "#171717",
                    borderRadius: 6,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Heading — Roboto SemiBold 48px, lh 1.24, capitalize, white */}
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 600,
                fontSize: 48,
                lineHeight: 1.24,
                color: "white",
                textTransform: "capitalize",
                margin: 0,
                width: "100%",
              }}
            >
              Lorem ipsum is simply dumm
            </p>
          </div>

          {/* Orange Donate Now — 40px below heading (gap handles it) */}
          <div style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.3)", display: "inline-flex", borderRadius: 30, alignSelf: "flex-start" }}>
            <button style={donateBtnStyle("#F59E0B", 600)}>
              <span>Donate Now</span>
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* ── CENTER WOMAN IMAGE (absolute) — left 373, top -20, 382×520 ── */}
        <div
          style={{
            position: "absolute",
            left: 373,
            top: -20,
            width: 382,
            height: 520,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <img
            alt="woman portrait"
            src={imgWoman}
            style={{
              position: "absolute",
              height: "100%",
              left: "-66.16%",
              top: "-0.05%",
              width: "203.74%",
              maxWidth: "none",
            }}
          />
        </div>

        {/* ── SPEECH BUBBLE — absolute left 282, top 2 ── */}
        <SpeechBubble />

        {/* ── RIGHT (245px) ── */}
        <div
          style={{
            width: 245,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 54,
            flexShrink: 0,
            zIndex: 2,
          }}
        >
          <VideoBoxes />

          {/* Explanatory text — Rubik Light 15px, #6C6C6C, right-align, lh 24px */}
          <p
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: "24px",
              color: "#6C6C6C",
              textAlign: "right",
              width: 245,
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {"Short explanation that \nHexanovate powers two lorem ips specialized domains is simply"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TABLET HERO  (768px – 1023px)
───────────────────────────────────────────── */

function TabletHero() {
  return (
    <div style={{ width: "100%", padding: "0 24px" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", minHeight: 420 }}>

        {/* LEFT */}
        <div style={{ width: 280, paddingBottom: 32, display: "flex", flexDirection: "column", gap: 32, flexShrink: 0, zIndex: 2 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 68, height: 34, background: "#171717", borderRadius: 6 }} />
              ))}
            </div>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600, fontSize: 36, lineHeight: 1.24, color: "white", textTransform: "capitalize", margin: 0 }}>
              Lorem ipsum is simply dumm
            </p>
          </div>
          <div style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.3)", display: "inline-flex", borderRadius: 30, alignSelf: "flex-start" }}>
            <button style={{ ...donateBtnStyle("#F59E0B", 600), fontSize: 14, padding: "10px 20px" }}>
              <span>Donate Now</span>
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-60%)",
            bottom: 0,
            width: 300,
            height: 420,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <img alt="woman portrait" src={imgWoman}
            style={{ position: "absolute", height: "100%", left: "-66.16%", top: "-0.05%", width: "203.74%", maxWidth: "none" }}
          />
        </div>

        {/* Tablet speech bubble */}
        <div style={{ position: "absolute", left: 210, top: 4, width: 130, height: 56, zIndex: 4 }}>
          <svg style={{ position: "absolute", inset: 0 }} width="130" height="56" viewBox="0 0 155 67" fill="none" preserveAspectRatio="none">
            <path d={svgPaths.pe617c00} fill="rgba(217,217,217,0.18)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          </svg>
          <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", clipPath: `path("M115 0C118.314 0 121 2.686 121 6V36.24C121 36.95 121.317 37.61 121.937 37.97L128 41.47C129.333 42.24 129.333 44.17 128 44.94L121.937 48.44C121.317 48.8 121 49.46 121 50.17V52.5C121 55.81 118.314 58.5 115 58.5H5C2.239 58.5 0 55.81 0 52.5V5C0 2.239 2.239 0 5 0H115Z")` }} />
          <div style={{ position: "absolute", top: 6, left: 10, right: 16, bottom: 12, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 500, color: "white", whiteSpace: "nowrap" }}>Education First</span>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap" }}>Ujjwal Bharat</span>
          </div>
        </div>

        {/* RIGHT — scaled video boxes + text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 32, flexShrink: 0, zIndex: 2, width: 190 }}>
          {/* Scaled video composition */}
          <div style={{ transform: "scale(0.82)", transformOrigin: "top right", position: "relative" }}>
            <VideoBoxes />
          </div>
          <p style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 300, fontSize: 13, lineHeight: "22px", color: "#6C6C6C", textAlign: "right", margin: 0 }}>
            Short explanation that{"\n"}Hexanovate powers two lorem ips specialized domains
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE HERO  (< 768px) — stacked layout
───────────────────────────────────────────── */

function MobileHero() {
  return (
    <div style={{ width: "100%", padding: "0 20px", display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Tags row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 74, height: 36, background: "#171717", borderRadius: 6 }} />
        ))}
      </div>

      {/* Heading */}
      <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600, fontSize: 32, lineHeight: 1.24, color: "white", textTransform: "capitalize", margin: "0 0 28px 0" }}>
        Lorem ipsum is simply dumm
      </p>

      {/* Orange CTA */}
      <div style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.3)", display: "inline-flex", borderRadius: 30, alignSelf: "flex-start", marginBottom: 36 }}>
        <button style={{ ...donateBtnStyle("#F59E0B", 600), fontSize: 15, padding: "10px 22px" }}>
          <span>Donate Now</span>
          <ArrowIcon />
        </button>
      </div>

      {/* Woman image + speech bubble container */}
      <div style={{ position: "relative", width: "100%", height: 360, marginBottom: 40 }}>
        {/* Speech bubble */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 140, height: 60, zIndex: 4 }}>
          <svg style={{ position: "absolute", inset: 0 }} width="140" height="60" viewBox="0 0 155 67" fill="none" preserveAspectRatio="none">
            <path d={svgPaths.pe617c00} fill="rgba(217,217,217,0.18)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          </svg>
          <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }} />
          <div style={{ position: "absolute", top: 8, left: 10, right: 16, bottom: 12, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 500, color: "white", whiteSpace: "nowrap" }}>Education First</span>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap" }}>Ujjwal Bharat</span>
          </div>
        </div>

        {/* Woman image full-width */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <img alt="woman portrait" src={imgWoman}
            style={{ position: "absolute", height: "110%", left: "50%", top: "-5%", transform: "translateX(-30%)", maxWidth: "none" }}
          />
        </div>
      </div>

      {/* Video boxes — scaled down, centred */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <div style={{ transform: "scale(0.75)", transformOrigin: "top center" }}>
          <VideoBoxes />
        </div>
      </div>

      {/* Explanatory text */}
      <p style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: "22px", color: "#6C6C6C", textAlign: "center", margin: "0 0 8px 0" }}>
        Short explanation that Hexanovate powers two lorem ips specialized domains is simply
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────── */

export function Variation3Page() {
  return (
    <div
      style={{
        background: "#090909",
        width: "100%",
        minHeight: "100vh",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: 28,
        paddingBottom: 0,
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* NAV */}
      <NavBar />

      {/* HERO — 44px below nav */}
      <div style={{ marginTop: 44 }}>
        {/* Desktop ≥ 1024px */}
        <div className="hidden lg:block">
          <DesktopHero />
        </div>
        {/* Tablet 768px – 1023px */}
        <div className="hidden md:block lg:hidden">
          <TabletHero />
        </div>
        {/* Mobile < 768px */}
        <div className="block md:hidden">
          <MobileHero />
        </div>
      </div>
    </div>
  );
}