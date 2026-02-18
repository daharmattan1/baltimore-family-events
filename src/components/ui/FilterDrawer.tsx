"use client";

import { useEffect, useRef, useCallback } from "react";

interface FilterDrawerProps {
  isOpen: boolean;
  filters: {
    eventType: string[];
    ageRange: string[];
    costType: string[];
    locationArea: string[];
    includeFaith: boolean;
  };
  onFilterChange: (key: string, value: string[] | boolean) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

const eventTypes = [
  { value: "museum", label: "Museum" },
  { value: "outdoor", label: "Outdoor" },
  { value: "performance", label: "Performance" },
  { value: "sports", label: "Sports" },
  { value: "educational", label: "Educational" },
  { value: "food", label: "Food" },
  { value: "seasonal", label: "Seasonal" },
  { value: "class", label: "Class" },
  { value: "camp", label: "Camp" },
];

const ageRanges = [
  { value: "baby", label: "Baby (0-1)" },
  { value: "toddler", label: "Toddler (1-3)" },
  { value: "preschool", label: "Preschool (3-5)" },
  { value: "elementary", label: "Elementary (5-10)" },
  { value: "tweens", label: "Tweens (10-14)" },
  { value: "teens", label: "Teens (14-18)" },
  { value: "all_ages", label: "Family (All Ages)" },
];

const costTypes = [
  { value: "free", label: "Free" },
  { value: "donation", label: "Donation" },
  { value: "paid", label: "Paid" },
];

const locationAreas = [
  { value: "baltimore_city", label: "Baltimore City" },
  { value: "baltimore_county", label: "Baltimore County" },
  { value: "howard_county", label: "Howard County" },
  { value: "anne_arundel_county", label: "Anne Arundel County" },
  { value: "montgomery_county", label: "Montgomery County" },
  { value: "other", label: "Other" },
];

export default function FilterDrawer({
  isOpen,
  filters,
  onFilterChange,
  onClearFilters,
  onClose,
}: FilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const hasActiveFilters =
    filters.eventType.length > 0 ||
    filters.ageRange.length > 0 ||
    filters.costType.length > 0 ||
    filters.locationArea.length > 0 ||
    filters.includeFaith;

  const toggleArrayValue = (key: string, currentValues: string[], value: string) => {
    const next = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange(key, next);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Filter options"
        aria-modal="true"
        className={`
          z-50 bg-white shadow-lg

          /* Mobile: bottom sheet */
          fixed inset-x-0 bottom-0 max-h-[70vh] rounded-t-2xl
          md:relative md:inset-auto md:max-h-none md:rounded-xl md:mt-3 md:shadow-md md:border md:border-[var(--muted)]/20
        `}
      >
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full bg-[var(--muted)]/40" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-5" style={{ maxHeight: "calc(70vh - 80px)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Event Type */}
            <CheckboxGroup
              label="Event Type"
              options={eventTypes}
              selected={filters.eventType}
              onToggle={(v) => toggleArrayValue("eventType", filters.eventType, v)}
            />

            {/* Age Group */}
            <CheckboxGroup
              label="Age Group"
              options={ageRanges}
              selected={filters.ageRange}
              onToggle={(v) => toggleArrayValue("ageRange", filters.ageRange, v)}
            />

            {/* Cost */}
            <CheckboxGroup
              label="Cost"
              options={costTypes}
              selected={filters.costType}
              onToggle={(v) => toggleArrayValue("costType", filters.costType, v)}
            />

            {/* Location */}
            <CheckboxGroup
              label="County / Area"
              options={locationAreas}
              selected={filters.locationArea}
              onToggle={(v) => toggleArrayValue("locationArea", filters.locationArea, v)}
            />
          </div>

          {/* Faith & Community Toggle */}
          <div className="mt-5 pt-4 border-t border-[var(--muted)]/20">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`relative w-11 h-6 rounded-full transition-colors duration-150 ${
                  filters.includeFaith
                    ? "bg-[var(--color-calvert)]"
                    : "bg-[var(--muted)]/30"
                }`}
                onClick={() => onFilterChange("includeFaith", !filters.includeFaith)}
                role="switch"
                aria-checked={filters.includeFaith}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-150 ${
                    filters.includeFaith ? "translate-x-5" : ""
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--color-boh)]">
                Include Faith & Community Events
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-[var(--muted)]/20">
          {hasActiveFilters ? (
            <button
              onClick={onClearFilters}
              className="text-sm text-[var(--color-charm)] hover:underline font-medium"
            >
              Clear All Filters
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-[var(--color-charm)] text-white hover:bg-[var(--color-charm)]/90 transition-colors duration-150"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}

function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-[var(--text)] mb-2">
        {label}
      </legend>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="w-4 h-4 rounded border-[var(--muted)]/40 text-[var(--color-charm)] focus:ring-[var(--color-charm)]/50 accent-[var(--color-charm)]"
            />
            <span className="text-sm text-[var(--color-harbor)] group-hover:text-[var(--color-boh)]">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
