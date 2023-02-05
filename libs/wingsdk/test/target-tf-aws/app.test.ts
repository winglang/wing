import { existsSync, readdirSync } from "fs";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp } from "../../src/util";

test("artifacts are located in app root level outdir", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = Testing.makeHandler(app, "Handler", "async handle() {}");
  new cloud.Function(app, "Function", inflight);
  new cloud.Function(app, "Function2", inflight);
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
  const app = new tfaws.App({ outdir: mkdtemp() });
  new tfaws.Bucket(app, "Bucket", {});
  const expectedCdktfJson = `${app.outdir}/main.tf.json`;
  const expectedAssetsDir = `${app.outdir}/assets`;

  // WHEN
  app.synth();

  // THEN
  expect(existsSync(expectedCdktfJson)).toBe(true);
  expect(existsSync(expectedAssetsDir)).toBe(false);
});
