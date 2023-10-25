import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * Sim Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly model = "sim";

  public newApp(appProps: any): any {
    return new App(appProps);
  }
}
