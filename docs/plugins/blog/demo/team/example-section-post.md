---
title: 'Example: a section-only post'
blog:
  date: 2026-10-17 15:30
  updated: 2026-10-18 09:15
  summary: This post stays in its own section blog. It has no scope setting, so the main blog doesn't list it.
  image: ../cover.svg
  imageAlt: A placeholder cover that reads "Example post"
  tags: [example, section]
---

# Example: a section-only post

This post lives in `plugins/blog/demo/team/`, a folder with its own [section blog](/plugins/blog/demo/team/). Its frontmatter has no `scope`, so it takes the default, `section`: the team blog lists it, and the demo's [main blog](/plugins/blog/demo/) doesn't.

```yaml
blog:
  date: 2026-10-17 15:30
  updated: 2026-10-18 09:15
  summary: This post stays in its own section blog. It has no scope setting, so the main blog doesn't list it.
  image: ../cover.svg
  imageAlt: A placeholder cover that reads "Example post"
  tags: [example, section]
```

The byline above was written by the plugin from that frontmatter: when it was published and when it was updated, each with its time, an estimate of the reading time, and the author. The times have no offset, so they are read in this site's `timeZone`, New York, and shown with their zone. No author is named here, so it is this site's `defaultAuthor`. The links at the end go to the newer and older posts in the same section blog.
