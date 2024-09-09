import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Some tests use process.chdir which is not supported in vitest's multi-thread mode
    pool: "forks",
    testTimeout: 200_000,
  },
});
