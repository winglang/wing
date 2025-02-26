import { test, expect, vi, describe } from "vitest";
import { Util } from "../src/util";

describe("env", () => {
  test("env", () => {
    expect(Util.env("NODE_ENV")).toBe("test");
  });
});

describe("ulid", () => {
  test("ulid", () => {
    expect(Util.ulid()).toMatch(/^[0-9A-Z]{26}$/);
  });

  test("seed", () => {
    expect(Util.ulid({ seed: 1200 })).toMatch(/^000000015G[0-9A-Z]{16}$/);
  });
});


describe("setInterval", () => {
  test("should execute the function after the given interval", (done) => {
    const mockFunc = vi.fn(); // Create a mock function

    // Set a short interval of 100ms
    const intervalId = Util.setInterval(mockFunc, 0.1);

    // Use setTimeout to check after 200ms if the mock function was called
    setTimeout(() => {
      expect(mockFunc).toHaveBeenCalled(); // Ensure the mock function was called
      clearInterval(intervalId); // Clear the interval after the test
    }, 200); // Wait for 200ms before checking
  });
});

describe("clearInterval", () => {
  test("should clear the interval", (done) => {
    const mockFunc = vi.fn(); // Create a mock function

    // Set the interval with a 1 second delay
    const intervalId = Util.setInterval(mockFunc, 1);

    // Clear the interval after 200ms
    setTimeout(() => {
      Util.clearInterval(intervalId); // Call the method to clear the interval

      // Check if the function was not called after the interval was cleared
      setTimeout(() => {
        expect(mockFunc).toHaveBeenCalledTimes(1); // The function should have been called only once
      }, 100); // Allow some time to confirm the interval was cleared
    }, 200); // Clear after 200ms
  });
});
