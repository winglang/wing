import { existsSync, readdirSync } from "fs";
import { test, expect } from "vitest";
import { AwsApp } from "./aws-util";
import { Function } from "../../src/cloud";
import { inflight } from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";

test("artifacts are located in app root level outdir", () => {
  // GIVEN
  const app = new AwsApp();
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
  const app = new AwsApp();
  new tfaws.Bucket(app, "Bucket", {});
  const expectedCdktfJson = `${app.outdir}/main.tf.json`;
  const expectedAssetsDir = `${app.outdir}/assets`;

  // WHEN
  app.synth();

  // THEN
  expect(existsSync(expectedCdktfJson)).toBe(true);
  expect(existsSync(expectedAssetsDir)).toBe(false);
});
