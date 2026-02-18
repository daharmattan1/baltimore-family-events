"use client";

interface ViewToggleProps {
  viewMode: "list" | "calendar" | "weekends";
  onViewChange: (mode: "list" | "calendar" | "weekends") => void;
}

export default function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-full bg-[var(--color-formstone)] p-1" role="tablist" aria-label="View mode">
      <button
        role="tab"
        aria-selected={viewMode === "list"}
        onClick={() => onViewChange("list")}
        className={`
          flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
          transition-all duration-drift
          ${viewMode === "list"
            ? "bg-[var(--color-charm)] text-white shadow-sm"
            : "text-[var(--color-harbor)] hover:text-[var(--color-boh)]"
          }
        `}
      >
        {/* List icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        List
      </button>
      <button
        role="tab"
        aria-selected={viewMode === "calendar"}
        onClick={() => onViewChange("calendar")}
        className={`
          flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
          transition-all duration-drift
          ${viewMode === "calendar"
            ? "bg-[var(--color-charm)] text-white shadow-sm"
            : "text-[var(--color-harbor)] hover:text-[var(--color-boh)]"
          }
        `}
      >
        {/* Calendar icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 1.5V4M11 1.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Calendar
      </button>
      <button
        role="tab"
        aria-selected={viewMode === "weekends"}
        onClick={() => onViewChange("weekends")}
        className={`
          flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
          transition-all duration-drift
          ${viewMode === "weekends"
            ? "bg-[var(--color-charm)] text-white shadow-sm"
            : "text-[var(--color-harbor)] hover:text-[var(--color-boh)]"
          }
        `}
      >
        {/* Weekend/sun icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 2V3.5M8 12.5V14M2 8H3.5M12.5 8H14M3.76 3.76L4.82 4.82M11.18 11.18L12.24 12.24M12.24 3.76L11.18 4.82M4.82 11.18L3.76 12.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Weekends
      </button>
    </div>
  );
}
