"use client";

import { useEffect, useState, useCallback } from "react";
import EventCard from "@/components/ui/EventCard";
import FilterBar from "@/components/ui/FilterBar";
import { BaltimoreEvent } from "@/lib/supabase";

export default function CalendarPage() {
  const [events, setEvents] = useState<BaltimoreEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    eventType: "",
    ageRange: "",
    costType: "",
  });

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.eventType) params.set("eventType", filters.eventType);
      if (filters.ageRange) params.set("ageRange", filters.ageRange);
      if (filters.costType) params.set("costType", filters.costType);

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
  }, [filters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ eventType: "", ageRange: "", costType: "" });
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-4">
        Event Calendar
      </h1>
      <p className="text-[var(--text)] mb-6">
        Browse family-friendly events across Baltimore and surrounding counties.
      </p>

      {/* Quick Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleQuickFilter("free")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filters.costType === "free"
              ? "bg-green-500 text-white"
              : "bg-[var(--card)] text-[var(--text)] hover:bg-green-100"
          }`}
        >
          🆓 Free Only
        </button>
        <button
          onClick={() => handleQuickFilter("toddler")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filters.ageRange === "toddler"
              ? "bg-purple-500 text-white"
              : "bg-[var(--card)] text-[var(--text)] hover:bg-purple-100"
          }`}
        >
          👶 Toddler-Friendly
        </button>
        <button
          onClick={() => handleQuickFilter("outdoor")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filters.eventType === "outdoor"
              ? "bg-green-600 text-white"
              : "bg-[var(--card)] text-[var(--text)] hover:bg-green-100"
          }`}
        >
          🌳 Outdoor
        </button>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border border-[var(--muted)]/20 rounded-xl p-6 animate-pulse"
            >
              <div className="h-4 bg-[var(--muted)]/30 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-[var(--muted)]/20 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-[var(--muted)]/20 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-[var(--muted)]/20 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchEvents}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Events Grid */}
      {!loading && !error && events.length > 0 && (
        <>
          <p className="text-sm text-[var(--muted)] mb-4">
            Showing {events.length} event{events.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && !error && events.length === 0 && (
        <div className="bg-[var(--card)] rounded-xl p-8 text-center">
          <p className="text-[var(--text)] mb-4">
            No events found matching your filters.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
