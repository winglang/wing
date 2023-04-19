import * as os from "os";
import * as path from "path";
import * as fs from "fs-extra";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { SimApp } from "../sim-app";

const secretsFile = path.join(os.homedir(), ".wing", "secrets.json");

test("create a secret", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Secret._newSecret(app, "my_secret", {
    name: "wing-sim-test-my-secret",
  });

  await fs.ensureFile(secretsFile);

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

test("can get the secret value", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Secret._newSecret(app, "my_secret", {
    name: "wing-sim-test-my-secret",
  });

  await fs.ensureFile(path.join(os.homedir(), ".wing", "secrets.json"));
  const secretsContent = await fs.readFile(
    path.join(os.homedir(), ".wing", "secrets.json"),
    "utf-8"
  );

  const secrets = tryParse(secretsContent) ?? {};
  await fs.writeFile(
    secretsFile,
    JSON.stringify({
      ...secrets,
      "wing-sim-test-my-secret": "secret-value",
    })
  );

  const s = await app.startSimulator();
  const secretClient = s.getResource("/my_secret") as cloud.ISecretClient;

  // THEN
  const secretValue = await secretClient.value();
  expect(secretValue).toBe("secret-value");
  await s.stop();
});

function tryParse(content: string): string | undefined {
  try {
    const parsed = JSON.parse(content);
    return parsed;
  } catch (err) {
    return undefined;
  }
}
