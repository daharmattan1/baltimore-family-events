import type { BaltimoreEvent } from "@/lib/supabase";
import {
  getEventTypeIcon,
  getCostBadgeClass,
  getCategoryBorderColor,
  getAgeLabel,
} from "@/lib/event-helpers";

interface EventDrawerCardProps {
  event: BaltimoreEvent;
}

export default function EventDrawerCard({ event }: EventDrawerCardProps) {
  const linkUrl = event.original_event_url || event.registration_url || event.source_url;

  return (
    <div
      className={`bg-white border border-[var(--muted)]/20 rounded-lg p-3 border-l-4 ${getCategoryBorderColor(event.event_type)} transition-all duration-drift hover:shadow-sm`}
    >
      {/* Top row: icon + title + time */}
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0" aria-hidden="true">
          {getEventTypeIcon(event.event_type)}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-[var(--color-boh)] line-clamp-2 leading-snug">
            {event.title}
          </h4>
          {event.event_time && (
            <p className="text-xs text-[var(--muted)] mt-0.5">
              {event.event_time}
            </p>
          )}
        </div>
      </div>

      {/* Venue */}
      {event.venue && (
        <p className="text-xs text-[var(--color-harbor)] mt-1.5 line-clamp-1">
          📍 {event.venue}
        </p>
      )}

      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {event.cost_type && (
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getCostBadgeClass(event.cost_type)}`}
          >
            {event.cost_type === "free" ? "FREE" : event.cost_amount || event.cost_type}
          </span>
        )}
        {event.age_range_category && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-agent-toddler)]/10 text-[var(--color-agent-toddler)] font-medium">
            {getAgeLabel(event.age_range_category)}
          </span>
        )}
      </div>

      {/* Link */}
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs font-medium text-[var(--color-crab)] hover:text-[var(--color-charm)] mt-2 no-underline hover:no-underline transition-colors duration-drift"
        >
          View Details →
        </a>
      )}
    </div>
  );
}
