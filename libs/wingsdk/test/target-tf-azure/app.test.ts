import { test, expect } from "vitest";
import * as tfazure from "../../src/target-tf-azure";
import { mkdtemp } from "../util";

test("throw error when no location provided", () => {
  delete process.env.AZURE_LOCATION;

  // GIVEN
  const props = {
    outdir: mkdtemp(),
    location: undefined as any,
    entrypointDir: __dirname,
  };

  // THEN
  expect(() => new tfazure.App(props)).toThrow(
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
  let app: tfazure.App;

  // THEN
  expect(() => (app = new tfazure.App(props))).not.toThrow();
  expect(app!.location).toEqual(expectedLocation);
});
