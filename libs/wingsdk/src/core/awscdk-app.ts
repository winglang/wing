import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { Template } from 'aws-cdk-lib/assertions';
import { IApp, AppProps } from "./app";
import { join } from "path";
import { mkdirSync } from "fs";
import stringify from "safe-stable-stringify";
import { Polycons } from "polycons";
import { Logger } from "../cloud";

const CDK_STACK_NAME = "root";

/**
 * An app that knows how to synthesize constructs into CDK configuration.
 */
export class AwsCdkApp extends Construct implements IApp {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;

  private readonly cdkApp: cdk.App;
  private readonly cdkStack: cdk.Stack;

  constructor(props: AppProps) {
    const outdir = props.outdir ?? ".";
    const cdkOutdir = join(outdir, "./cdk.out");

    mkdirSync(cdkOutdir, { recursive: true });

    const cdkApp = new cdk.App({ outdir: cdkOutdir });
    const cdkStack = new cdk.Stack(cdkApp, CDK_STACK_NAME + cdkApp.node.addr.substring(0, 8));

    if (!props.customFactory) {
      throw new Error(
        "A custom factory must be passed to the base CdkApp class."
      );
    }
    Polycons.register(cdkStack, props.customFactory);

    super(cdkStack, "Default");

    this.outdir = outdir;
    this.cdkApp = cdkApp;
    this.cdkStack = cdkStack;

    // register a logger for this app.
    Logger.register(this);
  }

  /**
 * Synthesize the app into CDK configuration in a `cdk.out` directory.
 *
 * This method returns a cleaned snapshot of the resulting CDK template
 * for unit testing.
 */
  synth(): string {
    // synthesize cdk.Stack files in `outdir/cdk.out`
    this.cdkApp.synth();

    const template = Template.fromStack(this.cdkStack)
    return stringify(template.toJSON(), null, 2) ?? "";
  }
}