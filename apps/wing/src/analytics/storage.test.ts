import { existsSync, mkdirSync, writeFileSync } from "fs";
import * as os from "os";
import path from "path";
import { describe, test, expect } from "vitest";
import { AnalyticEvent } from "./event";
import { AnalyticsConfig, AnalyticsStorage } from "./storage";

describe("storage tests", () => {
  const DUMMY_ANALYTIC: AnalyticEvent = {
    event: "some fake:event",
    properties: {
      cli: {
        platform: ["xbox", "ps5"].join(","),
        options: '{"-t": "fake-aws"}',
        model: "fake-aws",
        version: "4.2.0",
        wing_console_version: "1.2.3",
        wing_sdk_version: "4.5.6",
      },
      os: {
        arch: "x64",
        platform: "xbox",
        release: "360",
      },
      node: {
        version: "a million",
      },
    },
  };

  describe("when analytics is opt-in", () => {
    const fakeAnalyticConfig = {
      optOut: false,
      anonymousId: "fake-anonymous-id",
    } as AnalyticsConfig;

    test("anonymous id should not be included if in CI environment", () => {
      // GIVEN
      process.env.GITHUB_ACTION = "1";
      const storage = createStorageWithFakeConfig({} as any, "opt-in-1");

      // WHEN
      const analyticPath = storage.storeAnalyticEvent(DUMMY_ANALYTIC);
      const storedAnalytic = storage.loadEvent(analyticPath!);

      // THEN
      expect(analyticPath).toBeDefined();
      expect(storedAnalytic).not.toHaveProperty("anonymousId");
    });

    test("should store analytic with flattened properties and return correct filepath", async () => {
      // WHEN
      const storage = createStorageWithFakeConfig(fakeAnalyticConfig, "opt-in-2");
      const analyticPath = storage.storeAnalyticEvent(DUMMY_ANALYTIC);
      const storedAnalytic = storage.loadEvent(analyticPath!);

      // THEN
      expect(analyticPath).toBeDefined();
      expect(storedAnalytic).toEqual(
        expect.objectContaining({
          event: DUMMY_ANALYTIC.event,
          properties: {
            cli_model: "fake-aws",
            cli_platform: "xbox,ps5",
            cli_version: "4.2.0",
            cli_options: '{"-t": "fake-aws"}',
            cli_wing_console_version: "1.2.3",
            cli_wing_sdk_version: "4.5.6",
            os_arch: "x64",
            os_platform: "xbox",
            os_release: "360",
            node_version: "a million",
          },
        })
      );
    });

    test("can retrieve anonymous id", () => {
      const storage = createStorageWithFakeConfig(fakeAnalyticConfig, "opt-in-3");
      expect(storage.getAnonymousId()).toBe("fake-anonymous-id");
    });
  });

  describe("when analytics is opt-out", () => {
    const fakeAnalyticConfig: AnalyticsConfig = {
      optOut: true,
      anonymousId: "fake-anonymous-id",
    };

    const storage = createStorageWithFakeConfig(fakeAnalyticConfig, "opt-out-1");

    test("does not store analytic", async () => {
      // WHEN
      const analyticPath = storage.storeAnalyticEvent(DUMMY_ANALYTIC);
      const analytic = storage.loadEvent(analyticPath!);

      // THEN
      expect(analyticPath).toBeUndefined();
      expect(analytic).toBeUndefined();
    });
  });
});

export function createStorageWithFakeConfig(
  config: AnalyticsConfig,
  dirName: string
): AnalyticsStorage {
  const tmpDir = path.join(os.tmpdir(), dirName);
  const configFile = path.join(tmpDir, "analytics-fake-config.json");
  if (!existsSync(tmpDir)) {
    mkdirSync(tmpDir);
  }
  writeFileSync(configFile, JSON.stringify(config));
  return new AnalyticsStorage({ configFile: configFile, analyticsStorageDir: tmpDir });
}
