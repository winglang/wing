import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * GCP Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly model = "tf-gcp";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}
