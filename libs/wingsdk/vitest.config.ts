import { defineConfig } from "vitest/config";
import { join, relative } from "path";

export default defineConfig({
  test: {
    testTimeout: 300_000,
  },
});
