import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { cloud, simulator, std } from "@winglang/sdk";
import * as awscdk from "../src";
import { mkdtemp } from "@winglang/sdk/test/util";
import { awscdkSanitize, CDK_APP_OPTS } from "./util";
import { inflight } from "@winglang/sdk/lib/core";


const INFLIGHT_CODE = inflight(async (_, name) => console.log("Hello, " + name));

test("basic function", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  new cloud.Function(app, "Function", INFLIGHT_CODE);
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
  template.resourceCountIs("AWS::Logs::LogGroup", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("basic function with environment variables", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const f = new cloud.Function(app, "Function", INFLIGHT_CODE, {
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
  new cloud.Function(app, "Function", INFLIGHT_CODE, {
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
  new cloud.Function(app, "Function", INFLIGHT_CODE, { memory: 512 });
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

test("basic function with standard log retention", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  new cloud.Function(app, "Function", INFLIGHT_CODE);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::Logs::LogGroup", 1);
  template.hasResourceProperties(
    "AWS::Logs::LogGroup",
    Match.objectEquals({
      RetentionInDays: 30
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("basic function with custom log retention", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  new cloud.Function(app, "Function", INFLIGHT_CODE, { logRetentionDays: 7 });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::Logs::LogGroup", 1);
  template.hasResourceProperties(
    "AWS::Logs::LogGroup",
    Match.objectEquals({
      RetentionInDays: 7
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("basic function with infinite log retention", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  new cloud.Function(app, "Function", INFLIGHT_CODE, { logRetentionDays: -1 });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::Logs::LogGroup", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("source map setting", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const f = new cloud.Function(app, "Function", INFLIGHT_CODE);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::Lambda::Function",
    Match.objectLike({
      Environment: {
        Variables: {
          NODE_OPTIONS: "--enable-source-maps",
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
})