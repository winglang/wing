import * as os from "os";
import * as path from "path";
import * as fs from "fs-extra";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { SimApp } from "../sim-app";

const SECRETS_FILE = path.join(os.homedir(), ".wing", "secrets.json");

test("create a secret", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Secret._newSecret(app, "my_secret");

  await fs.ensureFile(SECRETS_FILE);

  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_secret")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_secret",
    props: {
      name: "my_secret-c84793b7",
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

  await fs.ensureFile(SECRETS_FILE);
  const secretsContent = await fs.readFile(SECRETS_FILE, "utf-8");

  const secrets = tryParse(secretsContent) ?? {};
  await fs.writeFile(
    SECRETS_FILE,
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
