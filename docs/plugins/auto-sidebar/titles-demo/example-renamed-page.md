# Example: Renamed page

This page's heading is "Example: Renamed page", but the sidebar shows **Renamed page**. This site passes a `transformTitle` function that removes an "Example: " prefix from titles that come from a page:

```ts
transformTitle: (title, { source }) => (source === 'page' ? title.replace(/^Example: /, '') : undefined),
```

`source` is `'name'` for a title made from a file or folder name, `'page'` for one from frontmatter or the first heading, and `'config'` for one from a `.sidebar` line. Return the title to use, or `undefined` to keep it. Truncation to `maxTitleLength` happens after the function runs.

[Back to the demo](./)
