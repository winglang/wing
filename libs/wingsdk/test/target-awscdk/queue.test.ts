import { Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { Queue } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import * as std from "../../src/std";
import * as awscdk from "../../src/target-awscdk";
import { mkdtemp, sanitizeCode, awscdkSanitize } from "../util";

const CDK_APP_OPTS = {
  stackName: "my-project",
  entrypointDir: __dirname,
};

test("default queue behavior", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Queue._newQueue(app, "Queue");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("queue with custom timeout", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Queue._newQueue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("queue with custom retention", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Queue._newQueue(app, "Queue", {
    retentionPeriod: std.Duration.fromMinutes(30),
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("queue with a consumer function", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const queue = Queue._newQueue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
  });
  const processor = Testing.makeHandler(
    app,
    "Handler",
    `\
async handle(event) {
  console.log("Received " + event.name);
}`
  );
  const processorFn = queue.setConsumer(processor);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(processorFn._toInflight())).toMatchSnapshot();

  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::SQS::Queue", 1);
  template.resourceCountIs("AWS::Lambda::Function", 2);
  template.resourceCountIs("AWS::IAM::Role", 2);
  template.resourceCountIs("AWS::IAM::Policy", 2);
  template.resourceCountIs("AWS::Lambda::EventSourceMapping", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
