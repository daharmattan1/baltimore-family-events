"use client";

interface CalendarDayCellProps {
  dayNumber: number;
  dateStr: string;
  eventCount: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

function getBadgeClasses(eventCount: number, isSelected: boolean): string {
  if (isSelected) {
    return "bg-white text-[var(--color-charm)]";
  }
  if (eventCount >= 16) {
    // Dense: large Crab Orange badge
    return "bg-[var(--color-crab)] text-white min-w-[22px] h-[22px] text-[11px]";
  }
  if (eventCount >= 6) {
    // Medium: bolder badge
    return "bg-[var(--color-crab)]/80 text-white min-w-[20px] h-[20px] text-[11px]";
  }
  // Light: small muted
  return "bg-[var(--color-crab)] text-white min-w-[18px] h-[18px] text-[10px]";
}

export default function CalendarDayCell({
  dayNumber,
  eventCount,
  isCurrentMonth,
  isToday,
  isSelected,
  onClick,
}: CalendarDayCellProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center
        min-h-[44px] sm:min-h-[56px] p-1 sm:p-2
        rounded-lg transition-all duration-drift
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-charm)] focus-visible:ring-offset-1
        ${isSelected
          ? "bg-[var(--color-charm)] text-white shadow-sm"
          : isToday
          ? "ring-2 ring-[var(--color-charm)] bg-white"
          : isCurrentMonth
          ? "bg-white hover:bg-[var(--color-formstone)]"
          : "bg-transparent opacity-40"
        }
        ${isCurrentMonth ? "cursor-pointer" : "cursor-default"}
      `}
      aria-label={`${dayNumber}${eventCount > 0 ? `, ${eventCount} event${eventCount !== 1 ? "s" : ""}` : ""}`}
      disabled={!isCurrentMonth}
    >
      {/* Day number */}
      <span
        className={`text-sm sm:text-base font-medium leading-none
          ${isSelected
            ? "text-white"
            : isToday
            ? "text-[var(--color-charm)] font-bold"
            : isCurrentMonth
            ? "text-[var(--color-boh)]"
            : "text-[var(--muted)]"
          }
        `}
      >
        {dayNumber}
      </span>

      {/* Event count badge — tiered density */}
      {eventCount > 0 && isCurrentMonth && (
        <span
          className={`
            mt-0.5 flex items-center justify-center
            rounded-full font-bold leading-none px-1
            ${getBadgeClasses(eventCount, isSelected)}
          `}
        >
          {eventCount}
        </span>
      )}
    </button>
  );
}
