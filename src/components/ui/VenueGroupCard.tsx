"use client";

import { useState } from "react";
import { pushEvent } from "@/lib/analytics";
import {
  formatDate,
  getCategoryBorderColor,
  getCostBadgeClass,
  getAgeLabel,
  getEventTypeIcon,
  getVenueSourceBadgeLabel,
  getVenueSourceBadgeColor,
} from "@/lib/event-helpers";
import type { VenueGroup } from "@/lib/event-helpers";
import VenueGroupRow from "./VenueGroupRow";

interface VenueGroupCardProps {
  group: VenueGroup;
}

export default function VenueGroupCard({ group }: VenueGroupCardProps) {
  const [expanded, setExpanded] = useState(false);

  const previewCount = typeof window !== "undefined" && window.innerWidth < 640 ? 2 : 3;
  const previewEvents = group.events.slice(0, previewCount);
  const remainingCount = group.events.length - previewCount;

  const handleToggle = () => {
    const next = !expanded;
    setExpanded(next);
    pushEvent(next ? "venue_group_expand" : "venue_group_collapse", {
      venue_name: group.venue,
      event_count: group.events.length,
    });
  };

  return (
    <div
      className={`card group relative bg-white border border-[var(--muted)]/20 rounded-xl p-5 border-l-4 ${getCategoryBorderColor(group.dominantEventType)} transition-all duration-drift hover:-translate-y-1 hover:shadow-card-hover`}
    >
      {/* Subtle wave texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-xl"
        style={{
          backgroundImage: "url('/brand/patterns/wave-single.svg')",
          backgroundSize: "200px",
        }}
      />

      {/* Header: venue name + count + date */}
      <div className="relative flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[var(--text-dark)] line-clamp-1">
            📍 {group.venue}
          </h3>
          <span className="inline-flex items-center gap-1.5 mt-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--color-crab)]/10 text-[var(--color-crab)]">
              {group.events.length} events
            </span>
          </span>
        </div>
        <span className="text-sm text-[var(--muted)] flex items-center gap-1 flex-shrink-0 ml-2">
          <span className="text-[var(--color-crab)]">🦀</span>
          {formatDate(group.date)}
        </span>
      </div>

      {/* Aggregated badges */}
      <div className="relative flex flex-wrap gap-2 mb-3">
        {group.sharedBadges.costType === "free" && (
          <span
            className={`badge text-sm px-3 py-1.5 rounded-full font-medium uppercase ${getCostBadgeClass("free")}`}
          >
            FREE
          </span>
        )}
        {group.sharedBadges.costType === "mixed" && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
            Free + Paid
          </span>
        )}
        {group.sharedBadges.ageRange !== "mixed" && group.sharedBadges.ageRange && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-[var(--color-agent-toddler)]/10 text-[var(--color-agent-toddler)] font-medium">
            {getAgeLabel(group.sharedBadges.ageRange)}
          </span>
        )}
        {group.sharedBadges.venueSourceCategory &&
          getVenueSourceBadgeLabel(group.sharedBadges.venueSourceCategory) && (
            <span
              className={`badge text-xs px-2 py-1 rounded-full font-medium ${getVenueSourceBadgeColor(group.sharedBadges.venueSourceCategory)}`}
            >
              {getVenueSourceBadgeLabel(group.sharedBadges.venueSourceCategory)}
            </span>
          )}
      </div>

      {/* Event preview (collapsed) */}
      {!expanded && (
        <div className="relative space-y-1 mb-3">
          {previewEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-2 text-sm text-[var(--text)]">
              <span className="text-base" aria-hidden="true">
                {getEventTypeIcon(event.event_type)}
              </span>
              <span className="line-clamp-1 flex-1">{event.title}</span>
              {event.event_time && (
                <span className="text-xs text-[var(--muted)] flex-shrink-0">
                  {event.event_time}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Expanded event list */}
      <div
        className="relative overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
        }}
      >
        <div className="min-h-0">
          <div className="border-t border-[var(--muted)]/10 pt-2">
            {group.events.map((event) => (
              <VenueGroupRow
                key={event.id}
                event={event}
                venueName={group.venue}
                groupEventCount={group.events.length}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Expand/collapse trigger */}
      <button
        onClick={handleToggle}
        className="relative flex items-center gap-1 text-sm font-medium text-[var(--color-harbor)] hover:text-[var(--color-charm)] transition-colors duration-drift mt-2 min-h-[44px]"
        aria-expanded={expanded}
      >
        {expanded ? (
          <>
            Show less{" "}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </>
        ) : (
          <>
            Show all {group.events.length} events{" "}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
