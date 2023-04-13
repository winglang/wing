import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { RandomProvider } from "@cdktf/provider-random/lib/provider";
import { Construct } from "constructs";
import { Bucket } from "./bucket";
import { BUCKET_FQN } from "../cloud";
import { AppProps as CdktfAppProps, CdktfApp } from "../core";

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
    }

    return undefined;
  }
}
