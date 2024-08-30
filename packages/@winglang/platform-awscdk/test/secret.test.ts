import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { cloud } from "@winglang/sdk";
import * as awscdk from "../src";
import { AwsCdkApp } from "./util";

test("default secret behavior", () => {
  // GIVEN
  const app = new AwsCdkApp();
  new cloud.Secret(app, "Secret");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(template.toJSON().Resources).toMatchSnapshot();
  expect(template.toJSON().Outputs).toMatchSnapshot();
});

test("secret with a name", () => {
  // GIVEN
  const app = new AwsCdkApp();
  const secret = new cloud.Secret(app, "Secret", {
    name: "my-secret",
  }) as awscdk.Secret;

  // THEN
  expect(Stack.of(secret).resolve(secret.arn)).toEqual({
    "Fn::Join": [
      "",
      [
        "arn:",
        { Ref: "AWS::Partition" },
        ":secretsmanager:",
        { Ref: "AWS::Region" },
        ":",
        { Ref: "AWS::AccountId" },
        ":secret:my-secret",
      ],
    ],
  });
});
