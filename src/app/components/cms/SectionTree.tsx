import { useEffect, useState } from "react";
import { ChevronRight, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { APP_ENV } from "../../../lib/cms-env";
import type { CmsPage, CmsSection } from "../../../lib/cms-types";

interface Props {
  selectedId: string | null;
  onSelect: (section: CmsSection) => void;
}

export function SectionTree({ selectedId, onSelect }: Props) {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [sections, setSections] = useState<Record<string, CmsSection[]>>({});
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data: pagesData } = await supabase
        .from("cms_pages")
        .select("*")
        .order("name");

      if (!pagesData?.length) { setLoading(false); return; }

      const visible = pagesData.filter((p: CmsPage) => p.slug !== "about");
      setPages(visible);
      // Default: only brand page open
      const brandPage = visible.find((p: CmsPage) => p.slug === "brand");
      setExpanded(new Set(brandPage ? [brandPage.id] : []));

      const { data: sectionsData } = await supabase
        .from("cms_sections")
        .select("*")
        .eq("environment", APP_ENV)
        .order("display_order");

      const grouped: Record<string, CmsSection[]> = {};
      (sectionsData ?? []).forEach((sec: CmsSection) => {
        if (!grouped[sec.page_id]) grouped[sec.page_id] = [];
        grouped[sec.page_id].push(sec);
      });
      setSections(grouped);
      setLoading(false);
    }
    load();
  }, []);

  async function toggleEnabled(e: React.MouseEvent, sec: CmsSection) {
    e.stopPropagation();
    setToggling(sec.id);
    const { error } = await supabase
      .from("cms_sections")
      .update({ enabled: !sec.enabled })
      .eq("id", sec.id);

    if (!error) {
      setSections((prev) => {
        const copy = { ...prev };
        copy[sec.page_id] = (copy[sec.page_id] ?? []).map((s) =>
          s.id === sec.id ? { ...s, enabled: !sec.enabled } : s
        );
        return copy;
      });
    }
    setToggling("");
  }

  function togglePage(pageId: string) {
    setExpanded((prev) =>
      prev.has(pageId) ? new Set() : new Set([pageId])
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={18} className="animate-spin text-slate-400" />
      </div>
    );
  }

  if (!pages.length) {
    return (
      <p className="text-sm text-slate-400 px-2 py-4">
        No pages found. Click <strong>Seed Database</strong> first.
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {pages.map((page) => {
        const pageSections = sections[page.id] ?? [];
        const isOpen = expanded.has(page.id);
        return (
          <div key={page.id}>
            <button
              onClick={() => togglePage(page.id)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
            >
              <ChevronRight
                size={14}
                className={`text-slate-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-90" : ""}`}
              />
              <span className="text-sm font-semibold text-slate-700">{page.name}</span>
              <span className="ml-auto text-xs text-slate-400">{pageSections.length}</span>
            </button>

            {isOpen && pageSections.length > 0 && (
              <div className="ml-3 pl-3 border-l border-slate-200 space-y-0.5">
                {pageSections.map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => onSelect(sec)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      selectedId === sec.id
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <span className="flex-1 text-sm truncate">{sec.display_name}</span>
                    <button
                      onClick={(e) => toggleEnabled(e, sec)}
                      disabled={toggling === sec.id}
                      className={`flex-shrink-0 transition-colors ${
                        sec.enabled ? "text-green-500 hover:text-red-400" : "text-slate-300 hover:text-green-400"
                      }`}
                      title={sec.enabled ? "Disable section" : "Enable section"}
                    >
                      {toggling === sec.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : sec.enabled ? (
                        <ToggleRight size={16} />
                      ) : (
                        <ToggleLeft size={16} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {isOpen && pageSections.length === 0 && (
              <p className="ml-6 pl-3 text-xs text-slate-400 py-1">No sections seeded</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
