import { Construct } from "constructs";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { APP_AZURE_TF_SYMBOL } from "./internal";
import { TestRunner } from "./test-runner";
import { ApplicationInsights } from "../.gen/providers/azurerm/application-insights";
import { AzurermProvider } from "../.gen/providers/azurerm/provider";
import { ResourceGroup } from "../.gen/providers/azurerm/resource-group";
import { ServicePlan } from "../.gen/providers/azurerm/service-plan";
import { StorageAccount } from "../.gen/providers/azurerm/storage-account";
import { BUCKET_FQN, FUNCTION_FQN } from "../cloud";
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
  protected readonly testRunner: TestRunner;

  constructor(props: AzureAppProps) {
    super(props);
    this.location = props.location ?? process.env.AZURE_LOCATION;
    this.testRunner = new TestRunner(this, "cloud.TestRunner");
    this.synthRoots(props, this.testRunner);
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

  protected synthRoots(props: AppProps, testRunner: TestRunner): void {
    if (props.rootConstruct) {
      const Root = props.rootConstruct;
      if (this.isTestEnvironment) {
        new Root(this, "env0");
        const tests = testRunner.findTests();
        for (let i = 1; i < tests.length; i++) {
          new Root(this, "env" + i);
        }
      } else {
        new Root(this, "Default");
      }
    }
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

  protected tryNew(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    switch (fqn) {
      case TEST_RUNNER_FQN:
        return new TestRunner(scope, id, args[0]);

      case FUNCTION_FQN:
        return new Function(scope, id, args[0], args[1]);

      case BUCKET_FQN:
        return new Bucket(scope, id, args[0]);
    }

    return undefined;
  }
}
