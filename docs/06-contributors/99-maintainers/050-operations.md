---
title: Operations Overview
id: operations
keywords: [operations]
---

## Coverage

"Wing" encompasses several production assets; Some are directly user-facing, while others only affect contributors to Wing's ecosystem.
Both are important to the health of the Wing however users should be prioritized over contributors when everything else is equal.

User-facing projects and their supporting contributor pieces:

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

Monitoring may take one of two forms:

- Polling monitors via BetterUptime check the status of GitHub actions and hosted sites to make sure they are currently reporting successfully
  - "GitHub Action" checks includes builds, release, and other scheduled jobs that provide additional health verification
- Manual reports from users via Slack or Github Issues

Manual reports also must be manually escalated to become actual incidents by any available maintainers.
Ideally manual reports should be minimized, and we should constantly look for ways to automate the detection of issues.

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

Acknowledgment signifies that someone is taking ownership over the incident.
This does not mean that the person acknowledging the incident is who will be resolving it, but they will at least be responsible for triage and communication or escalation if needed.

Depending on the issue type, the acknowledgment may be automated through tooling (e.g., BetterUptime, Sentry, etc.).
If not automated, the responder should create a thread in the #alert channel in Slack to make sure others are aware.

### Response

If possible, immediate action should be taken to mitigate the issue.
A [runbook](./10-runbooks/) should be followed if one exists.
Otherwise, the responder should take the best action they can to mitigate the issue.
For P0/P1 issues based on regressions, the default behavior should be to revert to the last known good version.
Make sure to document any actions taken as this will be extremely helpful in building a good post-mortem and runbook if needed.

Another good response is to reach out to someone who has more information about the issue.
This could be the person who wrote the code, or someone who has more context about the system.
It is important to be respectful of maintainer time especially if they are not on-call or during regular working hours for their timezone (listed in Slack).
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
A useful methodology for root cause analysis is the [5 Whys](https://en.wikipedia.org/wiki/5_Whys).
1. State the issue.
2. Start asking “why” related to the problem. Like an inquisitive toddler, keep asking why in response to each suggested cause. 
3. Ask as many "why"s as you need in order to get insight at a level that can be addressed (asking five times is typical). 
 - You will know when you're done asking why when it doesn't make sense to ask why anymore.

Use the result of this analysis to figure out what action items should be taken to prevent the issue from happening again.

## On-Call

Wing is maintained by a global team so we can have a 24/7 on-call without sacrificing too much sleep or sanity.
Each rotation has a primary and secondary responder, if the primary is unable to be reached then the secondary becomes the primary.
The responsibility of an on-call responder is to be quickly available to take ownership of an incident. 
This include acknowledging the incident, triage, and communication.
At any point ownership can be transferred to another maintainer as long as it is clearly agreed upon and communicated.
Any maintainer should be empowered take ownership of an incident if they wish, however those on-call have a responsibility to do so.

**Rotation 1 (Israel/Europe)**: 03:00 UTC -> 15:00 UTC
**Rotation 2 (US)**: 15:00 UTC -> 03:00 UTC

[PagerDuty](https://www.pagerduty.com/) is used to manage the on-call rotation. It is configured to send alerts in the following ways:

- (always, immediately) send a Slack message to #alert
- (always, immediately) send a non-invasive notification (text or push) to the primary responder
- (if not acknowledged within 5 minutes) call the primary responder up to three times
- (if not acknowledged within 10 minutes) send a non-invasive notification (text or push) to the secondary responder
- (if not acknowledged within 15 minutes) call the secondary responder up to three times
- (if not acknowledged) Repeat everything above except for the slack message
