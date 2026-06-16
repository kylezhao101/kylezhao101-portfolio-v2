import fs from "fs";
import path from "path";

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

                return {
                    name: formatTitle(slug),
                    href: `/content/${section}/${slug}`,
                };
            });

        return {
            title: formatTitle(section),
            links,
        };
    });
}