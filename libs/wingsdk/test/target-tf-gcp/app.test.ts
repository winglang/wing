import { test, expect } from "vitest";
import * as tfgcp from "../../src/target-tf-gcp";
import { mkdtemp } from "../util";

test("throw error when no projectId provided", () => {
  // GIVEN
  const props = {
    outdir: mkdtemp(),
    projectId: undefined as any,
    storageLocation: "US",
    region: "us-central1",
    entrypointDir: __dirname,
  };

  // THEN
  expect(() => new tfgcp.App(props)).toThrow(
    /A Google Cloud project ID must be specified/,
  );
});

test("can read projectId from environment variable", () => {
  // GIVEN
  const props = {
    outdir: mkdtemp(),
    projectId: undefined as any,
    storageLocation: "US",
    region: "us-central1",
    entrypointDir: __dirname,
  };
  const projectId = "my-project";
  process.env.GOOGLE_PROJECT_ID = projectId;
  let app: tfgcp.App;

  // THEN
  expect(() => (app = new tfgcp.App(props))).not.toThrow();
  expect(app!.projectId).toEqual(projectId);
});

test("throw error when no region provided", () => {
  // GIVEN
  const props = {
    outdir: mkdtemp(),
    projectId: "projectId",
    storageLocation: undefined as any,
    region: undefined as any,
    entrypointDir: __dirname,
  };

  // THEN
  expect(() => new tfgcp.App(props)).toThrow(
    /A Google Cloud region must be specified/,
  );
});

test("can read region from environment variable", () => {
  // GIVEN
  const props = {
    outdir: mkdtemp(),
    projectId: "projectId",
    storageLocation: undefined as any,
    region: undefined as any,
    entrypointDir: __dirname,
  };
  const region = "us-central1";
  process.env.GOOGLE_REGION = region;
  let app: tfgcp.App;

  // THEN
  expect(() => (app = new tfgcp.App(props))).not.toThrow();
  expect(app!.region).toEqual(region);
});
