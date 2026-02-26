import { BaltimoreEvent } from "@/lib/supabase";

// Parse a YYYY-MM-DD string into year/month/day without timezone shifting.
// new Date("2026-03-01") interprets as UTC midnight, which in US timezones
// shifts back to the previous day. This helper avoids that entirely.
function parseDateParts(dateStr: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateStr.split("T")[0].split("-").map(Number);
  return { year, month, day };
}

// Format date for display — timezone-safe
export function formatDate(dateStr?: string): string {
  if (!dateStr) return "Date TBD";
  const { year, month, day } = parseDateParts(dateStr);
  // Create date using local timezone (noon to avoid any DST edge cases)
  const date = new Date(year, month - 1, day, 12, 0, 0);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Get badge color based on cost type - using brand colors
export function getCostBadgeClass(costType?: string): string {
  switch (costType) {
    case "free":
      return "bg-[var(--color-seafoam)] text-[var(--color-boh)] font-bold"; // Seafoam for free
    case "donation":
      return "bg-[var(--color-charm)]/10 text-[var(--color-charm)]";
    case "paid":
      return "bg-[var(--color-formstone)] text-[var(--text)]";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

// Get category color for left border - using brand palette
export function getCategoryBorderColor(eventType?: string): string {
  switch (eventType) {
    case "museum":
      return "border-l-[var(--color-agent-toddler)]"; // Purple
    case "outdoor":
      return "border-l-[var(--color-seafoam)]"; // Seafoam green
    case "performance":
      return "border-l-[var(--color-agent-planner)]"; // Pink
    case "sports":
      return "border-l-[var(--color-charm)]"; // Charm City Blue
    case "educational":
      return "border-l-[var(--color-calvert)]"; // Calvert Gold
    case "food":
      return "border-l-[var(--color-crab)]"; // Crab Orange
    case "seasonal":
      return "border-l-[var(--color-crossland)]"; // Crossland Red
    case "class":
      return "border-l-[var(--color-agent-tween)]"; // Electric Blue
    case "camp":
      return "border-l-[var(--color-seafoam)]"; // Seafoam
    default:
      return "border-l-[var(--muted)]";
  }
}

// Get age badge label
export function getAgeLabel(ageRange?: string): string {
  switch (ageRange) {
    case "baby":
      return "0-1";
    case "toddler":
      return "1-3";
    case "preschool":
      return "3-5";
    case "elementary":
      return "5-10";
    case "tweens":
      return "10-14";
    case "teens":
      return "14-18";
    case "all_ages":
      return "All Ages";
    default:
      return "";
  }
}

// Get event type icon
export function getEventTypeIcon(eventType?: string): string {
  switch (eventType) {
    case "museum":
      return "\u{1F3DB}\uFE0F";
    case "outdoor":
      return "\u{1F333}";
    case "performance":
      return "\u{1F3AD}";
    case "sports":
      return "\u26BD";
    case "educational":
      return "\u{1F4DA}";
    case "food":
      return "\u{1F37D}\uFE0F";
    case "seasonal":
      return "\u{1F389}";
    case "class":
      return "\u{1F3A8}";
    case "camp":
      return "\u26FA";
    default:
      return "\u{1F4C5}";
  }
}

// Get venue source badge label
export function getVenueSourceBadgeLabel(category?: string): string {
  switch (category) {
    case "religious_institution":
      return "Faith & Community";
    case "library":
      return "Library";
    case "museum":
      return "Museum";
    case "park_recreation":
      return "Parks & Rec";
    case "theater_venue":
      return "Theater";
    case "school":
      return "School";
    case "community_center":
      return "Community Center";
    case "commercial":
      return "Commercial";
    default:
      return "";
  }
}

// Get audience badge label
export function getAudienceBadgeLabel(openness?: string): string {
  switch (openness) {
    case "open_to_all":
      return "Open to All";
    case "faith_community":
      return "Faith Community";
    default:
      return "";
  }
}

// Get venue source badge Tailwind classes
export function getVenueSourceBadgeColor(category?: string): string {
  switch (category) {
    case "religious_institution":
      return "bg-[var(--color-calvert)]/10 text-[var(--color-calvert)]";
    case "library":
      return "bg-[var(--color-charm)]/10 text-[var(--color-charm)]";
    case "park_recreation":
      return "bg-[var(--color-seafoam)]/20 text-emerald-700";
    case "theater_venue":
      return "bg-[var(--color-agent-planner)]/10 text-[var(--color-agent-planner)]";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

// Extract significant words from a title (skip common filler words)
const STOP_WORDS = new Set([
  "a", "an", "the", "at", "in", "on", "for", "of", "and", "or", "to", "with",
  "is", "are", "was", "by", "from", "its", "their", "this", "that", "it",
  "special", "event", "events", "activities", "activity", "programming",
  "celebration", "celebrating", "day", "program", "session",
]);

function getSignificantWords(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}

// Check if two titles are semantically similar (>60% word overlap)
function titlesAreSimilar(a: string, b: string): boolean {
  const wordsA = getSignificantWords(a);
  const wordsB = getSignificantWords(b);
  if (wordsA.size === 0 || wordsB.size === 0) return false;
  let overlap = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) overlap++;
  }
  const smaller = Math.min(wordsA.size, wordsB.size);
  return overlap / smaller >= 0.6;
}

// Deduplicate events, keeping the highest-scored entry.
// Two passes: (1) exact normalized title+date, (2) same venue+date with similar titles.
export function deduplicateEvents(
  events: BaltimoreEvent[]
): BaltimoreEvent[] {
  // Pass 1: exact title + date dedup
  const seen = new Map<string, BaltimoreEvent>();
  for (const event of events) {
    const normalizedTitle = (event.title || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
    const dateKey = event.event_date_start
      ? event.event_date_start.split("T")[0]
      : "no_date";
    const dedupKey = `${normalizedTitle}|${dateKey}`;
    const existing = seen.get(dedupKey);
    if (
      !existing ||
      (event.family_friendly_score ?? 0) >
        (existing.family_friendly_score ?? 0)
    ) {
      seen.set(dedupKey, event);
    }
  }
  const afterExact = Array.from(seen.values());

  // Pass 2: fuzzy dedup — same venue + same date + similar title
  const result: BaltimoreEvent[] = [];
  for (const event of afterExact) {
    const dateKey = event.event_date_start
      ? event.event_date_start.split("T")[0]
      : "no_date";
    const venue = (event.venue || "").toLowerCase().trim();

    // Skip fuzzy matching if no venue (can't confidently dedup without it)
    if (!venue) {
      result.push(event);
      continue;
    }

    const duplicate = result.find((existing) => {
      const existingDate = existing.event_date_start
        ? existing.event_date_start.split("T")[0]
        : "no_date";
      const existingVenue = (existing.venue || "").toLowerCase().trim();
      return (
        dateKey === existingDate &&
        venue === existingVenue &&
        titlesAreSimilar(event.title || "", existing.title || "")
      );
    });

    if (duplicate) {
      // Keep the one with the higher score
      if (
        (event.family_friendly_score ?? 0) >
        (duplicate.family_friendly_score ?? 0)
      ) {
        const idx = result.indexOf(duplicate);
        result[idx] = event;
      }
      // Otherwise skip this event (duplicate with lower score)
    } else {
      result.push(event);
    }
  }

  return result;
}

// Group events by date (YYYY-MM-DD key)
export function groupEventsByDate(
  events: BaltimoreEvent[]
): Map<string, BaltimoreEvent[]> {
  const deduplicated = deduplicateEvents(events);
  const grouped = new Map<string, BaltimoreEvent[]>();
  for (const event of deduplicated) {
    const dateKey = event.event_date_start
      ? event.event_date_start.split("T")[0]
      : "unknown";
    const existing = grouped.get(dateKey) || [];
    existing.push(event);
    grouped.set(dateKey, existing);
  }
  return grouped;
}

// Group events by event_type for dense day drawer categorization
export function groupEventsByType(
  events: BaltimoreEvent[]
): Map<string, BaltimoreEvent[]> {
  const grouped = new Map<string, BaltimoreEvent[]>();
  for (const event of events) {
    const typeKey = event.event_type || "other";
    const existing = grouped.get(typeKey) || [];
    existing.push(event);
    grouped.set(typeKey, existing);
  }
  // Sort events within each group by family_friendly_score descending
  for (const [key, group] of grouped) {
    grouped.set(
      key,
      group.sort(
        (a, b) => (b.family_friendly_score ?? 0) - (a.family_friendly_score ?? 0)
      )
    );
  }
  return grouped;
}

// Generate JSON-LD Event schema for Google rich results
// Only call with server-rendered events (Google ignores client-injected JSON-LD)
export function generateEventJsonLd(events: BaltimoreEvent[]) {
  return events
    .filter((e) => e.title && e.event_date_start)
    .slice(0, 20)
    .map((event) => {
      const jsonLd: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        startDate: event.event_date_start,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
      };

      if (event.event_date_end) {
        jsonLd.endDate = event.event_date_end;
      }

      if (event.summary || event.content) {
        const desc = event.summary || event.content || "";
        jsonLd.description = desc.length > 300 ? desc.slice(0, 297) + "..." : desc;
      }

      if (event.venue || event.address) {
        jsonLd.location = {
          "@type": "Place",
          ...(event.venue && { name: event.venue }),
          ...(event.address && {
            address: {
              "@type": "PostalAddress",
              streetAddress: event.address,
            },
          }),
        };
      }

      if (event.cost_type) {
        jsonLd.offers = {
          "@type": "Offer",
          price: event.cost_type === "free" ? "0" : event.cost_amount || "0",
          priceCurrency: "USD",
          availability: event.is_sold_out
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
        };
      }

      if (event.image_url) {
        jsonLd.image = event.image_url;
      }

      if (event.source_url || event.original_event_url) {
        jsonLd.url = event.original_event_url || event.source_url;
      }

      return jsonLd;
    });
}

// Get human-readable label for event_type
export function getEventTypeLabel(eventType: string): string {
  switch (eventType) {
    case "museum":
      return "Museums & Attractions";
    case "outdoor":
      return "Parks & Nature";
    case "performance":
      return "Theaters & Performance";
    case "sports":
      return "Sports & Fitness";
    case "educational":
      return "Educational";
    case "food":
      return "Food & Dining";
    case "seasonal":
      return "Seasonal & Holiday";
    case "class":
      return "Classes & Workshops";
    case "camp":
      return "Camps & Programs";
    case "other":
      return "Other Events";
    default:
      return eventType.charAt(0).toUpperCase() + eventType.slice(1);
  }
}
