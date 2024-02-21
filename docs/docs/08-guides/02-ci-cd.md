---
title: CI/CD
id: ci-cd
keywords: [CICD, Continuous Integration, Continuous Deployment, Deployment, GitHub Actions]
---

Wing supports compilation to various targets including `tf-aws`, `tf-azure`, and `tf-gcp`. After compilation, Wing does not impose a specific deployment method for your infrastructure. Its Terraform target compatibility ensures that nearly all existing services can be utilized for deployment, offering considerable flexibility to choose the approach best aligned with your organizational needs or preferences.

This guide will detail the complete deployment lifecycle of a Wing application using GitHub Actions and the `tf-aws` target.

## Setup
### Managing Access for GitHub Actions and AWS

It's generally discouraged to use static, long-lived IAM user credentials due to associated security risks.

As an alternative, it's recommended to use GitHub's OpenID Connect service in conjunction with Amazon Web Services to enhance security. This service offers temporary credentials, thereby reducing the risk of unauthorized access. For more information, refer to [Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) and [configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials).

Find an example for setting up Github OIDC with Wing [here](https://github.com/winglang/github-aws-oidc).

### Terraform State

Persisting the Terraform state is a crucial part of the GitHub Action workflow. To ensure this is properly set up, refer to this [guide](./terraform-backends).

## Wing GitHub Action

With AWS credentials and Terraform state set up, the easiest approach is to use the [Wing GitHub Action](https://github.com/winglang/wing-github-action/).

### Environment Variables

- `AWS_REGION`: The target region for app deployment.
- `TF_BACKEND_BUCKET`: The name of the bucket where the Terraform state is stored, for example, `my-terraform-state-bucket-with-a-globally-unique-name`.
- `TF_BACKEND_BUCKET_REGION`: The region for the Terraform state bucket. This should match the region defined above.

### Secrets

- `AWS_ROLE_ARN`: The Github OIDC enabled AWS role arn. This role should be configured to allow access from the repository being deployed from. Moreover, it should have sufficient permissions to create the resources defined in the Wing application. Defining this as a Github Action secret won't print the role name in the Github Action log output. Depending on the context of your application, this might be desirable, but it's not strictly necessary.

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
  AWS_REGION: 'us-east-1'
  TF_BACKEND_BUCKET: 'my-terraform-state-bucket-with-a-globally-unique-name'
  TF_BACKEND_BUCKET_REGION: 'us-east-1'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          role-session-name: gh-actions-winglang # makes it easy to identify, e.g. in AWS Cloudtrail
          aws-region: ${{ env.AWS_REGION }}
      - name: Deploy Winglang App
        uses: winglang/wing-github-action/actions/deploy@v0.1.0
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
  AWS_REGION: 'us-east-1'
  TF_BACKEND_BUCKET: 'my-terraform-state-bucket-with-a-globally-unique-name'
  TF_BACKEND_BUCKET_REGION: 'us-east-1'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          role-session-name: gh-actions-winglang
          aws-region: ${{ env.AWS_REGION }}
      - name: Terraform Plan
        uses: winglang/wing-github-action/actions/pull-request-diff@v0.1.0
        with:
          entry: main.w
          target: 'tf-aws'
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
## Custom GitHub Actions Workflow for AWS

Most users will find using the Wing GitHub Action within GitHub Actions as the simplest and most effective method. However, if you have specific requirements such as additional build steps, you may need to create your own custom GitHub Actions Workflow.

### Deployment

Refer to the following Github Action workflow as a template to define your customized workflow. For detailed instructions, please refer to the Github Actions [documentation](https://docs.github.com/en/actions).

#### Backend Plugin

Add the following file to your application root directory as `plugin.s3-backend.js`. This will be used in the Github Action workflow during the `wing compile` step. Learn more about this in the [Terraform Backend guide](./01-terraform-backend.md)

```
// plugin.s3-backend.js
exports.postSynth = function(config) {
  if (!process.env.TF_BACKEND_BUCKET) {throw new Error("env var TF_BACKEND_BUCKET not set")}
  if (!process.env.TF_BACKEND_BUCKET_REGION) {throw new Error("env var TF_BACKEND_BUCKET_REGION not set")}
  if (!process.env.TF_BACKEND_STATE_FILE) {throw new Error("env var TF_BACKEND_STATE_FILE not set")}
  config.terraform.backend = {
    s3: {
      bucket: process.env.TF_BACKEND_BUCKET,
      region: process.env.TF_BACKEND_BUCKET_REGION,
      key: process.env.TF_BACKEND_STATE_FILE
    }
  }
  return config;
}
```

#### Deployment Workflow

This workflow:

- Checks out the code.
- Installs Node.js v20.
- Installs the winglang CLI with the latest version.
- Installs npm dependencies (this step can be skipped if not necessary).
- Retrieves short-lived credentials for AWS via OIDC.
- Compiles the Wing application.
- Uses Terraform to deploy the synthesized Terraform configuration.

:::info

The output directory of the wing compile step depends on the Wing application's file name. When your file is named `main`, the output directory will be `./target/main.tfaws`. This allows for the compilation and deployment of multiple applications from the same base directory. For the workflow, we're assuming a `main.w` file name.

:::

```
name: Deploy and Test Wing Application

on:
  push:
    branches: [ main ]

# Make sure there is only one deployment running at
# the same time. See https://docs.github.com/en/actions/using-jobs/using-concurrency
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false

permissions:
  id-token: write # This is required for requesting the JWT
  contents: read  # This is required for actions/checkout

env:
  AWS_REGION: "us-east-1"
  # The following values are used in the backend plugin which
  # is used in the `wing compile` step
  TF_BACKEND_BUCKET: "my-terraform-state-bucket-with-a-globally-unique-name"
  TF_BACKEND_BUCKET_REGION: "us-east-1"
  TF_BACKEND_STATE_FILE: "my/repo/main/terraform.tfstate"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      - name: Setup Node.js v18
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install winglang globally
        run: npm install -g winglang@latest
      - name: Install Dependencies
        run: npm ci
      - name: Compile
        run: wing compile -t tf-aws --plugins=plugin.s3-backend.js main.w
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          role-session-name: gh-actions-winglang-website-proxy
          aws-region: ${{ env.AWS_REGION }}
      - name: Deploy with Terraform
        run: cd ./target/main.tfaws && terraform init && terraform apply -auto-approve
```

### Customization

The workflow can be easily adapted to your specific needs. Here are a few suggestions:

#### Test Execution

Consider adding Winglang simulator tests as an intermediate step in your workflow. For example:

```
# ...
      - name: Install Dependencies
        run: npm ci
      - name: Run Tests
        run: wing test main.w
      - name: Compile
        run: wing compile -t tf-aws --plugins=plugin.s3-backend.js main.w
# ...
```

#### Implementing Terraform Checks

Consider integrating third-party Terraform analysis tools for more comprehensive checks. For instance:

```
# ...
      - name: Install Dependencies
        run: npm ci
      - name: Compile
        run: wing compile -t tf-aws --plugins=plugin.s3-backend.js main.w
      - name: Check Terraform Config
        run: cd ./target/main.tfaws && your-tf-tool
# ...
```

## Live Examples

For a practical demonstration of a Wing application being continuously deployed to AWS via the Winglang GitHub Actions, refer to [this example](https://github.com/winglang/gwomp).
