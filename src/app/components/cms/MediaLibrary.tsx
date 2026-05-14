import { useEffect, useState, useCallback, useMemo } from "react";
import { Loader2, Trash2, Copy, Check, Image as ImageIcon, Video, Search, X, FolderOpen } from "lucide-react";
import { listMedia, deleteMedia, formatBytes, type MediaFile } from "../../../lib/cms-storage";
import { APP_ENV } from "../../../lib/cms-env";
import { MediaUploadZone } from "./MediaUploadZone";

// All local site assets resolved by Vite at build time
const RAW_IMAGES = import.meta.glob(
  "/src/assets/**/*.{png,jpg,jpeg,webp}",
  { query: "?url", import: "default", eager: true }
) as Record<string, string>;

const RAW_VIDEOS = import.meta.glob(
  "/src/assets/**/*.mp4",
  { query: "?url", import: "default", eager: true }
) as Record<string, string>;

type SiteAsset = { name: string; url: string; type: "image" | "video" };

const SITE_ASSETS: SiteAsset[] = [
  ...Object.entries(RAW_IMAGES).map(([path, url]) => ({
    name: path.split("/").pop() ?? path,
    url: url as string,
    type: "image" as const,
  })),
  ...Object.entries(RAW_VIDEOS).map(([path, url]) => ({
    name: path.split("/").pop() ?? path,
    url: url as string,
    type: "video" as const,
  })),
].sort((a, b) => a.name.localeCompare(b.name));

interface Props {
  selectable?: boolean;
  onSelect?: (url: string) => void;
}

type LibTab = "uploaded" | "site";

export function MediaLibrary({ selectable, onSelect }: Props) {
  const [libTab, setLibTab] = useState<LibTab>("uploaded");

  // ── Uploaded (Supabase) state ───────────────────────────────────────────
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loadingUploaded, setLoadingUploaded] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");

  // ── Shared UI state ─────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [copied, setCopied] = useState("");

  const loadUploaded = useCallback(async () => {
    setLoadingUploaded(true);
    try {
      setFiles(await listMedia(APP_ENV));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load media");
    } finally {
      setLoadingUploaded(false);
    }
  }, []);

  useEffect(() => { loadUploaded(); }, [loadUploaded]);

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

  // ── Filtered lists ───────────────────────────────────────────────────────
  const filteredUploaded = useMemo(() =>
    files.filter((f) => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "all" ||
        (filter === "image" && f.contentType.startsWith("image/")) ||
        (filter === "video" && f.contentType.startsWith("video/"));
      return matchSearch && matchFilter;
    }), [files, search, filter]);

  const filteredSite = useMemo(() =>
    SITE_ASSETS.filter((a) => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || filter === a.type;
      return matchSearch && matchFilter;
    }), [search, filter]);

  // ── Render helpers ───────────────────────────────────────────────────────
  function Thumb({ url, name, type, onInsert, onDeleteFile }: {
    url: string; name: string; type: "image" | "video";
    onInsert?: () => void; onDeleteFile?: () => void;
  }) {
    return (
      <div
        onClick={() => selectable && onInsert?.()}
        className={`relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 ${
          selectable ? "cursor-pointer hover:border-indigo-400 hover:ring-2 hover:ring-indigo-200" : ""
        }`}
      >
        <div className="aspect-square flex items-center justify-center bg-slate-100 relative">
          {type === "image" ? (
            <img src={url} alt={name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <>
              <video src={url} className="w-full h-full object-cover" muted preload="metadata" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Video size={24} className="text-white drop-shadow" />
              </div>
            </>
          )}
        </div>

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
          {selectable && (
            <button
              onClick={(e) => { e.stopPropagation(); onInsert?.(); }}
              className="px-3 py-1.5 bg-white text-slate-800 rounded-lg text-xs font-medium hover:bg-indigo-50"
            >
              Insert
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); handleCopy(url); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-white text-slate-800 rounded-lg text-xs font-medium hover:bg-slate-50"
          >
            {copied === url ? <Check size={11} /> : <Copy size={11} />}
            {copied === url ? "Copied!" : "Copy URL"}
          </button>
          {onDeleteFile && (
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteFile(); }}
              disabled={deleting !== ""}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 disabled:opacity-60"
            >
              {deleting ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
              Delete
            </button>
          )}
        </div>

        <div className="px-2 py-1.5 border-t border-slate-100">
          <p className="text-xs text-slate-600 truncate" title={name}>{name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Source tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {([["uploaded", "Uploaded"], ["site", "Site Assets"]] as [LibTab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setLibTab(t)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              libTab === t ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t === "uploaded" ? <ImageIcon size={12} /> : <FolderOpen size={12} />}
            {label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              libTab === t ? "bg-slate-100 text-slate-500" : "bg-slate-200 text-slate-400"
            }`}>
              {t === "uploaded" ? files.length : SITE_ASSETS.length}
            </span>
          </button>
        ))}
      </div>

      {libTab === "uploaded" && <MediaUploadZone onUploaded={handleUploaded} />}

      {/* Search + type filter */}
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

      {/* Grid */}
      {libTab === "uploaded" ? (
        loadingUploaded ? (
          <div className="flex justify-center py-12">
            <Loader2 size={24} className="animate-spin text-slate-400" />
          </div>
        ) : filteredUploaded.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-slate-400 gap-2">
            <ImageIcon size={32} />
            <p className="text-sm">{search ? "No files match your search" : "No files uploaded yet"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredUploaded.map((file) => (
              <Thumb
                key={file.path}
                url={file.url}
                name={file.name}
                type={file.contentType.startsWith("video/") ? "video" : "image"}
                onInsert={() => onSelect?.(file.url)}
                onDeleteFile={() => handleDelete(file)}
              />
            ))}
          </div>
        )
      ) : (
        filteredSite.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-slate-400 gap-2">
            <FolderOpen size={32} />
            <p className="text-sm">No site assets match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredSite.map((asset) => (
              <Thumb
                key={asset.url}
                url={asset.url}
                name={asset.name}
                type={asset.type}
                onInsert={() => onSelect?.(asset.url)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
