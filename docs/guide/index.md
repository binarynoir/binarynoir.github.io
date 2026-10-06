---
title: Guide
---

# Guide

[[readingTime]]

Everything here is about how this site itself is built and shipped. It doubles as a worked example: if you want to use the BinaryNoir VitePress plugins in your own docs, copy what works.

- [How this site works](/guide/how-this-site-works): the folder layout, the config, and which plugin does what.
- [Deploying to GitHub Pages](/guide/deploying): the GitHub Actions workflow that publishes this site for free.

## Run it locally

You need Node 22 or newer.

```sh
git clone https://github.com/binarynoir/binarynoir.github.io.git
cd binarynoir.github.io
npm install
npm run docs:dev
```

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run docs:dev`     | Dev server with hot reload.                   |
| `npm run docs:build`   | Production build into `docs/.vitepress/dist`. |
| `npm run docs:preview` | Serve the production build locally.           |
| `npm run format:check` | Prettier check, run by CI.                    |

## Contribute

Every page has a **Suggest a change to this page** link at the bottom that opens the file on GitHub. Typos, clearer wording and corrections are all welcome.
