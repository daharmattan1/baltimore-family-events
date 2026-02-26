"use client";

import { useEffect, useRef, useCallback } from "react";
import EventDrawerCard from "@/components/ui/EventDrawerCard";
import VenueGroupRow from "@/components/ui/VenueGroupRow";
import { groupEventsByType, getEventTypeLabel, getEventTypeIcon } from "@/lib/event-helpers";
import type { BaltimoreEvent } from "@/lib/supabase";

interface EventDrawerProps {
  isOpen: boolean;
  selectedDate: string;
  events: BaltimoreEvent[];
  onClose: () => void;
}

// Format a YYYY-MM-DD string into a readable date
function formatDrawerDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00"); // noon to avoid timezone shift
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function EventDrawer({
  isOpen,
  selectedDate,
  events,
  onClose,
}: EventDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Focus management and scroll lock
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // Focus the drawer
      setTimeout(() => drawerRef.current?.focus(), 100);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      // Return focus
      previousFocusRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const dateLabel = selectedDate ? formatDrawerDate(selectedDate) : "";
  const eventCount = events.length;

  // Check if any venue has 3+ events — if so, use venue grouping
  const venueCounts = new Map<string, BaltimoreEvent[]>();
  for (const e of events) {
    const v = (e.venue || "").toLowerCase().trim();
    if (!v) continue;
    if (!venueCounts.has(v)) venueCounts.set(v, []);
    venueCounts.get(v)!.push(e);
  }
  const hasVenueClusters = Array.from(venueCounts.values()).some((g) => g.length >= 3);
  const useGroupedView = !hasVenueClusters && eventCount >= 10;

  // Render venue-grouped view (when venue clusters exist)
  const renderVenueGroupedEvents = () => {
    // Separate clustered venues (3+) from singletons
    const venueGroups: { venue: string; events: BaltimoreEvent[] }[] = [];
    const ungrouped: BaltimoreEvent[] = [];
    const processed = new Set<number>();

    for (const [, group] of venueCounts) {
      if (group.length >= 3) {
        venueGroups.push({
          venue: group[0].venue || "",
          events: group.sort(
            (a, b) => (b.family_friendly_score ?? 0) - (a.family_friendly_score ?? 0)
          ),
        });
        for (const e of group) processed.add(e.id);
      }
    }
    for (const e of events) {
      if (!processed.has(e.id)) ungrouped.push(e);
    }

    return (
      <div className="space-y-5">
        {venueGroups.map((vg) => (
          <div key={vg.venue}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">📍</span>
              <h4 className="font-display text-sm font-semibold text-[var(--color-boh)]">
                {vg.venue}
              </h4>
              <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-[var(--color-crab)]/10 text-[var(--color-crab)]">
                {vg.events.length}
              </span>
            </div>
            <div className="bg-[var(--color-formstone)]/50 rounded-lg p-2">
              {vg.events.map((event) => (
                <VenueGroupRow
                  key={event.id}
                  event={event}
                  venueName={vg.venue}
                  groupEventCount={vg.events.length}
                />
              ))}
            </div>
          </div>
        ))}
        {ungrouped.length > 0 && (
          <div className="space-y-2">
            {ungrouped.map((event) => (
              <EventDrawerCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render grouped view
  const renderGroupedEvents = () => {
    const grouped = groupEventsByType(events);
    const sortedCategories = Array.from(grouped.entries()).sort(
      (a, b) => b[1].length - a[1].length
    );

    return (
      <div className="space-y-5">
        {sortedCategories.map(([category, categoryEvents]) => (
          <div key={category}>
            {/* Category header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg" aria-hidden="true">
                {getEventTypeIcon(category)}
              </span>
              <h4 className="font-display text-sm font-semibold text-[var(--color-boh)]">
                {getEventTypeLabel(category)}
              </h4>
              <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-[var(--color-crab)]/10 text-[var(--color-crab)]">
                {categoryEvents.length}
              </span>
            </div>

            {/* Events in category */}
            <div className="space-y-2">
              {categoryEvents.map((event) => (
                <EventDrawerCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render flat list
  const renderFlatEvents = () => (
    <div className="space-y-3">
      {events.map((event) => (
        <EventDrawerCard key={event.id} event={event} />
      ))}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-tide"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — Right panel on desktop, bottom sheet on mobile */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label={`Events for ${dateLabel}`}
        aria-modal="true"
        tabIndex={-1}
        className={`
          fixed z-50 bg-white shadow-lg
          transition-transform duration-tide ease-out
          focus:outline-none

          /* Mobile: bottom sheet */
          inset-x-0 bottom-0 max-h-[70vh] rounded-t-2xl

          /* Desktop: right panel */
          md:inset-y-0 md:right-0 md:left-auto
          md:w-[400px] md:max-h-none md:rounded-t-none md:rounded-l-xl

          ${isOpen
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
          }
        `}
      >
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full bg-[var(--muted)]/40" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[var(--muted)]/20">
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-[var(--color-boh)]">
              {dateLabel}
            </h3>
            <p className="text-xs text-[var(--muted)]">
              {eventCount} event{eventCount !== 1 ? "s" : ""}
              {hasVenueClusters && " · grouped by venue"}
              {useGroupedView && " · grouped by type"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--color-formstone)] transition-colors duration-drift text-[var(--color-harbor)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-charm)]"
            aria-label="Close drawer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Event list */}
        <div className="overflow-y-auto px-4 sm:px-5 py-4" style={{ maxHeight: "calc(70vh - 80px)" }}>
          {eventCount > 0 ? (
            hasVenueClusters
              ? renderVenueGroupedEvents()
              : useGroupedView
                ? renderGroupedEvents()
                : renderFlatEvents()
          ) : (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">🦀</div>
              <p className="text-sm text-[var(--color-harbor)]">
                No events on this day. Try another date!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
