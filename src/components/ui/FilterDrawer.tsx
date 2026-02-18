"use client";

import { useEffect, useRef, useCallback } from "react";

interface FilterDrawerProps {
  isOpen: boolean;
  filters: {
    eventType: string;
    ageRange: string;
    costType: string;
    venueSourceCategory: string;
    audienceOpenness: string;
    locationArea: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

const eventTypes = [
  { value: "", label: "All Types" },
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
  { value: "", label: "All Ages" },
  { value: "baby", label: "Baby (0-1)" },
  { value: "toddler", label: "Toddler (1-3)" },
  { value: "preschool", label: "Preschool (3-5)" },
  { value: "elementary", label: "Elementary (5-10)" },
  { value: "tweens", label: "Tweens (10-14)" },
  { value: "teens", label: "Teens (14-18)" },
  { value: "all_ages", label: "Family (All Ages)" },
];

const costTypes = [
  { value: "", label: "Any Cost" },
  { value: "free", label: "Free" },
  { value: "donation", label: "Donation" },
  { value: "paid", label: "Paid" },
];

const locationAreas = [
  { value: "", label: "All Areas" },
  { value: "baltimore_city", label: "Baltimore City" },
  { value: "baltimore_county", label: "Baltimore County" },
  { value: "howard_county", label: "Howard County" },
  { value: "anne_arundel_county", label: "Anne Arundel County" },
  { value: "montgomery_county", label: "Montgomery County" },
  { value: "other", label: "Other" },
];

const venueSourceCategories = [
  { value: "", label: "All Venues" },
  { value: "religious_institution", label: "Religious Institution" },
  { value: "library", label: "Library" },
  { value: "museum", label: "Museum" },
  { value: "park_recreation", label: "Parks & Recreation" },
  { value: "theater_venue", label: "Theater" },
  { value: "school", label: "School" },
  { value: "community_center", label: "Community Center" },
  { value: "commercial", label: "Commercial" },
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
    filters.eventType ||
    filters.ageRange ||
    filters.costType ||
    filters.venueSourceCategory ||
    filters.audienceOpenness ||
    filters.locationArea;

  const showAudienceToggle =
    filters.venueSourceCategory === "religious_institution";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Event Type */}
            <SelectField
              id="drawer-eventType"
              label="Event Type"
              value={filters.eventType}
              options={eventTypes}
              onChange={(v) => onFilterChange("eventType", v)}
            />

            {/* Age Group */}
            <SelectField
              id="drawer-ageRange"
              label="Age Group"
              value={filters.ageRange}
              options={ageRanges}
              onChange={(v) => onFilterChange("ageRange", v)}
            />

            {/* Cost */}
            <SelectField
              id="drawer-costType"
              label="Cost"
              value={filters.costType}
              options={costTypes}
              onChange={(v) => onFilterChange("costType", v)}
            />

            {/* Location */}
            <SelectField
              id="drawer-locationArea"
              label="County / Area"
              value={filters.locationArea}
              options={locationAreas}
              onChange={(v) => onFilterChange("locationArea", v)}
            />

            {/* Venue Type */}
            <SelectField
              id="drawer-venueSourceCategory"
              label="Venue Type"
              value={filters.venueSourceCategory}
              options={venueSourceCategories}
              onChange={(v) => {
                onFilterChange("venueSourceCategory", v);
                // Clear audience filter when venue type changes away from religious
                if (v !== "religious_institution") {
                  onFilterChange("audienceOpenness", "");
                }
              }}
            />

            {/* Audience toggle — only when Religious Institution selected */}
            {showAudienceToggle && (
              <div className="w-full">
                <label className="block text-sm font-medium text-[var(--text)] mb-1">
                  Audience
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => onFilterChange("audienceOpenness", "")}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      !filters.audienceOpenness
                        ? "bg-[var(--color-calvert)] text-[var(--color-boh)] shadow-sm"
                        : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-calvert)]/10"
                    }`}
                  >
                    Include All
                  </button>
                  <button
                    onClick={() =>
                      onFilterChange("audienceOpenness", "open_to_all")
                    }
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      filters.audienceOpenness === "open_to_all"
                        ? "bg-[var(--color-calvert)] text-[var(--color-boh)] shadow-sm"
                        : "bg-[var(--color-formstone)] text-[var(--color-harbor)] hover:bg-[var(--color-calvert)]/10"
                    }`}
                  >
                    Open to All Only
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-[var(--muted)]/20">
          {hasActiveFilters ? (
            <button
              onClick={onClearFilters}
              className="text-sm text-[var(--color-charm)] hover:underline font-medium"
            >
              Clear All
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

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--text)] mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white border border-[var(--muted)]/30 rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-charm)]/50"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
