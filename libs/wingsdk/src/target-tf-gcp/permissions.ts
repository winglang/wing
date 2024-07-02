import * as cloud from "../cloud";

export function createBucketPermissions(ops: string[]): string[] {
  const permissions: string[] = [];

  if (ops.includes(cloud.BucketInflightMethods.PUBLIC_URL)) {
    permissions.push("roles/storage.insightsCollectorService");
  }

  if (
    ops.includes(cloud.BucketInflightMethods.DELETE) ||
    ops.includes(cloud.BucketInflightMethods.TRY_DELETE) ||
    ops.includes(cloud.BucketInflightMethods.COPY) ||
    ops.includes(cloud.BucketInflightMethods.RENAME)
  ) {
    permissions.push("roles/storage.objectUser");
    return permissions;
  }

  if (
    ops.includes(cloud.BucketInflightMethods.PUT) ||
    ops.includes(cloud.BucketInflightMethods.PUT_JSON) ||
    ops.includes(cloud.BucketInflightMethods.SIGNED_URL)
  ) {
    permissions.push("roles/storage.objectCreator");
  }

  if (
    ops.includes(cloud.BucketInflightMethods.GET) ||
    ops.includes(cloud.BucketInflightMethods.GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.EXISTS) ||
    ops.includes(cloud.BucketInflightMethods.METADATA) ||
    ops.includes(cloud.BucketInflightMethods.PUBLIC_URL) ||
    ops.includes(cloud.BucketInflightMethods.LIST) ||
    ops.includes(cloud.BucketInflightMethods.SIGNED_URL)
  ) {
    permissions.push("roles/storage.objectViewer");
  }

  return permissions;
}

export function calculateCounterPermissions(ops: string[]): string[] {
  const permissions: string[] = [];

  if (
    ops.includes(cloud.CounterInflightMethods.INC) ||
    ops.includes(cloud.CounterInflightMethods.DEC) ||
    ops.includes(cloud.CounterInflightMethods.SET) ||
    ops.includes(cloud.CounterInflightMethods.PEEK)
  ) {
    permissions.push("roles/datastore.user");
  }

  return permissions;
}
