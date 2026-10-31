"use client";

import { useEffect, useRef, useState } from "react";

const stats = [[650, "", "Years"], [150, "", "Publishers"], [38, "", "Clients"], [90, "", "Hard Workers"], [1, "", "Mn Daily Impressions"], [35, "", "Mn User Actions Per Day"], [1364, "", "Close Knit Team"], [1364, "", "Hours Of Support"]] as const;

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState(stats.map(() => 0));
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } }, { threshold: 0.25 }); observer.observe(node); return () => observer.disconnect(); }, []);
  useEffect(() => { if (!started) return; const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; if (reduce) { setValues(stats.map(([value]) => value)); return; } const duration = 1400; const start = performance.now(); let frame = 0; const tick = (now: number) => { const progress = Math.min((now - start) / duration, 1); const eased = 1 - Math.pow(1 - progress, 3); setValues(stats.map(([value]) => Math.round(value * eased))); if (progress < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, [started]);
  return <section ref={ref} id="stats" className="bg-slate-950 px-6 py-16 text-white"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-4">{stats.map(([, prefix, label], index) => <div key={label} className="bg-slate-950 px-4 py-7 text-center sm:px-6"><p className="text-3xl font-bold text-orange-400 sm:text-4xl">{prefix}{values[index]}</p><p className="mt-2 text-sm leading-5 text-slate-300">{label}</p></div>)}</div></section>;
}
