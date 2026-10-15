---
title: Image Fallback
---

# Image Fallback ((tag|Vite plugin|purple))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fvite--plugin--image--fallback-181717?logo=github)](https://github.com/binarynoir/vite-plugin-image-fallback) [![npm version](https://img.shields.io/npm/v/@binarynoir/vite-plugin-image-fallback)](https://www.npmjs.com/package/@binarynoir/vite-plugin-image-fallback) [![CI](https://img.shields.io/github/actions/workflow/status/binarynoir/vite-plugin-image-fallback/ci.yml?branch=main&label=CI)](https://github.com/binarynoir/vite-plugin-image-fallback/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/vite-plugin-image-fallback)](https://github.com/binarynoir/vite-plugin-image-fallback/blob/main/LICENSE)

`@binarynoir/vite-plugin-image-fallback` stops one broken image from taking down your whole build. If a page imports an image that doesn't exist (a typo, a forgotten file, a renamed asset) Vite normally fails with a "could not resolve" error. This plugin swaps in a placeholder and prints a warning that names the missing import.

It is aimed at content-heavy sites, where one bad reference on page 400 of 500 shouldn't block deploying the other 499. For application code, a hard failure is usually what you want.

## See it live

The image below points at a file that does not exist on purpose: `./missing-image-demo.png`. Without the plugin this page would fail the whole site build. With it, the build finishes, logs a warning, and you get the placeholder:

![This image is intentionally missing to demonstrate the fallback](./missing-image-demo.png)

Hover the placeholder, or click or tap it, to see what is missing and where it was imported from. When you run the build or look at the deploy log, you will see the same file and line in the warning:

```txt
[vite-plugin-image-fallback] Could not find …/docs/plugins/missing-image-demo.png (imported by plugins/image-fallback.md:19). Using fallback image.
```

That warning is the plugin working as designed.

## Install

```sh
npm install --save-dev @binarynoir/vite-plugin-image-fallback
```

## Use

```ts
// vite.config.ts, or inside `vite: { plugins: [...] }` in a VitePress config
import { imageFallbackPlugin } from '@binarynoir/vite-plugin-image-fallback';

export default defineConfig({
  plugins: [imageFallbackPlugin()],
});
```

Only relative (`./foo.png`) and root-relative (`/foo.png`) imports are intercepted. Bare package specifiers still go through normal `node_modules` resolution, and images that exist are passed through untouched. That includes images in Vite's `publicDir`, wherever it is: VitePress's default `<srcDir>/public`, or an absolute path outside the root.

## In `vitepress dev`

In dev, a Markdown image isn't an import: VitePress turns `![x](./missing.png)` into a plain URL that the browser requests. Without the plugin, a missing one gets the page's HTML back and shows as a broken image.

The plugin answers those requests too. A missing image gets the placeholder, with the missing path written on it, and the terminal shows the same warning, naming the page that asked for it. A custom `fallback` data URI is served as is, and a custom `fallback` URL is redirected to.

Run this site with `npm run docs:dev` and the demo image above looks like this:

![The placeholder vitepress dev serves for the demo image, with its path written on it](../assets/image-fallback-dev.svg)

```txt
[vite-plugin-image-fallback] Could not find …/docs/plugins/missing-image-demo.png (requested by /plugins/image-fallback). Serving fallback image.
```

The hint popovers below work in dev too. Each placeholder response carries an `X-Image-Fallback` header with the missing path, and on a dev-server page the client script asks about each image with one `HEAD` request, then outlines and explains the placeholders it finds. In dev, the popover names the missing path but not the file and line, which only the build knows.

## Options

| Option       | Default                                | Description                                   |
| ------------ | -------------------------------------- | --------------------------------------------- |
| `extensions` | `jpg, jpeg, png, gif, svg, webp, avif` | Extensions treated as image imports.          |
| `fallback`   | gray "Missing Image Asset" SVG         | A data URI, or any URL string Vite can serve. |
| `silent`     | `false`                                | Suppress the console warning.                 |
| `hints`      | `true`                                 | Record what is missing, for the hints below.  |

```ts
imageFallbackPlugin({
  extensions: ['png', 'jpg', 'jpeg'],
  fallback: '/branding/placeholder.png',
});
```

## Hints

Turn on the popovers in your theme. They work the same way as [Broken Links](/plugins/broken-links) and [HTML Escape's hints](/plugins/html-escape/#hints), and all three run side by side on this site.

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import { enableImageFallbackHints } from '@binarynoir/vite-plugin-image-fallback/client';

export default {
  extends: DefaultTheme,
  enhanceApp() {
    enableImageFallbackHints();
  },
};
```

Each placeholder gets a dashed outline and a popover that names the missing import, and the file and line that imported it. The plugin records them in a `#image-fallback=…` fragment on the placeholder's URL, which the browser ignores when it loads the image.

`enableImageFallbackHints(options)` takes `hover` (default `true`), `hoverDelay` (default `300` milliseconds) and `injectStyles` (default `true`), the same options as Broken Links. It also takes `devPlaceholders`, on by default when the Vite dev server served the page, which turns the `HEAD` checks on or off. The colors follow the VitePress theme and can be changed with the `--image-fallback-hint-error` CSS variable.

To skip placeholders in your own code, for example in a click-to-zoom handler, use `isImageFallback(img)`. It is true for built placeholders, and for dev ones once they have been found:

```ts
import { isImageFallback } from '@binarynoir/vite-plugin-image-fallback/client';

if (isImageFallback(img)) return; // nothing to zoom
```

[Source and full README on GitHub](https://github.com/binarynoir/vite-plugin-image-fallback)
