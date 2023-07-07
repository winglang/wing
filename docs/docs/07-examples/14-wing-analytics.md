---
title: Wing Cli Analytics
id: wing-analytics
keywords: [Analytics, Telemetry]
---

## Wing Anonymous Analytics

The Wing cli collects anonymous usage data in order to help us improve the cli experience. The intent is to collect data that will help us understand how the cli is being used throughout the community, with hopes that this will help us to build the right features and improve the right areas.

You may not feel comfortable sharing this data with us, and that is ok. The gathering of these analytics is completely optional to use the Wing CLI, and can be opted out of at any time.

### Opting out

If you would like to opt out of the analytics gathering, then you can do so by simply setting the environment variable `WING_CLI_DISABLE_ANALYTICS=1`. You can also use the flag `--no-analytics` when running any command.

```sh
wing compile -t sim app.w --no-analytics
```

### What data is collected

Each run of the Wing cli collects information about various aspects of the environment it is running in. Below are the analytics we gather. As well
you can always head over to our Github and view the code that collects these metrics, as the code is open source.

- The Wing cli version
- The command information, including the command name, arguments, and flags
- Operating system information, including the architecture, version, and platform
- Node js version
- CI environment name (if applicable)