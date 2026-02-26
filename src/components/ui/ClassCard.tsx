import { BaltimoreEvent } from "@/lib/supabase";
import {
  formatDate,
  getCostBadgeClass,
  getAgeLabel,
  getClassLinkUrl,
} from "@/lib/event-helpers";

interface ClassCardProps {
  event: BaltimoreEvent;
}

export default function ClassCard({ event }: ClassCardProps) {
  const linkUrl = getClassLinkUrl(event);

  return (
    <div className="card group relative bg-white border border-[var(--muted)]/20 rounded-xl p-5 border-l-4 border-l-[var(--color-agent-toddler)] transition-all duration-drift hover:-translate-y-1 hover:shadow-card-hover">
      {/* Header */}
      <div className="relative flex items-start justify-between mb-3">
        <span className="text-2xl" aria-hidden="true">
          {event.event_type === "camp" ? "⛺" : "🎨"}
        </span>
        {event.event_date_start && (
          <span className="text-sm text-[var(--muted)] flex items-center gap-1">
            <span className="text-[var(--color-crab)]">🦀</span>
            {formatDate(event.event_date_start)}
          </span>
        )}
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

      {/* Badges */}
      <div className="relative flex flex-wrap gap-2 mb-4">
        {/* Cost badge */}
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

        {/* Age badge */}
        {event.age_range_category && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-[var(--color-agent-toddler)]/10 text-[var(--color-agent-toddler)] font-medium">
            {getAgeLabel(event.age_range_category)}
          </span>
        )}

        {/* Registration badge */}
        {linkUrl && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-[var(--color-charm)]/10 text-[var(--color-charm)] font-medium">
            Registration
          </span>
        )}
      </div>

      {/* Summary */}
      {event.summary && (
        <p className="relative text-sm text-[var(--text)] mb-4 line-clamp-2">
          {event.summary}
        </p>
      )}

      {/* Registration Link */}
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center text-sm font-medium text-[var(--color-crab)] hover:text-[var(--color-charm)] transition-colors duration-drift no-underline hover:no-underline"
        >
          Register / Details <span className="ml-1 group-hover:translate-x-1 transition-transform duration-drift">→</span>
        </a>
      )}
    </div>
  );
}
