import { createClient } from "@supabase/supabase-js";

// Lazy-initialize Supabase client to avoid build-time errors
// Supports both NEXT_PUBLIC_ prefixed vars and Vercel Supabase integration vars
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function parseJwtPayload(token: string): Record<string, unknown> | null {
  const segments = token.split(".");
  if (segments.length !== 3) {
    return null;
  }

  try {
    const normalized = segments[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const decoded = atob(padded);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function isServiceRoleKey(key: string): boolean {
  if (key.toLowerCase().includes("service_role")) {
    return true;
  }

  const payload = parseJwtPayload(key);
  return payload?.role === "service_role";
}

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
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase anon credentials. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  if (isServiceRoleKey(supabaseAnonKey)) {
    throw new Error(
      "Refusing to initialize website Supabase client with a service-role key."
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
  is_recurring?: boolean;
  recurrence_pattern?: string;
  is_relevant?: boolean;
  family_friendly_score?: number;
  featured_worthy?: boolean;
  is_sold_out?: boolean;
  moderation_status?: string;
}

// Filter options for the calendar (multi-select arrays)
export interface EventFilters {
  startDate?: string;
  endDate?: string;
  eventType?: string[];
  ageRange?: string[];
  costType?: string[];
  locationArea?: string[];
  includeFaith?: boolean;
  limit?: number;
}

// Fetch events with optional filters
// Note: baltimore schema is set at client initialization
export async function fetchEvents(filters: EventFilters = {}) {
  const supabase = getSupabase();
  const today = new Date().toISOString().split("T")[0];

  let query = supabase
    .from("baltimore_events")
    .select("*")
    .eq("is_relevant", true)
    .in("moderation_status", ["auto_approved", "approved"])
    .not("event_type", "in", '("class","camp")')
    .order("event_date_start", { ascending: true });

  // Date range filter
  if (filters.startDate) {
    query = query.gte("event_date_start", filters.startDate);
  } else {
    // Keep recurring entries visible even when their original start date is in the past.
    query = query.or(`event_date_start.gte.${today},is_recurring.eq.true`);
  }

  if (filters.endDate) {
    query = query.lte("event_date_start", filters.endDate);
  }

  // Category filters (multi-select: use .in() for arrays)
  if (filters.eventType && filters.eventType.length > 0) {
    query = query.in("event_type", filters.eventType);
  }

  if (filters.ageRange && filters.ageRange.length > 0) {
    query = query.in("age_range_category", filters.ageRange);
  }

  if (filters.costType && filters.costType.length > 0) {
    query = query.in("cost_type", filters.costType);
  }

  if (filters.locationArea && filters.locationArea.length > 0) {
    query = query.in("location_area", filters.locationArea);
  }

  // Faith & Community toggle: when OFF (default), exclude faith_community events
  if (!filters.includeFaith) {
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
// Only shows events within the next 7 days
export async function fetchFeaturedEvents(limit = 4) {
  const supabase = getSupabase();
  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  // First try to get events marked as featured (within next 7 days)
  const { data: featuredData, error: featuredError } = await supabase
    .from("baltimore_events")
    .select("*")
    .eq("is_relevant", true)
    .in("moderation_status", ["auto_approved", "approved"])
    .eq("featured_worthy", true)
    .gte("event_date_start", today)
    .lte("event_date_start", nextWeek)
    .order("family_friendly_score", { ascending: false })
    .limit(limit);

  if (featuredError) {
    console.error("Error fetching featured events:", featuredError);
  }

  // If we got featured events, return them
  if (featuredData && featuredData.length >= limit) {
    return featuredData as BaltimoreEvent[];
  }

  // Fall back to highest-scoring events within next 7 days
  const { data: topData, error: topError } = await supabase
    .from("baltimore_events")
    .select("*")
    .eq("is_relevant", true)
    .in("moderation_status", ["auto_approved", "approved"])
    .gte("event_date_start", today)
    .lte("event_date_start", nextWeek)
    .order("family_friendly_score", { ascending: false, nullsFirst: false })
    .order("event_date_start", { ascending: true })
    .limit(limit);

  if (topError) {
    console.error("Error fetching top events:", topError);
    throw topError;
  }

  return topData as BaltimoreEvent[];
}

// Fetch events for next 3 weekends (Fri-Sun), excluding classes
export async function fetchWeekendEvents(filters: EventFilters = {}) {
  const supabase = getSupabase();
  const today = new Date();

  // Calculate next 3 Fri-Sun windows
  const weekends: { start: string; end: string }[] = [];
  const current = new Date(today);

  // Find next Friday (or today if it's Fri/Sat/Sun)
  const dayOfWeek = current.getDay();
  let daysUntilFriday: number;
  if (dayOfWeek === 5) daysUntilFriday = 0; // Friday
  else if (dayOfWeek === 6) daysUntilFriday = 6; // Saturday -> next Friday
  else if (dayOfWeek === 0) daysUntilFriday = 5; // Sunday -> next Friday
  else daysUntilFriday = 5 - dayOfWeek;

  // But if today is Sat or Sun, include this weekend too
  let firstFriday: Date;
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    // We're in a weekend — find the Friday of THIS weekend
    const thisFriday = new Date(today);
    thisFriday.setDate(today.getDate() - (dayOfWeek === 6 ? 1 : 2));
    firstFriday = thisFriday;
  } else {
    firstFriday = new Date(today);
    firstFriday.setDate(today.getDate() + daysUntilFriday);
  }

  for (let i = 0; i < 3; i++) {
    const friday = new Date(firstFriday);
    friday.setDate(firstFriday.getDate() + i * 7);
    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);
    weekends.push({
      start: friday.toISOString().split("T")[0],
      end: sunday.toISOString().split("T")[0],
    });
  }

  // Fetch all events within the 3-weekend window
  const overallStart = weekends[0].start;
  const overallEnd = weekends[2].end;

  let query = supabase
    .from("baltimore_events")
    .select("*")
    .eq("is_relevant", true)
    .in("moderation_status", ["auto_approved", "approved"])
    .not("event_type", "in", '("class","camp")')
    .gte("event_date_start", overallStart < today.toISOString().split("T")[0] ? today.toISOString().split("T")[0] : overallStart)
    .lte("event_date_start", overallEnd)
    .order("event_date_start", { ascending: true })
    .limit(200);

  // Apply same filters as main view
  if (filters.eventType && filters.eventType.length > 0) {
    query = query.in("event_type", filters.eventType);
  }
  if (filters.ageRange && filters.ageRange.length > 0) {
    query = query.in("age_range_category", filters.ageRange);
  }
  if (filters.costType && filters.costType.length > 0) {
    query = query.in("cost_type", filters.costType);
  }
  if (filters.locationArea && filters.locationArea.length > 0) {
    query = query.in("location_area", filters.locationArea);
  }
  if (!filters.includeFaith) {
    query = query.or("audience_openness.is.null,audience_openness.eq.open_to_all");
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching weekend events:", error);
    throw error;
  }

  // Group events by weekend window
  const allEvents = data as BaltimoreEvent[];
  const grouped = weekends.map((weekend) => ({
    ...weekend,
    events: allEvents.filter((e) => {
      const d = e.event_date_start?.split("T")[0] || "";
      return d >= weekend.start && d <= weekend.end;
    }),
  }));

  return grouped;
}

// Venue type matching the baltimore.venues table
export interface BaltimoreVenue {
  id: number;
  name: string;
  google_place_id?: string;
  generated_id?: string;
  category: string;
  subcategory?: string;
  county?: string;
  address?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  user_ratings_total?: number;
  website?: string;
  phone?: string;
  hours?: string[];
  google_types?: string[];
  triage_tier?: string;
  enabled?: boolean;
}

// Fetch venues grouped by category, P1 first then by rating
export async function fetchVenues() {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("baltimore_venues")
    .select("*")
    .order("triage_tier", { ascending: true })
    .order("rating", { ascending: false, nullsFirst: false })
    .limit(500);

  if (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }

  return data as BaltimoreVenue[];
}

// Fetch classes and camps (registration-required activities)
export async function fetchClasses() {
  const supabase = getSupabase();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("baltimore_events")
    .select("*")
    .eq("is_relevant", true)
    .in("moderation_status", ["auto_approved", "approved"])
    .in("event_type", ["class", "camp"])
    .or(`event_date_start.gte.${today},is_recurring.eq.true`)
    .order("event_date_start", { ascending: true })
    .limit(100);

  if (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }

  return data as BaltimoreEvent[];
}
