import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { throttle } from "./throttle.js";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("throttles invokations during the time frame", () => {
  const function_ = vi.fn();
  const throttled = throttle(function_, 100);

  throttled();
  vi.advanceTimersByTime(99);
  throttled();
  expect(function_).toHaveBeenCalledTimes(1);
});

test("throttles with a leading and trailing invokation", () => {
  const function_ = vi.fn();
  const throttled = throttle(function_, 100);

  throttled();
  expect(function_).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(100);
  expect(function_).toHaveBeenCalledTimes(2);
});
