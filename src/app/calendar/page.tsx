"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
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
            Browse Events
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-3">
            Event Calendar
          </h1>
          <p className="text-[var(--color-harbor)] max-w-2xl">
            Browse family-friendly events across Baltimore and surrounding counties.
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
        {/* Quick Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
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
            👶 Toddler-Friendly
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

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
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

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="bg-[var(--color-formstone)] rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🦀</div>
            <p className="text-[var(--color-harbor)] mb-4">
              No events found matching your filters.
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
