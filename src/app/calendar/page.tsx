"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import EventCard from "@/components/ui/EventCard";
import FilterBar from "@/components/ui/FilterBar";
import ViewToggle from "@/components/ui/ViewToggle";
import CalendarGrid from "@/components/ui/CalendarGrid";
import EventDrawer from "@/components/ui/EventDrawer";
import { useCalendarNavigation } from "@/hooks/useCalendarNavigation";
import { groupEventsByDate } from "@/lib/event-helpers";
import { BaltimoreEvent } from "@/lib/supabase";

export default function CalendarPage() {
  const [events, setEvents] = useState<BaltimoreEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [filters, setFilters] = useState({
    eventType: "",
    ageRange: "",
    costType: "",
  });
  const [dateFilter, setDateFilter] = useState("");

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
      if (filters.eventType) params.set("eventType", filters.eventType);
      if (filters.ageRange) params.set("ageRange", filters.ageRange);
      if (filters.costType) params.set("costType", filters.costType);

      if (viewMode === "calendar") {
        // In calendar view, fetch the entire displayed month
        const range = getMonthDateRange();
        params.set("startDate", range.start);
        params.set("endDate", range.end);
        params.set("limit", "200");
      } else if (dateFilter) {
        // In list view, use date filter pills
        const range = getDateRange(dateFilter);
        if (range) {
          params.set("startDate", range.start);
          params.set("endDate", range.end);
        }
      }

      const response = await fetch(`/api/events?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch events");
      }

      setEvents(data.events || []);
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

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ eventType: "", ageRange: "", costType: "" });
    setDateFilter("");
  };

  const handleViewChange = (mode: "list" | "calendar") => {
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
  };

  // Quick filter handlers
  const handleQuickFilter = (filterType: string) => {
    if (filterType === "free") {
      setFilters((prev) => ({
        ...prev,
        costType: prev.costType === "free" ? "" : "free",
      }));
    } else if (filterType === "toddler") {
      setFilters((prev) => ({
        ...prev,
        ageRange: prev.ageRange === "toddler" ? "" : "toddler",
      }));
    } else if (filterType === "outdoor") {
      setFilters((prev) => ({
        ...prev,
        eventType: prev.eventType === "outdoor" ? "" : "outdoor",
      }));
    }
  };

  return (
    <div>
      {/* Hero Header */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
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
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-3">
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

        {/* Date Filter Pills — only in list view */}
        {viewMode === "list" && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs text-[var(--muted)] self-center mr-1 font-medium uppercase tracking-wide">When:</span>
            <button
              onClick={() => handleDateFilter("weekend")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-drift ${
                dateFilter === "weekend"
                  ? "bg-[var(--color-charm)] text-white shadow-sm"
                  : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-charm)]/10"
              }`}
            >
              This Weekend
            </button>
            <button
              onClick={() => handleDateFilter("this-week")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-drift ${
                dateFilter === "this-week"
                  ? "bg-[var(--color-charm)] text-white shadow-sm"
                  : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-charm)]/10"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => handleDateFilter("this-month")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-drift ${
                dateFilter === "this-month"
                  ? "bg-[var(--color-charm)] text-white shadow-sm"
                  : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-charm)]/10"
              }`}
            >
              This Month
            </button>
          </div>
        )}

        {/* Quick Filter Pills — both views */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs text-[var(--muted)] self-center mr-1 font-medium uppercase tracking-wide">Filter:</span>
          <button
            onClick={() => handleQuickFilter("free")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-drift ${
              filters.costType === "free"
                ? "bg-[var(--color-seafoam)] text-[var(--color-boh)] shadow-sm"
                : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-seafoam)]/20"
            }`}
          >
            💰 Free Only
          </button>
          <button
            onClick={() => handleQuickFilter("toddler")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-drift ${
              filters.ageRange === "toddler"
                ? "bg-[var(--color-agent-toddler)] text-white shadow-sm"
                : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-agent-toddler)]/10"
            }`}
          >
            👶 Ages 0-4
          </button>
          <button
            onClick={() => handleQuickFilter("outdoor")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-drift ${
              filters.eventType === "outdoor"
                ? "bg-[var(--color-seafoam)] text-[var(--color-boh)] shadow-sm"
                : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-seafoam)]/20"
            }`}
          >
            🌳 Outdoor
          </button>
        </div>

        {/* Filters (dropdown selects) */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
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
              Showing {events.length} event{events.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
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
