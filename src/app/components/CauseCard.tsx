import { Link } from "react-router";
import { Users, ChevronRight, Shield, BookOpen } from "lucide-react";

interface Cause {
  id: string; title: string; category: string; description: string;
  image: string; goal: number; raised: number; donors: number;
  impact: string; tag?: string; urgent?: boolean; enable80G?: boolean;
}
interface CauseCardProps {
  cause: Cause;
  liveRaised?: number;
  liveDonors?: number;
  enable80G?: boolean;
}

export function CauseCard({ cause, liveRaised, liveDonors, enable80G }: CauseCardProps) {
  const displayRaised  = liveRaised  !== undefined ? (cause.raised + liveRaised)  : cause.raised;
  const displayDonors  = liveDonors  !== undefined ? (cause.donors + liveDonors)  : cause.donors;
  const is80GEnabled   = enable80G   !== undefined ? enable80G : (cause.enable80G !== false);
  const progress       = Math.min((displayRaised / cause.goal) * 100, 100);
  const fmt            = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(0)}K` : `₹${n}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden group flex flex-col hover:-translate-y-0.5 transition-all duration-300 hover:shadow-md"
      style={{ border: "1px solid #E5E0D8" }}>

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={cause.image} alt={cause.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm"
            style={{ fontWeight: 600, color: "#1B2B3A" }}>
            {cause.category}
          </span>
          {cause.urgent && (
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ fontWeight: 600, background: "#8C6228", color: "#F8F5EF" }}>
              Urgent
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          {is80GEnabled ? (
            <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1 bg-white/90 backdrop-blur-sm"
              style={{ fontWeight: 600, color: "#4A6741" }}>
              <Shield size={9} /> 80G Eligible
            </span>
          ) : (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm"
              style={{ fontWeight: 600, color: "#6B6B60" }}>
              No 80G
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base mb-2 line-clamp-2 transition-colors" style={{ fontWeight: 600, color: "#1C1C1A" }}>
          {cause.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: "#6B6B60" }}>{cause.description}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: "#6B6B60" }}>
            <span>
              Raised:{" "}
              <span style={{ fontWeight: 700, color: "#B07D3A" }}>{fmt(displayRaised)}</span>
              {liveRaised !== undefined && (
                <span className="ml-1 text-[10px]" style={{ color: "#C99247" }}>live</span>
              )}
            </span>
            <span>Goal: <span style={{ fontWeight: 600 }}>{fmt(cause.goal)}</span></span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#EAE6DF" }}>
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(progress, progress > 0 ? 2 : 0)}%`, background: "#B07D3A" }} />
          </div>
          <div className="flex justify-between mt-1.5 text-xs" style={{ color: "#6B6B60" }}>
            <span className="flex items-center gap-1">
              <Users size={10} /> {displayDonors.toLocaleString()} supporter{displayDonors !== 1 ? "s" : ""}
            </span>
            <span style={{ fontWeight: 600, color: "#8C6228" }}>{progress.toFixed(0)}% funded</span>
          </div>
        </div>

        {/* Impact */}
        <div className="text-xs px-3 py-2 rounded-lg mb-4" style={{ fontWeight: 500, background: "#FAF5EA", color: "#8C6228", border: "1px solid #E8D5AF" }}>
          <BookOpen size={10} className="inline mr-1.5" />
          {cause.impact}
        </div>

        {!is80GEnabled && (
          <div className="text-xs px-3 py-2 rounded-lg mb-3 flex items-center gap-1.5" style={{ background: "#F0F4F7", color: "#6B6B60", border: "1px solid #DBE3E9" }}>
            ℹ️ This cause does not issue 80G tax certificates
          </div>
        )}

        {/* CTA */}
        <Link
          to={`/donate?cause=${cause.id}`}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-colors"
          style={{ fontWeight: 600, background: "#1B2B3A", color: "#F8F5EF" }}
        >
          Support This Cause
          <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
}
