import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  color: string;
}

function CountUp({ target, prefix = "", suffix = "", duration = 2000 }: { target: number; prefix?: string; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const formatted = count >= 100000
    ? `${(count / 100000).toFixed(1)}L`
    : count >= 1000
    ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
    : count.toString();

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

const STATS: StatItem[] = [
  { value: 145000, suffix: "+", label: "Lives Impacted", color: "text-[#B07D3A]" },
  { value: 20000000, prefix: "₹", suffix: "", label: "Funds Raised", color: "text-[#1B2B3A]" },
  { value: 14200, suffix: "+", label: "Active Supporters", color: "text-[#4A6741]" },
  { value: 6, suffix: " Districts", label: "Districts Covered", color: "text-[#8C6228]" },
];

export function StatsCounter() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map(stat => (
        <div key={stat.label} className="text-center">
          <div className={`text-3xl md:text-4xl ${stat.color} mb-1`} style={{ fontWeight: 800 }}>
            <CountUp
              target={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </div>
          <div className="text-slate-500 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}