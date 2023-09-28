import { configDefaults, defineConfig } from "vitest/config";
import { join, relative } from "path";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "**/tmp/**"],
    reporters: ["verbose"],
    benchmark: {
      reporters: ["default", "./src/benchmarking/reporter" as any],
      outputFile: {
        json: join(__dirname, "results", "report.json"),
      },
    },
    isolate: false,
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
