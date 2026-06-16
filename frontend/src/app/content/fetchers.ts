import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/app/content/mdx-content");

function extractHeadings(content: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { depth: number; text: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      depth: match[1].length,
      text: match[2].trim(),
    });
  }

  return headings;
}

export async function getSectionBySlug(slug: string) {
  const slugPathArray = slug.split("/");
  const fileName = slugPathArray.pop()! + ".mdx";
  const subDirectory = path.join(contentDir, ...slugPathArray);
  const filePath = path.join(subDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File with slug '${slug}' not found at path '${filePath}'`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  return {
    frontmatter,
    content,
    headings: extractHeadings(content),
    slug: path.parse(fileName).name,
  };
}

function getTitleOrName(slug: string): string {
  try {
    const slugPathArray = slug.split("/");
    const fileName = slugPathArray.pop()! + ".mdx";
    const subDirectory = path.join(contentDir, ...slugPathArray);
    const filePath = path.join(subDirectory, fileName);

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return data.title || slug.split("/").pop()!.replace(/-/g, " ");
  } catch {
    return slug.split("/").pop()!.replace(/-/g, " ");
  }
}

function collectSlugs(dir: string, base: string): string[] {
  const items = fs.readdirSync(dir);
  let slugs: string[] = [];

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    let relativePath = path.join(base, path.parse(item).name);

    relativePath = relativePath.replace(/\\/g, "/");

    if (fs.statSync(fullPath).isDirectory()) {
      slugs = slugs.concat(collectSlugs(fullPath, relativePath));
    } else if (item.endsWith(".mdx")) {
      slugs.push(relativePath);
    }
  });

  return slugs;
}

export function getAllSectionSlugs(): string[] {
  return collectSlugs(contentDir, "");
}

export async function getAdjacentSlugsWithTitles(slug: string) {
  const lowerSlug = slug.toLowerCase();
  const allSlugs = getAllSectionSlugs().map((s) => s.toLowerCase());

  const currentIndex = allSlugs.indexOf(lowerSlug);

  const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex >= 0 && currentIndex < allSlugs.length - 1
      ? allSlugs[currentIndex + 1]
      : null;

  const previousTitle = previousSlug ? getTitleOrName(previousSlug) : null;
  const nextTitle = nextSlug ? getTitleOrName(nextSlug) : null;

  return {
    previous: previousSlug ? { slug: previousSlug, title: previousTitle } : null,
    next: nextSlug ? { slug: nextSlug, title: nextTitle } : null,
  };
}