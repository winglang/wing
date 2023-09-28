/**
 * Creates a liftable type from a class or enum
 * @param type The type to lift, Should be a class or enum.
 * @param moduleSpec A module specifier that the type can be imported from. e.g. "aws-cdk-lib"
 * @param path The dotted path to the type in the module. e.g. "aws_s3.Bucket" to access `require("aws-cdk-lib").aws_s3.Bucket`
 * @returns A liftable type, either the same type or a wrapper
 */
export function toLiftableModuleType(
  type: any,
  moduleSpec: string,
  path: string
) {
  if (
    typeof type?._toInflightType === "function" ||
    type?.constructor?.name === "Object"
  ) {
    return type;
  } else {
    return {
      _toInflightType: () => `require("${moduleSpec}").${path}`,
    };
  }
}
