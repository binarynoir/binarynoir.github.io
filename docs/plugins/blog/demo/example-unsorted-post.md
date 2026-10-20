---
title: 'Example: a post no section blog covers'
blog:
  date: 2026-10-16 09:00
  summary: This post has no scope setting, and no section blog covers its folder, so it falls to the main blog.
  image: ./cover.svg
  imageAlt: A placeholder cover that reads "Example post"
  tags: [example, unsorted]
---

# Example: a post no section blog covers

This post lives in `plugins/blog/demo/`, next to the demo's [main blog](/plugins/blog/demo/), not inside the [team blog](/plugins/blog/demo/team/)'s folder. Its frontmatter has no `scope`:

```yaml
blog:
  date: 2026-10-16 09:00
  summary: This post has no scope setting, and no section blog covers its folder, so it falls to the main blog.
  image: ./cover.svg
  tags: [example, unsorted]
```

No section blog covers this folder, so the main blog lists it. That way a site with only a main blog needs no scope settings at all.
