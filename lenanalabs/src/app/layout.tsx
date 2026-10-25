import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lenana Labs — Engineering & Technology Solutions",
  description: "Lenana Labs is a technology solutions company based in Nairobi, Kenya. We engineer high-performance distributed systems, data intelligence pipelines, and resilient web platforms.",
  keywords: ["Lenana Labs", "Nairobi", "Software Engineering", "Distributed Systems", "AI", "Data Engineering", "Kenya Tech"],
  authors: [{ name: "Lenana Labs" }],
  openGraph: {
    title: "Lenana Labs — Technology that works",
    description: "Technology solutions company from Nairobi. We build high-throughput distributed engines, data platforms, and resilient software.",
    url: "https://lenanalabs.com",
    siteName: "Lenana Labs",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
