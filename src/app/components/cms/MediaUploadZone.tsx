import { useRef, useState, useCallback } from "react";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import { uploadMedia, type MediaFile } from "../../../lib/cms-storage";
import { APP_ENV } from "../../../lib/cms-env";

interface Props {
  onUploaded: (file: MediaFile) => void;
}

export function MediaUploadZone({ onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      setError("");
      const file = files[0];
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      if (!isImage && !isVideo) {
        setError("Only images and videos are supported.");
        return;
      }
      try {
        setProgress(0);
        const result = await uploadMedia(file, APP_ENV, setProgress);
        onUploaded(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setProgress(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [onUploaded]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors ${
        dragging ? "border-indigo-400 bg-indigo-50" : "border-slate-300 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {progress !== null ? (
        <>
          <Loader2 size={24} className="text-indigo-600 animate-spin" />
          <p className="text-sm text-indigo-600 font-medium">
            {progress < 60 ? "Compressing…" : "Uploading…"} {progress}%
          </p>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      ) : (
        <>
          <Upload size={20} className="text-slate-400" />
          <p className="text-sm text-slate-500">
            Drag & drop or <span className="text-indigo-600 font-medium">browse</span>
          </p>
          <p className="text-xs text-slate-400">Images auto-compressed to WebP · Videos up to 50 MB</p>
        </>
      )}

      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}
