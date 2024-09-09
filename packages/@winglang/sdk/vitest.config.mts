import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: "test/global.setup.ts",
    testTimeout: 200_000,
    retry: 2,
    include: ["test/**/*.test.ts"],
    // https://vitest.dev/guide/features.html#chai-and-jest-expect-compatibility
    // Allows to use the matchers added by "aws-sdk-client-mock-jest"
    globals: true,
  },
});
