import { mkdirSync } from "fs";
import { join } from "path";
import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import stringify from "safe-stable-stringify";
import { TestRunner } from "./test-runner";
import { CdkTokens } from "./tokens";
import { core } from "@winglang/sdk";
import { Util } from "@winglang/sdk/lib/util";
import { registerTokenResolver } from "@winglang/sdk/lib/core/tokens";
import { Construct } from "constructs";

/**
 * AWS-CDK App props
 */
export interface CdkAppProps extends core.AppProps {
  /**
   * CDK Stack Name
   * @default - undefined
   */
  readonly stackName?: string;
}

/**
 * An app that knows how to synthesize constructs into CDK configuration.
 */
export class App extends core.App {
  public readonly outdir: string;
  public readonly isTestEnvironment: boolean;

  public readonly _target = "awscdk";

  private readonly cdkApp: cdk.App;
  private readonly cdkStack: cdk.Stack;

  private synthed: boolean;
  private synthedOutput: string | undefined;
  private synthHooks?: core.SynthHooks;

  constructor(props: CdkAppProps) {
    let stackName = props.stackName ?? process.env.CDK_STACK_NAME;
    if (stackName === undefined) {
      throw new Error(
        "A CDK stack name must be specified through the CDK_STACK_NAME environment variable."
      );
    }

    const outdir = props.outdir ?? ".";
    const cdkOutdir = join(outdir, ".");

    if (props.isTestEnvironment) {
      stackName += Util.sha256(outdir.replace(/\.tmp$/, "")).slice(-8);
    }

    mkdirSync(cdkOutdir, { recursive: true });

    const cdkApp = new cdk.App({ outdir: cdkOutdir });
    const cdkStack = new cdk.Stack(cdkApp, stackName);

    super(cdkStack, props.rootId ?? "Default", props);

    (cdkApp as any).newAbstract = (
      fqn: string,
      scope: Construct,
      id: string,
      ...args: any[]
    ) => this.newAbstract(fqn, scope, id, ...args);

    this.outdir = outdir;
    this.cdkApp = cdkApp;
    this.cdkStack = cdkStack;
    this.synthed = false;
    this.isTestEnvironment = props.isTestEnvironment ?? false;
    registerTokenResolver(new CdkTokens());

    TestRunner._createTree(this, props.rootConstruct);
  }

  /**
   * Synthesize the app into CDK configuration in a `cdk.out` directory.
   *
   * This method returns a cleaned snapshot of the resulting CDK template
   * for unit testing.
   */
  public synth(): string {
    if (this.synthed) {
      return this.synthedOutput!;
    }

    // call preSynthesize() on every construct in the tree
    core.preSynthesizeAllConstructs(this);

    if (this.synthHooks?.preSynthesize) {
      this.synthHooks.preSynthesize.forEach((hook) => hook(this));
    }

    // synthesize cdk.Stack files in `outdir/cdk.out`
    this.cdkApp.synth();

    // write `outdir/tree.json`
    core.synthesizeTree(this, this.outdir);

    // write `outdir/connections.json`
    core.Connections.of(this).synth(this.outdir);

    const template = Template.fromStack(this.cdkStack);

    this.synthed = true;
    this.synthedOutput = stringify(template.toJSON(), null, 2) ?? "";
    return this.synthedOutput;
  }
}
