import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Construct } from "constructs";
import { Api } from "./api";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { APP_AWS_TF_SYMBOL } from "./internal";
import { Logger } from "./logger";
import { Queue } from "./queue";
import { Schedule } from "./schedule";
import { Topic } from "./topic";
import {
  API_FQN,
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
  constructor(props: AppProps = {}) {
    super(props);
    new AwsProvider(this, "aws", {});

    Object.defineProperty(this, APP_AWS_TF_SYMBOL, {
      value: this,
      enumerable: false,
      writable: false,
    });
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
