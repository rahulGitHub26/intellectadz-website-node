"use client";
import { useEffect } from "react";
export default function Recaptcha({ onToken }: { onToken: (token: string) => void }) {
  if (process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "false") return null;
  useEffect(() => {
    if (!document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true; script.defer = true; document.body.appendChild(script);
    }
  }, []);
  useEffect(() => { const timer = window.setInterval(() => { const token = document.querySelector<HTMLTextAreaElement>('textarea[name="g-recaptcha-response"]')?.value ?? ""; onToken(token); }, 500); return () => window.clearInterval(timer); }, [onToken]);
  return <div className="g-recaptcha" data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""} />;
}
