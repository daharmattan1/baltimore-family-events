import { NextRequest, NextResponse } from "next/server";
import { fetchEvents, fetchFeaturedEvents, EventFilters } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Check if requesting featured events
    const featured = searchParams.get("featured");
    if (featured === "true") {
      const limit = parseInt(searchParams.get("limit") || "4");
      const events = await fetchFeaturedEvents(limit);
      return NextResponse.json({ events, count: events.length });
    }

    // Build filters from query params
    const filters: EventFilters = {};

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const eventType = searchParams.get("eventType");
    const ageRange = searchParams.get("ageRange");
    const costType = searchParams.get("costType");
    const locationArea = searchParams.get("locationArea");
    const limit = searchParams.get("limit");

    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (eventType) filters.eventType = eventType;
    if (ageRange) filters.ageRange = ageRange;
    if (costType) filters.costType = costType;
    if (locationArea) filters.locationArea = locationArea;
    if (limit) filters.limit = parseInt(limit);

    const events = await fetchEvents(filters);

    return NextResponse.json({
      events,
      count: events.length,
      filters: filters,
    });
  } catch (error) {
    console.error("API Error:", error);
    // Better error serialization
    const errorMessage = error instanceof Error
      ? error.message
      : JSON.stringify(error);
    return NextResponse.json(
      { error: "Failed to fetch events", details: errorMessage },
      { status: 500 }
    );
  }
}
