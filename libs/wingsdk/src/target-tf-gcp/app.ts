import { DataGoogleClientConfig } from "@cdktf/provider-google/lib/data-google-client-config";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { IConstruct } from "constructs";
import { Polycons } from "polycons";
import { AppProps as CdktfAppProps, CdktfApp, IApp } from "../core";
import { PolyconFactory } from "./factory";

/**
 * Props for {@link App}.
 */
export interface AppProps extends CdktfAppProps {
  /**
   * The Google Cloud project ID.
   */
  readonly projectId: string;
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

  private readonly clientConfig: DataGoogleClientConfig;

  constructor(props: AppProps) {
    super(props);
    Polycons.register(this, props.customFactory ?? new PolyconFactory());

    const projectId = props.projectId ?? process.env.GOOGLE_PROJECT_ID;
    if (!projectId) {
      throw new Error(
        "A Google Cloud project ID must be specified through the GOOGLE_PROJECT_ID environment variable."
      );
    }

    new GoogleProvider(this, "google", {
      project: projectId,
    });

    this.clientConfig = new DataGoogleClientConfig(this, "config", {});
  }

  /**
   * The application's default region for new resources.
   */
  public get region(): string {
    return this.clientConfig.region;
  }
}
