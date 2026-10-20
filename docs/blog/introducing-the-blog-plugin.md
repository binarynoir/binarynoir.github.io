---
title: Introducing the Blog plugin
blog:
  date: 2026-10-20
  summary: Any page can now be a blog post, with a main blog, folder-scoped section blogs and an RSS feed for each.
  image: /logo-wide-dark.png
  imageAlt: The BinaryNoir logo
  # A wide logo, not a photo: show all of it rather than cropping it to fill the card.
  imageFit: contain
  tags: [release, vitepress]
  category: Plugins
  sticky: true
---

# Introducing the Blog plugin

[`@binarynoir/vitepress-blog`](/plugins/blog/) is the newest BinaryNoir plugin. It turns any VitePress page into a blog post.

It works like the [Glossary](/plugins/glossary/) and [Markdown Tags](/plugins/markdown-tags/) plugins: you mark pages in their frontmatter, and the build does the rest.

- **`blog`** turns a page into a post, with a date, summary, image, authors and tags.
- **`blog-index`** turns a page into a blog that lists posts: the main blog for the whole site, or a section blog for one folder.
- **Every blog gets an RSS feed**, and every post gets a byline, newer and older links, and social-card tags.

This blog is the first to use it. See the [plugin page](/plugins/blog/) for everything it can do, and the [Scopes Demo](/plugins/blog/demo/) for a main blog and a section blog side by side.
