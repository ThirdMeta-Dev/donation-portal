import { useState } from "react";
import { Database, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { seedDatabase } from "../../../lib/cms-seed-data";
import { APP_ENV } from "../../../lib/cms-env";

export function SeedButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSeed() {
    if (!confirm(`Seed CMS defaults for ${APP_ENV.toUpperCase()} environment? Existing content won't be overwritten.`)) return;
    setStatus("loading");
    try {
      await seedDatabase(APP_ENV);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Unknown error");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleSeed}
        disabled={status === "loading"}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-amber-50 border border-amber-300 text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Database size={14} />
        )}
        Seed Database ({APP_ENV})
      </button>

      {status === "success" && (
        <span className="flex items-center gap-1 text-sm text-green-600">
          <CheckCircle2 size={14} /> Seeded successfully
        </span>
      )}
      {status === "error" && (
        <span className="flex items-center gap-1 text-sm text-red-500">
          <AlertCircle size={14} /> {errorMsg}
        </span>
      )}
    </div>
  );
}
