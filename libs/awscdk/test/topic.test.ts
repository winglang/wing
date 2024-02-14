import { Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { cloud, simulator } from "@winglang/sdk";
import * as awscdk from "../src";
import { mkdtemp } from "@winglang/sdk/test/util";
import { sanitizeCode, awscdkSanitize } from "./util";

const CDK_APP_OPTS = {
  stackName: "my-project",
  entrypointDir: __dirname,
};

test("default topic behavior", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  new cloud.Topic(app, "Topic");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("topic with subscriber function", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const topic = new cloud.Topic(app, "Topic");
  const subscriber = simulator.Testing.makeHandler(`async handle(event) { console.log("Received: ", event); }`
  );
  topic.onMessage(subscriber);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(subscriber._toInflight())).toMatchSnapshot();
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::SNS::Topic", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.resourceCountIs("AWS::Lambda::Permission", 1);
  template.resourceCountIs("AWS::IAM::Role", 1);
  template.resourceCountIs("AWS::SNS::Subscription", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("topic with multiple subscribers", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const topic = new cloud.Topic(app, "Topic");
  const subOne = simulator.Testing.makeHandler(
    `async handle(event) { console.log("Got Event: ", event); }`
  );
  const subTwo = simulator.Testing.makeHandler(
    `async handle(event) { console.log("Ohh yea!! ", event); }`
  );

  // WHEN
  topic.onMessage(subOne);
  topic.onMessage(subTwo);

  const output = app.synth();

  // THEN
  expect(sanitizeCode(subOne._toInflight())).toMatchSnapshot();
  expect(sanitizeCode(subTwo._toInflight())).toMatchSnapshot();

  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::SNS::Topic", 1);
  template.resourceCountIs("AWS::Lambda::Function", 2);
  template.resourceCountIs("AWS::Lambda::Permission", 2);
  template.resourceCountIs("AWS::IAM::Role", 2);
  template.resourceCountIs("AWS::SNS::Subscription", 2);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
