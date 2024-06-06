import { Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { std, cloud } from "@winglang/sdk";
import { sanitizeCode, awscdkSanitize, AwsCdkApp } from "./util";
import { inflight } from "@winglang/sdk/lib/core";

test("default queue behavior", () => {
  // GIVEN
  const app = new AwsCdkApp();
  new cloud.Queue(app, "Queue");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("queue with custom timeout", () => {
  // GIVEN
  const app = new AwsCdkApp();
  new cloud.Queue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("queue with custom retention", () => {
  // GIVEN
  const app = new AwsCdkApp();
  new cloud.Queue(app, "Queue", {
    retentionPeriod: std.Duration.fromMinutes(30),
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("queue with a consumer function", () => {
  // GIVEN
  const app = new AwsCdkApp();
  const queue = new cloud.Queue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
  });
  const processor = inflight(async (_, event) => {
    console.log("Received " + event.name);
  });
  const processorFn = queue.setConsumer(processor);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(processorFn._toInflight())).toMatchSnapshot();

  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::SQS::Queue", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.resourceCountIs("AWS::IAM::Role", 1);
  template.resourceCountIs("AWS::IAM::Policy", 1);
  template.resourceCountIs("AWS::Lambda::EventSourceMapping", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
