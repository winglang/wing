import { test, expect } from "vitest";
import { mkdtemp, createTFAzureApp } from "../util";

test("throw error when no location provided", () => {
  // GIVEN
  const props = {
    outdir: mkdtemp(),
    location: undefined as any,
    entrypointDir: __dirname,
  };

  // THEN
  expect(() => createTFAzureApp(props)).toThrow(
    /Location must be specified in the AZURE_LOCATION environment variable/
  );
});

test("can read location from environment variable", () => {
  // GIVEN
  const props = {
    outdir: mkdtemp(),
    location: undefined as any,
    entrypointDir: __dirname,
  };
  const expectedLocation = "East US";
  process.env.AZURE_LOCATION = expectedLocation;
  let app: any;

  // THEN
  expect(() => (app = createTFAzureApp(props))).not.toThrow();
  expect(app!.location).toEqual(expectedLocation);
});
