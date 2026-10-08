import type { MDXComponents } from "mdx/types";
import { headingComponents } from "@/lib/content/heading-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...headingComponents, ...components };
}
