import * as os from "os";
import * as path from "path";
import * as fs from "fs-extra";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { SimApp } from "../sim-app";

test("create a secret", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Secret._newSecret(app, "my_secret", {
    name: "my-secret",
  });

  fs.ensureFileSync(path.join(os.homedir(), ".wing", "secrets.json"));

  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_secret")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_secret",
    props: {
      name: "my-secret",
    },
    type: "wingsdk.cloud.Secret",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});
