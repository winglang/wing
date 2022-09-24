import { IPolyconFactory } from "@monadahq/polycons";
import { Construct } from "constructs";

export interface SynthesizerProps {
  readonly outdir?: string;
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
