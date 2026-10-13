import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { registerMarkdownTags } from '@binarynoir/vitepress-markdown-tags/theme';
import '@binarynoir/vitepress-markdown-tags/style.css';
import { enableGlossaryTooltips } from 'markdown-it-glossary/client';
import { enableHtmlEscapeHints } from '@binarynoir/vitepress-html-escape/client';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registers the <MarkdownTag> component that ((tag|...)) compiles to.
    registerMarkdownTags(app);
    // Glossary definitions in a popover on hover, click and tap (title tooltips never show on touch screens).
    enableGlossaryTooltips();
    // Wavy underlines and fix-it popovers on pages that turn on HTML Escape hints.
    enableHtmlEscapeHints();
  },
} satisfies Theme;
