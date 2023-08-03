---
title: Wing Preview Environments
description: This document describes the Wing Cloud Preview Environments feature.
---

# #3696 - Wing Cloud Preview Environments

- **Author(s):**: @ainvoner, @skyrpex
- **Submission Date**: 2023-08-03
- **Stage**: Proposal
- **Stage Date**: 2023-08-03

This document describes the Wing Cloud Preview Environments feature.

## Introduction
The **Wing Cloud Preview Environments** project is designed to achieve two key objectives. Firstly, it aims to offer a preview environment solution for those interested in using winglang.
Secondly, it seeks to enhance the winglang ecosystem and its toolchain by building a production application using the language.

## Requirements
Build and Deploy wing applications to a Wing Console simulated environment.
Allow developers to iterate with their teammates using a shared Wing Console instance.
Seamlessly integrating with GitHub.

### Developer Experience
A developer using winglang has the capability to integrate preview environments with his/her repository.

#### Installation
The installation process is straightforward using GitHub application:

1. Goto https://wing.cloud/preview website and click "Deploy with Wing"
2. Complete GitHub authentication.
3. Grant repository access permission.

#### Preview Environment for production branch
For the production branch, there is a single preview environment that will constantly be up to date with the latest code committed.
A link to the preview environment is available in the repository main page ("About" section).

#### Preview Environments for Pull Requests
Upon each creation of a pull request, an automatic comment will be added to the PR and will guide the developer to a dedicated preview environment. The deployed preview environment will have a unique url for easy identification.
To provide a streamlined process for updating a pull request preview environment, each PR code changes will redeploy the preview environment and also will:
1. provide a real-time build and deployment updates
2. ensure a consistent url for the preview environment
3. provide the ability to download the deployment logs

PR comment example:

| Entry Point  | Status | Preview | Updated (UTC) |
| ------------- | ------------- | ------------- | ------------- | 
| main.w  |  ✅ Ready ([logs](https:/main-pr.wing-preview.com/logs)) | [Visit Preview](https:/main-pr.wing-preview.com) |  Jul 31, 2023 8:01am |
| failed.main.w  | ❌ Failed ([logs](https:/main-pr.wing-preview.com/logs))  |  |  Jul 31, 2023 8:01am |
| building.main.w  |  🔄 Building ([logs](https:/main-pr.wing-preview.com/logs))  | |  Jul 31, 2023 8:01am |
| stale.main.w  | ⏸️ Stale  ([lean more](https:/winglang.io/docs/preview))  | |  Jul 31, 2023 8:01am |

#### User-Controlled Environments termination
User should have control over when to terminate their preview environments. Closing a PR will terminate the corresponding preview environment

#### Self-Cleaning Environments Mechanism
To ensure efficient resource utilization:
1. Preview environments associated with stale PRs (without access or code changes for over 30 days) will automatically deactivate.
2. The PR's preview environment comment will indicate its inactive status.
3. Changes in code will trigger redeployment.

#### Additional Features
Other valuable features include:
1. Running tests on pull requests, noting that tests will operate within isolated environments to prevent disruption for other users.
2. Configuration of multiple entry points files for creating multiple preview environments in a single PR
3. Populate a preview environment with an initial data

### Analytics and Logs
To improve the product we should collect data that we can analyze
1. Collect usage analytics
2. use OpenTelemetry for collecting metrics, logs, traces

### Documentation
Developer reading our docs can easily start integrate Wing Preview Environments in his repository.
In our docs we have information about:
1. What is Wing Preview Environment
2. Getting started instructions
4. How can I configure multiple entry points
5. Populate environment with initial data
6. Running tests

### Security
1. The preview environments shouldn’t be able to access files from other preview environments
2. Only authenticated users should be able to use Wing Preview Environments

## Technical Design
TBD