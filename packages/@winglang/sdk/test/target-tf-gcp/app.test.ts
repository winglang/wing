import { test, expect } from "vitest";
import { GcpApp } from "./gcp-util";
import * as tfgcp from "../../src/target-tf-gcp";

test("throw error when no projectId provided", () => {
  // GIVEN
  const props = {
    projectId: undefined as any,
  };

  // THEN
  expect(() => new GcpApp(props)).toThrow(
    /A Google Cloud project ID must be specified/
  );
});

test("can read projectId from environment variable", () => {
  // GIVEN
  const props = {
    projectId: undefined as any,
  };
  const projectId = "my-project";
  process.env.GOOGLE_PROJECT_ID = projectId;
  let app: tfgcp.App;

  // THEN
  expect(() => (app = new GcpApp(props))).not.toThrow();
  expect(app!.projectId).toEqual(projectId);
});

test("throw error when no region provided", () => {
  // GIVEN
  const props = {
    region: undefined as any,
  };

  // THEN
  expect(() => new GcpApp(props)).toThrow(
    /A Google Cloud region must be specified/
  );
});

test("can read region from environment variable", () => {
  // GIVEN
  const props = {
    region: undefined as any,
  };
  const region = "us-central1";
  process.env.GOOGLE_REGION = region;
  let app: GcpApp;

  // THEN
  expect(() => (app = new GcpApp(props))).not.toThrow();
  expect(app!.region).toEqual(region);
});
