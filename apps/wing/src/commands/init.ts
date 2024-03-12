// This file and the main function are named "init" instead of "new"
// to avoid a conflict with the "new" keyword in JavaScript
import { exec } from "child_process";
import { existsSync, constants } from "fs";
import { cp, mkdir, readFile, readdir, writeFile } from "fs/promises";
import { join, relative } from "path";
import { promisify } from "util";
import chalk from "chalk";
import inquirer from "inquirer";
import { exists } from "./pack";
import { projectTemplateNames, PROJECT_TEMPLATES_DIR, currentPackage } from "../util";

const execPromise = promisify(exec);

/**
 * Options for the `new` command.
 * This is passed from Commander to the `init` function.
 */
export interface InitOptions {
  template?: string;
  language?: string;
  readonly listTemplates?: boolean;
}

/**
 * Compiles a Wing program. Throws an error if compilation fails.
 * @param entrypoint The program .w entrypoint.
 * @param options Compile options.
 * @returns the output directory
 */
export async function init(template: string, options: InitOptions = {}): Promise<void> {
  const templates = projectTemplateNames();
  let language = options.language ?? "wing";

  // If --list-templates is specified, list the available templates and exit
  if (options.listTemplates) {
    console.log(templates.join("\n"));
    return;
  }

  // If no template is specified, let them interactively select one
  if (!template) {
    console.log("Usage: wing new <template> [--language <language>]");
    console.log();
    try {
      const responses = await inquirer.prompt([
        {
          type: "list",
          name: "template",
          message: "Please select a template:",
          choices: templates,
        },
        {
          type: "list",
          name: "language",
          message: "Please select a language:",
          choices: ["wing", "typescript"],
        },
      ]);
      template = responses.template;
      language = responses.language;
      console.log();
    } catch (err) {
      if ((err as any).isTtyError) {
        throw new Error(
          `Please select from one of the available choices:\n  ${templates.join(
            "\n  "
          )}\n\nHave an idea for a new template? Let us know at https://github.com/winglang/wing/issues/!`
        );
      }
    }
  }

  if (!templates.includes(template)) {
    throw new Error(
      `Template "${template}" is not available. Please select from one of the available choices:\n  ${templates.join(
        "\n  "
      )}\n\nHave an idea for a new template? Let us know at https://github.com/winglang/wing/issues/!`
    );
  }

  // Parse the language selected
  switch (language) {
    case "ts":
    case "typescript":
      language = "typescript";
      break;
    case "wing":
    case "winglang":
      language = "wing";
      break;
    default:
      throw new Error(
        `Unknown language: "${language}". Please select from "wing" or "typescript".`
      );
  }
  // Since this object is used by our analytics collector
  options.language = language;
  options.template = template;
  // Check if the template exists for the selected language
  const templatePath = join(PROJECT_TEMPLATES_DIR, language, template);
  const templateExists = await exists(templatePath, constants.R_OK);
  if (!templateExists) {
    throw new Error(
      `Template "${template}" is not available in ${language}. Please let us know you'd like to use this template in ${language} by opening an issue at https://github.com/winglang/wing/issues/!`
    );
  }

  // Obtain a list of files in the template, and check they won't overwrite anything
  const files = await getFiles(templatePath);
  const existingFiles = await getFiles(process.cwd());
  const overwrite = existingFiles.filter((file) => files.includes(file));
  if (overwrite.length > 0) {
    throw new Error(
      `The following files already exist in the current directory and will be overwritten:\n  ${overwrite.join(
        "\n  "
      )}\n\nPlease move or delete these files and try again.`
    );
  }

  // Copy the template
  await copyFiles(templatePath, process.cwd());

  // Replace wing version
  const packageJsonPath = join(process.cwd(), "package.json");
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
    const isDevVersion = currentPackage.version.startsWith("0.0.0");

    const depKeys = ["dependencies", "devDependencies", "peerDependencies"];
    for (const depKey of depKeys) {
      const depMap = packageJson[depKey] ?? {};
      for (const [key, val] of Object.entries(depMap)) {
        if ((val as string).includes("#WING_VERSION#")) {
          if (isDevVersion) {
            if (key === "winglang") {
              depMap[key] = `file:${join(__dirname, "..", "..")}`;
            } else {
              depMap[key] = `file:${join(__dirname, "..", "..", "..", "..", "libs", key)}`;
            }
          } else {
            depMap[key] = depMap[key].replace("#WING_VERSION#", currentPackage.version);
          }
        }
      }
    }

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Run npm install
  console.log("Installing dependencies...");
  console.log();

  // Check if npm is installed
  const npmExists = await execPromise("npm --version")
    .then(() => true)
    .catch(() => false);
  if (!npmExists) {
    console.log(
      `${chalk.yellow(
        "warning:"
      )} npm is not installed. Please install npm and run "npm install" to finish setting up any project dependencies.`
    );
  }

  // Install dependencies (in the current directory)
  try {
    await execPromise("npm install");
  } catch (err) {
    console.log(
      `${chalk.yellow(
        "warning:"
      )} npm install failed. Please let us know there's an issue with this template by opening an issue at at https://github.com/winglang/wing/issues/.`
    );
    console.log();
    console.error((err as any).stderr);
  }

  console.log(`Created a new ${chalk.cyan(template)} project in the current directory! 🎉`);
  console.log();
  console.log("Not sure where to get started? Try running:");
  console.log();
  console.log("  wing compile - build your project");
  console.log("  wing it - simulate your app in the Wing Console");
  console.log("  wing test - run all tests");
  console.log();
  console.log("Visit the docs for examples and tutorials: https://winglang.io/docs");
}

/**
 * Recursively copies a directory.
 * @param src The source directory.
 * @param dest The destination directory.
 */
async function copyFiles(src: string, dest: string): Promise<void> {
  // Create the destination directory if it doesn't exist
  if (!existsSync(dest)) {
    await mkdir(dest);
  }

  // Copy all files
  const files = await getFiles(src);
  for (const file of files) {
    await cp(join(src, file), join(dest, file));
  }
}

/**
 * Recursively gets all files in a directory.
 * @param dir The directory to search.
 * @returns a list of files.
 */
async function getFiles(dir: string): Promise<string[]> {
  return getFilesHelper(dir, dir);
}

async function getFilesHelper(basedir: string, dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const res = join(dir, dirent.name);
      return dirent.isDirectory() ? getFilesHelper(basedir, res) : relative(basedir, res);
    })
  );
  return Array.prototype.concat(...files);
}
