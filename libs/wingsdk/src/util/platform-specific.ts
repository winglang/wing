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

/**
 * 
 * @param path the node path of the resource
 * @param args The arguments that should be obtained, if one argument can be
 * substituted for another, the arguments should be concatenated with "||"
 * as the separator ("iamCertificate||acmCertificateArn")
 */
export const getPlatformSpecificValues = (
  path: string,
  ...args: string[]
): { [key: string]: string | undefined } | undefined => {
  const wingValues = process.env.WING_VALUES;
  const wingValuesFile = process.env.WING_VALUES_FILE;

  let argLst: string[] = [];
  for (const x of args) {
    if (x.indexOf("||") === -1) {
      argLst.push(x);
    } else {
      argLst.push(...x.split("||"));
    }
  }

  let result: { [key: string]: string | undefined } = {};
  if (wingValues) {
    for (const argument of argLst) {
      result[`${argument}`] = getPlatformSpecificValue(
        path,
        argument,
        wingValues
      );
    }
  } else if (wingValuesFile) {
    result = getPlatformSpecificValuesFromFile(path, wingValuesFile);
  }

  let errors: Array<String> = new Array<String>();
  for (const x of args) {
    const z = getErrorsFromValues(path, x, result);
    if (z) {
      errors.push(z);
    }
  }

  if (errors.length > 0) {
    errors[0] = "\n" + errors[0];
    errors.push(
      "\nThese are required properties of platform-specific types. You can set these values"
    );
    errors.push(`either through '-v | --value' switches or '--values' file.`);
    throw new Error(errors.join("\n"));
  }

  return result;
};

const getErrorsFromValues = (
  path: string,
  values: string,
  lst: { [key: string]: string | undefined }
): string | undefined => {
  if (values.indexOf("||") === -1) {
    return lst[`${values}`]
      ? undefined
      : `  - '${values}' is missing from ${path}`;
  }

  const listValues = values.split("||");
  let valueExists = false;
  let strValuesError = "";
  for (let i = 0; i < listValues.length; i++) {
    if (lst[`${listValues[i]}`]) {
      valueExists = true;
    }

    if (i === 0) {
      strValuesError = `'${listValues[i]}'`;
    } else if (i === listValues.length - 1) {
      strValuesError += ` or '${listValues[i]}'`;
    } else {
      strValuesError += `, '${listValues[i]}'`;
    }
  }

  return valueExists
    ? undefined
    : `  - ${strValuesError} is missing from ${path}`;
};
