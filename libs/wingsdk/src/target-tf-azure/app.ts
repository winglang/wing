import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { APP_AZURE_TF_SYMBOL } from "./internal";
import { TestRunner } from "./test-runner";
import { ApplicationInsights } from "../.gen/providers/azurerm/application-insights";
import { LogAnalyticsWorkspace } from "../.gen/providers/azurerm/log-analytics-workspace";
import { AzurermProvider } from "../.gen/providers/azurerm/provider";
import { ResourceGroup } from "../.gen/providers/azurerm/resource-group";
import { ServicePlan } from "../.gen/providers/azurerm/service-plan";
import { StorageAccount } from "../.gen/providers/azurerm/storage-account";
import { BUCKET_FQN, FUNCTION_FQN, COUNTER_FQN } from "../cloud";
import { AppProps } from "../core";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { CdktfApp } from "../shared-tf/app";
import { TEST_RUNNER_FQN } from "../std";

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
 * Configuration options for generating a name for Azure Log Analytics Workspace.
 *
 * - The workspace name must be between 4 and 63 characters.
 * - The workspace name can contain only letters, numbers, and hyphens (`"-"`).
 * - The hyphen (`"-"`) should not be the first or the last character in the name.
 */
const LOG_ANALYTICS_WORKSPACE_NAME_OPTS: NameOptions = {
  maxLen: 63,
  disallowedRegex: /([^a-zA-Z0-9\-]+)/g,
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

const SERVICEPLAN_NAME_OPTS: NameOptions = {
  maxLen: 50,
  disallowedRegex: /([^a-zA-Z0-9\-]+)/g,
};

/**
 * An app that knows how to synthesize constructs into a Terraform configuration
 * for Azure resources.
 */
export class App extends CdktfApp {
  /**
   * The location context of the App
   * @link https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group#location
   * */
  public readonly location: string;
  public readonly _target = "tf-azure";
  private _resourceGroup?: ResourceGroup;
  private _storageAccount?: StorageAccount;
  private _servicePlan?: ServicePlan;
  private _applicationInsights?: ApplicationInsights;
  private _logAnalyticsWorkspace?: LogAnalyticsWorkspace;

  constructor(props: AzureAppProps) {
    super(props);
    this.location = props.location ?? process.env.AZURE_LOCATION;
    TestRunner._createTree(this, props.rootConstruct);
    // Using env variable for location is work around until we are
    // able to implement https://github.com/winglang/wing/issues/493 (policy as infrastructure)
    if (this.location === undefined) {
      throw new Error(
        "Location must be specified in the AZURE_LOCATION environment variable"
      );
    }

    new AzurermProvider(this, "azure", {
      features: {
        // To be able to run terraform destroy during tests, and in a reasonable time
        resourceGroup: { preventDeletionIfContainsResources: false },
      },
    });

    Object.defineProperty(this, APP_AZURE_TF_SYMBOL, {
      value: this,
      enumerable: false,
      writable: false,
    });
  }

  public get logAnalyticsWorkspace() {
    if (!this._logAnalyticsWorkspace) {
      this._logAnalyticsWorkspace = new LogAnalyticsWorkspace(
        this,
        "LogAnalyticsWorkspace",
        {
          location: this.location,
          resourceGroupName: this.resourceGroup.name,
          name: ResourceNames.generateName(
            this,
            LOG_ANALYTICS_WORKSPACE_NAME_OPTS
          ),
        }
      );
    }
    return this._logAnalyticsWorkspace;
  }

  public get applicationInsights() {
    if (!this._applicationInsights) {
      this._applicationInsights = new ApplicationInsights(
        this,
        `ApplicationInsights`,
        {
          name: `application-insights`,
          resourceGroupName: this.resourceGroup.name,
          location: this.resourceGroup.location,
          applicationType: "web",
          workspaceId: this.logAnalyticsWorkspace.id,
        }
      );
    }
    return this._applicationInsights;
  }

  /**
   * Get resource group using lazy initialization
   */
  public get resourceGroup() {
    if (!this._resourceGroup) {
      this._resourceGroup = new ResourceGroup(this, "ResourceGroup", {
        location: this.location,
        name: ResourceNames.generateName(this, RESOURCEGROUP_NAME_OPTS),
      });
    }
    return this._resourceGroup;
  }

  /**
   * Get storage account using lazy initialization
   */
  public get storageAccount() {
    if (!this._storageAccount) {
      this._storageAccount = new StorageAccount(this, "StorageAccount", {
        name: ResourceNames.generateName(this, STORAGEACCOUNT_NAME_OPTS),
        resourceGroupName: this.resourceGroup.name,
        location: this.resourceGroup.location,
        accountTier: "Standard",
        accountReplicationType: "LRS",
      });
    }
    return this._storageAccount;
  }

  /**
   * Get service plan using lazy initialization
   */
  public get servicePlan() {
    if (!this._servicePlan) {
      this._servicePlan = new ServicePlan(this, "ServicePlan", {
        name: ResourceNames.generateName(this, SERVICEPLAN_NAME_OPTS),
        resourceGroupName: this.resourceGroup.name,
        location: this.resourceGroup.location,
        osType: "Linux",
        // Dynamic Stock Keeping Unit (SKU)
        // https://learn.microsoft.com/en-us/partner-center/developer/product-resources#sku
        skuName: "Y1",
      });
    }
    return this._servicePlan;
  }

  protected typeForFqn(fqn: string): any {
    switch (fqn) {
      case TEST_RUNNER_FQN:
        return TestRunner;

      case FUNCTION_FQN:
        return Function;

      case BUCKET_FQN:
        return Bucket;

      case COUNTER_FQN:
        return Counter;
    }

    return undefined;
  }
}
