import * as cloud from "../cloud";

export function calculateBucketPermissions(
  bucketId: string,
  ops: string[]
): PolicyStatement[] {
  const permissions: string[] = [];

  // Check for operations that require list permissions
  if (
    ops.includes(cloud.BucketInflightMethods.PUBLIC_URL) ||
    ops.includes(cloud.BucketInflightMethods.LIST) ||
    ops.includes(cloud.BucketInflightMethods.EXISTS) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET)
  ) {
    permissions.push("storage.objects.list");
  }

  // Operations for putting an object
  if (
    ops.includes(cloud.BucketInflightMethods.PUT) ||
    ops.includes(cloud.BucketInflightMethods.PUT_JSON)
  ) {
    permissions.push("storage.objects.create");
    permissions.push("storage.objects.update");
  }

  // Operations for getting an object
  if (
    ops.includes(cloud.BucketInflightMethods.GET) ||
    ops.includes(cloud.BucketInflightMethods.EXISTS) ||
    ops.includes(cloud.BucketInflightMethods.LIST) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET)
  ) {
    permissions.push("storage.objects.get");
  }

  // Operations for deleting an object
  if (
    ops.includes(cloud.BucketInflightMethods.TRY_DELETE) ||
    ops.includes(cloud.BucketInflightMethods.DELETE)
  ) {
    permissions.push("storage.objects.delete");
  }

  // If you need bucket-level permissions:
  if (ops.includes(cloud.BucketInflightMethods.PUBLIC_URL)) {
    permissions.push("storage.buckets.get");
  }

  return [
    {
      permissions,
      resources: [
        `projects/_/buckets/${bucketId}`,
        `projects/_/buckets/${bucketId}/*`,
      ],
    },
  ];
}

interface PolicyStatement {
  permissions: string[];
  resources: string[];
}
