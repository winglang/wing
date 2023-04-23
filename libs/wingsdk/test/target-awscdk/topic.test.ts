import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { Topic } from "../../src/cloud";
import * as std from "../../src/std";
import * as awscdk from "../../src/target-awscdk";
import { Testing } from "../../src/testing";
import { mkdtemp, sanitizeCode } from "../../src/util";

const CDK_APP_OPTS = {
  stackName: "my-project",
};

test("default topic behavior", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Topic._newTopic(app, "Topic");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(template.toJSON()).toMatchSnapshot();
});

test("topic with subscriber function", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const topic = Topic._newTopic(app, "Topic");
  const subscriber = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { console.log("Received: ", event); }`
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
  expect(template.toJSON()).toMatchSnapshot();
});

test("topic with multiple subscribers", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const topic = Topic._newTopic(app, "Topic");
  const subOne = Testing.makeHandler(
    app,
    "Handler1",
    `async handle(event) { console.log("Got Event: ", event); }`
  );
  const subTwo = Testing.makeHandler(
    app,
    "Handler2",
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
  expect(template.toJSON()).toMatchSnapshot();
});
