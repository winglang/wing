---
title: CI/CD
id: ci-cd
keywords: [CICD, Continuous Integration, Continuous Deployment, Deployment, GitHub Actions]
---

Wing compiles to multiple targets such as `tf-aws`, `tf-azure`, `tf-gcp` or `awscdk`. Once the compilation is complete, Wing does not dictate the method for deploying your infrastructure. Its focus on Terraform targets means almost all existing services can be used for deployment, providing significant flexibility to select the method that best fits your organizational needs or is most straightforward.

This guide will walk you through a full deployment lifecycle of a Wing application using GitHub Actions and the `tf-aws` target.

## Setup
### Managing Access for GitHub Actions and AWS

While you can use static, long-lived IAM user credentials, this is generally discouraged due to security risks.

Instead, it's advisable to use GitHub's OpenID Connect service in conjunction with Amazon Web Services for better security. This service provides temporary credentials, reducing the risk of unauthorized access. More information can be found in [Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) and [configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials).

### Terraform State

The Terraform state must be persisted as part of the GitHub Action workflow. To ensure this is set up correctly, please refer to this [guide](./terraform-backends).

## Wing GitHub Action

With the AWS credentials and Terraform state setup, the most straightforward approach is to use the [Wing GitHub Action](https://github.com/winglang/wing-github-action/).

### Deployments

This action handles [deployments](https://github.com/winglang/wing-github-action/tree/main/actions/deploy). Here's an example configuration.

```yml
on:
  push:
    branches:
      - main

# Make sure there is only one deployment running at
# the same time. See https://docs.github.com/en/actions/using-jobs/using-concurrency
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false

permissions:
  id-token: write # This is required for requesting the JWT
  contents: read  # This is required for actions/checkout

env:
  AWS_REGION: ${{ secrets.AWS_REGION }}
  TF_BACKEND_BUCKET: ${{ secrets.TF_BACKEND_BUCKET }}
  TF_BACKEND_BUCKET_REGION: ${{ secrets.AWS_REGION }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          role-session-name: gh-actions-winglang
          aws-region: ${{ env.AWS_REGION}}
      - name: Deploy Winglang App
        uses: winglang/wing-github-action/actions/deploy@main
        with:
          entry: main.w
          target: 'tf-aws'
```

### Pull Request Diffs

This Github Action [generates diffs](https://github.com/winglang/wing-github-action/tree/main/actions/pull-request-diff) for Pull Requests against the main branch and comments with the changeset.

```yml
on: [pull_request]

permissions:
  id-token: write # This is required for requesting the JWT
  contents: read  # This is required for actions/checkout
  pull-requests: write # This is required for commenting on PRs

env:
  AWS_REGION: ${{ secrets.AWS_REGION }}
  TF_BACKEND_BUCKET: ${{ secrets.TF_BACKEND_BUCKET }}
  TF_BACKEND_BUCKET_REGION: ${{ secrets.AWS_REGION }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          role-session-name: gh-actions-winglang
          aws-region: ${{ env.AWS_REGION }}
      - name: Terraform Plan
        uses: winglang/wing-github-action/actions/pull-request-diff@main
        with:
          entry: main.w
          target: 'tf-aws'
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
## Custom GitHub Actions Workflow for AWS

Most users will find using the Wing GitHub Action within GitHub Actions the simplest and most effective method. If you have specific requirements, such as additional build steps, you may need to create your own custom GitHub Actions Workflow.

## Continuous Integration

### Running Tests

Tests should be run in every build to ensure code quality and prevent potential issues from making it into the production environment.

### Diff

Assuming we have a GitHub repository with a `main` branch configured as our default branch, we want each commit to be deployed to the desired AWS account. In this setup, a 'diff' would display the changes introduced in the commit and provide an opportunity to review them before deployment.

## Continuous Delivery

Continuous Delivery is a methodology where code changes are automatically built, tested, and prepared for a release to production. It expands upon Continuous Integration by deploying all code changes to a testing environment and/or production environment after the build stage.

## Live Examples

For a real-world example of a Wing application continuously deployed to AWS using GitHub actions, visit [https://github.com/winglang/gwomp](https://github.com/winglang/gwomp).
