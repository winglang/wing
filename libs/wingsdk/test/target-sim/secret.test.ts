import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as testing from "../../src/testing";

test("create a secret", async () => {
  // GIVEN
  const app = new testing.SimApp();
  cloud.Secret._newSecret(app, "my_secret");
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_secret")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_secret",
    props: {
      secretValue: '{"secret":"value"}',
    },
    type: "wingsdk.cloud.Secret",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});
