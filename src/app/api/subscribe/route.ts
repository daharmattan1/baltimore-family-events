import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeBody {
  email?: unknown;
  website?: unknown; // honeypot
  turnstileToken?: unknown;
}

function parseJsonContentType(contentType: string | null) {
  return contentType?.toLowerCase().includes("application/json") ?? false;
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function verifyTurnstileToken(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return true;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request, {
    routeKey: "subscribe",
    limit: 8,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        retryAfterSeconds: limit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfterSeconds),
        },
      }
    );
  }

  if (!parseJsonContentType(request.headers.get("content-type"))) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  let payload: SubscribeBody;
  try {
    payload = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const honeypot = typeof payload.website === "string" ? payload.website.trim() : "";
  const turnstileToken =
    typeof payload.turnstileToken === "string" ? payload.turnstileToken.trim() : "";

  if (honeypot) {
    return NextResponse.json({ error: "Request rejected" }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required" },
      { status: 400 }
    );
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Captcha verification required" },
        { status: 400 }
      );
    }

    const isValidTurnstile = await verifyTurnstileToken(turnstileToken, getClientIp(request));
    if (!isValidTurnstile) {
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 400 }
      );
    }
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.error("Beehiiv not configured", {
      hasApiKey: !!apiKey,
      hasPublicationId: !!publicationId,
    });
    return NextResponse.json(
      { error: "Newsletter service not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    if (response.status === 409) {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    console.error("Beehiiv API error", { status: response.status });

    if (response.status >= 400 && response.status < 500) {
      return NextResponse.json(
        { error: "Unable to process subscription request" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Newsletter service unavailable. Please try again." },
      { status: 502 }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
