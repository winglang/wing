import { test, expect } from "vitest";
import { mkdtemp } from "../util";
import * as awscdk from "../../src/target-awscdk";
import { Schedule } from "../../src/cloud";
import { Testing } from "../../src/testing";
import * as std from "../../src/std";
import { Match, Template, MatchResult } from "aws-cdk-lib/assertions";

const CDK_APP_OPTS = {
  stackName: "my-project",
};

test('schedule behavior with rate', () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const fn = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { console.log("Received: ", event); }`
  );
  const schedule = Schedule._newSchedule(app, "Schedule", {
    rate: std.Duration.fromMinutes(2),
  });
  schedule.onTick(fn);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::Events::Rule", 1);
  template.hasResourceProperties("AWS::Events::Rule", {
    ScheduleExpression: "rate(2 minutes)",
  });
  expect(template.toJSON()).toMatchSnapshot();
});

test("schedule behavior with cron", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const fn = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { console.log("Received: ", event); }`
  );
  const schedule = Schedule._newSchedule(app, "Schedule", {
    cron: "0/1 * ? * *",
  });
  schedule.onTick(fn);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::Events::Rule", 1);
  template.hasResourceProperties("AWS::Events::Rule", {
    ScheduleExpression: "cron(0/1 * ? * * *)",
  });
  expect(template.toJSON()).toMatchSnapshot();
});

test("schedule with two functions", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const fn = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { console.log("Received: ", event); }`
  );
  const fn2 = Testing.makeHandler(
    app,
    "Handler2",
    `async handle(event) { console.log("Received: ", event); }`
  );
  const schedule = Schedule._newSchedule(app, "Schedule", {
    cron: "0/1 * ? * *",
  });
  schedule.onTick(fn);
  schedule.onTick(fn2);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::Events::Rule", {
    Targets: MatchResult.length
  });
  expect(template.toJSON()).toMatchSnapshot();
});