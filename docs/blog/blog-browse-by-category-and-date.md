---
title: 'Blog 0.4: browse by category and date'
blog:
  date: 2026-10-20T21:30:00-04:00
  summary: Blog 0.4.0 adds a browse panel to every blog page, for filtering posts by category, keyword, year and month, and combining them.
  tags: [blog]
  category: Releases
---

# Blog 0.4: browse by category and date

[Blog](/plugins/blog/) 0.4.0 lets readers find posts by what they are about and when they were written. Every blog page gets a browse panel above its posts, with a row of categories, a row of keywords and an archive of years and months. There is nothing to turn on: the rows fill in from the `category`, `tags` and `date` your posts already have.

The [Browse Demo](/plugins/blog/browse/) has example posts in three categories over two years, so every row has something to try.

- **Filters combine.** Pick a category, then a keyword, then a year: each one narrows the posts further, and each has its own URL, such as `?category=design&tag=ux` or `?month=2026-10`.
- **Counts follow the view.** Every chip counts the posts it would show with the other filters kept, and dims when it would show none, so you know where a click leads before you make it.
- **Years open into months.** Choose a year to see its months, then a month. Click it again to step back out to the year.
- **Easy to undo.** The active filters show above the posts, each with its own ×, beside "Show all posts".
- **Categories everywhere.** A post's category shows above its title on cards and in its byline, linked to its blog filtered by it.

Blog pages can also group posts by month (`groupBy: month`), and keep to some categories (`categories: [Engineering]`), as `::: blog-posts` blocks can.

One rename: `sticky` is now `pinned`, to match the Pinned badge it shows, and `stickyLimit` is now `pinLimit`. The old names still work. See [Browsing](/plugins/blog/#browsing-categories-keywords-and-dates) for the details.
