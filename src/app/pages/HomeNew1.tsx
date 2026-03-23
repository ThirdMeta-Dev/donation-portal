import { Link } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Heart, GraduationCap, Users, 
  ChevronRight, Star, Quote, Mail, Globe,
  Play, CheckCircle2, Menu, X 
} from "lucide-react";
import { FOUNDER_NAME, FOUNDER_TITLE } from "../lib/constants";

// Assets from Figma exports
import founderImg from "figma:asset/1d3e0a39256d5e5f61254e45ebd4f78ed4032ca5.png";
import founderVideoThumb from "figma:asset/7e8ca225e615b2a1f491608b0f7fcf2a6b613c0d.png";
import imgDecorative from "figma:asset/3295e477553d40b1c93909599b04241c3de200a2.png";
import svgPaths from "../../imports/svg-7xvvus1vz0";

// Brand Colors
const C = {
  navy950: "#0A1B2C", 
  navy900: "#0F2A44", 
  blue500: "#2E80D0", 
  gold500: "#F59E0B", 
  gold400: "#F7B13C",
  ivory:   "#F8F5EF", 
  warmIvory: "#FDECCE", 
  white:   "#FFFFFF",
  textHeader: "#112D48",
  textBody: "#4F5E71"
};

// ─── Components ─────────────────────────────────────────────────────────────

function Button({ children, primary = false, className = "", onClick }: { children: React.ReactNode; primary?: boolean; className?: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
        primary 
          ? `bg-[#F59E0B] text-white hover:bg-[#D68A09] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95` 
          : `bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40`
      } ${className}`}
    >
      {children}
    </button>
  );
}

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center p-6 transition-all duration-500 ${isScrolled ? "scale-95 py-4" : "py-6"}`}>
      <div className={`w-full max-w-[1200px] transition-all duration-500 flex items-center justify-between px-8 py-3 rounded-full border ${
        isScrolled 
          ? "bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl" 
          : "bg-white/5 backdrop-blur-md border-white/10"
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <GraduationCap className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-widest text-sm leading-none">SHIKSHA RAJ</span>
            <span className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase mt-1">Ujjwal Bharat</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-white/50 text-[13px] font-bold tracking-widest uppercase">
          <Link to="/" className="hover:text-white transition-colors">Vision</Link>
          <Link to="/" className="hover:text-white transition-colors">Method</Link>
          <Link to="/" className="hover:text-white transition-colors">Impact</Link>
          <Link to="/" className="hover:text-white transition-colors">Connect</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/donate">
            <button className="bg-[#F59E0B] text-white px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase shadow-lg shadow-yellow-500/20 hover:bg-[#D68A09] transition-all active:scale-95">
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export function HomeNew1() {
  return (
    <div className="min-h-screen font-['Inter',sans-serif] bg-[#0A1B2C] text-white selection:bg-[#F59E0B] selection:text-white">
      <Nav />
      <Hero />
      <StorySection />
      <RecognitionCarousel />
      <MethodCarousel />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#0A1B2C]">
      
      {/* Animated Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2E80D0] rounded-full blur-[150px] -mr-40 -mt-40 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.08, 0.05],
          rotate: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F59E0B] rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none"
      />

      <div className="w-full max-w-[1200px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 py-20">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start order-2 lg:order-1"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></span>
            <span className="text-white/60 text-[10px] font-black tracking-[0.3em] uppercase">Trusted Mission · Jalgaon</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1] tracking-tight mb-8">
            A Teacher's Work, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#F7B13C] to-[#F59E0B] bg-[length:200%_auto] animate-gradient-x">
              Scaled Into a Public Mission
            </span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-[560px] font-medium">
            {FOUNDER_NAME} is the face and lived proof of this mission — 31 years of teaching in government schools in Jalgaon. 
            <span className="text-white/80 block mt-6 italic border-l-2 border-[#F59E0B] pl-6 py-1">
              "Shiksha Raj, Ujjwal Bharat Mission is the system that scales her work."
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Button primary className="w-full sm:w-auto group shadow-2xl shadow-yellow-500/20">
              Support the Mission <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="w-full sm:w-auto">
              <Play size={18} className="fill-white" /> Watch Documentary
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-12 w-full max-w-[500px]">
            <div className="flex flex-col gap-1">
              <span className="text-white text-3xl font-black tracking-tighter">12k+</span>
              <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">Children</span>
            </div>
            <div className="flex flex-col gap-1 border-x border-white/10 px-8">
              <span className="text-white text-3xl font-black tracking-tighter">340+</span>
              <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">Teachers</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white text-3xl font-black tracking-tighter">120+</span>
              <span className="text-white/30 text-[9px] font-black uppercase tracking-widest">Schools</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center order-1 lg:order-2"
        >
          {/* Main Visual Container */}
          <div className="relative w-full max-w-[520px]">
            {/* Background SVG Decoration from exports */}
            <div className="absolute inset-0 z-0 flex items-center justify-center scale-110 translate-x-4">
              <svg width="460" height="420" viewBox="0 0 460 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/5">
                <path d="M40 0H420C442.091 0 460 17.9086 460 40V340C460 362.091 442.091 380 420 380H80C57.9086 380 40 397.909 40 420V0Z" fill="currentColor"/>
              </svg>
            </div>

            {/* Main Founder Image with Premium Frame */}
            <div className="relative z-10 rounded-[48px] overflow-hidden border-[1px] border-white/20 shadow-[-40px_40px_80px_rgba(0,0,0,0.5)] group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B2C] via-transparent to-transparent opacity-60 z-10"></div>
              <img 
                src={founderImg} 
                alt={FOUNDER_NAME} 
                className="w-full h-auto object-cover transform transition-all duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
              
              {/* Profile Card Overlay */}
              <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl z-20 flex items-center gap-5 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#F59E0B] shadow-lg flex-shrink-0">
                  <img src={founderImg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-white font-black text-lg tracking-tight leading-none">{FOUNDER_NAME}</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{FOUNDER_TITLE}</p>
                </div>
                <div className="ml-auto w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
              </div>
            </div>

            {/* Video Preview Floating Thumbnail */}
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 -top-8 w-44 h-44 rounded-[32px] overflow-hidden border-8 border-[#0A1B2C] shadow-2xl z-30 group cursor-pointer"
            >
              <img src={founderVideoThumb} alt="Founder in Action" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/20">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                  <Play size={24} className="text-white fill-white ml-1" />
                </div>
              </div>
            </motion.div>

            {/* Accent Elements */}
            <div className="absolute -left-12 bottom-20 w-32 h-32 bg-[#2E80D0]/20 rounded-full blur-3xl z-0"></div>
          </div>
        </motion.div>
      </div>

      {/* Progress / Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
        <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">Scroll Explore</span>
        <div className="h-16 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>
      </div>
    </section>
  );
}


function StorySection() {
  return (
    <section className="py-32 bg-[#F8F5EF] text-[#0A1B2C] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F59E0B]/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#F59E0B]">The Challenge</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-['Lora',serif] font-semibold leading-[1.2]">
            When a family is choosing <br />
            <span className="text-[#F59E0B]">between food and fees,</span> <br />
            education is a luxury.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-[500px]">
            In the heart of Jalgaon's rural belt, thousands of children drift away from learning not because they lack potential, but because their parents lack the bridge to keep them engaged. 
          </p>
          <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
                <ChevronRight size={18} className="text-[#F59E0B]" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Problems we are working on</h4>
                <p className="text-slate-500 text-sm">Identifying root causes of dropout rates in secondary education.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl skew-y-1">
             <img src={imgDecorative} alt="Rural Education" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-10 p-10 bg-[#0A1B2C] text-white rounded-[32px] shadow-2xl max-w-[280px]">
            <Quote size={40} className="text-[#F59E0B] mb-4 opacity-50" />
            <p className="text-lg font-medium leading-snug">"Every child we save from the fields is a victory for the nation."</p>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">— Ujjwala Wadekar</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RecognitionCarousel() {
  const [index, setIndex] = useState(0);
  const awards = [
    { title: "National Teacher Award", year: "2018", org: "Govt of India" },
    { title: "State Merit Recognition", year: "2021", org: "Maharashtra" },
    { title: "Global Impact Nominee", year: "2023", org: "Edu-Global" }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex(prev => (prev === 0 ? awards.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setIndex(prev => (prev === awards.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="py-32 bg-[#0A1B2C] text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <h3 className="text-[44px] font-['Lora',serif] font-semibold mb-20 text-center tracking-tight">
          Media & Recognitions
        </h3>

        <div className="relative group">
          <div className="flex justify-center items-center gap-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                className="w-full max-w-[800px] p-12 bg-white/5 border border-white/10 rounded-[40px] flex flex-col md:flex-row items-center gap-12 backdrop-blur-3xl"
              >
                <div className="w-48 h-48 rounded-full bg-[#F59E0B]/20 border-4 border-[#F59E0B] flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                  <Star fill="#F59E0B" className="text-[#F59E0B]" size={64} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[#F59E0B] font-black tracking-[0.2em] uppercase text-xs">Excellence Award</span>
                  <h4 className="text-3xl font-bold mt-2 mb-4">{awards[index].title}</h4>
                  <p className="text-white/40 text-lg">{awards[index].org} · {awards[index].year}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots / Progress Bar */}
          <div className="flex justify-center gap-4 mt-20">
            {awards.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className="relative h-1 transition-all duration-500 overflow-hidden rounded-full bg-white/10"
                style={{ width: i === index ? "60px" : "30px" }}
              >
                {i === index && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute inset-0 bg-[#F59E0B]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodCarousel() {
  const cards = [
    { title: "See", desc: "Visual storytelling through documentary films and live demonstrations.", color: "#BF791D" },
    { title: "Hear", desc: "Direct interactions and workshops with teacher reformers.", color: "#2E80D0" },
    { title: "Read", desc: "Access to exhaustive curriculum resources and impact case studies.", color: "#BF791D" },
    { title: "Do", desc: "Hands-on implementation support for government school teachers.", color: "#2E80D0" },
    { title: "Support", desc: "Mentorship circles connecting experienced and new teachers.", color: "#BF791D" },
    { title: "Involve", desc: "Community-driven initiatives for classroom transformation.", color: "#2E80D0" },
    { title: "Scale", desc: "State-wide adoption of Shiksha Raj pedagogical innovations.", color: "#BF791D" }
  ];

  return (
    <section className="py-32 bg-[#FDECCE] overflow-hidden">
      <div className="px-6 mb-20 text-center max-w-[800px] mx-auto">
        <span className="text-[#BF791D] font-['Poppins',sans-serif] text-[13px] font-black uppercase tracking-[0.3em]">The Shiksha Raj Method</span>
        <h2 className="text-5xl font-['Lora',serif] font-bold text-[#112D48] mt-6 leading-tight">
          Take Children to the World
        </h2>
      </div>

      {/* Looping Carousel */}
      <div className="relative flex overflow-hidden group">
        <motion.div 
          animate={{ x: [0, -100 * cards.length + "%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...cards, ...cards].map((card, i) => (
            <div 
              key={i}
              className="inline-block w-[300px] md:w-[450px] p-4 flex-shrink-0"
            >
              <div className="bg-white p-10 rounded-[48px] shadow-xl border border-slate-100 flex flex-col h-[400px] transition-transform duration-500 group-hover:pause">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-colors`}
                     style={{ backgroundColor: card.color + "20" }}>
                  <Play className="fill-current" style={{ color: card.color }} size={24} />
                </div>
                <h4 className="text-3xl font-black text-[#112D48] mb-6">{card.title}</h4>
                <p className="text-slate-500 whitespace-normal leading-relaxed text-lg">
                  {card.desc}
                </p>
                <div className="mt-auto flex items-center gap-3 text-sm font-bold tracking-widest uppercase" style={{ color: card.color }}>
                  Learn More <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
