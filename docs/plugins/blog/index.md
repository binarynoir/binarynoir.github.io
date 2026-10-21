---
title: Blog
---

# Blog ((tag|VitePress plugin|blue)) ((tag|markdown-it|orange))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvitepress--blog-181717?logo=github)](https://github.com/binarynoir/vitepress-blog) [![npm version](https://img.shields.io/npm/v/@binarynoir/vitepress-blog)](https://www.npmjs.com/package/@binarynoir/vitepress-blog) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vitepress-blog/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vitepress-blog/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vitepress-blog)](https://github.com/binarynoir/vitepress-blog/blob/main/LICENSE)

`@binarynoir/vitepress-blog` turns pages into a blog with frontmatter alone. Any page, in any folder, can be a post. A main blog lists posts from the whole site, and **section blogs** list the posts of one folder, the same way [section glossaries](/plugins/glossary/#section-glossaries) and [tagged pages](/plugins/markdown-tags/vitepress#tagged-pages) work. Every blog gets its own RSS feed.

## See it live

- **[The BinaryNoir blog](/blog/)** is this site's real blog, built with this plugin. Its [feed](/blog/feed.xml){target="_self"} is the one the navbar's RSS icon links to.
- **[The Scopes Demo](/plugins/blog/demo/)** is a small main blog with a [section blog](/plugins/blog/demo/team/) inside it, and example posts that show which blog lists which post. It is limited to its own folder, so the examples stay off the real blog.

Open any post to see its byline under the title, and links to the newer and older posts at the end.

## Why this plugin

VitePress has no blog of its own. The usual approach is a [data loader](https://vitepress.dev/guide/data-loading#createcontentloader) that collects your posts, and a Vue component you write to list them. Or you switch to a blog theme, and your docs take on that theme. This plugin is built for the other case: **a documentation site that also needs to publish news**, without leaving the default theme or writing components.

- **Posts live where their subject lives.** A release note can sit next to the API page it changes, and a team's update in the team's folder. The frontmatter decides which blog lists it, not a `posts/` folder.
- **One site, many blogs.** Each part of the site can have its own section blog, and the main blog still gathers what everyone should see. Other approaches give you one list, and filtering it is up to you.
- **A feed for each blog.** Readers subscribe to only the part of the site they care about: one product's releases, one team's updates. Every blog page and block has its own "Subscribe" link.
- **Plain pages, built ahead of time.** Lists are Markdown written at build time, so they are in the static HTML and in local search, and they work without JavaScript. Pagination and keyword filters are an enhancement on top.
- **It fits with the other plugins.** Posts sort into the sidebar with [Auto Sidebar](/plugins/auto-sidebar/#recipes)'s `.sort` and `.limit`, titles lose their [Markdown Tags](/plugins/markdown-tags/) badges in lists and feeds, and pages that [Exclude](/plugins/exclude/) leaves out are never listed.

## Install

```sh
npm install --save-dev @binarynoir/vitepress-blog
```

Needs Node 22 or later and VitePress 2.

## Use

Wrap your config with `withBlog`. In your theme, import the stylesheet and call `useBlog()`:

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress';
import { withBlog } from '@binarynoir/vitepress-blog/vitepress';

export default withBlog(
  defineConfig({
    sitemap: { hostname: 'https://example.com' },
    // ...your config
  }),
  {
    authors: { jane: { name: 'Jane Doe', url: 'https://example.com/jane' } },
  },
);
```

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import { useBlog } from '@binarynoir/vitepress-blog/client';
import '@binarynoir/vitepress-blog/style.css';

export default {
  extends: DefaultTheme,
  setup() {
    // Pages (?page=2) and keyword filtering (?tag=release) on blog pages.
    useBlog();
  },
};
```

`withBlog` keeps any `markdown.config`, `transformHead`, `transformPageData` and `buildEnd` you already have, so it composes with other `withX()` wrappers in any order.

### Wiring it by hand

This site wires the five pieces one by one, so each is visible in [its config](/guide/how-this-site-works#the-config). Pass the same options to all five:

```ts
import { blogMarkdown } from '@binarynoir/vitepress-blog';
import {
  blogHead,
  blogPageData,
  blogVitePlugin,
  writeBlogFeeds,
} from '@binarynoir/vitepress-blog/vitepress';

const blogOptions = { siteUrl: 'https://example.com' };

export default defineConfig({
  markdown: {
    config(md) {
      md.use(blogMarkdown, blogOptions); // lists, bylines, newer / older links
    },
  },
  transformHead: (context) => blogHead(context, blogOptions), // social tags, feed links
  transformPageData: (pageData, context) => blogPageData(pageData, context, blogOptions), // descriptions
  buildEnd: (siteConfig) => writeBlogFeeds(siteConfig, blogOptions), // RSS feeds, images
  vite: { plugins: [blogVitePlugin(blogOptions)] }, // fresh lists and feeds in `vitepress dev`
});
```

## Writing a post

A page is a post when its frontmatter has a `blog` key. `blog: true` is a post with every default; an object sets its details:

```md
---
title: We launched
blog:
  date: 2026-10-01 09:00
  updated: 2026-10-05 16:30
  summary: Team A's first release is out.
  image: ./launch.png
  imageAlt: The release dashboard
  author: [jane, Sam Lee]
  tags: [release, team-a]
  category: Engineering
  scope: site
  sticky: true
---
```

| Key             | Default                                    | What it does                                                                                                                                              |
| --------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | the page's `title`, then its `#` heading   | Title in lists, feeds and social cards.                                                                                                                   |
| `summary`       | the page's `description`, then first prose | One or two sentences for cards, feeds and the page's description.                                                                                         |
| `date`          | none                                       | When the post was published: a date, or a date and time. See [Dates and times](#dates-and-times). Newest first; undated posts go last.                    |
| `updated`       | none                                       | When the post was last changed, in the same forms. The byline shows both, and it is the feed's last-updated time.                                         |
| `image`         | none                                       | Card, social and feed image: relative to the post, a public path (`/cover.png`) or a URL. `{ src, alt, fit, position }` works.                            |
| `imageAlt`      | `''`                                       | Alt text for the image.                                                                                                                                   |
| `imageFit`      | `cover`                                    | How cards fit the image in their frame: `cover` crops it to fill the frame, `contain` shows all of it, letterboxed. Use `contain` for logos and diagrams. |
| `imagePosition` | the centre                                 | Which part of a cropped image stays in view, as CSS `object-position`: `top`, `left`, `30% 20%`.                                                          |
| `author`        | the `defaultAuthor` option                 | A name, a key from the `authors` option, `{ name, url, email }`, or a list of these.                                                                      |
| `tags`          | none                                       | A list or a comma-separated string. Shown as chips, and written to the feed as categories.                                                                |
| `category`      | none                                       | Written to the feed and `article:section`.                                                                                                                |
| `scope`         | `section`                                  | `site` (or `global`) also lists the post on the main blog. See [Scopes](#scopes).                                                                         |
| `sticky`        | `false`                                    | Pinned to the top of its blog pages, above the paginated posts, with a Pinned badge. See [Sticky posts](#sticky-posts).                                   |
| `announcement`  | `false`                                    | `true`, or the banner's text, shows the post in the banner above the nav bar. See [Announcements](#announcements).                                        |
| `draft`         | `false`                                    | Left out of lists and feeds. To leave drafts out of the build and the menus too, see [Drafts](#drafts).                                                   |
| `byline`        | the `byline` option                        | `false` hides this post's byline.                                                                                                                         |
| `cover`         | the `cover` option                         | `true` shows this post's image under its byline.                                                                                                          |
| `postNav`       | the `postNav` option                       | `false` hides this post's newer / older links.                                                                                                            |

Title, description, date, author, image and tags can also be written at the top level of the frontmatter, as other blog tools expect. A value under `blog` wins.

### Dates and times

`date` and `updated` take a date, or a date and a time, in any of these forms:

| Written                     | Means                                       |
| --------------------------- | ------------------------------------------- |
| `2026-10-20`                | A day. Shows "October 20, 2026".            |
| `2026-10-20 14:30`          | A day and a time, in the `timeZone` option. |
| `2026-10-20T14:30:00`       | The same, with a `T` and seconds.           |
| `2026-10-20T14:30:00-04:00` | An exact moment, with its offset from UTC.  |
| `2026-10-20T18:30:00Z`      | An exact moment, in UTC.                    |

Every post on [this site's blog](/blog/) gives its exact moment, with its offset from UTC. [Introducing the Blog plugin](/blog/introducing-the-blog-plugin) was published, then edited later the same day, so its byline reads "Published October 20, 2026 at 2:34 PM EDT · Updated October 20, 2026 at 2:47 PM EDT":

```yaml
blog:
  date: 2026-10-20T14:34:56-04:00
  updated: 2026-10-20T14:47:00-04:00
```

- **A time shows only when you give one.** A date alone is shown as a date, never as "12:00 AM".
- **Times without an offset are in the `timeZone` option**, `UTC` unless you set one, so the same frontmatter means the same moment on every build machine. This site sets `timeZone: 'America/New_York'` and writes New York times; daylight saving is taken care of. Dates and times are shown in that time zone too.
- **Posts on the same day sort by their times**, and a date alone counts as the start of its day. Feeds and social tags use the exact moment.
- **The sidebar and navbar sort the same way.** [Auto Sidebar](/plugins/auto-sidebar/#sorting) and [Auto Navbar](/plugins/auto-navbar#settings) read dates with times too, so `.sort: date desc` puts this afternoon's post above this morning's.

### Drafts

`draft: true` keeps a post out of blog lists, `::: blog-posts` blocks and feeds, but on its own the page is still built and can be opened by its URL. With the `drafts` option on, drafts are listed too, with a Draft badge.

This site goes further: [Exclude](/plugins/exclude/#drafts-in-frontmatter)'s `excludeFrontmatter` option, with `blog.draft` in its list, leaves drafts out of the production build, and the same option in Auto Sidebar and Auto Navbar hides them from the menus. In `vitepress dev`, drafts are built and listed with their badge, for preview.

## Making a blog page

A page with `blog-index` in its frontmatter lists posts. `blog-index: true` is a section blog of the page's own folder:

```md
---
title: Team A blog
blog-index:
  layout: grid
  groupBy: year
---

# Team A blog

Notes from Team A.

<!-- blog-posts -->
```

The list goes where `<!-- blog-posts -->` is, or after the page's content if there is no marker.

| Key           | Default                        | What it does                                                                                    |
| ------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `scope`       | `section`                      | `site` makes this the main blog. See [Scopes](#scopes).                                         |
| `folders`     | the page's folder              | Folders to list posts from, relative to the source directory; `./` and `../` are page-relative. |
| `tags`        | all                            | Only list posts with at least one of these tags.                                                |
| `limit`       | all                            | Most posts to list. The feed has its own limit.                                                 |
| `layout`      | `list`                         | `list` (image beside text), `grid` (cards) or `compact` (dates and titles).                     |
| `groupBy`     | none                           | `year` puts a heading above each year's posts.                                                  |
| `showTags`    | `true`                         | `false` hides tag chips on cards.                                                               |
| `tagList`     | `true`                         | A keyword list above the posts: every tag with its count, each a filter. `false` leaves it out. |
| `pageSize`    | `10` (the `pageSize` option)   | Posts per page. `0` shows them all on one page.                                                 |
| `stickyLimit` | all (the `stickyLimit` option) | Most sticky posts pinned to the top. Extra ones take their place by date.                       |
| `rssLink`     | `true` (the `rssLink` option)  | A "Subscribe" link with the RSS icon to this blog's feed. `false` leaves it out.                |
| `feed`        | on                             | `false` turns the feed off, or `{ title, description, limit, path }` to set it up.              |

### Sticky posts

`sticky: true` pins a post to the top of every blog page that lists it, in its own section above the other posts, with a Pinned badge. The [announcement of this plugin](/blog/introducing-the-blog-plugin) is pinned on [the blog](/blog/). Pinned posts show on the first page only and don't count toward `pageSize`. When more posts are sticky than a page's `stickyLimit`, the newest ones are pinned and the others take their place by date. Feeds ignore stickiness and stay in date order.

To keep sticky posts on top of the sidebar too, sort the blog folder with [Auto Sidebar](/plugins/auto-sidebar/#sorting)'s `.sort` setting, by stickiness and then date. This site's blog does:

<<< @/blog/.sidebar{txt}

The sidebar pins every sticky post; `stickyLimit` applies to blog pages.

### Pages and keywords

Every post is written into the blog page's HTML, so search engines, local search and readers without JavaScript see them all. With `useBlog()` in your theme, the browser then shows one page at a time and filters by keyword, both from the URL:

- `?page=2` shows the second page. Previous, page number and Next links are added below the posts when there is more than one page. The [team blog](/plugins/blog/demo/team/) in the Scopes Demo shows one post per page, so you can try them.
- `?tag=release` shows only posts tagged `release`, in any case, with a "Posts tagged release · Show all posts" line above them. Pages then count the matching posts only.

Keywords are links everywhere they appear: in the keyword list at the top of a blog page, on each card, and in a post's byline, where they link to the post's own blog, filtered. They are ordinary links, so VitePress follows them without reloading the page, and each filtered view has its own URL to share.

## Announcements

`announcement: true` puts a post in a banner across the top of every page, above the nav bar: one line, the full width of the window, linked to the post. A string sets the banner's text instead of the post's title. The [post announcing this feature](/blog/blog-announcements) is one.

```md
---
blog:
  date: 2026-10-20 09:00
  announcement: Scheduled maintenance on Friday, 18:00 UTC
---
```

Add the banner to your theme's `layout-top` slot:

```ts
// .vitepress/theme/index.ts
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { BlogAnnouncementBanner } from '@binarynoir/vitepress-blog/client';

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'layout-top': () => h(BlogAnnouncementBanner) }),
};
```

- **The newest one wins.** With several, the banner shows the newest and a badge with how many there are. The badge opens the blog page filtered to announcements, as in `/blog/?announcements`.
- **Visitors can clear it.** The close button dismisses every current announcement, remembered in the browser. A newer one brings the banner back, counting only the ones not yet dismissed. Changing a post's `date` announces it again.
- **No jump on load.** The banner is in the static HTML, and a dismissed one is hidden before the page shows. While it shows, the nav bar, sidebar and content move down to make room.

The banner's posts come from VitePress's site data, which `blogVitePlugin` (or `withBlog`) fills in.

## Latest posts on any page

A `::: blog-posts` block shows a blog's latest posts anywhere, with its own settings. This site's [home page](/) uses one for "Latest from the blog":

```md
::: blog-posts
limit: 3
stickyLimit: 1
layout: grid
more: Read the blog →
:::
```

This one, written right here, shows the Scopes Demo's [Team Blog](/plugins/blog/demo/team/), in its own compact layout:

```md
::: blog-posts
blog: /plugins/blog/demo/team/
limit: 2
layout: compact
more: Open the Team Blog →
:::
```

::: blog-posts
blog: /plugins/blog/demo/team/
limit: 2
layout: compact
more: Open the Team Blog →
:::

| Key           | Default               | What it does                                                                                                      |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `blog`        | the page's own blog   | The blog to show: its URL (`/blog/`) or file (`blog/index.md`); `./` and `../` are page-relative.                 |
| `limit`       | `5`                   | Most posts shown, pinned ones included. `0` shows them all.                                                       |
| `stickyLimit` | the blog page's       | Most sticky posts pinned to the top. `0` pins them all.                                                           |
| `layout`      | the blog page's       | `list`, `grid` or `compact`.                                                                                      |
| `showTags`    | the blog page's       | `false` hides keyword chips.                                                                                      |
| `tags`        | all                   | Only show posts with at least one of these keywords.                                                              |
| `more`        | `All posts in {blog}` | Text of the link to the blog page below the posts. `false` leaves the link out.                                   |
| `rssLink`     | the blog page's       | A "Subscribe" link with the RSS icon to the blog's feed, beside the link to the blog page. `false` leaves it out. |

- Without `blog`, a block shows the page's own blog: the deepest section blog covering its folder, else the main blog. So on the home page it is the main blog, and on a section's page, that section's blog.
- It is written into the page at build time and refreshes in `vitepress dev` when a post changes. A page can hold several blocks, and a block inside a code fence is left as written, as in the examples above.
- A blog it can't find, or settings that aren't valid YAML, log a warning naming the page and line.

## Scopes

Scopes decide which blog lists a post.

- **A section blog** lists every post in its folder and the folders below it, whatever the post's scope. Section blogs can be nested: a post in `team-a/guides/` is listed by both `team-a/` and `team-a/guides/`.
- **The main blog** (`blog-index: { scope: site }`) lists two kinds of posts:
  - posts from any folder that are marked `scope: site`
  - posts in folders that don't have a section blog of their own

So a site with only a main blog needs no scope settings at all, and a post inside a section only reaches the main blog when it says `scope: site`. The [Scopes Demo](/plugins/blog/demo/) shows all three cases live.

```txt
docs/
  blog/
    index.md          blog-index: { scope: site }   lists hello, launch, notes
    hello.md          blog: true
  team-a/
    index.md          blog-index: true              lists launch, internal
    launch.md         blog: { scope: site }
    internal.md       blog: true
  notes.md            blog: true                    no section blog covers it
```

A post's newer and older links stay within its own blog: the deepest section blog that lists it, otherwise the main blog.

### When a section blog helps

A section blog is worth it whenever one part of a site has its own audience. Some realistic cases:

- **Release notes per product.** A docs site for several products gives each one a `releases/` section blog. Users of one product subscribe to its feed alone. The major releases say `scope: site` and also reach the main blog.
- **Packages in a monorepo.** Each package's docs folder holds its own changelog posts, so `docs/packages/cli/` and `docs/packages/sdk/` each get a blog and a feed, and the main blog has the releases that affect everyone. This site could do the same for each plugin.
- **Teams in a handbook.** An internal handbook gives each team a section blog for its updates. Company-wide announcements are marked `scope: site`, so the main blog is what everyone reads, and each team's page shows only its own news in a `::: blog-posts` block.
- **Incident reviews.** A `postmortems/` section blog keeps every review in date order for the people who need them, while only the ones customers should know about are marked `scope: site`.
- **Courses or cohorts.** A learning site gives each course its announcements: due dates, new lessons, office hours. Students follow their own course's feed, and site-wide news stays on the main blog.

In each case the posts stay next to the docs they belong to, and a reader can follow all of it on the main blog or just one section.

## Feeds

Each blog page's RSS 2.0 feed is written next to it at the end of the build: `news/index.md` gets `news/feed.xml`, and `news/archive.md` gets `news/archive-feed.xml`. Set `feed.path` to name it yourself. A feed holds the newest 20 posts (`feedLimit`, or the page's `feed.limit`), never drafts, and each item has its title, link, date, summary, authors, tags and image.

Feeds need absolute links, so they use the `siteUrl` option or VitePress's `sitemap.hostname`. Without either, no feeds are written and the build log says so.

Every blog page and `::: blog-posts` block shows a "Subscribe" link with the RSS icon to its own blog's feed, so readers can follow the whole site or just one section (`rssLink: false` hides it). It only appears when feeds are written, that is, with a site URL. The blog page also links its feed with `<link rel="alternate">`, and so does every post in the feed, so a feed reader finds it from any of them. `vitepress dev` serves the feeds too.

A post image given as a relative path is also copied to `blog-images/` under a name made from its content, because Vite's hashed name for it isn't known until the build is done. Feeds and social cards link that copy. Public paths and URLs are linked as they are.

## Options

| Option           | Default                                                         | What it does                                                                                                                        |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `siteUrl`        | `sitemap.hostname`                                              | Absolute URL of the published site, for feeds and social tags.                                                                      |
| `authors`        | `{}`                                                            | Authors posts can name by key: `{ jane: { name, url, email } }` or `{ jane: 'Jane Doe' }`.                                          |
| `defaultAuthor`  | none                                                            | Author for posts that don't name one.                                                                                               |
| `locale`         | `'en-US'`                                                       | Locale for dates and author lists ("Jane and Sam").                                                                                 |
| `dateFormat`     | `{ dateStyle: 'long' }`                                         | `Intl.DateTimeFormat` options for dates.                                                                                            |
| `timeFormat`     | `{ hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }` | `Intl.DateTimeFormat` options for times, as in "2:30 PM EDT".                                                                       |
| `timeZone`       | `'UTC'`                                                         | The IANA time zone that times without an offset are in, and that dates and times are shown in. This site uses `'America/New_York'`. |
| `wordsPerMinute` | `200`                                                           | For "5 min read". `0` hides reading time.                                                                                           |
| `byline`         | `true`                                                          | Author, date and tags under each post's title.                                                                                      |
| `cover`          | `false`                                                         | Each post's image under its byline.                                                                                                 |
| `postNav`        | `true`                                                          | Newer and older post links at the end of each post.                                                                                 |
| `drafts`         | `false`                                                         | List drafts, marked. This site passes `process.env.NODE_ENV !== 'production'`: dev only.                                            |
| `stripTags`      | `true`                                                          | Remove [Markdown Tags](/plugins/markdown-tags/) syntax from titles and summaries.                                                   |
| `feedLimit`      | `20`                                                            | Most posts in each feed.                                                                                                            |
| `imagesDir`      | `'blog-images'`                                                 | Output folder for copied post images.                                                                                               |
| `pageSize`       | `10`                                                            | Posts per page on blog pages that don't set `pageSize`. `0` turns pages off.                                                        |
| `stickyLimit`    | `0` (all)                                                       | Most pinned sticky posts on blog pages that don't set `stickyLimit`.                                                                |
| `rssLink`        | `true`                                                          | A "Subscribe" RSS link on blog pages and blocks that don't set `rssLink`.                                                           |
| `labels`         | English                                                         | Every word the plugin writes (`by`, `readingTime: '{n} min read'`, …), for translating.                                             |

## Styling

The stylesheet uses VitePress's theme variables, so it follows light and dark mode. Override `--vp-blog-card-bg`, `--vp-blog-card-border`, `--vp-blog-card-radius`, `--vp-blog-meta-color`, `--vp-blog-tag-bg`, `--vp-blog-tag-color` or `--vp-blog-accent` to restyle it, and `--vp-blog-announcement-height`, `--vp-blog-announcement-bg` or `--vp-blog-announcement-color` for the announcement banner. Every generated element has a `vp-blog-` class for anything more.

## Notes

- **Built first, enhanced after.** Lists, bylines and links are Markdown written at build time, so every post is in the static HTML and in search, and links get the site's `base` and VitePress's dead-link check. `useBlog()` only hides and shows what is already there.
- **Lists stay fresh in `vitepress dev`.** Add, edit or delete a post and every blog page and post that shows it reloads.
- **Pages kept out of the build aren't listed**, including anything an [`.exclude` file](/plugins/exclude/) leaves out, so a list never links to a missing page.
