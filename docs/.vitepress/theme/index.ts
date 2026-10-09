import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { registerMarkdownTags } from '@binarynoir/vitepress-markdown-tags/theme';
import '@binarynoir/vitepress-markdown-tags/style.css';
import { enableGlossaryTouch } from 'markdown-it-glossary/client';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registers the <MarkdownTag> component that ((tag|...)) compiles to.
    registerMarkdownTags(app);
    // Tap a glossary term to see its definition on touch screens, where hover doesn't exist.
    enableGlossaryTouch();
  },
} satisfies Theme;
