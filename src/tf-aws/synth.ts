import { join } from "path";
import * as aws from "@cdktf/provider-aws";
import { Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import { Construct, IConstruct } from "constructs";
import { Synthesizer as SynthesizerBase, SynthesizerProps } from "../core";
import { PolyconFactory } from "./factory";

export class Synthesizer extends SynthesizerBase {
  public readonly outdir: string;
  public readonly root: Construct;
  private readonly app: cdktf.App;

  constructor(props: SynthesizerProps) {
    super(props);
    this.outdir = props.outdir ?? ".";
    this.app = new cdktf.App({ outdir: join(this.outdir, "cdktf.out") });
    this.root = new cdktf.TerraformStack(this.app, "Stack");
    new aws.AwsProvider(this.root, "AwsProvider", {});
    Polycons.register(this.root, props.customFactory ?? new PolyconFactory());
  }

  public synth() {
    const isTerraformResource = (c: IConstruct): c is cdktf.TerraformResource =>
      c instanceof cdktf.TerraformResource;
    if (this.app.node.findAll().find(isTerraformResource)) {
      this.app.synth();
    }
  }
}
