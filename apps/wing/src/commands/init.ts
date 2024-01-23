import { existsSync, readdirSync } from "fs";
import { copyFile, mkdir, readdir } from "fs/promises";
import { join, relative } from "path";
import { exists } from "./pack";

const INIT_TEMPLATES_DIR = join(__dirname, "..", "..", "init-templates");

/**
 * Options for the `new` command.
 * This is passed from Commander to the `init` function.
 */
export interface InitOptions {
  readonly template?: string;
  readonly language?: string;
}

/**
 * Compiles a Wing program. Throws an error if compilation fails.
 * @param entrypoint The program .w entrypoint.
 * @param options Compile options.
 * @returns the output directory
 */
export async function init(template: string | undefined, options: InitOptions = {}): Promise<void> {
  const templates = initTemplateNames();

  // If no template is specified, list available templates
  if (!template) {
    let lines = [];
    lines.push("Usage: wing new [template]\n\nPlease select from one of the available choices:");
    for (const t of templates) {
      lines.push(`  - ${t}`);
    }
    lines.push();
    lines.push(
      "Have an idea for a new template? Let us know at https://github.com/winglang/wing/issues/!"
    );
    throw new Error(lines.join("\n"));
  }

  if (!templates.includes(template)) {
    throw new Error(
      `Template "${template}" is not available. Please select from one of the available choices:\n  ${templates.join(
        "\n  "
      )}\n\nHave an idea for a new template? Let us know at https://github.com/winglang/wing/issues/!`
    );
  }

  // Parse the language selected
  let language = options.language ?? "wing";
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

  // Check if the template exists for the selected language
  const templatePath = join(INIT_TEMPLATES_DIR, language, template);
  const templateExists = await exists(templatePath);
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
    await copyFile(join(src, file), join(dest, file));
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

export function initTemplateNames(): string[] {
  const templateNames: string[] = [];
  readdirSync(join(INIT_TEMPLATES_DIR)).forEach((language) => {
    readdirSync(join(INIT_TEMPLATES_DIR, language)).forEach((template) => {
      templateNames.push(template);
    });
  });
  return templateNames;
}
