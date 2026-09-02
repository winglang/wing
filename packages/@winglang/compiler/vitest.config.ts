import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 200_000,
    // Some tests use process.chdir which is not supported in vitest's multi-thread mode
    pool: "forks",
    include: ["src/**/*.test.ts"],
    // https://vitest.dev/guide/features.html#chai-and-jest-expect-compatibility
    // Allows to use the matchers added by "aws-sdk-client-mock-jest"
    globals: true,
  },
});
