import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Ali Hassan — Graphic Designer",
  description:
    "Ali Hassan is a graphic designer with 3 years of experience in branding, social media design, UI design, Photoshop, Illustrator, and Figma.",
  keywords: [
    "Ali Hassan",
    "Graphic Designer",
    "Brand Designer",
    "Photoshop Designer",
    "Illustrator Designer",
    "Figma Designer",
  ],
  openGraph: {
    title: "Ali Hassan — Graphic Designer",
    description:
      "Visual identities, digital experiences, and creative direction by Ali Hassan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}