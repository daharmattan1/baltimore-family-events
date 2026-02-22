import { NextRequest, NextResponse } from "next/server";

function isDebugRouteEnabled() {
  return process.env.NODE_ENV !== "production" && !!process.env.INTERNAL_DEBUG_TOKEN;
}

export async function GET(request: NextRequest) {
  if (!isDebugRouteEnabled()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const token = request.headers.get("x-admin-token");
  if (!token || token !== process.env.INTERNAL_DEBUG_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
}
