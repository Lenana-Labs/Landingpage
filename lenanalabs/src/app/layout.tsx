import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Lenana Labs — Software for the real world",
  description:
    "A Nairobi software studio working across digital products, AI and data systems, and software infrastructure. Tell us what you are building.",
  openGraph: {
    title: "Lenana Labs — Software for the real world",
    description:
      "Digital products, data systems, and software infrastructure. Built from Nairobi.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
