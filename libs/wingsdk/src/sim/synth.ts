import { mkdirSync } from "fs";
import { join } from "path";
import { Polycons } from "@monadahq/polycons";
import { Construct } from "constructs";
import { Synthesizer as SynthesizerBase, SynthesizerProps } from "../core";
import { App } from "./app";
import { PolyconFactory } from "./factory";
import { isResource } from "./resource";

export class Synthesizer extends SynthesizerBase {
  public readonly outdir: string;
  public readonly root: Construct;
  private readonly app: App;

  constructor(props: SynthesizerProps = {}) {
    super(props);
    this.outdir = props.outdir ?? ".";
    const artifactdir = join(this.outdir, "sim.out");
    this.app = new App({ outdir: artifactdir });
    this.root = this.app;
    mkdirSync(artifactdir, { recursive: true });
    Polycons.register(this.root, props.customFactory ?? new PolyconFactory());
  }

  public synth() {
    if (this.app.node.findAll().find(isResource)) {
      this.app.synth();
    }
  }
}
