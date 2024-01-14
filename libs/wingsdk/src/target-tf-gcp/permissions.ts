import * as cloud from "../cloud";

export function calculateBucketPermissions(ops: string[]): string[] {
  const permissions: string[] = [];

  if (
    ops.includes(cloud.BucketInflightMethods.GET) ||
    ops.includes(cloud.BucketInflightMethods.GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET) ||
    ops.includes(cloud.BucketInflightMethods.TRY_GET_JSON) ||
    ops.includes(cloud.BucketInflightMethods.TRY_DELETE) ||
    ops.includes(cloud.BucketInflightMethods.EXISTS) ||
    ops.includes(cloud.BucketInflightMethods.METADATA) ||
    ops.includes(cloud.BucketInflightMethods.PUBLIC_URL) ||
    ops.includes(cloud.BucketInflightMethods.COPY)
  ) {
    permissions.push("storage.objects.get");
  }

  if (
    ops.includes(cloud.BucketInflightMethods.PUT) ||
    ops.includes(cloud.BucketInflightMethods.PUT_JSON) ||
    ops.includes(cloud.BucketInflightMethods.COPY)
  ) {
    permissions.push("storage.objects.create");
  }

  if (
    ops.includes(cloud.BucketInflightMethods.DELETE) ||
    ops.includes(cloud.BucketInflightMethods.TRY_DELETE) ||
    ops.includes(cloud.BucketInflightMethods.PUT) ||
    ops.includes(cloud.BucketInflightMethods.PUT_JSON) ||
    ops.includes(cloud.BucketInflightMethods.COPY)
  ) {
    permissions.push("storage.objects.delete");
  }

  if (ops.includes(cloud.BucketInflightMethods.LIST)) {
    permissions.push("storage.objects.list");
  }

  if (ops.includes(cloud.BucketInflightMethods.PUBLIC_URL)) {
    permissions.push("storage.buckets.get");
  }

  return permissions;
}

export function calculateCounterPermissions(ops: string[]): string[] {
  const permissions: string[] = [];

  if (
    ops.includes(cloud.CounterInflightMethods.PEEK) ||
    ops.includes(cloud.CounterInflightMethods.INC) ||
    ops.includes(cloud.CounterInflightMethods.DEC)
  ) {
    permissions.push("datastore.entities.get");
  }

  if (
    ops.includes(cloud.CounterInflightMethods.PEEK) ||
    ops.includes(cloud.CounterInflightMethods.INC) ||
    ops.includes(cloud.CounterInflightMethods.DEC)
  ) {
    permissions.push("datastore.entities.create");
  }

  if (
    ops.includes(cloud.CounterInflightMethods.INC) ||
    ops.includes(cloud.CounterInflightMethods.DEC)
  ) {
    permissions.push("datastore.entities.update");
  }

  return permissions;
}
