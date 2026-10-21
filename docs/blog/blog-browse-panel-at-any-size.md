---
title: 'Blog 0.5: a browse panel for blogs of any size'
blog:
  date: 2026-10-21T09:19:57-04:00
  summary: Blog 0.5.0 keeps the browse panel short on phones and on blogs with hundreds of keywords, and leaves out rows that can't narrow the posts.
  tags: [blog]
  category: Releases
---

# Blog 0.5: a browse panel for blogs of any size

[Blog](/plugins/blog/) 0.5.0 reworks the browse panel that 0.4.0 added, so it stays out of the way of the posts, whether a blog has three keywords or three hundred.

- **One line per row on phones.** Each row scrolls sideways instead of wrapping, so on a phone the panel takes a few lines, not half the screen.
- **The most used first.** Categories and keywords are ranked by how many posts use them. A row shows its first 8 categories or 12 keywords, then "+N more", which opens the full list alphabetically. A row of more than 30 gets a field to narrow it as you type.
- **Only rows that help.** A row that can't narrow the posts is left out. [This blog](/blog/) shows only its keywords now: every post so far is a release, so a Releases chip would choose nothing.
- **Lighter.** The panel is a flat toolbar instead of a card, with the "Subscribe" link at the end of its first row, and chips are easier to tap on touch screens.

The [Browse Demo](/plugins/blog/browse/) sets `tagLimit: 5`, so you can open "+3 more" there. New settings: `categoryLimit`, `tagLimit` and `tagMinCount`. See [Browsing](/plugins/blog/#browsing-categories-keywords-and-dates) for the details.
