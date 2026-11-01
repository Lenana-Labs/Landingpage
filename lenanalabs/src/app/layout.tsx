import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";
const display = Bricolage_Grotesque({ variable: '--font-display', subsets: ['latin'], display: 'swap' });
const body = Instrument_Sans({ variable: '--font-body', subsets: ['latin'], display: 'swap' });
const mono = IBM_Plex_Mono({ variable: '--font-technical', subsets: ['latin'], weight: ['400', '500'], display: 'swap', preload: false });
const title = 'LenanaLabs — Technology built around real problems';
const description = 'A Kenya-based technology engineering studio exploring practical engineering, product development, and emerging technology. Start with the problem.';
export const metadata: Metadata = { ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: '/' } } : {}), title, description, openGraph: { title, description, type: 'website', locale: 'en_KE', siteName: site.name }, twitter: { card: 'summary_large_image', title, description } };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
    <body>{children}</body>
    </html>;
}
