"use client";

import WebsiteFooter from "@/components/WebsiteFooter";
import WebsiteHeader from "@/components/WebsiteHeader";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("Sending...");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    const data = await response.json(); setStatus(data.error ?? "Thanks, we received your enquiry.");
  }
  return <><WebsiteHeader /><main className="min-h-screen bg-slate-950 px-6 py-20 text-white"><div className="mx-auto max-w-6xl"><a href="/" className="text-orange-300">← Back to IntellectAdz</a><div className="mt-16 grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-orange-300">Get in touch</p><h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">Let&apos;s build your next growth story.</h1><p className="mt-6 leading-8 text-slate-300">Tell us a little about your goals and our team will get back to you.</p><a href="mailto:info@intellectads.co.in" className="mt-8 inline-block text-orange-300">info@intellectads.co.in</a></div><form onSubmit={submit} className="rounded-3xl bg-white p-8 text-slate-950 sm:p-10"><div className="grid gap-6 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">Name<input name="name" required className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500" /></label><label className="grid gap-2 text-sm font-medium">Email<input name="email" type="email" required className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500" /></label></div><label className="mt-6 grid gap-2 text-sm font-medium">Company<input name="company" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500" /></label><label className="mt-6 grid gap-2 text-sm font-medium">How can we help?<textarea name="message" required rows={5} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500" /></label><button type="submit" className="mt-7 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white">Send enquiry</button>{status && <p className="mt-4 text-sm text-slate-600">{status}</p>}</form></div></div></main><WebsiteFooter /></>;
}
