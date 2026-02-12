"use client";

import { useState, useMemo, useCallback } from "react";

export interface CalendarDay {
  date: Date;
  dateStr: string; // YYYY-MM-DD
  isCurrentMonth: boolean;
}

export function useCalendarNavigation() {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDay(null);
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDay(null);
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDay(null);
  }, []);

  // Generate the full month grid (35-42 days including padding from prev/next months)
  const monthGrid = useMemo<CalendarDay[]>(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month and what day of week it falls on (0=Sun)
    const firstDay = new Date(year, month, 1);
    const startDayOfWeek = firstDay.getDay();

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Total cells needed: fill from Sunday before month start to Saturday after month end
    const totalCells = Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7;

    const days: CalendarDay[] = [];

    for (let i = 0; i < totalCells; i++) {
      const dayOffset = i - startDayOfWeek;
      const date = new Date(year, month, 1 + dayOffset);
      const dateStr = formatDateStr(date);
      const isCurrentMonth = date.getMonth() === month;
      days.push({ date, dateStr, isCurrentMonth });
    }

    return days;
  }, [currentMonth]);

  const isToday = useCallback((dateStr: string): boolean => {
    return dateStr === formatDateStr(new Date());
  }, []);

  // Get the date range for the displayed month (for API fetching)
  const getMonthDateRange = useCallback((): { start: string; end: string } => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const start = formatDateStr(new Date(year, month, 1));
    const end = formatDateStr(new Date(year, month + 1, 0));
    return { start, end };
  }, [currentMonth]);

  // Month label for display
  const monthLabel = useMemo(() => {
    return currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [currentMonth]);

  return {
    currentMonth,
    selectedDay,
    setSelectedDay,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    monthGrid,
    isToday,
    getMonthDateRange,
    monthLabel,
  };
}

// Format Date to YYYY-MM-DD string
function formatDateStr(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
