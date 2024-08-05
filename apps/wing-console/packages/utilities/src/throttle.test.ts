import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { throttle } from "./throttle.js";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("throttles calls", () => {
  const function_ = vi.fn();
  const throttled = throttle(function_, 100);

  throttled();
  throttled();
  throttled();
  expect(function_).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(99);
  throttled();
  throttled();
  throttled();
  expect(function_).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);
  throttled();
  throttled();
  throttled();
  expect(function_).toHaveBeenCalledTimes(2);

  vi.advanceTimersByTime(100);
  throttled();
  throttled();
  throttled();
  expect(function_).toHaveBeenCalledTimes(3);
});
