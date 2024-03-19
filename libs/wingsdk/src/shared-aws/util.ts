import { Token } from "cdktf";

export function isValidArn(arn: string, service: string) {
  // if the ARN is an unresolved token, we can't validate it so assume it's valid
  if (Token.isUnresolved(arn)) {
    return true;
  }

  const parts = arn.split(":");
  if (parts.length !== 6) {
    return false;
  }

  if (parts[0] !== "arn") {
    return false;
  }

  if (parts[2] !== service) {
    return false;
  }

  return true;
}
