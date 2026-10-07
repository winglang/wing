# AWS account for the tf-aws end-to-end tests

The SDK spec tests (`tests/sdk_tests`, run by
[`sdk-spec-test.yml`](../workflows/sdk-spec-test.yml)) deploy every test file to
a real AWS account with `wing test -t tf-aws`. CI gets into that account through
GitHub OIDC. There are no long-lived keys.

| File                                                         | Purpose                                                                                                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`e2e-oidc.yaml`](./e2e-oidc.yaml)                           | CloudFormation stack, deployed once by hand. It creates the GitHub OIDC provider, the CI role, and an optional budget alarm.               |
| [`cleanup-stale-resources.sh`](./cleanup-stale-resources.sh) | Deletes test resources that a cancelled run leaked. [`periodic-aws-clean.yml`](../workflows/periodic-aws-clean.yml) runs it every 6 hours. |

Until the `AWS_E2E_ROLE_ARN` repository variable is set, the `sdk-spec-test`
and `aws-cleanup` jobs are **skipped**, and the build's quality gate accepts a
skipped job. Deleting the variable later turns both jobs off again.

## Setup

Use a dedicated sandbox account. Nothing else should live in it. All commands
below use `us-east-1`, the region the tests deploy to.

1. **Create the account.** Optionally raise its quotas (Service Quotas
   console):
   - _AWS Lambda → Concurrent executions_ (`L-B99A9384`). New accounts can
     start as low as 10, and the tests invoke many functions in parallel.
     Request 1000.
   - Keep account-level _S3 Block Public Access_ off, because the
     public-bucket and website tests need public bucket policies.

2. **Deploy the stack.** These commands use credentials for the sandbox
   account.

   ```sh
   aws cloudformation deploy \
     --region us-east-1 \
     --stack-name wing-github-e2e \
     --template-file .github/aws/e2e-oidc.yaml \
     --capabilities CAPABILITY_NAMED_IAM \
     --parameter-overrides \
       BudgetNotificationEmail=you@example.com \
       MonthlyBudgetUSD=50

   # optional: protect the stack from accidental deletion
   aws cloudformation update-termination-protection --region us-east-1 \
     --stack-name wing-github-e2e --enable-termination-protection
   ```

   You can use the console instead:
   [CloudFormation → Create stack](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create)
   → _Upload a template file_ → `e2e-oidc.yaml` → acknowledge the IAM
   capability.

   - If the account already has a `token.actions.githubusercontent.com` OIDC
     provider, add `CreateOIDCProvider=false`.
   - Leave `BudgetNotificationEmail` empty to skip the budget alarm.
   - Other parameters are `GitHubRepository` (default `winglang/wing`),
     `GitHubEnvironment` (default `aws-e2e`), `RoleName` (default
     `wing-github-e2e`), and `MaxSessionDuration` (default 4h).

3. **Create the GitHub environment `aws-e2e`.** The role trusts only jobs
   bound to it.

   ```sh
   gh api -X PUT repos/winglang/wing/environments/aws-e2e
   ```

   (Or use _Settings → Environments → New environment_.) Protection rules are
   optional:
   - **No rules** (recommended). Any workflow job in `winglang/wing` that
     declares `environment: aws-e2e` can get credentials. Only people with write
     access can add such a job. Fork PRs never get OIDC tokens.
   - **Deployment branches = `main`.** PR-label runs then fail at the
     environment gate. Only pushes to main, manual dispatches on main, and the
     cleanup can use the account.
   - **Required reviewers.** Every spec-test run _and_ every 6-hourly cleanup
     waits for approval.

4. **Point CI at the role.** Use a _repository_ variable, not an environment
   variable, because the build's job-level `if` reads it before any
   environment is bound.

   ```sh
   ROLE_ARN=$(aws cloudformation describe-stacks --region us-east-1 \
     --stack-name wing-github-e2e \
     --query "Stacks[0].Outputs[?OutputKey=='RoleArn'].OutputValue" --output text)
   gh variable set AWS_E2E_ROLE_ARN --repo winglang/wing --body "$ROLE_ARN"
   ```

5. **Trigger a run.**

   ```sh
   gh workflow run build.yml --repo winglang/wing --ref main
   gh run watch --repo winglang/wing "$(gh run list --repo winglang/wing --workflow build.yml --limit 1 --json databaseId -q '.[0].databaseId')"

   # check the sweeper (dry run, only lists what it would delete)
   gh workflow run periodic-aws-clean.yml --repo winglang/wing -f dry_run=true
   ```

   You can also open a PR from a branch in this repo with the
   `🧪 pr/e2e-full` label, then push a commit. The label must be on the PR
   before the build starts.

6. **Delete the dead static keys** from the old company account:

   ```sh
   gh secret delete AWS_ACCESS_KEY --repo winglang/wing
   gh secret delete AWS_SECRET_ACCESS_KEY --repo winglang/wing
   ```

## When the tests run

`build.yml` runs the `sdk-spec-test` job, which covers `tf-aws` and `sim` (the
`all-stable` targets), when `AWS_E2E_ROLE_ARN` is set and the run is one of:

- a push to `main` that changes e2e-relevant code (`e2e-changed`),
- a manual `workflow_dispatch` of `build.yml`,
- a same-repo PR labeled `🧪 pr/e2e-full`.

The job is part of the quality gate, so a failing AWS run blocks `publish`. To
switch it off quickly, run
`gh variable delete AWS_E2E_ROLE_ARN --repo winglang/wing`.

`tf-azure` and `tf-gcp` run only from `sdk-spec-test.yml`'s own manual and
release triggers, and their accounts are gone too
([#7270](https://github.com/winglang/wing/issues/7270)).

## Security design

**Trust.** The role can be assumed only with `sts:AssumeRoleWithWebIdentity`
from the GitHub OIDC provider. Both claims must match exactly:
`aud = sts.amazonaws.com` and
`sub = repo:winglang/wing:environment:aws-e2e`. Branch, PR, and fork subjects
don't match, and neither does any other repo. Sessions last up to 4h. The
spec-test job times out at 3h, so its credentials never expire in the middle of
a `terraform destroy`.

**Permissions** (`<role>-permissions`). The role gets the services the tf-aws
SDK deploys, not `AdministratorAccess`:

- **Full access:** Lambda, S3, DynamoDB, SQS, SNS, API Gateway, EventBridge,
  CloudWatch Logs, Secrets Manager, CloudFront, ECR, ECS.
- **EC2:** VPC networking only (VPC, subnets, gateways, routes, EIPs, security
  groups, ENIs). The role can't launch instances.
- **IAM:** read-only, plus management of execution roles. Terraform names
  these roles `terraform-<timestamp>`, so they can't be scoped by prefix.
  - Attaching policies is limited to AWS `service-role/*` managed policies.
  - `iam:PassRole` is limited to `lambda.amazonaws.com` and
    `ecs-tasks.amazonaws.com`.

**Guardrails** (`<role>-guardrails`, explicit denies that win over any
allow):

- Organizations, account, billing, cost, and budget APIs.
- Creating IAM users, access keys, or login profiles.
- Creating or changing managed policies, or touching OIDC/SAML providers.
- Stopping or deleting CloudTrail trails.
- Any change to the CI role itself, its two policies, or the OIDC provider.

**Known gap.** Wing's tf-aws target doesn't set permissions boundaries on the
execution roles it creates, so CI can't be forced to use one. A malicious
workflow with write access could still put a broad inline policy on a role it
creates and use that role through a Lambda. The guardrails make this harder
but can't fully close it. The account is disposable, and only repo writers can
get credentials. If the account is in an AWS Organization, an SCP is the
airtight fix.

## Leaked resources

`wing test` destroys what it deploys. A cancelled or timed-out job skips
that step. Many Wing names are deterministic (`<name>-c8xxxxxx`), so a leaked
function, log group, table, or origin access control would break the next run
with "already exists".

[`periodic-aws-clean.yml`](../workflows/periodic-aws-clean.yml) runs every 6
hours as the same role and deletes resources that meet all of these
conditions:

- the name matches what Wing or Terraform generates: `-c8xxxxxx` hashes, or
  `terraform-<26 digits>` for roles and rules,
- the resource is older than 4h, which is longer than the 3h job timeout, so a
  live run is never touched,
- the caller is the role named in `AWS_E2E_ROLE_ARN`.

It covers these resource types:

- Lambda functions and their log groups
- API Gateway REST APIs
- EventBridge rules
- SQS queues
- DynamoDB tables
- S3 buckets (emptied first)
- IAM roles
- CloudFront distributions, disabled first and then deleted on a later run,
  together with their origin access controls

A manual dispatch defaults to `dry_run=true`.
