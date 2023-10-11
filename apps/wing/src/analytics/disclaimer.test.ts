import { existsSync, unlinkSync } from "fs";
import * as os from "os";
import path from "path";
import { test, expect, describe, beforeEach, afterEach, vi } from "vitest";
import {
  WING_DISCLAIMER,
  WING_DISCLAIMER_VERSION,
  optionallyDisplayDisclaimer,
  shouldDisplayDisclaimer,
} from "./disclaimer";
import { AnalyticsStorage } from "./storage";

describe("disclaimer", () => {
  const originalTTY = process.stdin.isTTY;
  const nonExistentFile = path.join(os.tmpdir(), "_)(*noWayThis_file_exists%$#@.json");

  beforeEach(() => {
    if (existsSync(nonExistentFile)) {
      unlinkSync(nonExistentFile);
    }
  });

  describe("behavior when in TTY", () => {
    let log: any;

    beforeEach(() => {
      process.stdin.isTTY = true;
      log = console.log;
      console.log = vi.fn();
    });

    afterEach(() => {
      process.stdin.isTTY = originalTTY;
      console.log = log;
    });

    test("appears on first run", () => {
      // GIVEN
      const storage = new AnalyticsStorage({ configFile: nonExistentFile });

      // WHEN
      optionallyDisplayDisclaimer(storage);

      // THEN
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(WING_DISCLAIMER.split("\n")[0])
      );
    });

    test("alters config value for displayed", () => {
      // GIVEN
      const storage = new AnalyticsStorage({ configFile: nonExistentFile });
      storage.saveConfig({ anonymousId: "fake-id", disclaimerDisplayed: false });

      // WHEN
      optionallyDisplayDisclaimer(storage);

      // THEN
      expect(storage.loadConfig().disclaimerDisplayed).toBe(true);
    });

    test("alters displayed version", () => {
      // GIVEN
      const storage = new AnalyticsStorage({ configFile: nonExistentFile });
      storage.saveConfig({ anonymousId: "fake-id", disclaimerDisplayed: false });

      // WHEN
      optionallyDisplayDisclaimer(storage);

      // THEN
      expect(storage.loadConfig().disclaimerVersion).toBe(WING_DISCLAIMER_VERSION);
    });

    test("does not appear on second run", () => {
      // GIVEN
      const storage = new AnalyticsStorage({ configFile: nonExistentFile });

      // WHEN
      optionallyDisplayDisclaimer(storage);
      optionallyDisplayDisclaimer(storage);

      // THEN
      expect(console.log).toHaveBeenCalledTimes(1);
    });

    describe("shouldDisplayDisclaimer", () => {
      test("returns true if config is empty", () => {
        expect(shouldDisplayDisclaimer({} as any)).toBe(true);
      });

      test("returns true if version is not set", () => {
        expect(
          shouldDisplayDisclaimer({
            anonymousId: "fake-id",
            disclaimerDisplayed: true,
          })
        ).toBe(true);
      });

      test("returns true if version is not current", () => {
        expect(
          shouldDisplayDisclaimer({
            anonymousId: "fake-id",
            disclaimerDisplayed: true,
            disclaimerVersion: "-100.0.0",
          })
        ).toBe(true);
      });

      test("return false if displayed version is current", () => {
        expect(
          shouldDisplayDisclaimer({
            anonymousId: "fake-id",
            disclaimerDisplayed: true,
            disclaimerVersion: WING_DISCLAIMER_VERSION,
          })
        ).toBe(false);
      });
    });
  });

  describe("behavior when not in TTY", () => {
    beforeEach(() => {
      process.stdin.isTTY = false;
    });

    afterEach(() => {
      process.stdin.isTTY = originalTTY;
    });

    test("does not alter config value for displayed", () => {
      // GIVEN
      const storage = new AnalyticsStorage({ configFile: nonExistentFile });
      storage.saveConfig({ anonymousId: "fake-id", disclaimerDisplayed: false });

      // WHEN
      optionallyDisplayDisclaimer(storage);

      // THEN
      expect(storage.loadConfig().disclaimerDisplayed).toBe(false);
    });

    test("returns false if no matter the config", () => {
      expect(shouldDisplayDisclaimer({} as any)).toBe(false);
    });
  });
});
