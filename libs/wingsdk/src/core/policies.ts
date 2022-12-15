import { IResource } from "./resource";

/**
 * Utility methods for working with policies.
 */
export class Policies {
  /**
   * Generates the policy for `resource` given the methods that `policy` wants
   * to use on it.
   *
   * For example, given a policy that says "call `handle` on `resource`" and an
   * actual reference to `resource`, this function will return a new policy that
   * says "call `put_something` on `resource.inner`" using the information in
   * `resource._policies`. This policy can then be passed to resource._bind().
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
      if (!subpolicy) {
        throw new Error(
          `Resource ${resourceName} (${resource.node.path}) does not have a policy for method "${method}"`
        );
      }

      // Merge the policy with the current policy we've built up
      Policies.merge(newPolicy, subpolicy);
      // Add a special annotation that says the method was called on `resource`
      Policies.merge(newPolicy, { $self: { methods: [method] } });
    }

    return newPolicy;
  }

  /**
   * Merge policy2 into the policy1 object.
   */
  public static merge(policy1: OperationPolicy, policy2: OperationPolicy) {
    for (const resource in policy2) {
      if (Object.keys(policy1).includes(resource)) {
        policy1[resource].methods.push(...policy2[resource].methods);
      } else {
        policy1[resource] = policy2[resource];
      }
    }
    return policy1;
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
