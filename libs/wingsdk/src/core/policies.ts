/**
 * Utility methods for working with policies.
 */
export class Policies {
  /**
   * Given a list of operations to call on `ops` called on `policy`, calculate a
   * list of corresponding operations to call on `resource`.
   *
   * @param ops The operations to call from `policy`
   * @param policy The policy of the original resource
   * @param target The name of the resource we want a list of operations for
   * @returns A list of operations for `target`
   */
  public static make(
    ops: string[],
    policy: ResourcePolicy,
    target: string
  ): string[] {
    const targetOps = new Set<string>();

    // Iterate over the operations we want to call from `policy`
    for (const op of ops) {
      // Get the resource's policy for the operation (e.g. any sub-resources it needs to call)
      const subpolicy = policy[op];
      if (!subpolicy) {
        throw new Error(
          `Resource does not have a policy for operation "${op}"`
        );
      }

      // If the original resource does not perform any operations on `target` when
      // calling `op`, skip it
      if (!subpolicy[target]) {
        continue;
      }

      // Add the operations that the original resource performs on `target`
      for (const subOp of subpolicy[target].ops ?? []) {
        targetOps.add(subOp);
      }
    }

    return Array.from(targetOps);
  }
}

/**
 * A resource's policy. It specifies what operations may be called on the
 * resource, and what sub-resources those operations may access.
 *
 * @example
 * The following policy says that the resource has a method named "handle"
 * that may call "put" on a resource named "inner", or it may call "get" on a
 * resource passed as an argument named "other".
 * { "handle": { "inner": { methods: ["put"] }, "$arg:other": { methods: ["get"] } } }
 */
export interface ResourcePolicy {
  [operation: string]: OperationPolicy;
}

/**
 * A policy specifying what resources an operation may access.
 *
 * The following example policy says that the operation may call "put" on a
 * resource named "inner", or it may call "get" on a resource passed as an
 * argument named "other".
 * @example
 * { "inner": { methods: ["put"] }, "$arg:other": { methods: ["get"] } }
 */
export interface OperationPolicy {
  [resource: string]: {
    ops: string[];
  };
}
