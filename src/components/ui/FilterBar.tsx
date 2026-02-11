"use client";

interface FilterBarProps {
  filters: {
    eventType: string;
    ageRange: string;
    costType: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
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

export default function FilterBar({
  filters,
  onFilterChange,
  onClearFilters,
}: FilterBarProps) {
  const hasActiveFilters =
    filters.eventType || filters.ageRange || filters.costType;

  return (
    <div className="bg-[var(--card)] rounded-xl p-4 sm:p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        {/* Event Type */}
        <div className="w-full sm:w-auto">
          <label
            htmlFor="eventType"
            className="block text-sm font-medium text-[var(--text)] mb-1"
          >
            Event Type
          </label>
          <select
            id="eventType"
            value={filters.eventType}
            onChange={(e) => onFilterChange("eventType", e.target.value)}
            className="w-full sm:w-40 px-3 py-2 bg-white border border-[var(--muted)]/30 rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Age Range */}
        <div className="w-full sm:w-auto">
          <label
            htmlFor="ageRange"
            className="block text-sm font-medium text-[var(--text)] mb-1"
          >
            Age Group
          </label>
          <select
            id="ageRange"
            value={filters.ageRange}
            onChange={(e) => onFilterChange("ageRange", e.target.value)}
            className="w-full sm:w-44 px-3 py-2 bg-white border border-[var(--muted)]/30 rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
          >
            {ageRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Cost Type */}
        <div className="w-full sm:w-auto">
          <label
            htmlFor="costType"
            className="block text-sm font-medium text-[var(--text)] mb-1"
          >
            Cost
          </label>
          <select
            id="costType"
            value={filters.costType}
            onChange={(e) => onFilterChange("costType", e.target.value)}
            className="w-full sm:w-32 px-3 py-2 bg-white border border-[var(--muted)]/30 rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
          >
            {costTypes.map((cost) => (
              <option key={cost.value} value={cost.value}>
                {cost.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-[var(--primary)] hover:underline font-medium"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
