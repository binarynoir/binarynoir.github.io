---
title: NoirWatch
---

# NoirWatch ((tag|Shell|grey)) ((tag|Homebrew|green))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fnoirwatch-181717?logo=github)](https://github.com/binarynoir/noirwatch) [![Latest release](https://img.shields.io/github/v/release/binarynoir/noirwatch)](https://github.com/binarynoir/noirwatch/releases/latest) [![CI](https://github.com/binarynoir/noirwatch/actions/workflows/ci.yml/badge.svg)](https://github.com/binarynoir/noirwatch/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/noirwatch)](https://github.com/binarynoir/noirwatch/blob/main/LICENSE)

NoirWatch watches web pages and notifies you when one changes. Notifications can go to your desktop (macOS, Linux and Windows) or to your phone through Pushover.

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
brew install binarynoir/noirwatch/noirwatch
```

On Linux, macOS or Windows (in Git Bash), you can instead clone the repository and run the script directly. It needs Bash 4 or newer plus `curl`, `sed`, `shasum` and `xmllint`. Desktop notifications also need `notify-send` on Linux or PowerShell on Windows.

```sh
git clone https://github.com/binarynoir/noirwatch.git
cd noirwatch
chmod +x noirwatch
```

If you installed from a clone, type `./noirwatch` instead of `noirwatch` in the commands below.

## First run

```sh
# Create a configuration file (~/.config/noirwatch.json on macOS and Linux)
noirwatch --init

# Watch one page
noirwatch https://example.com

# Watch every page listed under "urls" in the configuration file
noirwatch

# Run in the background, and stop it later
noirwatch --start
noirwatch --stop
```

The configuration file holds the check interval, your notification settings (such as Pushover keys) and the list of pages to watch. Open it in your editor with `noirwatch --edit-config`. `noirwatch --help` lists every option and its current default. The [README](https://github.com/binarynoir/noirwatch#readme) covers the configuration file in detail, plus running NoirWatch as a service with systemd, launchd or Windows, and with Docker.

## Status

- ((tag|Done)) Monitor multiple websites
- ((tag|Done)) Pushover notifications
- ((tag|Done)) Desktop notifications on macOS, Linux and Windows
- ((tag|Done)) Run as a background service
- ((tag|Done)) Run a custom script when a change is detected
- ((tag|Done)) Run a set number of checks, then exit
- ((tag|Done)) JSON configuration with per-page options
- ((tag|Planned)) Change averages for all URLs, in notifications and a history report
- ((tag|Planned)) More notification methods: email, Slack, Discord, Teams, Telegram

[NoirWatch on GitHub](https://github.com/binarynoir/noirwatch) · [Homebrew tap](https://github.com/binarynoir/homebrew-noirwatch)
