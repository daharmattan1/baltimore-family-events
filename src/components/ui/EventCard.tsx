import { BaltimoreEvent } from "@/lib/supabase";

interface EventCardProps {
  event: BaltimoreEvent;
}

// Format date for display
function formatDate(dateStr?: string): string {
  if (!dateStr) return "Date TBD";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Get badge color based on cost type
function getCostBadgeClass(costType?: string): string {
  switch (costType) {
    case "free":
      return "bg-green-100 text-green-800";
    case "donation":
      return "bg-blue-100 text-blue-800";
    case "paid":
      return "bg-[var(--card)] text-[var(--text)]";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

// Get age badge label
function getAgeLabel(ageRange?: string): string {
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
function getEventTypeIcon(eventType?: string): string {
  switch (eventType) {
    case "museum":
      return "🏛️";
    case "outdoor":
      return "🌳";
    case "performance":
      return "🎭";
    case "sports":
      return "⚽";
    case "educational":
      return "📚";
    case "food":
      return "🍽️";
    case "seasonal":
      return "🎉";
    case "class":
      return "🎨";
    case "camp":
      return "⛺";
    default:
      return "📅";
  }
}

export default function EventCard({ event }: EventCardProps) {
  const linkUrl = event.registration_url || event.source_url;

  return (
    <div className="bg-white border border-[var(--muted)]/20 rounded-xl p-5 hover:shadow-lg transition-shadow">
      {/* Header with icon and date */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl" aria-hidden="true">
          {getEventTypeIcon(event.event_type)}
        </span>
        <span className="text-sm text-[var(--muted)]">
          {formatDate(event.event_date_start)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2 line-clamp-2">
        {event.title}
      </h3>

      {/* Venue */}
      {event.venue && (
        <p className="text-sm text-[var(--text)] mb-2 line-clamp-1">
          📍 {event.venue}
        </p>
      )}

      {/* Time */}
      {event.event_time && (
        <p className="text-sm text-[var(--muted)] mb-3">
          🕐 {event.event_time}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Cost badge */}
        {event.cost_type && (
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${getCostBadgeClass(
              event.cost_type
            )}`}
          >
            {event.cost_type === "free"
              ? "Free"
              : event.cost_amount || event.cost_type}
          </span>
        )}

        {/* Age badge */}
        {event.age_range_category && (
          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 font-medium">
            {getAgeLabel(event.age_range_category)}
          </span>
        )}

        {/* Venue type badge */}
        {event.venue_type && event.venue_type !== "unknown" && (
          <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-800 font-medium">
            {event.venue_type === "outdoor"
              ? "Outdoor"
              : event.venue_type === "indoor"
              ? "Indoor"
              : event.venue_type === "virtual"
              ? "Virtual"
              : "Indoor/Outdoor"}
          </span>
        )}
      </div>

      {/* Summary */}
      {event.summary && (
        <p className="text-sm text-[var(--text)] mb-4 line-clamp-2">
          {event.summary}
        </p>
      )}

      {/* Link */}
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-[var(--primary)] hover:underline"
        >
          View Details →
        </a>
      )}
    </div>
  );
}
