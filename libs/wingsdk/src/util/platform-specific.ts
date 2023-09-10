import { readFileSync } from "fs";
import { parse } from "yaml";

const getPlatformSpecificValue = (
  path: string,
  argument: string,
  wingValues: string
): string | undefined => {
  if (wingValues) {
    const valuesList = wingValues.split(",");
    for (const v of valuesList) {
      const x = v.split("=");

      const lastDotIndex = x[0].lastIndexOf(".");
      const pathPart = x[0].substring(0, lastDotIndex);
      const argumentPart = x[0].substring(lastDotIndex + 1);

      if (pathPart === path && argumentPart === argument) {
        return x[1];
      }
    }
  }

  return;
};

const getPlatformSpecificValuesFromFile = (path: string, file: string) => {
  const data = readFileSync(file);
  const yamlObj = parse(data.toString());
  return yamlObj[`${path}`];
};

export const getPlatformSpecificValues = (
  path: string,
  ...args: string[]
): { [key: string]: string | undefined } | undefined => {
  const wingValues = process.env.WING_VALUES;
  const wingValuesFile = process.env.WING_VALUES_FILE;
  if (!wingValues && !wingValuesFile) return;

  let result: { [key: string]: string | undefined } = {};
  if (wingValues) {
    for (const argument of args) {
      result[`${argument}`] = getPlatformSpecificValue(
        path,
        argument,
        wingValues
      );
    }
  } else if (wingValuesFile) {
    result = getPlatformSpecificValuesFromFile(path, wingValuesFile);
  }
  return result;
};
