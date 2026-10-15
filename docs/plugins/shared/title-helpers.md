<!-- Included in the Auto Sidebar and Auto Navbar pages. Not built as a page: see docs/plugins/.exclude. -->

### Use the title helpers in your own code

Auto Sidebar and Auto Navbar both export the functions they use to make titles. Your `config.mts`, a build script or another plugin can call them to get titles that match the menus. Import them from whichever plugin you have installed:

```ts
import { formatTitle, truncateTitle, stripTagSyntax } from '@binarynoir/vitepress-auto-sidebar';
// or from '@binarynoir/vitepress-auto-navbar'; they work the same

formatTitle('02-guide-to-the-github-api.md', 50, { github: 'GitHub', api: 'API' }); // "Guide to the GitHub API"
formatTitle('guide-to-the-cli', 50, {}, false); // "Guide To The Cli"
truncateTitle('A fairly long human-written title', 15); // "A fairly long…"
stripTagSyntax('Design ((tag|draft))'); // "Design"
```

| Function                                                   | What it does                                                                                                                                                            |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formatTitle(name, maxLength?, replacements?, titleCase?)` | Turns a file or folder name into a title, following the rules above. `maxLength` defaults to `50` (`0` for no limit), `replacements` to `{}` and `titleCase` to `true`. |
| `truncateTitle(title, maxLength?)`                         | Shortens a title someone wrote to `maxLength` (default `50`), adding `…`, without changing its casing or punctuation.                                                   |
| `stripTagSyntax(title)`                                    | Removes [Markdown Tags](/plugins/markdown-tags/) syntax (`((tag\|draft))`) and tidies the spacing.                                                                      |

Pass `formatTitle` a single file or folder name, not a path, because it doesn't split on `/`. To match your menus, pass it the same `titleReplacements` and `titleCase` you gave the plugin.

::: warning Build time only
These functions run in Node: in `.vitepress/config.mts`, build scripts, and Vite or markdown-it plugins. The package also loads the menu generator, which reads files with `fs`, so don't import it into code that runs in the browser, such as a Vue component or the theme's `enhanceApp`. Make the titles at build time instead, and pass them to the page through frontmatter, a data loader or `themeConfig`.
:::
