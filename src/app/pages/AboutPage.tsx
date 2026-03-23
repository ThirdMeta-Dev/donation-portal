import { motion } from "motion/react";
import { Link } from "react-router";
import { Heart, Award, Shield, Users, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { FOUNDER_NAME, FOUNDATION_NAME, TEAM_MEMBERS, MILESTONES, IMAGES } from "../lib/constants";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
}

export function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.community} alt="community" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-orange-500/20 text-orange-300 text-sm px-4 py-1.5 rounded-full mb-4" style={{ fontWeight: 600 }}>Our Story</span>
            <h1 className="text-white text-4xl md:text-5xl mb-6" style={{ fontWeight: 800 }}>
              About {FOUNDATION_NAME}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              A grassroots NGO founded by {FOUNDER_NAME}, transforming lives across rural India through education, healthcare, nutrition, water, and women empowerment since 2015.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative">
              <video
                src="https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/Video-344.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-5 -right-5 rounded-2xl p-4 shadow-xl" style={{ background: "#B07D3A" }}>
                <div className="text-2xl text-white" style={{ fontWeight: 800 }}>2015</div>
                <div className="text-sm" style={{ color: "rgba(248,245,239,0.8)" }}>Founded</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <span className="inline-block bg-orange-100 text-orange-600 text-sm px-4 py-1.5 rounded-full mb-4" style={{ fontWeight: 600 }}>Founder & Executive Director</span>
              <h2 className="text-slate-900 text-3xl mb-4" style={{ fontWeight: 800 }}>{FOUNDER_NAME}</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>A social entrepreneur with 15+ years of grassroots experience across Maharashtra. IIM Ahmedabad alumna who gave up a corporate career to serve rural India.</p>
                <p>Ujjwala grew up witnessing the stark inequality between urban and rural India. After her MBA, she worked for 3 years in the corporate sector before founding {FOUNDATION_NAME} in her ancestral village in Nashik district.</p>
                <p>What started as a single classroom with 42 children has grown into a comprehensive platform touching 1.45 lakh lives across 6 states.</p>
                <blockquote className="border-l-4 border-orange-500 pl-4 italic text-slate-500">
                  "Every child I meet in a remote village has the same potential as a child in Mumbai. The difference is only opportunity — and that is what we provide."
                </blockquote>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {["IIM Ahmedabad Alumni", "Forbes 30 Under 30 India", "National Award 2023", "TISS Fellow"].map(badge => (
                  <span key={badge} className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full" style={{ fontWeight: 500 }}>{badge}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Our Mission", icon: "🎯", color: "border-orange-300 bg-orange-50", content: "To provide equal access to quality education, healthcare, nutrition, clean water, and economic opportunity to every rural Indian, regardless of gender, caste, or economic background." },
              { title: "Our Vision", icon: "🌟", color: "border-teal-300 bg-teal-50", content: "A self-reliant rural India where every child is educated, every family is healthy, and every woman is economically empowered — by 2035." },
              { title: "Our Values", icon: "💎", color: "border-blue-300 bg-blue-50", content: "Transparency in every rupee spent. Dignity for every beneficiary. Accountability to our donors. Innovation in our programs. Inclusion without discrimination." },
            ].map(item => (
              <FadeIn key={item.title}>
                <div className={`rounded-2xl border-2 ${item.color} p-6`}>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-slate-900 text-lg mb-3" style={{ fontWeight: 700 }}>{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.content}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-slate-900 text-3xl mb-3" style={{ fontWeight: 800 }}>Our Journey</h2>
              <p className="text-slate-500">From a single classroom to a national movement</p>
            </div>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-teal-400 hidden sm:block" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="hidden sm:flex w-16 flex-col items-center flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-md mt-1" />
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-2xl p-5 border border-slate-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-orange-600 text-sm" style={{ fontWeight: 800 }}>{m.year}</span>
                        <div className="h-px flex-1 bg-slate-200" />
                      </div>
                      <h3 className="text-slate-900 text-base mb-1" style={{ fontWeight: 600 }}>{m.title}</h3>
                      <p className="text-slate-500 text-sm">{m.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-slate-900 text-3xl mb-3" style={{ fontWeight: 800 }}>Our Team</h2>
              <p className="text-slate-500">Dedicated professionals committed to the cause</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-16 h-16 rounded-2xl ${member.color} text-white flex items-center justify-center text-xl mx-auto mb-4`} style={{ fontWeight: 800 }}>
                    {member.initials}
                  </div>
                  <h3 className="text-slate-900 text-base mb-1" style={{ fontWeight: 600 }}>{member.name}</h3>
                  <p className="text-orange-600 text-xs mb-3" style={{ fontWeight: 500 }}>{member.role}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-white text-3xl mb-3" style={{ fontWeight: 800 }}>Certifications & Compliance</h2>
              <p className="text-white/60">Fully registered and compliant with Indian law</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "📜", title: "80G Certificate", no: "AKF/80G/2017/001", sub: "50% tax deductible" },
              { icon: "🌐", title: "FCRA Reg.", no: "083780234", sub: "Foreign contributions" },
              { icon: "🏛️", title: "12AA Status", no: "AKF/12AA/2016", sub: "Tax exempt NGO" },
              { icon: "🏢", title: "MCA Reg.", no: "MH/2015/0073821", sub: "Companies Act" },
              { icon: "💳", title: "PAN Card", no: "AACTA1234B", sub: "Permanent acc. no." },
              { icon: "✅", title: "CSR-1 Reg.", no: "CSR00012345", sub: "CSR eligible" },
            ].map(cert => (
              <div key={cert.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{cert.icon}</div>
                <div className="text-white text-xs mb-0.5" style={{ fontWeight: 600 }}>{cert.title}</div>
                <div className="text-white/50 text-xs">{cert.no}</div>
                <div className="text-white/40 text-xs">{cert.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-slate-900 text-3xl mb-4" style={{ fontWeight: 800 }}>Be Part of the Change</h2>
            <p className="text-slate-500 text-base mb-6">Every rupee you donate reaches the ground. 100% transparent. 80G tax benefit. Proven impact.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/donate" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg" style={{ fontWeight: 700 }}>
                <Heart size={18} className="fill-white" /> Donate Now
              </Link>
              <Link to="/causes" className="flex items-center gap-2 border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors" style={{ fontWeight: 600 }}>
                Our Causes <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}