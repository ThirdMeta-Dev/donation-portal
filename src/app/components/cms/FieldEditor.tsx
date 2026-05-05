import { useState } from "react";
import { FolderOpen, X } from "lucide-react";
import type { ContentField } from "../../../lib/cms-types";
import { MediaLibrary } from "./MediaLibrary";

interface Props {
  fields: ContentField[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function FieldEditor({ fields, values, onChange }: Props) {
  const [mediaPicker, setMediaPicker] = useState<string | null>(null);

  if (fields.length === 0) return null;

  function val(key: string): string {
    return String(values[key] ?? "");
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="block text-xs font-semibold text-slate-600 mb-1">{field.label}</label>

          {field.type === "textarea" ? (
            <textarea
              rows={3}
              value={val(field.key)}
              placeholder={field.placeholder}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-y"
            />
          ) : field.type === "image" || field.type === "video" ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={val(field.key)}
                  placeholder={field.placeholder ?? "https://..."}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  type="button"
                  onClick={() => setMediaPicker(mediaPicker === field.key ? null : field.key)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 whitespace-nowrap"
                >
                  <FolderOpen size={13} />
                  Library
                </button>
                {val(field.key) && (
                  <button
                    type="button"
                    onClick={() => onChange(field.key, "")}
                    className="p-2 text-slate-400 hover:text-red-400 border border-slate-200 rounded-lg"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {val(field.key) && field.type === "image" && (
                <div className="w-full max-h-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <img
                    src={val(field.key)}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}
              {val(field.key) && field.type === "video" && (
                <div className="w-full rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                  <video src={val(field.key)} controls className="w-full max-h-32 object-contain" />
                </div>
              )}

              {mediaPicker === field.key && (
                <div className="border border-slate-200 rounded-xl p-3 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-600">Media Library</span>
                    <button onClick={() => setMediaPicker(null)} className="text-slate-400 hover:text-slate-600">
                      <X size={14} />
                    </button>
                  </div>
                  <MediaLibrary
                    selectable
                    onSelect={(url) => {
                      onChange(field.key, url);
                      setMediaPicker(null);
                    }}
                  />
                </div>
              )}
            </div>
          ) : field.type === "number" ? (
            <input
              type="number"
              value={val(field.key)}
              placeholder={field.placeholder}
              onChange={(e) => onChange(field.key, e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          ) : (
            <input
              type={field.type === "url" ? "url" : "text"}
              value={val(field.key)}
              placeholder={field.placeholder ?? (field.type === "url" ? "https://..." : "")}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          )}
        </div>
      ))}
    </div>
  );
}
