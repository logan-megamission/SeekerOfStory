import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
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
  title: "Seeker of Story | Find Your Mentor for Free",
  description:
    "Tell us who you want to become — we'll match you with a DFW founder who already made that leap. Free. Always. Fort Worth, TX.",
  metadataBase: new URL("https://seekerofstory.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seekerofstory.com",
    siteName: "Seeker of Story",
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
      <body className="min-h-full flex flex-col">
          <Nav />
          <main className="flex-1 pt-[70px]">{children}</main>
          <Footer />
      </body>
    </html>
  );
}
