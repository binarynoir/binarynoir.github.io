---
title: Deploying to GitHub Pages
---

# Deploying to GitHub Pages ((tag|Guide|blue))

[[readingTime]]

This site is hosted for free on GitHub Pages and published by GitHub Actions on every push to `main`. This page explains the setup so you can reproduce it for your own VitePress site.

## One-time setup

1. Name the repository `<owner>.github.io` (here, `binarynoir.github.io`). A repository with this name is published at `https://<owner>.github.io/` with no sub-path. Any other repository name publishes at `https://<owner>.github.io/<repo>/`, and you must then set `base: '/<repo>/'` in the VitePress config.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. Or from the command line:

   ```sh
   gh api repos/<owner>/<repo>/pages -X POST -f build_type=workflow
   ```

3. Push to `main`. The workflow builds and deploys.

GitHub Pages on a free plan requires a public repository.

## The workflow

<<< @/../.github/workflows/deploy.yml{yaml}

A few choices worth knowing about:

- **Least privilege.** The workflow asks only for `contents: read`, `pages: write` and `id-token: write`. The last one lets the deploy step prove its identity through OIDC. There are no tokens or secrets to manage.
- **`fetch-depth: 0`.** VitePress's `lastUpdated` reads each page's git history. A shallow clone would stamp every page with the same date.
- **`concurrency` with `cancel-in-progress: false`.** Only one deploy runs at a time, and a deploy that is already running is allowed to finish rather than being cut off halfway.
- **`npm ci`** installs exactly what `package-lock.json` says, so the build matches what you tested locally.
- **Format check before build.** A formatting slip fails the run before anything is published.
- **Two jobs.** `build` produces an artifact; `deploy` publishes it, in the `github-pages` environment, which is what gives the run a visible deployment URL.

## Pull requests

`ci.yml` runs the same checks and build on pull requests but never deploys, so a broken change is caught before it reaches `main`.

## Troubleshooting

| Symptom                                                  | Likely cause                                                                                                   |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Deploy job fails with a Pages 404 or "not enabled" error | Pages **Source** is not set to **GitHub Actions**.                                                             |
| Site loads but styles and scripts 404                    | `base` does not match the repository name (project sites only).                                                |
| Every page shows the same "Last updated" date            | The checkout is shallow. Keep `fetch-depth: 0`.                                                                |
| Build log shows a missing image warning                  | [Image Fallback](/plugins/image-fallback) swapped in a placeholder. On this site that is the intentional demo. |
| `npm ci` fails on a lockfile mismatch                    | Run `npm install` locally and commit the updated `package-lock.json`.                                          |

## Custom domain

Add a `docs/public/CNAME` file containing your domain, set the same domain under **Settings → Pages**, and point a DNS record at GitHub. VitePress copies `public/` into the build output, so the file travels with every deploy.
