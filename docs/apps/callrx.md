---
title: callrx
---

# callrx ((tag|Rust|orange)) ((tag|Homebrew|green))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fcallrx-181717?logo=github)](https://github.com/binarynoir/callrx) [![Latest release](https://img.shields.io/github/v/release/binarynoir/callrx)](https://github.com/binarynoir/callrx/releases/latest) [![CI](https://github.com/binarynoir/callrx/actions/workflows/ci.yml/badge.svg)](https://github.com/binarynoir/callrx/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/callrx)](https://github.com/binarynoir/callrx/blob/main/LICENSE)

callrx looks up US amateur radio callsigns from your terminal. It pulls the license record from the FCC Universal Licensing System and prints it with color, clickable links and a clean table layout.

## Install

On macOS or Linux with Homebrew:

```sh
brew install binarynoir/callrx/callrx
```

The Homebrew formula installs a prebuilt binary for your platform, so you don't need Rust. You can also download a binary for macOS (Apple Silicon or Intel), Linux (x86_64 or ARM64) or Windows from the [Releases page](https://github.com/binarynoir/callrx/releases), or build from source with `cargo build --release`.

## Sign in

Every lookup needs a personal API key. The easiest way to get one is from callrx itself:

```sh
callrx auth login
```

This opens your browser to confirm a short code, then saves the key on your computer. Check it any time with `callrx auth status`, or remove it with `callrx auth logout`. For scripts and CI, set the `CALLRX_API_KEY` environment variable instead.

## First lookup

```sh
callrx W1AW
```

Results are cached on your computer for 7 days, so looking up the same callsign again is instant.

## Use

```txt
callrx [CALLSIGN]
callrx lookup <CALLSIGN> [OPTIONS]
callrx history <CALLSIGN> [--raw]
callrx auth <login|status|logout>
callrx completions <SHELL>

OPTIONS:
    --json       Output the raw JSON response
    --raw        Plain text output (no color, no formatting)
    --no-links   Disable clickable hyperlinks
    --no-cache   Skip the local cache and fetch fresh data
    --weather    Show current weather at the licensee's mailing address
    --neighbors  Show other active licensees near the same mailing address
```

Links are clickable in terminals that support OSC 8 hyperlinks, such as iTerm2, WezTerm, Windows Terminal and Kitty. `callrx completions` generates tab completion for bash, zsh, fish, elvish and PowerShell.

The [README](https://github.com/binarynoir/callrx#readme) covers the local cache, lookup history, installing completions and the data source in detail.

[callrx on GitHub](https://github.com/binarynoir/callrx) · [Homebrew tap](https://github.com/binarynoir/homebrew-callrx)
