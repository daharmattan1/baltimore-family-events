import { createClient } from "@supabase/supabase-js";

// Lazy-initialize Supabase client to avoid build-time errors
// Supports both NEXT_PUBLIC_ prefixed vars and Vercel Supabase integration vars
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // Try multiple env var names (Vercel integration may use different names)
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY;

  // Log which env vars are available (without exposing values)
  console.log("Supabase config:", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlSource: process.env.NEXT_PUBLIC_SUPABASE_URL ? "NEXT_PUBLIC_SUPABASE_URL" :
               process.env.SUPABASE_URL ? "SUPABASE_URL" : "none",
  });

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      `Missing Supabase environment variables. hasUrl=${!!supabaseUrl}, hasKey=${!!supabaseAnonKey}`
    );
  }

  // Create client using public schema (default)
  // The baltimore events are accessible via public.baltimore_events table/view
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);

  return supabaseInstance;
}

// Export getter instead of direct client
export const getSupabase = getSupabaseClient;

// Event type matching the baltimore.events table
export interface BaltimoreEvent {
  id: number;
  title: string;
  content?: string;
  summary?: string;
  venue?: string;
  address?: string;
  event_date_start?: string;
  event_date_end?: string;
  event_time?: string;
  source_url?: string;
  image_url?: string;
  registration_url?: string;
  original_event_url?: string;
  location_area?: string;
  age_range_category?: string;
  event_type?: string;
  content_pillar?: string;
  cost_type?: string;
  cost_amount?: string;
  venue_type?: string;
  venue_source_category?: string;
  audience_openness?: string;
  is_relevant?: boolean;
  family_friendly_score?: number;
  featured_worthy?: boolean;
  is_sold_out?: boolean;
}

// Filter options for the calendar
export interface EventFilters {
  startDate?: string;
  endDate?: string;
  eventType?: string;
  ageRange?: string;
  costType?: string;
  locationArea?: string;
  venueSourceCategory?: string;
  audienceOpenness?: string;
  limit?: number;
}

// Fetch events with optional filters
// Note: baltimore schema is set at client initialization
export async function fetchEvents(filters: EventFilters = {}) {
  const supabase = getSupabase();

  let query = supabase
    .from("baltimore_events")
    .select("*")
    .eq("is_relevant", true)
    .order("event_date_start", { ascending: true });

  // Date range filter
  if (filters.startDate) {
    query = query.gte("event_date_start", filters.startDate);
  } else {
    // Default to today onward
    query = query.gte("event_date_start", new Date().toISOString().split("T")[0]);
  }

  if (filters.endDate) {
    query = query.lte("event_date_start", filters.endDate);
  }

  // Category filters
  if (filters.eventType) {
    query = query.eq("event_type", filters.eventType);
  }

  if (filters.ageRange) {
    query = query.eq("age_range_category", filters.ageRange);
  }

  if (filters.costType) {
    query = query.eq("cost_type", filters.costType);
  }

  if (filters.locationArea) {
    query = query.eq("location_area", filters.locationArea);
  }

  if (filters.venueSourceCategory) {
    query = query.eq("venue_source_category", filters.venueSourceCategory);
  }

  // Default: exclude faith_community events unless explicitly requested
  if (filters.audienceOpenness) {
    query = query.eq("audience_openness", filters.audienceOpenness);
  } else if (!filters.venueSourceCategory) {
    // When not filtering by venue source, hide faith_community events
    query = query.or("audience_openness.is.null,audience_openness.eq.open_to_all");
  }

  // Limit
  if (filters.limit) {
    query = query.limit(filters.limit);
  } else {
    query = query.limit(50);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching events:", error);
    throw error;
  }

  return data as BaltimoreEvent[];
}

// Fetch featured events for homepage
// First tries featured_worthy=true, falls back to highest scoring events
export async function fetchFeaturedEvents(limit = 4) {
  const supabase = getSupabase();
  const today = new Date().toISOString().split("T")[0];

  // First try to get events marked as featured
  const { data: featuredData, error: featuredError } = await supabase
    .from("baltimore_events")
    .select("*")
    .eq("is_relevant", true)
    .eq("featured_worthy", true)
    .gte("event_date_start", today)
    .order("family_friendly_score", { ascending: false })
    .limit(limit);

  if (featuredError) {
    console.error("Error fetching featured events:", featuredError);
  }

  // If we got featured events, return them
  if (featuredData && featuredData.length >= limit) {
    return featuredData as BaltimoreEvent[];
  }

  // Fall back to highest-scoring events if no/few featured ones
  const { data: topData, error: topError } = await supabase
    .from("baltimore_events")
    .select("*")
    .eq("is_relevant", true)
    .gte("event_date_start", today)
    .order("family_friendly_score", { ascending: false, nullsFirst: false })
    .order("event_date_start", { ascending: true })
    .limit(limit);

  if (topError) {
    console.error("Error fetching top events:", topError);
    throw topError;
  }

  return topData as BaltimoreEvent[];
}
