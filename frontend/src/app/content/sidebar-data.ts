import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface SidebarLink {
    name: string;
    href: string;
}

export interface SidebarSection {
    title: string;
    links: SidebarLink[];
}

const contentDir = path.join(process.cwd(), "src/app/content/mdx-content");

function formatTitle(name: string) {
    return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getSidebarData(): SidebarSection[] {
    return fs.readdirSync(contentDir).map((section) => {
        const sectionPath = path.join(contentDir, section);

        const links = fs
            .readdirSync(sectionPath)
            .filter((item) => item.endsWith(".mdx") || fs.statSync(path.join(sectionPath, item)).isDirectory())
            .map((item) => {
                const slug = item.replace(/\.mdx$/, "");

                let name = formatTitle(slug);

                if (item.endsWith(".mdx")) {
                    const filePath = path.join(sectionPath, item);
                    const fileContent = fs.readFileSync(filePath, "utf8");

                    const { data } = matter(fileContent);

                    if (data.title) {
                        name = data.title;
                    }
                }

                return {
                    name,
                    href: `/content/${section}/${slug}`,
                };
            });

        return {
            title: formatTitle(section),
            links,
        };
    });
}