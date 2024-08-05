import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { debounce } from "./debounce.js";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("debounces invokations", () => {
  const function_ = vi.fn();
  const debounced = debounce(function_, 100);

  debounced();
  debounced();
  debounced();
  expect(function_).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(99);
  debounced();
  debounced();
  debounced();
  expect(function_).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(100);
  expect(function_).toHaveBeenCalledTimes(1);
});
