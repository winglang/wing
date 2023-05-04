---
title: Operations Overview
id: operations
keywords: [operations]
---

## Coverage

"Wing" encompasses several production assets, some face users directly while other are only directly effect contributors to Wing's ecosystem.
Both are important to the health of the Wing however users should be prioritized over contributors when everything else is equal.

User facing projects and their supporting contributor pieces:

- [Homepage](https://winglang.io)
- [Documentation](https://docs.winglang.io)
  - https://github.com/winglang/docsite
  - https://github.com/winglang/wing/tree/main/docs
- Wing CLI
  - https://github.com/winglang/wing
- Wing Console 
  - https://github.com/winglang/console
- [Playground](https://play.winglang.io)
  - https://github.com/winglang/playground
- [NPM Packages](https://www.npmjs.com/~monabot) (https://www.npmjs.com/package/winglang and https://www.npmjs.com/package/@winglang/sdk)
- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing) 
- [Wing Examples](https://github.com/winglang/examples)

## Monitoring



## Severity Levels

Incidents are classified by severity level.
The severity level is determined by the impact of the incident on user experience.

| Severity | Description | Example |
| - | - | - |
| P0 | Extreme/Total user interruption, no reasonable workaround | Unable to install Wing |
| P1 | Major degradation of user experience, with possible workarounds | Main build is broken in CI (cannot publish) |
| P2 | Minor degradation of user experience with workaround, or major contributor experience disruption | PR Builds are failing due to misconfiguration |

## Response Process

### Acknowledgement

Acknowledgement signifies that someone is taking responsibility for the incident.
This does not mean that the person acknowledging the incident is who will be resolving it, but they will at least be responsible for triage and communication.

Depending on the issue type, the acknowledgement may be automated through tooling (e.g. BetterUptime, Sentry, etc.).
If not automated, the responder should create a thread in the #alert channel in Slack to make sure others are aware.

### Response

If possible, immediate action should be taken to mitigate the issue.
A [runbook](./10-runbooks/) should be followed if one exists.
Otherwise, the responder should take the best action they can to mitigate the issue.
For high severity issues based on regressions, the default behavior should be to revert back to the last known good version.
Make sure to document any actions taken as this will be extremely helpful in building a good post-mortem and runbook if needed.

Another good response is to reach out to someone who has more information about the issue.
This could be the person who wrote the code, or someone who has more context about the system.
It is important to be respectful of maintainer time especially if they are not on-call or during normal working hours for their timezone (listed in Slack).
In P0 circumstances where no other mitigation is feasible, it is acceptable to ping/call someone on off-hours for help in resolving the issue.

### Analysis

#### Post-Mortem

The goal of an incident post-mortem is to understand what happened, why it happened, and how we can prevent it from happening again.
In this vein, there are several forms a post-mortem can take as long as it addresses these goals:

- A github issue with discussion, action items, and a possible associated PR to address the issue.
- A new/updated runbook

Post-mortems should take place as soon as possible after the incident in order to capture the most information.
The post-mortem should be linked to the incident in the #alert channel in Slack.

When an incident occurs and the root cause is not obvious or already documented, root cause analysis should be performed and documented as part of the post-mortem.
A useful methodolgy for root cause analysis is the [5 Whys](https://en.wikipedia.org/wiki/5_Whys).
1. State the issue.
2. Start asking “why” related to the problem. Like an inquisitive toddler, keep asking why in response to each suggested cause. 
3. Ask as many "why"s as you need in order to get insight at a level that can be addressed (asking five times is typical). 
 - You will know when you're done asking why when it doesn't make sense to ask why anymore.

Use the result of this analysis to figure out what action items should be taken to prevent the issue from happening again.

## On-Call

Wing is maintained by a global team so we can have a 24/7 on-call without sacrificing too much sleep or sanity.
Each rotation has a primary and secondary responder.
The primary responder is responsible for triage and communication.
The secondary should be available to take over if the primary is unavailable.

**Rotation 1 (Israel/Europe)**: 03:00 UTC -> 15:00 UTC
**Rotation 2 (US)**: 15:00 UTC -> 03:00 UTC

[PagerDuty](https://www.pagerduty.com/) is used to manage the on-call rotation. It is configured to send alerts in the following ways:

- (always, immediately) send a slack message to #alert
- (always, immediately) send a non-invasive notification (text or push) to the primary responder
- (if not acknowledged within 5 minutes) call the primary responder, twice if needed
- (if not acknowledged within 10 minutes) send a non-invasive notification (text or push) to the secondary responder
- (if not acknowledged within 15 minutes) call the secondary responder, twice if needed
