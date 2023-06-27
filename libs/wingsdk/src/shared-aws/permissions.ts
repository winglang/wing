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
      actions: ["sqs:ReceiveMessage"],
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
  const policies: PolicyStatement[] = [];

  if (
    ops.includes(cloud.BucketInflightMethods.PUT) ||
    ops.includes(cloud.BucketInflightMethods.PUT_JSON)
  ) {
    policies.push({
      actions: ["s3:PutObject*", "s3:Abort*"],
      resources: [arn, `${arn}/*`],
    });
  }

  if (
    ops.includes(cloud.BucketInflightMethods.GET) ||
    ops.includes(cloud.BucketInflightMethods.GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.LIST) ||
    ops.includes(cloud.BucketInflightMethods.PUBLIC_URL)
  ) {
    policies.push({
      actions: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
      resources: [arn, `${arn}/*`],
    });
  }

  if (ops.includes(cloud.BucketInflightMethods.DELETE)) {
    policies.push({
      actions: [
        "s3:DeleteObject*",
        "s3:DeleteObjectVersion*",
        "s3:PutLifecycleConfiguration*",
      ],
      resources: [arn, `${arn}/*`],
    });
  }

  return policies;
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
