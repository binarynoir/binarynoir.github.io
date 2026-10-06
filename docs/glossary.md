---
title: Glossary
glossary: false
---

# Glossary

Every term below is defined once, here. The `markdown-it-glossary` plugin turns each plain-text mention of it, on any page of this site, into a hover tooltip. This page opts out with `glossary: false` in its frontmatter so the headings don't tooltip themselves.

Back to the [plugin page](/plugins/glossary) for how it works.

### CI

Continuous Integration: automatically building and testing every change before it is merged.

### CLI

Command-line interface: a program you drive by typing commands in a terminal.

### SSG

Static site generator: a tool that turns source files into plain HTML pages at build time. VitePress is one.

### ESM

ECMAScript modules: the standard `import` / `export` module format for JavaScript.

### OIDC

OpenID Connect: lets a CI job prove its identity to another service without a stored password or token.

### frontmatter, front matter

The block of YAML at the very top of a Markdown file, between two `---` lines, that holds page settings.

### Homebrew

A package manager for macOS and Linux. Taps are third-party formula repositories.

### Pushover

A push-notification service that delivers alerts to your phone or desktop from scripts and apps.

### sharp

A fast Node.js image-processing library. The optimize-images plugin uses it to re-encode images.

### markdown-it

The Markdown parser VitePress uses. Plugins extend it to add syntax like tags or tooltips.

### Pages (GitHub's static hosting product)

Deliberately not tooltipped. The heading has a parenthetical qualifier, so it is parsed but never auto-applied. Handy for words that mean something else elsewhere in your docs.
