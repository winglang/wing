import { test, expect, describe } from "vitest";
import { Duration } from "../../src/std";
import { Util } from "../../src/util/util";

describe("test util functions", () => {
  test("sleep - suspends the flow for the given Duration", async () => {
    const sleepDuration: Duration = Duration.fromMilliseconds(5);
    const startTime = new Date();
    await Util.sleep(sleepDuration);
    const endTime = new Date();

    expect(endTime.getTime() - startTime.getTime()).toBeGreaterThanOrEqual(
      sleepDuration.milliseconds
    );
  });
});
