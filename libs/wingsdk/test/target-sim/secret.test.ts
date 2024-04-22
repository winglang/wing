import * as path from "path";
import * as fs from "fs-extra";
import { test, expect, beforeEach, afterEach, describe } from "vitest";
import * as cloud from "../../src/cloud";
import { SimApp } from "../sim-app";

const SECRETS_FILE = path.join(process.cwd(), ".env");
describe("secrets", () => {
  beforeEach(() => {
    fs.createFileSync(SECRETS_FILE);
  });

  afterEach(() => {
    fs.removeSync(SECRETS_FILE);
  });

  test("create a secret", async () => {
    // GIVEN
    const app = new SimApp();
    new cloud.Secret(app, "my_secret");

    const s = await app.startSimulator();

    // THEN
    expect(s.getResourceConfig("/my_secret")).toEqual({
      attrs: {
        handle: expect.any(String),
      },
      path: "root/my_secret",
      addr: expect.any(String),
      policy: [],
      props: {
        name: "my_secret-c84793b7",
      },
      type: cloud.SECRET_FQN,
    });
    await s.stop();

    expect(app.snapshot()).toMatchSnapshot();
  });

  test("can get the secret value", async () => {
    // GIVEN
    const app = new SimApp();
    new cloud.Secret(app, "my_secret", {
      name: "wing-sim-test-my-secret",
    });
  
    await fs.writeFile(SECRETS_FILE, "wing-sim-test-my-secret=secret-value");

    const secretsContent = fs.readFileSync(SECRETS_FILE, "utf-8");
    secretsContent.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      process.env[key] = value;
    });

    const s = await app.startSimulator();
    const secretClient = s.getResource("/my_secret") as cloud.ISecretClient;

    // THEN
    const secretValue = await secretClient.value();
    expect(secretValue).toBe("secret-value");
    await s.stop();
  });
});

function tryParse(content: string): string | undefined {
  try {
    const parsed = JSON.parse(content);
    return parsed;
  } catch (err) {
    return undefined;
  }
}