import { test, expect } from "vitest";
import { AzureApp } from "./azure-util";
import * as tfazure from "../../src/target-tf-azure";

test("throw error when no location provided", () => {
  // GIVEN
  // THEN
  expect(() => new AzureApp({ location: undefined as any })).toThrow(
    /Location must be specified in the AZURE_LOCATION environment variable/
  );
});

test("can read location from environment variable", () => {
  // GIVEN
  const expectedLocation = "East US";
  process.env.AZURE_LOCATION = expectedLocation;
  let app: tfazure.App;

  // THEN
  expect(
    () => (app = new AzureApp({ location: undefined as any }))
  ).not.toThrow();
  expect(app!.location).toEqual(expectedLocation);
});
