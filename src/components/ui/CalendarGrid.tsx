"use client";

import { useMemo } from "react";
import CalendarDayCell from "@/components/ui/CalendarDayCell";
import { groupEventsByDate } from "@/lib/event-helpers";
import type { BaltimoreEvent } from "@/lib/supabase";
import type { CalendarDay } from "@/hooks/useCalendarNavigation";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

interface CalendarGridProps {
  events: BaltimoreEvent[];
  monthGrid: CalendarDay[];
  monthLabel: string;
  selectedDay: string | null;
  isToday: (dateStr: string) => boolean;
  onDaySelect: (dateStr: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function CalendarGrid({
  events,
  monthGrid,
  monthLabel,
  selectedDay,
  isToday,
  onDaySelect,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarGridProps) {
  // Group events by date for badge counts
  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);

  return (
    <div className="bg-white rounded-xl border border-[var(--muted)]/20 p-3 sm:p-4 shadow-sm">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-lg hover:bg-[var(--color-formstone)] transition-colors duration-drift text-[var(--color-harbor)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-charm)]"
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--color-boh)]">
            {monthLabel}
          </h2>
          <button
            onClick={onToday}
            className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-formstone)] text-[var(--color-charm)] font-medium hover:bg-[var(--color-charm)]/10 transition-colors duration-drift"
          >
            Today
          </button>
        </div>

        <button
          onClick={onNextMonth}
          className="p-2 rounded-lg hover:bg-[var(--color-formstone)] transition-colors duration-drift text-[var(--color-harbor)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-charm)]"
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Day-of-week header */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map((label, i) => (
          <div
            key={i}
            className="text-center text-xs font-medium text-[var(--muted)] uppercase tracking-wide py-1"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {monthGrid.map((day) => {
          const count = eventsByDate.get(day.dateStr)?.length || 0;
          return (
            <CalendarDayCell
              key={day.dateStr}
              dayNumber={day.date.getDate()}
              dateStr={day.dateStr}
              eventCount={count}
              isCurrentMonth={day.isCurrentMonth}
              isToday={isToday(day.dateStr)}
              isSelected={selectedDay === day.dateStr}
              onClick={() => day.isCurrentMonth && onDaySelect(day.dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
}
