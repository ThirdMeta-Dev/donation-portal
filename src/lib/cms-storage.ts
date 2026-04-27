import { supabase } from "../app/lib/supabase";
import type { AppEnvironment } from "./cms-types";

const BUCKET = "cms-media";
const MAX_SIZE_MB = 50;

export interface MediaFile {
  name: string;
  url: string;
  size: number;
  contentType: string;
  createdAt: string;
  path: string;
}

function envFolder(env: AppEnvironment) {
  return env;
}

async function compressImage(file: File, maxWidthPx = 1920): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxWidthPx / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const quality = file.size > 1_000_000 ? 0.75 : 0.88;
      canvas.toBlob((b) => resolve(b ?? file), "image/webp", quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

async function compressVideo(file: File): Promise<Blob> {
  // Video compression requires MediaRecorder / FFmpeg — not available in browser without WASM.
  // Return as-is; rely on upload size limit instead.
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`Video exceeds ${MAX_SIZE_MB} MB limit. Please compress before uploading.`);
  }
  return file;
}

export async function uploadMedia(
  file: File,
  env: AppEnvironment,
  onProgress?: (pct: number) => void
): Promise<MediaFile> {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  let blob: Blob = file;

  if (isImage) {
    onProgress?.(10);
    blob = await compressImage(file);
    onProgress?.(40);
  } else if (isVideo) {
    blob = await compressVideo(file);
  }

  const ext = isImage ? "webp" : file.name.split(".").pop() ?? "bin";
  const safeName = `${Date.now()}_${file.name.replace(/[^a-z0-9._-]/gi, "_").replace(/\.[^.]+$/, "")}.${ext}`;
  const path = `${envFolder(env)}/${safeName}`;

  onProgress?.(60);

  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: isImage ? "image/webp" : file.type,
    upsert: false,
  });

  if (error) throw new Error(error.message);

  onProgress?.(100);

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return {
    name: safeName,
    url: urlData.publicUrl,
    size: blob.size,
    contentType: isImage ? "image/webp" : file.type,
    createdAt: new Date().toISOString(),
    path,
  };
}

export async function listMedia(env: AppEnvironment): Promise<MediaFile[]> {
  const { data, error } = await supabase.storage.from(BUCKET).list(envFolder(env), {
    sortBy: { column: "created_at", order: "desc" },
    limit: 200,
  });

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data
    .filter((f) => f.name !== ".emptyFolderPlaceholder")
    .map((f) => {
      const path = `${envFolder(env)}/${f.name}`;
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      return {
        name: f.name,
        url: urlData.publicUrl,
        size: f.metadata?.size ?? 0,
        contentType: f.metadata?.mimetype ?? "",
        createdAt: f.created_at ?? "",
        path,
      };
    });
}

export async function deleteMedia(path: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw new Error(error.message);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
