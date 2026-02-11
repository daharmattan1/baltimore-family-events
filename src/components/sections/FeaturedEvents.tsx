"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BaltimoreEvent } from "@/lib/supabase";

// Get event type icon
function getEventTypeIcon(eventType?: string): string {
  switch (eventType) {
    case "museum":
      return "🏛️";
    case "outdoor":
      return "🌳";
    case "performance":
      return "🎭";
    case "sports":
      return "⚽";
    case "educational":
      return "📚";
    case "food":
      return "🍽️";
    case "seasonal":
      return "🎉";
    case "class":
      return "🎨";
    case "camp":
      return "⛺";
    default:
      return "📅";
  }
}

// Format date for display
function formatDate(dateStr?: string): string {
  if (!dateStr) return "Date TBD";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<BaltimoreEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const response = await fetch("/api/events?featured=true&limit=4");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch events");
        }

        setEvents(data.events || []);
      } catch (err) {
        console.error("Error fetching featured events:", err);
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-dark)] mb-8 text-center">
            Featured This Week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[var(--card)] rounded-xl p-6 animate-pulse"
              >
                <div className="h-4 bg-[var(--muted)]/30 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-[var(--muted)]/20 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-[var(--muted)]/20 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state - show fallback link to calendar
  if (error || events.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-dark)] mb-8 text-center">
            Featured This Week
          </h2>
          <div className="text-center">
            <p className="text-[var(--text)] mb-4">
              Check out all the upcoming family events in Baltimore!
            </p>
            <Link
              href="/calendar"
              className="inline-flex items-center justify-center px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[var(--primary)]/90 transition-colors no-underline hover:no-underline"
            >
              Browse All Events →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-dark)] mb-8 text-center">
          Featured This Week
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <a
              key={event.id}
              href={event.source_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-[var(--muted)]/20 rounded-xl p-5 hover:shadow-lg transition-shadow no-underline cursor-pointer"
            >
              {/* Icon and date */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl" aria-hidden="true">
                  {getEventTypeIcon(event.event_type)}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {formatDate(event.event_date_start)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-[var(--text-dark)] mb-2 line-clamp-2">
                {event.title}
              </h3>

              {/* Venue */}
              {event.venue && (
                <p className="text-sm text-[var(--text)] mb-2 line-clamp-1">
                  📍 {event.venue}
                </p>
              )}

              {/* Cost badge */}
              {event.cost_type && (
                <span
                  className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                    event.cost_type === "free"
                      ? "bg-green-100 text-green-800"
                      : event.cost_type === "donation"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-[var(--card)] text-[var(--text)]"
                  }`}
                >
                  {event.cost_type === "free"
                    ? "Free"
                    : event.cost_amount || event.cost_type}
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/calendar"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors no-underline hover:no-underline"
          >
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}
