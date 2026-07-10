/**
 * Safe one-time migration: adds the 6 new CMS sections + RecognitionsSection
 * carousel items to staging. Uses INSERT ON CONFLICT DO NOTHING so existing
 * staging content is never touched.
 *
 * Run: node add-new-cms-sections.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

function loadLocalEnv(path = ".env.local") {
  try {
    const text = readFileSync(path, "utf8");
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      const value = line.slice(eq + 1).trim().replace(/^(['"])(.*)\1$/, "$2");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // Environment variables may already be provided by the shell/CI.
  }
}

loadLocalEnv();

const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_PROJECT_ID || !SERVICE_KEY) {
  throw new Error("Missing SUPABASE_PROJECT_ID or SUPABASE_SERVICE_ROLE_KEY in .env.local");
}
const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const ENV = "staging";

const db = createClient(SUPABASE_URL, SERVICE_KEY);

// ── New sections to add ────────────────────────────────────────────────────

const HOME_NEW = [
  {
    component_name: "WhatProgressSection",
    display_name: "What Real Progress Feels Like",
    defaultContent: { badge: "Real change!", title: "What Real Progress Feels Like" },
    isCarousel: true,
    defaultItems: [
      { type: "content", tag: "They stop feeling small inside.", title: "Children Return With Confidence Again", desc: "Meaningful learning helps children speak, try, ask, and see themselves with pride.", bullet1: "Stronger classroom participation", bullet2: "Steadier school attendance", bullet3: "More confident speaking", thumbnail: "" },
      { type: "content", tag: "Lessons finally meet real life.", title: "Learning Starts Making Sense In Life", desc: "Children begin connecting words, numbers, and ideas with the world they actually live in.", bullet1: "Real-world understanding grows", bullet2: "Projects show deeper learning", bullet3: "Concepts connect with daily life", thumbnail: "" },
      { type: "content", tag: "Classrooms feel human and alive.", title: "Teaching Begins To Feel Alive", desc: "Teaching moves beyond rote delivery and becomes practical, engaging, responsive, and full of meaning.", bullet1: "More active classrooms", bullet2: "Practical methods replace routine", bullet3: "Teachers lead with confidence", thumbnail: "" },
      { type: "content", tag: "Home stops pulling learning apart.", title: "Families Start Believing In School Again", desc: "Parents feel included, trusted, and better able to support children without fear or pressure.", bullet1: "Stronger parent-school trust", bullet2: "More regular school attendance", bullet3: "Less pressure at home", thumbnail: "" },
      { type: "content", tag: "Children want to come back.", title: "Schools Become Places Of Pride", desc: "Schools feel more alive, respected, and worth returning to for children and families.", bullet1: "Improved attendance and retention", bullet2: "More joyful school spaces", bullet3: "Stronger school-community bond", thumbnail: "" },
      { type: "content", tag: "One classroom begins changing many.", title: "One Teacher's Work Starts Travelling", desc: "What worked for one teacher begins reaching more classrooms, schools, communities, and children.", bullet1: "Teacher models travel further", bullet2: "Programmes reach new places", bullet3: "Communities carry the mission", thumbnail: "" },
    ],
  },
  {
    component_name: "FeelTeacherSection",
    display_name: "Feel Like A Young Teacher",
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
    isCarousel: false,
  },
  {
    component_name: "OurChannelsSection",
    display_name: "See The Work / Social Channels",
    defaultContent: {
      badge: "In my words",
      title: "See The Work, Feel The Journey",
      subtitle: "The full stories, lessons, and lived moments continue across every channel I share.",
      youtubeUrl: "https://www.youtube.com/channel/UCJOILwGRJVFODGp6uQGDF1w",
      instagramUrl: "https://www.instagram.com/zp_teacher_ujjwala_wadekar/",
      whatsappUrl: "https://wa.me/919370318308",
      linkedinUrl: "https://www.linkedin.com/in/ujjwala-wadekar-317094247/",
    },
    isCarousel: true,
    defaultItems: [
      { image: "", alt: "Work image 1", link: "" },
      { image: "", alt: "Work image 2", link: "" },
      { image: "", alt: "Work image 3", link: "" },
      { image: "", alt: "Work image 4", link: "" },
    ],
  },
  {
    component_name: "FaqSection",
    display_name: "FAQ",
    defaultContent: { badge: "Questions", title: "Frequently Asked Questions" },
    isCarousel: true,
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
];

const BRAND_NEW = [
  {
    component_name: "NavigationSection",
    display_name: "Header Navigation",
    defaultContent: { logoText: "Ujjwal Bharat", logoImage: "", ctaText: "Contribute Now", ctaLink: "page:/donate" },
    isCarousel: true,
    defaultItems: [
      { label: "About", link: "page:/about" },
      { label: "Programs", link: "anchor:programs" },
      { label: "Donate", link: "page:/donate" },
      { label: "Contact", link: "page:/contact" },
    ],
  },
  {
    component_name: "FooterSection",
    display_name: "Footer",
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
    },
    isCarousel: false,
  },
];

// RecognitionsSection already exists — just need to add its carousel items
const RECOGNITION_ITEMS = [
  { image: "", alt: "National Award 2023" },
  { image: "", alt: "Forbes 30 Under 30" },
  { image: "", alt: "TISS Fellow" },
];

async function insertSection(pageId, section, displayOrder) {
  const { data, error } = await db
    .from("cms_sections")
    .insert({
      page_id: pageId,
      component_name: section.component_name,
      display_name: section.display_name,
      display_order: displayOrder,
      enabled: true,
      content: section.defaultContent,
      environment: ENV,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      // Already exists — fetch the id
      const { data: existing } = await db
        .from("cms_sections")
        .select("id")
        .eq("page_id", pageId)
        .eq("component_name", section.component_name)
        .eq("environment", ENV)
        .single();
      return { id: existing?.id, created: false };
    }
    throw error;
  }
  return { id: data.id, created: true };
}

async function insertCarouselItems(sectionId, items, created) {
  if (!created) {
    // Check if items already exist — if so, skip
    const { data: existing } = await db
      .from("cms_carousel_items")
      .select("id")
      .eq("section_id", sectionId)
      .eq("environment", ENV)
      .limit(1);
    if (existing?.length > 0) {
      console.log(`  ↳ carousel items already exist — skipping`);
      return;
    }
  }
  const rows = items.map((item, idx) => ({
    section_id: sectionId,
    item_order: idx,
    content: item,
    environment: ENV,
  }));
  const { error } = await db.from("cms_carousel_items").insert(rows);
  if (error) throw error;
  console.log(`  ↳ inserted ${rows.length} carousel items`);
}

async function run() {
  console.log(`\nAdding new CMS sections to ${ENV}...\n`);

  // Get page IDs
  const { data: pages } = await db.from("cms_pages").select("id, slug");
  const pageMap = Object.fromEntries(pages.map((p) => [p.slug, p.id]));

  const homeId  = pageMap["home"];
  const brandId = pageMap["brand"];

  if (!homeId)  throw new Error("home page not found in cms_pages");
  if (!brandId) throw new Error("brand page not found in cms_pages");

  // Get current max display_order for home
  const { data: existingHome } = await db
    .from("cms_sections")
    .select("display_order")
    .eq("page_id", homeId)
    .eq("environment", ENV)
    .order("display_order", { ascending: false })
    .limit(1);
  let homeOrder = (existingHome?.[0]?.display_order ?? 15) + 1;

  // Insert home new sections
  for (const sec of HOME_NEW) {
    process.stdout.write(`→ ${sec.display_name}... `);
    const { id, created } = await insertSection(homeId, sec, homeOrder++);
    console.log(created ? "INSERTED" : "already exists");
    if (sec.isCarousel && sec.defaultItems && id) {
      await insertCarouselItems(id, sec.defaultItems, created);
    }
  }

  // Insert brand new sections
  const { data: existingBrand } = await db
    .from("cms_sections")
    .select("display_order")
    .eq("page_id", brandId)
    .eq("environment", ENV)
    .order("display_order", { ascending: false })
    .limit(1);
  let brandOrder = (existingBrand?.[0]?.display_order ?? 0) + 1;

  for (const sec of BRAND_NEW) {
    process.stdout.write(`→ ${sec.display_name}... `);
    const { id, created } = await insertSection(brandId, sec, brandOrder++);
    console.log(created ? "INSERTED" : "already exists");
    if (sec.isCarousel && sec.defaultItems && id) {
      await insertCarouselItems(id, sec.defaultItems, created);
    }
  }

  // Add RecognitionsSection carousel items (section already exists)
  console.log(`→ RecognitionsSection award images...`);
  const { data: recSec } = await db
    .from("cms_sections")
    .select("id")
    .eq("page_id", homeId)
    .eq("component_name", "RecognitionsSection")
    .eq("environment", ENV)
    .single();

  if (recSec) {
    await insertCarouselItems(recSec.id, RECOGNITION_ITEMS, false);
  } else {
    console.log("  RecognitionsSection not found — skipping");
  }

  console.log("\n✓ Done. Refresh the admin panel to see new sections.\n");
}

run().catch((e) => { console.error("Error:", e.message); process.exit(1); });
