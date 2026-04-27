import { useState, useCallback } from "react";
import { Loader2, Save, CheckCircle2, AlertCircle, Image as ImageIcon, Layout } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { APP_ENV } from "../../../lib/cms-env";
import { SECTION_SCHEMAS } from "../../../lib/cms-schemas";
import type { CmsSection } from "../../../lib/cms-types";
import { SectionTree } from "./SectionTree";
import { FieldEditor } from "./FieldEditor";
import { CarouselEditor } from "./CarouselEditor";
import { MediaLibrary } from "./MediaLibrary";
import { SeedButton } from "./SeedButton";

type PanelTab = "sections" | "media";
type SaveState = "idle" | "saving" | "saved" | "error";

export function CmsPanel() {
  const [tab, setTab] = useState<PanelTab>("sections");
  const [selected, setSelected] = useState<CmsSection | null>(null);
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");

  const handleSelect = useCallback(async (sec: CmsSection) => {
    setSelected(sec);
    setSaveState("idle");

    const schema = SECTION_SCHEMAS[sec.component_name];
    setContent({ ...(schema?.defaultContent ?? {}), ...sec.content });

    if (schema?.isCarousel) {
      const { data } = await supabase
        .from("cms_carousel_items")
        .select("*")
        .eq("section_id", sec.id)
        .eq("environment", APP_ENV)
        .order("item_order");

      setItems(data?.length ? data.map((r) => r.content) : (schema.defaultItems ?? []));
    } else {
      setItems([]);
    }
  }, []);

  const handleSave = useCallback(async () => {
    if (!selected) return;
    setSaveState("saving");
    setSaveError("");

    try {
      const { error: secErr } = await supabase
        .from("cms_sections")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", selected.id);

      if (secErr) throw new Error(secErr.message);

      const schema = SECTION_SCHEMAS[selected.component_name];
      if (schema?.isCarousel) {
        await supabase
          .from("cms_carousel_items")
          .delete()
          .eq("section_id", selected.id)
          .eq("environment", APP_ENV);

        if (items.length > 0) {
          await supabase.from("cms_carousel_items").insert(
            items.map((item, idx) => ({
              section_id: selected.id,
              item_order: idx,
              content: item,
              environment: APP_ENV,
            }))
          );
        }
      }

      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed");
      setSaveState("error");
    }
  }, [selected, content, items]);

  const schema = selected ? SECTION_SCHEMAS[selected.component_name] : null;
  const hasChanges = selected !== null;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {(["sections", "media"] as PanelTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  tab === t ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t === "sections" ? <Layout size={13} /> : <ImageIcon size={13} />}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wider ${
              APP_ENV === "staging"
                ? "bg-amber-100 text-amber-700 border border-amber-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {APP_ENV.toUpperCase()}
          </span>
        </div>

        <SeedButton />
      </div>

      {tab === "media" ? (
        <MediaLibrary />
      ) : (
        <div className="grid grid-cols-[240px_1fr] gap-4 min-h-[600px]">
          {/* Left: Section Tree */}
          <div className="border border-slate-200 rounded-2xl bg-white p-3 overflow-y-auto max-h-[700px]">
            <SectionTree selectedId={selected?.id ?? null} onSelect={handleSelect} />
          </div>

          {/* Right: Field Editor */}
          <div className="border border-slate-200 rounded-2xl bg-white overflow-y-auto max-h-[700px]">
            {!selected ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-400 p-8">
                <Layout size={32} />
                <p className="text-sm">Select a section to edit</p>
              </div>
            ) : (
              <div className="p-5 space-y-5">
                {/* Section header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{selected.display_name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{selected.component_name}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {saveState === "saved" && (
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle2 size={14} /> Saved
                      </span>
                    )}
                    {saveState === "error" && (
                      <span className="flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle size={14} /> {saveError}
                      </span>
                    )}
                    {hasChanges && (
                      <button
                        onClick={handleSave}
                        disabled={saveState === "saving"}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60"
                      >
                        {saveState === "saving" ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Save size={14} />
                        )}
                        {saveState === "saving" ? "Saving…" : "Save Changes"}
                      </button>
                    )}
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Static fields */}
                {schema?.fields && schema.fields.length > 0 && (
                  <FieldEditor
                    fields={schema.fields}
                    values={content}
                    onChange={(key, value) => setContent((prev) => ({ ...prev, [key]: value }))}
                  />
                )}

                {/* Carousel items */}
                {schema?.isCarousel && schema.itemFields && (
                  <>
                    {schema.fields.length > 0 && <hr className="border-slate-100" />}
                    <CarouselEditor
                      label={schema.carouselLabel ?? "Items"}
                      items={items}
                      itemFields={schema.itemFields}
                      onChange={setItems}
                    />
                  </>
                )}

                {/* No fields */}
                {(!schema?.fields?.length && !schema?.isCarousel) && (
                  <p className="text-sm text-slate-400">No editable fields for this section.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
