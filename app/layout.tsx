import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const malayalam = Noto_Sans_Malayalam({ variable: "--font-malayalam", subsets: ["malayalam"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Manakottukavu Temple | Mullurkkara",
  description: "Official information, temple offerings, timings, contacts, and renovation details for Manakottukavu Temple in Mullurkkara, Kerala.",
  openGraph: {
    title: "Manakottukavu Temple — Mullurkkara",
    description: "A peaceful Bhagavathi shrine in Mullurkkara, Kerala.",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Manakottukavu Temple in Mullurkkara" }],
  },
  twitter: { card: "summary_large_image", title: "Manakottukavu Temple — Mullurkkara", description: "A peaceful Bhagavathi shrine in Mullurkkara, Kerala.", images: ["/og-home.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable} ${malayalam.variable}`}>{children}</body></html>;
}
