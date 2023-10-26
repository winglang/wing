import { Construct } from "constructs";
import { App, AppProps } from "../core";

/**
 * Platform interface
 */
export interface IPlatform {
  /**
   * The model the platform is built for
   *
   * @example "sim"
   */
  readonly model: string;

  // TODO: implement newInstance https://github.com/winglang/wing/issues/4680
  // newInstance?(type: string, scope: Construct, id: string, props: any): any;

  /**
   * New App Method
   *
   * @param appProps the props to pass to the app
   */
  newApp?(appProps: AppProps): App;

  /**
   * Pre-synth hook
   *
   * @param app construct app
   */
  preSynth?(app: Construct): void;

  /**
   * Post-synth hook
   *
   * @param config generated config
   */
  postSynth?(config: any): any;

  /**
   * Validate hook
   *
   * @param config generated config
   */
  validate?(config: any): any;
}
