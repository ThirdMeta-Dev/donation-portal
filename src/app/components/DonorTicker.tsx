import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { LIVE_TICKER_DONATIONS } from "../lib/constants";

export function DonorTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex(i => (i + 1) % LIVE_TICKER_DONATIONS.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = LIVE_TICKER_DONATIONS[currentIndex];

  return (
    <div className="border-b py-2 px-4 overflow-hidden" style={{ background: "#FAF5EA", borderColor: "#E8D5AF" }}>
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-slate-500" style={{ fontWeight: 600 }}>LIVE DONATIONS</span>
        </div>
        <div
          className="flex items-center gap-2 text-sm transition-all duration-300"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-8px)" }}
        >
          <Heart size={12} className="flex-shrink-0" style={{ color: "#B07D3A", fill: "#C99247" }} />
          <span className="text-slate-700">
            <span style={{ fontWeight: 600 }}>{current.name}</span>
            {" from "}<span className="font-semibold" style={{ color: "#1B2B3A" }}>{current.location}</span>
            {" just donated "}
            <span style={{ fontWeight: 700, color: "#B07D3A" }}>{current.amount}</span>
            {" to "}<span style={{ color: "#6B6B60" }}>{current.cause}</span>
            <span className="text-slate-400 ml-2 text-xs">· {current.time}</span>
          </span>
        </div>
      </div>
    </div>
  );
}