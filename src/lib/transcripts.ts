import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface TranscriptAgent {
  name: string;
  role: string;
}

export interface Transcript {
  slug: string;
  title: string;
  date: string;
  dateRange: string;
  agents: TranscriptAgent[];
  rounds: number;
  newsletterSlug: string;
  status: string;
  content: string;
}

// Get the transcripts directory path
function getTranscriptsDirectory(): string {
  const possiblePaths = [
    path.join(process.cwd(), "content", "transcripts"),
    path.join(process.cwd(), "..", "drafts"),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  return path.join(process.cwd(), "content", "transcripts");
}

// Get all transcripts
export function getAllTranscripts(): Transcript[] {
  const transcriptsDir = getTranscriptsDirectory();

  if (!fs.existsSync(transcriptsDir)) {
    return [];
  }

  const files = fs.readdirSync(transcriptsDir);
  const markdownFiles = files.filter(
    (file) => file.endsWith(".md") && file.includes("transcript")
  );

  const transcripts = markdownFiles
    .map((filename) => {
      const filePath = path.join(transcriptsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const title = data.title || "Agent Discussion";
      const date = data.date || "";

      // Build clean URL slug: M-DD-YYYY/topic-slug
      const parsedDate = date ? new Date(date) : null;
      let slug: string;
      if (parsedDate && title) {
        const month = parsedDate.getUTCMonth() + 1;
        const day = parsedDate.getUTCDate();
        const year = parsedDate.getUTCFullYear();
        const topicSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 60)
          .replace(/-$/, "");
        slug = `${month}-${day}-${year}/${topicSlug}`;
      } else {
        slug = filename.replace(".md", "");
      }

      return {
        slug,
        title,
        date,
        dateRange: data.date_range || "",
        agents: (data.agents || []) as TranscriptAgent[],
        rounds: data.rounds || 0,
        newsletterSlug: data.newsletter_slug || "",
        status: data.status || "draft",
        content,
      };
    })
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return transcripts;
}

// Get a single transcript by slug
export function getTranscriptBySlug(slug: string): Transcript | null {
  const transcripts = getAllTranscripts();
  return transcripts.find((t) => t.slug === slug) || null;
}

// Get all transcript slugs for static generation
export function getAllTranscriptSlugs(): string[] {
  const transcripts = getAllTranscripts();
  return transcripts.map((t) => t.slug);
}

// Get transcript for a specific newsletter (by newsletter slug)
export function getTranscriptForNewsletter(
  newsletterSlug: string
): Transcript | null {
  const transcripts = getAllTranscripts();
  return transcripts.find((t) => t.newsletterSlug === newsletterSlug) || null;
}
