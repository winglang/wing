import { Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { cloud } from "@winglang/sdk";
import { AwsCdkApp } from "./util";
import { inflight } from "@winglang/sdk/lib/core";

const INFLIGHT_CODE = inflight(async (_, name) => {
  console.log("Hello " + name);
});

test("multiple services", () => {
  // GIVEN
  const app = new AwsCdkApp();

  new cloud.Service(app, "Service1", INFLIGHT_CODE);
  new cloud.Service(app, "Service2", INFLIGHT_CODE);

  // WHEN
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  // Only one cluster should be created (all services share the same cluster)
  template.resourceCountIs("AWS::ECS::Cluster", 1);
  template.resourceCountIs("AWS::ECS::Service", 2);
  template.resourceCountIs("AWS::ECS::TaskDefinition", 2);
  template.resourceCountIs("AWS::Logs::LogGroup", 2);

  expect(template.toJSON().Resources).toMatchSnapshot();
});
