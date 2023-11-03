import { mkdirSync } from "fs";
import { join } from "path";
import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Construct } from "constructs";
import stringify from "safe-stable-stringify";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { DynamodbTable } from "./dynamodb-table";
import { Function } from "./function";
import { OnDeploy } from "./on-deploy";
import { Queue } from "./queue";
import { Schedule } from "./schedule";
import { Secret } from "./secret";
import { TestRunner } from "./test-runner";
import { CdkTokens } from "./tokens";
import { Topic } from "./topic";
import { Website } from "./website";

import {
  BUCKET_FQN,
  COUNTER_FQN,
  FUNCTION_FQN,
  ON_DEPLOY_FQN,
  QUEUE_FQN,
  SECRET_FQN,
  TOPIC_FQN,
  SCHEDULE_FQN,
  WEBSITE_FQN,
} from "../cloud";
import {
  App as CoreApp,
  AppProps,
  preSynthesizeAllConstructs,
  synthesizeTree,
  Connections,
  SynthHooks,
} from "../core";
import { DYNAMODB_TABLE_FQN } from "../ex";
import { TEST_RUNNER_FQN } from "../std";
import { Util } from "../util";

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
  public readonly outdir: string;
  public readonly isTestEnvironment: boolean;
  public readonly _tokens: CdkTokens;

  public readonly _target = "awscdk";

  private readonly cdkApp: cdk.App;
  private readonly cdkStack: cdk.Stack;

  private synthed: boolean;
  private synthedOutput: string | undefined;
  private synthHooks?: SynthHooks;

  /**
   * The test runner for this app.
   */
  protected readonly testRunner: TestRunner;

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

    this.synthHooks = props.synthHooks;

    this.outdir = outdir;
    this.cdkApp = cdkApp;
    this.cdkStack = cdkStack;
    this.synthed = false;
    this.isTestEnvironment = props.isTestEnvironment ?? false;
    this._tokens = new CdkTokens();
    this.testRunner = new TestRunner(this, "cloud.TestRunner");

    this.synthRoots(props, this.testRunner);
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
    preSynthesizeAllConstructs(this);

    if (this.synthHooks?.preSynthesize) {
      this.synthHooks.preSynthesize.forEach((hook) => hook(this));
    }

    // synthesize cdk.Stack files in `outdir/cdk.out`
    this.cdkApp.synth();

    // write `outdir/tree.json`
    synthesizeTree(this, this.outdir);

    // write `outdir/connections.json`
    Connections.of(this).synth(this.outdir);

    const template = Template.fromStack(this.cdkStack);

    this.synthed = true;
    this.synthedOutput = stringify(template.toJSON(), null, 2) ?? "";
    return this.synthedOutput;
  }

  protected typeForFqn(fqn: string): any {
    switch (fqn) {
      case FUNCTION_FQN:
        return Function;

      case BUCKET_FQN:
        return Bucket;

      case COUNTER_FQN:
        return Counter;

      case SCHEDULE_FQN:
        return Schedule;

      case QUEUE_FQN:
        return Queue;

      case TOPIC_FQN:
        return Topic;

      case TEST_RUNNER_FQN:
        return TestRunner;

      case SECRET_FQN:
        return Secret;

      case ON_DEPLOY_FQN:
        return OnDeploy;

      case WEBSITE_FQN:
        return Website;

      case DYNAMODB_TABLE_FQN:
        return DynamodbTable;
    }
    return undefined;
  }
}
