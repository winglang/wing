import { PolicyStatement } from "./types";
import * as cloud from "../cloud";

export function calculateTopicPermissions(
  arn: string,
  ops: string[]
): PolicyStatement[] {
  const policies: PolicyStatement[] = [];

  if (ops.includes(cloud.TopicInflightMethods.PUBLISH)) {
    policies.push({
      actions: ["sns:Publish"],
      resources: [arn],
    });
  }

  return policies;
}

export function calculateQueuePermissions(
  arn: string,
  ops: string[]
): PolicyStatement[] {
  const policies: PolicyStatement[] = [];

  // this is always needed in order to resolve URL from ARN/name
  policies.push({
    actions: ["sqs:GetQueueUrl"],
    resources: [arn],
  });

  if (ops.includes(cloud.QueueInflightMethods.PUSH)) {
    policies.push({
      actions: ["sqs:SendMessage"],
      resources: [arn],
    });
  }

  if (ops.includes(cloud.QueueInflightMethods.PURGE)) {
    policies.push({
      actions: ["sqs:PurgeQueue"],
      resources: [arn],
    });
  }

  if (ops.includes(cloud.QueueInflightMethods.APPROX_SIZE)) {
    policies.push({
      actions: ["sqs:GetQueueAttributes"],
      resources: [arn],
    });
  }

  if (ops.includes(cloud.QueueInflightMethods.POP)) {
    policies.push({
      actions: ["sqs:ReceiveMessage", "sqs:DeleteMessage"],
      resources: [arn],
    });
  }

  return policies;
}

export function calculateCounterPermissions(
  arn: string,
  ops: string[]
): PolicyStatement[] {
  const policies: PolicyStatement[] = [];

  if (
    ops.includes(cloud.CounterInflightMethods.INC) ||
    ops.includes(cloud.CounterInflightMethods.DEC) ||
    ops.includes(cloud.CounterInflightMethods.SET)
  ) {
    policies.push({
      actions: ["dynamodb:UpdateItem"],
      resources: [arn],
    });
  }

  if (ops.includes(cloud.CounterInflightMethods.PEEK)) {
    policies.push({
      actions: ["dynamodb:GetItem"],
      resources: [arn],
    });
  }

  return policies;
}

export function calculateBucketPermissions(
  arn: string,
  ops: string[]
): PolicyStatement[] {
  const actions: string[] = [];
  // const policies: PolicyStatement[] = [];

  // contains a check if an object exists/list
  if (
    ops.includes(cloud.BucketInflightMethods.PUBLIC_URL) ||
    ops.includes(cloud.BucketInflightMethods.SIGNED_URL) ||
    ops.includes(cloud.BucketInflightMethods.LIST) ||
    ops.includes(cloud.BucketInflightMethods.EXISTS) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.TRY_DELETE) ||
    // get requires list permissions too https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/GetObjectCommand/
    ops.includes(cloud.BucketInflightMethods.GET) ||
    ops.includes(cloud.BucketInflightMethods.GET_JSON)
  ) {
    actions.push("s3:List*");
  }

  // putting an object
  if (
    ops.includes(cloud.BucketInflightMethods.PUT) ||
    ops.includes(cloud.BucketInflightMethods.PUT_JSON) ||
    ops.includes(cloud.BucketInflightMethods.SIGNED_URL) ||
    ops.includes(cloud.BucketInflightMethods.MULTIPART_UPLOAD) ||
    ops.includes(cloud.BucketInflightMethods.COMPLETE_MULTIPART_UPLOAD)
  ) {
    actions.push("s3:PutObject*", "s3:Abort*");
  }

  // getting an object
  if (
    ops.includes(cloud.BucketInflightMethods.GET) ||
    ops.includes(cloud.BucketInflightMethods.GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.METADATA) ||
    ops.includes(cloud.BucketInflightMethods.LIST) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.TRY_DELETE) ||
    ops.includes(cloud.BucketInflightMethods.PUBLIC_URL) ||
    ops.includes(cloud.BucketInflightMethods.SIGNED_URL) ||
    ops.includes(cloud.BucketInflightMethods.EXISTS)
  ) {
    actions.push("s3:GetObject*", "s3:GetBucket*");
  }

  // accessing the publicAccessBlock
  if (ops.includes(cloud.BucketInflightMethods.PUBLIC_URL)) {
    actions.push("s3:GetBucketPublicAccessBlock");
  }

  // deleting an object
  if (
    ops.includes(cloud.BucketInflightMethods.TRY_DELETE) ||
    ops.includes(cloud.BucketInflightMethods.DELETE) ||
    ops.includes(cloud.BucketInflightMethods.RENAME)
  ) {
    actions.push(
      "s3:DeleteObject*",
      "s3:DeleteObjectVersion*",
      "s3:PutLifecycleConfiguration*"
    );
  }

  // copying an object
  if (
    ops.includes(cloud.BucketInflightMethods.COPY) ||
    ops.includes(cloud.BucketInflightMethods.RENAME)
  ) {
    actions.push("s3:CopyObject");
  }

  // multipart upload signed url
  if (ops.includes(cloud.BucketInflightMethods.SIGNED_URL)) {
    actions.push("s3:UploadPart");
  }

  if (actions.length === 0) {
    return [];
  }
  return [{ actions, resources: [arn, `${arn}/*`] }];
}

export function calculateSecretPermissions(
  arn: string,
  ops: string[]
): PolicyStatement[] {
  const policies: PolicyStatement[] = [];

  if (
    ops.includes(cloud.SecretInflightMethods.VALUE) ||
    ops.includes(cloud.SecretInflightMethods.VALUE_JSON)
  ) {
    policies.push({
      actions: ["secretsmanager:GetSecretValue"],
      resources: [arn],
    });
  }

  return policies;
}
