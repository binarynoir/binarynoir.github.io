---
title: NoirWatch
---

# NoirWatch ((tag|Shell|grey)) ((tag|Homebrew|green))

[[readingTime]]

NoirWatch monitors websites for changes and sends a notification when one changes. Notifications can go to your desktop (macOS, Linux and Windows) or to your phone through Pushover.

## Features

- Monitor multiple websites for changes
- Pushover and native desktop notifications
- Configurable check intervals
- Verbose logging with different log levels
- Background execution
- Customizable configuration and URL list files

## Install

On macOS with Homebrew:

```sh
brew tap binarynoir/noirwatch
brew install noirwatch
```

On Linux, macOS or Windows (Git Bash), clone and run it directly. It needs Bash 4 or newer plus `curl`, `sed`, `shasum` and `xmllint`:

```sh
git clone https://github.com/binarynoir/noirwatch.git
cd noirwatch
chmod +x noirwatch
```

## First run

```sh
# Watch one page
./noirwatch https://example.com

# Watch every URL listed in a file
./noirwatch -f urls

# Run in the background
./noirwatch -b https://example.com
```

Create a default configuration file with `noirwatch --init`. The full option list, service setup for systemd, launchd and Windows, and Docker instructions are in the [README](https://github.com/binarynoir/noirwatch#readme).

## Status

- ((tag|Done)) Monitor multiple websites
- ((tag|Done)) Pushover notifications
- ((tag|Done)) Desktop notifications on macOS, Linux and Windows
- ((tag|Done)) Run as a background service
- ((tag|Done)) Run a custom script when a change is detected
- ((tag|Planned)) Change averages for all URLs
- ((tag|Planned)) More notification methods: email, Slack, Discord, Teams, Telegram

[NoirWatch on GitHub](https://github.com/binarynoir/noirwatch) · [Homebrew tap](https://github.com/binarynoir/homebrew-noirwatch)
