import { NextRequest, NextResponse } from "next/server";
import {
  EventFilters,
  fetchClasses,
  fetchEvents,
  fetchFeaturedEvents,
  fetchWeekendEvents,
} from "@/lib/supabase";
import { deduplicateEvents } from "@/lib/event-helpers";

const MAX_LIMIT = 200;
const MAX_FEATURED_LIMIT = 12;
const SAFE_FILTER_VALUE = /^[a-z0-9_\-\s]+$/i;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function parseBoolean(value: string | null) {
  return value === "true";
}

function parseLimit(raw: string | null, max: number) {
  if (!raw) {
    return null;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > max) {
    throw new Error(`limit must be an integer between 1 and ${max}`);
  }

  return parsed;
}

function isIsoDate(value: string) {
  if (!ISO_DATE.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function parseDate(raw: string | null, label: "startDate" | "endDate") {
  if (!raw) {
    return null;
  }

  if (!isIsoDate(raw)) {
    throw new Error(`${label} must be in YYYY-MM-DD format`);
  }

  return raw;
}

function parseList(raw: string | null, label: string) {
  if (!raw) {
    return undefined;
  }

  const values = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (values.length === 0) {
    return undefined;
  }

  const hasUnsafeValue = values.some((value) => !SAFE_FILTER_VALUE.test(value));
  if (hasUnsafeValue) {
    throw new Error(`${label} contains invalid characters`);
  }

  return values;
}

function buildFilters(searchParams: URLSearchParams) {
  const filters: EventFilters = {};

  const startDate = parseDate(searchParams.get("startDate"), "startDate");
  const endDate = parseDate(searchParams.get("endDate"), "endDate");
  if (startDate) filters.startDate = startDate;
  if (endDate) filters.endDate = endDate;
  if (startDate && endDate && startDate > endDate) {
    throw new Error("startDate must be before or equal to endDate");
  }

  const eventType = parseList(searchParams.get("eventType"), "eventType");
  const ageRange = parseList(searchParams.get("ageRange"), "ageRange");
  const costType = parseList(searchParams.get("costType"), "costType");
  const locationArea = parseList(searchParams.get("locationArea"), "locationArea");

  if (eventType) filters.eventType = eventType;
  if (ageRange) filters.ageRange = ageRange;
  if (costType) filters.costType = costType;
  if (locationArea) filters.locationArea = locationArea;
  if (parseBoolean(searchParams.get("includeFaith"))) {
    filters.includeFaith = true;
  }

  const limit = parseLimit(searchParams.get("limit"), MAX_LIMIT);
  if (limit) {
    filters.limit = limit;
  }

  return filters;
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    if (parseBoolean(searchParams.get("featured"))) {
      const limit = parseLimit(searchParams.get("limit"), MAX_FEATURED_LIMIT) ?? 4;
      const events = deduplicateEvents(await fetchFeaturedEvents(limit));
      return NextResponse.json({ events, count: events.length });
    }

    if (parseBoolean(searchParams.get("classes"))) {
      const events = deduplicateEvents(await fetchClasses());
      return NextResponse.json({ events, count: events.length });
    }

    const filters = buildFilters(searchParams);

    if (parseBoolean(searchParams.get("weekends"))) {
      const weekends = await fetchWeekendEvents(filters);
      const dedupedWeekends = weekends.map((w) => ({
        ...w,
        events: deduplicateEvents(w.events),
      }));
      return NextResponse.json({ weekends: dedupedWeekends });
    }

    const events = deduplicateEvents(await fetchEvents(filters));
    return NextResponse.json({
      events,
      count: events.length,
      filters,
    });
  } catch (error) {
    if (error instanceof Error && /startDate|endDate|limit|invalid|before/.test(error.message)) {
      return badRequest(error.message);
    }

    console.error("API Error (/api/events):", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
