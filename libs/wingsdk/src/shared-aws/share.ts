import * as cloud from "../cloud";

export const COUNTER_HASH_KEY = "id";

export function calculateBucketPermissions(arn: string, ops: string[]): { [key: string]: any }[] {

  let policies = [];
  if (ops.includes(cloud.BucketInflightMethods.PUT)) {
    policies.push({
      effect: "Allow",
      actions: ["s3:PutObject*", "s3:Abort*"],
      resources: [`${arn}`, `${arn}/*`],
    });
  }
  if (
    ops.includes(cloud.BucketInflightMethods.GET) ||
    ops.includes(cloud.BucketInflightMethods.GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.LIST) ||
    ops.includes(cloud.BucketInflightMethods.PUBLIC_URL)
  ) {
    policies.push({
      effect: "Allow",
      actions: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
      resources: [`${arn}`, `${arn}/*`],
    });
  }
  if (ops.includes(cloud.BucketInflightMethods.DELETE)) {
    policies.push({
      effect: "Allow",
      actions: [
        "s3:DeleteObject*",
        "s3:DeleteObjectVersion*",
        "s3:PutLifecycleConfiguration*",
      ],
      resources: [`${arn}`, `${arn}/*`],
    });
  }

  return policies;
}