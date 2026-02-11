import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const debug: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    envVars: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
      SUPABASE_KEY: !!process.env.SUPABASE_KEY,
    },
  };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                      process.env.SUPABASE_ANON_KEY ||
                      process.env.SUPABASE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      // Test with public schema first
      const publicClient = createClient(supabaseUrl, supabaseKey);
      const { data: publicTest, error: publicError } = await publicClient
        .from("events")
        .select("count")
        .limit(1);

      debug.publicSchemaTest = {
        success: !publicError,
        error: publicError?.message,
        hint: publicError?.hint,
        code: publicError?.code,
      };

      // Test with baltimore schema
      const baltimoreClient = createClient(supabaseUrl, supabaseKey, {
        db: { schema: "baltimore" },
      });
      const { data: baltimoreTest, error: baltimoreError } = await baltimoreClient
        .from("events")
        .select("id, title")
        .limit(1);

      debug.baltimoreSchemaTest = {
        success: !baltimoreError,
        error: baltimoreError?.message,
        hint: baltimoreError?.hint,
        code: baltimoreError?.code,
        rowCount: baltimoreTest?.length,
        sample: baltimoreTest?.[0] ? { id: baltimoreTest[0].id, title: baltimoreTest[0].title?.substring(0, 50) } : null,
      };
    } catch (err) {
      debug.connectionError = err instanceof Error ? err.message : String(err);
    }
  } else {
    debug.error = "Missing Supabase credentials";
  }

  return NextResponse.json(debug);
}
