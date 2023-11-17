import { describe, expect, test } from "vitest";
import * as path from "path";
import { runWingCommand } from "./utils";
import { sdkTests } from "./paths";

describe("analytics export", () => {
  describe("when run in detached mode", () => {
    test("invalid analytics reporting does not throw an error", async () => {
      const args = ["compile"];
      const platforms = ["sim"];
      const appFile = path.join(sdkTests, "std", "bool.test.w");
      
      await runWingCommand({
        cwd: sdkTests,
        platforms,
        wingFile: appFile,
        args,
        expectFailure: false, // should not fail even though analytics export fails
        enableAnalytics: true,
        env: {
          WING_SEGMENT_WRITE_KEY: "uber-fake-key",
          WING_ANALYTICS_FORCE_FAIL: "1",
          WING_ANALYTICS_FORCE_EXPORT: "1",
        }
      });
    });
  });

  describe("when run in attached mode", () => {
    test("throws an error if the export fails", async () => {
      const args = ["compile"];
      const platforms = ["sim"];
      const appFile = path.join(sdkTests, "std", "bool.test.w");
      
      await runWingCommand({
        cwd: sdkTests,
        platforms,
        wingFile: appFile,
        args,
        expectFailure: true,
        enableAnalytics: true,
        env: {
          WING_SEGMENT_WRITE_KEY: "uber-fake-key",
          WING_ANALYTICS_RUN_ATTACHED: "1",
          WING_ANALYTICS_FORCE_FAIL: "1",
          WING_ANALYTICS_FORCE_EXPORT: "1",
        }
      });

    });

    test("throws an error when unable to reach segment host", async () => {
      const args = ["compile"];
      const platforms = ["sim"];
      const appFile = path.join(sdkTests, "std", "bool.test.w");
      
      await runWingCommand({
        cwd: sdkTests,
        platforms,
        wingFile: appFile,
        args,
        expectFailure: true,
        enableAnalytics: true,
        env: {
          WING_ANALYTICS_RUN_ATTACHED: "1",
          WING_SEGMENT_WRITE_KEY: "uber-fake-key",
          WING_ANALYTICS_HOST: "localhost/invalid",
          WING_ANALYTICS_FORCE_EXPORT: "1",
        }
      });
    });
  });
});
