import {describe, test, expect } from "vitest";
import { AnalyticEvent } from "./event";
import { AnalyticsConfig, AnalyticsStorage } from "./storage";
import { writeFileSync } from "fs";
import path from "path";
import * as os from "os";

describe(
  "storage tests",
  () => {
    const DUMMY_ANALYTIC: AnalyticEvent = {
      event: "some fake:event",
      properties: {
        cli: {
          options: "\{\"-t\": \"fake-aws\"\}",
          target: "fake-aws",
          version: "4.2.0",
          wingConsoleVersion: "1.2.3",
          wingSDKVersion: "4.5.6"
        },
        os: {
          arch: "x64",
          platform: "xbox",
          release: "360",
        },
        node: {
          version: "a million",
        }
      }
    }

    describe("when analytics is opt-in", () => {
      const fakeAnalyticConfig: AnalyticsConfig = {
        optOut: false,
        anonymousId: "fake-anonymous-id"
      }
      const storage = createStorageWithFakeConfig(fakeAnalyticConfig);

      test("should store analytic event and return correct filepath", async () => {
        // WHEN
        const analyticPath = storage.storeAnalyticEvent(DUMMY_ANALYTIC);
        const storedAnalytic = storage.loadEvent(analyticPath!);
  
        // THEN
        expect(analyticPath).toBeDefined();
        expect(storedAnalytic).toEqual(DUMMY_ANALYTIC);
      });

      test("can retrieve anonymous id", () => {
        expect(storage.getAnonymousId()).toBe("fake-anonymous-id");
      });
    });


    describe("when analytics is opt-out", () => {
      const fakeAnalyticConfig: AnalyticsConfig = {
        optOut: true,
        anonymousId: "fake-anonymous-id"
      }

      const storage = createStorageWithFakeConfig(fakeAnalyticConfig);
      
      test("does not store analytic", async () => {
        // WHEN
        const analyticPath = storage.storeAnalyticEvent(DUMMY_ANALYTIC);
        const analytic = storage.loadEvent(analyticPath!);
  
        // THEN
        expect(analyticPath).toBeUndefined();
        expect(analytic).toBeUndefined();
      });
    });

  }
);

export function createStorageWithFakeConfig(config: AnalyticsConfig): AnalyticsStorage {
  const tmpDir = path.join(os.tmpdir(), "wing-storage-test");
  const configFile = path.join(tmpDir, "analytics-fake-config.json");

  writeFileSync(configFile, JSON.stringify(config));
  return new AnalyticsStorage({configFile: configFile});
}