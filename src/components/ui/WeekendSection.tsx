"use client";

import { useState } from "react";
import EventCard from "@/components/ui/EventCard";
import { BaltimoreEvent } from "@/lib/supabase";

interface WeekendSectionProps {
  start: string;
  end: string;
  events: BaltimoreEvent[];
  defaultOpen?: boolean;
}

function formatWeekendLabel(start: string, end: string): string {
  const fri = new Date(start + "T12:00:00");
  const sun = new Date(end + "T12:00:00");
  const month = fri.toLocaleDateString("en-US", { month: "short" });
  const friDay = fri.getDate();
  const sunDay = sun.getDate();

  // Check if this is the current weekend
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  if (todayStr >= start && todayStr <= end) {
    return `This Weekend — ${month} ${friDay}–${sunDay}`;
  }

  return `${month} ${friDay}–${sunDay}`;
}

function getDayLabel(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

export default function WeekendSection({ start, end, events, defaultOpen = false }: WeekendSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const label = formatWeekendLabel(start, end);

  // Group events by day (Fri, Sat, Sun)
  const friday = start;
  const satDate = new Date(start + "T12:00:00");
  satDate.setDate(satDate.getDate() + 1);
  const saturday = `${satDate.getFullYear()}-${String(satDate.getMonth() + 1).padStart(2, "0")}-${String(satDate.getDate()).padStart(2, "0")}`;
  const sunday = end;

  const days = [
    { date: friday, label: getDayLabel(friday), events: events.filter((e) => (e.event_date_start?.split("T")[0] || "") === friday) },
    { date: saturday, label: getDayLabel(saturday), events: events.filter((e) => (e.event_date_start?.split("T")[0] || "") === saturday) },
    { date: sunday, label: getDayLabel(sunday), events: events.filter((e) => (e.event_date_start?.split("T")[0] || "") === sunday) },
  ].filter((d) => d.events.length > 0);

  return (
    <div className="border border-[var(--muted)]/20 rounded-xl overflow-hidden">
      {/* Header — clickable to collapse/expand */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-[var(--color-formstone)] hover:bg-[var(--color-formstone)]/80 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">☀️</span>
          <div className="text-left">
            <h3 className="font-display text-lg font-semibold text-[var(--color-boh)]">
              {label}
            </h3>
            <p className="text-sm text-[var(--color-harbor)]">
              {events.length} event{events.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--color-harbor)] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="p-5 space-y-6">
          {days.map((day) => (
            <div key={day.date}>
              <h4 className="text-sm font-medium text-[var(--color-charm)] uppercase tracking-wide mb-3">
                {day.label}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {day.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))}
          {days.length === 0 && (
            <p className="text-center text-[var(--color-harbor)] py-4">
              No events found for this weekend yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
