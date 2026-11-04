"use client";

import { useEffect, useState } from "react";

const slides = ["mobile-laptop.webp", "awesome-feature.webp", "mobile-marketing.jpg", "web-marketing.webp", "video-advertising.webp"].map((name) => `/intellectads/media/${name}`);

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => { const reduce = window.matchMedia("(prefers-reduced-motion: reduce)"); if (reduce.matches) return; const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 6000); return () => window.clearInterval(timer); }, []);
  return <div className="absolute inset-0"><img src={slides[active]} alt="" width={1920} height={900} loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-cover opacity-30 transition-opacity duration-700" /><div className="absolute inset-x-0 bottom-8 flex justify-center gap-2">{slides.map((_, index) => <button key={index} type="button" aria-label={`Show hero slide ${index + 1}`} onClick={() => setActive(index)} className={`h-2 rounded-full transition-all ${active === index ? "w-8 bg-orange-400" : "w-2 bg-white/60"}`} />)}</div></div>;
}
