/**
 * HomeV2Page — Figma-accurate (node 280:5999 + 294:94 section 5).
 * Sections: Hero, ProgramBanner, S2 (scroll-reveal), S3 (carousel),
 *           S4 (full-bleed cards), S5 (Beyond Syllabus accordion, 294:94)
 */
import { Link } from "react-router";
import { useState, useEffect, useCallback, useRef } from "react";

// ── Figma asset URLs ──────────────────────────────────────────────────────
const imgHero        = "http://localhost:3845/assets/2ca4cd7fc331c012fd6c3a208d30b67ca94bb02a.png";
const imgTeacher     = "http://localhost:3845/assets/3b08adbd33c0549761095e0db7549411c51bd4ec.png";
const imgTexture     = "http://localhost:3845/assets/10c9de2356342a2446587a7242a74b82052060e2.svg";
const imgEllipse1    = "http://localhost:3845/assets/bfca26775f8ffbbc192c6f8abee068e70d1ec79f.svg";
const imgEllipse2    = "http://localhost:3845/assets/7d726aa01847c452773e5fbeaccbbfdb8c917a52.svg";
const imgChevron     = "http://localhost:3845/assets/8d5928d43f1ad11aaebbaf276ef31f030d752d0e.svg";
const imgChevronGold = "http://localhost:3845/assets/e25a4b39e8a9a67792da4b7be40a5cd1efeff3fd.svg";
const imgPlayBtn     = "http://localhost:3845/assets/94b7d143f7d79dcee5c3ef4a168888c8f0e66ec9.svg";
const imgStatBg      = "http://localhost:3845/assets/b33ea922189e2f8727c7c9b20f1df35f797556ff.svg";
const imgCarousel1   = "http://localhost:3845/assets/b025de5e50e257a2a8382e99cc8bc799d9ebaba4.png";

// Section 5
const imgS5Bg        = "http://localhost:3845/assets/b0056acb9228f2476103c32804b577fabdab0b1e.png";
const imgS5Overlay   = "http://localhost:3845/assets/cf5d7b83739a4d18710739b24fc2b9dcac9c3b9b.svg";
const imgS5IconSee   = "http://localhost:3845/assets/6239a7c8a74115af9a45427cf8fc07127899149e.svg";
const imgS5IconHear  = "http://localhost:3845/assets/579a5483fb71d125cee21246fb7e91f5563c4bfd.svg";
const imgS5IconRead  = "http://localhost:3845/assets/7ad164ba0fa91571a1ae01850abe3826d3f6d73d.svg";
const imgS5SepLong   = "http://localhost:3845/assets/1b48129b855c986260738411455a70e5f4e4a07e.svg";
const imgS5SepShort  = "http://localhost:3845/assets/b4a6fb0375bb63074e5712fce882ac829cb825a4.svg";

// Section 6 — Testimonials local assets
// @ts-ignore
import imgS6Bg_local from "../../assets/3295e477553d40b1c93909599b04241c3de200a2.png";
// @ts-ignore
import imgS6Over_local from "../../assets/8255568bbb03a1180ca10eba4f98571a0f552af7.png";

const imgS6Bg         = imgS6Bg_local;
const imgS6OverPhoto  = imgS6Over_local;

const IconArrowL = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="19.5" stroke="#174067" />
    <path d="M22.5 15L17.5 20L22.5 25" stroke="#174067" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconArrowR = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="20" fill="#174067" />
    <path d="M17.5 15L22.5 20L17.5 25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconQuote = () => (
  <svg width="101" height="55" viewBox="0 0 101 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M41.246 0.063C18.47 4.545 0 24.327 0 48.016C0 51.878 3.13 55 7 55H34.246C38.116 55 41.246 51.878 41.246 48.016V27.5C41.246 23.638 38.116 20.516 34.246 20.516H18.563C21.782 11.232 30.563 4.545 41.246 0.063ZM101.246 0.063C78.47 4.545 60 24.327 60 48.016C60 51.878 63.13 55 67 55H94.246C98.116 55 101.246 51.878 101.246 48.016V27.5C101.246 23.638 98.116 20.516 94.246 20.516H78.563C81.782 11.232 90.563 4.545 101.246 0.063Z" fill="white" fillOpacity="0.2"/>
  </svg>
);

const imgS6ProgBg     = "http://localhost:3845/assets/03dce0304399973bbcca23766d34a2477e51f79f.svg";

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

// ── Dropdown — fixed: setTimeout prevents flicker on mouse travel ─────────
function NavDropdown({ label, gold = false, items }: { label: string; gold?: boolean; items: string[] }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpen(false), 150); };
  const cancelClose  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  return (
    <div style={{ position: "relative" }} onMouseEnter={() => { cancelClose(); setOpen(true); }} onMouseLeave={scheduleClose}>
      <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: gold ? "#ffa530" : "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: gold ? 600 : 400, padding: "4px 0" }}>
        {label}
        <img src={gold ? imgChevronGold : imgChevron} alt="" style={{ width: 16, height: 16 }} />
      </button>
      {open && (
        <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, minWidth: 190, background: "rgba(10,32,54,0.97)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 0", zIndex: 100, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
          {items.map(item => (
            <div key={item} style={{ padding: "10px 20px", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 1008 }}>
      <div style={{ background: "#d9d9d9", borderRadius: 40, height: 60, width: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#000" }}>Home + Logo</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28, paddingLeft: 28, paddingRight: 6, height: 59, borderRadius: 60, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(15px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, paddingLeft: 8 }}>
          <NavDropdown label="Ujjwala Wadekar" items={["Her Story", "31 Years of Teaching", "Awards & Recognition"]} />
          <NavDropdown label="Mission" items={["Shiksha Raj Method", "Beyond Syllabus", "Impact Reports"]} />
          <NavDropdown label="Mission" items={["Programs", "Schools", "Communities"]} />
          <NavDropdown label="Get Involved" gold items={["Donate", "Volunteer", "Partner With Us"]} />
        </div>
        <Link to="/donate" style={{ textDecoration: "none" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, whiteSpace: "nowrap" }}>
            Donate Now <ArrowIcon />
          </button>
        </Link>
      </div>
    </div>
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
  return (
    <div ref={ref} className="fade-in-up" style={{ width: "100%", minHeight: 724, position: "relative", background: "linear-gradient(114.7deg, #0a2036 0%, #132f4c 100%)", marginBottom: -131, overflow: "hidden", flexShrink: 0 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", height: 724 }}>
        <div style={{ position: "absolute", left: 645, top: 0, width: 646, height: 632, overflow: "hidden", pointerEvents: "none" }}>
          <img src={imgHero} alt="" style={{ width: "155.42%", height: "100%", objectFit: "cover", objectPosition: "left center", maxWidth: "none", position: "absolute", left: "-55.42%" }} />
        </div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 632, background: "linear-gradient(to right, #0b223a 30%, rgba(11,34,58,0) 70%)", pointerEvents: "none" }} />
        ))}
        <div style={{ position: "absolute", left: -122, top: -25, width: 653, height: 436, pointerEvents: "none", opacity: 0.45 }}>
          <img src={imgTexture} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", left: -122, top: 411, width: 653, height: 436, pointerEvents: "none", opacity: 0.35 }}>
          <img src={imgTexture} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", left: -822, top: -447, width: 1591, height: 928, transform: "rotate(90deg)", pointerEvents: "none", opacity: 0.25 }}>
          <img src={imgEllipse1} alt="" style={{ width: "100%", height: "100%" }} />
        </div>
        <div style={{ position: "absolute", left: 830, top: 110, width: 277, height: 277, pointerEvents: "none" }}>
          <img src={imgEllipse2} alt="" style={{ width: "100%", height: "100%" }} />
        </div>
        <div style={{ position: "absolute", left: 785, top: 53, width: 84, height: 6, background: "#ffa530", borderRadius: 3 }} />
        <div style={{ padding: "28px 96px 60px", display: "flex", flexDirection: "column", gap: 44, alignItems: "center", position: "relative", zIndex: 2 }}>
          <Navbar />
          <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: 1008 }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 40, width: 364, flexShrink: 0, position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Award 1", "Award 2", "Award 3"].map(a => (
                    <div key={a} style={{ background: "#13304c", borderRadius: 6, height: 40, width: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 200, fontSize: 13, color: "#fff" }}>{a}</span>
                    </div>
                  ))}
                </div>
                <h1 style={{ fontFamily: "'Lora', serif", fontWeight: 500, fontSize: 48, lineHeight: 1.2, color: "#fff", textTransform: "capitalize", width: 455, margin: 0 }}>
                  {"A Teacher's Work, "}<br />{"Scaled Into a Public"}
                </h1>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <Link to="/donate" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.3)" }}>
                    Donate Now <ArrowIcon />
                  </button>
                </Link>
                <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, padding: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M9 15l-5-5M9 15l5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Problems we are working on
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 36, alignItems: "flex-end", width: 245, flexShrink: 0, position: "relative", zIndex: 2 }}>
              <VideoCards />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "22px", color: "#fff", textAlign: "right", width: 245, margin: 0 }}>
                Short explanation that Hexanovate powers two lorem ips specialized domains is simply
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ProgramBanner ─────────────────────────────────────────────────────────
function ProgramBanner() {
  const ref = useFadeInUp();
  const items = ["Monthly workshops (in-person, Jalgaon)", "Access to shared lesson resource library", "Peer mentoring circles"];
  return (
    <div ref={ref} className="fade-in-up" style={{ width: "100%", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", borderRadius: 30, background: "linear-gradient(280deg, #b77607 0.12%, #885615 99.88%)" }}>
        <div style={{ padding: "24px 96px", boxSizing: "border-box", position: "relative" }}>
          <div style={{ display: "flex", gap: 80, alignItems: "flex-start", position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 488, color: "#fff", flexShrink: 0 }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 18, margin: 0 }}>Name of the Program 4</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "24px", margin: 0 }}>
                Join the Teacher Reformers Network — a community of 340+ teachers sharing methods, resources, and practical innovations.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", color: "#fff", flexShrink: 0 }}>
              {items.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0" }}>
                  <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowIcon size={14} /></div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: "24px", margin: 0, whiteSpace: "nowrap" }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", right: 0, bottom: 0 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 20, background: "#0f2a44", borderRadius: 20, padding: "10px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, whiteSpace: "nowrap" }}>
                Join Teacher Network <ArrowIcon />
              </button>
            </div>
          </div>
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
  const words = S2_TEXT.split(" ");
  return (
    <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 96px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 48, alignItems: "center", width: "100%" }}>
          <div style={{ textAlign: "center", width: 960 }}>
            <p ref={textRef} style={{ margin: 0, fontSize: 52, lineHeight: 1.24, fontFamily: "'Lora', serif", fontWeight: 700 }}>
              {words.map((word, i) => (<span key={i} className="trw">{word}{" "}</span>))}
            </p>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <button style={{ display: "flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, whiteSpace: "nowrap" }}>
              About Ujjwala <ArrowIcon />
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 20, background: "transparent", borderRadius: 30, padding: "12px 24px", border: "1px solid #bf791d", cursor: "pointer", color: "#bf791d", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, whiteSpace: "nowrap" }}>
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
  const [current, setCurrent] = useState(0);
  const total = S3_SLIDES.length;
  const prev = useCallback(() => setCurrent(c => (c === 0 ? total - 1 : c - 1)), [total]);
  const next = useCallback(() => setCurrent(c => (c === total - 1 ? 0 : c + 1)), [total]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 51px", position: "relative" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 1098, margin: "0 auto", borderRadius: "32px 80px 32px 80px", overflow: "hidden", aspectRatio: "1098 / 565", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}>
          <img key={current} src={S3_SLIDES[current].img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 45, bottom: 32, width: 528, padding: 28, borderRadius: 20, background: "rgba(13,36,59,0.30)", backdropFilter: "blur(26.5px)", WebkitBackdropFilter: "blur(26.5px)", border: "1px solid rgba(255,255,255,0.5)", display: "flex", flexDirection: "column", gap: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, height: 3 }}>
              {Array.from({ length: total }).map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{ height: 3, width: i === current ? 28 : 14, borderRadius: 9999, background: i === current ? "#f59e0b" : "rgba(255,255,255,0.4)", border: "none", padding: 0, cursor: "pointer", transition: "width 0.3s ease, background 0.3s ease", flexShrink: 0 }} />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 20, lineHeight: "28px", color: "#fff", margin: 0 }}>{S3_SLIDES[current].caption}</p>
              <button style={{ display: "inline-flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, whiteSpace: "nowrap", alignSelf: "flex-start" }}>
                Choose How You Want To Help <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, position: "absolute", right: 51, bottom: 0, transform: "translateY(-100%)", paddingBottom: 8 }}>
          <button onClick={prev} style={{ width: 44, height: 44, borderRadius: 30, border: "1px solid #174067", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 5L7 10L12 15" stroke="#174067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={next} style={{ width: 44, height: 44, borderRadius: 30, background: "#174067", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5L13 10L8 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 18, color: "#174067", minWidth: 28, textAlign: "center" }}>{current + 1}/{total}</span>
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

function Section4() {
  const sectionRef = useFadeInUp();
  const [offset, setOffset] = useState(0);
  const [cardWidth, setCardWidth] = useState(268);
  const GAP = 16;

  const updateCardWidth = useCallback(() => {
    const vw = window.innerWidth;
    const leftMargin = Math.max(0, (vw - 1200) / 2);
    const leftColOffset = leftMargin + 96 + 340 + 48;
    const trackW = vw - leftColOffset;
    const targetVisible = vw >= 1100 ? 2.5 : vw >= 700 ? 1.8 : 1.2;
    const w = Math.floor((trackW - GAP * (targetVisible - 1)) / targetVisible);
    setCardWidth(Math.max(160, Math.min(420, w)));
  }, []);

  useEffect(() => {
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [updateCardWidth]);

  const stepSize = cardWidth + GAP;
  const maxOffset = (S4_CARDS.length - 1) * stepSize;
  const prevSlide = useCallback(() => setOffset(o => Math.max(0, o - stepSize)), [stepSize]);
  const nextSlide = useCallback(() => setOffset(o => (o + stepSize > maxOffset ? 0 : o + stepSize)), [stepSize, maxOffset]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prevSlide(); if (e.key === "ArrowRight") nextSlide(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevSlide, nextSlide]);

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
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={prevSlide} style={{ width: 44, height: 44, borderRadius: 30, border: "1px solid #174067", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(23,64,103,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 5L7 10L12 15" stroke="#174067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={nextSlide} style={{ width: 44, height: 44, borderRadius: 30, background: "#174067", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5L13 10L8 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
          <div style={{ display: "flex", gap: GAP, transform: `translateX(-${offset}px)`, transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)", willChange: "transform", alignItems: "stretch" }}>
            {S4_CARDS.map((card, i) => (
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

// ── Section 5: Beyond Syllabus — Figma 294:94 exact implementation ─────────
const S5_ITEMS = [
  {
    id: "see",
    icon: imgS5IconSee,
    label: "See lorem ipsum is",
    body: "We unlock scale by fixing what's leaking lorem is conversion, retention, repeat simply We unlock scale by fixing",
    sepAfter: imgS5SepLong,   // 220px separator (Figma: Vector236) — shown after the active (expanded) item
    sepWidth: 220,
  },
  {
    id: "hear",
    icon: imgS5IconHear,
    label: "Hear lorem ipsum is",
    body: "Hear the stories that shaped the mission — teachers, students, and communities speaking for themselves.",
    sepAfter: imgS5SepShort,  // 177px separator (Figma: Vector233)
    sepWidth: 177,
  },
  {
    id: "read",
    icon: imgS5IconRead,
    label: "Read lorem ipsu",
    body: "Read reports, research and on-ground data from Ujjwala Wadekar's 31-year mission across Jalgaon.",
    sepAfter: imgS5SepShort,
    sepWidth: 177,
  },
  {
    id: "do",
    icon: imgS5IconRead,
    label: "Do lorem ipsu",
    body: "Join hands — donate, volunteer, or partner with us to extend the reach of quality education.",
    sepAfter: null,
    sepWidth: 0,
  },
];

function Section5() {
  const sectionRef = useFadeInUp();
  // First item ("See") open by default — matches Figma default state
  const [activeId, setActiveId] = useState<string>("see");

  return (
    <div ref={sectionRef} className="fade-in-up" style={{
      width: "100%",
      minHeight: 808,          // Figma frame height
      background: "#fff",
      position: "relative",
      overflow: "hidden",
      isolation: "isolate",    // prevents z-index bleeding
    }}>
      {/* ── Layer 0: Background Photo (Clean Version) ── */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1195, height: "100%", pointerEvents: "none", zIndex: 0 }}>
        <img src={imgS5Bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
      </div>

      {/* ── Layer 1: White-Fade SVG Overlay (cf5d7b83) — matches Figma 1092.5px wide ── */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 1093, height: "100%", pointerEvents: "none", zIndex: 1 }}>
        <img src={imgS5Overlay} alt="" style={{ width: "100%", height: "100%", objectFit: "fill" }} />
      </div>

      {/* ── Layer 2: Content (1008px wide) ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ width: 1008, paddingTop: 56, paddingBottom: 80 }}>

          {/* Heading group — precisely pl-[260px] */}
          <div style={{ paddingLeft: 260, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Badge — pl-[164px] offset from the 260px content block = 424px total */}
            <div style={{ paddingLeft: 164 }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 20px", borderRadius: 40, border: "1px solid #e8e8e8", background: "#fff" }}>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#bf791d" }}>Beyond Syllabus</span>
              </div>
            </div>

            {/* Heading — Lora SemiBold 36px, 657px wide */}
            <div style={{ width: 657 }}>
              <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 36, lineHeight: 1.32, color: "#000", textTransform: "capitalize", margin: 0, whiteSpace: "pre-wrap" }}>
                {"              Beyond Syllabus simply\n"}{"We unlock scale by fixing dum\n"}{"text of the"}
              </p>
            </div>
          </div>

          {/* Accordion — pl-[260px], width 562px */}
          <div style={{ paddingLeft: 260, paddingTop: 44 }}>
            <div style={{ width: 562, display: "flex", flexDirection: "column" }}>
              {S5_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <div key={item.id}>
                    {/* Tab trigger */}
                    <button
                      onClick={() => setActiveId(item.id)}
                      style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", background: "none", border: "none", padding: "12px 0", cursor: "pointer", textAlign: "left" }}
                    >
                      {/* Icon asset — exact 32x32 size */}
                      <div style={{ width: 32, height: 32, flexShrink: 0, position: "relative" }}>
                        <img src={item.icon} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                      </div>
                      <span style={{
                        fontFamily: "'Rubik', sans-serif",
                        fontWeight: isActive ? 500 : 400,
                        fontSize: isActive ? 17 : 16,
                        lineHeight: "26px",
                        color: isActive ? "#bf791d" : "#000",
                        transition: "color 0.25s",
                        whiteSpace: "nowrap",
                      }}>
                        {item.label}
                      </span>
                    </button>

                    {/* Expandable Section */}
                    <div className={`accordion-body${isActive ? " open" : ""}`}>
                      <div>
                        <div style={{ paddingLeft: 48, display: "flex", flexDirection: "column", gap: 24, paddingBottom: 8 }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "25px", color: "#636363", margin: 0, width: 459 }}>
                            {item.body}
                          </p>
                          <button style={{ display: "inline-flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, height: 44, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, whiteSpace: "nowrap", alignSelf: "flex-start" }}>
                            Donate for Cause <ArrowIcon />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Separator lines based on item state */}
                    {item.sepAfter && (
                      <div style={{ height: 1, width: item.sepWidth, position: "relative", overflow: "hidden" }}>
                        <img src={item.sepAfter} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Final Layer: Top/Bottom Faders (Blend section with page) ── */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #fff 0%, transparent 8%, transparent 92%, #fff 100%)", pointerEvents: "none", zIndex: 4 }} />
    </div>
  );
}

function Section6() {
  const sectionRef = useFadeInUp();
  const [activeTab, setActiveTab] = useState("teachers");
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 5000; // 5 seconds per slide
  const activeData = S6_DATA[activeTab];

  // Auto-play logic
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

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % activeData.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + activeData.length) % activeData.length);
    setProgress(0);
  };

  const currentSlide = activeData[slideIndex];

  return (
    <div ref={sectionRef} className="fade-in-up" style={{ width: "100%", background: "#fff", padding: "100px 0", isolation: "isolate" }}>
      <div style={{ maxWidth: 1006, margin: "0 auto" }}>
        
        {/* Top Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 40, color: "#000", margin: 0, textTransform: "capitalize" }}>
            Testimonial Lorem Ipsum
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "22px", color: "#686868", margin: 0, width: 206, textAlign: "right" }}>
            Find your role and see exactly what it means, what you get, and what your
          </p>
        </div>

        {/* Navigation & Tabs Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 10 }}>
            {S6_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSlideIndex(0); setProgress(0); }}
                  style={{
                    padding: "6px 24px",
                    borderRadius: 40,
                    border: isActive ? "none" : "1px solid #e8e8e8",
                    background: isActive ? "#bf791d" : "#fff",
                    color: isActive ? "#fff" : "#bf791d",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all 0.3s"
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Progress & Nav Arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {/* Progress Bar Container */}
            <div style={{ width: 233, height: 1, background: "#e8e8e8", position: "relative" }}>
              {/* Fill bar */}
              <div style={{ 
                position: "absolute", 
                left: 0, 
                top: 0, 
                height: "100%", 
                width: `${progress}%`, 
                background: "#bf791d",
                transition: progress === 0 ? "none" : "width 50ms linear"
              }} />
            </div>

            {/* Arrows */}
            <div style={{ display: "flex", gap: 8 }}>
              <button 
                onClick={handlePrev}
                style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #174067", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none" }}
              >
                <IconArrowL />
              </button>
              <button 
                onClick={handleNext}
                style={{ width: 40, height: 40, borderRadius: "50%", background: "#174067", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none" }}
              >
                <IconArrowR />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div style={{ 
          width: 1006, 
          height: 300, 
          borderRadius: 20, 
          background: "linear-gradient(-52.65deg, #BF791D 0.4%, #885615 99.6%)",
          display: "flex",
          overflow: "hidden",
          border: "1px solid #895615"
        }}>
          {/* Left Content Area */}
          <div style={{ flex: 1, padding: "36px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 20 }}>
            <IconQuote />
            <div style={{ display: "flex", flexDirection: "column", gap: 6, color: "#fff" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 20, margin: 0 }}>
                {currentSlide.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: "26px", margin: 0, opacity: 0.9 }}>
                {currentSlide.body}
              </p>
            </div>
          </div>

          {/* Right Image Area */}
          <div style={{ width: 475, position: "relative" }}>
            {/* Background blur/gradient layer */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(99.12deg, #A26719 3.4%, rgba(161, 102, 25, 0) 96.6%)" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: "176px", height: "100%", zIndex: 2, background: "linear-gradient(93.41deg, #A26719 3.4%, rgba(161, 102, 25, 0) 96.6%)" }} />
            
            {/* The actual photo */}
            <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 0 }}>
              <img src={imgS6Bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(0.5px)" }} />
              {/* Foreground cutout photo (optional if matches design) */}
              <img src={currentSlide.photo} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", zIndex: 1 }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Section 7 — CTA Banner (Figma 276:1757) ─────────────────────────────
function Section7() {
  const ArrowIcon = ({ color = "#bf791d" }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 15L15 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 5H15V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{
      width: "100%",
      background: "#ffffff",
      display: "flex",
      justifyContent: "center",
      padding: "80px 0 100px",
    }}>
      <div style={{
        width: 1006,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      }}>
        {/* Left — Large Heading */}
        <div style={{ paddingBottom: 68, flexShrink: 0 }}>
          <h2 style={{
            fontFamily: "'Lora', serif",
            fontWeight: 600,
            fontSize: 48,
            lineHeight: "61.44px",
            color: "#000",
            margin: 0,
            width: 651,
            textTransform: "capitalize",
          }}>
            We Unlock Scale By Fixing What's Leaking Conversion, Retention Repeat
          </h2>
        </div>

        {/* Right — Subtext + Buttons */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 40,
          flexShrink: 0,
        }}>
          {/* Subtext */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 16,
            lineHeight: "22px",
            color: "#686868",
            textAlign: "right",
            width: 302,
            margin: 0,
          }}>
            Short explanation that Hexanovate powers two lorem ips specialized domains is simply
          </p>

          {/* Buttons Row */}
          <div style={{ display: "flex", gap: 12, width: 521 }}>
            {/* Outline Button */}
            <Link
              to="/join"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "12px 24px",
                borderRadius: 30,
                border: "1px solid #bf791d",
                background: "transparent",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: "#bf791d",
                whiteSpace: "nowrap",
              }}>
                Join Ujjwala's Mission
              </span>
              <ArrowIcon color="#bf791d" />
            </Link>

            {/* Solid Button */}
            <Link
              to="/donate"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                padding: "12px 24px",
                borderRadius: 30,
                background: "#bf791d",
                border: "none",
                textDecoration: "none",
                cursor: "pointer",
                flex: 1,
                transition: "all 0.3s",
              }}
            >
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: "#fff",
                whiteSpace: "nowrap",
              }}>
                Donate Now
              </span>
              <ArrowIcon color="#fff" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export function HomeV2Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", flexDirection: "column", alignItems: "stretch", overflowX: "hidden" }}>
      <style>{GLOBAL_CSS}</style>
      <HeroSection />
      <ProgramBanner />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
    </div>
  );
}
