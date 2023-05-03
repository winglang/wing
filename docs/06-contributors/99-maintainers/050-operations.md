---
title: Operations Overview
id: operations
keywords: [operations]
---

## Severity Levels

Incidents are classified by severity level. The severity level is determined by the impact of the incident on user experience.

| Severity | Description | Example |
| - | - | - |
| P0 | Extreme user interruption, no reasonable workaround | Unable to install Wing |
| P1 | Major degradation of user experience, possible workarounds | Main build is broken in CI (cannot publish) |
| P2 | The system is usable but has a minor issue. | Error message regression, new message is very confusing |

## Response Process

### Acknowledgement

Acknowledgement signifies that someone is taking responsibility for the incident. This does not mean that the person acknowledging the incident is who will be resolving it, but they will at least be responsible for triage and communication.

Depending on the issue type, the acknowledgement may be automated through tooling (e.g. BetterUptime). If not automated, the responder should create a thread in the #alert channel in Slack.

### Response

If possible, immediate action should be taken to mitigate the issue. A runbook should be followed if one exists. Otherwise, the responder should take the best action they can to mitigate the issue. For high severity issues based on regressions, the default behavior should be to revert back to the last known good version.

Another good response is to reach out to someone who has more information about the issue. This could be the person who wrote the code, or someone who has more context about the system.

### Analysis

## Post-Mortem

The goal of an incident post-mortem is to understand what happened, why it happened, and how we can prevent it from happening again. In this vein, there are several forms a post-mortem can take as long as it addresses these goals:

- A github issue with discussion, action items, and a possible associated PR to address the issue.
- A new/updated runbook

Post-mortems should take place as soon as possible after the incident in order to capture the most information. The post-mortem should be linked to the incident in the #alert channel in Slack.

## On-Call

Wing is maintained by a global team so we can have a 24/7 on-call rotation without sacrificing sleep or sanity. The each rotation has a primary and secondary responder. The primary responder is responsible for triage and communication. The secondary should be available to take over if the primary is unavailable.

The exact schedule and tooling to to support this is TBD.
