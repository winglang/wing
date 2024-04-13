import { constants } from "fs";
import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";
import { resolve } from "path";
import Arborist from "@npmcli/arborist";
import { BuiltinPlatform } from "@winglang/compiler";
import packlist from "npm-packlist";
import * as tar from "tar";
import { compile } from "./compile";

// TODO: add --dry-run option?
// TODO: let the user specify library's supported targets in package.json, and compile to each before packaging
// TODO: print information about the generated library? (e.g. size, dependencies, number of public APIs)

const defaultGlobs = [
  "**/*.js",
  "**/*.cjs",
  "**/*.mjs",
  "**/*.ts",
  "**/*.cts",
  "**/*.mts",
  "**/*.w",
  "README*",
  "LICENSE*",
  "!target",
  "!**/main.w",
  "!**/*.main.w",
  "!**/*.test.w",
];
const compilerOutputFolder = "$lib";
const dotWingDir = ".wing";

export interface PackageOptions {
  /**
   * Output filename.
   */
  readonly outFile?: string;
}

async function containsWingFile(dir: string): Promise<boolean> {
  const files = await fs.readdir(dir);
  return files.some((file) => file.endsWith(".w"));
}

/**
 * This recursive function validates that all directories that contain wing files
 * have valid naming conventions.
 *
 * @param dir The name of the directory to validate
 */
async function validateWingDir(dir: string) {
  const dirEntries = await fs.readdir(dir);

  for (const entry of dirEntries) {
    const entryPath = path.join(dir, entry);
    const stat = await fs.stat(entryPath);

    if (stat.isDirectory()) {
      if (entry === "node_modules") {
        continue;
      }

      // if the directory contains a wing file, validate its name
      if (await containsWingFile(entryPath)) {
        if (!/^([A-Za-z_][A-Za-z_0-9]*|[A-Z][A-Z0-9_]*)$/.test(entry)) {
          throw new Error(
            `Directories that contain wing files cannot contain non-symbolic characters: ${entryPath}`
          );
        }
        await validateWingDir(entryPath);
      }
    }
  }
}

export async function pack(options: PackageOptions = {}): Promise<string> {
  const userDir = process.cwd();
  const outfile = options.outFile ? resolve(options.outFile) : undefined;
  const outdir = outfile ? path.dirname(outfile) : userDir;

  // check package.json exists
  const originalPkgJsonPath = path.join(userDir, "package.json");
  if (!(await exists(originalPkgJsonPath))) {
    throw new Error(`No package.json found in the current directory. Run \`npm init\` first.`);
  }

  // check that all wing directories are valid (for now that just means named correctly)
  await validateWingDir(userDir);

  // collect a list of files to copy to the staging directory.
  // only the files that will be included in the tarball will be copied
  // this way we can run `wing compile .` in the staging directory and be sure
  // that someone consuming the library will be able to compile it.
  const filesToCopy = await listFilesToCopy(userDir, defaultGlobs);

  // perform our work in a staging directory to avoid making a mess in the user's current directory
  return withTempDir(async (workdir) => {
    // copy staged files to the staging directory
    await copyFiles(userDir, workdir, filesToCopy);

    // symlink the user's node_modules to the staging directory
    const nodeModulesPath = path.join(workdir, "node_modules");
    await fs.symlink(path.join(userDir, "node_modules"), nodeModulesPath);

    // check that the library compiles to the "sim" target
    console.log('Compiling to the "sim" target...');
    const compilerOutputDir = await compile(workdir, {
      platform: [BuiltinPlatform.SIM],
    });

    const pkgJsonPath = path.join(workdir, "package.json");
    const pkgJson = JSON.parse(await fs.readFile(pkgJsonPath, "utf8"));

    // check package.json has required fields
    const requiredFields = ["name", "version", "description", "author", "license"];
    for (const field of requiredFields) {
      if (pkgJson[field] === undefined) {
        throw new Error(`Missing required field "${field}" in package.json.`);
      }
    }

    // Check if package.json has non-empty "dependencies"
    if (pkgJson.dependencies && Object.keys(pkgJson.dependencies).length > 0) {
      throw new Error(
        `Cannot create package with "dependencies" in package.json. Use "peerDependencies" instead.`
      );
    }

    // move compiler output
    await fs.rename(compilerOutputDir, path.join(workdir, compilerOutputFolder));

    // add default globs to "files" so that Wing files are included in the tarball
    const pkgJsonFiles: Set<string> = new Set(pkgJson.files ?? []);

    const expectedGlobs = [
      compilerOutputFolder,
      // exclude the unnecessary .manifest file
      "!" + path.join(compilerOutputFolder, ".manifest"),
      ...defaultGlobs,
    ];
    for (const pat of expectedGlobs) {
      if (!pkgJsonFiles.has(pat)) {
        pkgJsonFiles.add(pat);
      }
    }
    pkgJson.files = [...pkgJsonFiles];
    pkgJson.main = path.join(compilerOutputFolder, dotWingDir, "preflight.cjs");

    // add "winglang" to "keywords"
    const keywords = new Set(pkgJson.keywords ?? []);
    keywords.add("winglang");
    pkgJson.keywords = [...keywords];

    // add "wing" to "engines"
    pkgJson.engines = { wing: "*" };

    // add "wing" top-level field
    pkgJson.wing = true;

    // write package.json
    await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");

    // make the tarball
    const arborist = new Arborist({ path: workdir });
    const tree = await arborist.loadActual();
    const pkg = tree.package;
    const files = await packlist(tree);
    const tarballPath =
      outfile ??
      path.join(outdir, `${pkg.name?.replace(/^@/, "")?.replace(/\//, "-")}-${pkg.version}.tgz`);
    await tar.create(
      {
        gzip: true,
        file: tarballPath,
        cwd: workdir,
        prefix: "package/",
        portable: true,
        noPax: true,
      },
      files
    );

    console.log("Created tarball:", tarballPath);
    return tarballPath;
  });
}

/**
 * Determine a list of files to copy to the staging directory, based on what npm says
 * it would include in the tarball, given the user's package.json and a set of
 * additional files that we want to include.
 */
async function listFilesToCopy(dir: string, extraGlobs: string[]): Promise<string[]> {
  const arborist = new Arborist({ path: dir });
  const tree = await arborist.loadActual();
  tree.package.files?.push(...extraGlobs);
  return packlist(tree);
}

async function copyFiles(srcDir: string, destDir: string, files: string[]) {
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.copyFile(srcPath, destPath);
  }
}

/**
 * Run some work in a temporary directory.
 */
async function withTempDir<T>(work: (workdir: string) => Promise<T>): Promise<T> {
  const workdir = await fs.mkdtemp(path.join(os.tmpdir(), "wing-pack-"));
  const cwd = process.cwd();
  try {
    process.chdir(workdir);
    // wait for the work to be completed before
    // we cleanup the work environment.
    return await work(workdir);
  } finally {
    process.chdir(cwd);
    // if you want to debug this you can keep the workdir around
    if (!process.env.WING_PACK_KEEP_WORKDIR) {
      await fs.rm(workdir, { recursive: true });
    } else {
      console.debug(`Keeping pack workdir ${workdir}`);
    }
  }
}

/**
 * Check if a file exists at a specific path with the given permissions
 * @param filePath The path to the file
 * @param permissions The permissions to check for. Defaults to checking for existence, readability, and writability.
 */
export async function exists(
  filePath: string,
  permissions: number = constants.R_OK | constants.W_OK // eslint-disable-line no-bitwise
): Promise<boolean> {
  try {
    await fs.access(filePath, permissions);
    return true;
  } catch (er) {
    return false;
  }
}
