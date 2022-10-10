import { existsSync, mkdirSync } from "fs";
import { Polycons } from "@monadahq/polycons";
import { Construct } from "constructs";
import { Synthesizer as SynthesizerBase, SynthesizerProps } from "../core";
import { App } from "./app";
import { PolyconFactory } from "./factory";
import { isResource } from "./resource";

/**
 * Simulator synthesizer.
 */
export class Synthesizer extends SynthesizerBase {
  public readonly outdir: string;
  public readonly root: Construct;
  private readonly app: App;

  constructor(props: SynthesizerProps = {}) {
    super(props);
    this.outdir = props.outdir ?? ".";
    this.app = new App({ outdir: this.outdir });
    this.root = this.app;
    if (!existsSync(this.outdir)) {
      mkdirSync(this.outdir, { recursive: true });
    }
    Polycons.register(this.root, props.customFactory ?? new PolyconFactory());
  }

  public synth() {
    if (this.app.node.findAll().find(isResource)) {
      this.app.synth();
    }
  }
}
