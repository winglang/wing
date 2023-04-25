import { CfnOutput, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { Secret } from "../../src/cloud";
import * as awscdk from "../../src/target-awscdk";
import { mkdtemp } from "../../src/util";

const CDK_APP_OPTS = {
  stackName: "my-project",
};

test("default secret behavior", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Secret._newSecret(app, "Secret");
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  expect(template.toJSON().Resources).toMatchSnapshot();
  expect(template.toJSON().Outputs).toMatchSnapshot();
});

test("secret with a name", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const secret = Secret._newSecret(app, "Secret", {
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
