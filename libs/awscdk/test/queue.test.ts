import { Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { std, simulator, cloud } from "@winglang/sdk";
import { mkdtemp } from "@winglang/sdk/test/util";
import { sanitizeCode, awscdkSanitize, createApp } from "./util";

const CDK_APP_OPTS = {
  stackName: "my-project",
  entrypointDir: __dirname,
};

test("default queue behavior", () => {
  // GIVEN
  const app = createApp({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  new cloud.Queue(app, "Queue");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("queue with custom timeout", () => {
  // GIVEN
  const app = createApp({ outdir: mkdtemp(), ...CDK_APP_OPTS });
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
  const app = createApp({ outdir: mkdtemp(), ...CDK_APP_OPTS });
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
  const app = createApp({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const queue = new cloud.Queue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
  });
  const processor = simulator.Testing.makeHandler(`\
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
