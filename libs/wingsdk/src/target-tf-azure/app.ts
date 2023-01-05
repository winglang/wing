import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { IConstruct } from "constructs";
// import { Polycons } from "polycons";
import { IApp, CdktfApp, AppProps } from "../core";
import { PolyconFactory } from "./factory";
import { APP_AZURE_TF_SYMBOL } from "./internal";

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
  public static of(construct?: IConstruct): App {
    if (construct === undefined) {
      throw new Error("Unable to find app in scope");
    }

    return (construct as any)[APP_AZURE_TF_SYMBOL]
      ? (construct as App)
      : App.of(construct.node.scope);
  }

  /**
   * The location context of the App
   * @link https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group#location
   * */
  public readonly location: string;

  constructor(props: AzureAppProps) {
    super({
      ...props,
      customFactory: props.customFactory ?? new PolyconFactory(),
    });
    this.location = props.location;
    new AzurermProvider(this, "azure", { features: {} });

    Object.defineProperty(this, APP_AZURE_TF_SYMBOL, {
      value: this,
      enumerable: false,
      writable: false,
    });
  }
}
