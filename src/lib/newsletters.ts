import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Newsletter {
  slug: string;
  title: string;
  dateRange: string;
  generated: string;
  status: string;
  content: string;
}

// Get the newsletters directory path
// In development, newsletters are in the parent drafts folder
// For production, we'll need to copy them or use a different approach
function getNewslettersDirectory(): string {
  // Check multiple possible locations
  const possiblePaths = [
    path.join(process.cwd(), "content", "newsletters"),
    path.join(process.cwd(), "..", "drafts"),
    path.join(process.cwd(), "newsletters"),
    path.join(process.cwd(), "..", "..", "drafts"),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Default fallback - will be empty if doesn't exist
  return path.join(process.cwd(), "newsletters");
}

// Get all newsletters
export function getAllNewsletters(): Newsletter[] {
  const newslettersDir = getNewslettersDirectory();

  if (!fs.existsSync(newslettersDir)) {
    console.log("Newsletters directory not found:", newslettersDir);
    return [];
  }

  const files = fs.readdirSync(newslettersDir);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const newsletters = markdownFiles
    .map((filename) => {
      const filePath = path.join(newslettersDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const title = data.title || data.name || "Baltimore Family Newsletter";

      // Build clean URL slug: M-DD-YYYY/topic-slug
      // e.g. "2-11-2026/valentines-weekend-activities"
      const genDate = data.generated ? new Date(data.generated) : null;
      let slug: string;
      if (genDate && title) {
        const month = genDate.getUTCMonth() + 1;
        const day = genDate.getUTCDate();
        const year = genDate.getUTCFullYear();
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
        dateRange: data.date_range || "",
        generated: data.generated || "",
        status: data.status || "draft",
        content,
      };
    })
    // Sort by generated date, newest first
    .sort((a, b) => {
      if (!a.generated || !b.generated) return 0;
      return new Date(b.generated).getTime() - new Date(a.generated).getTime();
    });

  return newsletters;
}

// Get a single newsletter by slug
export function getNewsletterBySlug(slug: string): Newsletter | null {
  const newsletters = getAllNewsletters();
  return newsletters.find((n) => n.slug === slug) || null;
}

// Get all newsletter slugs for static generation
export function getAllNewsletterSlugs(): string[] {
  const newsletters = getAllNewsletters();
  return newsletters.map((n) => n.slug);
}
