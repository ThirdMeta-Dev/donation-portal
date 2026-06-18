// ─── Brand ────────────────────────────────────────────────────────────────────
export const FOUNDATION_NAME    = "Ujjwal Bharat";
export const FOUNDATION_SHORT   = "Ujjwal Bharat";
export const FOUNDATION_TRUST   = "Ujjwal Bharat Mission";
export const FOUNDATION_TAGLINE = "Teacher-Led Education Reform, Rooted in Jalgaon";
export const FOUNDATION_EMAIL   = "contact@shiksharaj.org";
export const FOUNDATION_PHONE   = "+91 94220 43210";
export const FOUNDATION_ADDRESS = "Near Nehru Chowk, Jalgaon, Maharashtra – 425001";
export const FOUNDER_NAME       = "Ujjwala Wadekar";
export const FOUNDER_TITLE      = "Founder · ZP School Teacher · 31 Years of Dedicated Service";

// Razorpay
export const RAZORPAY_KEY_ID = "rzp_live_T2QNlsCb98OwoT";

// ─── Images ───────────────────────────────────────────────────────────────────
export const IMAGES = {
  hero:        "https://images.unsplash.com/photo-1709290749293-c6152a187b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400",
  classroom:   "https://images.unsplash.com/photo-1763637675793-da207ba1fe18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  community:   "https://images.unsplash.com/photo-1528082414335-adbd64f18d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  practical:   "https://images.unsplash.com/photo-1599376672737-bd66af54c8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  teacher:     "https://images.unsplash.com/photo-1708593343442-7595427ddf7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  reading:     "https://images.unsplash.com/photo-1692269725827-699e04a11cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  founder:     "figma:asset/1d3e0a39256d5e5f61254e45ebd4f78ed4032ca5.png",
  environment: "https://images.unsplash.com/photo-1760022881497-fa4d401f0920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
};

// ─── Programs / Causes ────────────────────────────────────────────────────────
export const CAUSES = [
  {
    id: "ujjwal-sanvaad",
    title: "Ujjwal Sanvaad",
    category: "Education",
    description: "Open dialogue sessions between teachers, students, and parents — creating transparent, honest conversations that strengthen the school community.",
    longDescription: `Ujjwal Sanvaad (Bright Dialogue) brings together teachers, students, parents, and village leaders for structured conversations about learning, school challenges, and community expectations.\n\nThese sessions break down barriers between schools and families, ensuring every child's voice is heard. ₹500 sponsors one Sanvaad session for an entire village community.`,
    image: "https://images.unsplash.com/photo-1528082414335-adbd64f18d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 3000000,
    raised: 1200000,
    donors: 2100,
    impact: "₹500 = 1 community dialogue session for an entire village",
    impactItems: ["180+ villages covered", "5,200+ participants", "Teacher-parent connect", "Monthly sessions"],
    tag: "80G Eligible",
    urgent: false,
    updates: [
      { date: "2026-02-10", title: "Sanvaad in Raver Taluka", desc: "300 parents and 45 teachers gathered for an open school dialogue in Raver." },
    ]
  },
  {
    id: "shikshak-unnati",
    title: "Shikshak Unnati Manch",
    category: "Education",
    description: "Continuous professional development for ZP government school teachers — workshops, peer learning circles, and resource kits to unlock every teacher's potential.",
    longDescription: `Shikshak Unnati (Teacher Progress) is Ujjwala Wadekar's flagship teacher-upliftment program. It connects 340+ government school teachers across Jalgaon and North Maharashtra for monthly workshops, peer mentoring, and access to a shared resource library.\n\nOne inspired teacher transforms hundreds of students. ₹1,000 funds one teacher's complete monthly training and resource support.`,
    image: "https://images.unsplash.com/photo-1708593343442-7595427ddf7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 4000000,
    raised: 2100000,
    donors: 3240,
    impact: "₹1,000 = 1 teacher's workshop + resource kit for a month",
    impactItems: ["340+ teachers connected", "Monthly workshops", "6 districts covered", "Shared resource library"],
    tag: "80G Eligible",
    urgent: true,
    updates: [
      { date: "2026-02-20", title: "Teacher Summit in Jalgaon", desc: "200 teachers from Khandesh gathered for a 2-day Shikshak Unnati summit." },
    ]
  },
  {
    id: "unhali-shala",
    title: "Ujjwal Unhali Shibir",
    category: "Education",
    description: "Summer school camps for government school children — keeping learning alive during vacations through activities, experiments, art, and life-skills sessions.",
    longDescription: `Unhali Shala (Summer School) ensures children from marginalized communities don't lose learning momentum during the long summer break. Our camps run hands-on science, language, art, and life-skills sessions across 40+ villages in Jalgaon.\n\nChildren return to school with renewed curiosity and a head start on the next academic year. ₹300 sponsors one child's full Unhali Shala summer camp experience.`,
    image: "https://images.unsplash.com/photo-1599376672737-bd66af54c8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 2000000,
    raised: 780000,
    donors: 1850,
    impact: "₹300 = 1 child's full Unhali Shala summer camp",
    impactItems: ["4,500+ children enrolled", "40+ villages", "Science, art & life skills", "6-week program"],
    tag: "80G Eligible",
    urgent: true,
    updates: [
      { date: "2026-01-15", title: "Unhali Shala 2026 Announced", desc: "Registration open for summer camps across 42 villages in Jalgaon district." },
    ]
  },
  {
    id: "shikshan-saath",
    title: "Ujjwal ShikshanSaath",
    category: "Education",
    description: "Peer-learning support groups where older students mentor younger ones — building confidence, reducing dropout, and creating a culture of mutual learning.",
    longDescription: `ShikshanSaath (Learning Together) pairs senior students with struggling juniors within government schools for guided peer-mentoring sessions. This approach not only lifts the younger learners — it deepens the knowledge and leadership skills of the mentors.\n\nEvery ₹200 funds one month of ShikshanSaath mentoring for a pair of students, including session materials and facilitator support.`,
    image: "https://images.unsplash.com/photo-1692269725827-699e04a11cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 1500000,
    raised: 620000,
    donors: 1480,
    impact: "₹200 = 1 month of peer-mentoring for a student pair",
    impactItems: ["2,800+ student pairs", "Dropout reduction", "Leadership development", "All grade levels"],
    tag: "80G Eligible",
    urgent: false,
    updates: []
  },
  {
    id: "shala-abhiyan",
    title: "Ujjwal Shala Abhiyan",
    category: "Education",
    description: "A holistic school transformation campaign — upgrading infrastructure, libraries, labs, and teaching quality in the most under-resourced ZP schools of Jalgaon.",
    longDescription: `Shala Abhiyan (School Campaign) is a comprehensive effort to transform the most under-resourced ZP schools in Jalgaon. Each adopted school receives infrastructure improvements (blackboards, clean toilets, drinking water), a curated library, a science lab kit, and quarterly teacher mentor visits.\n\n₹25,000 fully sponsors one school for an entire academic year — with transparent impact reports shared every term.`,
    image: "https://images.unsplash.com/photo-1763637675793-da207ba1fe18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 5000000,
    raised: 1800000,
    donors: 2300,
    impact: "₹25,000 = 1 school transformed for a full academic year",
    impactItems: ["35 schools covered", "Jalgaon & Dhule", "Infrastructure + library + lab", "Quarterly reports"],
    tag: "80G Eligible",
    urgent: true,
    updates: [
      { date: "2026-01-28", title: "New School in Yawal Transformed", desc: "320 students benefit from library, lab upgrades, and clean drinking water." },
    ]
  },
];

// ─── Testimonials ──────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: "Rajesh Mehta",
    location: "Mumbai, India",
    amount: "Monthly ₹2,000",
    text: "I've been supporting Shiksha Raj for 3 years now. What moved me most was seeing children from Jalgaon's tribal villages confidently explaining science experiments. This is real, grounded education reform — not charity theatre.",
    avatar: "RM",
    color: "bg-indigo-100 text-indigo-700",
    cause: "Beyond Syllabus",
  },
  {
    name: "Priya Krishnamurthy",
    location: "Bangalore, India",
    amount: "One-time ₹10,000",
    text: "What impressed me was the transparency — I received photos from an actual classroom in Jalgaon, a detailed utilization report, and my 80G certificate within 24 hours. This is how NGOs should operate.",
    avatar: "PK",
    color: "bg-amber-100 text-amber-700",
    cause: "Teacher Network",
  },
  {
    name: "Suresh Patel",
    location: "New Jersey, USA (NRI)",
    amount: "Annual $500",
    text: "My family is from Khandesh. I always wanted to give back. Shiksha Raj gave me that channel — supporting teachers who are already there, already committed, already doing the work. That's the right model.",
    avatar: "SP",
    color: "bg-emerald-100 text-emerald-700",
    cause: "Adopt A School",
  },
  {
    name: "Ananya Sharma",
    location: "Delhi, India",
    amount: "Monthly ₹500",
    text: "I'm a teacher myself, so I deeply respect what Ujjwala Ma'am has built. The Teacher Reformers Network is exactly what government school teachers need — community, resources, and recognition.",
    avatar: "AS",
    color: "bg-rose-100 text-rose-700",
    cause: "Teacher Network",
  },
];

// ─── Team ──────────────────────────────────────────────────────────────────────
export const TEAM_MEMBERS = [
  {
    name: "Ujjwala Wadekar",
    role: "Founder & ZP School Teacher",
    bio: "31 years of government school teaching in Jalgaon. The founder of the Beyond Syllabus methodology and the driving force behind Shiksha Raj, Ujjwal Bharat Mission. She built this organisation from a single classroom conviction: that every child deserves to experience learning, not just memorise it.",
    initials: "UW",
    color: "bg-indigo-600"
  },
  {
    name: "Sanjay Patil",
    role: "Programme Director",
    bio: "Education professional with 15 years of experience in government school reform across Maharashtra. Leads the Teacher Reformers Network and all field operations in Jalgaon, Dhule, and Nandurbar.",
    initials: "SP",
    color: "bg-amber-600"
  },
  {
    name: "Meera Desai",
    role: "Curriculum & Training Head",
    bio: "M.Ed from TISS Mumbai. Designed the Beyond Syllabus curriculum for 120+ schools, trained 340 teachers, and built the hands-on learning kit library from scratch.",
    initials: "MD",
    color: "bg-emerald-600"
  },
  {
    name: "Rahul Joshi",
    role: "Finance & Compliance",
    bio: "Chartered Accountant with deep NGO compliance experience. Manages all 80G/FCRA filings and ensures complete financial transparency for every programme.",
    initials: "RJ",
    color: "bg-stone-600"
  },
];

// ─── Milestones ────────────────────────────────────────────────────────────────
export const MILESTONES = [
  { year: "2015", title: "Foundation Founded", desc: "Started with 1 classroom experiment in a ZP school in Jalgaon, 42 children, and one teacher's conviction" },
  { year: "2017", title: "80G Certification", desc: "Received Income Tax 80G approval — all donations now fully tax-deductible" },
  { year: "2019", title: "Teacher Network Launch", desc: "Teacher Reformers Network launched — 40 teachers in first cohort across Jalgaon district" },
  { year: "2021", title: "10,000 Children Milestone", desc: "Crossed 10,000 children impacted through Beyond Syllabus programmes" },
  { year: "2023", title: "National Recognition", desc: "Received National Award for Excellence in Social Work — Ministry of Social Justice" },
  { year: "2025", title: "340 Teachers Strong", desc: "Teacher Reformers Network reaches 340 active teachers across 6 districts of North Maharashtra" },
];

// ─── Preset amounts ────────────────────────────────────────────────────────────
export const PRESET_AMOUNTS = [
  { amount: 150,   label: "₹150",    impact: "Stationery that keeps one child learning" },
  { amount: 500,   label: "₹500",    impact: "Reading materials for one child's growth" },
  { amount: 1000,  label: "₹1,000",  impact: "A child's practical learning kit set" },
  { amount: 5000,  label: "₹5,000",  impact: "A small group's Beyond Syllabus experience" },
  { amount: 10000, label: "₹10,000", impact: "Meaningful learning support for an entire class" },
  { amount: 25000, label: "₹25,000", impact: "Help transform a school's learning environment" },
];

// ─── Live ticker donations ─────────────────────────────────────────────────────
export const LIVE_TICKER_DONATIONS = [
  { name: "Priya S.", location: "Mumbai", amount: "₹1,000", cause: "Beyond Syllabus", time: "2 min ago" },
  { name: "Rahul M.", location: "Delhi", amount: "₹5,000", cause: "Teacher Network", time: "5 min ago" },
  { name: "Anita K.", location: "Pune", amount: "₹500", cause: "Education Access", time: "8 min ago" },
  { name: "Suresh P.", location: "New Jersey (NRI)", amount: "$100", cause: "Adopt A School", time: "12 min ago" },
  { name: "Deepa R.", location: "Bangalore", amount: "₹2,000", cause: "Teacher Network", time: "15 min ago" },
  { name: "Vikram L.", location: "Pune", amount: "₹10,000", cause: "Beyond Syllabus", time: "18 min ago" },
  { name: "Sneha T.", location: "Hyderabad", amount: "₹750", cause: "Community Outreach", time: "22 min ago" },
  { name: "Arun N.", location: "London (NRI)", amount: "£50", cause: "Beyond Syllabus", time: "25 min ago" },
];
