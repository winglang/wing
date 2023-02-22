import { mkdirSync } from "fs";
import { join } from "path";
import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Construct } from "constructs";
import { Polycons } from "polycons";
import stringify from "safe-stable-stringify";
import { PolyconFactory } from "./factory";
import { Logger } from "../cloud";
import { IApp, AppProps, preSynthesizeAllConstructs } from "../core";

/**
 * AWS-CDK App props
 */
export interface CdkAppProps extends AppProps {
  /**
   * CDK Stack Name
   * @default - undefined
   */
  readonly stackName?: string;
}

/**
 * An app that knows how to synthesize constructs into CDK configuration.
 */
export class App extends Construct implements IApp {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;

  private readonly cdkApp: cdk.App;
  private readonly cdkStack: cdk.Stack;
  private synthed: boolean;
  private synthedOutput: string | undefined;

  constructor(props: CdkAppProps) {
    const customFactory = props.customFactory ?? new PolyconFactory();

    const stackName = props.stackName ?? process.env.CDK_STACK_NAME;
    if (stackName === undefined) {
      throw new Error(
        "A CK stack name must be specified through the CDK_STACK_NAME environment variable."
      );
    }

    const outdir = props.outdir ?? ".";
    const cdkOutdir = join(outdir, ".");

    mkdirSync(cdkOutdir, { recursive: true });

    const cdkApp = new cdk.App({ outdir: cdkOutdir });
    const cdkStack = new cdk.Stack(cdkApp, stackName);

    if (!customFactory) {
      throw new Error(
        "A custom factory must be passed to the base CdkApp class."
      );
    }
    Polycons.register(cdkStack, customFactory);

    super(cdkStack, "Default");

    this.outdir = outdir;
    this.cdkApp = cdkApp;
    this.cdkStack = cdkStack;
    this.synthed = false;

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
    if (this.synthed) {
      return this.synthedOutput!;
    }

    // call preSynthesize() on every construct in the tree
    preSynthesizeAllConstructs(this);

    // synthesize cdk.Stack files in `outdir/cdk.out`
    this.cdkApp.synth();

    const template = Template.fromStack(this.cdkStack);

    this.synthed = true;
    this.synthedOutput = stringify(template.toJSON(), null, 2) ?? "";
    return this.synthedOutput;
  }
}
