---
title: Browse Demo
description: A small blog of example posts in three categories over two years, for trying the browse panel's category, keyword, year and month filters.
blog-index:
  layout: grid
  groupBy: year
  pageSize: 4
  tagLimit: 5
  feed:
    title: BinaryNoir browse demo
---

# Browse Demo

A live example of [browsing a blog](/plugins/blog/#browsing-categories-keywords-and-dates). This is a section blog of eight example posts in three categories, spread over two years, so the browse panel below has something in every row. It keeps to its own folder, so the examples stay off the real [BinaryNoir blog](/blog/).

Try it:

- **Pick a category**, then a keyword: the filters combine, and every count changes to show what each next click would leave.
- **Pick a year** to open its months, then a month. Click the month again to go back to the whole year.
- **Open "+3 more"** at the end of the keywords. The row shows the five most used keywords first; opened, it lists all eight alphabetically. On a phone, swipe a row sideways to see the rest of it.
- **Remove one filter** with its × above the posts, or clear them all with "Show all posts".
- Or open a view by its URL: [Engineering](/plugins/blog/browse/?category=engineering), [Design posts tagged `ux`](/plugins/blog/browse/?category=design&tag=ux), [2025](/plugins/blog/browse/?year=2025), [October 2026](/plugins/blog/browse/?month=2026-10).

The page needs nothing more than this:

```yaml
blog-index:
  layout: grid
  groupBy: year
  pageSize: 4
  tagLimit: 5
```

The browse panel is on by default. Each post gives a `category` and `tags`, and one is `pinned`, so it stays at the top of the first page. `tagLimit: 5` cuts the keyword row to five before "+3 more"; the default is 12.

<!-- blog-posts -->
