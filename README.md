# binarynoir.github.io

The [BinaryNoir](https://github.com/binarynoir) developer hub, live at **https://binarynoir.github.io**.

It documents BinaryNoir's open-source VitePress plugins, Vite plugins and command-line apps, and it is built with every one of those plugins, so it doubles as a working demo of how they fit together.

## Plugins demonstrated

| Package                                                                                                | Role on this site                                                    |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| [`@binarynoir/vitepress-auto-sidebar`](https://github.com/binarynoir/vitepress-auto-sidebar)           | Builds the sidebar from the folder tree                              |
| [`@binarynoir/vitepress-auto-navbar`](https://github.com/binarynoir/vitepress-auto-navbar)             | Builds the top navbar from the folder tree                           |
| [`@binarynoir/vitepress-markdown-tags`](https://github.com/binarynoir/vitepress-markdown-tags)         | Status badges and tagged-page lists                                  |
| [`@binarynoir/vitepress-reading-time-tag`](https://github.com/binarynoir/vitepress-reading-time-tag)   | `[[readingTime]]` tip blocks                                         |
| [`@binarynoir/vitepress-downloads`](https://github.com/binarynoir/vitepress-downloads)                 | Downloadable files from a `downloads` folder (not yet wired in here) |
| [`markdown-it-glossary`](https://github.com/binarynoir/markdown-it-glossary)                           | Hover definitions from `docs/reference/glossary.md`                  |
| [`@binarynoir/vite-plugin-optimize-images`](https://github.com/binarynoir/vite-plugin-optimize-images) | Re-compresses images in the build output                             |
| [`@binarynoir/vite-plugin-image-fallback`](https://github.com/binarynoir/vite-plugin-image-fallback)   | Placeholder for missing images (one is missing on purpose)           |

## Develop

Requires Node 22 or newer.

```sh
npm install
npm run docs:dev      # dev server
npm run docs:build    # production build into docs/.vitepress/dist
npm run docs:preview  # serve the production build
npm run format:check  # prettier, also run in CI
```

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it with GitHub Pages. Pull requests run [`ci.yml`](.github/workflows/ci.yml), which builds without deploying. See [docs/guide/deploying.md](docs/guide/deploying.md) for the full setup.

The repository's Pages source must be set to **GitHub Actions** (Settings → Pages).

## A note on the missing image

`docs/plugins/image-fallback.md` references an image that does not exist, on purpose, to demonstrate the image-fallback plugin. The build logs a warning for it. That is expected.

## License

Code is [MIT](LICENSE) licensed. The BinaryNoir name, logos and site content are the property of John Smith III / BinaryNoir and are not covered by that license; see [docs/legal.md](docs/legal.md).
