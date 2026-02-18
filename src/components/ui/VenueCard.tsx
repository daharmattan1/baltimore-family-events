import { BaltimoreVenue } from "@/lib/supabase";

interface VenueCardProps {
  venue: BaltimoreVenue;
}

const countyLabels: Record<string, string> = {
  baltimore_city: "Baltimore City",
  baltimore_county: "Baltimore County",
  howard_county: "Howard County",
  anne_arundel_county: "Anne Arundel",
  montgomery_county: "Montgomery County",
  metro_wide: "Metro Wide",
};

function getCountyLabel(county: string): string {
  return countyLabels[county] || county.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="card group relative bg-white border border-[var(--muted)]/20 rounded-xl p-4 transition-all duration-drift hover:-translate-y-0.5 hover:shadow-card-hover">
      {/* Header row: name + rating */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-semibold text-[var(--text-dark)] line-clamp-2 group-hover:text-[var(--color-charm)] transition-colors duration-drift">
          {venue.name}
        </h3>
        {venue.rating && (
          <span className="flex items-center gap-1 text-sm text-[var(--color-crab)] font-medium whitespace-nowrap">
            ★ {venue.rating}
          </span>
        )}
      </div>

      {/* Address */}
      {venue.address && (
        <p className="text-sm text-[var(--text)] mb-2 line-clamp-1">
          📍 {venue.address}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {venue.county && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-[var(--color-charm)]/10 text-[var(--color-charm)] font-medium">
            {getCountyLabel(venue.county)}
          </span>
        )}
        {venue.user_ratings_total && venue.user_ratings_total > 100 && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-[var(--muted)]/10 text-[var(--muted)] font-medium">
            {venue.user_ratings_total.toLocaleString()} reviews
          </span>
        )}
        {venue.triage_tier === "P1" && (
          <span className="badge text-xs px-2 py-1 rounded-full bg-[var(--color-crab)]/10 text-[var(--color-crab)] font-medium">
            Top Pick
          </span>
        )}
      </div>

      {/* Website link */}
      {venue.website && (
        <a
          href={venue.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-[var(--color-crab)] hover:text-[var(--color-charm)] transition-colors duration-drift no-underline hover:no-underline"
        >
          Visit Website <span className="ml-1 group-hover:translate-x-1 transition-transform duration-drift">→</span>
        </a>
      )}
    </div>
  );
}
