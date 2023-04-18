import { defineConfig } from "vitest/config";
import { join, relative } from "path";
import { VitestMarkdownReporter } from "vitest-markdown-reporter";

export default defineConfig({
  test: {
    reporters: ["default", "json", new VitestMarkdownReporter()],
    outputFile: {
      json: join(__dirname, "results", "report.json"),
      markdown: join(__dirname, "results", "report.md"),
    },
    benchmark: {
      reporters: ["default", "json", new VitestMarkdownReporter()],
      outputFile: {
        json: join(__dirname, "results", "benchmark.json"),
        markdown: join(__dirname, "results", "benchmark.md"),
      },
    },
    testTimeout: 200_000,
    globalSetup: join(__dirname, "src", "package.setup.ts"),
    resolveSnapshotPath(path, extension) {
      const baseSnapshotPath = join(__dirname, "__snapshots__");
      const srcPath = join(__dirname, "src");
      const relativePath = relative(srcPath, path).replace(
        /\.test\.ts$/,
        `.ts${extension}`
      );

      return join(baseSnapshotPath, relativePath);
    },
  },
});
