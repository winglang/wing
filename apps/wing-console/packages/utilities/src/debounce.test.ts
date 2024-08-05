import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { debounce } from "./debounce.js";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("debounces calls", () => {
  const function_ = vi.fn();
  const debounced = debounce(function_, 1);

  debounced();
  debounced();
  debounced();
  expect(function_).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(function_).toHaveBeenCalledTimes(1);
});
