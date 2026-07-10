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

type SectionMap = Record<string, SectionData>;

const DEFAULT_SECTION: SectionData = { content: {}, items: [], enabled: true, loading: false };
const CMS_CACHE_TTL_MS = 5 * 60 * 1000;
const cmsPageCache = new Map<string, { expiresAt: number; sections: SectionMap }>();
const cmsInFlight = new Map<string, Promise<SectionMap>>();

function cacheKey(pageSlug: string) {
  return `${APP_ENV}:${pageSlug}`;
}

function getFreshCachedSections(pageSlug: string): SectionMap | null {
  const cached = cmsPageCache.get(cacheKey(pageSlug));
  if (!cached || cached.expiresAt <= Date.now()) return null;
  return cached.sections;
}

async function fetchCmsSections(pageSlug: string): Promise<SectionMap> {
  const { data: page } = await supabase
    .from("cms_pages")
    .select("id")
    .eq("slug", pageSlug)
    .single();

  if (!page) return {};

  const { data: rawSections } = await supabase
    .from("cms_sections")
    .select("*")
    .eq("page_id", page.id)
    .eq("environment", APP_ENV)
    .order("display_order");

  if (!rawSections?.length) return {};

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

  const result: SectionMap = {};
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

  return result;
}

export function useCmsPage(pageSlug: string): UseCmsPageReturn {
  const initialSections = getFreshCachedSections(pageSlug);
  const [sections, setSections] = useState<SectionMap>(initialSections ?? {});
  const [loading, setLoading] = useState(!initialSections);

  const load = useCallback(async (force = false) => {
    const key = cacheKey(pageSlug);
    if (!force) {
      const cached = getFreshCachedSections(pageSlug);
      if (cached) {
        setSections(cached);
        setLoading(false);
        return;
      }
    }

    if (!cmsInFlight.has(key)) setLoading(true);
    try {
      let request = force ? undefined : cmsInFlight.get(key);
      if (!request) {
        request = fetchCmsSections(pageSlug).then((result) => {
          cmsPageCache.set(key, { sections: result, expiresAt: Date.now() + CMS_CACHE_TTL_MS });
          return result;
        }).finally(() => {
          if (cmsInFlight.get(key) === request) cmsInFlight.delete(key);
        });
        cmsInFlight.set(key, request);
      }

      setSections(await request);
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

  return { getSection, loading, refresh: () => { void load(true); } };
}
