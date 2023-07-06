---
title: Wing Cli Analytics
id: wing-analytics
keywords: [Analytics, Telemetry]
---

## Wing Anonymous Analytics

The Wing cli collects anonymous usage data in order to help us improve the cli experience. The intent is to collect data that will help us understand how the cli is being used throughout the community, with hopes that this will help us to build the right features and improve the right areas.

You may not feel comfortable sharing this data with us, and that is ok. The gathering of these analytics is completely optional to use the Wing cli, and can be opted out of at any time.

### Opting out

If you would like to opt out of the analytics gathering, then you can do so by simply setting the environment variable `WING_CLI_DISABLE_ANALYTICS=1`.

### What data is collected

Each run of the Wing cli collects information about various aspects of the environment and project that it is running it. Below is a summarized table of the information that is collected. However, if you would like to see exactly what and how this data is collected you check out the source code since its all open source.

| Data Category | Description |
| --- | --- |
| `CLI` | What command was run (e.g. `wing compile`) and what arguments were passed to it. Also some versioning information |
| `OS` | Basic information about the operating system such as architecture and version. |
| `Node` | Version information |
| `CI` | Was the command ran in a known CI environment like Github Actions |
| `Git` | Does the project use git for SCM and if so, what does the contributor size look like |
