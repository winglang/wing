import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    update: true,
    globalSetup: "test/global.setup.ts",
    testTimeout: 200_000,
    // https://vitest.dev/guide/features.html#chai-and-jest-expect-compatibility
    // Allows to use the matchers added by "aws-sdk-client-mock-jest"
    globals: true,
  },
});
