import * as cloud from "../cloud";
import { AwsTarget } from "./commons";

export function calculateBucketPermissions(
  arn: string,
  target: AwsTarget,
  ops: string[]
): { [key: string]: any }[] {
  let policy = {};
  let policies = [];
  if (
    ops.includes(cloud.BucketInflightMethods.PUT) ||
    ops.includes(cloud.BucketInflightMethods.PUT_JSON)
  ) {
    switch (target) {
      case AwsTarget.AWSCDK:
        policy = {
          effect: "Allow",
          actions: ["s3:PutObject*", "s3:Abort*"],
          resources: [`${arn}`, `${arn}/*`],
        };
        break;
      case AwsTarget.TF_AWS:
        policy = {
          effect: "Allow",
          action: ["s3:PutObject*", "s3:Abort*"],
          resource: [`${arn}`, `${arn}/*`],
        };
        break;
    }
    policies.push(policy);
  }
  if (
    ops.includes(cloud.BucketInflightMethods.GET) ||
    ops.includes(cloud.BucketInflightMethods.GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.LIST) ||
    ops.includes(cloud.BucketInflightMethods.PUBLIC_URL)
  ) {
    switch (target) {
      case AwsTarget.AWSCDK:
        policy = {
          effect: "Allow",
          actions: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
          resources: [`${arn}`, `${arn}/*`],
        };
        break;
      case AwsTarget.TF_AWS:
        policy = {
          effect: "Allow",
          action: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
          resource: [`${arn}`, `${arn}/*`],
        };
        break;
    }
    policies.push(policy);
  }
  if (ops.includes(cloud.BucketInflightMethods.DELETE)) {
    switch (target) {
      case AwsTarget.AWSCDK:
        policy = {
          effect: "Allow",
          actions: [
            "s3:DeleteObject*",
            "s3:DeleteObjectVersion*",
            "s3:PutLifecycleConfiguration*",
          ],
          resources: [`${arn}`, `${arn}/*`],
        };
        break;
      case AwsTarget.TF_AWS:
        policy = {
          effect: "Allow",
          action: [
            "s3:DeleteObject*",
            "s3:DeleteObjectVersion*",
            "s3:PutLifecycleConfiguration*",
          ],
          resource: [`${arn}`, `${arn}/*`],
        };
        break;
    }
    policies.push(policy);
  }

  return policies;
}
