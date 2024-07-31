import { basename, join } from "path";
import { Construct } from "constructs";
import { test, expect } from "vitest";
import { simulatorJsonOf } from "./util";
import { Bucket } from "../../src/cloud";
import { ClassFactory, inflight } from "../../src/core";
import { Test } from "../../src/std";
import { App } from "../../src/target-sim/app";
import { Platform } from "../../src/target-sim/platform";
import { SimApp } from "../sim-app";
import { mkdtemp } from "../util";

const TEST_CODE = inflight(async () => {
  console.log("this test should pass!");
});

test("app name can be customized", () => {
  // GIVEN
  const APP_NAME = "my-app";

  // WHEN
  const outdir = join(mkdtemp(), `${APP_NAME}.wsim`);
  const platform = new Platform();
  const classFactory = new ClassFactory(
    [platform.newInstance.bind(platform)],
    [platform.resolveType.bind(platform)]
  );
  const app = new App({
    outdir,
    name: APP_NAME,
    entrypointDir: __dirname,
    classFactory,
  });
  new Bucket(app, "my_bucket");
  const simfile = app.synth();

  // THEN
  expect(basename(simfile)).toEqual(`${APP_NAME}.wsim`);
  expect(JSON.stringify(simulatorJsonOf(simfile))).toContain("my_bucket");
});

test("tests do not synthesize functions when test mode is off", async () => {
  // GIVEN
  class Root extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);
      new Bucket(this, "my_bucket");
      new Test(this, "test:my_test1", TEST_CODE);
      new Test(this, "test:my_test2", TEST_CODE);
    }
  }
  const app = new SimApp({ isTestEnvironment: false, rootConstruct: Root });

  // WHEN
  const s = await app.startSimulator();
  const resources = s.listResources();
  await s.stop();

  // THEN
  expect(resources.sort()).toEqual([
    "root/Default/my_bucket",
    "root/Default/my_bucket/Policy",
  ]);
});

test("tests are synthesized into a single environemnt environments when test mode is on", async () => {
  // GIVEN
  class Root extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);
      new Bucket(this, "my_bucket");
      new Test(this, "test:my_test1", TEST_CODE);
      new Test(this, "test:my_test2", TEST_CODE);
    }
  }
  const app = new SimApp({ isTestEnvironment: true, rootConstruct: Root });

  // WHEN
  const s = await app.startSimulator();
  const resources = s.listResources();
  await s.stop();

  // THEN
  expect(resources.sort()).toEqual([
    "root/Default/my_bucket",
    "root/Default/my_bucket/Policy",
    "root/Default/test:my_test1/Handler",
    "root/Default/test:my_test2/Handler",
    "root/cloud.TestRunner",
  ]);
});
