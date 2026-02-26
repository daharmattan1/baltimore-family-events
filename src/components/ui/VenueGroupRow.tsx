"use client";

import { BaltimoreEvent } from "@/lib/supabase";
import { pushEvent } from "@/lib/analytics";
import {
  getEventTypeIcon,
  getCostBadgeClass,
  getAgeLabel,
} from "@/lib/event-helpers";

interface VenueGroupRowProps {
  event: BaltimoreEvent;
  venueName: string;
  groupEventCount: number;
}

export default function VenueGroupRow({
  event,
  venueName,
  groupEventCount,
}: VenueGroupRowProps) {
  const linkUrl =
    event.original_event_url || event.registration_url || event.source_url;

  return (
    <div className="flex items-center gap-2 py-2 px-1 text-sm border-b border-[var(--muted)]/10 last:border-b-0">
      {/* Event type icon */}
      <span className="text-base flex-shrink-0" aria-hidden="true">
        {getEventTypeIcon(event.event_type)}
      </span>

      {/* Title */}
      <span className="flex-1 min-w-0 text-[var(--text-dark)] font-medium line-clamp-1">
        {linkUrl ? (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushEvent("venue_group_event_click", {
                venue_name: venueName,
                event_count: groupEventCount,
                clicked_event: event.title || "",
              })
            }
            className="hover:text-[var(--color-charm)] transition-colors duration-drift no-underline hover:no-underline"
          >
            {event.title}
          </a>
        ) : (
          event.title
        )}
      </span>

      {/* Time */}
      {event.event_time && (
        <span className="flex-shrink-0 text-xs text-[var(--muted)]">
          {event.event_time}
        </span>
      )}

      {/* Cost badge (compact) */}
      {event.cost_type && (
        <span
          className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full font-medium ${getCostBadgeClass(event.cost_type)}`}
        >
          {event.cost_type === "free"
            ? "FREE"
            : event.cost_amount || event.cost_type}
        </span>
      )}

      {/* Age badge (compact) */}
      {event.age_range_category && (
        <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-[var(--color-agent-toddler)]/10 text-[var(--color-agent-toddler)] font-medium">
          {getAgeLabel(event.age_range_category)}
        </span>
      )}
    </div>
  );
}
