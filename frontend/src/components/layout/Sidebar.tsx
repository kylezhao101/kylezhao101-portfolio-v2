import Link from "next/link";

interface SidebarLink {
  name: string;
  href: string;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

export default function Sidebar({
  sidebarData,
}: {
  sidebarData: SidebarSection[];
}) {
  return (
    <div className="hidden lg:block min-w-fit sticky top-28 h-screen w-60">
        {sidebarData.map((section) => (
          <div key={section.title} className="mb-4">
            <h3 className="mb-3 text-sm font-semibold">{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li className="mb-2 pl-4" key={link.name}>
                  <Link
                    className="text-sm opacity-75 hover:opacity-100"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
