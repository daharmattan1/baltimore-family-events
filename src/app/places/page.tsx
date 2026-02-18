"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import VenueCard from "@/components/ui/VenueCard";
import { BaltimoreVenue } from "@/lib/supabase";

function groupVenues(venues: BaltimoreVenue[]): Map<string, BaltimoreVenue[]> {
  const groups = new Map<string, BaltimoreVenue[]>();

  for (const venue of venues) {
    const key = venue.category || "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(venue);
  }

  return groups;
}

const categoryLabels: Record<string, string> = {
  parks_rec: "Parks & Recreation",
  museum: "Museums & Science",
  library: "Libraries",
  theater: "Performing Arts & Entertainment",
  zoo: "Zoos & Aquariums",
  farms_seasonal: "Farms & Seasonal Attractions",
  sports: "Sports & Fitness",
  activity_center: "Activity Centers & Play Spaces",
  faith_community: "Faith & Community",
  other: "Other",
};

function getCategoryLabel(key: string): string {
  return categoryLabels[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getCategoryIcon(key: string): string {
  const icons: Record<string, string> = {
    parks_rec: "🌳",
    museum: "🏛️",
    library: "📚",
    theater: "🎭",
    zoo: "🦁",
    farms_seasonal: "🌻",
    sports: "⚽",
    activity_center: "🎪",
    faith_community: "⛪",
    other: "📍",
  };
  return icons[key] || "📍";
}

// Priority order for categories
const categoryOrder = [
  "parks_rec", "museum", "zoo", "library", "theater",
  "farms_seasonal", "activity_center", "sports", "faith_community", "other",
];

export default function PlacesPage() {
  const [venues, setVenues] = useState<BaltimoreVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchVenueData() {
      try {
        const response = await fetch("/api/venues");
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch venues");
        setVenues(data.venues || []);
      } catch (err) {
        console.error("Error fetching venues:", err);
        setError(err instanceof Error ? err.message : "Failed to load venues");
      } finally {
        setLoading(false);
      }
    }
    fetchVenueData();
  }, []);

  const grouped = groupVenues(venues);

  // Sort categories by defined order
  const sortedCategories = Array.from(grouped.entries()).sort(([a], [b]) => {
    const ia = categoryOrder.indexOf(a);
    const ib = categoryOrder.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  return (
    <div>
      {/* Hero Header */}
      <section className="relative py-8 sm:py-10 overflow-hidden">
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
            Family-Friendly Directory
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-boh)] mb-3">
            Places to Go
          </h1>
          <p className="text-[var(--color-harbor)] max-w-2xl">
            Parks, museums, play spaces, farms, and more — {venues.length > 0 ? `${venues.length} verified` : "hundreds of"} family-friendly venues across Greater Baltimore.
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
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-[var(--muted)]/20 rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-[var(--muted)]/30 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-[var(--muted)]/20 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-[var(--muted)]/20 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-[var(--color-crossland)]/5 border border-[var(--color-crossland)]/20 rounded-xl p-6 text-center">
            <p className="text-[var(--color-crossland)] mb-4">{error}</p>
          </div>
        )}

        {/* Venues grouped by category */}
        {!loading && !error && venues.length > 0 && (
          <>
            <p className="text-sm text-[var(--muted)] mb-6 flex items-center gap-2">
              <span className="text-[var(--color-crab)]">🦀</span>
              {venues.length} venue{venues.length !== 1 ? "s" : ""} across {grouped.size} categories
            </p>
            <div className="space-y-8">
              {sortedCategories.map(([category, items]) => {
                const p1Items = items.filter((v) => v.triage_tier === "P1");
                const otherItems = items.filter((v) => v.triage_tier !== "P1");
                const isExpanded = expandedCategories.has(category);
                const showToggle = otherItems.length > 0;

                return (
                  <div key={category}>
                    <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--color-boh)] mb-4">
                      <span>{getCategoryIcon(category)}</span>
                      {getCategoryLabel(category)}
                      <span className="text-sm font-normal text-[var(--muted)]">({items.length})</span>
                    </h2>

                    {/* P1 venues always visible */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(p1Items.length > 0 ? p1Items : items.slice(0, 6)).map((venue) => (
                        <VenueCard key={venue.id} venue={venue} />
                      ))}
                    </div>

                    {/* More venues expandable */}
                    {showToggle && p1Items.length > 0 && (
                      <>
                        {isExpanded && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {otherItems.map((venue) => (
                              <VenueCard key={venue.id} venue={venue} />
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => toggleCategory(category)}
                          className="mt-3 text-sm font-medium text-[var(--color-charm)] hover:text-[var(--color-crab)] transition-colors"
                        >
                          {isExpanded
                            ? "Show fewer"
                            : `Show ${otherItems.length} more in ${getCategoryLabel(category)}`}
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && !error && venues.length === 0 && (
          <div className="bg-[var(--color-formstone)] rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-[var(--color-harbor)] mb-2">
              No venues listed yet.
            </p>
            <p className="text-sm text-[var(--muted)]">
              Check back soon — we&apos;re building our directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
