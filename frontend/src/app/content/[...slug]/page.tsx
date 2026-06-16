import fs from "fs";
import path from "path";
import { getSectionBySlug, getAdjacentSlugsWithTitles } from "../fetchers";
// import 'github-markdown-css/github-markdown-light.css';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import React from "react";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const contentDir = path.join(process.cwd(), "src/app/content/mdx-content");

function getFirstMdxFileInDirectory(directoryPath: string): string | null {
  const files = fs.readdirSync(directoryPath).filter((file) => file.endsWith('.mdx'));

  // Return the first file in alphabetical order if available
  if (files.length > 0) {
    return path.parse(files[0]).name;
  }

  return null; // If no MDX file is found
}

function resolveDefaultFile(slugArray: string[] = []): string[] {
  const currentPath = path.join(contentDir, ...slugArray);

  if (fs.existsSync(currentPath) && fs.statSync(currentPath).isDirectory()) {
    // Get the first MDX file in the directory
    const defaultFile = getFirstMdxFileInDirectory(currentPath);

    // Append the default file name to the path if it exists
    if (defaultFile) {
      return [...slugArray, defaultFile];
    }
  }

  // If it's not a directory or no file is found, return the original slug
  return slugArray;
}

const headingComponents: Components = {
  h1: ({ children, ...props }) => {
    const id = typeof children === "string"
      ? children.replace(/\s+/g, "-").toLowerCase()
      : "";
    return <h1 id={id} {...props}>{children}</h1>;
  },
  h2: ({ children, ...props }) => {
    const id = typeof children === "string"
      ? children.replace(/\s+/g, "-").toLowerCase()
      : "";
    return <h2 id={id} {...props}>{children}</h2>;
  },
  h3: ({ children, ...props }) => {
    const id = typeof children === "string"
      ? children.replace(/\s+/g, "-").toLowerCase()
      : "";
    return <h3 id={id} {...props}>{children}</h3>;
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const slugArray = slug ?? [];

  const resolvedSlugArray = resolveDefaultFile(slugArray);
  const combinedSlug = resolvedSlugArray.join("/");

  const section = await getSectionBySlug(combinedSlug);

  const { previous, next } = await getAdjacentSlugsWithTitles(combinedSlug);
  // Construct URLs for previous and next links
  const previousLink = previous ? `/content/${previous.slug}` : null;
  const nextLink = next ? `/content/${next.slug}` : null;

  // Create base path for the breadcrumbs
  const basePath = "/content";
  let accumulatedPath = basePath;

  const toc = section.headings.map(
    ({ text, depth }: { text: string; depth: number }) => ({
      text,
      depth,
      id: text.replace(/\s+/g, '-').toLowerCase(),
    })
  );

  // Build the breadcrumb list dynamically
  const breadcrumbs = resolvedSlugArray.map((segment, index) => {
    accumulatedPath += `/${segment}`;

    // Determine if this is the last item (current page)
    const isLast = index === resolvedSlugArray.length - 1;

    return isLast ? (
      <BreadcrumbItem key={segment}>
        <BreadcrumbPage>{section.frontmatter.title || segment}</BreadcrumbPage>
      </BreadcrumbItem>
    ) : (
      <BreadcrumbItem key={segment}>
        <BreadcrumbLink href={accumulatedPath}>{segment.replace(/-/g, ' ')}</BreadcrumbLink>
      </BreadcrumbItem>
    );
  });

  const tocList = toc?.map(({ text, depth, id }) => (
    <li key={id} className="mb-2 text-sm opacity-75 hover:opacity-100" style={{ marginLeft: (depth - 1) * 16 }}>
      <a href={`#${id}`}>{text}</a>
    </li>
  )) || null;

  return (
    <div className="flex">
      <section className="flex flex-col w-full gap-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/content/about-this-site/dynamic-generation">kyle.z</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                {breadcrumb}
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="min-w-0 md:max-w-5xl m-0 ">
          <article className="object-contain markdown-body inline-block max-w-full ">
            <ReactMarkdown components={headingComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} >
              {section.content}
            </ReactMarkdown>
          </article>
        </div>

        <div className="mt-14 flex justify-between">
          {previousLink ? (
            <Button asChild variant="outline">
              <Link href={previousLink}>
                <ChevronLeft className="h-4 w-4" /> {previous?.title}
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {nextLink ? (
            <Button asChild variant="outline">
              <Link href={nextLink}>
                {next?.title} <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* TOC Sidebar */}
      {
        tocList && (
          <aside className="pl-10 hidden xl:block min-w-64 sticky top-28 h-screen">
            <h2 className="mb-3 text-sm font-semibold">On this page</h2>
            <Separator className="mb-3" />
            <ul>{tocList}</ul>
          </aside>
        )
      }
    </div >
  );
}