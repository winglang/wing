import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { RandomProvider } from "@cdktf/provider-random/lib/provider";
import { IConstruct } from "constructs";
import { PolyconFactory } from "./factory";
import { AppProps as CdktfAppProps, CdktfApp, IApp } from "../core";

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
export class App extends CdktfApp implements IApp {
  /**
   * Returns the App a construct belongs to.
   */
  public static of(construct: IConstruct): App {
    if (construct instanceof App) {
      return construct;
    }

    const parent = construct.node.scope;
    if (!parent) {
      throw new Error("Cannot find a parent App");
    }

    return App.of(parent);
  }

  /**
   * The Google Cloud project ID.
   */
  public readonly projectId: string;

  /**
   * The Google Cloud storage location, used for all storage resources.
   */
  public readonly storageLocation: string;

  constructor(props: AppProps) {
    super({
      ...props,
      customFactory: props.customFactory ?? new PolyconFactory(),
    });

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
}
