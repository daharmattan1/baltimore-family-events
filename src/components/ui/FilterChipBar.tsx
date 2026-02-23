"use client";

import { pushEvent } from "@/lib/analytics";

interface FilterChipBarProps {
  filters: {
    eventType: string[];
    ageRange: string[];
    costType: string[];
    locationArea: string[];
    includeFaith: boolean;
  };
  dateFilter: string;
  viewMode: "list" | "calendar" | "weekends";
  onFilterChange: (key: string, value: string[] | boolean) => void;
  onDateFilterChange: (preset: string) => void;
  onToggleDrawer: () => void;
  onClearFilters: () => void;
  isDrawerOpen: boolean;
}

export default function FilterChipBar({
  filters,
  dateFilter,
  viewMode,
  onFilterChange,
  onDateFilterChange,
  onToggleDrawer,
  onClearFilters,
  isDrawerOpen,
}: FilterChipBarProps) {
  // Count active filters in the drawer
  const activeFilterCount =
    filters.eventType.length +
    filters.ageRange.length +
    filters.costType.length +
    filters.locationArea.length +
    (filters.includeFaith ? 1 : 0);

  const hasAnyFilter = activeFilterCount > 0 || dateFilter;

  const toggleChipArray = (key: string, currentValues: string[], value: string) => {
    const isRemoving = currentValues.includes(value);
    const next = isRemoving
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange(key, next);
    pushEvent("calendar_filter_change", {
      filter_type: key,
      filter_value: value,
      action: isRemoving ? "clear" : "apply",
    });
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 -mx-1 px-1">
      {/* Date chips — list view only */}
      {viewMode === "list" && (
        <>
          <ChipButton
            label="This Weekend"
            active={dateFilter === "weekend"}
            onClick={() => {
              onDateFilterChange("weekend");
              pushEvent("calendar_filter_change", { filter_type: "date", filter_value: "weekend", action: dateFilter === "weekend" ? "clear" : "apply" });
            }}
            activeColor="bg-[var(--color-charm)] text-white"
          />
          <ChipButton
            label="This Week"
            active={dateFilter === "this-week"}
            onClick={() => {
              onDateFilterChange("this-week");
              pushEvent("calendar_filter_change", { filter_type: "date", filter_value: "this-week", action: dateFilter === "this-week" ? "clear" : "apply" });
            }}
            activeColor="bg-[var(--color-charm)] text-white"
          />
          <ChipButton
            label="This Month"
            active={dateFilter === "this-month"}
            onClick={() => {
              onDateFilterChange("this-month");
              pushEvent("calendar_filter_change", { filter_type: "date", filter_value: "this-month", action: dateFilter === "this-month" ? "clear" : "apply" });
            }}
            activeColor="bg-[var(--color-charm)] text-white"
          />
          <div className="w-px h-6 bg-[var(--muted)]/30 flex-shrink-0" />
        </>
      )}

      {/* Quick filter chips */}
      <ChipButton
        label="Free"
        active={filters.costType.includes("free")}
        onClick={() => toggleChipArray("costType", filters.costType, "free")}
        activeColor="bg-[var(--color-seafoam)] text-[var(--color-boh)]"
      />
      <ChipButton
        label="Ages 0-4"
        active={filters.ageRange.includes("toddler")}
        onClick={() => toggleChipArray("ageRange", filters.ageRange, "toddler")}
        activeColor="bg-[var(--color-agent-toddler)] text-white"
      />
      <ChipButton
        label="Outdoor"
        active={filters.eventType.includes("outdoor")}
        onClick={() => toggleChipArray("eventType", filters.eventType, "outdoor")}
        activeColor="bg-[var(--color-seafoam)] text-[var(--color-boh)]"
      />
      <ChipButton
        label="Faith & Community"
        active={filters.includeFaith}
        onClick={() => {
          onFilterChange("includeFaith", !filters.includeFaith);
          pushEvent("calendar_filter_change", { filter_type: "includeFaith", filter_value: String(!filters.includeFaith), action: filters.includeFaith ? "clear" : "apply" });
        }}
        activeColor="bg-[var(--color-calvert)] text-[var(--color-boh)]"
      />

      {/* More Filters chip */}
      <button
        onClick={onToggleDrawer}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
          isDrawerOpen || activeFilterCount > 0
            ? "bg-[var(--color-charm)] text-white shadow-sm"
            : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-charm)]/10"
        }`}
      >
        More Filters
        {activeFilterCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-white/30">
            {activeFilterCount}
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

      {/* Clear All Filters button — visible when any filter is active */}
      {hasAnyFilter && (
        <>
          <div className="w-px h-6 bg-[var(--muted)]/30 flex-shrink-0" />
          <button
            onClick={() => {
              onClearFilters();
              pushEvent("calendar_filter_change", { filter_type: "all", filter_value: "cleared", action: "clear" });
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap text-[var(--color-charm)] hover:bg-[var(--color-charm)]/10 transition-all duration-150 flex-shrink-0"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All
          </button>
        </>
      )}
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
