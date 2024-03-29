import { Construct } from "constructs";
import { App } from "./app";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { TestRunner } from "./test-runner";
import { BUCKET_FQN, COUNTER_FQN, FUNCTION_FQN } from "../cloud";
import { IPlatform } from "../platform";
import { TEST_RUNNER_FQN } from "../std";

/**
 * Azure Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "tf-azure";

  public newApp(appProps: any): any {
    return new App(appProps);
  }

  public newInstance(
    type: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    const Type = this.typeForFqn(type);
    if (!Type) {
      throw new Error(`Unsupported resource type: ${type}`);
    }

    return new Type(scope, id, ...args);
  }

  public typeForFqn(fqn: string): any {
    switch (fqn) {
      case TEST_RUNNER_FQN:
        return TestRunner;

      case FUNCTION_FQN:
        return Function;

      case BUCKET_FQN:
        return Bucket;

      case COUNTER_FQN:
        return Counter;
    }

    return undefined;
  }
}
