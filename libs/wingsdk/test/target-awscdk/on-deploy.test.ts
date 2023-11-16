import { Match, Template } from "aws-cdk-lib/assertions";
import { expect, test } from "vitest";
import { Bucket, OnDeploy } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import * as awscdk from "../../src/target-awscdk";
import { awscdkSanitize, mkdtemp } from "../util";

const CDK_APP_OPTS = {
  stackName: "my-project",
};

const INFLIGHT_CODE = `async handle(name) { console.log("Hello, " + name); }`;

test("create an OnDeploy", () => {
  // GIVEN
  const app = new awscdk.App({
    outdir: mkdtemp(),
    entrypointDir: __dirname,
    ...CDK_APP_OPTS,
  });
  const handler = Testing.makeHandler(app, INFLIGHT_CODE);
  new OnDeploy(app, "my_on_deploy", handler);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("Custom::Trigger", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("execute OnDeploy after other resources", () => {
  // GIVEN
  const app = new awscdk.App({
    outdir: mkdtemp(),
    entrypointDir: __dirname,
    ...CDK_APP_OPTS,
  });
  const bucket = new Bucket(app, "my_bucket");
  const handler = Testing.makeHandler(app, INFLIGHT_CODE);
  new OnDeploy(app, "my_on_deploy", handler, {
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
  const app = new awscdk.App({
    outdir: mkdtemp(),
    entrypointDir: __dirname,
    ...CDK_APP_OPTS,
  });
  const bucket = new Bucket(app, "my_bucket");
  const handler = Testing.makeHandler(app, INFLIGHT_CODE);
  new OnDeploy(app, "my_on_deploy", handler, {
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
