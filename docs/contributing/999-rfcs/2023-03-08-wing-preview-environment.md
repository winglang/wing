---
title: "#3696 Wing Cloud Preview Environments"
description: This document describes an MVP for the first Wing Cloud product - Wing Cloud Preview Environments.
---

# Wing Cloud Preview Environments

- **Author(s)**: @ainvoner, @skyrpex
- **Submission Date**: 2023-08-03
- **Stage**: Proposal
- **Stage Date**: 2023-08-03

This document describes an MVP for the first Wing Cloud product - Wing Cloud Preview Environments.

## Introduction

**Preview Environments** are the first feature of Wing Cloud. It will also be the first production grade product written in Wing language.

## Requirements

Wing Cloud users can build and deploy Wing applications to an ephemeral environment that uses the Wing Simulator platform, and use the Wing Console UI to interact with it.
Once a preview environment is created, tests will be executed automatically and the results will be available in the preview environment dedicated comment in GitHub.
Each preview environment will have a unique URL which enable developers to work together and share with external customers as needed.

Wing Cloud will be integrated with GitHub.

### Wing Cloud User Experience

#### Sign-In to Wing Cloud (#1)

1. On https://wing.cloud website click on sign in.
2. Authenticate using your GitHub account.
3. After signing in, you will be redirected to https://wing.cloud/dashboard.

#### Redirect to sign-in process from a Preview Environment URL (#2)

1. If you try to access a preview environment URL while you are not signed in to Wing Cloud (from the PR comment for example), you will be temporarily redirected to the Wing Cloud sign-in flow.
2. Once singed in, you will be redirected back to the preview environment URL.

#### Wing Cloud Dashboard for Signed-In Users (#3)

1. Once signed in, you will be able to navigate directly to https://wing.cloud/dashboard.
2. You can see and manage all your projects and teams.
3. Select the project you are currently working on from the projects menu to see all preview environments associated with it.
4. In order to see a preview environment, just click on the preview environment URL from the list of your preview environments.
5. For each preview environment, you can see the deployment logs and the test results and logs.

#### Create a new personal Project (#4)

1. To create a new project, click on "New Project" under "Personal Account".
2. Choose between the GitHub repositories that you have access to.
3. Define your secret values / Environment variables.
4. Make sure there's a `main.w` or a `*.main.w` file in the root of the repository.
5. Click on "Deploy".
6. You'll be redirected to your new project's page (https://wing.cloud/dashboard/-user/-project).

#### Create a new Team (#5)

1. Click on "New Team".
2. Write a team name.
3. Optionally, invite other Wing Cloud users to the team (by GitHub user ID).

#### Create a new team Project (#6)

1. Click on "New Project" under the team of your choice.
2. Choose between the GitHub repositories that you have access to.
3. Define your secret values.
4. Make sure there's a `main.w` or a `*.main.w` file in the root of the repository.
5. Click on "Deploy".
6. You'll be redirected to your new project's page (https://wing.cloud/dashboard/-team/-project).

#### Preview Environment for production branch (#7)

For the repository production branch, there is a single preview environment that will constantly be up-to-date with the latest code committed.
A link to the preview environment is available in the repository main page ("About" section).
Production branch environment url structure is: `https://wing.cloud/-account/dashboard/-project/-branch`
Once the installation of the Wing Cloud application is completed, an initial preview environment will be created and will be available in the repository main page.

#### Preview Environments for Pull Requests (#8)

Upon each creation of a pull request an automatic comment will be added to the PR and will guide the developer to a dedicated preview environment.
Provide a streamlined process for updating a pull request preview environment, each commit to a PR will redeploy the preview environment and will also:

1. Provide a real-time build, tests and deployment status updates
2. While the preview environment is being updated, the user that is currently using the environment will be notified and will be able to refresh the page to get the latest changes.
3. Ensure a consistent and unique url for each preview environment. The url structure: `https://wing.cloud/dashboard/-account/-project/-branch` (account is a `<user>` or a `<team>`)
4. Provide the ability to download the preview environment deployment logs for debugging purposes in case of failure, logs urls structure is: `https://wing.cloud/dashboard/-account/-project/-branch/logs/build/`

PR comment example (only one entry point will be supported):

| Entry Point     | Status                                                                           | Preview                                                       | Tests                                                                                                                                                  | Updated (UTC)       |
| --------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| main.w          | ✅ Ready ([logs](https://wing.cloud/dashboard/-account/-project/-branch/logs/build/))      | [Visit Preview](https://wing.cloud/dashboard/-account/-project/-branch) | ✅ [sanity](https://wing.cloud/dashboard/-account/-project/-branch/logs/tests/sanity) <br /> ✅ [E2E](https://wing.cloud/dashboard/-account/-project/-branch/logs/tests/E2E) | Jul 31, 2023 8:01am |
| failed.main.w   | ❌ Failed ([logs](https://wing.cloud/dashboard/-account/-project/-branch/logs/build/))     |                                                               |                                                                                                                                                        | Jul 31, 2023 8:01am |
| building.main.w | 🔄 Building ([logs](https://wing.cloud/dashboard/-account/-project/-branch/logs/build/))   |                                                               |                                                                                                                                                        | Jul 31, 2023 8:01am |
| stale.main.w    | ⏸️ Stale ([lean more](https://wing.cloud/dashboard/-account/-project/-branch/logs/build/)) |                                                               |                                                                                                                                                        | Jul 31, 2023 8:01am |

#### Preview Environment Environment Variables (Secrets) (#9)

The project management dashboard will include a section to manage the secrets of the project. These secrets will be available during the Wing compilation.

#### Run Tests Automatically Upon PR Creation and Commits (#10)

Upon PR creation and commits, Wing Cloud Preview Environments will automatically run all tests defined for the entry point.
For each test run, a new simulator instance will be created and will be destroyed upon test completion.
The test results will be available in the PR comment with links to the tests logs (`https://wing.cloud/dashboard/-account/-project/-branch/logs/tests/<test-name>`)

#### Running Tests Manually From Wing Console (#11)

Running tests on your environment is easy using the Wing Console tests UI.
Each test will reload the simulator to create a clean environment.

Once the test is over it will **not** clean up the simulator data, so you can debug the environment and share outputs with your teammates.

#### Access application endpoints from the Wing Console (#12)

Users will be able to access the applications' public endpoints such as APIs and web pages.

#### User-Controlled Environments termination (#13)

Closing a PR will terminate the corresponding preview environments.
The PR comment will indicate the termination of each preview environment and the URLs won't be valid anymore.

#### Environments Self-Cleaning Mechanism (#14)

To ensure efficient resource utilization:

1. Preview environments associated with stale PRs (without access or commits for over 10 days) will automatically deactivate.
2. The PR's preview environment comment will indicate its inactive status.
3. Changes in code will trigger redeployment for all related preview environments in this PR.

### Analytics and Logs (#15)

To improve the product we are collecting data and monitoring the system.

1. We collect preview environments usage analytics only. We won't collect anything about your code and project.
2. OpenTelemetry is used for collecting metrics, logs, traces.
3. Datadog is used for monitoring the system.

### Documentation (#16)

Developers reading our docs can easily sign up to Wing Cloud and start using its Preview Environments feature in their repository.
In our docs we have the following information:

1. What is Wing Cloud Preview Environments
2. Getting started instructions
3. How can I configure multiple entry points
4. Populate environment with initial data
5. Running tests

### Security (#17)

1. Preview environments shouldn’t be able to access files from other preview environments.
2. Only Wing Cloud signed up developers with access to the repository can view preview environments created for this repository.

## Non-Requirements

1. password protected preview environments.
2. wing configuration file support. (for stating a specific wing version, entry points, etc.)
3. update PR comment with tests results triggered from the console.
4. enable preview environments viewers to add comments in the environment.
5. populate Environment with Initial Data
6. Allow users to define specific environment machine type / configuration (cpu, memory, etc.)
7. Support multiple entry points in a single PR:

   There is a support for multiple entry points in a single PR.
   Every `main.w` and `*.main.w` file in the repository will be considered as an entry point and will have a dedicated preview environment.
   All preview environments will be available in the PR comment and will be updated upon code changes.

## Technical Details

### Entity Relationship Diagram

```mermaid
erDiagram
    User ||--0+ RoleAssignment : has
    RoleAssignment 1+--|| Team : has
    User o|--0+ Project : owns
    Team o|--0+ Project : owns
    User {
        UserId userId
        string githubUserId
        string name
        string email
    }
    RoleAssignment {
        UserId userId
        string roleType
    }
    Project {
        ProjectId projectId
        UserIdOrTeamId accountId
        string name
        string githubRepoId
        string wingEntrypoint
        map environmentVariables
    }
    Team {
        TeamId teamId
        string name
    }
    Environment {
        EnvironmentId environmentId
        ProjectId projectId
        string branch
        string url
        string status
    }
    Project ||--0+ Environment : has
```

### Roles

| Role    | Manage Projects | Manage Users | Manage Billing | Manage Settings | View Projects | View Users | View Billing | View Settings | View Preview Environments |
| ------- | --------------- | ------------ | -------------- | --------------- | ------------- | ---------- | ------------ | ------------- | ------------------------- |
| Owner   | ✅              | ✅           | ✅             | ✅              | ✅            | ✅         | ✅           | ✅            | ✅                        |
| Admin   | ✅              | ✅           | ✅             | ✅              | ✅            | ✅         | ✅           | ✅            | ✅                        |
| Member  | ❌              | ❌           | ❌             | ❌              | ✅            | ✅         | ✅           | ✅            | ✅                        |
| Billing | ❌              | ❌           | ✅             | ❌              | ✅            | ✅         | ✅           | ✅            | ✅                        |

Notes:

- Only an owner can delete a team
- The billing details will be visible to all members but will be mangled (ex, only the last 4 digits of the credit card will be visible)

### Technology

- https://winglang.io for the infrastructure
- AWS for the infrastructure
- Node.js 18 for the backend
- https://github.com/probot/probot for the GitHub integration
- https://fly.io for the preview environments
- https://react.dev/ for the frontend

### High Level Architecture

- A GitHub app
- A Cloud.Function that will be triggered by GitHub events, such as `pull_request.synchronize` or `pull_request.closed`
- A fly.io account to deploy the preview environments
- A Cloud.Table to store different data
- A Cloud.Bucket to store the deployment logs and test logs
- A Cloud.Scheduler to run the self-cleaning mechanism
- Wing Cloud web app will serve the console web application and use console servers run on fly.io machine

### Wing Cloud website

The website will be a React app. Astro can be used on top of it to provide the static parts of the web.

### Authentication

1. When a user sign in we will save their GitHub account details in the database
2. The website https://wing.cloud will use a secure HTTP-only cookie that safely encodes a JWT containing the Wing Cloud user ID
3. Every interaction with the Wing Cloud will be through an API. Any request to the API will be authenticated using this cookie. The API will then use the user ID to check if the user has the necessary permissions to perform the action
   - Additional security measures will be taken to prevent CSRF attacks

### Authorization

1. Only signed-in users will be available to navigate to preview environments. Wing Cloud will check the user permissions to the project and will allow access only to users that are members of the project.

### Authentication for Preview Environment Server

1. When a user visits https://wing.cloud/-user/-project/-branch, a JWT will be generated from the backend of Wing Cloud
2. The JWT will hold project ID, and the Preview Environment Server will check this token for a match in project ID

### Sign Up and Sign In

We can use the GitHub app as an OAuth provider for Wing Cloud. A set of pages will be needed:

```mermaid
sequenceDiagram
    wing.cloud/login->>Wing Cloud Platform GitHub App: Redirect
    Wing Cloud Platform GitHub App-->>Wing Cloud Platform GitHub App: Login to GitHub
    Wing Cloud Platform GitHub App-->>wing.cloud/login/callback: Redirect (with some tokens)
    wing.cloud/login/callback-->>wing.cloud/login/callback: Generate a new user ID on our tables, if it doesn't exist
    wing.cloud/login/callback-->>wing.cloud/login/callback: Exchange tokens and encode them in a cookie for https://wing.cloud
    wing.cloud/login/callback-)wing.cloud: Redirect (now with the authenticated cookie)
```

> **Important Note:** Since we don't ask for information during the sign-up process, both the sign-up and sign in flows are the same.

### Processing GitHub Events

A Cloud.Function will listen to GitHub events and will process them. Based on the event, the function will create, update or delete preview environments on Flyio.

```mermaid
graph LR
    gh{GitHub}
    ghapp>GitHub App]
    fn[Process Events Fn]
    flyio{Flyio}
    gh -- Integration --> ghapp
    ghapp -- Events --> fn
    fn -- Create Preview Environment --> flyio
    fn -- Update Preview Environment --> flyio
    fn -- Delete Preview Environment --> flyio
```

Depending on whether GitHub retries events or not, we may want to include a FIFO queue in the middle.

```mermaid
graph LR
    gh{GitHub}
    ghapp>GitHub App]
    fn[Process Events Fn]
    queue[(Events Queue)]
    fn2[Enqueue Events Fn]
    ghapp -- Events --> fn2
    fn2 --> queue
    queue --> fn
    gh -- Integration --> ghapp
    fn --> rest[...]
```

The probot npm package will take care of ensuring the events received are legitimate.

### Creating Preview Environments

When a GitHub event `pull_request.opened` is received, we will look for all of the projects that use the GitHub repository mentioned in the event. For every project, we will create a new Preview Environment.

- We will use the Flyio API to create new project/container(s) and deploy the app code (the Flyio specifics may change)
- Project secrets will be retrieved and passed to the Flyio container

Each preview environment will have a dedicated route (path) in wing.cloud: https://wing.cloud/-account/-project/-branch.

During this process, we will create new entries in the Cloud.Table that represent our Preview Environment entities. They'll contain the Flyio project ID and URL, the GitHub PR ID or branch, and whatever unique IDs we generate for every environment.

A special comment will be added to the PR with the list of preview environments and their status. The comment will be updated as the preview environments are created and updated.

### Preview Environment Environment Variables (Secrets)

The secrets will be stored in the Cloud.Table and will be injected into the preview environment during the build process.

The secrets in the Cloud.Table will be encrypted using a key stored using a Cloud.Secret.

In the future, we could detect which secrets are necessary for the app to work.

### Updating Preview Environments

When a GitHub event `pull_request.synchronize` is received, we will look for all of the projects will use the GitHub repository mentioned in the event.

The entries in the Cloud.Table will be updated to update the last time the preview environment was updated.

The special comment in the PR will be updated accordingly.

### Deleting Preview Environments

When a GitHub event `pull_request.closed` is received, we will stop every Flyio project associated with the PR. We will also update the entries in the Cloud.Table to reflect this status.

The special comment in the PR will be updated accordingly.

### Deleting Stale Environments

A scheduler will run periodically and will delete stale environments (in a process similar to the one above).

```mermaid
graph LR
    fn[Clean Stale Environments Fn]
    scheduler[Scheduler]
    flyio{Flyio}
    scheduler -- On Tick --> fn
    fn -- Delete Preview Environment --> flyio
```

### Updating the status of a Preview Environment

The Flyio containers that hold the user apps may take some time to spin up. A few seconds may pass before the console app is even running. If that's the case, we'll need a mechanism to store these different statuses.

A simple solution would be to enable the Flyio containers to ping Wing Cloud (using a simple JWT). These pings may contain the current status information (ex, status=loading, status=live).
