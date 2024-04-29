import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { Schedule } from "./schedule";
import { Table } from "./table";
import { TestRunner } from "./test-runner";
import { GoogleProvider } from "../.gen/providers/google/provider";
import { RandomProvider } from "../.gen/providers/random/provider";
import { BUCKET_FQN, COUNTER_FQN, FUNCTION_FQN, SCHEDULE_FQN } from "../cloud";
import { AppProps as CdktfAppProps } from "../core";
import { TABLE_FQN } from "../ex";
import { CdktfApp } from "../shared-tf/app";
import { TEST_RUNNER_FQN } from "../std";

/**
 * GCP App props.
 */
export interface AppProps extends CdktfAppProps {
  /**
   * The Google Cloud project ID.
   */
  readonly projectId: string;

  /**
   * The Google Cloud region, used for all resources.
   * @see https://cloud.google.com/functions/docs/locations
   */
  readonly region: string;

  /**
   * The Google Cloud zone, used for all resources.
   * @see https://cloud.google.com/functions/docs/locations
   */
  readonly zone: string;
}

/**
 * An app that knows how to synthesize constructs into a Terraform configuration
 * for GCP resources.
 */
export class App extends CdktfApp {
  /**
   * The Google Cloud project ID.
   */
  public readonly projectId: string;

  /**
   * The Google Cloud region, used for all resources.
   */
  public readonly region: string;

  /**
   * The Google Cloud zone.
   */
  public readonly zone: string;

  public readonly _target = "tf-gcp";

  constructor(props: AppProps) {
    super(props);

    this.projectId = props.projectId ?? process.env.GOOGLE_PROJECT_ID;
    if (this.projectId === undefined) {
      throw new Error(
        "A Google Cloud project ID must be specified through the GOOGLE_PROJECT_ID environment variable."
      );
    }

    this.region = props.region ?? process.env.GOOGLE_REGION;
    if (this.region === undefined) {
      throw new Error(
        "A Google Cloud region must be specified through the GOOGLE_REGION environment variable."
      );
    }

    this.zone = props.zone ?? `${this.region}-a`;

    new GoogleProvider(this, "google", {
      project: this.projectId,
      region: this.region,
    });
    new RandomProvider(this, "random");

    TestRunner._createTree(this, props.rootConstruct);
  }

  protected typeForFqn(fqn: string): any {
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
