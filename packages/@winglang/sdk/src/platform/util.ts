import { existsSync, readFileSync, readdirSync } from "fs";
import * as path from "path";
import * as toml from "toml";
import * as yaml from "yaml";

/**
 * Creates a JSON object from a comma-separated list of values.
 * Where the key is the path and the value is the value.
 *
 * I.E. "foo/bar=123,foo/baz=456" would result in:
 * {
 * "foo": {
 *  "bar": "123",
 *  "baz": "456"
 *  }
 * }
 *
 * @param values a comma-separated list of values
 * @returns a JSON object with all values
 */
export function parseValuesObjectFromString(values: string) {
  const result: any = {}; // Adjusted type for nested structures

  const valuesList = values.split(",");
  valuesList.forEach((v) => {
    const [paramPath, value] = v.split("=");
    const pathParts = paramPath.split("/");
    let tempObject = result; // Start with the result object

    pathParts.forEach((part, index) => {
      // If we're at the last part, assign the value
      if (index === pathParts.length - 1) {
        tempObject[part] = value;
      } else {
        // Otherwise, initialize the part if it doesn't exist, or use the existing object
        if (!tempObject[part]) tempObject[part] = {};
        tempObject = tempObject[part];
      }
    });
  });

  return result;
}

/**
 * Extracts all fields from a JSON schema.
 *
 * @param schema the schema to extract fields from
 * @returns a set of all fields in the schema
 */
export function extractFieldsFromSchema(schema: any): Set<string> {
  const fields = new Set<string>();

  if (schema.properties) {
    for (const key of Object.keys(schema.properties)) {
      fields.add(key);
    }
  }

  return fields;
}

export function filterParametersBySchema(
  fields: Set<string>,
  parameters: any
): any {
  const filtered: any = {};

  for (const field of fields) {
    if (parameters.hasOwnProperty(field)) {
      filtered[field] = parameters[field];
    }
  }

  return filtered;
}

/**
 * Loads platform-specific values that were passed in via CLI arguments and
 * from a values file. CLI arguments take precedence over values file.
 *
 * I.E. if the cli provided values such as --value "foo/bar=123" and the values file
 * contained:
 *
 * ```yaml
 * foo:
 *  bar: 456
 *  baz: 789
 * ```
 *
 * The resulting values object would be:
 * {
 *  "foo": {
 *    "bar": "123",
 *    "baz": "789"
 *  }
 * }
 *
 * @returns a JSON object with all platform-specific values
 */
export function loadPlatformSpecificValues() {
  const cliValues = parseValuesObjectFromString(process.env.WING_VALUES ?? "");

  if (
    process.env.WING_VALUES_FILE === undefined ||
    process.env.WING_VALUES_FILE === ""
  ) {
    return cliValues;
  }

  const file = path.isAbsolute(process.env.WING_VALUES_FILE)
    ? process.env.WING_VALUES_FILE
    : path.join(process.cwd(), process.env.WING_VALUES_FILE);
  if (!existsSync(file)) {
    return cliValues;
  }
  const data = readFileSync(file, "utf-8");

  const fileExtension = path.extname(file);
  const fileValues = (() => {
    switch (fileExtension) {
      case ".yaml":
      case ".yml":
        return yaml.parse(data);
      case ".json":
        return JSON.parse(data);
      case ".toml":
        return toml.parse(data);
      default:
        throw new Error(
          `Unsupported file extension: ${fileExtension} (expected .yml, .json, or .toml)`
        );
    }
  })();
  return { ...fileValues, ...cliValues };
}

/**
 * Scans a directory for any platform files.
 *
 * @param dir the directory to scan
 * @returns the path to any platform files
 */
export function scanDirForPlatformFile(dir: string): string[] {
  const result: string[] = [];

  if (!existsSync(dir)) {
    return result;
  }

  const files = readdirSync(dir);
  for (const file of files) {
    if (file === "wplatform.js" || file.endsWith(".wplatform.js")) {
      result.push(path.join(dir, file));
    }
  }

  return result;
}
