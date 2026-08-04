import { fileURLToPath, URL } from 'node:url'

import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'

import { contentPlugin } from './plugins/content-plugin.mjs'
import { remarkHeadingId } from './plugins/remark-heading-id.mjs'

const src = fileURLToPath(new URL('./src', import.meta.url))
const contentDir = fileURLToPath(new URL('./src/content', import.meta.url))

// Code blocks are dark in BOTH themes (see design tokens), so a single dark
// Shiki theme is correct — the container background is set by our own CSS.
const prettyCode = {
  theme: 'github-dark-default',
  keepBackground: false,
}

export default defineConfig({
  plugins: [
    // Runs before MDX: bridges `{#slug}` and serves virtual:content-index.
    contentPlugin({ contentDir }),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkGfm,
          remarkHeadingId,
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, prettyCode],
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      }),
    },
    react(),
  ],
  resolve: {
    alias: {
      // Import as "@/components/Button" instead of "../../components/Button".
      // Mirrored in tsconfig.app.json "paths" (bundler + type checker).
      '@': src,
    },
  },
  css: {
    preprocessorOptions: {
      // Lets .module.scss files write `@use 'styles/mixins' as *;` from anywhere.
      scss: { loadPaths: [src] },
    },
  },
})
