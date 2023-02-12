import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { IApp, AppProps } from "./app";
import { join } from "path";
import { mkdirSync } from "fs";
import { Polycons } from "polycons";
// import { Logger } from "../cloud";

const CDK_STACK_NAME = "root";

export class CdkApp extends Construct implements IApp {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;

  private readonly cdkApp: cdk.App;
  // private readonly cdkStack: cdk.Stack;

  constructor(props: AppProps) {
    const outdir = props.outdir ?? ".";
    const cdkOutdir = join(outdir, ".");

    mkdirSync(cdkOutdir, { recursive: true });

    const cdkApp = new cdk.App({ outdir: cdkOutdir });
    const cdkStack = new cdk.Stack(cdkApp, CDK_STACK_NAME);

    if (!props.customFactory) {
      throw new Error(
        "A custom factory must be passed to the base CdkApp class."
      );
    }
    Polycons.register(cdkStack, props.customFactory);

    super(cdkStack, "Default");

    this.outdir = outdir;
    this.cdkApp = cdkApp;
    // this.cdkStack = cdkStack;

    // register a logger for this app.
    // Logger.register(this);
  }

  synth(): string {
    // synthesize cdk.Stack files in `outdir/.tmp.cdk.out`
    this.cdkApp.synth();

    return "";
  }

  /**
   * Move files from `outdir/.tmp.cdk.out` to `outdir`.
   */
  // private moveCdkArtifactsToOutdir(): void {
  // }
}