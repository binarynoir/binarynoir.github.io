---
title: A draft marked in its frontmatter
draft: true
---

# A draft marked in its frontmatter

This page is in the repository, but not on the published site. Its frontmatter says `draft: true`, and the site's config passes `excludeFrontmatter: ['draft', 'blog.draft']` to Exclude, Auto Sidebar and Auto Navbar for production builds. So it is left out of the build, the sidebar, the navbar, search and the sitemap.

`npm run docs:dev` still builds it, so drafts can be previewed while they are written. Remove `draft: true` and it is published with the next build.
