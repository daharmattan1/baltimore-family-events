"use client";

import { useEffect, useRef, useCallback } from "react";
import EventDrawerCard from "@/components/ui/EventDrawerCard";
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
        <div className="overflow-y-auto px-4 sm:px-5 py-4 space-y-3" style={{ maxHeight: "calc(70vh - 80px)" }}>
          {eventCount > 0 ? (
            events.map((event) => (
              <EventDrawerCard key={event.id} event={event} />
            ))
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
