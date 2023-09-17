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
   * The Google Cloud storage location, used for all storage resources.
   * @see https://cloud.google.com/storage/docs/locations
   */
  readonly storageLocation: string;
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
   * The Google Cloud storage location, used for all storage resources.
   */
  public readonly storageLocation: string;

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

    this.storageLocation =
      props.storageLocation ?? process.env.GOOGLE_STORAGE_LOCATION;
    // Using env variable for location is work around until we are
    // able to implement https://github.com/winglang/wing/issues/493 (policy as infrastructure)
    if (this.storageLocation === undefined) {
      throw new Error(
        "A Google Cloud storage location must be specified through the GOOGLE_STORAGE_LOCATION environment variable."
      );
    }

    new GoogleProvider(this, "google", {
      project: this.projectId,
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
