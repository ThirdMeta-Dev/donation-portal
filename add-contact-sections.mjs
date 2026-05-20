/**
 * Safe one-time migration: adds ContactHeroSection + ContactCTASection
 * to the contact page in both staging and production.
 * Also patches mapsEmbed on ContactInfoSection.
 * Uses INSERT ON CONFLICT DO NOTHING — never deletes or overwrites existing content.
 *
 * Run: node add-contact-sections.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vfvhqzvqmpqfcwemusnx.supabase.co";
const SERVICE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmdmhxenZxbXBxZmN3ZW11c254Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjY5NjA1OCwiZXhwIjoyMDg4MjcyMDU4fQ.sRh_NXY54IRk4_gpgnctGt2Mc1PO2jF0UD7o1MS0RYc";

const db = createClient(SUPABASE_URL, SERVICE_KEY);

const MAPS_EMBED = "https://maps.google.com/maps?q=89%2F412+Neharu+Nagar+Mohadi+Road+Near+Prasad+Appt+Jalgaon+Maharashtra+425001&output=embed&z=15";

const NEW_SECTIONS = [
  {
    component_name: "ContactHeroSection",
    display_name: "Contact Form Hero",
    content: {
      badge: "Teacher-Led · Education-Only · Transparent",
      heading1: "One Teacher Started This.",
      heading2: "Many Can Keep It Going.",
      bullet1: "Progress is visible & published",
      bullet2: "Use of funds reported quarterly",
      bullet3: "80G eligible · FCRA registered",
      submitText: "Join Ujjwala's Mission",
    },
    isCarousel: false,
  },
  {
    component_name: "ContactCTASection",
    display_name: "Contact CTA Box",
    content: {
      badge: "Teacher-Led · Education-Only · Transparent",
      heading1: "One Teacher Started This.",
      heading2: "Many Can Keep It Going.",
      bullet1: "Progress is visible & published",
      bullet2: "Use of funds reported quarterly",
      bullet3: "80G eligible · FCRA registered",
      link1Text: "Partner With Us",
      link2Text: "Join Teacher Network",
      link3Text: "Donate Now",
      link3Url: "page:/donate",
    },
    isCarousel: false,
  },
];

async function run() {
  console.log("\nAdding Contact CMS sections to staging + production...\n");

  const { data: pages } = await db.from("cms_pages").select("id, slug");
  const pageMap = Object.fromEntries(pages.map((p) => [p.slug, p.id]));
  const contactId = pageMap["contact"];
  if (!contactId) throw new Error("contact page not found in cms_pages");

  for (const env of ["staging", "production"]) {
    console.log(`\n── ${env} ──`);

    // Get current max display_order for contact page in this env
    const { data: existing } = await db
      .from("cms_sections")
      .select("display_order")
      .eq("page_id", contactId)
      .eq("environment", env)
      .order("display_order", { ascending: false })
      .limit(1);
    let order = (existing?.[0]?.display_order ?? 0) + 1;

    for (const sec of NEW_SECTIONS) {
      process.stdout.write(`  → ${sec.display_name} [${env}]... `);
      const { error } = await db.from("cms_sections").insert({
        page_id: contactId,
        component_name: sec.component_name,
        display_name: sec.display_name,
        display_order: order++,
        enabled: true,
        content: sec.content,
        environment: env,
      });

      if (error) {
        if (error.code === "23505") {
          console.log("already exists — skipped");
        } else {
          console.log("ERROR:", error.message);
        }
      } else {
        console.log("INSERTED");
      }
    }

    // Patch mapsEmbed on ContactInfoSection — only if currently empty
    process.stdout.write(`  → Patching mapsEmbed on ContactInfoSection [${env}]... `);
    const { data: infoRow } = await db
      .from("cms_sections")
      .select("id, content")
      .eq("page_id", contactId)
      .eq("component_name", "ContactInfoSection")
      .eq("environment", env)
      .single();

    if (!infoRow) {
      console.log("ContactInfoSection not found — skipped");
    } else if (infoRow.content?.mapsEmbed) {
      console.log("already has embed URL — skipped");
    } else {
      const { error } = await db
        .from("cms_sections")
        .update({ content: { ...infoRow.content, mapsEmbed: MAPS_EMBED } })
        .eq("id", infoRow.id);
      console.log(error ? `ERROR: ${error.message}` : "PATCHED");
    }
  }

  console.log("\n✓ Done.\n");
}

run().catch((e) => { console.error(e); process.exit(1); });
