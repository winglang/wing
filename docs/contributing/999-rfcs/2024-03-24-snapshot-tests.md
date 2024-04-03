---
title: "#5958 Cloud Snapshot Tests"
description: Spec and design for adding cloud snapshots to the Wing test framework
---

# Cloud Snapshot Tests

- **Author(s)**: @eladb
- **Submission Date**: 2024-03-24
- **Stage**: Approved
- **Stage Date**: 2024-04-03

## Requirements

We would like to be able to capture a snapshot of the synthesized output when compiling to cloud
targets, and use it to protect against regressions in CI, without having to deploy to the cloud.

For example, let's say I am creating a Wing library with a resource that supports both `sim` and
`tf-aws`. I am writing a bunch of tests for it. 

I can run these tests in the simulator (`wing test`) and can also run them on AWS through `wing test
-t tf-aws`.

As my code **or its dependencies** are updated, I'd like to continuously run all these tests to make
sure my library is not broken. Running the tests against `sim` is easy (I can just run `wing test`
in my CI build environment), but it's not realistic to run all these tests against the real cloud
target, given it could take a very long time and could also be very expensive.

In some scenarios (such as the Wing SDK tests), users will prefer to setup a continuous integration
workflow and run tests in the cloud, but for the most part running all my tests on the cloud for
every commit is too expensive and requires a complicated setup (i.e. an AWS account), so I'd like to
use a more lightweight approach...

> NOTE: This is not https://github.com/winglang/wing/issues/1214 (which is about using snapshots for
> assertions).

## Design

We propose to add a feature to `wing test` which will capture a snapshot of the synthesized output
of every `.test.w` file and store them in the repository.

> This is a similar approach used successfully and scalably in the AWS CDK. See
> [docs](https://github.com/aws/aws-cdk/blob/main/INTEGRATION_TESTS.md) for details. The main
> difference is that `cdk-integ` there was no way to add assertions to tests, so this is so much
> cooler.

When I run `wing test -t tf-aws foo.test.w` in my dev environment, if the test succeeds (e.g.
deploys and all test cases pass), the test framework will create `foo.test.w.tfaws.snap` which will
include a nicely formatted (markdown?) snapshot of all the synthesis output from this test.

> In a future version we can add support for placing all snapshots in an adjacent subdirectory.

Now, when `wing test -t tf-aws foo.test.w` is executed in CI (`CI=1`), by default it won't actually
go and deploy to the cloud. Instead, it will just synthesize the output and compare it to the
committed `.snap` file. If the output is not the same, the test will fail with a nice diff
indicating that there was an unexpected regression.

The `--snapshots` or `-s` switch can be used to control behavior:

 * `--snapshots=auto` - auto-detect based on CI flag (described above)
 * `--snapshots=never` - disables snapshots altogether
 * `--snapshots=update` - skips deployment and only update the snapshots.
 * `--snapshots=deploy` - forces a deployment even if `CI=1`.
 * `--snapshots=assert` - only asserts that the snapshots have not changed

## Implementation Notes

* We need to decide if we want the inflight JavaScript code to also be included or just trust the
  fact that if inflight code has changed, it should be reflected somehow in the asset names
  referenced from the IAC model.
* Ideally this shouldn't be Terraform-specific. `app.synth()` should return something that can be
  used to capture the snapshots.
* The output will need to be sanitized somehow so that it will be deterministic (e.g. paths should
  not be included).

