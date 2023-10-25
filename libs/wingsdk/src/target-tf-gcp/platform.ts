import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * GCP Terraform Platform
 */
export class TFGCPPlatform implements IPlatform {
  /** Platform model */
  public readonly model = "tf-gcp";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}

export const Platform = TFGCPPlatform;
