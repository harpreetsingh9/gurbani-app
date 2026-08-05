import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_Gurmukhi } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/components/settings/SettingsProvider";
import { BottomNav } from "@/components/navigation/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansGurmukhi = Noto_Sans_Gurmukhi({
  variable: "--font-gurbani-akhar",
  subsets: ["gurmukhi"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sikhi.vercel.app"),
  title: {
    default: "Sikh Gurbani - Read Nitnem & Gurbani Online",
    template: "%s | Sikh Gurbani",
  },
  description: "Read Nitnem Baanis including Japji Sahib, Jaap Sahib, Chaupai Sahib, and Anand Sahib online with Gurmukhi text, English & Hindi translations, and audio-friendly layout.",
  keywords: [
    "Gurbani",
    "Nitnem",
    "Japji Sahib",
    "Jaap Sahib",
    "Chaupai Sahib",
    "Anand Sahib",
    "Rehras Sahib",
    "Kirtan Sohila",
    "Sikh Prayers",
    "Gurmukhi",
    "Gurbani Online",
    "Gurbani Translation",
    "Sikhism Scripture",
    "Sundar Gutka",
    "Harpreet Singh",
  ],
  authors: [{ name: "Harpreet Singh", url: "https://singhharpreet.vercel.app" }],
  creator: "Harpreet Singh",
  publisher: "Harpreet Singh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sikhi.vercel.app",
    siteName: "Sikh Gurbani",
    title: "Sikh Gurbani - Read Nitnem & Scripture Online",
    description: "Mobile-first Sikh Gurbani reading app created by Harpreet Singh with Gurmukhi script, English, Hindi, and Punjabi translations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sikh Gurbani Reading App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sikh Gurbani - Read Nitnem & Scripture Online",
    description: "Mobile-first Sikh Gurbani reading app created by Harpreet Singh with Gurmukhi script, English, Hindi, and Punjabi translations.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://sikhi.vercel.app",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sikh Gurbani",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global WebSite Schema.org JSON-LD with Person Author metadata
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sikh Gurbani",
    "url": "https://sikhi.vercel.app",
    "description": "Read Nitnem Baanis with Gurmukhi text, English, Hindi, and Punjabi translations.",
    "author": {
      "@type": "Person",
      "name": "Harpreet Singh",
      "url": "https://singhharpreet.vercel.app"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sikhi.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansGurmukhi.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col pb-16 sm:pb-0">
        <SettingsProvider>
          {children}
          <BottomNav />
        </SettingsProvider>
      </body>
    </html>
  );
}
