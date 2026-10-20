---
title: Scopes Demo
description: A small main blog and a section blog inside it, showing which blog lists which post.
blog-index:
  scope: site
  folders: ./
  layout: grid
  feed:
    title: BinaryNoir scopes demo
---

# Scopes Demo

A live, self-contained example of [scopes](/plugins/blog/#scopes). This folder holds a small main blog (this page) with a [section blog](/plugins/blog/demo/team/) inside it, and three example posts:

```txt
plugins/blog/demo/
  index.md                    main blog (scope: site), limited to this folder
  example-unsorted-post.md    blog: true             no section blog covers it
  team/
    index.md                  section blog
    example-section-post.md   blog: true             stays in the team blog
    example-site-post.md      blog: { scope: site }  in both blogs
```

This page is a main blog, so it lists the site-wide example and the unsorted one, but not the section-only one. The [team blog](/plugins/blog/demo/team/) lists both of its own posts.

Its frontmatter limits it to this folder with `folders`, so the examples stay off the real [BinaryNoir blog](/blog/):

```yaml
blog-index:
  scope: site
  folders: ./
  layout: grid
```

Both demo blogs have their own feed: [this one](/plugins/blog/demo/feed.xml){target="_self"} and [the team blog's](/plugins/blog/demo/team/feed.xml){target="_self"}.

<!-- blog-posts -->
