import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baltimore Family Events | Weekly Curated Events for Families",
  description: "Discover the best family-friendly events in Baltimore. AI-curated from 112+ sources across 5 counties. Free weekly newsletter.",
  openGraph: {
    title: "Baltimore Family Events",
    description: "Discover the best family-friendly events in Baltimore. AI-curated from 112+ sources.",
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
      <body className={`${inter.variable} antialiased bg-[var(--bg)] text-[var(--text)]`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
