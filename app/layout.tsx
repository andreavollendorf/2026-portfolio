import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Agentation } from "agentation";
import "./globals.css";

const earlySans = localFont({
  src: "../public/fonts/EarlySans-Variable.otf",
  variable: "--font-early-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Andrea Vollendorf • Product Design",
    template: "%s • Andrea Vollendorf",
  },
  description:
    "Product designer based in coastal Maine. Director of Product Design at Proof.",
  openGraph: {
    title: "Andrea Vollendorf • Product Design",
    description:
      "Product designer based in coastal Maine. Director of Product Design at Proof.",
    url: "/",
    siteName: "Andrea Vollendorf",
    images: [{ url: "/opengraph.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrea Vollendorf • Product Design",
    description:
      "Product designer based in coastal Maine. Director of Product Design at Proof.",
    images: ["/opengraph.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Andrea Vollendorf",
  jobTitle: "Director of Product Design",
  worksFor: { "@type": "Organization", name: "Proof" },
  description:
    "Product designer based in coastal Maine. Director of Product Design at Proof.",
  url: BASE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${earlySans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
      <GoogleAnalytics gaId="G-22T1KDCYY1" />
    </html>
  );
}
