import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Geist_Mono } from "next/font/google";
import { AppClerkProvider } from "@/components/providers/AppClerkProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Seeker of Story | Find Your Mentor for Free — Fort Worth, TX",
    template: "%s | Seeker of Story",
  },
  description:
    "Free mentorship platform connecting DFW career transitioners with local founders who've documented their leap. No paywalls. Fort Worth, TX.",
  metadataBase: new URL("https://seekerofstory.com"),
  keywords: [
    "DFW mentorship",
    "Fort Worth entrepreneurs",
    "founder stories",
    "career transition mentor",
    "Dallas startup founders",
    "free mentorship",
    "entrepreneur podcast",
    "Mega Mission Media",
    "Susy Gordon",
  ],
  authors: [{ name: "Susy Gordon", url: "https://seekerofstory.com/about" }],
  creator: "Mega Mission Media",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seekerofstory.com",
    siteName: "Seeker of Story",
    title: "Seeker of Story | Find Your Mentor for Free",
    description:
      "Free mentorship platform connecting DFW career transitioners with local founders. No paywalls. Always free.",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Seeker of Story" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seeker of Story | Find Your Mentor for Free",
    description: "Free mentorship platform for DFW career transitioners. Real founders. Real blueprints. Zero paywalls.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://seekerofstory.com",
    types: {
      "application/rss+xml": "https://seekerofstory.com/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AppClerkProvider>{children}</AppClerkProvider>
      </body>
    </html>
  );
}
