import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * Azure Terraform Platform
 */
export class TFAzurePlatform implements IPlatform {
  /** Platform model */
  public readonly model = "tf-azure";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}

export const Platform = TFAzurePlatform;
