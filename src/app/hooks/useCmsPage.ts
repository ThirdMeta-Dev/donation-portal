import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { SECTION_SCHEMAS } from "../../lib/cms-schemas";
import { APP_ENV } from "../../lib/cms-env";
import type { CmsSection, CmsCarouselItem } from "../../lib/cms-types";

interface SectionData {
  content: Record<string, unknown>;
  items: Record<string, unknown>[];
  enabled: boolean;
  loading: boolean;
}

interface UseCmsPageReturn {
  getSection: (componentName: string) => SectionData;
  loading: boolean;
  refresh: () => void;
}

const DEFAULT_SECTION: SectionData = { content: {}, items: [], enabled: true, loading: false };

export function useCmsPage(pageSlug: string): UseCmsPageReturn {
  const [sections, setSections] = useState<Record<string, SectionData>>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data: page } = await supabase
        .from("cms_pages")
        .select("id")
        .eq("slug", pageSlug)
        .single();

      if (!page) {
        setLoading(false);
        return;
      }

      const { data: rawSections } = await supabase
        .from("cms_sections")
        .select("*")
        .eq("page_id", page.id)
        .eq("environment", APP_ENV)
        .order("display_order");

      if (!rawSections?.length) {
        setLoading(false);
        return;
      }

      const sectionIds = rawSections.map((s: CmsSection) => s.id);

      const { data: allItems } = await supabase
        .from("cms_carousel_items")
        .select("*")
        .in("section_id", sectionIds)
        .eq("environment", APP_ENV)
        .order("item_order");

      const itemsBySectionId: Record<string, Record<string, unknown>[]> = {};
      (allItems ?? []).forEach((item: CmsCarouselItem) => {
        if (!itemsBySectionId[item.section_id]) itemsBySectionId[item.section_id] = [];
        itemsBySectionId[item.section_id].push(item.content);
      });

      const result: Record<string, SectionData> = {};
      rawSections.forEach((sec: CmsSection) => {
        const schema = SECTION_SCHEMAS[sec.component_name];
        const dbItems = itemsBySectionId[sec.id] ?? [];
        const items = dbItems.length > 0 ? dbItems : (schema?.defaultItems ?? []);
        result[sec.component_name] = {
          content: { ...(schema?.defaultContent ?? {}), ...sec.content },
          items,
          enabled: sec.enabled,
          loading: false,
        };
      });

      setSections(result);
    } finally {
      setLoading(false);
    }
  }, [pageSlug]);

  useEffect(() => { load(); }, [load]);

  const getSection = useCallback(
    (componentName: string): SectionData => {
      if (sections[componentName]) return sections[componentName];
      const schema = SECTION_SCHEMAS[componentName];
      return {
        content: schema?.defaultContent ?? {},
        items: schema?.defaultItems ?? [],
        enabled: true,
        loading,
      };
    },
    [sections, loading]
  );

  return { getSection, loading, refresh: load };
}
