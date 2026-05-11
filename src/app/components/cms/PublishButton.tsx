import { useState } from "react";
import { Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

type State = "idle" | "confirming" | "publishing" | "done" | "error";

export function PublishButton() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function publish() {
    setState("publishing");
    setError("");
    try {
      // 1. Fetch all staging sections with their page info
      const { data: stagingSections, error: secErr } = await supabase
        .from("cms_sections")
        .select("*")
        .eq("environment", "staging");
      if (secErr) throw new Error(secErr.message);
      if (!stagingSections?.length) throw new Error("No staging content found to publish.");

      // 2. Upsert each as a production row (same page_id, same component_name)
      const productionSections = stagingSections.map(({ id: _id, environment: _env, created_at: _ca, updated_at: _ua, ...rest }) => ({
        ...rest,
        environment: "production",
        updated_at: new Date().toISOString(),
      }));

      const { data: upserted, error: upsertErr } = await supabase
        .from("cms_sections")
        .upsert(productionSections, { onConflict: "page_id,component_name,environment" })
        .select("id,component_name");
      if (upsertErr) throw new Error(upsertErr.message);

      // 3. For each section that has carousel items in staging, copy to production
      const { data: stagingItems, error: itemsErr } = await supabase
        .from("cms_carousel_items")
        .select("*")
        .eq("environment", "staging");
      if (itemsErr) throw new Error(itemsErr.message);

      if (stagingItems?.length) {
        // Build a map: staging section id → production section id
        // by matching component_name across the upserted production sections
        const { data: prodSections } = await supabase
          .from("cms_sections")
          .select("id,page_id,component_name")
          .eq("environment", "production");

        const stagingIdToProdId: Record<string, string> = {};
        for (const stagingSec of stagingSections) {
          const match = prodSections?.find(
            (p) => p.page_id === stagingSec.page_id && p.component_name === stagingSec.component_name
          );
          if (match) stagingIdToProdId[stagingSec.id] = match.id;
        }

        // Delete all existing production carousel items for sections we're about to overwrite
        const prodSectionIds = Object.values(stagingIdToProdId);
        if (prodSectionIds.length) {
          await supabase
            .from("cms_carousel_items")
            .delete()
            .eq("environment", "production")
            .in("section_id", prodSectionIds);
        }

        // Reinsert mapped to production section ids
        const newItems = stagingItems
          .filter((item) => stagingIdToProdId[item.section_id])
          .map(({ id: _id, environment: _env, created_at: _ca, section_id, ...rest }) => ({
            ...rest,
            section_id: stagingIdToProdId[section_id],
            environment: "production",
          }));

        if (newItems.length) {
          const { error: insertErr } = await supabase.from("cms_carousel_items").insert(newItems);
          if (insertErr) throw new Error(insertErr.message);
        }
      }

      setState("done");
      setTimeout(() => setState("idle"), 4000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Publish failed");
      setState("error");
      setTimeout(() => setState("idle"), 5000);
    }
  }

  if (state === "confirming") {
    return (
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
        <span className="text-xs text-amber-800 font-medium">Overwrite production content?</span>
        <button
          onClick={publish}
          className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs rounded-lg font-semibold transition-colors"
        >
          Yes, publish
        </button>
        <button
          onClick={() => setState("idle")}
          className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (state === "publishing") {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
        <Loader2 size={14} className="animate-spin text-indigo-600" />
        <span className="text-xs text-slate-600 font-medium">Publishing to production…</span>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
        <CheckCircle2 size={14} className="text-green-600" />
        <span className="text-xs text-green-700 font-semibold">Published to production</span>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl">
        <AlertCircle size={14} className="text-red-500" />
        <span className="text-xs text-red-600 font-medium">{error}</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => setState("confirming")}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
    >
      <Upload size={13} />
      Publish to Production
    </button>
  );
}
