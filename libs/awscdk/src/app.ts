import { mkdirSync } from "fs";
import { join } from "path";
import * as cdk from "aws-cdk-lib";
import { TestRunner } from "./test-runner";
import { CdkTokens } from "./tokens";
import { core } from "@winglang/sdk";
import { Util } from "@winglang/sdk/lib/util";
import { registerTokenResolver } from "@winglang/sdk/lib/core/tokens";

/**
 * AWS-CDK App props
 */
export interface CdkAppProps extends core.AppProps {
  /**
   * CDK Stack Name
   *
   * @default - read from the CDK_STACK_NAME environment variable
   */
  readonly stackName?: string;

  /**
   * A hook for customizating the way the root CDK stack is created. You can override this if you wish to use a custom stack
   * instead of the default `cdk.Stack`.
   *
   * @default - creates a standard `cdk.Stack`
   */
  readonly stackFactory?: (app: cdk.App, stackName: string, props?: cdk.StackProps) => cdk.Stack;
}

/**
 * An app that knows how to synthesize constructs into CDK configuration.
 */
export class App extends core.App {
  public readonly outdir: string;
  public readonly isTestEnvironment: boolean;

  public readonly _target = "awscdk";

  private awsAccount?: string;
  private awsRegion?: string;

  private readonly cdkApp: cdk.App;
  private readonly cdkStack: cdk.Stack;

  constructor(props: CdkAppProps) {
    const account = process.env.CDK_AWS_ACCOUNT ?? process.env.CDK_DEFAULT_ACCOUNT;
    const region = process.env.CDK_AWS_REGION ?? process.env.CDK_DEFAULT_REGION;

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

    const createStack =
      props.stackFactory ?? ((app, stackName, props) => new cdk.Stack(app, stackName, props));

    const cdkStack = createStack(cdkApp, stackName, {
      env: { account, region }
    });

    super(cdkStack, props.rootId ?? "Default", props);
    
    this.outdir = outdir;
    this.cdkApp = cdkApp;
    this.cdkStack = cdkStack;
    this.isTestEnvironment = props.isTestEnvironment ?? false;
    registerTokenResolver(new CdkTokens());

    TestRunner._createTree(this, props.rootConstruct, props.rootId);
  }

  /**
   * Synthesize the app into CDK configuration in a `cdk.out` directory.
   *
   * This method returns a cleaned snapshot of the resulting CDK template
   * for unit testing.
   */
  public synth(): string {
    // synthesize cdk.Stack files in `outdir/cdk.out`
    const a = this.cdkApp.synth();

    if (!a.stacks[0]) {
      throw new Error("No stacks were synthesized.");
    }
    
    return a.stacks[0].templateFullPath;
  }

  /**
   * The AWS account ID of the App
   */
  public get accountId(): string {
    if (!this.awsAccount) {
      this.awsAccount = this.cdkStack.account;
    }
    return this.awsAccount;
  }

  /**
   * The AWS region of the App
   */
  public get region(): string {
    if (!this.awsRegion) {
      this.awsRegion = this.cdkStack.region;
    }
    return this.awsRegion;
  }
}
