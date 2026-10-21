import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { registerMarkdownTags } from '@binarynoir/vitepress-markdown-tags/theme';
import '@binarynoir/vitepress-markdown-tags/style.css';
import { enableGlossaryTooltips } from 'markdown-it-glossary/client';
import { enableHtmlEscapeHints } from '@binarynoir/vitepress-html-escape/client';
import { enableBrokenLinkHints } from '@binarynoir/vitepress-broken-links/client';
import { enableImageFallbackHints } from '@binarynoir/vite-plugin-image-fallback/client';
import { useSidebarAccordion } from '@binarynoir/vitepress-sidebar-accordion';
import { BlogAnnouncementBanner, useBlog } from '@binarynoir/vitepress-blog/client';
import '@binarynoir/vitepress-blog/style.css';
import './custom.css';

export default {
  extends: DefaultTheme,
  // Blog posts marked `announcement` show in a one-line banner above the nav bar.
  Layout: () => h(DefaultTheme.Layout, null, { 'layout-top': () => h(BlogAnnouncementBanner) }),
  enhanceApp({ app }) {
    // Registers the <MarkdownTag> component that ((tag|...)) compiles to.
    registerMarkdownTags(app);
    // Glossary definitions in a popover on hover, click and tap (title tooltips never show on touch screens).
    enableGlossaryTooltips();
    // Wavy underlines and fix-it popovers on pages that turn on HTML Escape hints.
    enableHtmlEscapeHints();
    // Wavy underlines and popovers on links to pages that don't exist.
    enableBrokenLinkHints();
    // Dashed outlines and popovers on placeholders for images that are missing.
    enableImageFallbackHints();
  },
  setup() {
    // One open sidebar group per level, and only the current page's branch open after navigating.
    // The filter field only appears on sidebars with 20 or more links: the Plugins
    // sidebar (nearly 40, with the demo pages) gets one; Guide, Apps and Reference don't.
    useSidebarAccordion({ filter: { minItems: 20 } });
    // Blog pages: one page of posts at a time (?page=2), and keyword filters (?tag=release).
    useBlog();
  },
} satisfies Theme;
