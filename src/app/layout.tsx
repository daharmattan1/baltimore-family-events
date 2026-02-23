import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bmore Families | AI-Curated Baltimore Family Events",
    template: "%s | Bmore Families",
  },
  description:
    "Discover the best family-friendly events in Baltimore. AI-curated from 310+ sources across 5 counties. Free weekly newsletter every Thursday.",
  metadataBase: new URL("https://bmorefamilies.com"),
  openGraph: {
    title: "Bmore Families | Your Weekend, Sorted",
    description:
      "AI-curated family events from 310+ sources across 5 Baltimore counties. Free weekly newsletter.",
    type: "website",
    locale: "en_US",
    siteName: "Bmore Families",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bmore Families - AI-Curated Baltimore Family Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bmore Families | Your Weekend, Sorted",
    description:
      "Stop scrolling 20 websites. The best family events in Baltimore, delivered every Thursday.",
    images: ["/og-image.png"],
  },
  keywords: [
    "Baltimore family events",
    "things to do with kids Baltimore",
    "Baltimore weekend activities",
    "family friendly Baltimore",
    "Baltimore events this weekend",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Bmore Families",
  description:
    "AI-curated family events newsletter for the Baltimore metropolitan area",
  url: "https://bmorefamilies.com",
  applicationCategory: "Lifestyle",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  areaServed: {
    "@type": "Place",
    name: "Baltimore Metropolitan Area",
  },
  creator: {
    "@type": "Person",
    name: "Victor Sowers",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baltimore",
      addressRegion: "MD",
    },
  },
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
      <body className={`${inter.variable} antialiased bg-[var(--bg)] text-[var(--text)]`}>
        {GTM_ID && (
          <>
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
