import { mkdirSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import stringify from "safe-stable-stringify";
import { Bucket } from "./bucket";
import { Function } from "./function";
import { Logger } from "./logger";
import { PluginManager } from "../core/plugin-manager";

import { App as CoreApp, AppProps, preSynthesizeAllConstructs } from "../core";
import {
  BUCKET_FQN,
  FUNCTION_FQN,
  LOGGER_FQN,
} from "../cloud";

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
export class App extends CoreApp {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;

  private readonly cdkApp: cdk.App;
  private readonly cdkStack: cdk.Stack;
  private readonly pluginManager: PluginManager;
  private synthed: boolean;
  private synthedOutput: string | undefined;

  constructor(props: CdkAppProps) {

    const stackName = props.stackName ?? process.env.CDK_STACK_NAME;
    if (stackName === undefined) {
      throw new Error(
        "A CDK stack name must be specified through the CDK_STACK_NAME environment variable."
      );
    }

    const outdir = props.outdir ?? ".";
    const cdkOutdir = join(outdir, ".");

    mkdirSync(cdkOutdir, { recursive: true });

    const cdkApp = new cdk.App({ outdir: cdkOutdir });
    const cdkStack = new cdk.Stack(cdkApp, stackName);

    super(cdkStack, "Default");

    // HACK: monkey patch the `new` method on the cdk app (which is the root of the tree) so that
    // we can intercept the creation of resources and replace them with our own.
    (cdkApp as any).new = (
      fqn: string,
      ctor: any,
      scope: Construct,
      id: string,
      ...args: any[]
    ) => this.new(fqn, ctor, scope, id, ...args);

    (cdkApp as any).newAbstract = (
      fqn: string,
      scope: Construct,
      id: string,
      ...args: any[]
    ) => this.newAbstract(fqn, scope, id, ...args);

    this.pluginManager = new PluginManager(props.plugins ?? []);

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
    this.pluginManager.preSynth(this);
    this.cdkApp.synth();

    const template = Template.fromStack(this.cdkStack);

    this.synthed = true;
    this.synthedOutput = stringify(template.toJSON(), null, 2) ?? "";
    return this.synthedOutput;
  }

  protected tryNew(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    switch (fqn) {
      case FUNCTION_FQN:
        return new Function(scope, id, args[0], args[1]);

      case BUCKET_FQN:
        return new Bucket(scope, id, args[0]);

      case LOGGER_FQN:
        return new Logger(scope, id);
    }
    return undefined;
  }
}