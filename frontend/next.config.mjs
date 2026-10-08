import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  env: {
    NEXT_PUBLIC_LAST_UPDATED: new Date().toISOString().slice(0, 10),
  },
  async redirects() {
    return [
      { source: '/content', destination: '/about-this-site/dynamic-generation', permanent: true },
      { source: '/content/:path+', destination: '/:path+', permanent: true },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
