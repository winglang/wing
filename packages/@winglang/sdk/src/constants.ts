// eslint-disable-next-line @typescript-eslint/no-require-imports
const PKG = require("../package.json");

export const SDK_VERSION = PKG.version;
export const SDK_PACKAGE_NAME = PKG.name;

if (!SDK_VERSION) {
  throw new Error("SDK_VERSION is not defined");
}

if (!SDK_PACKAGE_NAME) {
  throw new Error("SDK_PACKAGE_NAME is not defined");
}

export function fqnForType(type: string) {
  return `${SDK_PACKAGE_NAME}.${type}`;
}
