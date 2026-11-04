import WebsiteFooter from "@/components/WebsiteFooter";
import WebsiteHeader from "@/components/WebsiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Case Studies", description: "Explore selected IntellectAds digital marketing and performance growth work.", alternates: { canonical: "/case-studies" } };

const studies = [
  ["Performance-led acquisition", "A focused media and creative program designed to improve qualified customer acquisition."],
  ["Affiliate channel growth", "A publisher partnership model built around trusted reach, transparent tracking, and sustainable scale."],
  ["Creative that converts", "A sharper message system that gives every campaign asset a clear role in the customer journey."],
];

export default function CaseStudiesPage() {
  return <><WebsiteHeader /><main className="min-h-screen bg-white px-6 py-20 text-slate-950"><div className="mx-auto max-w-6xl"><a href="/" className="text-orange-600">← Back to IntellectAdz</a><p className="mt-16 text-sm font-semibold uppercase tracking-[.2em] text-orange-600">Selected work</p><h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">Ideas measured by the impact they create.</h1><div className="mt-14 grid gap-6 md:grid-cols-3">{studies.map(([title, description], index) => <article key={title} className="rounded-3xl bg-slate-950 p-8 text-white"><span className="text-sm text-orange-300">0{index + 1}</span><h2 className="mt-12 text-2xl font-semibold">{title}</h2><p className="mt-5 leading-8 text-slate-300">{description}</p></article>)}</div></div></main><WebsiteFooter /></>;
}
