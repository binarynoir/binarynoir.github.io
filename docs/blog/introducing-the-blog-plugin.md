---
title: Introducing the Blog plugin
blog:
  date: 2026-10-20T14:34:56-04:00
  updated: 2026-10-20T14:47:00-04:00
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

## What's different

VitePress doesn't ship a blog. Most sites add one of two ways: a data loader plus a Vue component written for the site, or a blog theme that replaces the documentation theme. We wanted a blog for a docs site that keeps looking like a docs site, so this plugin works the other way around:

- **Posts stay next to what they are about.** A release note can live beside the page it changes. Frontmatter, not a folder, decides which blog lists it.
- **A site can have many blogs.** Each section can have its own, and the main blog collects what everyone should see.
- **Every blog has its own feed.** Readers subscribe to exactly the part of the site they follow, using the "Subscribe" link on each blog.
- **Nothing to write in Vue.** Lists are built as Markdown at build time, so they work without JavaScript and show up in search. Pages and keyword filters are added in the browser.

## Section blogs, in practice

The feature we expect to matter most is the section blog: a blog of one folder, with its own feed, inside a bigger site.

- A docs site for **several products** gives each product a release notes blog. Someone who only uses one product follows only its feed.
- A **monorepo** gives each package a changelog blog in its docs folder, and marks the releases that affect everyone `scope: site` so they also reach the main blog.
- A **team handbook** gives each team a blog for its updates, and company-wide announcements go on the main blog.
- A **course site** gives each course its announcements, so students follow their own course and nothing else.

Section blogs pair with [Auto Sidebar](/plugins/auto-sidebar/#recipes)'s new `.sort` and `.limit` settings, which keep a long folder of posts newest first in the sidebar and cut it to the latest few. The same settings help anything dated, like meeting notes or release notes.

This blog is the first to use the plugin. See the [plugin page](/plugins/blog/) for everything it can do, and the [Scopes Demo](/plugins/blog/demo/) for a main blog and a section blog side by side.
