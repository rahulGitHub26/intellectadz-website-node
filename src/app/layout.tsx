import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WebsiteEffects from "@/components/WebsiteEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://intellectads.co.in"),
  title: {
    default: "IntellectAds | Digital Marketing & Performance Growth",
    template: "%s | IntellectAds",
  },
  description:
    "IntellectAds helps brands grow through performance marketing, affiliate growth, creative strategy, and data-led execution.",
  keywords: ["digital marketing agency", "performance marketing", "affiliate marketing", "media buying", "IntellectAds"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "IntellectAds",
    title: "IntellectAds | Digital Marketing & Performance Growth",
    description:
      "Performance marketing and digital growth solutions for ambitious brands.",
    url: "https://intellectads.co.in",
    images: [{ url: "/intellectads/media/intellect-logo.webp", alt: "IntellectAds digital marketing" }],
  },
  twitter: { card: "summary_large_image", title: "IntellectAds | Digital Marketing & Performance Growth", description: "Performance marketing and digital growth solutions for ambitious brands.", images: ["/intellectads/media/intellect-logo.webp"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><WebsiteEffects /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: "IntellectAdz", url: "https://intellectads.co.in", logo: "https://intellectads.co.in/intellectads/media/intellect-logo.webp", email: "contact@intellectads.co.in", telephone: "+911244929614", sameAs: ["https://www.facebook.com/Intellectads", "https://www.linkedin.com/company/7966928/"] }, { "@type": "WebSite", name: "IntellectAdz", url: "https://intellectads.co.in" }] }) }} />{children}</body>
    </html>
  );
}
