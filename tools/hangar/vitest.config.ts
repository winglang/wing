import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 90_000,
    globalSetup: "src/package.setup.ts",
  },
});
