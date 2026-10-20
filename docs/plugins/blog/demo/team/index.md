---
title: Team Blog
description: A section blog inside the scopes demo. It lists only the posts in its own folder.
blog-index:
  layout: list
  pageSize: 1
  feed:
    title: BinaryNoir scopes demo, team blog
---

# Team Blog

A [section blog](/plugins/blog/#scopes) inside the [Scopes Demo](/plugins/blog/demo/). Its frontmatter is only this:

```yaml
blog-index:
  layout: list
  pageSize: 1
```

It lists every post in this folder, whatever its scope, so both examples are here, one per page: `pageSize: 1` shows the page links with only two posts. Click a keyword to filter the posts by it. Only the one marked `scope: site` is also on the demo's [main blog](/plugins/blog/demo/). This blog has its own feed, at [feed.xml](/plugins/blog/demo/team/feed.xml){target="_self"}.

<!-- blog-posts -->
