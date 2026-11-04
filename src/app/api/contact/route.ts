import { NextResponse } from "next/server";

const recentRequests = new Map<string, number>();

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { name?: unknown; userName?: unknown; email?: unknown; message?: unknown; mobile?: unknown; company?: unknown; organization?: unknown; userType?: unknown; website?: unknown; captchaToken?: unknown } | null;
  const name = typeof body?.name === "string" ? body.name.trim() : typeof body?.userName === "string" ? body.userName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : ""; const organization = typeof body?.organization === "string" ? body.organization.trim() : typeof body?.company === "string" ? body.company.trim() : "";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (body?.website) return NextResponse.json({ ok: true });
  const captchaSecret = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
  const captchaToken = typeof body?.captchaToken === "string" ? body.captchaToken : "";
  if (process.env.RECAPTCHA_REQUIRED !== "false" && captchaSecret) { const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ secret: captchaSecret, response: captchaToken, remoteip: ip }).toString() }); const result = await verify.json() as { success?: boolean }; if (!result.success) return NextResponse.json({ error: "Please complete the reCAPTCHA." }, { status: 422 }); }
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return NextResponse.json({ error: "Please provide a name, valid email, and message." }, { status: 422 });
  const now = Date.now();
  if (now - (recentRequests.get(ip) ?? 0) < 60_000) return NextResponse.json({ error: "Please wait a minute before sending another enquiry." }, { status: 429 });
  recentRequests.set(ip, now);
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL ?? "contact@intellectads.co.in";
  const sender = process.env.MAIL_FROM ?? "IntellectAds Website <onboarding@resend.dev>";
  if (!apiKey) return NextResponse.json({ error: "Contact delivery is not configured yet." }, { status: 503 });
  const details = [`Name: ${name}`, `Email: ${email}`, `Mobile: ${typeof body?.mobile === "string" ? body.mobile.trim() : ""}`, `Company: ${typeof body?.company === "string" ? body.company.trim() : ""}`, `User type: ${typeof body?.userType === "string" ? body.userType.trim() : ""}`].join("\n");
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: sender, to: [recipient], reply_to: email, subject: `New website enquiry from ${name}`, text: `${details}\n\nMessage:\n${message}` }) });
  if (!response.ok) return NextResponse.json({ error: "We could not send your enquiry. Please try again." }, { status: 502 });
  return NextResponse.json({ ok: true, message: "Thanks, we received your enquiry." });
}
