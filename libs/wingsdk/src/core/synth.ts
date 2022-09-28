import { IPolyconFactory } from "@monadahq/polycons";
import { Construct } from "constructs";

/**
 * Props for `Synth`.
 */
export interface SynthesizerProps {
  /**
   * The output directory into which to emit synthesized artifacts.
   * @default "." (the current working directory)
   */
  readonly outdir?: string;
  /**
   * A custom factory to resolve polycons.
   * @default - use the default polycon factory included in the Wing SDK
   */
  readonly customFactory?: IPolyconFactory;
}

/**
 * Handles the initialization and synthesis of constructs for a given
 * CDK framework.
 */
export abstract class Synthesizer {
  /**
   * Place in the construct tree where all users constructs will get added.
   */
  public abstract readonly root: Construct;
  /**
   * Path to the output directory. For example, if synthesizing to terraform,
   * `cdktf.out` will be created in here.
   */
  public abstract readonly outdir: string;
  constructor(props: SynthesizerProps) {
    props;
  }
  /**
   * Synthesize the app.
   */
  public abstract synth(): void;
}
