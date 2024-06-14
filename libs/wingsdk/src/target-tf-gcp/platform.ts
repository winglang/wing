import { Construct } from "constructs";
import { App } from "./app";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { Schedule } from "./schedule";
import { Table } from "./table";
import { TestRunner } from "./test-runner";
import { BUCKET_FQN, COUNTER_FQN, FUNCTION_FQN, SCHEDULE_FQN } from "../cloud";
import { TABLE_FQN } from "../ex";
import { IPlatform } from "../platform";
import { TEST_RUNNER_FQN } from "../std";

/**
 * GCP Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "tf-gcp";

  public newApp(appProps: any): any {
    return new App(appProps);
  }

  public newInstance(
    type: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    const Type = this.resolveType(type);
    if (!Type) {
      return new Type(scope, id, ...args);
    }

    return undefined;
  }

  public resolveType(fqn: string): any {
    switch (fqn) {
      case TEST_RUNNER_FQN:
        return TestRunner;
      case BUCKET_FQN:
        return Bucket;
      case FUNCTION_FQN:
        return Function;
      case TABLE_FQN:
        return Table;
      case COUNTER_FQN:
        return Counter;
      case SCHEDULE_FQN:
        return Schedule;
    }

    return undefined;
  }
}
