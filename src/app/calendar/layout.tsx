import type { Metadata } from "next";
import { fetchEvents } from "@/lib/supabase";
import { generateEventJsonLd } from "@/lib/event-helpers";

export const metadata: Metadata = {
  title: "Baltimore Family Events Calendar",
  description:
    "Browse 100+ family-friendly events across Baltimore City, Baltimore County, Anne Arundel, Howard, and Harford counties. Filter by age, cost, and type.",
  openGraph: {
    title: "Baltimore Family Events Calendar",
    description:
      "Find your perfect weekend. Browse family events across 5 Baltimore counties.",
  },
};

export default async function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let jsonLd: Record<string, unknown>[] = [];

  try {
    const events = await fetchEvents({ limit: 20 });
    jsonLd = generateEventJsonLd(events);
  } catch {
    // Silently degrade — JSON-LD is progressive enhancement
  }

  return (
    <>
      {jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
