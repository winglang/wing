import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { cloud, simulator, std } from "@winglang/sdk";
import * as awscdk from "../src";
import { mkdtemp } from "@winglang/sdk/test/util";
import { awscdkSanitize } from "./util";

const CDK_APP_OPTS = {
  stackName: "my-project",
  entrypointDir: __dirname,
};

const INFLIGHT_CODE = `async handle(name) { console.log("Hello, " + name); }`;

test("basic function", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const inflight = simulator.Testing.makeHandler(INFLIGHT_CODE);
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::Lambda::Function",
    Match.objectLike({
      Handler: "index.handler",
      Runtime: "nodejs20.x",
      Timeout: 60,
    })
  );
  expect(
    Object.keys(template.findResources("Custom::LogRetention")).length,
    "should have LogRetention"
  ).toEqual(1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("basic function with environment variables", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const inflight = simulator.Testing.makeHandler(INFLIGHT_CODE);
  const f = new cloud.Function(app, "Function", inflight, {
    env: {
      FOO: "BAR",
    },
  });
  f.addEnvironment("BOOM", "BAM");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::Lambda::Function",
    Match.objectLike({
      Handler: "index.handler",
      Runtime: "nodejs20.x",
      Timeout: 60,
      Environment: {
        Variables: {
          BOOM: "BAM",
          FOO: "BAR",
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("basic function with timeout explicitly set", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const inflight = simulator.Testing.makeHandler(INFLIGHT_CODE);
  new cloud.Function(app, "Function", inflight, {
    timeout: std.Duration.fromMinutes(5),
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::Lambda::Function",
    Match.objectLike({
      Handler: "index.handler",
      Runtime: "nodejs20.x",
      Timeout: 300,
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("basic function with memory size specified", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const inflight = simulator.Testing.makeHandler(INFLIGHT_CODE);
  new cloud.Function(app, "Function", inflight, { memory: 512 });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::Lambda::Function",
    Match.objectLike({
      Handler: "index.handler",
      Runtime: "nodejs20.x",
      MemorySize: 512,
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("basic function with custom log retention", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const inflight = simulator.Testing.makeHandler(INFLIGHT_CODE);
  new cloud.Function(app, "Function", inflight, { logRetentionDays: 7 });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(
    Object.keys(template.findResources("Custom::LogRetention")).length,
    "should have LogRetention"
  ).toEqual(1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("basic function with infinite log retention", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const inflight = simulator.Testing.makeHandler(INFLIGHT_CODE);
  new cloud.Function(app, "Function", inflight, { logRetentionDays: -1 });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(
    Object.keys(template.findResources("Custom::LogRetention")).length,
    "should NOT have LogRetention"
  ).toEqual(0);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
