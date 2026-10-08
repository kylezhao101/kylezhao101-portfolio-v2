import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import { getSidebarData } from "@/app/content/sidebar-data";

export const metadata: Metadata = {
  title: "Kyle Zhao · Case Studies",
  description: "Projects and engineering experience from Kyle Zhao.",
};

export default function DocumentationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarData = getSidebarData();

  return (
    <div className="flex max-w-screen-2xl mr-auto ml-auto">
      <div className="lg:pl-6">
        <Sidebar sidebarData={sidebarData} />
      </div>
      <div className="min-w-0 pt-[4.5rem] mb-20 w-full mr-auto ml-auto pl-3 pr-3 sm:pl-6 sm:pr-6 lg:pt-14">
        {children}
      </div>
    </div>
  );
}
