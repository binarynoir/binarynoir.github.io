---
title: callrx
---

# callrx ((tag|Rust|orange)) ((tag|Homebrew|green))

[[readingTime]]

Beautiful amateur radio callsign lookup for the terminal. It looks up US callsigns from the FCC Universal Licensing System and prints them with color, clickable links and a clean table layout.

## Install

```sh
brew install binarynoir/callrx/callrx
```

The Homebrew formula installs a prebuilt release binary for your platform, so no Rust toolchain is needed. You can also download a binary for macOS (Apple Silicon or Intel), Linux (x86_64 or ARM64) or Windows from the [Releases page](https://github.com/binarynoir/callrx/releases), or build from source with `cargo build --release`.

## Use

```txt
callrx [CALLSIGN]
callrx lookup <CALLSIGN> [OPTIONS]
callrx history <CALLSIGN> [--raw]
callrx completions <SHELL>

OPTIONS:
    --json       Output the raw JSON response
    --raw        Plain text output (no color, no formatting)
    --no-links   Disable clickable hyperlinks
```

Links are clickable in terminals that support OSC 8 hyperlinks, such as iTerm2, WezTerm, Windows Terminal and Kitty. Shell completions are available through `callrx completions`.

The [README](https://github.com/binarynoir/callrx#readme) covers the local cache, lookup history, authentication and the supported terminals in detail.

[callrx on GitHub](https://github.com/binarynoir/callrx) · [Homebrew tap](https://github.com/binarynoir/homebrew-callrx)
