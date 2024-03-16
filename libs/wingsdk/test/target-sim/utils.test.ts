import { describe, expect, test } from "vitest";
import { Duration } from "../../src/std";
import { convertDurationToCronExpression } from "../../src/target-sim/util";

describe("convertDurationToCronExpression", () => {
  test("converts a duration from minutes", () => {
    // GIVEN
    const dur = Duration.fromMinutes(10);
    const expectedCron = "*/10 * * * ?";

    // WHEN
    const cron = convertDurationToCronExpression(dur);

    // THEN
    expect(cron).toEqual(expectedCron);
  });

  test("converts a duration from hours", () => {
    const dur = Duration.fromHours(2);
    const expectedCron = "* */2 * * ?";

    // WHEN
    const cron = convertDurationToCronExpression(dur);

    // THEN
    expect(cron).toEqual(expectedCron);
  });

  test("converts durations with fractional hours", () => {
    // GIVEN
    const dur = Duration.fromHours(2.5);
    const expectedCron = "*/30 */2 * * ?";

    // WHEN
    const cron = convertDurationToCronExpression(dur);

    // THEN
    expect(cron).toEqual(expectedCron);
  });

  test("throws when trying to convert durations from fractional minutes", () => {
    // GIVEN
    const dur = Duration.fromMinutes(2.5);

    // THEN
    expect(() => convertDurationToCronExpression(dur)).toThrow(
      /Cron expressions with second precision are not supported/
    );
  });

  test("throws when trying to convert sub minute durations", () => {
    // GIVEN
    const dur = Duration.fromSeconds(30);

    // THEN
    expect(() => convertDurationToCronExpression(dur)).toThrow(
      /Cron expressions with second precision are not supported/
    );
  });
});
