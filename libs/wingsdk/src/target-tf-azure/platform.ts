import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * Azure Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "tf-azure";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}
