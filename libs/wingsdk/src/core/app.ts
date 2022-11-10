import { IConstruct } from "constructs";

/**
 * A Wing application.
 */
export interface IApp extends IConstruct {
  /**
   * Directory where artifacts are synthesized to.
   */
  readonly outdir: string;
  /**
   * Synthesize the app into an artifact.
   */
  synth(): string;
}
