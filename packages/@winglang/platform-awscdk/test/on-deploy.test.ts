import { Match, Template } from "aws-cdk-lib/assertions";
import { expect, test } from "vitest";
import { cloud } from "@winglang/sdk";
import { AwsCdkApp, awscdkSanitize } from "./util";
import { inflight } from "@winglang/sdk/lib/core";

const INFLIGHT_CODE = inflight(async (_, name) =>
  console.log("Hello, " + name)
);

test("create an OnDeploy", () => {
  // GIVEN
  const app = new AwsCdkApp();

  new cloud.OnDeploy(app, "my_on_deploy", INFLIGHT_CODE);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("Custom::Trigger", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("execute OnDeploy after other resources", () => {
  // GIVEN
  const app = new AwsCdkApp();
  const bucket = new cloud.Bucket(app, "my_bucket");
  new cloud.OnDeploy(app, "my_on_deploy", INFLIGHT_CODE, {
    executeAfter: [bucket],
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("Custom::Trigger", 1);
  template.hasResource("Custom::Trigger", {
    DependsOn: Match.anyValue(),
  });
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("execute OnDeploy before other resources", () => {
  // GIVEN
  const app = new AwsCdkApp();
  const bucket = new cloud.Bucket(app, "my_bucket");
  new cloud.OnDeploy(app, "my_on_deploy", INFLIGHT_CODE, {
    executeBefore: [bucket],
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("Custom::Trigger", 1);
  template.hasResource("AWS::S3::Bucket", {
    DependsOn: Match.anyValue(),
  });
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
