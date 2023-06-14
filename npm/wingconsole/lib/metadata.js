import * as os from "node:os";

const availablePackages = new Set([
  "darwin-arm64",
  "darwin-x64",
  "linux-arm",
  "linux-arm64",
  "linux-x64",
  "win32-arm64",
  "win32-ia32",
  "win32-x64",
]);

const findImportName = () => {
  const query = `${os.platform()}-${os.arch()}`;
  if (!availablePackages.has(query)) {
    throw new Error(`[wingconsole] Unsupported platform/arch: ${query}`);
  }
  return `@wingconsole/desktop-${query}`;
};

/**
 * @type {{ binFile: URL, releaseDir: URL, tarballFile: URL }}
 */
export const { binFile, releaseDir, tarballFile } = await import(
  findImportName()
);
