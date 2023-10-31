import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * AWS Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "tf-aws";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}
