import type { SectionSchema } from "./cms-types";

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  // ── HOME ──────────────────────────────────────────────────────────────────

  HeroSection: {
    fields: [
      { key: "heading", label: "Main Heading", type: "textarea" },
      { key: "subtext", label: "Sub-text", type: "textarea" },
      { key: "ctaPrimary", label: "CTA Button (Primary)", type: "text" },
      { key: "ctaPrimaryLink", label: "CTA Link (Primary)", type: "url" },
      { key: "ctaSecondary", label: "CTA Button (Secondary)", type: "text" },
      { key: "ctaSecondaryLink", label: "CTA Link (Secondary)", type: "url" },
      { key: "stat1", label: "Stat Bubble 1", type: "text" },
      { key: "stat2", label: "Stat Bubble 2", type: "text" },
      { key: "stat3", label: "Stat Bubble 3", type: "text" },
      { key: "heroImage", label: "Hero Background Image", type: "image" },
      { key: "mobileTeacherImage", label: "Mobile Teacher Photo", type: "image" },
      { key: "videoHorizontal", label: "Video (Horizontal / Banner)", type: "video" },
      { key: "videoVertical", label: "Video (Vertical)", type: "video" },
    ],
    defaultContent: {
      heading: "Building Character, Confidence, and Capability in Every Child",
      subtext:
        "Through practical teaching experiences, I bring classrooms closer to life and children learn by seeing, doing, feeling, and understanding.",
      ctaPrimary: "Donate Now",
      ctaPrimaryLink: "/donate",
      ctaSecondary: "Problems we are working on",
      ctaSecondaryLink: "#section5-teaching",
      stat1: "31 yrs",
      stat2: "340+ Teachers in Network",
      stat3: "12,400+ Children Reached",
      heroImage: "",
      mobileTeacherImage: "",
      videoHorizontal: "",
      videoVertical: "",
    },
  },

  ProgramBannerSection: {
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Sub-title", type: "textarea" },
      { key: "bullet1", label: "Bullet Point 1", type: "text" },
      { key: "bullet2", label: "Bullet Point 2", type: "text" },
      { key: "bullet3", label: "Bullet Point 3", type: "text" },
      { key: "ctaText", label: "CTA Button Text", type: "text" },
      { key: "ctaLink", label: "CTA Link", type: "url" },
    ],
    defaultContent: {
      title: "उज्ज्वल संवाद (Ujjwal Sanvaad)",
      subtitle:
        "Come sit with Ujjwala and a growing community of teachers, parents, and supporters who want better education for every child.",
      bullet1: "Open conversations on real classroom struggles",
      bullet2: "Learn from Ujjwala's practical guidance",
      bullet3: "Build collective action for change",
      ctaText: "Let's Rethink Education Together",
      ctaLink: "/contact",
    },
  },

  S3CarouselSection: {
    isCarousel: true,
    carouselLabel: "Carousel Slides",
    fields: [],
    itemFields: [
      { key: "image", label: "Slide Image", type: "image" },
      { key: "category", label: "Category", type: "text" },
      { key: "caption", label: "Caption", type: "textarea" },
    ],
    defaultItems: [
      { image: "", category: "Family Problems", caption: "I met Atharva's parents and asked, \"Why isn't he coming to school?\" They looked at me and said, \"Madam, can education feed us through our basic needs today? We had to send him to the farm to survive.\"" },
      { image: "", category: "Family Problems", caption: "A child spends 6 hours in school and 18 at home. If learning finds no support, no encouragement, no environment there, even the brightest child slowly stops taking education seriously." },
      { image: "", category: "Student Problems", caption: "A bright village boy once went to the city, and his confidence shattered. Fancy showrooms, malls, pizza shops, premium cars. One look at that world, and he quietly felt, \"I do not belong here.\"" },
      { image: "", category: "Student Problems", caption: "Students top exams and merit lists, but when life asks for difficult decisions, many end up choosing careers forced on them. Years later, they realize they lived someone else's dream, not their own." },
      { image: "", category: "Teacher Problems", caption: "When I first joined, ZP schools were full of children. Today, many classrooms stand half empty. Not because children disappeared, but because school stopped feeling worth returning to." },
      { image: "", category: "Teacher Problems", caption: "Do we ever ask a fish to fly? Every child is made differently. But many classrooms still reduce them to fixed hours, fixed syllabus, and fixed exams." },
      { image: "", category: "Teacher Problems", caption: "Life often feels heavier than education. But how often do teachers truly pause and ask a child, \"Tell me, how is life treating you?\"" },
      { image: "", category: "Society Problems", caption: "One missing birth certificate, one delayed caste document, and a child's hard-earned chance slips away quietly. Dreams do not always break with noise. Sometimes, paperwork breaks them in silence." },
      { image: "", category: "Society Problems", caption: "He stopped telling his classmates what his father did for work. No one taught him that labour has dignity, so he learned shame much before he ever learned pride." },
    ],
  },

  RecognitionsSection: {
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "title", label: "Title", type: "textarea" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    defaultContent: {
      badge: "Seen & acknowledged",
      title: "Finally, My Voice Reached!!",
      description:
        "Awards don't define my work. They confirm that someone is watching and believe it mattered.",
    },
  },

  BeyondSyllabusSection: {
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Section Heading", type: "textarea" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
    ],
    isCarousel: true,
    carouselLabel: "Accordion Items",
    itemFields: [
      { key: "label", label: "Tab Label", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
      { key: "cta", label: "CTA Text", type: "text" },
      { key: "ctaLink", label: "CTA Link", type: "url" },
    ],
    defaultContent: {
      badge: "Glimpse of my teaching!",
      heading: "Creating Experiences That Live For Life. Beyond Syllabus, Closer To Life.",
      backgroundImage: "",
    },
    defaultItems: [
      { label: "See • Hear • Read • Do", body: "Every lesson becomes real when children first observe, listen, read, and then learn by doing.", cta: "Watch This Method", ctaLink: "/about" },
      { label: "Beyond Syllabus, Closer to Life", body: "Children step beyond textbooks into shops, streets, and spaces where learning meets the real world.", cta: "See It In Action", ctaLink: "/about" },
      { label: "Read the World", body: "Wrappers, signboards, labels, and surroundings become reading lessons when children learn to notice meaning everywhere.", cta: "Watch How I Teach", ctaLink: "/about" },
      { label: "Confidence Before Marks", body: "When children feel seen, understood, and capable, learning begins to stay with them for life.", cta: "See Children Grow", ctaLink: "/about" },
      { label: "Home, School, Society Together", body: "A child learns stronger when teachers, families, and the community stand together around their journey.", cta: "See This Connection", ctaLink: "/about" },
      { label: "Future-Ready Learning", body: "Classrooms grow richer when curiosity, technology, and practical thinking prepare children for the world ahead.", cta: "Watch The Future", ctaLink: "/about" },
    ],
  },

  TestimonialsSection: {
    isCarousel: true,
    carouselLabel: "Testimonials",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "sectionSubtitle", label: "Section Subtitle", type: "text" },
    ],
    defaultContent: {
      sectionTitle: "When education impacts lives…",
      sectionSubtitle: "Their voices inspire me.",
    },
    itemFields: [
      { key: "title", label: "Testimonial Title", type: "text" },
      { key: "body", label: "Testimonial Body", type: "textarea" },
      { key: "category", label: "Category (teachers/parents/students)", type: "text" },
      { key: "photo", label: "Person Photo", type: "image" },
    ],
    defaultItems: [
      { title: "Grade-level reading assessments conduct", body: "Grade-level reading assessments conducted each term by teacher facilitators across 120 Grade-level reading lorem ips assessments conducted each term by teacher", category: "teachers", photo: "" },
      { title: "Empowering educators through tech", body: "Our digital portal has revolutionized how we track student progress. It allows for real-time adjustments and more personalized support in the classroom.", category: "teachers", photo: "" },
      { title: "A new standard for rural schools", body: "Bringing these assessments to rural areas has leveled the playing field for our students. The data-driven approach is truly transformative for educators.", category: "teachers", photo: "" },
      { title: "Seeing my child grow every day", body: "The constant feedback from the portal helps me understand where my child needs help. It's transformed our evening study sessions into bonding time.", category: "parents", photo: "" },
      { title: "Transparency in education", body: "I finally feel connected to what's happening at school. The level of detail in the reading reports is unlike anything we've seen before.", category: "parents", photo: "" },
      { title: "Simplified learning journeys", body: "My daughter loves the interactive nature of the assignments. The platform makes complex subjects feel accessible and fun for young learners.", category: "parents", photo: "" },
      { title: "Learning is now a fun adventure", body: "I used to be afraid of reading tests, but now they feel like games. I can see my progress and earn badges which keeps me really excited to learn.", category: "students", photo: "" },
      { title: "My favorite way to study", body: "The portal is so easy to use! I can practice my reading and get instant help when I'm stuck on a hard word. It makes me feel much more confident.", category: "students", photo: "" },
      { title: "Reaching my full potential", body: "Thanks to the personalized reading tracks, I've improved my grade by two levels this term. I feel ready for high school and beyond!", category: "students", photo: "" },
    ],
  },

  TextRevealSection: {
    fields: [
      { key: "line1", label: "Line 1", type: "textarea" },
      { key: "line2Part1", label: "Line 2 — Part 1", type: "textarea" },
      { key: "line2Part2", label: "Line 2 — Part 2", type: "textarea" },
      { key: "supportText", label: "Supporting Text", type: "textarea" },
      { key: "cta1Text", label: "CTA Button 1 Text", type: "text" },
      { key: "cta1Link", label: "CTA Button 1 Link", type: "url" },
      { key: "cta2Text", label: "CTA Button 2 Text", type: "text" },
      { key: "cta2Link", label: "CTA Button 2 Link", type: "url" },
    ],
    defaultContent: {
      line1: "I can teach and enlighten many children.",
      line2Part1: "But teaching every child that creates a lasting impact",
      line2Part2: "towards Ujjwal Bharat needs a larger mission",
      supportText: "This larger mission needs all of us to unite. Teachers, students, parents, and society.",
      cta1Text: "Join Ujjwala's Mission",
      cta1Link: "/contact",
      cta2Text: "Donate Now",
      cta2Link: "/donate",
    },
  },

  ProgramsSection: {
    isCarousel: true,
    carouselLabel: "Programs",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "textarea" },
    ],
    defaultContent: {
      badge: "On the Ground",
      title: "What the Trust Builds Ground",
      subtitle: "Five programmes built from 31 years of classroom truth — each one addresses a real need.",
    },
    itemFields: [
      { key: "tab", label: "Tab Label", type: "text" },
      { key: "hindi", label: "Hindi Name", type: "text" },
      { key: "english", label: "English Name", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "punchline", label: "Punchline", type: "text" },
      { key: "photo", label: "Program Photo", type: "image" },
      { key: "cta", label: "CTA Text", type: "text" },
      { key: "ctaLink", label: "CTA Link", type: "url" },
    ],
    defaultItems: [
      { tab: "Ujjwal Sanvaad", hindi: "उज्ज्वल संवाद", english: "Ujjwal Sanvaad", desc: "An open, heartfelt space where Ujjwala listens to real struggles, and people come together to rethink education with honesty.", punchline: "When people finally sit together and speak honestly, education stops feeling helpless and starts feeling possible.", photo: "", cta: "Join Ujjwal Sanvaad", ctaLink: "/contact" },
      { tab: "Shikshak Unnati", hindi: "शिक्षक उन्नती मंच", english: "Shikshak Unnati Manch", desc: "A learning space where teachers rediscover purpose, learn practical methods, and grow into the kind of educators children remember.", punchline: "When one teacher changes the way they teach, hundreds of children begin learning differently.", photo: "", cta: "Grow With Ujjwala", ctaLink: "/contact" },
      { tab: "Unhali Shala", hindi: "उज्ज्वल उन्हाळी शाळा", english: "Ujjwal Unhali Shala", desc: "A free summer experience where children learn through joy, curiosity, action, and real life instead of routine and pressure.", punchline: "Sometimes one meaningful summer can awaken the kind of learning school alone could not.", photo: "", cta: "Enroll A Child", ctaLink: "/donate" },
      { tab: "ShikshanSaath", hindi: "उज्ज्वल शिक्षणसाथ", english: "Ujjwal ShikshanSaath", desc: "A caring support journey for bright children whose learning begins to break under the weight of money, need, and circumstance.", punchline: "A child should never lose education simply because life at home became heavier than learning.", photo: "", cta: "Support A Child", ctaLink: "/donate" },
      { tab: "Shala Abhiyan", hindi: "उज्ज्वल शाळा अभियान", english: "Ujjwal Shala Abhiyan", desc: "A shared school-strengthening journey where people come together to rebuild learning spaces with care, resources, guidance, and dignity.", punchline: "A school changes deeply when it stops waiting for help and starts receiving the strength of a whole community.", photo: "", cta: "Strengthen A School", ctaLink: "/donate" },
    ],
  },

  GetInvolvedSection: {
    isCarousel: true,
    carouselLabel: "Involvement Tabs",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "textarea" },
    ],
    defaultContent: {
      title: "Find Your Role In This Mission",
      subtitle: "Choose what fits your life and your capacity. Every role here connects directly to the way India educates.",
    },
    itemFields: [
      { key: "tab", label: "Tab Label", type: "text" },
      { key: "forLabel", label: "For Label", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "cta", label: "CTA Text", type: "text" },
      { key: "ctaLink", label: "CTA Link", type: "url" },
      { key: "photo", label: "Photo", type: "image" },
    ],
    defaultItems: [
      { tab: "Teachers", forLabel: "For Teachers who want to be part of something larger", desc: "You already show up every day. The Teacher Reformers Network gives the methods, the tools, infrastructure and the community which powers the ignited and passionate teacher within you. A space built by teachers, for teachers.", cta: "Join Teacher Network", ctaLink: "/contact", photo: "" },
      { tab: "Volunteers", forLabel: "For People who want to give their time or skill", desc: "A designer can create learning materials. A doctor can run a health awareness session. A local business can host an exposure visit. Whether you have a skill to teach, time to give or energy to contribute on the ground, bring your world to a child's education.", cta: "Offer My Skills", ctaLink: "/contact", photo: "" },
      { tab: "Partners", forLabel: "For Businesses that want to offer real-world learning experiences", desc: "Children learn best when learning connects to life. If your business or workplace can give a child a real glimpse of how the world works, you are already a potential partner in this mission. These visits become lessons no textbook can replicate.", cta: "I want to show the world to every child", ctaLink: "/contact", photo: "" },
      { tab: "CSR / Business", forLabel: "For Companies ready to invest in change that lasts", desc: "The trust works with businesses who want their education investment to connect directly to a child's learning. Your company's contribution goes into specific programs, is tracked against defined outcomes and is reported back to you honestly, whether the results are strong or still growing.", cta: "Request CSR Proposal", ctaLink: "/contact", photo: "" },
    ],
  },

  ProcessFlowSection: {
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "ctaBannerText", label: "CTA Banner Text", type: "textarea" },
      { key: "cta1Text", label: "CTA 1 Text", type: "text" },
      { key: "cta1Link", label: "CTA 1 Link", type: "url" },
      { key: "cta2Text", label: "CTA 2 Text", type: "text" },
      { key: "cta2Link", label: "CTA 2 Link", type: "url" },
    ],
    isCarousel: true,
    carouselLabel: "Process Steps",
    itemFields: [
      { key: "num", label: "Step Number", type: "number" },
      { key: "title", label: "Step Title", type: "text" },
      { key: "desc", label: "Step Description", type: "textarea" },
    ],
    defaultContent: {
      badge: "Your Contribution",
      title: "How Your Support Turns Into Learning",
      ctaBannerText: "Stand with a mission where every contribution is valued, placed with care, and reflected in real change.",
      cta1Text: "See All Causes",
      cta1Link: "/causes",
      cta2Text: "Donate Now",
      cta2Link: "/donate",
    },
    defaultItems: [
      { num: 1, title: "Support Received", desc: "Every contribution is logged, acknowledged, and allocated transparently." },
      { num: 2, title: "Allocated to a Defined Need", desc: "Funds go directly to the programme or cause you chose." },
      { num: 3, title: "Used in Learning", desc: "On-ground impact — classrooms, teachers, and children." },
    ],
  },

  QuotesCarouselSection: {
    isCarousel: true,
    carouselLabel: "Quotes",
    fields: [],
    itemFields: [
      { key: "quote", label: "Quote", type: "textarea" },
    ],
    defaultItems: [
      { quote: "Children do not lack intelligence. They lack the chance to be seen and guided." },
      { quote: "Education is not a privilege for a few. It is every child's rightful path forward." },
      { quote: "When a teacher walks to a child's door, education begins to feel possible again." },
      { quote: "The purpose of education is not finishing the syllabus. It's beyond the syllabus to build human beings." },
      { quote: "Education is the only way to break the cycle of survival and open the door to dignity." },
      { quote: "Education changes faster when teachers lead and the society lifts." },
    ],
  },

  TeamSection: {
    isCarousel: true,
    carouselLabel: "Team Members",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "textarea" },
    ],
    defaultContent: {
      badge: "My support system",
      title: "Meet the faces that keep the mission alive",
      subtitle: "The first ones to inspire & believe in me. The first ones to carry the mission on their shoulders.",
    },
    itemFields: [
      { key: "name", label: "Name", type: "text" },
      { key: "role", label: "Role / Title", type: "text" },
      { key: "photo", label: "Photo", type: "image" },
      { key: "bio", label: "Short Bio", type: "textarea" },
    ],
    defaultItems: [
      { name: "Ujjwala Wadekar", role: "Founder & ZP School Teacher", photo: "", bio: "" },
      { name: "Sanjay Patil", role: "Programme Director", photo: "", bio: "" },
      { name: "Meera Desai", role: "Curriculum & Training Head", photo: "", bio: "" },
      { name: "Rahul Joshi", role: "Finance & Compliance", photo: "", bio: "" },
    ],
  },

  ClosingSection: {
    fields: [
      { key: "line1", label: "Line 1", type: "textarea" },
      { key: "line2", label: "Line 2", type: "textarea" },
      { key: "line3", label: "Line 3", type: "textarea" },
      { key: "line4", label: "Line 4 (highlight)", type: "textarea" },
      { key: "ctaText", label: "CTA Button Text", type: "text" },
      { key: "ctaLink", label: "CTA Link", type: "url" },
    ],
    defaultContent: {
      line1: "Education in India has not changed enough in decades.",
      line2: "It will not change through criticism or hope alone",
      line3: "It will change when ordinary people decide to lift it together,",
      line4: "and help build the उज्ज्वल भारत of 2050.",
      ctaText: "I Commit To Education",
      ctaLink: "/donate",
    },
  },

  // ── ABOUT ─────────────────────────────────────────────────────────────────

  FounderBioSection: {
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "videoUrl", label: "Founder Video URL", type: "video" },
      { key: "founderName", label: "Founder Name", type: "text" },
      { key: "founderTitle", label: "Founder Title / Role", type: "text" },
      { key: "bio1", label: "Bio Paragraph 1", type: "textarea" },
      { key: "bio2", label: "Bio Paragraph 2", type: "textarea" },
      { key: "bio3", label: "Bio Paragraph 3", type: "textarea" },
      { key: "founderQuote", label: "Pull Quote", type: "textarea" },
      { key: "foundedYear", label: "Founded Year", type: "number" },
      { key: "expYears", label: "Years Experience", type: "number" },
      { key: "teachersCount", label: "Teachers Count", type: "text" },
      { key: "childrenCount", label: "Children Reached", type: "text" },
      { key: "badge1", label: "Credential Badge 1", type: "text" },
      { key: "badge2", label: "Credential Badge 2", type: "text" },
      { key: "badge3", label: "Credential Badge 3", type: "text" },
      { key: "badge4", label: "Credential Badge 4", type: "text" },
    ],
    defaultContent: {
      badge: "Our Story",
      videoUrl: "https://sienna-pelican-786032.hostingersite.com/wp-content/uploads/2026/03/Video-344.mp4",
      founderName: "Ujjwala Wadekar",
      founderTitle: "Founder & Executive Director",
      bio1: "A social entrepreneur with 15+ years of grassroots experience across Maharashtra.",
      bio2: "Ujjwala grew up witnessing the stark inequality between urban and rural India. After her MBA, she worked for 3 years in the corporate sector before founding the foundation.",
      bio3: "What started as a single classroom with 42 children has grown into a comprehensive platform touching 1.45 lakh lives across 6 states.",
      founderQuote: "Every child I meet in a remote village has the same potential as a child in Mumbai. The difference is only opportunity — and that is what we provide.",
      foundedYear: 2015,
      expYears: 31,
      teachersCount: "340+",
      childrenCount: "12,400+",
      badge1: "IIM Ahmedabad Alumni",
      badge2: "Forbes 30 Under 30 India",
      badge3: "National Award 2023",
      badge4: "TISS Fellow",
    },
  },

  MissionVisionSection: {
    fields: [
      { key: "missionTitle", label: "Mission Title", type: "text" },
      { key: "missionText", label: "Mission Text", type: "textarea" },
      { key: "visionTitle", label: "Vision Title", type: "text" },
      { key: "visionText", label: "Vision Text", type: "textarea" },
      { key: "valuesTitle", label: "Values Title", type: "text" },
      { key: "valuesText", label: "Values Text", type: "textarea" },
    ],
    defaultContent: {
      missionTitle: "Our Mission",
      missionText: "To provide equal access to quality education, healthcare, nutrition, clean water, and economic opportunity to every rural Indian, regardless of gender, caste, or economic background.",
      visionTitle: "Our Vision",
      visionText: "A self-reliant rural India where every child is educated, every family is healthy, and every woman is economically empowered — by 2035.",
      valuesTitle: "Our Values",
      valuesText: "Transparency in every rupee spent. Dignity for every beneficiary. Accountability to our donors. Innovation in our programs. Inclusion without discrimination.",
    },
  },

  AboutMilestonesSection: {
    isCarousel: true,
    carouselLabel: "Milestones",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "sectionSubtitle", label: "Section Subtitle", type: "text" },
    ],
    defaultContent: {
      sectionTitle: "Our Journey",
      sectionSubtitle: "From a single classroom to a national movement",
    },
    itemFields: [
      { key: "year", label: "Year", type: "number" },
      { key: "title", label: "Milestone Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    defaultItems: [
      { year: 2015, title: "Foundation Founded", description: "Started with a single classroom and 42 children in Jalgaon." },
      { year: 2017, title: "80G Certification", description: "Received 80G certification enabling tax benefits for donors." },
      { year: 2019, title: "Teacher Network Launch", description: "40 teachers joined the first cohort of the Teacher Reformers Network." },
      { year: 2021, title: "10,000 Children Milestone", description: "Reached 10,000 children across Maharashtra." },
      { year: 2023, title: "National Recognition", description: "Received national award for grassroots education innovation." },
      { year: 2025, title: "340 Teachers Strong", description: "Teacher network grew to 340+ across 6 districts." },
    ],
  },

  CertificationsSection: {
    isCarousel: true,
    carouselLabel: "Certifications",
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text" },
      { key: "sectionSubtitle", label: "Section Subtitle", type: "text" },
    ],
    defaultContent: {
      sectionTitle: "Certifications & Compliance",
      sectionSubtitle: "Fully registered and compliant with Indian law",
    },
    itemFields: [
      { key: "name", label: "Certificate Name", type: "text" },
      { key: "regNumber", label: "Registration Number", type: "text" },
      { key: "description", label: "Description", type: "text" },
      { key: "image", label: "Certificate Image", type: "image" },
    ],
    defaultItems: [
      { name: "80G Certificate", regNumber: "", description: "Tax exemption for donors", image: "" },
      { name: "FCRA Registration", regNumber: "", description: "Foreign contribution acceptance", image: "" },
      { name: "12AA Status", regNumber: "", description: "Income tax exemption", image: "" },
      { name: "MCA Registration", regNumber: "", description: "Ministry of Corporate Affairs", image: "" },
      { name: "PAN Card", regNumber: "", description: "Permanent Account Number", image: "" },
      { name: "CSR-1 Registration", regNumber: "", description: "CSR eligible organisation", image: "" },
    ],
  },

  // ── DONATE ────────────────────────────────────────────────────────────────

  PresetAmountsSection: {
    isCarousel: true,
    carouselLabel: "Preset Donation Amounts",
    fields: [],
    itemFields: [
      { key: "amount", label: "Amount (₹)", type: "number" },
      { key: "label", label: "Display Label", type: "text" },
      { key: "impact", label: "Impact Description", type: "text" },
    ],
    defaultItems: [
      { amount: 150, label: "₹150", impact: "1 child's stationery for a term" },
      { amount: 500, label: "₹500", impact: "1 child's Beyond Syllabus experience" },
      { amount: 1000, label: "₹1,000", impact: "1 teacher's workshop & resource kit" },
      { amount: 2500, label: "₹2,500", impact: "1 classroom learning kit" },
      { amount: 5000, label: "₹5,000", impact: "1 school's library expansion" },
      { amount: 25000, label: "₹25,000", impact: "Adopt 1 school for a full year" },
    ],
  },

  ImpactMessagesSection: {
    isCarousel: true,
    carouselLabel: "Impact Messages by Amount",
    fields: [],
    itemFields: [
      { key: "maxAmount", label: "Max Amount (₹, 0 = unlimited)", type: "number" },
      { key: "message", label: "Impact Message", type: "text" },
    ],
    defaultItems: [
      { maxAmount: 150, message: "Feeds 1 child for a week 🍽️" },
      { maxAmount: 500, message: "1 child's education for a week 📚" },
      { maxAmount: 1000, message: "Medical care for 3 people 💊" },
      { maxAmount: 2500, message: "Clean water for 1 family for a year 💧" },
      { maxAmount: 5000, message: "Skill training for 1 woman 👩‍💼" },
      { maxAmount: 0, message: "Educate 1 child for a full year 🌟" },
    ],
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────

  ContactInfoSection: {
    fields: [
      { key: "email", label: "Email Address", type: "text" },
      { key: "phone", label: "Phone Number", type: "text" },
      { key: "address", label: "Office Address", type: "textarea" },
      { key: "whatsapp", label: "WhatsApp Link", type: "url" },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "instagram", label: "Instagram URL", type: "url" },
      { key: "youtube", label: "YouTube URL", type: "url" },
      { key: "mapsEmbed", label: "Google Maps Embed URL", type: "url" },
    ],
    defaultContent: {
      email: "info@ujjwalabharat.org",
      phone: "+91 93703 18308",
      address: "Arcadion Building, North Main Road, Koregaon Park, Pune, Maharashtra Pin: 411001",
      whatsapp: "https://wa.me/919370318308",
      linkedin: "https://www.linkedin.com/in/ujjwala-wadekar-317094247/",
      instagram: "https://www.instagram.com/zp_teacher_ujjwala_wadekar/",
      youtube: "https://www.youtube.com/channel/UCJOILwGRJVFODGp6uQGDF1w",
      mapsEmbed: "",
    },
  },

  ContactGridSection: {
    isCarousel: true,
    carouselLabel: "Grid Images",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "description", label: "Section Description", type: "textarea" },
    ],
    defaultContent: {
      badge: "In my words",
      title: "See The Work, Feel The Journey",
      description: "The full stories, lessons, and lived moments continue across every channel I share.",
    },
    itemFields: [
      { key: "image", label: "Grid Image", type: "image" },
      { key: "alt", label: "Alt Text", type: "text" },
    ],
    defaultItems: [
      { image: "", alt: "Grid image 1" },
      { image: "", alt: "Grid image 2" },
      { image: "", alt: "Grid image 3" },
      { image: "", alt: "Grid image 4" },
    ],
  },

  // ── BRAND / GLOBAL ────────────────────────────────────────────────────────

  BrandSettings: {
    fields: [
      { key: "foundationName", label: "Foundation Name", type: "text" },
      { key: "foundationShort", label: "Foundation Short Name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "founderName", label: "Founder Name", type: "text" },
      { key: "founderTitle", label: "Founder Title", type: "text" },
      { key: "contactEmail", label: "Contact Email", type: "text" },
      { key: "contactPhone", label: "Contact Phone", type: "text" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "logoImage", label: "Logo Image", type: "image" },
      { key: "faviconImage", label: "Favicon Image", type: "image" },
    ],
    defaultContent: {
      foundationName: "Ujjwal Bharat",
      foundationShort: "Ujjwal Bharat",
      tagline: "Teacher-Led Education Reform, Rooted in Jalgaon",
      founderName: "Ujjwala Wadekar",
      founderTitle: "Founder · ZP School Teacher · 31 Years of Dedicated Service",
      contactEmail: "contact@shiksharaj.org",
      contactPhone: "+91 94220 43210",
      address: "Near Nehru Chowk, Jalgaon, Maharashtra – 425001",
      logoImage: "",
      faviconImage: "",
    },
  },
};
