import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { Function } from "../../src/cloud";
import { Duration } from "../../src/std";
import * as awscdk from "../../src/target-awscdk";
import { Testing } from "../../src/testing";
import { mkdtemp } from "../util";

const CDK_APP_OPTS = {
  stackName: "my-project",
};

const INFLIGHT_CODE = `async handle(name) { console.log("Hello, " + name); }`;

test("basic function", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::Lambda::Function",
    Match.objectLike({
      Handler: "index.handler",
      Runtime: "nodejs18.x",
      Timeout: 30,
    })
  );
  expect(template.toJSON()).toMatchSnapshot();
});

test("basic function with environment variables", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const f = Function._newFunction(app, "Function", inflight, {
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
      Runtime: "nodejs18.x",
      Timeout: 30,
      Environment: {
        Variables: {
          BOOM: "BAM",
          FOO: "BAR",
        },
      },
    })
  );
  expect(template.toJSON()).toMatchSnapshot();
});

test("basic function with timeout explicitly set", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  Function._newFunction(app, "Function", inflight, {
    timeout: Duration.fromMinutes(5),
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::Lambda::Function",
    Match.objectLike({
      Handler: "index.handler",
      Runtime: "nodejs18.x",
      Timeout: 300,
    })
  );
  expect(template.toJSON()).toMatchSnapshot();
});
