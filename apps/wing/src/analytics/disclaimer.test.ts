import {test, expect, describe, beforeEach, afterEach, vi} from "vitest";
import { AnalyticsStorage } from "./storage";
import path from "path";
import * as os from "os";
import { WING_DISCLAIMER, optionallyDisplayDisclaimer } from "./disclaimer";
import { existsSync, unlinkSync } from "fs";


describe("disclaimer", () => {
  const nonExistentFile = path.join(os.tmpdir(), "_)(*noWayThis_file_exists%$#@.json");

  let log: any;

  beforeEach(() => {
    log = console.log;
    console.log = vi.fn();

    if (existsSync(nonExistentFile)) {
      unlinkSync(nonExistentFile);
    }
  });

  afterEach(() => {
    console.log = log;
  });

  test("appears on first run", () => {
    // GIVEN
    const storage = new AnalyticsStorage({configFile: nonExistentFile});

    // WHEN
    optionallyDisplayDisclaimer(storage);

    // THEN
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(WING_DISCLAIMER.split("\n")[0]));
  });

  test("does not appear on second run", () => {
    // GIVEN
    const storage = new AnalyticsStorage({configFile: nonExistentFile});

    // WHEN
    optionallyDisplayDisclaimer(storage);
    optionallyDisplayDisclaimer(storage);

    // THEN
    expect(console.log).toHaveBeenCalledTimes(1);
  });
})
