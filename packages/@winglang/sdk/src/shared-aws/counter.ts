import { AwsInflightHost } from "./inflight-host";
import { calculateCounterPermissions } from "./permissions";
import { cloud } from "..";
import { InflightClient, LiftMap } from "../core";
import { IInflightHost } from "../std";

export const COUNTER_HASH_KEY = "id";

/**
 * A shared interface for AWS Counter.
 */
export interface IAwsCounter {
  /**
   * AWS Dynamodb arn
   */
  readonly dynamoTableArn: string;

  /**
   * AWS Dynamodb name
   */
  readonly dynamoTableName: string;
}

/**
 * Base class for AWS Counters
 */
export abstract class Counter extends cloud.Counter implements IAwsCounter {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("counter", "counter.inflight"),
      "CounterClient"
    );
  }

  /**
   * If the table is an AWS Counter, return a helper interface for
   * working with it.
   * @param counter The cloud.Counter.
   */
  public static from(counter: cloud.Counter): IAwsCounter | undefined {
    if (this.isAwsCounter(counter)) {
      return counter;
    }
    return undefined;
  }

  private static isAwsCounter(obj: any): obj is IAwsCounter {
    return (
      typeof obj.dynamoTableArn === "string" &&
      typeof obj.dynamoTableName === "string"
    );
  }

  public abstract get dynamoTableArn(): string;
  public abstract get dynamoTableName(): string;

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.CounterInflightMethods.INC]: [],
      [cloud.CounterInflightMethods.DEC]: [],
      [cloud.CounterInflightMethods.PEEK]: [],
      [cloud.CounterInflightMethods.SET]: [],
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!AwsInflightHost.isAwsInflightHost(host)) {
      throw new Error("Host is expected to implement `IAwsInfightHost`");
    }

    host.addPolicyStatements(
      ...calculateCounterPermissions(this.dynamoTableArn, ops)
    );

    host.addEnvironment(this.envName(), this.dynamoTableName);

    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $tableName: `process.env["${this.envName()}"]`,
      $initial: `${this.initial}`,
    };
  }

  private envName(): string {
    return `DYNAMODB_TABLE_NAME_${this.node.addr.slice(-8)}`;
  }
}
