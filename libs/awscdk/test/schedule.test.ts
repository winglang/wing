import { Match, Template, MatchResult } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { simulator, cloud, std } from "@winglang/sdk";
import * as awscdk from "../src";
import { mkdtemp } from "@winglang/sdk/test/util";
import { awscdkSanitize, CDK_APP_OPTS } from "./util";

test("schedule behavior with rate", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const fn = simulator.Testing.makeHandler(
    `async handle(event) { console.log("Received: ", event); }`
  );
  const schedule = new cloud.Schedule(app, "Schedule", {
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
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("schedule behavior with cron", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const fn = simulator.Testing.makeHandler(
    `async handle(event) { console.log("Received: ", event); }`
  );
  const schedule = new cloud.Schedule(app, "Schedule", {
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
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("schedule with two functions", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const fn = simulator.Testing.makeHandler(
    `async handle(event) { console.log("Received: ", event); }`
  );
  const schedule = new cloud.Schedule(app, "Schedule", {
    cron: "0/1 * ? * *",
  });
  schedule.onTick(fn);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::Events::Rule", {
    Targets: Match.arrayWith([
      Match.objectLike({
        Id: "Target0",
      }),
    ]),
  });
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("schedule with rate and cron simultaneously", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });

  // THEN
  expect(
    () =>
      new cloud.Schedule(app, "Schedule", {
        rate: std.Duration.fromSeconds(30),
        cron: "0/1 * ? * *",
      })
  ).toThrow("rate and cron cannot be configured simultaneously.");
});

test("cron with more than five values", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });

  // THEN
  expect(
    () =>
      new cloud.Schedule(app, "Schedule", {
        cron: "0/1 * ? * * *",
      })
  ).toThrow(
    "cron string must be UNIX cron format [minute] [hour] [day of month] [month] [day of week]"
  );
});

test("schedule without rate or cron", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });

  // THEN
  expect(() => new cloud.Schedule(app, "Schedule")).toThrow(
    "rate or cron need to be filled."
  );
});

test("schedule with rate less than 1 minute", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });

  // THEN
  expect(
    () =>
      new cloud.Schedule(app, "Schedule", {
        rate: std.Duration.fromSeconds(30),
      })
  ).toThrow("rate can not be set to less than 1 minute.");
});

test("cron with Day-of-month and Day-of-week setting with *", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });

  // THEN
  expect(
    () =>
      new cloud.Schedule(app, "Schedule", {
        cron: "0/1 * * * *",
      })
  ).toThrow(
    "cannot use * in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other"
  );
});
