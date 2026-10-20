---
title: 'Sidebar Accordion 0.3: filter long sidebars'
blog:
  date: 2026-10-16
  summary: Sidebar Accordion 0.3.0 adds a filter field that narrows a long sidebar to the pages that match.
  tags: [release, sidebar-accordion]
  category: Plugins
---

# Sidebar Accordion 0.3: filter long sidebars

[Sidebar Accordion](/plugins/sidebar-accordion) 0.3.0 adds a filter field at the top of the sidebar.

Type in it and the sidebar narrows to the pages that match, with the groups above each match held open. Clear it and every group goes back to how it was.

- Words can match the groups above a page, not just the page's own title.
- Case and accents are ignored, and matches are highlighted.
- The field only appears on sidebars with at least 20 links. Change that with `minItems`, and its wording with `labels`.

Turn it on with the `filter` option:

```ts
useSidebarAccordion({ filter: { minItems: 20 } });
```

Or use `useSidebarFilter()` to add the filter without the accordion. The Plugins sidebar on this site has it: try it there.
