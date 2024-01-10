import { Construct } from "constructs";
import { App } from "./app";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { TestRunner } from "./test-runner";
import { BUCKET_FQN, FUNCTION_FQN } from "../cloud";
import { IPlatform } from "../platform";
import { TEST_RUNNER_FQN } from "../std";

/**
 * Azure Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "tf-azure";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }

  public newInstance(fqn: string, scope: Construct, id: string, ...props: any) {
    const type = this.typeForFqn(fqn);

    if (!type) {
      return undefined;
    }

    return new type(scope, id, ...props);
  }

  public typeForFqn(fqn: string): any {
    switch (fqn) {
      case TEST_RUNNER_FQN:
        return TestRunner;

      case FUNCTION_FQN:
        return Function;

      case BUCKET_FQN:
        return Bucket;
    }

    return undefined;
  }
}
