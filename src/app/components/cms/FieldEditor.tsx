import { useState } from "react";
import { FolderOpen, X } from "lucide-react";
import type { ContentField } from "../../../lib/cms-types";
import { MediaLibrary } from "./MediaLibrary";

interface Props {
  fields: ContentField[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

type LinkMode = "page" | "external" | "anchor";

function parseLinkValue(raw: string): { mode: LinkMode; inner: string } {
  if (raw.startsWith("page:")) return { mode: "page", inner: raw.slice(5) };
  if (raw.startsWith("anchor:")) return { mode: "anchor", inner: raw.slice(7) };
  if (raw.startsWith("external:")) return { mode: "external", inner: raw.slice(9) };
  return { mode: "external", inner: raw };
}

function encodeLinkValue(mode: LinkMode, inner: string): string {
  if (!inner) return "";
  if (mode === "page") return `page:${inner}`;
  if (mode === "anchor") return `anchor:${inner}`;
  return `external:${inner}`;
}

export function FieldEditor({ fields, values, onChange }: Props) {
  const [mediaPicker, setMediaPicker] = useState<string | null>(null);
  const [linkModes, setLinkModes] = useState<Record<string, LinkMode>>({});

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
          ) : field.type === "link" ? (() => {
            const raw = val(field.key);
            const { mode: parsedMode, inner: parsedInner } = parseLinkValue(raw);
            const activeMode: LinkMode = linkModes[field.key] ?? parsedMode;
            const innerVal = (linkModes[field.key] === undefined || linkModes[field.key] === parsedMode)
              ? parsedInner
              : "";

            const switchMode = (m: LinkMode) => {
              setLinkModes((prev) => ({ ...prev, [field.key]: m }));
              onChange(field.key, "");
            };

            const handleInput = (typedInner: string) => {
              onChange(field.key, encodeLinkValue(activeMode, typedInner));
            };

            const modeLabelMap: Record<LinkMode, string> = {
              page: "Page",
              external: "External URL",
              anchor: "Anchor ID",
            };

            return (
              <div className="space-y-2">
                <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                  {(["page", "external", "anchor"] as LinkMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => switchMode(m)}
                      className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                        activeMode === m ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {modeLabelMap[m]}
                    </button>
                  ))}
                </div>

                {activeMode === "page" && (
                  <input
                    type="text"
                    value={innerVal}
                    placeholder="/about, /donate, /contact…"
                    onChange={(e) => handleInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                )}
                {activeMode === "external" && (
                  <input
                    type="url"
                    value={innerVal}
                    placeholder="https://…"
                    onChange={(e) => handleInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                )}
                {activeMode === "anchor" && (
                  <input
                    type="text"
                    value={innerVal}
                    placeholder="section-id (without #)"
                    onChange={(e) => handleInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                )}

                {raw && (
                  <p className="text-xs text-slate-400 font-mono truncate">→ {raw}</p>
                )}
              </div>
            );
          })() : (
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
