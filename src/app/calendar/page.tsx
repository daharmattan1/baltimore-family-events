"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import EventCard from "@/components/ui/EventCard";
import FilterChipBar from "@/components/ui/FilterChipBar";
import FilterDrawer from "@/components/ui/FilterDrawer";
import ViewToggle from "@/components/ui/ViewToggle";
import CalendarGrid from "@/components/ui/CalendarGrid";
import EventDrawer from "@/components/ui/EventDrawer";
import WeekendSection from "@/components/ui/WeekendSection";
import { useCalendarNavigation } from "@/hooks/useCalendarNavigation";
import { groupEventsByDate } from "@/lib/event-helpers";
import { BaltimoreEvent } from "@/lib/supabase";

interface WeekendGroup {
  start: string;
  end: string;
  events: BaltimoreEvent[];
}

export default function CalendarPage() {
  const [events, setEvents] = useState<BaltimoreEvent[]>([]);
  const [weekendGroups, setWeekendGroups] = useState<WeekendGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar" | "weekends">("list");
  const [filters, setFilters] = useState({
    eventType: [] as string[],
    ageRange: [] as string[],
    costType: [] as string[],
    locationArea: [] as string[],
    includeFaith: false,
  });
  const [dateFilter, setDateFilter] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const {
    selectedDay,
    setSelectedDay,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    monthGrid,
    isToday,
    getMonthDateRange,
    monthLabel,
    currentMonth,
  } = useCalendarNavigation();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.eventType.length > 0) params.set("eventType", filters.eventType.join(","));
      if (filters.ageRange.length > 0) params.set("ageRange", filters.ageRange.join(","));
      if (filters.costType.length > 0) params.set("costType", filters.costType.join(","));
      if (filters.locationArea.length > 0) params.set("locationArea", filters.locationArea.join(","));
      if (filters.includeFaith) params.set("includeFaith", "true");

      if (viewMode === "weekends") {
        // Fetch weekend-grouped events
        params.set("weekends", "true");
        const response = await fetch(`/api/events?${params.toString()}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch events");
        setWeekendGroups(data.weekends || []);
        setEvents([]);
      } else if (viewMode === "calendar") {
        // In calendar view, fetch the entire displayed month
        const range = getMonthDateRange();
        params.set("startDate", range.start);
        params.set("endDate", range.end);
        params.set("limit", "200");
        const response = await fetch(`/api/events?${params.toString()}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch events");
        setEvents(data.events || []);
        setWeekendGroups([]);
      } else {
        // List view
        if (dateFilter) {
          const range = getDateRange(dateFilter);
          if (range) {
            params.set("startDate", range.start);
            params.set("endDate", range.end);
          }
        }
        const response = await fetch(`/api/events?${params.toString()}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch events");
        setEvents(data.events || []);
        setWeekendGroups([]);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [filters, dateFilter, viewMode, getMonthDateRange]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Re-fetch when month changes in calendar view
  useEffect(() => {
    if (viewMode === "calendar") {
      fetchEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, viewMode]);

  const handleFilterChange = (key: string, value: string[] | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setVisibleCount(12);
  };

  const handleClearFilters = () => {
    setFilters({ eventType: [], ageRange: [], costType: [], locationArea: [], includeFaith: false });
    setDateFilter("");
    setVisibleCount(12);
  };

  const handleViewChange = (mode: "list" | "calendar" | "weekends") => {
    setViewMode(mode);
    setSelectedDay(null);
    if (mode === "list") {
      setDateFilter("");
    }
  };

  // Events for the selected day in the drawer
  const selectedDayEvents = useMemo(() => {
    if (!selectedDay) return [];
    const grouped = groupEventsByDate(events);
    return grouped.get(selectedDay) || [];
  }, [selectedDay, events]);

  // Date filter helpers (for list view)
  const getDateRange = (preset: string): { start: string; end: string } | null => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Sun, 6=Sat

    if (preset === "weekend") {
      const saturday = new Date(today);
      saturday.setDate(today.getDate() + (6 - dayOfWeek));
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);
      return {
        start: saturday.toISOString().split("T")[0],
        end: sunday.toISOString().split("T")[0],
      };
    } else if (preset === "this-week") {
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (7 - dayOfWeek));
      return {
        start: today.toISOString().split("T")[0],
        end: endOfWeek.toISOString().split("T")[0],
      };
    } else if (preset === "this-month") {
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return {
        start: today.toISOString().split("T")[0],
        end: endOfMonth.toISOString().split("T")[0],
      };
    }
    return null;
  };

  const handleDateFilter = (preset: string) => {
    setDateFilter((prev) => (prev === preset ? "" : preset));
    setVisibleCount(12);
  };

  // Total weekend events count
  const totalWeekendEvents = weekendGroups.reduce((sum, w) => sum + w.events.length, 0);

  return (
    <div>
      {/* Hero Header */}
      <section className="relative py-8 sm:py-10 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 70% 30%, rgba(0, 119, 182, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, rgba(0, 119, 182, 0.03) 0%, var(--color-rowhouse) 100%)
            `
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-charm)] font-medium mb-2 tracking-wide uppercase text-sm">
            Explore Events
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-boh)] mb-3">
            Find Your Weekend
          </h1>
          <p className="text-[var(--color-harbor)] max-w-2xl">
            Filter by age, price, or type to discover your perfect Saturday across 5 counties.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-4 overflow-hidden">
          <Image
            src="/brand/dividers/wave-divider.svg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <ViewToggle viewMode={viewMode} onViewChange={handleViewChange} />
          {viewMode === "calendar" && (
            <p className="text-sm text-[var(--muted)] hidden sm:block">
              Click a day to see events
            </p>
          )}
        </div>

        {/* Unified Filter Chip Bar */}
        <div className="mb-4">
          <FilterChipBar
            filters={filters}
            dateFilter={dateFilter}
            viewMode={viewMode}
            onFilterChange={handleFilterChange}
            onDateFilterChange={handleDateFilter}
            onToggleDrawer={() => setShowDrawer((prev) => !prev)}
            onClearFilters={handleClearFilters}
            isDrawerOpen={showDrawer}
          />
        </div>

        {/* Collapsible Filter Drawer */}
        <FilterDrawer
          isOpen={showDrawer}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onClose={() => setShowDrawer(false)}
        />

        {/* Loading State */}
        {loading && (
          <div className={viewMode === "calendar" ? "" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
            {viewMode === "calendar" ? (
              <div className="bg-white rounded-xl border border-[var(--muted)]/20 p-8 text-center animate-pulse">
                <div className="h-6 bg-[var(--muted)]/30 rounded w-48 mx-auto mb-6"></div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="h-12 bg-[var(--muted)]/10 rounded"></div>
                  ))}
                </div>
              </div>
            ) : viewMode === "weekends" ? (
              <div className="col-span-full space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white border border-[var(--muted)]/20 rounded-xl p-6 animate-pulse">
                    <div className="h-5 bg-[var(--muted)]/30 rounded w-48 mb-3"></div>
                    <div className="h-4 bg-[var(--muted)]/20 rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-[var(--muted)]/20 rounded-xl p-6 animate-pulse"
                >
                  <div className="h-4 bg-[var(--muted)]/30 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-[var(--muted)]/20 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-[var(--muted)]/20 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-[var(--muted)]/20 rounded w-1/3"></div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-[var(--color-crossland)]/5 border border-[var(--color-crossland)]/20 rounded-xl p-6 text-center">
            <p className="text-[var(--color-crossland)] mb-4">{error}</p>
            <button
              onClick={fetchEvents}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ===== WEEKENDS VIEW ===== */}
        {viewMode === "weekends" && !loading && !error && (
          <>
            <p className="text-sm text-[var(--muted)] mb-4 flex items-center gap-2">
              <span className="text-[var(--color-crab)]">🦀</span>
              {totalWeekendEvents} event{totalWeekendEvents !== 1 ? "s" : ""} across {weekendGroups.length} weekends
            </p>
            <div className="space-y-4">
              {weekendGroups.map((weekend, idx) => (
                <WeekendSection
                  key={weekend.start}
                  start={weekend.start}
                  end={weekend.end}
                  events={weekend.events}
                  defaultOpen={idx === 0}
                />
              ))}
            </div>
          </>
        )}

        {/* ===== CALENDAR VIEW ===== */}
        {viewMode === "calendar" && !loading && !error && (
          <>
            <p className="text-sm text-[var(--muted)] mb-4 flex items-center gap-2">
              <span className="text-[var(--color-crab)]">🦀</span>
              {events.length} event{events.length !== 1 ? "s" : ""} this month
            </p>
            <CalendarGrid
              events={events}
              monthGrid={monthGrid}
              monthLabel={monthLabel}
              selectedDay={selectedDay}
              isToday={isToday}
              onDaySelect={(dateStr) => setSelectedDay(selectedDay === dateStr ? null : dateStr)}
              onPrevMonth={goToPreviousMonth}
              onNextMonth={goToNextMonth}
              onToday={goToToday}
            />
            <EventDrawer
              isOpen={!!selectedDay}
              selectedDate={selectedDay || ""}
              events={selectedDayEvents}
              onClose={() => setSelectedDay(null)}
            />
          </>
        )}

        {/* ===== LIST VIEW ===== */}
        {viewMode === "list" && !loading && !error && events.length > 0 && (
          <>
            <p className="text-sm text-[var(--muted)] mb-4 flex items-center gap-2">
              <span className="text-[var(--color-crab)]">🦀</span>
              Showing {Math.min(visibleCount, events.length)} of {events.length} event{events.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, visibleCount).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {visibleCount < events.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="btn btn-secondary"
                >
                  Show 12 more
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State — list view only */}
        {viewMode === "list" && !loading && !error && events.length === 0 && (
          <div className="bg-[var(--color-formstone)] rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🦀</div>
            <p className="text-[var(--color-harbor)] mb-4">
              No perfect matches yet. Try loosening your filters — there are gems hiding!
            </p>
            <button
              onClick={handleClearFilters}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
