---
title: Sidebar Accordion
---

# Sidebar Accordion ((tag|VitePress plugin|blue))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvitepress--sidebar--accordion-181717?logo=github)](https://github.com/binarynoir/vitepress-sidebar-accordion) [![npm version](https://img.shields.io/npm/v/@binarynoir/vitepress-sidebar-accordion)](https://www.npmjs.com/package/@binarynoir/vitepress-sidebar-accordion) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vitepress-sidebar-accordion/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vitepress-sidebar-accordion/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vitepress-sidebar-accordion)](https://github.com/binarynoir/vitepress-sidebar-accordion/blob/main/LICENSE)

`@binarynoir/vitepress-sidebar-accordion` turns the default theme's sidebar into an accordion: one open group per level. Opening a group closes the groups beside it, and after navigating, only the branch holding the current page stays open.

That is how the VuePress sidebar behaved, so a site moving to VitePress keeps the same feel. On a large docs site it also keeps the sidebar short.

## See it live

This site's sidebar is the demo. Try it in the sidebar beside this page:

1. Open **Richer pages**. **Navigation from your folders**, the group this page is in, closes.
2. Inside **Richer pages**, open **Markdown Tags**, then **Glossary Tooltips**. Markdown Tags closes; Richer pages stays open.
3. Follow any link in the sidebar. Only the new page's branch is left open.
4. Come back to this page and close **Navigation from your folders**, then follow the [Auto Navbar](/plugins/auto-navbar) link. The group opens again, because the page you landed on is in it.

| Reader does                        | Default VitePress                     | With the accordion                             |
| ---------------------------------- | ------------------------------------- | ---------------------------------------------- |
| Opens a group                      | Every group they opened stays open    | Open groups at the same level close            |
| Opens a group inside another group | Its siblings stay open                | Only its siblings close; the parent stays open |
| Follows a link to another page     | Groups opened along the way stay open | Only the new page's branch is left open        |
| Closes the current page's group    | It stays closed on the next page      | It opens again on the next page in that branch |

## Install

```sh
npm install --save-dev @binarynoir/vitepress-sidebar-accordion
```

## Use

**1. Theme.** Call `useSidebarAccordion()` from your theme's `setup`:

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import { useSidebarAccordion } from '@binarynoir/vitepress-sidebar-accordion';

export default {
  extends: DefaultTheme,
  setup() {
    useSidebarAccordion();
  },
};
```

**2. Sidebar.** Give each group a `collapsed` value. VitePress only draws the caret that opens and closes a group when `collapsed` is set, and the accordion works through that caret. `collapsed: true` starts the groups closed; VitePress opens the current page's branch on load.

```ts
// .vitepress/config.mts
export default defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/guide/' },
          {
            text: 'Advanced',
            collapsed: true,
            items: [{ text: 'Plugins', link: '/guide/plugins' }],
          },
        ],
      },
      { text: 'Reference', collapsed: true, items: [{ text: 'API', link: '/reference/api' }] },
    ],
  },
});
```

Groups without `collapsed` are always open, and the accordion leaves them alone.

### Options

`useSidebarAccordion()` takes an options object:

| Option        | Default | What it does                                                                                                                  |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `closeOthers` | `true`  | Close the other groups at the same level when a group is opened, and the branches beside the current page's after navigating. |

Set `closeOthers: false` to let readers open and close groups one by one without the others closing. They can keep several groups open, or start with every group closed and open only the ones they want. After each navigation the current page's branch is still opened, but nothing else is closed.

```ts
useSidebarAccordion({ closeOthers: false });
```

### With Auto Sidebar

[Auto Sidebar](/plugins/auto-sidebar/) sets `collapsed` on every group it generates through its `collapsed` option. This site does exactly that:

```ts
sidebar: generateSidebar(docsRoot, {
  collapsed: true,
}),
```

## How it works

VitePress keeps each group's open state inside its sidebar item component and offers no API to change it. So the accordion clicks the group's caret, the same button a reader would press, and VitePress's own state stays in sync.

- A click the reader makes on a group header or caret is caught in the capture phase, because the caret stops its click from bubbling. Once Vue has updated, if the group is now open, the open groups beside it, and any open groups inside those, are closed, innermost first.
- Clicks the accordion makes itself are not trusted events, so they never start another round.
- After each route change, once VitePress has opened the new page's branch, the accordion opens any group in that branch the reader had closed and closes the branches beside it.
- During the server-side build, `useSidebarAccordion()` does nothing.

It reads VitePress's own class names (`.VPSidebarItem`, `.collapsible`, `.collapsed`, `.has-active`, `.is-active`, `.caret`), so it works with the default theme's sidebar, or a custom one that renders the same markup.

## Exports

`useSidebarAccordion()` is all most sites need. The pieces it is built from are exported too, for a theme that wants to wire them up its own way:

| Export                       | What it does                                                           |
| ---------------------------- | ---------------------------------------------------------------------- |
| `handleSidebarClick(event)`  | The capture-phase click handler `useSidebarAccordion` adds.            |
| `keepActiveBranchOnly(root)` | Opens the current page's branch and closes the rest.                   |
| `openActiveBranch(root)`     | Opens the current page's branch and leaves the rest as they are.       |
| `closeOpenSiblings(item)`    | Closes the open groups beside `item`, and any open groups inside them. |
| `getSiblingItems(item)`      | The sidebar items at the same level as `item`.                         |
| `toggleGroup(group)`         | Opens or closes a group by clicking its caret.                         |
| `isOpenGroup(item)`          | Whether `item` is a group that is currently open.                      |
| `GROUP_SELECTOR` and friends | The CSS selectors above, for matching the same elements in theme code. |

## Limits

- **Default theme markup only.** A theme that replaces the sidebar with different markup needs its own accordion.
- **Groups need `collapsed`.** A group without it has no caret, and stays open.

[Source and full README on GitHub](https://github.com/binarynoir/vitepress-sidebar-accordion)
