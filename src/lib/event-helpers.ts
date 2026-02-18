import { BaltimoreEvent } from "@/lib/supabase";

// Format date for display
export function formatDate(dateStr?: string): string {
  if (!dateStr) return "Date TBD";
  const date = new Date(dateStr);
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

// Group events by date (YYYY-MM-DD key)
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
