---
title: 'Example: a site-wide post'
blog:
  date: 2026-10-18
  summary: This post lives in a section, but scope site puts it on the main blog as well.
  image: ../cover.svg
  imageAlt: A placeholder cover that reads "Example post"
  tags: [example, scope]
  scope: site
---

# Example: a site-wide post

This post lives in the same folder as the [section-only example](/plugins/blog/demo/team/example-section-post), but its frontmatter says `scope: site`:

```yaml
blog:
  date: 2026-10-18
  summary: This post lives in a section, but scope site puts it on the main blog as well.
  image: ../cover.svg
  tags: [example, scope]
  scope: site
```

So it is listed twice: by its own [team blog](/plugins/blog/demo/team/) and by the demo's [main blog](/plugins/blog/demo/). It is in both feeds too, and this page's `<head>` links to both of them.

Its newer and older links stay inside the team blog, the closest blog that lists it.
