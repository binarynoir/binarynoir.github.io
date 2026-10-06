---
title: NoirCon
---

# NoirCon ((tag|Shell|grey)) ((tag|Homebrew|green))

[[readingTime]]

NoirCon checks whether websites and IP addresses are reachable, and notifies you when one stops responding and when it comes back. It supports Pushover and native desktop notifications.

## Features

- Monitor addresses to see if they are available
- Pushover and native desktop notifications (macOS, Linux, Windows)
- Configurable check intervals
- Multiple addresses at once
- Custom scripts on `FAIL`, `PASS`, `RECOVERED` and `UNKNOWN`
- Detailed error reporting and verbose logging
- Background execution

## Install

On macOS with Homebrew:

```sh
brew tap binarynoir/noircon
brew install noircon
```

Or clone it and run it directly (Bash 4 or newer and `curl` required):

```sh
git clone https://github.com/binarynoir/noircon.git
cd noircon
chmod +x noircon
```

Usage, configuration, service setup and Docker instructions are in the [README](https://github.com/binarynoir/noircon#readme).

[NoirCon on GitHub](https://github.com/binarynoir/noircon) · [Homebrew tap](https://github.com/binarynoir/homebrew-noircon)
