---
title: Sidebar Titles Demo
---

# Sidebar Titles Demo

This folder exists to show [Auto Sidebar](/plugins/auto-sidebar/)'s title options on this site's real sidebar. Its pages are left untitled in `.sidebar`, so each title in the sidebar is one the plugin worked out:

<<< @/plugins/auto-sidebar/titles-demo/.sidebar{txt}

This site passes these options:

```ts
generateSidebar(docsRoot, {
  titleReplacements: { github: 'GitHub' },
  transformTitle: (title, { source }) =>
    source === 'page' ? title.replace(/^Example: /, '') : undefined,
  groupTitleFromIndex: true,
});
```

| In the sidebar                                 | Where it comes from                                                                                                                                                                                                     |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sidebar Titles Demo**, the group label       | This page's `title`, with `groupTitleFromIndex`. The folder is `titles-demo`, and its parent `.sidebar` doesn't name it, so without the option the label would be "Titles Demo".                                        |
| [GitHub Actions Setup](./github-actions-setup) | The file name `github-actions-setup.md`, since the page has no title or `# Heading`. `titleReplacements` turns "Github" into "GitHub".                                                                                  |
| [Guide to the Cli](./guide-to-the-cli)         | The file name `guide-to-the-cli.md`. `titleCase` (on by default) keeps "to" and "the" lowercase mid-title.                                                                                                              |
| [Draft notes](./draft-notes)                   | The page's heading, `# Draft notes ((tag\|draft\|orange))`. `stripTags` (on by default) removes the tag from the sidebar, and the page still shows the badge.                                                           |
| [Renamed page](./example-renamed-page)         | The page's heading, `# Example: Renamed page`. `transformTitle` removes the "Example: " prefix from page titles.                                                                                                        |
| [VitePress docs](https://vitepress.dev)        | The `.sidebar` line `https://vitepress.dev: 'VitePress docs'`. A single-quoted title after a space works, and so does a double-quoted one. A line that can't be parsed logs a warning naming the file and line instead. |
