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
import { downloadsMarkdown, downloadsVitePlugin } from '@binarynoir/vitepress-downloads';
import { downloadsSrcExclude } from '@binarynoir/vitepress-downloads/vitepress';
import { markdownHtmlEscape } from '@binarynoir/vitepress-html-escape';
import { markdownBrokenLinks } from '@binarynoir/vitepress-broken-links';
import { excludeSrc, excludeVitePlugin } from '@binarynoir/vitepress-exclude';
import { readmeLinks, readmeRewrites } from '@binarynoir/vitepress-readme-index';

// import.meta.dirname, not __dirname: VitePress configs are ESM.
const docsRoot = path.resolve(import.meta.dirname, '..');

const SITE_URL = 'https://binarynoir.github.io';

// @binarynoir/vitepress-downloads: the same options go to all three pieces below.
const downloadsOptions = { folders: ['downloads', 'files'] };

export default defineConfig({
  title: 'BinaryNoir',
  description: 'Open-source tools and VitePress plugins by BinaryNoir, with live demos.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  srcExclude: [
    // Files in a `downloads` or `files` folder are published as-is, never built as pages.
    ...downloadsSrcExclude(downloadsOptions),
    // @binarynoir/vitepress-exclude: whatever a folder's `.exclude` file lists is not built.
    // The same files hide those pages from the sidebar and navbar.
    ...excludeSrc(docsRoot),
  ],

  // @binarynoir/vitepress-readme-index: a folder's README.md is served as its index page,
  // as VuePress did, so a VuePress site can move over without renaming files.
  rewrites: readmeRewrites(docsRoot),

  sitemap: { hostname: SITE_URL },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    // Above-the-fold display font, fetched early to avoid a flash of fallback text.
    [
      'link',
      {
        rel: 'preload',
        href: '/fonts/film-noir.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: '',
      },
    ],
    ['meta', { name: 'theme-color', content: '#111111' }],
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
    siteTitle: false,
    logo: { light: '/logo-wide-light.svg', dark: '/logo-wide-dark.svg', alt: 'BinaryNoir' },

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
      message:
        'Code released under the MIT License. BinaryNoir name and logos are trademarks of BinaryNoir. <a href="/legal">Legal</a> · <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a>',
      copyright:
        'Copyright © 2026 John Smith III / BinaryNoir. All rights reserved except where licensed.',
    },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    config(md) {
      // markdown-it-glossary: hover definitions from docs/reference/glossary.md on every page.
      // A page opts out with `glossary: false` in its frontmatter.
      md.use(glossaryAbbr, {
        file: path.join(docsRoot, 'reference/glossary.md'),
        root: docsRoot,
        // Not the default `glossary.md`, so a page with that name is never read as a section glossary.
        scopedFile: 'section-glossary.md',
      });
      // @binarynoir/vitepress-reading-time-tag: [[readingTime]] becomes a tip block.
      md.use(readingTimeTag);
      // @binarynoir/vitepress-markdown-tags: ((tag|Done|green)) becomes a badge.
      md.use(markdownTags);
      // @binarynoir/vitepress-downloads: links into a `downloads` or `files` folder become file downloads.
      md.use(downloadsMarkdown, downloadsOptions);
      // @binarynoir/vitepress-readme-index: a link to README.md goes to the page it is served as.
      md.use(readmeLinks);
      // @binarynoir/vitepress-html-escape: stray tags like Array<string>, and {{ }} in prose,
      // render as text instead of breaking the Vue compile. It runs after every other rule.
      // In `vitepress dev`, hints underline each fix and explain it; `vitepress build` leaves them out.
      md.use(markdownHtmlEscape, { hints: process.env.NODE_ENV !== 'production' });
      // @binarynoir/vitepress-broken-links: a link to a page that doesn't exist renders as text
      // with a popover explaining it, and a warning in the log, instead of failing the build.
      md.use(markdownBrokenLinks);
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
      // Publishes the files in each `downloads` or `files` folder at their page-relative URL.
      downloadsVitePlugin(downloadsOptions),
      // Restarts `vitepress dev` when an `.exclude` file changes, so new rules apply right away.
      excludeVitePlugin(),
    ],
  },
});
