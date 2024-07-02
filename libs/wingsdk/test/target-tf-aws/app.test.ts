import { existsSync, readdirSync } from "fs";
import { Construct } from "constructs";
import { test, expect } from "vitest";
import { Bucket, Function } from "../../src/cloud";
import { inflight } from "../../src/core";
import { Node } from "../../src/std";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp } from "../util";

test("artifacts are located in app root level outdir", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const handler = inflight(async () => {});
  new Function(app, "Function", handler);
  new Function(app, "Function2", handler);
  const expectedCdktfJson = `${app.outdir}/main.tf.json`;
  const expectedAssetsDir = `${app.outdir}/assets`;
  const expectedAssetCount = 2; // 2 functions = 2 assets

  // WHEN
  app.synth();

  // THEN
  expect(existsSync(expectedCdktfJson)).toBe(true);
  expect(existsSync(expectedAssetsDir)).toBe(true);
  expect(readdirSync(expectedAssetsDir).length).toBe(expectedAssetCount);
});

test("no assets folder exists if app does synthesize asset producing resources", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  new tfaws.Bucket(app, "Bucket", {});
  const expectedCdktfJson = `${app.outdir}/main.tf.json`;
  const expectedAssetsDir = `${app.outdir}/assets`;

  // WHEN
  app.synth();

  // THEN
  expect(existsSync(expectedCdktfJson)).toBe(true);
  expect(existsSync(expectedAssetsDir)).toBe(false);
});

test("rootId can be used to control the root id", () => {
  class MyApp extends Construct {
    public readonly bucket: Bucket;
    constructor(scope: Construct, id: string) {
      super(scope, id);

      this.bucket = new Bucket(this, "Bucket");
    }
  }

  const app = new tfaws.App({
    outdir: mkdtemp(),
    entrypointDir: __dirname,
    rootId: "Bang",
    rootConstruct: MyApp,
  });

  console.log(Node.of(app).children.map((x) => x.node.id));

  expect(Node.of(app).id).toBe("Bang");
  expect(Node.of(Node.of(app).root).id).toBe("Bang");
  expect(Node.of(app)).toBe(Node.of(Node.of(app).root));
});
