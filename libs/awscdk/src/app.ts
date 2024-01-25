import { mkdirSync } from "fs";
import { join } from "path";
import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Construct } from "constructs";
import stringify from "safe-stable-stringify";
import { Api } from "./api";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { DynamodbTable } from "./dynamodb-table";
import { Endpoint } from "./endpoint";
import { Function } from "./function";
import { OnDeploy } from "./on-deploy";
import { Queue } from "./queue";
import { Schedule } from "./schedule";
import { Secret } from "./secret";
import { TestRunner } from "./test-runner";
import { CdkTokens } from "./tokens";
import { Topic } from "./topic";
import { Website } from "./website";
import { cloud } from "@winglang/sdk";

const {
  API_FQN,
  BUCKET_FQN,
  COUNTER_FQN,
  ENDPOINT_FQN,
  FUNCTION_FQN,
  ON_DEPLOY_FQN,
  QUEUE_FQN,
  SECRET_FQN,
  TOPIC_FQN,
  SCHEDULE_FQN,
  WEBSITE_FQN,
} = cloud;

import { core, std, ex } from "@winglang/sdk";
import { Util } from "@winglang/sdk/lib/util";
import { registerTokenResolver } from "@winglang/sdk/lib/core/tokens";

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

  private awsAccount?: string;
  private awsRegion?: string;

  private readonly cdkApp: cdk.App;
  private readonly cdkStack: cdk.Stack;

  private synthed: boolean;
  private synthedOutput: string | undefined;

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

    if (this._synthHooks?.preSynthesize) {
      this._synthHooks.preSynthesize.forEach((hook) => hook(this));
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

  protected typeForFqn(fqn: string): any {
    switch (fqn) {
      case API_FQN:
        return Api;

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

      case std.TEST_RUNNER_FQN:
        return TestRunner;

      case SECRET_FQN:
        return Secret;

      case ON_DEPLOY_FQN:
        return OnDeploy;

      case WEBSITE_FQN:
        return Website;

      case ex.DYNAMODB_TABLE_FQN:
        return DynamodbTable;

      case ENDPOINT_FQN:
        return Endpoint;
    }
    return undefined;
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
