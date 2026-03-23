// ─── Brand ────────────────────────────────────────────────────────────────────
export const FOUNDATION_NAME    = "Shiksha Raj, Ujjwal Bharat Mission";
export const FOUNDATION_SHORT   = "Shiksha Raj";
export const FOUNDATION_TRUST   = "Ujjwal Bharat Mission";
export const FOUNDATION_TAGLINE = "Teacher-Led Education Reform, Rooted in Jalgaon";
export const FOUNDATION_EMAIL   = "contact@shiksharaj.org";
export const FOUNDATION_PHONE   = "+91 94220 43210";
export const FOUNDATION_ADDRESS = "Near Nehru Chowk, Jalgaon, Maharashtra – 425001";
export const FOUNDER_NAME       = "Ujjwala Wadekar";
export const FOUNDER_TITLE      = "Founder · ZP School Teacher · 31 Years of Dedicated Service";

// Razorpay
export const RAZORPAY_KEY_ID = "rzp_test_1DP5mmOlF5G5ag";

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

// ─── Programs / Causes (Education-only) ───────────────────────────────────────
export const CAUSES = [
  {
    id: "edu-001",
    title: "Beyond Syllabus Learning Programs",
    category: "Education",
    description: "Taking learning beyond textbooks — field visits, practical experiments, and real-world exposure for children in government schools of Jalgaon.",
    longDescription: `Most government school children in Khandesh only experience rote-learning from outdated textbooks. Beyond Syllabus changes that. We take children to farms, factories, courts, hospitals, and nature reserves — turning the real world into a classroom.\n\nEvery ₹500 sponsors one child's Beyond Syllabus experience for a month — including travel, materials, and guided learning activities led by trained teacher facilitators.`,
    image: "https://images.unsplash.com/photo-1599376672737-bd66af54c8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 5000000,
    raised: 3200000,
    donors: 4821,
    impact: "₹500 = 1 child's Beyond Syllabus experience for a month",
    impactItems: ["12,400 children enrolled", "120 schools covered", "340 trained teachers", "95% engagement rate"],
    tag: "80G Eligible",
    urgent: true,
    updates: [
      { date: "2026-02-15", title: "Farm Visit in Raver Taluka", desc: "280 children experienced their first farm-to-table learning visit in Raver, Jalgaon." },
      { date: "2026-01-10", title: "Science Fair in Bhusawal", desc: "50 student projects showcased at the district-level Beyond Syllabus science fair." },
    ]
  },
  {
    id: "edu-002",
    title: "Teacher Reformers Network",
    category: "Education",
    description: "Upskilling and connecting government school teachers across Jalgaon and North Maharashtra to share methods, resources, and practical teaching innovations.",
    longDescription: `A single inspired teacher can change the trajectory of hundreds of students. Our Teacher Reformers Network connects 340+ government school teachers for monthly workshops, peer learning circles, and access to a shared resource repository.\n\nWe train teachers in the Beyond Syllabus methodology, support them with teaching aids, and give them a peer community that reduces isolation and burnout.`,
    image: "https://images.unsplash.com/photo-1708593343442-7595427ddf7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 3000000,
    raised: 2100000,
    donors: 3240,
    impact: "₹1,000 = 1 teacher's workshop + resource kit for a month",
    impactItems: ["340+ teachers connected", "Monthly workshops", "Shared resource library", "6 districts covered"],
    tag: "80G Eligible",
    urgent: false,
    updates: [
      { date: "2026-02-20", title: "Teacher Summit in Jalgaon", desc: "200 teachers from Khandesh gathered for a 2-day teacher reform summit." },
    ]
  },
  {
    id: "edu-003",
    title: "Adopt A School",
    category: "Education",
    description: "Partnering with corporates, communities, and individuals to fully support a government school — infrastructure, teaching aids, libraries, and teacher mentoring.",
    longDescription: `Many government schools in Jalgaon's tribal talukas lack basic infrastructure — functioning blackboards, clean toilets, drinking water, and teaching materials.\n\nAdopt A School pairs each school with a sponsor for a minimum of one academic year. Sponsors fund infrastructure improvements, library books, lab kits, and a teacher mentor visit every quarter. Full transparency reports are shared with sponsors each term.`,
    image: "https://images.unsplash.com/photo-1763637675793-da207ba1fe18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 2500000,
    raised: 980000,
    donors: 1230,
    impact: "₹25,000 = 1 school adopted for a full academic year",
    impactItems: ["28 schools adopted", "Jalgaon & Dhule", "Infrastructure + teaching", "Quarterly reports"],
    tag: "80G Eligible",
    urgent: true,
    updates: [
      { date: "2026-01-28", title: "New School Adopted in Yawal", desc: "School adopted in Yawal taluka — 320 students will benefit from library + lab upgrades." },
    ]
  },
  {
    id: "edu-004",
    title: "Hands-On Learning Experiences",
    category: "Education",
    description: "Equipping classrooms with learning kits, science lab materials, and hands-on activity modules aligned with the Beyond Syllabus philosophy.",
    longDescription: `Learning becomes real when children can touch, build, and discover. We design and distribute Hands-On Learning Kits for classrooms — covering science, maths, language, and life skills — all made from locally available materials.\n\nEach kit includes a teacher guide, activity cards, and student worksheets. The kits are reusable, affordable, and designed specifically for the curriculum levels of government schools in Maharashtra.`,
    image: "https://images.unsplash.com/photo-1692269725827-699e04a11cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 1500000,
    raised: 890000,
    donors: 2105,
    impact: "₹300 = 1 hands-on learning kit for a classroom",
    impactItems: ["2,800+ kits distributed", "60 subjects covered", "All government school levels", "Reusable design"],
    tag: "80G Eligible",
    urgent: false,
    updates: []
  },
  {
    id: "edu-005",
    title: "Education Access Support",
    category: "Education",
    description: "Removing barriers to schooling for the most marginalized children — uniforms, stationery, cycles, and re-enrollment support for school dropouts.",
    longDescription: `In Jalgaon's tribal and economically weaker communities, children drop out not from lack of desire but due to practical barriers — no shoes, no notebooks, or needing to work to support the family.\n\nOur Education Access Support program identifies at-risk children through our teacher network, and provides targeted support: uniforms, stationery kits, bicycles for girls traveling long distances, and re-enrollment mentoring. Every rupee is tracked to a specific child.`,
    image: "https://images.unsplash.com/photo-1735966329265-6b57ed8dd2ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 1000000,
    raised: 420000,
    donors: 890,
    impact: "₹150 = 1 child's stationery and uniform for a term",
    impactItems: ["3,200 children supported", "Dropout reduction", "Girls' mobility", "All tracked individually"],
    tag: "80G Eligible",
    urgent: false,
    updates: []
  },
  {
    id: "edu-006",
    title: "Community & Parent Outreach",
    category: "Education",
    description: "Engaging parents, village leaders, and communities in the education journey — because a child's learning doesn't stop at the school gate.",
    longDescription: `Education reform fails without community buy-in. Our Community & Parent Outreach program runs monthly parent meetings in villages, training sessions for parents on how to support learning at home, and community-school linkage workshops.\n\nWe also engage local gram panchayats and village leaders as education champions — creating a community-wide culture of learning that sustains itself beyond our direct intervention.`,
    image: "https://images.unsplash.com/photo-1528082414335-adbd64f18d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    goal: 800000,
    raised: 340000,
    donors: 620,
    impact: "₹200 = 1 community workshop for 20 parents",
    impactItems: ["180 villages engaged", "5,200 parents trained", "Gram Panchayat partnerships", "Monthly sessions"],
    tag: "80G Eligible",
    urgent: false,
    updates: []
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
  { amount: 150,   label: "₹150",   impact: "1 child's stationery for a term" },
  { amount: 500,   label: "₹500",   impact: "1 child's Beyond Syllabus experience" },
  { amount: 1000,  label: "₹1,000", impact: "1 teacher's workshop & resource kit" },
  { amount: 2500,  label: "₹2,500", impact: "1 classroom learning kit" },
  { amount: 5000,  label: "₹5,000", impact: "1 school's library expansion" },
  { amount: 25000, label: "₹25,000", impact: "Adopt 1 school for a full year" },
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
