import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as yaml from "yaml";
import { InflightClient } from "../core";
import { normalPath } from "../shared/misc";
import { Datetime, Json } from "../std";

/**
 * Custom settings for reading from a file
 */
export interface ReadFileOptions {
  /**
   * The character encoding utilized for file reading.
   * @default "utf-8"
   */
  readonly encoding?: BufferEncoding;
  /**
   * The `flag` can be set to specify the attributes.
   * @default "r".
   */
  readonly flag?: string;
}

/**
 * Custom settings for writing to a file
 */
export interface WriteFileOptions {
  /**
   * The character encoding utilized for file writing.
   * @default "utf-8"
   */
  readonly encoding?: BufferEncoding;
  /**
   * The `flag` can be set to specify the attributes.
   * @default "w".
   */
  readonly flag?: string;
}

/**
 * Custom settings for creating directory
 */
export interface MkdirOptions {
  /**
   * Indicates whether parent folders should be created.
   * If a folder was created, the path to the first created folder will be returned.
   * @default true
   */
  readonly recursive?: boolean;
  /**
   * A file mode. The string will be parsed as an octal integer.
   * @default "0777"
   */
  readonly mode?: string;
}

/**
 * Custom settings for removing files and directories
 */
export interface RemoveOptions {
  /**
   * When `true`, exceptions will be ignored if `path` does not exist.
   * @default true
   */
  readonly force?: boolean;
  /**
   * If `true`, perform a recursive directory removal. In
   * recursive mode, operations are retried on failure.
   * @default true
   */
  readonly recursive?: boolean;
}

/**
 * Represents the type of a file system object.
 */
export type FileType = "File" | "Directory" | "Symlink" | "Other";

/**
 * Represents metadata information about a file or directory.
 */
export interface Metadata {
  readonly fileType: FileType;
  readonly size: number;
  readonly permissions: string;
  readonly modified: Datetime;
  readonly accessed: Datetime;
  readonly created: Datetime;
}

/**
 * The fs class is used for interacting with the file system.
 * All file paths must be POSIX file paths (/ instead of \),
 * and will be normalized to the target platform if running on Windows.
 */
export class Util {
  /**
   * Join all arguments together and normalize the resulting path.
   * @param paths The array of path need to join.
   * @returns The resulting path after joining all the paths.
   */
  public static join(...paths: string[]): string {
    return normalPath(path.join(...paths));
  }

  /**
   * Retrieve the name of the directory from a given file path.
   * @param p The path to evaluate.
   * @returns The directory name of the path.
   */
  public static dirname(p: string): string {
    return normalPath(path.dirname(p));
  }

  /**
   * Retrieve the final segment of a given file path.
   * @param p The path to evaluate.
   * @returns The last portion of a path.
   */
  public static basename(p: string): string {
    return path.basename(p);
  }

  /**
   * Solve the relative path from {from} to {to} based on the current working directory.
   * At times we have two absolute paths, and we need to derive the relative path from one to the other.
   * @returns The relative path from {from} to {to}.
   */
  public static relative(from: string, to: string): string {
    return normalPath(path.relative(from, to));
  }

  /**
   * The right-most parameter is considered {to}. Other parameters are considered an array of {from}.
   *
   * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
   *
   * If {to} isn't already absolute, {from} arguments are prepended in right to left order,
   * until an absolute path is found. If after using all {from} paths still no absolute path is found,
   * the current working directory is used as well. The resulting path is normalized,
   * and trailing slashes are removed unless the path gets resolved to the root directory.
   *
   * @param paths A sequence of paths or path segments.
   * @returns The resulting path after performing the resolve operation.
   */
  public static resolve(...paths: string[]): string {
    return normalPath(path.resolve(...paths));
  }

  /**
   * Check if the path exists.
   * @param p The path to evaluate.
   * @returns `true` if the path exists, `false` otherwise.
   */
  public static exists(p: string): boolean {
    return fs.existsSync(p);
  }

  /**
   * Read the contents of the directory.
   * @param dirpath The path to evaluate.
   * @returns The contents of the directory.
   */
  public static readdir(dirpath: string): Array<string> {
    return fs.readdirSync(dirpath);
  }

  /**
   * If the path exists, read the contents of the directory; otherwise, return `undefined`.
   * @param dirpath The path to evaluate.
   * @returns The contents of the directory if the path exists, `undefined` otherwise.
   */
  public static tryReaddir(dirpath: string): Array<string> | undefined {
    try {
      return Util.readdir(dirpath);
    } catch {
      return undefined;
    }
  }

  /**
   * Create a directory.
   * @param dirpath The path to the directory you want to create.
   */
  public static mkdir(dirpath: string, opts?: MkdirOptions): void {
    fs.mkdirSync(dirpath, {
      recursive: opts?.recursive ?? true,
      mode: opts?.mode ?? "0777",
    });
  }

  /**
   * Create a temporary directory.
   * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
   * @param prefix The prefix for the directory to be created, default `wingtemp`.
   * @returns The created directory path.
   */
  public static mkdtemp(prefix?: string): string {
    if (prefix == undefined) {
      prefix = "wingtemp";
    }
    const dirpath = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
    return normalPath(dirpath);
  }

  /**
   * Read the entire contents of a file.
   * @param filepath The path of the file to be read.
   * @param options The `encoding` can be set to specify the character encoding. And the `flag` can be set to specify the attributes.
   * If a flag is not provided, it defaults to `"r"`.
   * @returns The contents of the `filepath`.
   */
  public static readFile(filepath: string, options?: ReadFileOptions): string {
    const buf = fs.readFileSync(filepath, options);
    return buf.toString();
  }

  /**
   * If the file exists and can be read successfully, read the entire contents;
   * otherwise, return `undefined`.
   * @param filepath The path of the file to be read.
   * @param options The `encoding` can be set to specify the character encoding, or the `flag` can be set to specify the attributes.
   * @returns The contents of the `filepath`, `undefined` otherwise.
   */
  public static tryReadFile(
    filepath: string,
    options?: ReadFileOptions
  ): string | undefined {
    try {
      return Util.readFile(filepath, options);
    } catch {
      return undefined;
    }
  }

  /**
   * Read the contents of the file and convert it to JSON.
   * @param filepath The file path of the JSON file.
   * @returns The JSON object contained in the file.
   * @throws Will throw if the content is not in valid JSON format.
   */
  public static readJson(filepath: string): Json {
    const text = Util.readFile(filepath);
    return JSON.parse(text) as Json;
  }

  /**
   * Retrieve the contents of the file and convert it to JSON
   * if the file exists and can be parsed successfully, otherwise, return `undefined`.
   * @param filepath The file path of the JSON file.
   * @returns The JSON object contained in the file, `undefined` otherwise.
   * @throws Will throw if the content is not in valid JSON format.
   */
  public static tryReadJson(filepath: string): Json | undefined {
    try {
      return Util.readJson(filepath);
    } catch {
      return undefined;
    }
  }

  /**
   * Convert all YAML objects from a single file into JSON objects.
   * @param filepath The file path of the YAML file.
   * @returns The JSON objects converted from YAML objects in the file.
   * @throws Will throw if the content is not in valid YAML format.
   */
  public static readYaml(filepath: string): Json[] {
    const text = Util.readFile(filepath);
    const yamlDocs = yaml.parseAllDocuments(text);
    return yamlDocs.map((doc) => {
      if (doc.contents && doc.contents.toJSON) {
        return doc.contents.toJSON();
      } else {
        throw new Error(`Unexpected document structure: ${doc}`);
      }
    });
  }

  /**
   * Convert all YAML objects from a single file into JSON objects
   * if the file exists and can be parsed successfully, `undefined` otherwise.
   * @param filepath The file path of the YAML file.
   * @returns The JSON objects converted from YAML objects in the file, `undefined` otherwise.
   * @throws Will throw if the content is not in valid YAML format.
   */
  public static tryReadYaml(filepath: string): Json[] | undefined {
    try {
      return Util.readYaml(filepath);
    } catch {
      return undefined;
    }
  }
  /**
   * Writes data to a file, replacing the file if it already exists.
   * @param filepath The file path that needs to be written.
   * @param data The data to write.
   * @param options The `encoding` can be set to specify the character encoding. And the `flag` can be set to specify the attributes.
   * If a flag is not provided, it defaults to `"w"`.
   */
  public static writeFile(
    filepath: string,
    data: string,
    options?: WriteFileOptions
  ): void {
    fs.writeFileSync(filepath, data, options);
  }

  /**
   * Writes JSON to a file, replacing the file if it already exists.
   * @param filepath The file path that needs to be written.
   * @param obj The JSON object to be dumped.
   */
  public static writeJson(filepath: string, obj: Json): void {
    const text = JSON.stringify(obj, null, 2);
    fs.writeFileSync(filepath, text);
  }

  /**
   * Writes multiple YAML objects to a file, replacing the file if it already exists.
   * @param filepath The file path that needs to be written.
   * @param objs The YANL objects to be dumped.
   */
  public static writeYaml(filepath: string, ...objs: Json[]): void {
    const contents = objs.map((o) =>
      yaml.stringify(o, { aliasDuplicateObjects: false })
    );
    fs.writeFileSync(filepath, contents.join("---\n"));
  }

  /**
   * Remove files and directories (modeled on the standard POSIX `rm`utility). Returns `undefined`.
   * @param p The path to the file or directory you want to remove.
   */
  public static remove(p: string, opts?: RemoveOptions): void {
    fs.rmSync(p, {
      force: opts?.force ?? true,
      recursive: opts?.recursive ?? true,
    });
  }

  /**
   * Checks if the given path is a directory and exists.
   * @param p The path to check.
   * @returns `true` if the path is an existing directory, `false` otherwise.
   */
  public static isDir(p: string): boolean {
    try {
      return fs.statSync(p).isDirectory();
    } catch {
      return false;
    }
  }

  /**
   * Gets the stats of the given path.
   * @param p The path to get stats for.
   * @returns The stats of the path, formatted as a `Metadata` object.
   */
  public static stat(p: string): Metadata {
    return this.metadata(fs.statSync(p));
  }

  /**
   * Gets the stats of the given path without following symbolic links.
   * @param p The path to get stats for.
   * @returns The stats of the path, formatted as a `Metadata` object.
   */
  public static lstat(p: string): Metadata {
    return this.metadata(fs.lstatSync(p));
  }

  /**
   * Set the permissions of the file, directory, etc.
   * Expects a permission string like `"755"` or `"644"`.
   * @param p The path of the file or directory.
   * @param permissions The mode to set as a string.
   */
  public static chmod(p: string, permissions: string): void {
    fs.chmodSync(p, parseInt(permissions, 8));
  }

  /**
   * Resolves an absolute path from a sequence of path segments.
   * @param dirs The path segments to resolve.
   * @returns The resolved absolute path.
   */
  public static absolute(...dirs: string[]): string {
    return path.resolve(...dirs);
  }

  /**
   * Extracts the extension (without the leading dot) from the path, if possible.
   *
   * @param p The path to get extension for.
   * @returns The file extension without the leading dot, or `nil` if:
   *          - The file name starts with a dot (hidden files).
   *          - There is no dot in the file name.
   *          - The dot is the last character in the file name.
   */
  public static extension(p: string): string | undefined {
    const ext = path.extname(p);
    return !ext || p === ext || p.endsWith(".") ? undefined : ext.slice(1);
  }

  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Returns the `Metadata` object based on the given `fs.Stats` object.
   * @param stats The `fs.Stats` object.
   * @returns The `Metadata` object.
   */
  private static metadata(stats: fs.Stats): Metadata {
    return {
      fileType: this.getFileType(stats),
      size: stats.size,
      permissions: this.formatPermissions(stats.mode),
      modified: Datetime.fromDate(stats.mtime),
      accessed: Datetime.fromDate(stats.atime),
      created: Datetime.fromDate(stats.birthtime),
    };
  }

  /**
   * Returns the type of the file based on the given `fs.Stats` object.
   * @param stats The `fs.Stats` object.
   * @returns The type of the file.
   */
  private static getFileType(stats: fs.Stats): FileType {
    switch (true) {
      case stats.isFile():
        return "File";
      case stats.isDirectory():
        return "Directory";
      case stats.isSymbolicLink():
        return "Symlink";
      default:
        return "Other";
    }
  }

  /**
   * Converts a numeric mode into a string representation of its permissions.
   * For example, this will convert the numeric mode `33279` into a `"755"` string.
   * @param mode The numeric mode to convert.
   * @returns A string representation of the permissions.
   */
  private static formatPermissions(mode: number): string {
    const octalString = mode.toString(8);
    return octalString.substring(octalString.length - 3);
  }
}
