# BinaryNoir site

VitePress site at binarynoir.com: the hub for the BinaryNoir plugins and apps, and the home of BinaryNoir's paid services. Run `npm run docs:dev` to preview and `npm run docs:build` to check a production build.

## Voice (all site copy)

- Write as "we", never "I".
- Plain and human. Short sentences, everyday words. It should read like a person wrote it.
- Lead with the reader's problem and what changes for them. Features come after.
- No em dashes. No "seamless", "leverage", "unlock", "elevate", "empower", "robust", "streamline", "game-changer". No "Whether you're…", no "not just X, but Y", no "X, not Y" contrasts, no stacked groups of three for rhythm.
- Never invent results, numbers, quotes or client names. Only use claims the owner has confirmed. If a post needs proof that doesn't exist yet, leave an HTML comment and add an item to `TODO.md`.

## Blog posts

Every new or edited post must be on brand, clean, clear, concise and legible. Before calling a post done, check all of the following.

### Content

- **Short.** Aim for a 1 to 2 minute read. Cut anything that doesn't help the reader decide or act.
- **Structure.** A two or three sentence opening that says what's new and why it matters, then a few `##` sections with short bullets, then one closing line with a link or contact. The `#` heading matches the `title`.
- **Summary.** One or two sentences, under about 200 characters, leading with the benefit. It shows on cards, in the RSS feed and in link previews.
- **Category.** Reuse an existing one (`Releases`, `News`) rather than adding a new one.
- **Pinned and announcement** only when the owner asks. Only one post should be the announcement at a time.

### Cover image

Every cover uses the same brand design: the detective in a white frame on black, faint binary digits, a grey Rockwell kicker, a big Film Noir title and one short line.

**Release posts use the product's standard cover**, `/covers/<product id>.png`, with the alt text `'The BinaryNoir detective beside the words "<kicker in sentence case>: <product name>"'` (keep the single quotes: the colon breaks unquoted YAML). Don't make a new image for a release. The covers come from the `cover` field of each product in `products.json`:

- A new product needs a `cover` entry (`title`, `line`, and `kicker` only to override the category's), then `npm run covers -- <product id>`.
- After changing the design in `scripts/lib/cover.mjs`, regenerate them all with `npm run covers`.

**Other posts** (news, announcements) get their own cover:

```sh
npm run cover -- --kicker "NOW OFFERING" --title SERVICES --line "Set up for your team." \
  --out docs/public/<post-slug>-cover.png
```

- Keep the copy short: each title line up to 12 characters (split a long title with `|`, as in `"SIDEBAR|ACCORDION"`), kicker up to 20, line up to 28. The scripts warn when copy is too long; shorten it instead of accepting a shrunken title.
- Look at the result at thumbnail size (about 190px wide) before using it. If any text is hard to read there, cut words.
- In frontmatter set `image` and an `imageAlt` that describes what's in the picture. The site shows every post's image on the post page too (`cover: true` in the blog options), so don't set `cover` per post. Covers are never cropped, so don't add `imagePosition`.

### Before you finish

- `npx prettier --check` passes on the post, and `npm run docs:build` passes with no broken links to the post.
- Check the post on the Blog page, the homepage grid and the post page itself, at phone and desktop widths. The whole cover shows, the spacing is even and the text is readable.
