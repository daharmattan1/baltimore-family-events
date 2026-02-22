# Baltimore Family Events Website

A Next.js 16 website for the Baltimore Family Events newsletter, featuring an event calendar, newsletter archive, and the 5-agent curation methodology.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (event data)
- **Email:** Beehiiv (newsletter signups)
- **Deployment:** Vercel (auto-deploy on push)

## Getting Started

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
```

### Development

This project follows the STEEPWORKS workflow - NO local dev server. Instead:

1. Make changes to TSX files
2. Commit and push to GitHub
3. Vercel auto-deploys in ~30-60 seconds
4. Verify at production URL

### Security Smoke Test

Run the security smoke checks against local or deployed API routes:

```powershell
./scripts/security_smoke.ps1 -BaseUrl "https://your-site-url"
```

What it validates:
- `/api/debug` is not publicly accessible.
- `/api/events` rejects malformed/unsafe query inputs.
- `/api/subscribe` enforces JSON content type.
- `/api/subscribe` rejects honeypot submissions.
- `/api/subscribe` rate-limits repeated abuse patterns.

### Pages

| Page | Path | Description |
|------|------|-------------|
| Homepage | `/` | Hero, featured events, how it works, CTA |
| Calendar | `/calendar` | Event grid with filters |
| Newsletter | `/newsletter` | Archive of past issues |
| About | `/about` | 5-agent methodology explanation |
| Subscribe | `/subscribe` | Beehiiv signup embed |

## Brand Colors

| Token | Name | Hex |
|-------|------|-----|
| primary | Charm City Blue | #0077B6 |
| accent | Crab Orange | #E85D04 |
| text | Harbor Gray | #374151 |
| text-dark | Boh Black | #1A1A1A |
| bg | Row House White | #FAFAFA |
| card | Formstone Cream | #F5F0E8 |
| muted | Inner Harbor | #9CA3AF |

## Deployment

Deployed to Vercel. Auto-deploys on push to main branch.

---

Built with ❤️ in Baltimore.
