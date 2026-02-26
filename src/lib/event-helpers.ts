import { BaltimoreEvent } from "@/lib/supabase";

// --- Aggregator URL Filter ---
// NEVER link to aggregator calendar pages. BmoreFamilies curates original sources.
const BLOCKED_DOMAINS = [
  "macaronikid.com",
  "baltimoreschild.com",
  "inoreader.com",
];

function isBlockedUrl(url: string | null | undefined): boolean {
  if (!url) return true;
  return BLOCKED_DOMAINS.some((domain) => url.includes(domain));
}

/**
 * Get the best available link URL for an event, filtering out aggregator URLs.
 * Returns null if no clean URL is available (rather than showing an aggregator link).
 */
export function getEventLinkUrl(event: BaltimoreEvent): string | null {
  const candidates = [
    event.original_event_url,
    event.registration_url,
    event.source_url,
  ];
  for (const url of candidates) {
    if (url && !isBlockedUrl(url)) return url;
  }
  return null;
}

/**
 * Same as getEventLinkUrl but prioritizes registration_url (for classes/programs).
 */
export function getClassLinkUrl(event: BaltimoreEvent): string | null {
  const candidates = [
    event.registration_url,
    event.original_event_url,
    event.source_url,
  ];
  for (const url of candidates) {
    if (url && !isBlockedUrl(url)) return url;
  }
  return null;
}

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
      .map((w) => w.replace(/s$/, "")) // naive stemming: strip trailing s
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}

// Normalize a title for comparison: lowercase, strip punctuation, collapse whitespace
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Normalize venue/title text for keying and comparison.
// Includes light abbreviation expansion to catch common venue variants.
function normalizeDedupText(value: string): string {
  return normalizeTitle(value)
    .replace(/\bctr\b/g, "center")
    .replace(/\bst\b/g, "street")
    .replace(/\bave\b/g, "avenue")
    .replace(/\bblvd\b/g, "boulevard")
    .replace(/\s+/g, " ")
    .trim();
}

function dateKeyForEvent(event: BaltimoreEvent): string {
  return event.event_date_start
    ? event.event_date_start.split("T")[0]
    : "no_date";
}

function dedupPrimaryKey(event: BaltimoreEvent): string | null {
  const dateKey = dateKeyForEvent(event);
  const coalesced = normalizeDedupText(event.venue || event.title || "");
  if (!coalesced) return null;
  return `${coalesced}|${dateKey}`;
}

function qualityScore(event: BaltimoreEvent): number {
  const familyScore = event.family_friendly_score ?? 0;
  const featuredBoost = event.featured_worthy ? 1 : 0;
  const linkBoost =
    (event.registration_url ? 1 : 0) +
    (event.original_event_url ? 1 : 0) +
    (event.source_url ? 1 : 0);
  const summaryLen = (event.summary || "").length;
  const contentLen = (event.content || "").length;
  const detailBoost = Math.min(summaryLen + contentLen, 1000) / 1000;
  return familyScore * 10 + featuredBoost + linkBoost * 0.25 + detailBoost;
}

function chooseSurvivor(a: BaltimoreEvent, b: BaltimoreEvent): BaltimoreEvent {
  const aScore = qualityScore(a);
  const bScore = qualityScore(b);
  if (aScore === bScore) {
    return (b.title || "").length > (a.title || "").length ? b : a;
  }
  return bScore > aScore ? b : a;
}

function collapsePrimaryBucket(events: BaltimoreEvent[]): BaltimoreEvent[] {
  if (events.length <= 1) return events;

  const survivors: BaltimoreEvent[] = [];
  const sorted = [...events].sort((a, b) => qualityScore(b) - qualityScore(a));

  for (const event of sorted) {
    const duplicateIdx = survivors.findIndex((existing) =>
      titlesAreSimilar(
        event.title || "",
        existing.title || "",
        event.venue || existing.venue || ""
      )
    );

    if (duplicateIdx === -1) {
      survivors.push(event);
      continue;
    }

    survivors[duplicateIdx] = chooseSurvivor(survivors[duplicateIdx], event);
  }

  return survivors;
}

// Strip venue name from a title to avoid inflated word counts.
// Many titles embed the venue name (e.g., "Walters Art Museum Drop-in Art Making").
function stripVenueName(title: string, venue: string): string {
  if (!venue) return title;
  const normalizedVenue = normalizeTitle(venue);
  const normalizedTitle = normalizeTitle(title);
  // Remove the venue name (and common prefixes like "the") from the title
  const venueWithoutThe = normalizedVenue.replace(/^the\s+/, "");
  const stripped = normalizedTitle
    .replace(normalizedVenue, "")
    .replace(venueWithoutThe, "")
    .replace(/\s+/g, " ")
    .trim();
  return stripped || normalizedTitle; // fallback to original if stripping removes everything
}

// Check if one title is a prefix of the other (after normalization).
// Catches patterns like "Pi(e) Day" vs "Pi(e) Day celebration combining math..."
function titleIsPrefixOf(a: string, b: string): boolean {
  const normA = normalizeTitle(a);
  const normB = normalizeTitle(b);
  if (normA.length === 0 || normB.length === 0) return false;
  const shorter = normA.length <= normB.length ? normA : normB;
  const longer = normA.length <= normB.length ? normB : normA;
  // Shorter must be at least 40% the length of the longer to count as a prefix match
  if (shorter.length / longer.length < 0.4) return false;
  return longer.startsWith(shorter);
}

// Check if two titles are semantically similar (≥35% word overlap) or one is a prefix of the other.
// Threshold lowered from 50% because this is gated behind same venue + same date.
function titlesAreSimilar(a: string, b: string, venue?: string): boolean {
  // Quick prefix check first
  if (titleIsPrefixOf(a, b)) return true;

  // Strip venue name before word comparison to avoid inflated overlap
  const cleanA = venue ? stripVenueName(a, venue) : a;
  const cleanB = venue ? stripVenueName(b, venue) : b;

  const wordsA = getSignificantWords(cleanA);
  const wordsB = getSignificantWords(cleanB);
  if (wordsA.size === 0 || wordsB.size === 0) return false;
  let overlap = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) overlap++;
  }
  const smaller = Math.min(wordsA.size, wordsB.size);
  return overlap / smaller >= 0.35;
}

// Deduplicate events, keeping the highest-scored entry.
// Two passes: (1) exact normalized title+date, (2) same venue+date with similar titles.
export function deduplicateEvents(
  events: BaltimoreEvent[]
): BaltimoreEvent[] {
  // Pass 1: deterministic survivor selection by COALESCE(venue, title) + date.
  // Within each key bucket, keep only near-identical title variants.
  const primaryBuckets = new Map<string, BaltimoreEvent[]>();
  const passthrough: BaltimoreEvent[] = [];
  for (const event of events) {
    const key = dedupPrimaryKey(event);
    if (!key) {
      passthrough.push(event);
      continue;
    }

    const existing = primaryBuckets.get(key) || [];
    existing.push(event);
    primaryBuckets.set(key, existing);
  }

  const afterPrimary: BaltimoreEvent[] = [...passthrough];
  for (const bucket of primaryBuckets.values()) {
    afterPrimary.push(...collapsePrimaryBucket(bucket));
  }

  // Pass 2: fuzzy cleanup for remaining near-duplicates on the same date.
  // Handles venue spelling variants and records missing venue fields.
  const result: BaltimoreEvent[] = [];
  for (const event of afterPrimary) {
    const dateKey = dateKeyForEvent(event);
    const venue = normalizeDedupText(event.venue || "");

    const duplicate = result.find((existing) => {
      const existingDate = dateKeyForEvent(existing);
      if (dateKey !== existingDate) return false;

      const existingVenue = normalizeDedupText(existing.venue || "");
      const sameVenue = Boolean(venue && existingVenue && venue === existingVenue);
      const titleSimilar = titlesAreSimilar(
        event.title || "",
        existing.title || "",
        event.venue || existing.venue || ""
      );
      const venueMissingOnEitherSide = !venue || !existingVenue;

      return (
        sameVenue ||
        (titleSimilar && venueMissingOnEitherSide)
      );
    });

    if (duplicate) {
      const survivor = chooseSurvivor(duplicate, event);
      if (survivor !== duplicate) {
        const idx = result.indexOf(duplicate);
        result[idx] = survivor;
      }
    } else {
      result.push(event);
    }
  }

  return result;
}

// Group events by date (YYYY-MM-DD key)
// Note: expects already-deduplicated events (API layer handles dedup)
export function groupEventsByDate(
  events: BaltimoreEvent[]
): Map<string, BaltimoreEvent[]> {
  const grouped = new Map<string, BaltimoreEvent[]>();
  for (const event of events) {
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

      const eventUrl = getEventLinkUrl(event);
      if (eventUrl) {
        jsonLd.url = eventUrl;
      }

      return jsonLd;
    });
}

// --- Venue Grouping ---

// A group of events at the same venue on the same day
export interface VenueGroup {
  type: "venue-group";
  venue: string;
  date: string; // YYYY-MM-DD
  events: BaltimoreEvent[];
  sharedBadges: {
    costType: "free" | "paid" | "mixed";
    ageRange: string | "mixed";
    venueType: string | null;
    venueSourceCategory: string | null;
  };
  dominantEventType: string;
}

// A single event or a venue group — used as the render item type
export type GroupedItem = BaltimoreEvent | VenueGroup;

export function isVenueGroup(item: GroupedItem): item is VenueGroup {
  return (item as VenueGroup).type === "venue-group";
}

// Compute shared badges for a group of events
function computeSharedBadges(events: BaltimoreEvent[]): VenueGroup["sharedBadges"] {
  const costTypes = new Set(events.map((e) => e.cost_type).filter(Boolean));
  const ageRanges = new Set(events.map((e) => e.age_range_category).filter(Boolean));
  const venueTypes = new Set(events.map((e) => e.venue_type).filter(Boolean));
  const venueSourceCategories = new Set(events.map((e) => e.venue_source_category).filter(Boolean));

  return {
    costType:
      costTypes.size === 1 && costTypes.has("free")
        ? "free"
        : costTypes.size === 1 && costTypes.has("paid")
          ? "paid"
          : "mixed",
    ageRange: ageRanges.size === 1 ? (ageRanges.values().next().value ?? "mixed") : "mixed",
    venueType: venueTypes.size === 1 ? (venueTypes.values().next().value ?? null) : null,
    venueSourceCategory: venueSourceCategories.size === 1
      ? (venueSourceCategories.values().next().value ?? null)
      : null,
  };
}

// Get the most common event_type in a group (mode)
function getDominantEventType(events: BaltimoreEvent[]): string {
  const counts = new Map<string, number>();
  for (const e of events) {
    const t = e.event_type || "other";
    counts.set(t, (counts.get(t) || 0) + 1);
  }
  let maxType = "other";
  let maxCount = 0;
  for (const [type, count] of counts) {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  }
  return maxType;
}

// Group events by venue+date. Events at the same venue on the same day
// with `threshold` or more entries are collapsed into a VenueGroup.
// Returns a mixed array preserving chronological order (groups appear
// at the position of their first event).
export function groupEventsByVenue(
  events: BaltimoreEvent[],
  threshold: number = 3
): GroupedItem[] {
  // Build a map of (venue+date) → events
  const clusterMap = new Map<string, BaltimoreEvent[]>();
  const clusterOrder = new Map<string, number>(); // track first-seen index

  for (let i = 0; i < events.length; i++) {
    const venue = (events[i].venue || "").trim();
    const date = events[i].event_date_start
      ? events[i].event_date_start!.split("T")[0]
      : "unknown";

    if (!venue) {
      // No venue — can't group, will be handled as singleton
      continue;
    }

    const key = `${venue.toLowerCase()}|${date}`;
    if (!clusterMap.has(key)) {
      clusterMap.set(key, []);
      clusterOrder.set(key, i);
    }
    clusterMap.get(key)!.push(events[i]);
  }

  // Determine which clusters qualify for grouping
  const groupedKeys = new Set<string>();
  for (const [key, cluster] of clusterMap) {
    if (cluster.length >= threshold) {
      groupedKeys.add(key);
    }
  }

  // Build result array preserving original order
  const result: GroupedItem[] = [];
  const emitted = new Set<string>(); // track which group keys have been emitted

  for (const event of events) {
    const venue = (event.venue || "").trim();
    const date = event.event_date_start
      ? event.event_date_start.split("T")[0]
      : "unknown";
    const key = venue ? `${venue.toLowerCase()}|${date}` : "";

    if (groupedKeys.has(key)) {
      // This event belongs to a group — emit the group at the first event's position
      if (!emitted.has(key)) {
        emitted.add(key);
        const cluster = clusterMap.get(key)!;
        result.push({
          type: "venue-group",
          venue: cluster[0].venue || venue,
          date,
          events: cluster.sort(
            (a, b) =>
              (b.family_friendly_score ?? 0) - (a.family_friendly_score ?? 0)
          ),
          sharedBadges: computeSharedBadges(cluster),
          dominantEventType: getDominantEventType(cluster),
        });
      }
      // Skip individual events that are part of a group
    } else {
      // Singleton — pass through as-is
      result.push(event);
    }
  }

  return result;
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
