import { test, expect } from "vitest";
import { Platform } from "../src/platform";
import { mkdtemp } from "@winglang/sdk/test/util";
import { readdirSync } from "fs";
import { Bucket } from "../src";
import { Stack } from "aws-cdk-lib";
import { PolyconFactory } from "@winglang/sdk/lib/core";

test("wing platform", async () => {
  const workdir = mkdtemp();
  const platform = new Platform();
  process.env.CDK_STACK_NAME = "MyStack";
  const factory = new PolyconFactory(
    [platform.newInstance.bind(platform)],
    [platform.typeForFqn.bind(platform)]
  );
  const app = platform.newApp?.({
    entrypointDir: workdir,
    outdir: workdir,
    polyconFactory: factory,
  });

  new Bucket(app, "bucket");

  const out = app.synth();

  expect(JSON.parse(out).Resources.bucket43879C71).toStrictEqual({
    DeletionPolicy: "Delete",
    Properties: {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: "AES256",
            },
          },
        ],
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    },
    Type: "AWS::S3::Bucket",
    UpdateReplacePolicy: "Delete",
  });

  // output directory only contains wing artifacts. cdk artifacts will be in the cdk.out directory
  // when the CDK CLI is used
  expect(readdirSync(workdir)).toStrictEqual([
    "MyStack.assets.json",
    "MyStack.template.json",
    "cdk.out",
    "connections.json",
    "manifest.json",
    "tree.json",
  ]);
});

test("CDK_STACK_NAME, CDK_AWS_ACCOUNT, CDK_AWS_REGION", async () => {
  const workdir = mkdtemp();
  const platform = new Platform();
  process.env.CDK_STACK_NAME = "YourStack";
  process.env.CDK_AWS_ACCOUNT = "123";
  process.env.CDK_AWS_REGION = "us-west-2";
  const factory = new PolyconFactory(
    [platform.newInstance.bind(platform)],
    [platform.typeForFqn.bind(platform)]
  );

  const app = platform.newApp?.({
    entrypointDir: workdir,
    outdir: workdir,
    polyconFactory: factory,
  });
  const stack = Stack.of(app);

  expect(stack.resolve(stack.region)).toStrictEqual("us-west-2");
  expect(stack.resolve(stack.stackName)).toStrictEqual("YourStack");
  expect(stack.resolve(stack.account)).toStrictEqual("123");
});
