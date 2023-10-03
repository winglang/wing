import { Construct } from "constructs";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { GoogleProvider } from "../.gen/providers/google/provider";
import { RandomProvider } from "../.gen/providers/random/provider";
import { BUCKET_FQN, FUNCTION_FQN } from "../cloud";
import { AppProps as CdktfAppProps } from "../core";
import { CdktfApp } from "../shared-tf/app";

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

  public readonly _target = "tf-gcp";

  constructor(props: AppProps) {
    super(props);

    this.projectId = props.projectId ?? process.env.GOOGLE_PROJECT_ID;
    // Using env variable for location is work around until we are
    // able to implement https://github.com/winglang/wing/issues/493 (policy as infrastructure)
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

    new GoogleProvider(this, "google", {
      project: this.projectId,
      region: this.region,
    });
    new RandomProvider(this, "random");

    if (props.rootConstruct) {
      const Root = props.rootConstruct;
      if (this.isTestEnvironment) {
        throw new Error("wing test not supported for tf-gcp target yet");
      } else {
        new Root(this, "Default");
      }
    }
  }

  protected tryNew(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    switch (fqn) {
      case BUCKET_FQN:
        return new Bucket(scope, id, args[0]);
      case FUNCTION_FQN:
        return new Function(scope, id, args[0], args[1]);
    }

    return undefined;
  }
}
