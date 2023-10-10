import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as yaml from "js-yaml";
import { InflightClient } from "../core";
import { Json } from "../std";

/**
 * Convert the path to Windows format if running on Windows.
 * @param p The path to convert.
 * @returns The Normalized path
 */
function localePath(p: string): string {
  if (process.platform !== "win32") {
    return p;
  }
  return p.split(path.posix.sep).join(path.win32.sep);
}

/**
 * Convert the path to POSIX format.
 * @param p The path to convert.
 * @returns The Normalized path.
 */
function posixPath(p: string): string {
  if (/^[A-Za-z]:/.test(p)) {
    p = p.slice(2);
  }
  return p.split(path.sep).join(path.posix.sep);
}

/**
 * Custom settings for reading file
 */
export interface ReadFileOptions {
  /**
   * The character encoding utilized for file reading.
   * @default "utf-8"
   */
  readonly encoding?: BufferEncoding;
  /**
   * The `flag` can be set to specify the attributes.
   * @default 'r'.
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
   * @default false
   */
  readonly recursive?: boolean;
  /**
   * A file mode. The string will be parsed as an octal integer.
   * @default "0o777"
   */
  readonly mode?: string;
}

/**
 * Custom settings for removing files and directories
 */
export interface RemoveOptions {
  /**
   * When `true`, exceptions will be ignored if `path` does not exist.
   * @default false
   */
  readonly force?: boolean;
  /**
   * If `true`, perform a recursive directory removal. In
   * recursive mode, operations are retried on failure.
   * @default false
   */
  readonly recursive?: boolean;
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
    return posixPath(path.join(...paths));
  }
  /**
   * Retrieve the name of the directory from a given file path.
   * @param p The path to evaluate.
   * @returns The directory name of the path.
   */
  public static dirname(p: string): string {
    return posixPath(path.dirname(p));
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
    return posixPath(path.relative(from, to));
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
    return posixPath(path.resolve(...paths));
  }
  /**
   * Check if the path exists.
   * @param p The path to evaluate.
   * @returns `true` if the path exists, `false` otherwise.
   */
  public static exists(p: string): boolean {
    const normPath = localePath(p);
    return fs.existsSync(normPath);
  }
  /**
   * Read the contents of the directory.
   * @param dirpath The path to evaluate.
   * @returns The contents of the directory.
   */
  public static readdir(dirpath: string): Array<string> {
    const normPath = localePath(dirpath);
    return fs.readdirSync(normPath);
  }
  /**
   * If the path exists, read the contents of the directory; otherwise, return `undefined`.
   * @param dirpath The path to evaluate.
   * @returns The contents of the directory if the path exists, `undefined` otherwise.
   */
  public static tryReaddir(dirpath: string): Array<string> | undefined {
    if (!Util.exists(dirpath)) {
      return undefined;
    }
    return Util.readdir(dirpath);
  }
  /**
   * Create a directory.
   * @param dirpath The path to the directory you want to create.
   */
  public static mkdir(dirpath: string, opts?: MkdirOptions): void {
    const normPath = localePath(dirpath);
    fs.mkdirSync(normPath, opts);
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
    return posixPath(dirpath);
  }
  /**
   * Read the entire contents of a file.
   * @param filepath The path of the file to be read.
   * @param options The `encoding` can be set to specify the character encoding. And the `flag` can be set to specify the attributes.
   * If a flag is not provided, it defaults to `'r'`.
   * @returns The contents of the `filepath`.
   */
  public static readFile(filepath: string, options?: ReadFileOptions): string {
    const normPath = localePath(filepath);
    const buf = fs.readFileSync(normPath, options);
    return buf.toString();
  }
  /**
   * Read the entire contents if the file exists, `undefined` otherwise.
   * @param filepath The path of the file to be read.
   * @param options The `encoding` can be set to specify the character encoding, or the `flag` can be set to specify the attributes.
   * @returns The contents of the `filepath`, `undefined` otherwise.
   */
  public static tryReadFile(
    filepath: string,
    options?: ReadFileOptions
  ): string | undefined {
    if (!Util.exists(filepath)) {
      return;
    }
    return Util.readFile(filepath, options);
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
   * Get the content of the file and convert it to JSON if the path exists, `undefined` otherwise.
   * @param filepath The file path of the JSON file.
   * @returns The JSON object contained in the file, `undefined` otherwise.
   * @throws Will throw if the content is not in valid JSON format.
   */
  public static tryReadJson(filepath: string): Json | undefined {
    if (!Util.exists(filepath)) {
      return undefined;
    }
    return Util.readJson(filepath);
  }
  /**
   * Convert all YAML objects from a single file into JSON objects.
   * @param filepath The file path of the YAML file.
   * @returns The JSON objects converted from YAML objects in the file.
   * @throws Will throw if the content is not in valid YAML format.
   */
  public static readYaml(filepath: string): Json[] {
    const text = Util.readFile(filepath);
    const yamlObjs = yaml.loadAll(text);
    return yamlObjs.map((o: any) => JSON.parse(JSON.stringify(o)) as Json);
  }
  /**
   * Convert all YAML objects from a single file into JSON objects if the path exists, `undefined` otherwise.
   * @param filepath The file path of the YAML file.
   * @returns The JSON objects converted from YAML objects in the file, `undefined` otherwise.
   * @throws Will throw if the content is not in valid YAML format.
   */
  public static tryReadYaml(filepath: string): Json[] | undefined {
    if (!Util.exists(filepath)) {
      return undefined;
    }
    return Util.readYaml(filepath);
  }
  /**
   * Writes data to a file, replacing the file if it already exists.
   * @param filepath The file path that needs to be written.
   * @param data The data to write.
   */
  public static writeFile(filepath: string, data: string): void {
    const normPath = localePath(filepath);
    fs.writeFileSync(normPath, data);
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
    const contents = objs.map((o) => yaml.dump(o, { noRefs: true }));
    fs.writeFileSync(filepath, contents.join("---\n"));
  }
  /**
   * Remove files and directories (modeled on the standard POSIX `rm`utility). Returns `undefined`.
   * @param p The path to the file or directory you want to remove.
   */
  public static remove(p: string, opts?: RemoveOptions): void {
    const normPath = localePath(p);
    fs.rmSync(normPath, opts);
  }
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }
}
