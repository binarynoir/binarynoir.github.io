---
title: Image Fallback
---

# Image Fallback ((tag|Vite plugin|purple))

[[readingTime]]

`@binarynoir/vite-plugin-image-fallback` stops one broken image from taking down your whole build. If a page imports an image that doesn't exist (a typo, a forgotten file, a renamed asset) Vite normally fails with a "could not resolve" error. This plugin swaps in a placeholder and prints a warning that names the missing import.

It is aimed at content-heavy sites, where one bad reference on page 400 of 500 shouldn't block deploying the other 499. For application code, a hard failure is usually what you want.

## See it live

The image below points at a file that does not exist on purpose: `./missing-image-demo.png`. Without the plugin this page would fail the whole site build. With it, the build finishes, logs a warning, and you get the placeholder:

![This image is intentionally missing to demonstrate the fallback](./missing-image-demo.png)

When you run the build or look at the deploy log, you will see the warning for it. That warning is the plugin working as designed.

## Install

```sh
npm install --save-dev @binarynoir/vite-plugin-image-fallback
```

## Use

```ts
import { imageFallbackPlugin } from '@binarynoir/vite-plugin-image-fallback';

export default defineConfig({
  plugins: [imageFallbackPlugin()],
});
```

Only relative (`./foo.png`) and root-relative (`/foo.png`) imports are intercepted. Bare package specifiers still go through normal `node_modules` resolution, and images that exist are passed through untouched.

## Options

| Option       | Default                                | Description                                   |
| ------------ | -------------------------------------- | --------------------------------------------- |
| `extensions` | `jpg, jpeg, png, gif, svg, webp, avif` | Extensions treated as image imports.          |
| `fallback`   | gray "Missing Image Asset" SVG         | A data URI, or any URL string Vite can serve. |
| `silent`     | `false`                                | Suppress the console warning.                 |

```ts
imageFallbackPlugin({
  extensions: ['png', 'jpg', 'jpeg'],
  fallback: '/branding/placeholder.png',
});
```

[Source and full README on GitHub](https://github.com/binarynoir/vite-plugin-image-fallback)
