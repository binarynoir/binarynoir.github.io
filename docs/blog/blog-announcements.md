---
title: 'Blog 0.3: announcements'
blog:
  date: 2026-10-20T20:15:00-04:00
  summary: Blog 0.3.0 adds announcements, a one-line banner above the nav bar for the posts that matter most.
  image: /covers/blog.png
  imageAlt: 'The BinaryNoir detective beside the words "VitePress plugin: Blog"'
  tags: [blog]
  category: Releases
---

# Blog 0.3: announcements

[Blog](/plugins/blog/) 0.3.0 adds announcements: mark a post with `announcement: true` and it shows in a banner across the top of every page, above the nav bar. This post was the site's first announcement.

```md
---
blog:
  date: 2026-10-20 09:00
  announcement: true
---
```

- One line, the full width of the window, linked to the post. A string (`announcement: Maintenance on Friday`) sets the banner's text instead of the title.
- With several announcements, the newest one shows, with a badge counting them. The badge opens the blog filtered to announcements.
- The close button clears the banner, and your browser remembers it. A newer announcement brings it back.
- It is in the static HTML, so it doesn't jump in after the page loads, and a dismissed one stays hidden.

Add `BlogAnnouncementBanner` to your theme's `layout-top` slot to turn it on. See [Announcements](/plugins/blog/#announcements) for the details.
