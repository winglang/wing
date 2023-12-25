import { Construct } from "constructs";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { CloudfunctionsFunctionIamMember } from "../.gen/providers/google/cloudfunctions-function-iam-member";
import { StorageBucketIamMember } from "../.gen/providers/google/storage-bucket-iam-member";
import * as cloud from "../cloud";

export enum RoleType {
  STORAGE_READ = "roles/storage.objectViewer",
  STORAGE_READ_WRITE = "roles/storage.objectUser",
  FUNCTION_INVOKER = "roles/cloudfunctions.invoker",
  FUNCTION_VIEWER = "roles/cloudfunctions.viewer",
}

export function addFunctionPermission(
  host: Function,
  scopedResource: Function,
  permission: RoleType
) {
  new CloudfunctionsFunctionIamMember(
    host,
    createMemberPermissionId(host, scopedResource, permission),
    {
      project: scopedResource.project,
      region: scopedResource.region,
      cloudFunction: scopedResource.functionName,
      role: permission,
      member: `serviceAccount:${host.serviceAccountEmail}`,
    }
  );
}

function createMemberPermissionId(
  host: Function,
  resource: Construct,
  permission: string
): string {
  return `MemberPermission-${permission.replace(
    /[.\\\/]/g,
    "-"
  )}-${resource.node.addr.slice(-8)}-${host.node.addr.slice(-8)}`;
}

export function addBucketPermission(
  host: Function,
  bucket: Bucket,
  permission: RoleType
) {
  new StorageBucketIamMember(
    host,
    createMemberPermissionId(host, bucket, permission),
    {
      bucket: bucket.bucket.name,
      role: permission,
      member: `serviceAccount:${host.serviceAccountEmail}`,
    }
  );
}

export function calculateBucketPermissions(ops: string[]): string[] {
  const permissions = [];

  if (
    ops.includes(cloud.BucketInflightMethods.GET) ||
    ops.includes(cloud.BucketInflightMethods.GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.EXISTS)
  ) {
    permissions.push("storage.objects.get");
  }

  if (
    ops.includes(cloud.BucketInflightMethods.PUT) ||
    ops.includes(cloud.BucketInflightMethods.PUT_JSON)
  ) {
    permissions.push("storage.objects.create");
  }

  if (
    ops.includes(cloud.BucketInflightMethods.DELETE) ||
    ops.includes(cloud.BucketInflightMethods.PUT) ||
    ops.includes(cloud.BucketInflightMethods.PUT_JSON)
  ) {
    permissions.push("storage.objects.delete");
  }

  if (ops.includes(cloud.BucketInflightMethods.LIST)) {
    permissions.push("storage.objects.list");
  }

  return permissions;
}
