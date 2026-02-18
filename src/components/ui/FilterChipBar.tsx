"use client";

interface FilterChipBarProps {
  filters: {
    eventType: string;
    ageRange: string;
    costType: string;
    venueSourceCategory: string;
    audienceOpenness: string;
    locationArea: string;
  };
  dateFilter: string;
  viewMode: "list" | "calendar";
  onFilterChange: (key: string, value: string) => void;
  onDateFilterChange: (preset: string) => void;
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export default function FilterChipBar({
  filters,
  dateFilter,
  viewMode,
  onFilterChange,
  onDateFilterChange,
  onToggleDrawer,
  isDrawerOpen,
}: FilterChipBarProps) {
  // Count active filters in the drawer (excludes chips that have their own toggle)
  const drawerFilterCount = [
    filters.eventType,
    filters.ageRange,
    filters.locationArea,
  ].filter(Boolean).length;

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 -mx-1 px-1">
      {/* Date chips — list view only */}
      {viewMode === "list" && (
        <>
          <ChipButton
            label="This Weekend"
            active={dateFilter === "weekend"}
            onClick={() => onDateFilterChange("weekend")}
            activeColor="bg-[var(--color-charm)] text-white"
          />
          <ChipButton
            label="This Week"
            active={dateFilter === "this-week"}
            onClick={() => onDateFilterChange("this-week")}
            activeColor="bg-[var(--color-charm)] text-white"
          />
          <ChipButton
            label="This Month"
            active={dateFilter === "this-month"}
            onClick={() => onDateFilterChange("this-month")}
            activeColor="bg-[var(--color-charm)] text-white"
          />
          <div className="w-px h-6 bg-[var(--muted)]/30 flex-shrink-0" />
        </>
      )}

      {/* Quick filter chips */}
      <ChipButton
        label="Free"
        active={filters.costType === "free"}
        onClick={() =>
          onFilterChange("costType", filters.costType === "free" ? "" : "free")
        }
        activeColor="bg-[var(--color-seafoam)] text-[var(--color-boh)]"
      />
      <ChipButton
        label="Ages 0-4"
        active={filters.ageRange === "toddler"}
        onClick={() =>
          onFilterChange(
            "ageRange",
            filters.ageRange === "toddler" ? "" : "toddler"
          )
        }
        activeColor="bg-[var(--color-agent-toddler)] text-white"
      />
      <ChipButton
        label="Outdoor"
        active={filters.eventType === "outdoor"}
        onClick={() =>
          onFilterChange(
            "eventType",
            filters.eventType === "outdoor" ? "" : "outdoor"
          )
        }
        activeColor="bg-[var(--color-seafoam)] text-[var(--color-boh)]"
      />
      <ChipButton
        label="Faith & Community"
        active={filters.venueSourceCategory === "religious_institution"}
        onClick={() =>
          onFilterChange(
            "venueSourceCategory",
            filters.venueSourceCategory === "religious_institution"
              ? ""
              : "religious_institution"
          )
        }
        activeColor="bg-[var(--color-calvert)] text-[var(--color-boh)]"
      />

      {/* More Filters chip */}
      <button
        onClick={onToggleDrawer}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
          isDrawerOpen || drawerFilterCount > 0
            ? "bg-[var(--color-charm)] text-white shadow-sm"
            : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-charm)]/10"
        }`}
      >
        More Filters
        {drawerFilterCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-white/30">
            {drawerFilterCount}
          </span>
        )}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-150 ${
            isDrawerOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
}

// Reusable chip button
function ChipButton({
  label,
  active,
  onClick,
  activeColor,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  activeColor: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
        active
          ? `${activeColor} shadow-sm`
          : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-charm)]/10"
      }`}
    >
      {label}
    </button>
  );
}
