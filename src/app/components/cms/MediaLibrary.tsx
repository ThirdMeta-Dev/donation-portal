import { useEffect, useState, useCallback } from "react";
import { Loader2, Trash2, Copy, Check, Image as ImageIcon, Video, Search, X } from "lucide-react";
import { listMedia, deleteMedia, formatBytes, type MediaFile } from "../../../lib/cms-storage";
import { APP_ENV } from "../../../lib/cms-env";
import { MediaUploadZone } from "./MediaUploadZone";

interface Props {
  selectable?: boolean;
  onSelect?: (url: string) => void;
}

export function MediaLibrary({ selectable, onSelect }: Props) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [copied, setCopied] = useState("");
  const [deleting, setDeleting] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listMedia(APP_ENV);
      setFiles(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function handleUploaded(file: MediaFile) {
    setFiles((prev) => [file, ...prev]);
  }

  async function handleDelete(file: MediaFile) {
    if (!confirm(`Delete "${file.name}"? This cannot be undone.`)) return;
    setDeleting(file.path);
    try {
      await deleteMedia(file.path);
      setFiles((prev) => prev.filter((f) => f.path !== file.path));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeleting("");
    }
  }

  function handleCopy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 2000);
  }

  const filtered = files.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "image" && f.contentType.startsWith("image/")) ||
      (filter === "video" && f.contentType.startsWith("video/"));
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-4">
      <MediaUploadZone onUploaded={handleUploaded} />

      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files…"
            className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={12} />
            </button>
          )}
        </div>
        {(["all", "image", "video"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              filter === f ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={24} className="animate-spin text-slate-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-12 text-slate-400 gap-2">
          <ImageIcon size={32} />
          <p className="text-sm">{search ? "No files match your search" : "No files uploaded yet"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 max-h-[480px] overflow-y-auto pr-1">
          {filtered.map((file) => {
            const isImage = file.contentType.startsWith("image/");
            const isVideo = file.contentType.startsWith("video/");
            return (
              <div
                key={file.path}
                onClick={() => selectable && onSelect?.(file.url)}
                className={`relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 ${
                  selectable ? "cursor-pointer hover:border-indigo-400 hover:ring-2 hover:ring-indigo-200" : ""
                }`}
              >
                <div className="aspect-square flex items-center justify-center bg-slate-100">
                  {isImage ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : isVideo ? (
                    <video src={file.url} className="w-full h-full object-cover" muted />
                  ) : null}

                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Video size={24} className="text-white drop-shadow" />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                  {selectable ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelect?.(file.url); }}
                      className="px-3 py-1.5 bg-white text-slate-800 rounded-lg text-xs font-medium hover:bg-indigo-50"
                    >
                      Insert
                    </button>
                  ) : null}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopy(file.url); }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white text-slate-800 rounded-lg text-xs font-medium hover:bg-slate-50"
                  >
                    {copied === file.url ? <Check size={11} /> : <Copy size={11} />}
                    {copied === file.url ? "Copied!" : "Copy URL"}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(file); }}
                    disabled={deleting === file.path}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 disabled:opacity-60"
                  >
                    {deleting === file.path ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                    Delete
                  </button>
                </div>

                <div className="px-2 py-1.5 border-t border-slate-100">
                  <p className="text-xs text-slate-600 truncate" title={file.name}>{file.name}</p>
                  <p className="text-[10px] text-slate-400">{formatBytes(file.size)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
