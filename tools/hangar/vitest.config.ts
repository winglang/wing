import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 150_000,
    globalSetup: "src/package.setup.ts",
    useAtomics: true,
  },
});
