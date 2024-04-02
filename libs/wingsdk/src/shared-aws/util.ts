export function isValidArn(arn: string, service: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Token } = require("cdktf");

  // if the ARN is an unresolved token, we can't validate it so assume it's valid
  if (Token.isUnresolved(arn)) {
    return true;
  }

  // ARN format: arn:partition:service:region:account-id:resource-type?:resource
  // e.g. arn:aws:lambda:us-east-1:111111111111:function:Function-11111111
  // or,  arn:aws:sqs:us-east-1:111111111111:Queue-11111111
  const parts = arn.split(":");
  if (parts.length < 6 || parts.length > 7) {
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
