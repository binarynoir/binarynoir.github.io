---
title: NoirCon
---

# NoirCon ((tag|Shell|grey)) ((tag|Homebrew|green))

[[readingTime]]

[![GitHub repo](https://img.shields.io/badge/GitHub-binarynoir%2Fnoircon-181717?logo=github)](https://github.com/binarynoir/noircon) [![Latest release](https://img.shields.io/github/v/release/binarynoir/noircon)](https://github.com/binarynoir/noircon/releases/latest) [![CI](https://github.com/binarynoir/noircon/actions/workflows/ci.yml/badge.svg)](https://github.com/binarynoir/noircon/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/binarynoir/noircon)](https://github.com/binarynoir/noircon/blob/main/LICENSE)

NoirCon checks whether websites, servers and network services are reachable, and notifies you when one stops responding and again when it comes back. Notifications can go to your desktop (macOS, Linux and Windows) or to your phone through Pushover.

## What it can check

| Check    | What it tests                                    |
| -------- | ------------------------------------------------ |
| `HTTP`   | A website or URL responds.                       |
| `PING`   | A host or IP address answers a ping.             |
| `TCP`    | A port accepts connections, such as 443 or 22.   |
| `UDP`    | A UDP service answers, such as NTP on port 123.  |
| `DOMAIN` | A domain registration is not about to expire.    |
| `CERT`   | A site's TLS certificate is not about to expire. |

## Features

- Monitor many addresses at once, with configurable check intervals
- Pushover and native desktop notifications
- Run a custom script when a check reports `FAIL`, `PASS`, `RECOVERED` or `UNKNOWN`
- Detailed error reporting and verbose logging
- Background execution

## Install

On macOS with Homebrew:

```sh
brew install binarynoir/noircon/noircon
```

On Linux, macOS or Windows (in Git Bash), you can instead clone the repository and run the script directly. It needs Bash 4 or newer and `curl`. Desktop notifications also need `notify-send` on Linux or PowerShell on Windows.

```sh
git clone https://github.com/binarynoir/noircon.git
cd noircon
chmod +x noircon
```

If you installed from a clone, type `./noircon` instead of `noircon` in the commands below.

## First run

NoirCon reads the list of things to check from its configuration file, so create that first:

```sh
# Create a configuration file (~/.config/noircon.json on macOS and Linux)
noircon --init

# Open it in your editor and add the addresses to check under "connections"
noircon --edit-config

# Run the checks
noircon

# Run in the background, and stop it later
noircon --start
noircon --stop
```

`noircon --help` lists every option. The [README](https://github.com/binarynoir/noircon#readme) has an example entry for each check type, plus instructions for running NoirCon as a service with systemd, launchd or Windows, and with Docker.

[NoirCon on GitHub](https://github.com/binarynoir/noircon) · [Homebrew tap](https://github.com/binarynoir/homebrew-noircon)
