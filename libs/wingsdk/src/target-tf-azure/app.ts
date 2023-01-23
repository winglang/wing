import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { IConstruct } from "constructs";
import { PolyconFactory } from "./factory";
import { APP_AZURE_TF_SYMBOL } from "./internal";
import { IApp, CdktfApp, AppProps } from "../core";

/**
 * Azure app props
 */
export interface AzureAppProps extends AppProps {
  /** Location for resources to be deployed to */
  readonly location: string;
}

/**
 * ResourceGroup names are limited to 90 characters.
 * You can use alphanumeric characters, hyphens, and underscores,
 * parentheses and periods.
 */
const RESOURCEGROUP_NAME_OPTS: NameOptions = {
  maxLen: 90,
  disallowedRegex: /([^a-zA-Z0-9\-\_\(\)\.]+)/g,
};

/**
 * StorageAccount names are limited to 24 characters.
 * You can only use alphanumeric characters.
 */
const STORAGEACCOUNT_NAME_OPTS: NameOptions = {
  maxLen: 24,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /([^a-z0-9]+)/g,
  sep: "",
};

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
  public readonly resourceGroup: ResourceGroup;
  public readonly storageAccount: StorageAccount;

  constructor(props: AzureAppProps) {
    super({
      ...props,
      customFactory: props.customFactory ?? new PolyconFactory(),
    });
    this.location = props.location ?? process.env.AZURE_LOCATION;
    // Using env variable for location is work around until we are
    // able to implement https://github.com/winglang/wing/issues/493 (policy as infrastructure)
    if (this.location === undefined) {
      throw new Error(
        "Location must be specified in the AZURE_LOCATION environment variable"
      );
    }

    new AzurermProvider(this, "azure", { features: {} });

    Object.defineProperty(this, APP_AZURE_TF_SYMBOL, {
      value: this,
      enumerable: false,
      writable: false,
    });

    // Create a resource group and storage account for all resources in this app
    this.resourceGroup = new ResourceGroup(this, "ResourceGroup", {
      location: this.location,
      name: ResourceNames.generateName(this, RESOURCEGROUP_NAME_OPTS),
    });

    this.storageAccount = new StorageAccount(this, "StorageAccount", {
      name: ResourceNames.generateName(this, STORAGEACCOUNT_NAME_OPTS),
      resourceGroupName: this.resourceGroup.name,
      location: this.resourceGroup.location,
      accountTier: "Standard",
      accountReplicationType: "LRS",
    });
  }
}
