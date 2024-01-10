import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import {
  tfResourcesOf,
  tfSanitize,
  treeJsonOf,
  mkdtemp,
  createTFAWSApp,
} from "../util";

test("default secret behavior", () => {
  // GIVEN
  const app = createTFAWSApp({ outdir: mkdtemp(), entrypointDir: __dirname });
  new cloud.Secret(app, "Secret");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_secretsmanager_secret"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("secret with a name", () => {
  // GIVEN
  const app = createTFAWSApp({ outdir: mkdtemp(), entrypointDir: __dirname });
  new cloud.Secret(app, "Secret", {
    name: "my-secret",
  });
  const output = app.synth();

  // THEN
  expect(tfSanitize(output)).toMatchSnapshot();
});
