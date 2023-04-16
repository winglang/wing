import { execSync } from "child_process";
import fs from "fs/promises";
import path from "path";

export async function setup() {
  // compile src/**/*.on*.inflight.ts to .js because these are going to be
  // injected into our javascript vm and cannot be resolved via vitest
  execSync("npx tsc -p tsconfig.test.json", { stdio: "inherit" });
  return () => {};
}

// remove all the compiled .js and .d.ts files after the tests are done
// so that we don't have a ocean of files to sift through
export async function teardown() {
  // Skip teardown (why? I dunno maybe you like the mess)
  if (process.env.WING_SDK_VITEST_SKIP_TEARDOWN) {
    return;
  }
  const files = await findFilesWithExtension(["src"], [".d.ts", ".js"]);
  for (const file of files) {
    try {
      await fs.unlink(file);
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * Recursively search for files with the given file extensions
 * in the given directories.
 *
 * @param directories list of directories to recursively search
 * @param fileExtensions list of file extensions to search for
 * @returns list of file paths matching the given file extensions
 */
async function findFilesWithExtension(
  directories: string[],
  fileExtensions: string[]
): Promise<string[]> {
  const results: Set<string> = new Set();

  const traverseDirectory = async (dir: string): Promise<string[]> => {
    let traverseResults: string[] = [];

    try {
      // Read all files in the directory
      const files = await fs.readdir(dir);

      for (const file of files) {
        // Resolve the full path of the file
        const filePath = path.resolve(dir, file);

        // Check if the file is a directory
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          // Get nested files recursively
          const nestedFiles = await traverseDirectory(filePath);
          traverseResults = traverseResults.concat(nestedFiles);
          continue;
        }

        // Check if any file extension in the list matches the file extension
        const matchedExt = fileExtensions.some((ext) =>
          filePath.toLowerCase().endsWith(ext.toLowerCase())
        );

        // We got one!
        if (matchedExt) {
          traverseResults.push(filePath);
        }
      }
    } catch (err) {
      console.error(err);
    }

    return traverseResults;
  };

  for (const dir of directories) {
    const files = await traverseDirectory(dir);
    files.forEach((file) => results.add(file));
  }

  return Array.from(results);
}
