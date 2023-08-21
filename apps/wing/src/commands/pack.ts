import * as path from "path";
import * as fs from "fs";
import * as cp from "child_process";

export interface PackageOptions {
  /**
   * Directory to to save the generated package to.
   */
  readonly outdir: string;
}

export async function pack(options: PackageOptions): Promise<string> {
  // check npm is installed
  try {
    cp.execSync("npm --version", { stdio: "ignore" });
  } catch {
    throw new Error(`npm is not installed. Install it from https://www.npmjs.com/get-npm`);
  }

  // check package.json exists
  const currentDir = process.cwd();
  const pkgJsonPath = path.join(currentDir, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    throw new Error(`No package.json found in the current directory. Run \`npm init\` first.`);
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  pkgJson.wing = pkgJson.wing ?? {};

  // check entrypoint file exists and is specified in package.json
  const entrypoint = pkgJson.wing.entrypoint ?? "lib.w";
  if (!fs.existsSync(entrypoint)) {
    throw new Error(
      `Entrypoint file "${entrypoint}" does not exist. An alternate entrypoint can be specified adding wing.entrypoint in package.json:\n\n  "wing": {\n    "entrypoint": "lib.w"\n  }\n`
    );
  }
  pkgJson.wing.entrypoint = entrypoint;

  // check source files will be included in tarball
  const pkgJsonFiles = pkgJson.files ?? [];
  const expectedGlobs = ["**/*.js", "**/*.w"];
  for (const glob of expectedGlobs) {
    if (!pkgJsonFiles.includes(glob)) {
      pkgJsonFiles.push(glob);
    }
  }
  pkgJson.files = pkgJsonFiles;

  // check package.json has required fields
  const requiredFields = ["name", "version", "description", "author", "license"];
  for (const field of requiredFields) {
    if (pkgJson[field] === undefined) {
      throw new Error(`Missing required field "${field}" in package.json`);
    }
  }

  // write package.json
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");

  // make tarball
  fs.mkdirSync(options.outdir, { recursive: true });
  const command = `npm pack --json --pack-destination "${options.outdir}"`;
  const output = cp.execSync(command, { stdio: "pipe" });
  const parsedOutput = JSON.parse(output.toString());
  const tarballName = parsedOutput[0].filename;
  return path.join(options.outdir, tarballName);
}
