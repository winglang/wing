import { DataAwsCallerIdentity } from "@cdktf/provider-aws/lib/data-aws-caller-identity";
import { DataAwsRegion } from "@cdktf/provider-aws/lib/data-aws-region";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Construct, IConstruct } from "constructs";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { APP_AWS_TF_SYMBOL } from "./internal";
import { Logger } from "./logger";
import { Queue } from "./queue";
import { Schedule } from "./schedule";
import { Topic } from "./topic";
import {
  BUCKET_FQN,
  COUNTER_FQN,
  FUNCTION_FQN,
  LOGGER_FQN,
  QUEUE_FQN,
  SCHEDULE_FQN,
  TOPIC_FQN,
} from "../cloud";
import { CdktfApp, AppProps } from "../core";

/**
 * An app that knows how to synthesize constructs into a Terraform configuration
 * for AWS resources.
 */
export class App extends CdktfApp {
  /**
   * Recursively search scope of node to find nearest instance of App
   *
   * @param construct to consider as instance of App
   * @returns App
   */
  public static of(construct?: IConstruct): App {
    if (construct === undefined) {
      throw new Error("Unable to find aws app in scope");
    }

    if ((construct as any)[APP_AWS_TF_SYMBOL]) {
      return construct as App;
    }

    return App.of(construct.node.scope);
  }

  private awsRegionProvider?: DataAwsRegion;
  private awsAccountIdProvider?: DataAwsCallerIdentity;

  constructor(props: AppProps = {}) {
    super(props);
    new AwsProvider(this, "aws", {});

    Object.defineProperty(this, APP_AWS_TF_SYMBOL, {
      value: this,
      enumerable: false,
      writable: false,
    });
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

  /**
   * The AWS account ID of the App
   */
  public get accountId(): string {
    if (!this.awsAccountIdProvider) {
      this.awsAccountIdProvider = new DataAwsCallerIdentity(this, "account");
    }
    return this.awsAccountIdProvider.accountId;
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

      case QUEUE_FQN:
        return new Queue(scope, id, args[0]);

      case TOPIC_FQN:
        return new Topic(scope, id, args[0]);

      case COUNTER_FQN:
        return new Counter(scope, id, args[0]);

      case SCHEDULE_FQN:
        return new Schedule(scope, id, args[0]);

      case TOPIC_FQN:
        return new Topic(scope, id, args[0]);
    }

    return undefined;
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

      case QUEUE_FQN:
        return new Queue(scope, id, args[0]);

      case TOPIC_FQN:
        return new Topic(scope, id, args[0]);

      case COUNTER_FQN:
        return new Counter(scope, id, args[0]);

      case SCHEDULE_FQN:
        return new Schedule(scope, id, args[0]);

      case TOPIC_FQN:
        return new Topic(scope, id, args[0]);
    }

    return undefined;
  }
}
