import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    update: true,
    globalSetup: "test/global.setup.ts",
    testTimeout: 200_000,
  },
});
