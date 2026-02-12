import type { Metadata } from "next";

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

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
