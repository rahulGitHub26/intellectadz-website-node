import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { name?: unknown; email?: unknown; message?: unknown } | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return NextResponse.json({ error: "Please provide a name, valid email, and message." }, { status: 422 });
  return NextResponse.json({ error: "Contact delivery is not configured yet. Add SMTP and CAPTCHA settings before enabling this form." }, { status: 503 });
}
