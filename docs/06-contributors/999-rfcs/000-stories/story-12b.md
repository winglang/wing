# User Story 12b - bring jsii in preflight

> **Status**: Expected released on 2023/02/02

We want to be able to bring a jsii module into wing, this story focuses on the smallest step,
bringing the code so it can be used in preflight.

Here is the expected test that should work in the end of this sprint:

```ts (wing)
// Prerequisite
// npm install --save cdk-constants

bring cloud;
bring "cdk-constants" as cdk_constants;

// capture jsii data in preflight
let text_from_jsii = cdk_constants.ManagedPolicies.AWS_LAMBDA_BASIC_EXECUTION_ROLE;

new cloud.Function(inflight (s: str): str => {
  assert("service-role/AWSLambdaBasicExecutionRole" == text_from_jsii);
}) as "test:able to capture jsii in preflight";

```