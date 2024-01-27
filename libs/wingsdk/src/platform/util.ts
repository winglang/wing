import { existsSync, readFileSync } from "fs";
import path, { extname } from "path";
import * as yaml from "yaml";
import * as toml from "toml";

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
export function createValuesObjectFromString(values: string) {
  const result: any = {}; // Adjusted type for nested structures

  const valuesList = values.split(",");
  valuesList.forEach((v) => {
    const [path, value] = v.split("=");
    const pathParts = path.split("/");
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
};

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
  const cliValues = createValuesObjectFromString(process.env.WING_VALUES ?? "");
  
  const file = path.join(process.cwd(), process.env.WING_VALUES_FILE ?? "");
  if (existsSync(file) === false) {
    const data = readFileSync(file, "utf-8");
  
    const fileExtension = extname(file);
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
          throw new Error(`Unsupported file extension: ${fileExtension}`);
      }
    })();
    return { ...fileValues, ...cliValues };
  };

  return cliValues;
};
