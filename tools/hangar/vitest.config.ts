import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: "src/package.setup.ts",
  },
});
