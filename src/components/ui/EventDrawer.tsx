"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import EventDrawerCard from "@/components/ui/EventDrawerCard";
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

const INITIAL_PER_CATEGORY = 3;

export default function EventDrawer({
  isOpen,
  selectedDate,
  events,
  onClose,
}: EventDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Reset expanded categories when date changes
  useEffect(() => {
    setExpandedCategories(new Set());
  }, [selectedDate]);

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
  const useGroupedView = eventCount >= 10;

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Render grouped view
  const renderGroupedEvents = () => {
    const grouped = groupEventsByType(events);
    const sortedCategories = Array.from(grouped.entries()).sort(
      (a, b) => b[1].length - a[1].length
    );

    return (
      <div className="space-y-5">
        {sortedCategories.map(([category, categoryEvents]) => {
          const isExpanded = expandedCategories.has(category);
          const visibleEvents = isExpanded
            ? categoryEvents
            : categoryEvents.slice(0, INITIAL_PER_CATEGORY);
          const hiddenCount = categoryEvents.length - INITIAL_PER_CATEGORY;

          return (
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
                {visibleEvents.map((event) => (
                  <EventDrawerCard key={event.id} event={event} />
                ))}
              </div>

              {/* Show more button */}
              {hiddenCount > 0 && !isExpanded && (
                <button
                  onClick={() => toggleCategory(category)}
                  className="mt-2 text-sm text-[var(--color-charm)] font-medium hover:text-[var(--color-crab)] transition-colors"
                >
                  Show {hiddenCount} more
                </button>
              )}
              {isExpanded && hiddenCount > 0 && (
                <button
                  onClick={() => toggleCategory(category)}
                  className="mt-2 text-sm text-[var(--color-charm)] font-medium hover:text-[var(--color-crab)] transition-colors"
                >
                  Show less
                </button>
              )}
            </div>
          );
        })}
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
            useGroupedView ? renderGroupedEvents() : renderFlatEvents()
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
