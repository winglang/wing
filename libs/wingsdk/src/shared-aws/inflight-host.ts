import { PolicyStatement } from "./types";
import { IInflightHost } from "../std";

/**
 * Represents an inflight host on AWS.
 */
export class AwsInflightHost {
  /**
   * Casts an object to `IAwsInflighHost` or returns `undefined` if it's not one.
   */
  public static from(obj: any): IAwsInflightHost | undefined {
    if (this.isAwsInflightHost(obj)) {
      return obj;
    } else {
      return undefined;
    }
  }

  /**
   * Returns `true` if `obj` implements `IAwsInflightHost`.
   */
  public static isAwsInflightHost(obj: any): obj is IAwsInflightHost {
    return (
      typeof obj.addPolicyStatements === "function" &&
      typeof obj.addNetwork === "function"
    );
  }

  private constructor() {}
}

/**
 * Represents an `IInflightHost` on AWS.
 */
export interface IAwsInflightHost extends IInflightHost {
  /**
   * Add policy statements to the function's IAM role.
   */
  addPolicyStatements(...policies: PolicyStatement[]): void;

  /**
   * Adds the host to the specified network.
   * @param config The network configuration.
   */
  addNetwork(config: NetworkConfig): void;
}

/**
 * Function network configuration used to hold data on subnets and security groups that should be
 * used when a function is deployed within a VPC.
 */
export interface NetworkConfig {
  /**
   * List of subnets to attach on function
   **/
  readonly subnetIds: string[];

  /**
   * List of security groups to place function in
   **/
  readonly securityGroupIds: string[];
}
