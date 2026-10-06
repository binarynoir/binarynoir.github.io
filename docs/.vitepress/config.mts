import { defineConfig } from 'vitepress';
import path from 'node:path';
import { glossaryAbbr } from 'markdown-it-glossary';
import { readingTimeTag } from '@binarynoir/vitepress-reading-time-tag';
import { markdownTags, stripTags } from '@binarynoir/vitepress-markdown-tags';
import { taggedPagesVitePlugin } from '@binarynoir/vitepress-markdown-tags/vitepress';
import { generateNav } from '@binarynoir/vitepress-auto-navbar';
import { generateSidebar } from '@binarynoir/vitepress-auto-sidebar';
import { imageFallbackPlugin } from '@binarynoir/vite-plugin-image-fallback';
import { optimizeImagesPlugin } from '@binarynoir/vite-plugin-optimize-images';

// import.meta.dirname, not __dirname: VitePress configs are ESM.
const docsRoot = path.resolve(import.meta.dirname, '..');

const SITE_URL = 'https://binarynoir.github.io';

export default defineConfig({
  title: 'BinaryNoir',
  description: 'Open-source tools and VitePress plugins by BinaryNoir, with live demos.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: { hostname: SITE_URL },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#7a5add' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'BinaryNoir' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Open-source tools and VitePress plugins by BinaryNoir, with live demos.',
      },
    ],
    ['meta', { property: 'og:url', content: SITE_URL }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    // @binarynoir/vitepress-auto-navbar: top nav built from the folder tree.
    // `.nav` files set order and titles; `.inherit` borrows titles from `.sidebar`.
    nav: generateNav(docsRoot, {
      maxDepth: 2,
      configFilenames: ['.nav', '.sidebar'],
    }),

    // @binarynoir/vitepress-auto-sidebar: one sidebar per top-level folder.
    sidebar: generateSidebar(docsRoot, {
      maxDepth: 3,
      maxTitleLength: 50,
    }),

    socialLinks: [{ icon: 'github', link: 'https://github.com/binarynoir' }],

    search: { provider: 'local' },

    editLink: {
      pattern: 'https://github.com/binarynoir/binarynoir.github.io/edit/main/docs/:path',
      text: 'Suggest a change to this page',
    },

    footer: {
      message: 'Released under the MIT License. Built with VitePress and the plugins it documents.',
      copyright: 'Copyright © John Smith III / BinaryNoir',
    },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    config(md) {
      // markdown-it-glossary: hover definitions from docs/glossary.md on every page.
      // A page opts out with `glossary: false` in its frontmatter.
      md.use(glossaryAbbr, { file: path.join(docsRoot, 'glossary.md') });
      // @binarynoir/vitepress-reading-time-tag: [[readingTime]] becomes a tip block.
      md.use(readingTimeTag);
      // @binarynoir/vitepress-markdown-tags: ((tag|Done|green)) becomes a badge.
      md.use(markdownTags);
    },
  },

  // Keep ((tag|...)) syntax out of <title>, search results and the page outline.
  transformPageData(pageData) {
    if (typeof pageData.title === 'string') {
      pageData.title = stripTags(pageData.title);
    }
    if (typeof pageData.frontmatter?.title === 'string') {
      pageData.frontmatter.title = stripTags(pageData.frontmatter.title);
    }
  },

  vite: {
    plugins: [
      // Missing image imports become a placeholder plus a console warning
      // instead of failing the build.
      imageFallbackPlugin(),
      // Re-compress PNG/JPEG/WebP in the build output. Source files are untouched.
      optimizeImagesPlugin({ verbose: true }),
      // Keeps `tagged: true` pages current while running `vitepress dev`.
      taggedPagesVitePlugin(),
    ],
  },
});
