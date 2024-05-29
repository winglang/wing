import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { PolicySchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { fqnForType } from "../constants";
import { LiftMap } from "../core";
import { PolicyStatement, ToSimulatorOutput } from "../simulator";
import { IResource, Node, Resource } from "../std";

export const POLICY_FQN = fqnForType("sim.Policy");

/**
 * Options for `sim.Policy`.
 */
export interface PolicyProps {
  /**
   * The resource to which the policy is attached.
   */
  readonly principal: IResource;
}

/**
 * Implementation of `sim.Policy`.
 */
export class Policy extends Resource implements ISimulatorResource {
  private readonly statements: Map<IResource, Set<string>> = new Map();
  private readonly principal: IResource;

  constructor(scope: Construct, id: string, props: PolicyProps) {
    super(scope, id);
    this.principal = props.principal;
    Node.of(this).hidden = true;
    Node.of(this).title = "Policy";
    Node.of(this).description = "A simulated resource policy";
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {};
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

  public toSimulator(): ToSimulatorOutput {
    const statements: Array<PolicyStatement> = [];
    for (const [resource, ops] of this.statements.entries()) {
      for (const op of ops) {
        statements.push({
          resourceHandle: simulatorHandleToken(resource),
          operation: op,
        });
      }
    }
    const props: PolicySchema = {
      principal: simulatorHandleToken(this.principal),
      statements,
    };
    return {
      type: POLICY_FQN,
      props,
    };
  }
}

/**
 * Inflight interface for `Policy`.
 */
export interface IPolicyClient {}
