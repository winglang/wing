import { test, expect } from "vitest";
import * as awscdk from "../src";
import { CDK_APP_OPTS } from "./util";
import { Stack } from "aws-cdk-lib";
import { mkdtemp } from "@winglang/sdk/test/util";
import { cloud, simulator } from "@winglang/sdk";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { inflight } from "@winglang/sdk/lib/core";

test("custom stack", async () => {
  const app = new awscdk.App({
    ...CDK_APP_OPTS,
    outdir: mkdtemp(),
    stackFactory: (app, stackName) => {
      return new Stack(app, stackName, {
        description: "This is a custom stack description"
      });
    }
  });

  const out = JSON.parse(app.synth());
  expect(out.Description, "This is a custom stack description");
});

test("custom Functions", async () => {
  const app = new awscdk.App({
    ...CDK_APP_OPTS,
    outdir: mkdtemp(),
  });

  class CustomFunction extends awscdk.Function {
    protected createFunction(code: Code, props: cloud.FunctionProps): Function {
      return new Function(this, "Function", {
        code,
        handler: "index.handler",
        runtime: Runtime.NODEJS_LATEST,
        environment: {
          BOOM: "BAR"
        }
      });
    }
  }

  new CustomFunction(app, "MyFunction", inflight(async () => {
    console.log("hello");
    return undefined;
  }));

  const cfn = JSON.parse(app.synth());

  expect(cfn.Resources.MyFunctionDBE6350A.Properties.Environment.Variables).toStrictEqual({ BOOM: 'BAR' });
});