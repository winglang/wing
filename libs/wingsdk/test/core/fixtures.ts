import { Construct } from "constructs";
import { Synthesizer, SynthesizerProps } from "../../src/core";

/**
 * A synthesizer that doesn't synthesize anything in its root.
 */
export class NoopSynthesizer extends Synthesizer {
  public readonly root: Construct;
  public readonly outdir: string;
  constructor(props: SynthesizerProps) {
    super(props);

    this.outdir = props.outdir ?? ".";
    this.root = new Construct(null as any, "");
  }
  public synth(): void {
    return;
  }
}
