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
  readonly target: string;

  /**
   * The schema for the parameters the platform accepts
   */
  readonly parameters?: any;

  /**
   * Hooks for overriding newInstance calls
   *
   * @param type string fqn of the resource type
   * @param scope construct scope
   * @param id unique string id for resource
   * @param args args to pass to the resource
   */
  newInstance?(type: string, scope: Construct, id: string, ...args: any[]): any;

  /**
   * Hook for getting the type for an fqn
   *
   * @param fqn string fqn of the resource type
   */
  resolveType?(fqn: string): any;

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

  /**
   * Hook for creating and storing secrets
   */
  storeSecrets?(secrets: { [name: string]: string }): Promise<void>;
}
