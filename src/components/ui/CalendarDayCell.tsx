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

      {/* Event count badge */}
      {eventCount > 0 && isCurrentMonth && (
        <span
          className={`
            mt-0.5 flex items-center justify-center
            min-w-[18px] h-[18px] rounded-full
            text-[10px] font-bold leading-none px-1
            ${isSelected
              ? "bg-white text-[var(--color-charm)]"
              : "bg-[var(--color-crab)] text-white"
            }
          `}
        >
          {eventCount}
        </span>
      )}
    </button>
  );
}
