import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { registerMarkdownTags } from '@binarynoir/vitepress-markdown-tags/theme';
import '@binarynoir/vitepress-markdown-tags/style.css';
import { enableGlossaryTooltips } from 'markdown-it-glossary/client';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registers the <MarkdownTag> component that ((tag|...)) compiles to.
    registerMarkdownTags(app);
    // Glossary definitions in a popover on hover, click and tap (title tooltips never show on touch screens).
    enableGlossaryTooltips();
  },
} satisfies Theme;
