import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { IConstruct } from "constructs";
import { Polycons } from "polycons";
import { IApp, CdktfApp, AppProps } from "../core";
import { PolyconFactory } from "./factory";

/**
 * Azure app props
 */
export interface AzureAppProps extends AppProps {
  /** Location for resources to be deployed to */
  readonly location: string;
}

/**
 * An app that knows how to synthesize constructs into a Terraform configuration
 * for Azure resources.
 */
export class App extends CdktfApp implements IApp {
  /**
   * Recursively search scope of node to find nearest instance of App
   *
   * @param construct to consider as instance of App
   * @returns App
   */
  public static of(construct?: IConstruct): App | undefined {
    if (construct === undefined) {
      return undefined;
    }
    // Consider cleaner ways to check if construct is instance of App.
    const app = construct as App;
    return app.appType === "TF_AZURE_APP" ? app : App.of(construct.node.scope);
  }

  /** The app type */
  public readonly appType = "TF_AZURE_APP";
  /** The apps props */
  public readonly props: AzureAppProps;

  constructor(props: AzureAppProps) {
    super(props);
    this.props = props;
    Polycons.register(this, props.customFactory ?? new PolyconFactory());
    new AzurermProvider(this, "azure", { features: {} });
  }
}
