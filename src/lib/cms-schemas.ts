import type { SectionSchema } from "./cms-types";

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  // ── HOME ──────────────────────────────────────────────────────────────────

  HeroSection: {
    fields: [
      { key: "heading", label: "Main Heading", type: "textarea" },
      { key: "subtext", label: "Sub-text", type: "textarea" },
      { key: "awards", label: "Award Pills (comma-separated)", type: "text" },
      { key: "ctaPrimary", label: "CTA Button (Primary)", type: "text" },
      { key: "ctaSecondary", label: "CTA Button (Secondary)", type: "text" },
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
      awards: "National Award 2023, Forbes 30 Under 30, TISS Fellow",
      ctaPrimary: "Donate Now",
      ctaSecondary: "Problems we are working on",
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
      { key: "ctaLink", label: "CTA Link", type: "link" },
    ],
    defaultContent: {
      title: "उज्ज्वल संवाद (Ujjwal Sanvaad)",
      subtitle:
        "Come sit with Ujjwala and a growing community of teachers, parents, and supporters who want better education for every child.",
      bullet1: "Open conversations on real classroom struggles",
      bullet2: "Learn from Ujjwala's practical guidance",
      bullet3: "Build collective action for change",
      ctaText: "Let's Rethink Education Together",
      ctaLink: "page:/contact",
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
    isCarousel: true,
    carouselLabel: "Award Images",
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
    itemFields: [
      { key: "image", label: "Award Image", type: "image" },
      { key: "alt", label: "Award Name / Alt Text", type: "text" },
    ],
    defaultItems: [
      { image: "", alt: "National Award 2023" },
      { image: "", alt: "Forbes 30 Under 30" },
      { image: "", alt: "TISS Fellow" },
    ],
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
      { key: "ctaLink", label: "CTA Link", type: "link" },
    ],
    defaultContent: {
      badge: "Glimpse of my teaching!",
      heading: "Creating Experiences That Live For Life. Beyond Syllabus, Closer To Life.",
      backgroundImage: "",
    },
    defaultItems: [
      { label: "See • Hear • Read • Do", body: "Every lesson becomes real when children first observe, listen, read, and then learn by doing.", cta: "Watch This Method", ctaLink: "page:/about" },
      { label: "Beyond Syllabus, Closer to Life", body: "Children step beyond textbooks into shops, streets, and spaces where learning meets the real world.", cta: "See It In Action", ctaLink: "page:/about" },
      { label: "Read the World", body: "Wrappers, signboards, labels, and surroundings become reading lessons when children learn to notice meaning everywhere.", cta: "Watch How I Teach", ctaLink: "page:/about" },
      { label: "Confidence Before Marks", body: "When children feel seen, understood, and capable, learning begins to stay with them for life.", cta: "See Children Grow", ctaLink: "page:/about" },
      { label: "Home, School, Society Together", body: "A child learns stronger when teachers, families, and the community stand together around their journey.", cta: "See This Connection", ctaLink: "page:/about" },
      { label: "Future-Ready Learning", body: "Classrooms grow richer when curiosity, technology, and practical thinking prepare children for the world ahead.", cta: "Watch The Future", ctaLink: "page:/about" },
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
      { key: "cta1Link", label: "CTA Button 1 Link", type: "link" },
      { key: "cta2Text", label: "CTA Button 2 Text", type: "text" },
      { key: "cta2Link", label: "CTA Button 2 Link", type: "link" },
    ],
    defaultContent: {
      line1: "I can teach and enlighten many children.",
      line2Part1: "But teaching every child that creates a lasting impact",
      line2Part2: "towards Ujjwal Bharat needs a larger mission",
      supportText: "This larger mission needs all of us to unite. Teachers, students, parents, and society.",
      cta1Text: "Join Ujjwala's Mission",
      cta1Link: "page:/contact",
      cta2Text: "Donate Now",
      cta2Link: "page:/donate",
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
      { key: "bullet1", label: "Bullet 1", type: "text" },
      { key: "bullet2", label: "Bullet 2", type: "text" },
      { key: "bullet3", label: "Bullet 3", type: "text" },
      { key: "bullet4", label: "Bullet 4", type: "text" },
      { key: "cta", label: "CTA Text", type: "text" },
      { key: "ctaLink", label: "CTA Link", type: "link" },
    ],
    defaultItems: [
      { tab: "Ujjwal Sanvaad", hindi: "उज्ज्वल संवाद", english: "Ujjwal Sanvaad", desc: "An open, heartfelt space where Ujjwala listens to real struggles, and people come together to rethink education with honesty.", bullet1: "Hear real pain from teachers and parents", bullet2: "Bring local education problems into the room", bullet3: "Openly discuss what children truly need", bullet4: "Turn concern into community-led next steps", punchline: "When people finally sit together and speak honestly, education stops feeling helpless and starts feeling possible.", photo: "", cta: "Join Ujjwal Sanvaad", ctaLink: "page:/contact" },
      { tab: "Shikshak Unnati", hindi: "शिक्षक उन्नती मंच", english: "Shikshak Unnati Manch", desc: "A learning space where teachers rediscover purpose, learn practical methods, and grow into the kind of educators children remember.", bullet1: "Train teachers beyond textbook-led teaching", bullet2: "Demonstrate Ujjwala's real classroom methods", bullet3: "Help teachers build confidence and clarity", bullet4: "Grow more life-shaping teachers across schools", punchline: "When one teacher changes the way they teach, hundreds of children begin learning differently.", photo: "", cta: "Grow With Ujjwala", ctaLink: "page:/contact" },
      { tab: "Unhali Shala", hindi: "उज्ज्वल उन्हाळी शाळा", english: "Ujjwal Unhali Shala", desc: "A free summer experience where children learn through joy, curiosity, action, and real life instead of routine and pressure.", bullet1: "Group-wise learning for every age band", bullet2: "Explore life through play and projects", bullet3: "Meet people, places, and real professions", bullet4: "Build curiosity, confidence, and expression", punchline: "Sometimes one meaningful summer can awaken the kind of learning school alone could not.", photo: "", cta: "Enroll A Child", ctaLink: "page:/donate" },
      { tab: "ShikshanSaath", hindi: "उज्ज्वल शिक्षणसाथ", english: "Ujjwal ShikshanSaath", desc: "A caring support journey for bright children whose learning begins to break under the weight of money, need, and circumstance.", bullet1: "Support books, travel, tools, and access", bullet2: "Protect learning from financial hardship", bullet3: "Help bright children stay in school", bullet4: "Restore continuity, dignity, and hope", punchline: "A child should never lose education simply because life at home became heavier than learning.", photo: "", cta: "Support A Child", ctaLink: "page:/donate" },
      { tab: "Shala Abhiyan", hindi: "उज्ज्वल शाळा अभियान", english: "Ujjwal Shala Abhiyan", desc: "A shared school-strengthening journey where people come together to rebuild learning spaces with care, resources, guidance, and dignity.", bullet1: "Strengthen one school in meaningful ways", bullet2: "Improve resources, learning spaces, and support", bullet3: "Bring mentors, volunteers, and community together", bullet4: "Help children return with pride and hope", punchline: "A school changes deeply when it stops waiting for help and starts receiving the strength of a whole community.", photo: "", cta: "Strengthen A School", ctaLink: "page:/donate" },
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
      { key: "ctaLink", label: "CTA Link", type: "link" },
      { key: "photo", label: "Photo", type: "image" },
    ],
    defaultItems: [
      { tab: "Teachers", forLabel: "For Teachers who want to be part of something larger", desc: "You already show up every day. The Teacher Reformers Network gives the methods, the tools, infrastructure and the community which powers the ignited and passionate teacher within you. A space built by teachers, for teachers.", cta: "Join Teacher Network", ctaLink: "page:/contact", photo: "" },
      { tab: "Volunteers", forLabel: "For People who want to give their time or skill", desc: "A designer can create learning materials. A doctor can run a health awareness session. A local business can host an exposure visit. Whether you have a skill to teach, time to give or energy to contribute on the ground, bring your world to a child's education.", cta: "Offer My Skills", ctaLink: "page:/contact", photo: "" },
      { tab: "Partners", forLabel: "For Businesses that want to offer real-world learning experiences", desc: "Children learn best when learning connects to life. If your business or workplace can give a child a real glimpse of how the world works, you are already a potential partner in this mission. These visits become lessons no textbook can replicate.", cta: "I want to show the world to every child", ctaLink: "page:/contact", photo: "" },
      { tab: "CSR / Business", forLabel: "For Companies ready to invest in change that lasts", desc: "The trust works with businesses who want their education investment to connect directly to a child's learning. Your company's contribution goes into specific programs, is tracked against defined outcomes and is reported back to you honestly, whether the results are strong or still growing.", cta: "Request CSR Proposal", ctaLink: "page:/contact", photo: "" },
    ],
  },

  ProcessFlowSection: {
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "ctaBannerText", label: "CTA Banner Text", type: "textarea" },
      { key: "cta1Text", label: "CTA 1 Text (opens donation form)", type: "text" },
      { key: "cta2Text", label: "CTA 2 Text (Donate page)", type: "text" },
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
      cta1Text: "Support This Mission",
      cta2Text: "Donate Now",
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
      { key: "ctaLink", label: "CTA Link", type: "link" },
    ],
    defaultContent: {
      line1: "Education in India has not changed enough in decades.",
      line2: "It will not change through criticism or hope alone",
      line3: "It will change when ordinary people decide to lift it together,",
      line4: "and help build the उज्ज्वल भारत of 2050.",
      ctaText: "I Commit To Education",
      ctaLink: "page:/donate",
    },
  },

  IntroNGOSection: {
    fields: [
      { key: "titleLine1", label: "Title Line 1", type: "text" },
      { key: "titleLine2", label: "Title Line 2", type: "text" },
      { key: "visionText", label: "Vision Text", type: "textarea" },
      { key: "missionText", label: "Mission Text", type: "textarea" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
    ],
    defaultContent: {
      titleLine1: "Introducing,",
      titleLine2: "Shiksha Raj, Ujjwal Bharat Foundation",
      visionText:
        "To build education leadership (Shiksha Raj) for a Brighter India (Ujjwal Bharat) where every child receives free, accessible education that shapes confidence, capability, and character.",
      missionText:
        "To transform education into a practical, experiential, life-connected, digitally ready, teacher-led, community-supported system that goes beyond textbooks to give every child free, meaningful learning and prepare them for life.",
      backgroundImage: "",
    },
  },

  HonestImpactSection: {
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ],
    isCarousel: true,
    carouselLabel: "Impact Cards",
    itemFields: [
      { key: "tag1", label: "Tag 1", type: "text" },
      { key: "tag2", label: "Tag 2", type: "text" },
      { key: "row1Label", label: "Row 1 Label", type: "text" },
      { key: "row1Text", label: "Row 1 Text", type: "textarea" },
      { key: "row2Label", label: "Row 2 Label", type: "text" },
      { key: "row2Text", label: "Row 2 Text", type: "textarea" },
      { key: "row3Label", label: "Row 3 Label", type: "text" },
      { key: "row3Text", label: "Row 3 Text", type: "textarea" },
      { key: "photo", label: "Card Photo", type: "image" },
    ],
    defaultContent: {
      badge: "Honest Impact",
      heading: "This mission touched lives deeply.",
      subtitle:
        "In voices, journeys, and moments where children, families, and teachers, lives quietly transform.",
    },
    defaultItems: [
      { tag1: "Honest Impact", tag2: "Science", row1Label: "SITUATION", row1Text: "Class 5 children in Bhusawal had never seen a functioning lab — their science textbook remained theory.", row2Label: "WHAT WAS DONE", row2Text: "A Hands-On Learning Kit was introduced: magnets, lenses, circuits, seeds. The teacher ran six sessions.", row3Label: "WHAT CHANGED", row3Text: "Three months later, science scores improved by 22%. Children began asking questions unprompted.", photo: "" },
      { tag1: "Honest Impact", tag2: "Reading", row1Label: "WHAT CHANGED", row1Text: "Reading comprehension scores improved by 35% and children began borrowing books voluntarily each week.", row2Label: "", row2Text: "", row3Label: "", row3Text: "", photo: "" },
      { tag1: "Honest Impact", tag2: "Community", row1Label: "SITUATION", row1Text: "Rural schools lacked basic reading materials, limiting children's early language development.", row2Label: "WHAT WAS DONE", row2Text: "Mobile libraries with curated books were introduced across 40 villages in the district.", row3Label: "WHAT CHANGED", row3Text: "Reading comprehension scores improved by 35% within one academic year of the program launch.", photo: "" },
      { tag1: "Honest Impact", tag2: "Teachers", row1Label: "WHAT CHANGED", row1Text: "Teacher attendance improved by 28% and parent engagement in school activities tripled over the year.", row2Label: "", row2Text: "", row3Label: "", row3Text: "", photo: "" },
    ],
  },

  SupportCTASection: {
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "heading", label: "Heading", type: "textarea" },
      { key: "description", label: "Description (desktop)", type: "textarea" },
      { key: "bullet1", label: "Bullet 1", type: "text" },
      { key: "bullet2", label: "Bullet 2", type: "text" },
      { key: "bullet3", label: "Bullet 3", type: "text" },
      { key: "cta1Text", label: "CTA 1 Text (Donate)", type: "text" },
      { key: "cta2Text", label: "CTA 2 Text (Join Network)", type: "text" },
      { key: "cta3Text", label: "CTA 3 Text (Partner)", type: "text" },
    ],
    defaultContent: {
      badge: "One Mission · Many Hands ·",
      heading: "One Teacher Started This. Many Can Keep It Going.",
      description:
        "What Ujjwala built inside her classroom over 31 years is now a structure that can travel — to other schools, other teachers, and other children who deserve the same quality of care and learning.",
      bullet1: "Progress is visible & published",
      bullet2: "Use of funds reported quarterly",
      bullet3: "80G eligible · FCRA",
      cta1Text: "Donate Now",
      cta2Text: "Join Teacher Network",
      cta3Text: "Partner With Us",
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

  // ── HOME — HARDCODED SECTIONS (now CMS-backed) ───────────────────────────

  WhatProgressSection: {
    isCarousel: true,
    carouselLabel: "Progress Cards",
    fields: [
      { key: "badge", label: "Badge Text", type: "text" },
      { key: "title", label: "Section Title", type: "textarea" },
    ],
    defaultContent: {
      badge: "Real change!",
      title: "What Real Progress Feels Like",
    },
    itemFields: [
      { key: "type", label: "Card Type (video / content)", type: "text" },
      { key: "tag", label: "Tag", type: "text" },
      { key: "title", label: "Card Title", type: "text" },
      { key: "desc", label: "Description", type: "textarea" },
      { key: "bullet1", label: "Bullet 1", type: "text" },
      { key: "bullet2", label: "Bullet 2", type: "text" },
      { key: "bullet3", label: "Bullet 3", type: "text" },
      { key: "thumbnail", label: "Thumbnail Image", type: "image" },
    ],
    defaultItems: [
      { type: "video", tag: "Real Classroom", title: "See This Method In Action", desc: "Watch how Ujjwala transforms a standard lesson into a lived experience.", bullet1: "Students observe and then do", bullet2: "Every lesson connects to real life", bullet3: "No child is left behind", thumbnail: "" },
      { type: "content", tag: "Student Growth", title: "A Child Who Once Refused To Come", desc: "Atharva hadn't attended school in months when Ujjwala walked to his door.", bullet1: "Home visits that changed everything", bullet2: "Family included in the journey", bullet3: "Back in school within two weeks", thumbnail: "" },
      { type: "content", tag: "Teacher Change", title: "When A Teacher's Way Changes", desc: "A simple shift in how a teacher speaks can open a classroom completely.", bullet1: "From instruction to conversation", bullet2: "Children began raising hands", bullet3: "Confidence before marks", thumbnail: "" },
      { type: "video", tag: "Beyond Syllabus", title: "Learning Outside The Walls", desc: "Children stepped out of their classroom into shops, farms, and streets.", bullet1: "Reading signboards as a lesson", bullet2: "Math in the marketplace", bullet3: "Science in the garden", thumbnail: "" },
      { type: "content", tag: "Community Impact", title: "When The Village Joins In", desc: "The biggest change happened not in the classroom, but when parents started attending.", bullet1: "Monthly parent gatherings", bullet2: "Homework that involved family", bullet3: "Attendance rose steadily", thumbnail: "" },
      { type: "content", tag: "Long-Term Change", title: "Results That Last Beyond Exams", desc: "Children who went through this programme remember what they learned five years later.", bullet1: "Skills over marks", bullet2: "Critical thinking built early", bullet3: "Career clarity from confidence", thumbnail: "" },
    ],
  },

  FeelTeacherSection: {
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Main Title", type: "textarea" },
      { key: "para1", label: "Paragraph 1", type: "textarea" },
      { key: "para2", label: "Paragraph 2", type: "textarea" },
      { key: "para3", label: "Paragraph 3", type: "textarea" },
      { key: "image", label: "Teacher Photo (overrides default)", type: "image" },
      { key: "trustTitle", label: "Trust Section Title", type: "textarea" },
      { key: "trustPara1", label: "Trust Paragraph 1", type: "textarea" },
      { key: "trustPara2", label: "Trust Paragraph 2", type: "textarea" },
    ],
    defaultContent: {
      badge: "About Ujjwal Mam",
      title: "After 31 years, I still feel like a young teacher joined on 5th July, 1995.",
      para1: "Teaching found me because my family had always been teachers. My father, my mother, my grandmother. When I walked into my first government school classroom in 1995, I felt like I was continuing the family legacy.",
      para2: "I have taught children who could not afford ten rupees for a school fee. I have gone to their homes at night without telling anyone. I have helped families get the documents that opened doors their children would otherwise never have found. I have done all of this because a teacher's job does not end when the bell rings.",
      para3: "Its selfless service to the powerhouse of my country. No better satisfaction than shaping the bright minds of this country.",
      image: "",
      trustTitle: "A Trust Built Because One Classroom Was Never Going To Be Enough",
      trustPara1: "For 31 years, I saw bright, curious children slowly grow distant from learning. Not because they were weak, but because the system around them stopped speaking to their life, their struggle, and their reality.",
      trustPara2: "Shiksha Raj Ujjwal Bharat Foundation was born from that journey — an education-only trust created to carry practical, teacher-led learning into schools and communities that need it most, with full transparency on every contribution and every change it helps bring.",
    },
  },

  OurChannelsSection: {
    isCarousel: true,
    carouselLabel: "Social Channels / Grid Images",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
      { key: "subtitle", label: "Section Subtitle", type: "textarea" },
      { key: "youtubeUrl", label: "YouTube Channel URL", type: "url" },
      { key: "instagramUrl", label: "Instagram Profile URL", type: "url" },
      { key: "whatsappUrl", label: "WhatsApp Community URL", type: "url" },
      { key: "linkedinUrl", label: "LinkedIn Profile URL", type: "url" },
    ],
    defaultContent: {
      badge: "Follow The Journey",
      title: "See The Work, Feel The Journey",
      subtitle: "The full stories, lessons, and lived moments continue across every channel I share.",
      youtubeUrl: "https://www.youtube.com/channel/UCJOILwGRJVFODGp6uQGDF1w",
      instagramUrl: "https://www.instagram.com/zp_teacher_ujjwala_wadekar/",
      whatsappUrl: "https://wa.me/919370318308",
      linkedinUrl: "https://www.linkedin.com/in/ujjwala-wadekar-317094247/",
    },
    itemFields: [
      { key: "image", label: "Grid Image", type: "image" },
      { key: "alt", label: "Alt Text", type: "text" },
      { key: "link", label: "Image Link (optional)", type: "link" },
    ],
    defaultItems: [
      { image: "", alt: "Work image 1", link: "" },
      { image: "", alt: "Work image 2", link: "" },
      { image: "", alt: "Work image 3", link: "" },
      { image: "", alt: "Work image 4", link: "" },
    ],
  },

  FaqSection: {
    isCarousel: true,
    carouselLabel: "FAQ Items",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Section Title", type: "text" },
    ],
    defaultContent: {
      badge: "Questions",
      title: "Frequently Asked Questions",
    },
    itemFields: [
      { key: "category", label: "Category", type: "text" },
      { key: "question", label: "Question", type: "text" },
      { key: "answer", label: "Answer", type: "textarea" },
    ],
    defaultItems: [
      { category: "About Ujjwala and the Trust", question: "How is Ujjwala Wadekar related to the trust?", answer: "Ujjwala is the founder's inspiration and the lived force behind the trust. Her life's work gave this mission its voice, values, and direction." },
      { category: "About Ujjwala and the Trust", question: "What does \"Where Teachers Lead And Society Lifts\" really mean?", answer: "It means teachers should not carry change alone. When society stands beside them, education becomes stronger, more equal, and more lasting." },
      { category: "Support, Donations, and Transparency", question: "How will my donation actually be used?", answer: "Your support goes into real learning needs — materials, programmes, mentorship, books, exposure, digital access, and school-strengthening support." },
      { category: "Support, Donations, and Transparency", question: "Do you directly give cash to children or families?", answer: "No. The focus is on meaningful educational support that helps children continue learning with dignity and continuity." },
      { category: "Support, Donations, and Transparency", question: "Can I claim tax benefits on my donation under Section 80G?", answer: "Yes, only if the trust has active 80G approval at the time of donation. Also, cash donations above ₹2,000 are not eligible, and 80G cannot be claimed under the new tax regime." },
      { category: "Support, Donations, and Transparency", question: "Can I support a specific child, school, or programme directly?", answer: "Yes. Support can be meaningfully directed through clear routes like a child's learning journey, a school-strengthening effort, or a defined programme." },
      { category: "Participation and Contribution", question: "How can someone help if they cannot donate money right now?", answer: "You can still be part of this mission — by teaching, volunteering, mentoring, opening doors, spreading the word, or simply staying involved." },
      { category: "Participation and Contribution", question: "I am not ready to donate yet. Can I still stay involved?", answer: "Of course. This mission needs people, not only money — teachers, parents, volunteers, supporters, and communities all have a role here." },
      { category: "Participation and Contribution", question: "Can teachers join this mission even if they are from another school or city?", answer: "Yes. The trust is built to grow beyond one classroom and one place, through teacher networks, training, and replicable school models." },
      { category: "Programmes and Scale", question: "What kind of programmes will the trust actually run on the ground?", answer: "From teacher training and Beyond Syllabus learning to student support, parent workshops, community events, and school-strengthening programmes — the work is meant to stay practical and real." },
      { category: "Programmes and Scale", question: "How will these programmes reach children outside one school or one city?", answer: "By building teacher-led models, training networks, scalable playbooks, and community-supported programmes that can travel from one place to many." },
      { category: "Programmes and Scale", question: "What does \"Adopt A School\" really include?", answer: "It includes more than funding — books, tools, mentoring, teaching support, workshops, and even school improvement drives led by the community." },
    ],
  },

  // ── BRAND / GLOBAL ────────────────────────────────────────────────────────

  NavigationSection: {
    isCarousel: true,
    carouselLabel: "Navigation Items",
    fields: [
      { key: "logoText", label: "Logo Text", type: "text" },
      { key: "logoImage", label: "Logo Image", type: "image" },
      { key: "ctaText", label: "Header CTA Button Text", type: "text" },
      { key: "ctaLink", label: "Header CTA Button Link", type: "link" },
    ],
    defaultContent: {
      logoText: "Ujjwal Bharat",
      logoImage: "",
      ctaText: "Contribute Now",
      ctaLink: "page:/donate",
    },
    itemFields: [
      { key: "label", label: "Nav Label", type: "text" },
      { key: "link", label: "Nav Link (top-level, used if no submenus)", type: "link" },
      { key: "sub1Label", label: "Submenu 1 — Label", type: "text" },
      { key: "sub1Link",  label: "Submenu 1 — Link",  type: "link" },
      { key: "sub2Label", label: "Submenu 2 — Label", type: "text" },
      { key: "sub2Link",  label: "Submenu 2 — Link",  type: "link" },
      { key: "sub3Label", label: "Submenu 3 — Label", type: "text" },
      { key: "sub3Link",  label: "Submenu 3 — Link",  type: "link" },
      { key: "sub4Label", label: "Submenu 4 — Label", type: "text" },
      { key: "sub4Link",  label: "Submenu 4 — Link",  type: "link" },
      { key: "sub5Label", label: "Submenu 5 — Label", type: "text" },
      { key: "sub5Link",  label: "Submenu 5 — Link",  type: "link" },
    ],
    defaultItems: [
      {
        label: "Ujjwala Wadekar", link: "anchor:section14-story",
        sub1Label: "My Story",               sub1Link: "anchor:section14-story",
        sub2Label: "My Teaching Methodology", sub2Link: "anchor:section5-teaching",
        sub3Label: "Awards and Recognition",  sub3Link: "anchor:section4-awards",
        sub4Label: "The Team",                sub4Link: "anchor:section15-team",
        sub5Label: "", sub5Link: "",
      },
      {
        label: "Mission", link: "anchor:section-intro-ngo",
        sub1Label: "About the Mission",        sub1Link: "anchor:section-intro-ngo",
        sub2Label: "Programs and Initiatives", sub2Link: "anchor:section8-programs",
        sub3Label: "See the Impact",           sub3Link: "anchor:section9-impact",
        sub4Label: "Adopt a School",           sub4Link: "anchor:section8-adopt",
        sub5Label: "", sub5Link: "",
      },
      {
        label: "Get Involved", link: "anchor:section10",
        sub1Label: "Contribute to the Cause",  sub1Link: "page:/donate",
        sub2Label: "CSR / Businesses",          sub2Link: "anchor:section10-csr",
        sub3Label: "Volunteers",                sub3Link: "anchor:section10-volunteers",
        sub4Label: "Teachers",                  sub4Link: "anchor:section10-teachers",
        sub5Label: "Partners (Non CSR)",        sub5Link: "anchor:section10-partners",
      },
      {
        label: "Community", link: "anchor:section16-testimonials",
        sub1Label: "Words from the Community", sub1Link: "anchor:section16-testimonials",
        sub2Label: "Join the Community",       sub2Link: "external:https://wa.me/919370318308",
        sub3Label: "", sub3Link: "",
        sub4Label: "", sub4Link: "",
        sub5Label: "", sub5Link: "",
      },
    ],
  },

  FooterSection: {
    fields: [
      { key: "quote", label: "Footer Tagline / Quote", type: "text" },
      { key: "address", label: "Office Address", type: "textarea" },
      { key: "phone", label: "Phone Number", type: "text" },
      { key: "email", label: "Email Address", type: "text" },
      { key: "copyright", label: "Copyright Text", type: "text" },
      { key: "cin", label: "CIN Number", type: "text" },
      { key: "youtubeUrl", label: "YouTube URL", type: "url" },
      { key: "instagramUrl", label: "Instagram URL", type: "url" },
      { key: "whatsappUrl", label: "WhatsApp URL", type: "url" },
      { key: "linkedinUrl", label: "LinkedIn URL", type: "url" },
      { key: "col1Title", label: "Footer Column 1 Title", type: "text" },
      { key: "col2Title", label: "Footer Column 2 Title", type: "text" },
      { key: "col3Title", label: "Footer Column 3 Title", type: "text" },
      { key: "col4Title", label: "Footer Column 4 Title", type: "text" },
    ],
    defaultContent: {
      quote: "Where teachers lead and society lifts.",
      address: '"Rau" 89/412, Nehru Nagar, Mohadi Road, Jalgaon, 425002',
      phone: "+91 93703 18308",
      email: "info@ujjwalabharat.org",
      copyright: "© 2026 Ujjwala Wadekar. All rights reserved.",
      cin: "CIN:U62013PN2023PTC223154",
      youtubeUrl: "https://www.youtube.com/channel/UCJOILwGRJVFODGp6uQGDF1w",
      instagramUrl: "https://www.instagram.com/zp_teacher_ujjwala_wadekar/",
      whatsappUrl: "https://wa.me/919370318308",
      linkedinUrl: "https://www.linkedin.com/in/ujjwala-wadekar-317094247/",
      col1Title: "Our Mission",
      col2Title: "Programmes",
      col3Title: "Get Involved",
      col4Title: "Legal",
    },
  },

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
