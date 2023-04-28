import { test, expect, describe } from "vitest";
import { Duration, sleep } from "../../src/std";

describe("test sleep function", () => {
  test("sleep suspends the flow for the given Duration", async () => {
    const sleepDuration: Duration = Duration.fromMilliseconds(5);
    const startTime = new Date();
    await sleep(sleepDuration);
    const endTime = new Date();

    expect(endTime.getTime() - startTime.getTime()).toBeGreaterThanOrEqual(
      sleepDuration.milliseconds
    );
  });
});
