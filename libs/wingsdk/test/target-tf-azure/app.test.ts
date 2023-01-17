import * as tfazure from "../../src/target-tf-azure";
import { mkdtemp } from "../../src/util";

test("throw error when no location provided", () => {
  // GIVEN
  const props = { outdir: mkdtemp(), location: undefined as any }

  // THEN
  expect(() => new tfazure.App(props)).toThrow(Error);
});

test("can read location from environment variable", () => {
  // GIVEN
  const props = { outdir: mkdtemp(), location: undefined as any }
  const expectedLocation = "East US";
  process.env.AZURE_LOCATION = expectedLocation;
  let app: tfazure.App;

  // THEN
  expect(() => app = new tfazure.App(props)).not.toThrow(Error);
  expect(app!.location).toEqual(expectedLocation);
})
