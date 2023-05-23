import { Construct } from "constructs";
import { Api } from "./api";
import { BUCKET_PREFIX_OPTS, Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { Queue } from "./queue";
import { Redis } from "./redis";
import { Schedule } from "./schedule";
import { Secret } from "./secret";
import { Table } from "./table";
import { TestRunner } from "./test-runner";
import { Topic } from "./topic";
import { Website } from "./website";
import { DataAwsCallerIdentity } from "../.gen/providers/aws/data-aws-caller-identity";
import { DataAwsRegion } from "../.gen/providers/aws/data-aws-region";
import { Eip } from "../.gen/providers/aws/eip";
import { InternetGateway } from "../.gen/providers/aws/internet-gateway";
import { NatGateway } from "../.gen/providers/aws/nat-gateway";
import { AwsProvider } from "../.gen/providers/aws/provider";
import { RouteTable } from "../.gen/providers/aws/route-table";
import { RouteTableAssociation } from "../.gen/providers/aws/route-table-association";
import { S3Bucket } from "../.gen/providers/aws/s3-bucket";
import { Subnet } from "../.gen/providers/aws/subnet";
import { Vpc } from "../.gen/providers/aws/vpc";
import {
  API_FQN,
  BUCKET_FQN,
  COUNTER_FQN,
  FUNCTION_FQN,
  QUEUE_FQN,
  SCHEDULE_FQN,
  SECRET_FQN,
  TABLE_FQN,
  TEST_RUNNER_FQN,
  TOPIC_FQN,
  WEBSITE_FQN,
} from "../cloud";
import { AppProps } from "../core";
import { REDIS_FQN } from "../redis";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { CdktfApp } from "../shared-tf/app";

/**
 * An app that knows how to synthesize constructs into a Terraform configuration
 * for AWS resources.
 */
export class App extends CdktfApp {
  /**
   * The test runner for this app.
   */
  protected readonly testRunner: TestRunner;

  private awsRegionProvider?: DataAwsRegion;
  private awsAccountIdProvider?: DataAwsCallerIdentity;
  private _vpc?: Vpc;
  private _codeBucket?: S3Bucket;

  /** Subnets shared across app */
  public subnets: { [key: string]: Subnet };

  constructor(props: AppProps = {}) {
    super(props);
    new AwsProvider(this, "aws", {});

    this.testRunner = new TestRunner(this, "cloud.TestRunner");
    this.subnets = {};
  }

  protected tryNew(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    switch (fqn) {
      case API_FQN:
        return new Api(scope, id, args[0]);

      case FUNCTION_FQN:
        return new Function(scope, id, args[0], args[1]);

      case BUCKET_FQN:
        return new Bucket(scope, id, args[0]);

      case QUEUE_FQN:
        return new Queue(scope, id, args[0]);

      case TOPIC_FQN:
        return new Topic(scope, id, args[0]);

      case COUNTER_FQN:
        return new Counter(scope, id, args[0]);

      case SCHEDULE_FQN:
        return new Schedule(scope, id, args[0]);

      case TABLE_FQN:
        return new Table(scope, id, args[0]);

      case TOPIC_FQN:
        return new Topic(scope, id, args[0]);

      case TEST_RUNNER_FQN:
        return new TestRunner(scope, id, args[0]);

      case REDIS_FQN:
        return new Redis(scope, id);

      case WEBSITE_FQN:
        return new Website(scope, id, args[0]);

      case SECRET_FQN:
        return new Secret(scope, id, args[0]);
    }

    return undefined;
  }

  /**
   * The AWS account ID of the App
   */
  public get accountId(): string {
    if (!this.awsAccountIdProvider) {
      this.awsAccountIdProvider = new DataAwsCallerIdentity(this, "account");
    }
    return this.awsAccountIdProvider.accountId;
  }

  /**
   * The AWS region of the App
   */
  public get region(): string {
    if (!this.awsRegionProvider) {
      this.awsRegionProvider = new DataAwsRegion(this, "Region");
    }
    return this.awsRegionProvider.name;
  }

  public get codeBucket(): S3Bucket {
    if (this._codeBucket) {
      return this._codeBucket;
    }
    const bucket = new S3Bucket(this, "Code");
    const bucketPrefix = ResourceNames.generateName(bucket, BUCKET_PREFIX_OPTS);
    bucket.bucketPrefix = bucketPrefix;
    this._codeBucket = bucket;
    return this._codeBucket;
  }

  /**
   * Returns the VPC for this app. Will create a new VPC if one does not exist.
   */
  public get vpc(): Vpc {
    if (this._vpc) {
      return this._vpc;
    }

    const VPC_NAME_OPTS: NameOptions = {
      maxLen: 32,
      disallowedRegex: /[^a-zA-Z0-9-]/,
    };

    const identifier = ResourceNames.generateName(this, VPC_NAME_OPTS);

    // create the app wide VPC
    this._vpc = new Vpc(this, "VPC", {
      cidrBlock: "10.0.0.0/16",
      enableDnsHostnames: true,
      enableDnsSupport: true,
      tags: {
        Name: `${identifier}-vpc`,
      },
    });

    // Create the subnets for the VPC, in order to ensure internet egress there
    // is a minimum requirement of 2 subnets, one public and one private. As well
    // as a NAT gateway and internet gateway. The NAT gateway is required to
    // allow the private subnet to route traffic to the internet. The internet
    // gateway is required to allow the NAT gateway to route traffic to the
    // internet.

    // Create the public subnet.
    // This subnet is intentionally small since most resources will be behind
    // private subnets. Incase that assumption is wrong this leaves room for 3 more /24 public subnets
    const publicSubnet = new Subnet(this, "PublicSubnet", {
      vpcId: this._vpc.id,
      cidrBlock: "10.0.0.0/24", // 10.0.0.0 - 10.0.0.255
      tags: {
        Name: `${identifier}-public-subnet-1`,
      },
    });

    // Create the private subnet
    const privateSubnet = new Subnet(this, "PrivateSubnet", {
      vpcId: this._vpc.id,
      cidrBlock: "10.0.4.0/22", // 10.0.4.0 - 10.0.7.255
      tags: {
        Name: `${identifier}-private-subnet-1`,
      },
    });

    // Create the internet gateway
    const internetGateway = new InternetGateway(this, "InternetGateway", {
      vpcId: this._vpc.id,
      tags: {
        Name: `${identifier}-internet-gateway`,
      },
    });

    // Create NAT gateway and Elastic IP for NAT
    const eip = new Eip(this, "EIP", {});
    const nat = new NatGateway(this, "NATGateway", {
      allocationId: eip.id,
      subnetId: publicSubnet.id,
      tags: {
        Name: `${identifier}-nat-gateway`,
      },
    });

    // Create route tables for public and private subnets
    const publicRouteTable = new RouteTable(this, "PublicRouteTable", {
      vpcId: this._vpc.id,
      route: [
        {
          // This will route all traffic to the internet gateway
          cidrBlock: "0.0.0.0/0",
          gatewayId: internetGateway.id,
        },
      ],
      tags: {
        Name: `${identifier}-public-route-table-1`,
      },
    });

    const privateRouteTable = new RouteTable(this, "PrivateRouteTable", {
      vpcId: this._vpc.id,
      route: [
        {
          // This will route all traffic to the NAT gateway
          cidrBlock: "0.0.0.0/0",
          natGatewayId: nat.id,
        },
      ],
      tags: {
        Name: `${identifier}-private-route-table-1`,
      },
    });

    // Associate route tables with subnets
    new RouteTableAssociation(this, "PublicRouteTableAssociation", {
      subnetId: publicSubnet.id,
      routeTableId: publicRouteTable.id,
    });

    new RouteTableAssociation(this, "PrivateRouteTableAssociation", {
      subnetId: privateSubnet.id,
      routeTableId: privateRouteTable.id,
    });

    this.subnets.public = publicSubnet;
    this.subnets.private = privateSubnet;
    return this._vpc;
  }
}
