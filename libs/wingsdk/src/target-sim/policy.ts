import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { PolicySchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { fqnForType } from "../constants";
import { BaseResourceSchema } from "../simulator";
import { IResource, Node, Resource } from "../std";

export const POLICY_FQN = fqnForType("sim.Policy");

/**
 * Options for `sim.Policy`.
 */
export interface PolicyProps {
  /**
   * The resource to which the policy is attached.
   */
  readonly target: IResource;
}

/**
 * Implementation of `sim.Policy`.
 */
export class Policy extends Resource implements ISimulatorResource {
  private readonly statements: Map<IResource, Set<string>> = new Map();
  private readonly target: IResource;
  constructor(scope: Construct, id: string, props: PolicyProps) {
    super(scope, id);
    this.target = props.target;
    Node.of(this).hidden = true;
    Node.of(this).title = "Policy";
    Node.of(this).description = "A simulated resource policy";
  }

  /**
   * Adds a statement to the policy.
   */
  public addStatement(resource: IResource, op: string): void {
    if (!this.statements.has(resource)) {
      this.statements.set(resource, new Set());
    }
    this.statements.get(resource)!.add(op);
  }

  public toSimulator(): BaseResourceSchema {
    const statements = [];
    for (const [resource, ops] of this.statements.entries()) {
      for (const op of ops) {
        statements.push({
          resource: simulatorHandleToken(resource),
          op,
        });
      }
    }
    const schema: PolicySchema = {
      type: POLICY_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        target: simulatorHandleToken(this.target),
        statements: [],
      },
      attrs: {} as any,
    };
    return schema;
  }
}

/**
 * Inflight interface for `Policy`.
 */
export interface IPolicyClient {}
