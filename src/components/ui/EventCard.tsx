import { BaltimoreEvent } from "@/lib/supabase";
import {
  formatDate,
  getCostBadgeClass,
  getCategoryBorderColor,
  getAgeLabel,
  getEventTypeIcon,
  getVenueSourceBadgeLabel,
  getVenueSourceBadgeColor,
  getAudienceBadgeLabel,
} from "@/lib/event-helpers";

interface EventCardProps {
  event: BaltimoreEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const linkUrl = event.original_event_url || event.registration_url || event.source_url;

  return (
    <div className={`card group relative bg-white border border-[var(--muted)]/20 rounded-xl p-5 border-l-4 ${getCategoryBorderColor(event.event_type)} transition-all duration-drift hover:-translate-y-1 hover:shadow-card-hover`}>
      {/* Subtle wave texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-xl"
        style={{ backgroundImage: "url('/brand/patterns/wave-single.svg')", backgroundSize: "200px" }}
      />

      {/* Header with icon and date */}
      <div className="relative flex items-start justify-between mb-3">
        <span className="text-2xl" aria-hidden="true">
          {getEventTypeIcon(event.event_type)}
        </span>
        <span className="text-sm text-[var(--muted)] flex items-center gap-1">
          <span className="text-[var(--color-crab)]">🦀</span>
          {formatDate(event.event_date_start)}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative text-lg font-semibold text-[var(--text-dark)] mb-2 line-clamp-2 group-hover:text-[var(--color-charm)] transition-colors duration-drift">
        {event.title}
      </h3>

      {/* Venue */}
      {event.venue && (
        <p className="relative text-sm text-[var(--text)] mb-2 line-clamp-1">
          📍 {event.venue}
        </p>
      )}

      {/* Time */}
      {event.event_time && (
        <p className="relative text-sm text-[var(--muted)] mb-3">
          🕐 {event.event_time}
        </p>
      )}

      {/* Badges */}
      <div className="relative flex flex-wrap gap-2 mb-4">
        {/* Cost badge - larger for free events */}
        {event.cost_type && (
          <span
            className={`badge rounded-full font-medium ${
              event.cost_type === "free"
                ? "text-sm px-3 py-1.5 uppercase"
                : "text-xs px-2 py-1"
            } ${getCostBadgeClass(event.cost_type)}`}
          >
            {event.cost_type === "free"
              ? "FREE"
              : event.cost_amount || event.cost_type}
          </span>
        )}

        {/* Age badge - using agent toddler purple */}
        {event.age_range_category && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-[var(--color-agent-toddler)]/10 text-[var(--color-agent-toddler)] font-medium">
            {getAgeLabel(event.age_range_category)}
          </span>
        )}

        {/* Venue type badge - using charm blue */}
        {event.venue_type && event.venue_type !== "unknown" && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-[var(--color-charm)]/10 text-[var(--color-charm)] font-medium">
            {event.venue_type === "outdoor"
              ? "Outdoor"
              : event.venue_type === "indoor"
              ? "Indoor"
              : event.venue_type === "virtual"
              ? "Virtual"
              : "Indoor/Outdoor"}
          </span>
        )}

        {/* Venue source badge — Faith & Community in Calvert Gold */}
        {event.venue_source_category && getVenueSourceBadgeLabel(event.venue_source_category) && (
          <span className={`badge text-xs px-2 py-1 rounded-full font-medium ${getVenueSourceBadgeColor(event.venue_source_category)}`}>
            {getVenueSourceBadgeLabel(event.venue_source_category)}
          </span>
        )}

        {/* Audience openness badge */}
        {event.audience_openness === "open_to_all" && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
            {getAudienceBadgeLabel(event.audience_openness)}
          </span>
        )}
      </div>

      {/* Summary */}
      {event.summary && (
        <p className="relative text-sm text-[var(--text)] mb-4 line-clamp-2">
          {event.summary}
        </p>
      )}

      {/* Link */}
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center text-sm font-medium text-[var(--color-crab)] hover:text-[var(--color-charm)] transition-colors duration-drift no-underline hover:no-underline"
        >
          View Details <span className="ml-1 group-hover:translate-x-1 transition-transform duration-drift">→</span>
        </a>
      )}
    </div>
  );
}
