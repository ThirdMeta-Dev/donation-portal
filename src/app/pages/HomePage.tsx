import { Link } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen, ArrowRight, CheckCircle2, Users, ChevronDown,
  Heart, GraduationCap, Handshake, BarChart3,
  Eye, Ear, FileText, Zap, ChevronRight, Star, Quote,
  Shield, Globe, TrendingUp, ExternalLink, Mail
} from "lucide-react";
import { CauseCard } from "../components/CauseCard";
import { CAUSES, FOUNDATION_SHORT, FOUNDATION_TRUST, FOUNDER_NAME, TESTIMONIALS } from "../lib/constants";
import { causeApi } from "../lib/api";
import founderImg from "figma:asset/1d3e0a39256d5e5f61254e45ebd4f78ed4032ca5.png";
import founderVideoThumb from "figma:asset/7e8ca225e615b2a1f491608b0f7fcf2a6b613c0d.png";

// ─── Palette constants ────────────────────────────────────────────────────────
const C = {
  navy950: "#0D1B26",
  navy900: "#152231",
  navy800: "#1B2B3A",
  navy700: "#243849",
  navy100: "#DBE3E9",
  navy50:  "#F0F4F7",
  gold700: "#8C6228",
  gold600: "#B07D3A",
  gold500: "#C99247",
  gold300: "#DDBF7E",
  gold200: "#E8D5AF",
  gold100: "#F2E8CE",
  gold50:  "#FAF5EA",
  ivory:   "#F8F5EF",
  sage600: "#4A6741",
  sage50:  "#EDF5EB",
  charcoal:"#1C1C1A",
  stone:   "#6B6B60",
  border:  "#E5E0D8",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className="inline-block text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
      style={{
        fontWeight: 600,
        background: light ? "rgba(255,255,255,0.1)" : C.gold50,
        color: light ? "rgba(255,255,255,0.7)" : C.gold700,
        border: `1px solid ${light ? "rgba(255,255,255,0.15)" : C.gold200}`,
      }}
    >
      {children}
    </span>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.border }} className="w-full" />;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1709290749293-c6152a187b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
  "https://images.unsplash.com/photo-1763637675793-da207ba1fe18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
  "https://images.unsplash.com/photo-1692269725827-699e04a11cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
];

const LIVE_DONATIONS = [
  { name: "Priya S.", city: "Mumbai",     amount: "₹1,000", cause: "Beyond Syllabus", time: "2m ago" },
  { name: "Rahul M.", city: "Delhi",      amount: "₹5,000", cause: "Teacher Network", time: "5m ago" },
  { name: "Suresh P.", city: "New Jersey",amount: "$100",   cause: "Adopt A School",  time: "9m ago" },
  { name: "Anita K.", city: "Bangalore",  amount: "₹500",   cause: "Education Access",time: "14m ago" },
  { name: "Vikram L.", city: "Pune",      amount: "₹10,000",cause: "Beyond Syllabus", time: "18m ago" },
];

const PARTICIPATION_CARDS = [
  { icon: <Heart size={18} />,       title: "Donate Once",           desc: "A one-time contribution goes directly to learning resources, teacher training, or education access for children.", cta: "Donate Now",           to: "/donate",  proof: "All donations 80G eligible · Full receipts" },
  { icon: <TrendingUp size={18} />,  title: "Give Monthly",          desc: "A monthly commitment creates predictable impact — sustaining a teacher workshop series or classroom kits all year.", cta: "Give Monthly",         to: "/donate",  proof: "Cancel anytime · Monthly transparency reports" },
  { icon: <GraduationCap size={18} />,title:"Join as a Teacher",    desc: "Government school teachers — join our Teacher Reformers Network for workshops, peer community, and shared resources.", cta: "Join Teacher Network", to: "/causes",  proof: "340+ teachers already in the network" },
  { icon: <Users size={18} />,       title: "Volunteer Your Skill",  desc: "Designers, developers, writers, photographers, finance professionals — we need your skills to grow this mission with integrity.", cta: "Apply to Volunteer",  to: "/about",   proof: "Skill-based or time-based · Remote or in-person" },
  { icon: <Handshake size={18} />,   title: "Partner or CSR",        desc: "Schools need adoption. CSR budgets can fund a full school's transformation — with complete transparency and measurable outcomes.", cta: "Request CSR Proposal",to: "/about",  proof: "Full CSR compliance · Proposal ready" },
];

const METHOD_STEPS = [
  { icon: <Eye size={20} />,      label: "See",  title: "Take Children to the World",  desc: "Farm visits, courtrooms, science labs, hospitals — children see how the world actually works.", example: "A Jalgaon class visits a banana farm; they learn botany, economics, and labour in one morning." },
  { icon: <Ear size={20} />,      label: "Hear", title: "Invite Real Voices In",        desc: "Doctors, farmers, engineers, artisans — community members speak in classrooms, making every subject alive.", example: "A local engineer explains how bridges are built — triggering more maths questions than a chapter." },
  { icon: <FileText size={20} />, label: "Read", title: "Read What Matters",            desc: "Libraries with diverse books. Reading circles. Stories from Maharashtra's history and culture.", example: "Story cards in Marathi and Hindi sit beside the textbook — children choose what they read next." },
  { icon: <Zap size={20} />,      label: "Do",   title: "Build, Make, Solve",           desc: "Hands-on kits, science experiments, art projects, community surveys — children learn by making and doing.", example: "Class 6 students build a rain-gauge; the data is used in a real maths lesson the next day." },
];

const PROGRAMS = [
  { icon: "📚", title: "Beyond Syllabus Learning",   who: "Children Std. 1–10",        desc: "Experiential programmes making every subject real, relevant, and memorable.",                      action: "Sponsor a child's experience", to: "/donate" },
  { icon: "🧑‍🏫", title: "Teacher Reformers Network", who: "Government school teachers", desc: "Monthly workshops, peer learning, and a shared resource library for 340+ teachers.",              action: "Join the network",              to: "/causes" },
  { icon: "🏫", title: "Adopt A School",              who: "CSR partners & communities",desc: "Full school support — infrastructure, library, lab kits, and teacher mentoring for one year.",     action: "Adopt a school",               to: "/causes" },
  { icon: "🔬", title: "Hands-On Learning Kits",     who: "All government school levels",desc: "Locally designed, reusable classroom kits for science, maths, language, and life skills.",       action: "Sponsor kits",                 to: "/donate" },
  { icon: "🎒", title: "Education Access Support",   who: "At-risk & dropout children", desc: "Removing practical barriers — uniforms, stationery, cycles — so no child misses school.",          action: "Support a child",              to: "/donate" },
  { icon: "🤝", title: "Community Outreach",          who: "Parents & gram panchayats",  desc: "Monthly parent workshops and community-school programmes that sustain change beyond our presence.", action: "Get involved",                  to: "/about" },
];

const FUND_FLOW = [
  { step: "01", title: "Support Received",         desc: "Your contribution is acknowledged immediately. A receipt and 80G certificate are generated within 24 hours." },
  { step: "02", title: "Allocated to a Defined Need",desc: "Funds are assigned to specific programme budgets — not pooled into a general fund without purpose." },
  { step: "03", title: "Used in Learning",          desc: "Money flows directly to learning resources, teacher workshops, school materials, or access support." },
  { step: "04", title: "Reported with Evidence",    desc: "Photos, utilization reports, and impact notes are shared in quarterly updates and annual reports." },
];

const INVOLVE_TABS = [
  { id: "teachers",   label: "Teachers",    icon: <GraduationCap size={14} />, role: "Government school teachers looking to grow", what: "Join the Teacher Reformers Network — a community of 340+ teachers sharing methods, resources, and practical innovations.", provides: ["Monthly workshops (in-person, Jalgaon)", "Access to shared lesson resource library", "Peer mentoring circles", "Recognition in annual teacher summit"], cta: "Join Teacher Network", ctaTo: "/causes", trust: "No fees. No hierarchy. Just teachers helping teachers." },
  { id: "volunteers", label: "Volunteers",  icon: <Users size={14} />,          role: "Professionals who want to contribute skills or time", what: "Skill-based volunteers (designers, writers, developers, finance, legal) and time-based volunteers (field documentation, community outreach).", provides: ["Defined project scope", "Remote or Jalgaon in-person", "Impact documentation", "Reference letter & recognition"], cta: "Apply to Volunteer", ctaTo: "/about", trust: "Both skill-based and time-effort volunteering are equally valued." },
  { id: "partners",   label: "Partners",    icon: <Handshake size={14} />,      role: "NGOs, educational institutions, and foundations", what: "We welcome partnership with aligned organisations — co-designing programmes and building systemic change across North Maharashtra.", provides: ["Joint programme design", "Field access & teacher network", "Co-branding on outputs", "Transparent MOU-based collaboration"], cta: "Partner With Us", ctaTo: "/about", trust: "We only partner with organisations that share our education-first values." },
  { id: "csr",        label: "CSR / Business",icon: <BarChart3 size={14} />,   role: "Corporates seeking education-focused CSR", what: "Adopt a school, sponsor a teacher cohort, or fund a district-wide learning kit rollout. Full CSR compliance and quarterly reporting.", provides: ["CSR proposal with defined outcomes", "Quarterly field reports + photos", "80G + CSR compliance documentation", "Dedicated programme lead"], cta: "Request CSR Proposal", ctaTo: "/about", trust: "Used for Schedule VII CSR compliance under Companies Act 2013." },
];

const STORIES = [
  { type: "Student",          tag: "Reading Circle",   situation: "Ravi, Class 7, Raver taluka, had not read a full book in three years of schooling.", what: "The reading circle programme introduced story cards in Marathi alongside a class library. Ravi found a book about space — and read it twice.", change: "His teacher reports he now asks to read to the class. School feels different to him now.", ph: "[Replace with verified student story from field team]" },
  { type: "Teacher",          tag: "Teacher Network",  situation: "Sunita Ma'am, 14 years teaching near Chopda, felt isolated — no peer support, no new ideas, no recognition.", what: "She joined the Teacher Reformers Network in 2024. In her first workshop she shared a method she had used quietly for years — it became part of the shared library.", change: "She now leads a monthly peer circle for 22 teachers in her taluka. She says: 'I stopped feeling invisible.'", ph: "[Replace with verified teacher story from field team]" },
  { type: "Community",        tag: "Community Outreach",situation: "A village in Erandol had 40% girls dropping out after Class 7 — the secondary school was 8 km away.", what: "The Community Outreach team engaged the gram panchayat. A parent committee formed. Three bicycles were arranged for girls who needed them.", change: "Dropout among girls reduced. The gram panchayat now advocates for education as a community priority.", ph: "[Replace with verified community story from field team]" },
  { type: "Practical Learning",tag: "Learning Kits",   situation: "Class 5 children in Bhusawal had never seen a functioning lab — their science textbook felt like fiction.", what: "A Hands-On Learning Kit was introduced: magnets, lenses, circuits, seeds. The teacher ran six sessions using the kit and Beyond Syllabus guide.", change: "Three months later, science scores improved by 22%. More importantly, children asked questions the teacher hadn't heard before.", ph: "[Replace with verified impact story from field team]" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function HomePage() {
  const [slide, setSlide]           = useState(0);
  const [liveIdx, setLiveIdx]       = useState(0);
  const [showNotif, setShowNotif]   = useState(false);
  const [activeTab, setActiveTab]   = useState("teachers");
  const [liveStats, setLiveStats]   = useState<Record<string, { raised: number; donors: number }>>({});

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const show = () => { setLiveIdx(n => (n + 1) % LIVE_DONATIONS.length); setShowNotif(true); setTimeout(() => setShowNotif(false), 4200); };
    const t = setInterval(show, 7500);
    const init = setTimeout(show, 2800);
    return () => { clearInterval(t); clearTimeout(init); };
  }, []);

  useEffect(() => {
    causeApi.getStats().then(r => setLiveStats(r.stats || {})).catch(() => {});
  }, []);

  const dn = LIVE_DONATIONS[liveIdx];
  const activeInvolve = INVOLVE_TABS.find(t => t.id === activeTab)!;

  return (
    <div className="overflow-x-hidden" style={{ background: C.ivory }}>

      {/* ══ SECTION 1 — HERO ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: C.navy950 }}>
        {/* BG image */}
        <AnimatePresence mode="sync">
          <motion.div key={slide} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute inset-0">
            <img src={HERO_SLIDES[slide]} alt="" className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>
        {/* Overlays — deep navy gradient, no bright colours */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.navy950}F5, ${C.navy900}CC, ${C.navy800}40)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.navy950}99, transparent 60%)` }} />

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap items-center gap-2 mb-7">
                <span className="text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border" style={{ fontWeight: 600, color: C.gold300, background: "rgba(176,125,58,0.12)", borderColor: "rgba(176,125,58,0.25)" }}>
                  {FOUNDATION_TRUST}
                </span>
                <span className="flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: "rgba(74,103,65,0.18)", border: "1px solid rgba(74,103,65,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs" style={{ color: "#86efac", fontWeight: 600 }}>Live · Jalgaon, Maharashtra</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="leading-[1.15] mb-5"
                style={{ fontWeight: 700, fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontFamily: "var(--font-heading)", color: "#F8F5EF" }}
              >
                A Teacher's Work,{" "}
                <em className="not-italic" style={{ color: C.gold300 }}>Scaled Into</em>{" "}
                a Public Mission
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} className="text-base leading-relaxed mb-7 max-w-lg" style={{ color: "rgba(248,245,239,0.72)" }}>
                <span style={{ color: "#F8F5EF", fontWeight: 600 }}>Ujjwala Wadekar</span> is the face and lived proof of this mission — 31 years of teaching in government schools in Jalgaon.{" "}
                <span style={{ color: "#F8F5EF", fontWeight: 600 }}>Shiksha Raj, Ujjwal Bharat Mission</span> is the system that scales her work.
              </motion.p>

              {/* Trust chips */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.26 }} className="flex flex-wrap gap-2 mb-9">
                {[
                  { icon: "🎓", label: "31 Years in Government Schools" },
                  { icon: "📘", label: "Beyond Syllabus Learning" },
                  { icon: "📋", label: "Transparent Impact Systems" },
                ].map(chip => (
                  <div key={chip.label} className="flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="text-xs">{chip.icon}</span>
                    <span className="text-xs" style={{ fontWeight: 500, color: "rgba(248,245,239,0.8)" }}>{chip.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }} className="flex flex-wrap gap-3 mb-8">
                <Link to="/donate"
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm transition-all hover:scale-105"
                  style={{ fontWeight: 700, background: C.gold600, color: C.ivory }}>
                  Choose How You Want To Help
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm transition-all"
                  style={{ fontWeight: 600, color: "#F8F5EF", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  Read Ujjwala's Story
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.42 }} className="flex flex-wrap gap-5">
                {["Impact", "Use of Funds", "Reports", "Legal & Compliance"].map(l => (
                  <Link key={l} to="/about" className="text-xs transition-colors flex items-center gap-1" style={{ color: "rgba(248,245,239,0.4)", fontWeight: 500 }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.gold300}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,245,239,0.4)"}>
                    {l} <ExternalLink size={8} />
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Founder photo */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl blur-2xl" style={{ background: `${C.navy700}60` }} />
                <video
                  src="https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/Video-344.mp4"
                  poster={founderVideoThumb}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="relative rounded-2xl shadow-2xl object-cover w-full max-w-sm mx-auto"
                  style={{ aspectRatio: "3/4" }}
                />

                {/* Stats card */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-4" style={{ border: `1px solid ${C.border}`, maxWidth: 200 }}>
                  <div className="text-xs mb-2" style={{ color: C.stone, fontWeight: 600 }}>Ujjwala Wadekar</div>
                  {[
                    { n: "31 yrs",  l: "Teaching Experience" },
                    { n: "340+",    l: "Teachers in Network" },
                    { n: "12,400+", l: "Children Reached" },
                  ].map(s => (
                    <div key={s.l} className="flex items-center gap-2 py-1 border-b last:border-0" style={{ borderColor: C.border }}>
                      <span className="text-sm" style={{ fontWeight: 800, color: C.navy800 }}>{s.n}</span>
                      <span className="text-xs" style={{ color: C.stone }}>{s.l}</span>
                    </div>
                  ))}
                </div>

                {/* ZP badge */}
                <div className="absolute -top-3 -right-3 rounded-2xl px-4 py-2 shadow-lg"
                  style={{ background: C.gold700, color: C.ivory }}>
                  <div className="text-xs" style={{ fontWeight: 600 }}>ZP School Teacher</div>
                  <div className="text-xs opacity-75">Jalgaon, Maharashtra</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="relative z-10 flex justify-center gap-2 pb-6">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className="rounded-full transition-all duration-500"
              style={{ width: i === slide ? 28 : 8, height: 8, background: i === slide ? C.gold500 : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="relative z-10 flex flex-col items-center pb-8 gap-1" style={{ color: "rgba(255,255,255,0.25)" }}>
          <span className="text-xs tracking-widest uppercase" style={{ fontWeight: 500 }}>Scroll to explore</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ChevronDown size={15} /></motion.div>
        </motion.div>



        {/* Live donation notif */}
        <AnimatePresence>
          {showNotif && (
            <motion.div key={liveIdx}
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-2xl px-4 py-3 max-w-xs shadow-2xl"
              style={{ background: "rgba(255,255,255,0.97)", border: `1px solid ${C.border}` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.navy800 }}>
                <Heart size={14} className="text-white fill-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xs truncate" style={{ fontWeight: 700, color: C.charcoal }}>{dn.name} from {dn.city}</div>
                <div className="text-xs" style={{ fontWeight: 600, color: C.gold700 }}>Donated {dn.amount} · {dn.cause}</div>
                <div className="text-xs" style={{ color: C.stone }}>{dn.time}</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ══ SECTION 2 — FROM ONE TEACHER ══════════════════════════════════════ */}
      <section className="py-20" style={{ background: C.ivory }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>The Story Behind the Mission</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-5" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: C.charcoal }}>
              From One Teacher's Work<br />To a Public Mission
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: C.stone }}>
              Teaching, for Ujjwala Wadekar, was never just a job. It was a responsibility that kept growing — until one classroom was no longer enough.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { icon: "👁️", title: "What She Saw",     body: "Children who could recite answers but could not explain what they meant. Textbooks that described rivers to children who had never stood near one. A system that rewarded memory over understanding." },
              { icon: "✏️", title: "What She Changed", body: "She started taking her class outside — to farms, workshops, the local court. She invited the village doctor and carpenter to speak. Learning became real; attendance improved; curiosity returned." },
              { icon: "🏛️", title: "Why the Trust Exists", body: "What Ujjwala did in her classroom, thousands of government school teachers could do in theirs — if they had resources, a peer community, and recognition. The Trust is that system." },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <div className="rounded-2xl p-7 h-full bg-white" style={{ border: `1px solid ${C.border}` }}>
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="text-base mb-3" style={{ fontWeight: 700, color: C.charcoal }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.stone }}>{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Quote */}
          <FadeIn>
            <div className="relative rounded-2xl p-8 md:p-10 text-center max-w-3xl mx-auto overflow-hidden"
              style={{ background: C.navy800 }}>
              <Quote size={48} className="absolute top-4 left-6 opacity-10" style={{ color: C.gold300 }} />
              <p className="text-lg md:text-xl leading-relaxed mb-5 relative z-10" style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", color: "rgba(248,245,239,0.88)" }}>
                "Every child I meet in a remote hamlet of Khandesh has the same potential as a child in any city. The difference is only opportunity. And that is what we are here to provide — not charity, but access."
              </p>
              <div className="flex items-center justify-center gap-3 relative z-10">
                <img src={founderImg} alt={FOUNDER_NAME} className="w-10 h-10 rounded-full object-cover" style={{ border: `2px solid ${C.gold500}` }} />
                <div>
                  <div className="text-sm" style={{ fontWeight: 700, color: "#F8F5EF" }}>— {FOUNDER_NAME}</div>
                  <div className="text-xs" style={{ color: C.gold300 }}>Founder, Shiksha Raj · ZP Teacher, Jalgaon</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="flex justify-center gap-3 mt-8">
            <Link to="/about" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, color: C.navy800, border: `1px solid ${C.navy200}`, background: C.navy50 }}>
              About Ujjwala <ArrowRight size={13} />
            </Link>
            <Link to="/causes" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, color: C.stone, border: `1px solid ${C.border}` }}>
              About the Trust <ArrowRight size={13} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ══ SECTION 3 — RECOGNITION ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Public Credibility</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: C.charcoal }}>
              Recognised, Invited, Endorsed
            </h2>
            <p className="text-sm max-w-xl mx-auto italic" style={{ color: C.stone }}>
              [This section displays verified media mentions, awards, and speaking invites as they are confirmed. Placeholders reflect real categories of recognition being documented.]
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "📰", title: "Media Mention",      body: "[Replace with actual media mention — publication name, headline, and date.]", tag: "Press" },
              { icon: "🏅", title: "Recognition / Award", body: "[Replace with verified award or recognition — organisation, year, and citation.]",  tag: "Award" },
              { icon: "🎤", title: "Speaking Invite",     body: "[Replace with verified speaking engagement — event name, institution, and year.]",  tag: "Speaking" },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.1}>
                <div className="rounded-2xl p-6" style={{ border: `1px solid ${C.border}`, background: C.ivory }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{c.icon}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ fontWeight: 600, background: C.gold50, color: C.gold700, border: `1px solid ${C.gold200}` }}>{c.tag}</span>
                  </div>
                  <h4 className="text-sm mb-2" style={{ fontWeight: 600, color: C.charcoal }}>{c.title}</h4>
                  <p className="text-xs leading-relaxed italic" style={{ color: C.stone }}>{c.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="flex justify-center gap-3 mt-8">
            <Link to="/about" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.navy800, color: C.ivory }}>
              View Media & Talks <ArrowRight size={13} />
            </Link>
            <Link to="/about" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, color: C.stone, border: `1px solid ${C.border}` }}>
              Read Ujjwala's Story
            </Link>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ══ SECTION 4 — CHOOSE YOUR WAY ═══════════════════════════════════════ */}
      <section className="py-20" style={{ background: C.ivory }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Get Involved</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: C.charcoal }}>
              Choose Your Way to Participate
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: C.stone }}>
              Every path supports the same teacher-led mission. Find the one that fits you.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {PARTICIPATION_CARDS.slice(0, 3).map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-7 transition-all hover:-translate-y-0.5 hover:shadow-md h-full flex flex-col" style={{ border: `1px solid ${C.border}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: C.navy50, color: C.navy800 }}>{card.icon}</div>
                  <h3 className="text-base mb-2" style={{ fontWeight: 700, color: C.charcoal }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: C.stone }}>{card.desc}</p>
                  <div className="space-y-2">
                    <Link to={card.to} className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.navy800, color: C.ivory }}>
                      {card.cta} <ChevronRight size={13} />
                    </Link>
                    <p className="text-xs text-center" style={{ color: C.stone }}>{card.proof}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PARTICIPATION_CARDS.slice(3).map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-7 transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col" style={{ border: `1px solid ${C.border}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: C.navy50, color: C.navy800 }}>{card.icon}</div>
                  <h3 className="text-base mb-2" style={{ fontWeight: 700, color: C.charcoal }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: C.stone }}>{card.desc}</p>
                  <div className="space-y-2">
                    <Link to={card.to} className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.navy800, color: C.ivory }}>
                      {card.cta} <ChevronRight size={13} />
                    </Link>
                    <p className="text-xs text-center" style={{ color: C.stone }}>{card.proof}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ SECTION 5 — BEYOND SYLLABUS METHOD ═══════════════════════════════ */}
      <section className="py-20" style={{ background: C.navy800 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <SectionLabel light>The Method</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: "#F8F5EF" }}>
              Beyond Syllabus: How Learning Becomes Real
            </h2>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(248,245,239,0.6)" }}>
              The syllabus is a starting point — not a ceiling. Beyond Syllabus is the teaching philosophy Ujjwala Wadekar developed over 31 years, built on a four-part method any teacher can apply in any school.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {METHOD_STEPS.map((step, i) => (
              <FadeIn key={step.label} delay={i * 0.09}>
                <div className="rounded-2xl p-6 h-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.gold700, color: C.ivory }}>
                      {step.icon}
                    </div>
                    <span className="text-xs tracking-widest uppercase" style={{ color: C.gold300, fontWeight: 700 }}>{step.label}</span>
                  </div>
                  <h3 className="text-sm mb-2" style={{ fontWeight: 700, color: "#F8F5EF" }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(248,245,239,0.55)" }}>{step.desc}</p>
                  <div className="rounded-xl p-3" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <p className="text-xs leading-relaxed italic" style={{ color: "rgba(248,245,239,0.5)" }}>📍 {step.example}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="rounded-2xl p-6 text-center max-w-2xl mx-auto" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <p className="text-sm mb-5" style={{ color: "rgba(248,245,239,0.65)" }}>
                Teachers can learn and apply this method through the Teacher Reformers Network — workshops, resource kits, and peer support included.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/causes" className="px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.gold600, color: C.ivory }}>
                  Explore the Method
                </Link>
                <Link to="/causes" className="px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, color: "#F8F5EF", border: "1px solid rgba(255,255,255,0.15)" }}>
                  Join Teacher Network
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ SECTION 6 — WHAT THE TRUST BUILDS ════════════════════════════════ */}
      <section className="py-20" style={{ background: C.ivory }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <SectionLabel>On the Ground</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: C.charcoal }}>
              What the Trust Builds on Ground
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: C.stone }}>
              Six programme pillars, all education-only, all anchored in the government school system of Jalgaon and North Maharashtra.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {PROGRAMS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.06}>
                <div className="bg-white rounded-2xl p-6 transition-all hover:shadow-sm h-full flex flex-col" style={{ border: `1px solid ${C.border}` }}>
                  <span className="text-3xl mb-4 block">{p.icon}</span>
                  <h3 className="text-base mb-1" style={{ fontWeight: 700, color: C.charcoal }}>{p.title}</h3>
                  <p className="text-xs mb-2" style={{ fontWeight: 500, color: C.gold700 }}>For: {p.who}</p>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: C.stone }}>{p.desc}</p>
                  <Link to={p.to} className="text-xs flex items-center gap-1 transition-colors" style={{ fontWeight: 600, color: C.gold700 }}>
                    {p.action} <ArrowRight size={10} />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="flex justify-center gap-3">
            <Link to="/causes" className="px-7 py-3 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.navy800, color: C.ivory }}>
              Explore All Programmes
            </Link>
            <Link to="/donate" className="px-7 py-3 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.gold600, color: C.ivory }}>
              Support a Programme
            </Link>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ══ SECTION 7 — WHAT PROGRESS LOOKS LIKE ═════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Honest Impact</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: C.charcoal }}>
              What Progress Looks Like
            </h2>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: C.stone }}>
              We track outcomes that matter in education — not vanity metrics. Four categories we measure, with honest notes on what data exists right now.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {[
              { icon: "📈", title: "Attendance & Retention",    desc: "Monthly attendance tracked across partner schools. Re-enrollment of dropout children tracked individually.",     honest: "Baseline data being collected across 28 schools. Results will be published in our 2026 Annual Report." },
              { icon: "📖", title: "Reading & Comprehension",   desc: "Grade-level reading assessments conducted each term by teacher facilitators across 120 partner schools.",      honest: "Early results show improvement in 6 pilot schools. Full cohort data pending." },
              { icon: "🎤", title: "Confidence & Communication",desc: "Structured observation of classroom participation before and after Beyond Syllabus programmes.",               honest: "Teacher-reported improvement shared in quarterly updates. Formal assessment being designed." },
              { icon: "🔧", title: "Practical Understanding",   desc: "Project completion rates and quality assessed by teacher panels at semester end.",                              honest: "2026 data will be published transparently — including what did not work and why." },
            ].map((cat, i) => (
              <FadeIn key={cat.title} delay={i * 0.07}>
                <div className="rounded-2xl p-7" style={{ border: `1px solid ${C.border}`, background: C.ivory }}>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl mt-0.5">{cat.icon}</span>
                    <div>
                      <h3 className="text-base mb-1" style={{ fontWeight: 700, color: C.charcoal }}>{cat.title}</h3>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: C.stone }}>{cat.desc}</p>
                      <div className="rounded-xl px-4 py-2.5" style={{ background: C.gold50, border: `1px solid ${C.gold200}` }}>
                        <p className="text-xs leading-relaxed" style={{ color: C.gold700 }}>{cat.honest}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center rounded-2xl p-8" style={{ background: C.navy50, border: `1px solid ${C.navy100}` }}>
              <p className="text-sm mb-5 max-w-xl mx-auto" style={{ fontWeight: 500, color: C.navy700 }}>
                We track these outcomes and publish progress as the mission grows. Our annual report includes both what worked and what did not — because transparency is not selective.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/about" className="px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.navy800, color: C.ivory }}>
                  View Impact Dashboard
                </Link>
                <Link to="/about" className="px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, color: C.navy700, border: `1px solid ${C.navy200}` }}>
                  Download Latest Report
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ══ SECTION 8 — HOW SUPPORT BECOMES LEARNING ══════════════════════════ */}
      <section className="py-20" style={{ background: C.ivory }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Use of Funds</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: C.charcoal }}>
              How Your Support Turns Into Learning
            </h2>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: C.stone }}>
              Your support funds educational resources, teacher training, and learning access — not cash handouts, not administrative excess.
            </p>
          </FadeIn>

          {/* Category chips */}
          <FadeIn className="flex flex-wrap gap-2 justify-center mb-12">
            {["Books & Reading Materials", "Learning Kits & Lab Supplies", "Exposure Learning Visits", "Teacher Workshop Costs", "School Infrastructure Support", "Uniforms & Stationery (access)", "Community Outreach Sessions"].map(cat => (
              <span key={cat} className="text-xs px-3.5 py-1.5 rounded-full" style={{ fontWeight: 500, background: "white", border: `1px solid ${C.border}`, color: C.stone }}>
                {cat}
              </span>
            ))}
          </FadeIn>

          {/* 4-step flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {FUND_FLOW.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 relative" style={{ border: `1px solid ${C.border}` }}>
                  <div className="absolute top-4 right-4 text-4xl leading-none" style={{ fontWeight: 900, color: C.ivory }}>
                    {step.step}
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs mb-4 relative z-10"
                    style={{ background: C.navy800, color: C.ivory, fontWeight: 700 }}>{i + 1}</div>
                  <h3 className="text-sm mb-1.5 relative z-10" style={{ fontWeight: 700, color: C.charcoal }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed relative z-10" style={{ color: C.stone }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="bg-white rounded-2xl p-7 flex flex-col md:flex-row items-center justify-between gap-5" style={{ border: `1px solid ${C.border}` }}>
              <div>
                <p className="text-base mb-1" style={{ fontWeight: 700, color: C.charcoal }}>Shiksha Raj, Ujjwal Bharat Mission</p>
                <p className="text-sm" style={{ color: C.stone }}>Strictly charitable. No profit motive. Every rupee tracked. 80G eligible.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/donate" className="px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.gold600, color: C.ivory }}>
                  Sponsor a Learning Kit
                </Link>
                <Link to="/donate" className="px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.navy800, color: C.ivory }}>
                  Donate Now
                </Link>
                <Link to="/about" className="px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, color: C.stone, border: `1px solid ${C.border}` }}>
                  View Use of Funds
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ══ SECTION 9 — GET INVOLVED IN DETAIL (TABS) ══════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-10">
            <SectionLabel>Role-Specific Pathways</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: C.charcoal }}>
              Get Involved, In Detail
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: C.stone }}>
              Find your role and see exactly what it means, what you get, and what your next step is.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {INVOLVE_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm transition-all"
                  style={{
                    fontWeight: 600,
                    background: activeTab === tab.id ? C.navy800 : C.ivory,
                    color: activeTab === tab.id ? C.ivory : C.stone,
                    border: `1px solid ${activeTab === tab.id ? C.navy800 : C.border}`,
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <div className="rounded-2xl p-8" style={{ background: C.ivory, border: `1px solid ${C.border}` }}>
                  <p className="text-xs mb-2" style={{ fontWeight: 600, color: C.gold700 }}>For: {activeInvolve.role}</p>
                  <p className="leading-relaxed mb-6 text-sm" style={{ color: C.stone }}>{activeInvolve.what}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs mb-3" style={{ fontWeight: 700, color: C.stone, letterSpacing: "0.08em" }}>WHAT THE TRUST PROVIDES</p>
                      <ul className="space-y-2">
                        {activeInvolve.provides.map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm" style={{ color: C.stone }}>
                            <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: C.sage600 }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl p-5 flex flex-col justify-between bg-white" style={{ border: `1px solid ${C.border}` }}>
                      <p className="text-sm mb-4" style={{ color: C.stone, fontStyle: "italic" }}>{activeInvolve.trust}</p>
                      <Link to={activeInvolve.ctaTo} className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, background: C.navy800, color: C.ivory }}>
                        {activeInvolve.cta} <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ══ SECTION 10 — STORIES ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: C.ivory }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Ground-Level Proof</SectionLabel>
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: C.charcoal }}>
              Stories from the Ground
            </h2>
            <p className="text-xs italic max-w-lg mx-auto" style={{ color: C.stone }}>
              Illustrative stories based on observed patterns. Verified stories with consent will replace these as they are collected.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {STORIES.map((story, i) => (
              <FadeIn key={story.type + i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-7" style={{ border: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xs px-3 py-1 rounded-full" style={{ fontWeight: 600, background: C.navy50, color: C.navy700, border: `1px solid ${C.navy100}` }}>{story.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: C.gold50, color: C.gold700, border: `1px solid ${C.gold200}` }}>{story.tag}</span>
                  </div>
                  <div className="space-y-3 mb-4">
                    {[
                      { lbl: "SITUATION",   text: story.situation },
                      { lbl: "WHAT WAS DONE", text: story.what },
                      { lbl: "WHAT CHANGED", text: story.change },
                    ].map(item => (
                      <div key={item.lbl}>
                        <p className="text-xs mb-1" style={{ fontWeight: 600, color: C.stone, letterSpacing: "0.07em" }}>{item.lbl}</p>
                        <p className="text-sm leading-relaxed" style={{ color: C.charcoal }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs italic" style={{ color: "#BCC6D0" }}>{story.ph}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {TESTIMONIALS.slice(0, 2).map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.09}>
                <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.border}` }}>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} style={{ fill: C.gold500, color: C.gold500 }} />)}
                  </div>
                  <p className="text-sm leading-relaxed mb-4 italic" style={{ color: C.stone }}>"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs" style={{ background: C.navy50, color: C.navy800, fontWeight: 700 }}>{t.avatar}</div>
                    <div>
                      <div className="text-xs" style={{ fontWeight: 600, color: C.charcoal }}>{t.name}</div>
                      <div className="text-xs" style={{ color: C.stone }}>{t.location} · {t.amount} · {t.cause}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="flex justify-center gap-3">
            <Link to="/about" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm transition-colors" style={{ fontWeight: 600, color: C.navy700, border: `1px solid ${C.navy200}`, background: C.navy50 }}>
              Read More Stories <ArrowRight size={13} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══ SECTION 11 — FINAL TRUST BAND ════════════════════════════════════ */}
      <section className="py-20" style={{ background: C.navy900 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: C.gold500, fontWeight: 600 }}>
              Teacher-Led · Education-Only · Transparent
            </p>
            <h2 className="text-3xl md:text-4xl mb-5" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: "#F8F5EF" }}>
              One Teacher Started This.<br />
              <span style={{ color: C.gold300 }}>Many Can Keep It Going.</span>
            </h2>
            <p className="leading-relaxed mb-10 text-sm max-w-xl mx-auto" style={{ color: "rgba(248,245,239,0.55)" }}>
              Ujjwala Wadekar has spent 31 years proving that government school education can be transformative. Shiksha Raj is the system that makes her work scalable — with your help.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Link to="/donate" className="px-8 py-3.5 rounded-xl text-sm transition-all hover:scale-105" style={{ fontWeight: 700, background: C.gold600, color: C.ivory }}>
                Donate Now
              </Link>
              <Link to="/causes" className="px-8 py-3.5 rounded-xl text-sm transition-all" style={{ fontWeight: 700, background: "rgba(255,255,255,0.08)", color: "#F8F5EF", border: "1px solid rgba(255,255,255,0.15)" }}>
                Join Teacher Network
              </Link>
              <Link to="/about" className="px-8 py-3.5 rounded-xl text-sm transition-all" style={{ fontWeight: 600, background: "rgba(255,255,255,0.05)", color: "#F8F5EF", border: "1px solid rgba(255,255,255,0.1)" }}>
                Partner With Us
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-5 mb-10 text-xs" style={{ color: "rgba(248,245,239,0.4)" }}>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} style={{ color: C.sage600 }} /> Progress is visible & published</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} style={{ color: C.sage600 }} /> Use of funds reported quarterly</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} style={{ color: C.sage600 }} /> 80G eligible · FCRA registered</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} style={{ color: C.sage600 }} /> Annual audit published</span>
            </div>

            <div className="flex flex-wrap justify-center gap-5 pt-7" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <Link to="/auth" className="text-xs flex items-center gap-1 transition-colors" style={{ color: "rgba(248,245,239,0.35)", fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.gold300}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,245,239,0.35)"}>
                <Users size={11} /> Join the Community
              </Link>
              <Link to="/about" className="text-xs flex items-center gap-1 transition-colors" style={{ color: "rgba(248,245,239,0.35)", fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.gold300}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,245,239,0.35)"}>
                <Globe size={11} /> Subscribe for Updates
              </Link>
              <a href="mailto:contact@shiksharaj.org" className="text-xs flex items-center gap-1 transition-colors" style={{ color: "rgba(248,245,239,0.35)", fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.gold300}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,245,239,0.35)"}>
                <Mail size={11} /> Media & Partnership Inquiries
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
