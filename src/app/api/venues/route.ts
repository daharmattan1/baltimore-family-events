import { NextResponse } from "next/server";
import { fetchVenues } from "@/lib/supabase";

export async function GET() {
  try {
    const venues = await fetchVenues();
    return NextResponse.json({ venues, count: venues.length });
  } catch (error) {
    console.error("API Error:", error);
    const errorMessage = error instanceof Error
      ? error.message
      : JSON.stringify(error);
    return NextResponse.json(
      { error: "Failed to fetch venues", details: errorMessage },
      { status: 500 }
    );
  }
}
