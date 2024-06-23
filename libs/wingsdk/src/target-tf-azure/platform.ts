import { App } from "./app";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { TestRunner } from "./test-runner";
import { BUCKET_FQN, COUNTER_FQN, FUNCTION_FQN } from "../cloud";
import { AppProps } from "../core";
import { IPlatformProvider } from "../platform";
import { TEST_RUNNER_FQN } from "../std";

/**
 * Azure Terraform Platform
 */
export class Platform implements IPlatformProvider {
  /** Platform model */
  public readonly target = "tf-azure";

  public resolveType(fqn: string) {
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

  public createApp(props: AppProps): App {
    return new App(props);
  }
}
