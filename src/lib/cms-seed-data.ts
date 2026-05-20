import { SECTION_SCHEMAS } from "./cms-schemas";
import type { AppEnvironment } from "./cms-types";
import { supabase } from "../app/lib/supabase";

const PAGES = [
  { slug: "home", name: "Home" },
  { slug: "about", name: "About" },
  { slug: "donate", name: "Donate" },
  { slug: "contact", name: "Contact" },
  { slug: "brand", name: "Brand Settings" },
];

const SECTIONS_BY_PAGE: Record<string, { component_name: string; display_name: string }[]> = {
  home: [
    { component_name: "HeroSection",           display_name: "Hero Banner" },
    { component_name: "ProgramBannerSection",   display_name: "Program Banner" },
    { component_name: "QuotesCarouselSection",  display_name: "Quotes Carousel" },
    { component_name: "S3CarouselSection",      display_name: "Problems Carousel" },
    { component_name: "RecognitionsSection",    display_name: "Seen & Acknowledged" },
    { component_name: "BeyondSyllabusSection",  display_name: "Beyond Syllabus" },
    { component_name: "TestimonialsSection",    display_name: "Testimonials" },
    { component_name: "TextRevealSection",      display_name: "Text Reveal / CTA" },
    { component_name: "IntroNGOSection",        display_name: "Foundation Introduction" },
    { component_name: "ProgramsSection",        display_name: "What The Trust Builds" },
    { component_name: "WhatProgressSection",    display_name: "What Real Progress Feels Like" },
    { component_name: "GetInvolvedSection",     display_name: "Find Your Role" },
    { component_name: "ProcessFlowSection",     display_name: "How Your Support Turns Into Learning" },
    { component_name: "HonestImpactSection",    display_name: "This Mission Touched Lives" },
    { component_name: "SupportCTASection",      display_name: "One Teacher Started This" },
    { component_name: "FeelTeacherSection",     display_name: "Feel Like A Young Teacher" },
    { component_name: "TeamSection",            display_name: "Team" },
    { component_name: "OurChannelsSection",     display_name: "See The Work" },
    { component_name: "FaqSection",             display_name: "Frequently Asked Questions" },
    { component_name: "ClosingSection",         display_name: "Closing CTA" },
  ],
  about: [
    { component_name: "FounderBioSection", display_name: "Founder Bio" },
    { component_name: "MissionVisionSection", display_name: "Mission / Vision / Values" },
    { component_name: "AboutMilestonesSection", display_name: "Milestones Timeline" },
    { component_name: "TeamSection", display_name: "Team" },
    { component_name: "CertificationsSection", display_name: "Certifications" },
  ],
  donate: [
    { component_name: "PresetAmountsSection", display_name: "Preset Donation Amounts" },
    { component_name: "ImpactMessagesSection", display_name: "Impact Messages" },
  ],
  contact: [
    { component_name: "ContactInfoSection", display_name: "Contact Information" },
    { component_name: "ContactGridSection", display_name: "Grid Images" },
  ],
  brand: [
    { component_name: "BrandSettings", display_name: "Brand & Foundation Info" },
    { component_name: "NavigationSection", display_name: "Header Navigation" },
    { component_name: "FooterSection", display_name: "Footer" },
  ],
};

export async function seedDatabase(env: AppEnvironment): Promise<void> {
  for (const page of PAGES) {
    const { data: p, error: pageErr } = await supabase
      .from("cms_pages")
      .upsert({ slug: page.slug, name: page.name }, { onConflict: "slug" })
      .select()
      .single();

    if (pageErr || !p) throw new Error(`Failed to upsert page "${page.slug}": ${pageErr?.message}`);

    const sections = SECTIONS_BY_PAGE[page.slug] ?? [];

    for (let i = 0; i < sections.length; i++) {
      const { component_name, display_name } = sections[i];
      const schema = SECTION_SCHEMAS[component_name];

      const { error: secErr } = await supabase.from("cms_sections").upsert(
        {
          page_id: p.id,
          component_name,
          display_name,
          display_order: i,
          enabled: true,
          content: schema?.defaultContent ?? {},
          environment: env,
        },
        { onConflict: "page_id,component_name,environment" }
      );

      if (secErr) throw new Error(`Failed to upsert section "${component_name}": ${secErr.message}`);

      if (schema?.isCarousel && schema.defaultItems) {
        const { data: sec } = await supabase
          .from("cms_sections")
          .select("id")
          .eq("page_id", p.id)
          .eq("component_name", component_name)
          .eq("environment", env)
          .single();

        if (sec) {
          // Always delete and reinsert so re-seeding refreshes content
          await supabase
            .from("cms_carousel_items")
            .delete()
            .eq("section_id", sec.id)
            .eq("environment", env);

          const items = schema.defaultItems.map((item, idx) => ({
            section_id: sec.id,
            item_order: idx,
            content: item,
            environment: env,
          }));
          await supabase.from("cms_carousel_items").insert(items);
        }
      }
    }
  }
}
