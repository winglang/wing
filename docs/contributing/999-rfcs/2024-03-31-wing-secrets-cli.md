---
title: "#6105 Wing Secrets CLI"
description: Creating Wing secrets from the CLI
---

# Wing Secrets CLI
- **Author(s)**: @hasanaburayyan
- **Submission Date**: 2024-03-31
- **Stage**: Draft

Creating secrets through the Wing CLI.

## Background

Wing applications often require secrets to be retrieved during runtime. These secrets are stored in platform specific secret stores, such as AWS Secrets Manager for `tf-aws` or a local `.env` file for the `sim` platform.

Secrets must be configured before the application is run, and now the Wing CLI along with Wing platforms make it easy to configure secrets.

### Out of Scope

In this RFC a few things are out of scope:
- Checking if the secrets exist in the platform's secret store when running `wing compile`
- Reading secret values, for now we will only focus on creating secrets

## Platform Hook

Since secrets creation is platform specific, platforms can now implement a new hook `configureSecrets(secrets: { [key: string]: string }): string` which will be called by the Wing CLI to configure the secrets.

For example the `sim` platform implementation which needs to store secrets in a `.env` file, would look something like this:

```js
public async createSecrets(secrets: { [key: string]: string }): Promise<string> {
  let existingSecretsContent = "";
  try {
    existingSecretsContent = fs.readFileSync('./.env', 'utf8');
  } catch (error) {}

  const existingSecrets = existingSecretsContent.split('\n')
    .filter(line => line.trim() !== '')
    .reduce((s, line) => {
      const [key, value] = line.split('=', 2);
      s[key] = value;
      return s;
    }, {} as { [key: string]: string });

  for (const key in secrets) {
    existingSecrets[key] = secrets[key];
  }

  const updatedContent = Object.entries(existingSecrets)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync('./.env', updatedContent);

  return "Secrets saved to .env file";
}
```

## CLI Command

Introducing a new Wing CLI command `secrets` which will be used for managing secrets in the Wing applications.

Given the following Wing application:

```js
bring cloud;

let slackSigningSecret = new cloud.Secret(name: "SLACK_SIGNING_SECRET");
let slackBotToken = new cloud.Secret(name: "SLACK_BOT_TOKEN");
```

### Creating Secrets

Running `wing secrets main.w` will result in an interactive experience where the user is prompted to enter the values for the secrets:

```bash
wing secrets main.w

2 secrets found in main.w

Enter the value for SLACK_SIGNING_SECRET: ********
Enter the value for SLACK_BOT_TOKEN: ********

Secrets saved to .env file
```

This results in a `.env` file being created with the secrets stored in it.

### specifying the platform

You can specify the platform using the `-t` flag, for example to configure the secrets for the `tf-aws` platform:

```bash
wing secrets main.w -t tf-aws

2 secrets found in main.w

Enter the value for SLACK_SIGNING_SECRET: ********
Enter the value for SLACK_BOT_TOKEN: ********

Secrets saved to AWS Secrets Manager
```

### Listing Secrets

If the user prefers to ignore the interactive experience of creating secrets in favor of creating the secrets themselves, there is an option to list the secrets in the Wing application:

```bash
wing secrets main.w --list

2 secrets found in main.w

- SLACK_SIGNING_SECRET
- SLACK_BOT_TOKEN
```
