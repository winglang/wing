import { IResource } from "./resource";

/**
 * Utility methods for working with policies.
 */
export class Policies {
  /**
   * Generates the transitive policy needed for `resource` given the current
   * parent policy. That is, given a policy that says "call `handle` on
   * `resource`", this function will return a policy that says "call
   * `put_something` on `resource.inner`" using the information in
   * `resource._policies`.
   *
   * @param policy The policy containing a reference to `resourceName` and the methods that may be called on it
   * @param resource The resource that `resourceName` refers to
   * @param resourceName The name of the resource in `policy`
   * @returns The transitive policy for `resource`
   */
  public static make(
    policy: OperationPolicy,
    resource: IResource,
    resourceName: string
  ): OperationPolicy {
    const newPolicy: OperationPolicy = {};

    // Iterate over the methods the given policy wants to call on `resource`
    for (const method of policy[resourceName].methods ?? []) {
      // Get the resource's policy for the method (e.g. any sub-resources it needs to call)
      const subpolicy = resource._policies[method];
      // Merge the policy with the current policy we've built up
      mergeOperationPolicies(newPolicy, subpolicy);
      // Add a special annotation that says the method was called on `resource`
      mergeOperationPolicies(newPolicy, { $self: { methods: [method] } });
    }

    return newPolicy;
  }
}

function mergeOperationPolicies(
  policy1: OperationPolicy,
  policy2: OperationPolicy
) {
  for (const resource in policy2) {
    if (Object.keys(policy1).includes(resource)) {
      policy1[resource].methods.push(...policy2[resource].methods);
    } else {
      policy1[resource] = policy2[resource];
    }
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
    methods: string[];
  };
}
