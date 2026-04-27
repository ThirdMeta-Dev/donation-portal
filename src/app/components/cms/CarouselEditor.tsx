import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, ChevronRight } from "lucide-react";
import type { ContentField } from "../../../lib/cms-types";
import { FieldEditor } from "./FieldEditor";

interface Props {
  label: string;
  items: Record<string, unknown>[];
  itemFields: ContentField[];
  onChange: (items: Record<string, unknown>[]) => void;
}

export function CarouselEditor({ label, items, itemFields, onChange }: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(items.length > 0 ? 0 : null);

  function move(from: number, to: number) {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
    setExpandedIdx(to);
  }

  function addItem() {
    const blank: Record<string, unknown> = {};
    itemFields.forEach((f) => { blank[f.key] = ""; });
    onChange([...items, blank]);
    setExpandedIdx(items.length);
  }

  function removeItem(idx: number) {
    if (!confirm("Remove this item?")) return;
    const next = items.filter((_, i) => i !== idx);
    onChange(next);
    setExpandedIdx(null);
  }

  function updateItem(idx: number, key: string, value: unknown) {
    const next = items.map((item, i) =>
      i === idx ? { ...item, [key]: value } : item
    );
    onChange(next);
  }

  if (itemFields.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
        <button
          onClick={addItem}
          className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <Plus size={12} /> Add Item
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-xs text-slate-400 text-center py-4 border-2 border-dashed border-slate-200 rounded-xl">
          No items yet — click Add Item
        </p>
      )}

      {items.map((item, idx) => {
        const isOpen = expandedIdx === idx;
        const preview = String(
          item.title ?? item.label ?? item.name ?? item.quote ?? item.tab ?? item.heading ?? `Item ${idx + 1}`
        ).slice(0, 48);

        return (
          <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
            <div
              className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-slate-50 select-none"
              onClick={() => setExpandedIdx(isOpen ? null : idx)}
            >
              <ChevronRight
                size={14}
                className={`text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
              <span className="flex-1 text-sm text-slate-700 truncate">{preview}</span>
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  disabled={idx === 0}
                  onClick={() => move(idx, idx - 1)}
                  className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                >
                  <ChevronUp size={13} />
                </button>
                <button
                  disabled={idx === items.length - 1}
                  onClick={() => move(idx, idx + 1)}
                  className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                >
                  <ChevronDown size={13} />
                </button>
                <button
                  onClick={() => removeItem(idx)}
                  className="p-1 text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="border-t border-slate-100 px-3 py-3 bg-white">
                <FieldEditor
                  fields={itemFields}
                  values={item}
                  onChange={(key, value) => updateItem(idx, key, value)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
