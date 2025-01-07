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
  readonly stackFactory?: (
    app: cdk.App,
    stackName: string,
    props?: cdk.StackProps
  ) => cdk.Stack;
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

  private _vpc?: cdk.aws_ec2.IVpc;

  /** Subnets shared across app */
  public subnets: { [key: string]: (cdk.aws_ec2.ISubnet)[] };

  private readonly cdkApp: cdk.App;
  private readonly cdkStack: cdk.Stack;

  private synthed: boolean;
  private synthedOutput: string | undefined;

  constructor(props: CdkAppProps) {
    const account =
      process.env.CDK_AWS_ACCOUNT ?? process.env.CDK_DEFAULT_ACCOUNT;
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
      props.stackFactory ??
      ((app, stackName, props) => new cdk.Stack(app, stackName, props));

    const cdkStack = createStack(cdkApp, stackName, {
      env: { account, region },
    });

    super(cdkStack, props.rootId ?? "Default", props);

    this.outdir = outdir;
    this.cdkApp = cdkApp;
    this.cdkStack = cdkStack;
    this.synthed = false;
    this.isTestEnvironment = props.isTestEnvironment ?? false;
    registerTokenResolver(new CdkTokens());

    this.subnets = {
      private: [],
      public: [],
    };

    TestRunner._createTree(this, props.rootConstruct, this.isTestEnvironment);
  }

  /**
   * Returns the VPC for this app. Will create a new VPC if one does not exist.
   */
  public get vpc(): cdk.aws_ec2.IVpc {
    if (this._vpc) {
      return this._vpc;
    }

    return this.parameters.value(`${this._target}/vpc`) === "existing"
      ? this.importExistingVpc()
      : this.createDefaultVpc();
  }

  private importExistingVpc(): cdk.aws_ec2.IVpc {
    const vpcId: string = this.parameters.value(`${this._target}/vpc_id`);
    const privateSubnetIds: string[] = this.parameters.value(`${this._target}/private_subnet_ids`);
    const publicSubnetIds: string[] = this.parameters.value(`${this._target}/public_subnet_ids`);

    this._vpc = cdk.aws_ec2.Vpc.fromLookup(this, "ExistingVpc", {
      vpcId: vpcId,
    });

    for (const subnetId of privateSubnetIds) {
      this.subnets.private.push(
        cdk.aws_ec2.Subnet.fromSubnetId(this, `PrivateSubnet${subnetId.slice(-8)}`, subnetId)
      );
    }

    if (publicSubnetIds) {
      for (const subnetId of publicSubnetIds) {
        this.subnets.public.push(
          cdk.aws_ec2.Subnet.fromSubnetId(this, `PublicSubnet${subnetId.slice(-8)}`, subnetId)
        );
      }
    }

    return this._vpc;
  }

  private createDefaultVpc(): cdk.aws_ec2.IVpc {
    let app = App.of(this) as App;

    // create the app wide VPC
    this._vpc = new cdk.aws_ec2.Vpc(this, "VPC", {
      ipAddresses: cdk.aws_ec2.IpAddresses.cidr("10.0.0.0/16"),
      enableDnsHostnames: true,
      enableDnsSupport: true,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: `${app.node.id.replace(".", "")}-public-subnet-1`,
          subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 22,
          name: `${app.node.id.replace(".", "")}-private-subnet-1`,
          subnetType: cdk.aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 22,
          name: `${app.node.id.replace(".", "")}-private-subnet-2`,
          subnetType: cdk.aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });

    this.subnets.public.push(...this._vpc.publicSubnets);
    this.subnets.private.push(...this._vpc.privateSubnets);
    return this._vpc;
  }

  /**
   * Retrieve private subnet ids for the app
   */
  public get privateSubnetIds(): string[] {
    // Ensure vpc exists
    if (!this._vpc) {
      this.vpc;
    }
    return this.subnets.private.map((s) => s.subnetId);
  }

  /**
   * Retrieve public subnet ids for the app
   */
  public get publicSubnetIds(): string[] {
    // Ensure vpc exists
    if (!this._vpc) {
      this.vpc;
    }
    return this.subnets.public.map((s) => s.subnetId);
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
