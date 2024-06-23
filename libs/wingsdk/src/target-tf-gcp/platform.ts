import { App } from "./app";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { Schedule } from "./schedule";
import { Table } from "./table";
import { TestRunner } from "./test-runner";
import { BUCKET_FQN, COUNTER_FQN, FUNCTION_FQN, SCHEDULE_FQN } from "../cloud";
import { AppProps } from "../core";
import { TABLE_FQN } from "../ex";
import { IApp, IPlatformProvider } from "../platform";
import { TEST_RUNNER_FQN } from "../std";

/**
 * GCP Terraform Platform
 */
export class Platform implements IPlatformProvider {
  /** Platform model */
  public readonly target = "tf-gcp";

  public createApp(props: AppProps): IApp {
    return new App(props);
  }

  public onSynth(): string {
    throw new Error("Method not implemented.");
  }

  public resolveType(fqn: string) {
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
