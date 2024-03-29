import { App } from "./app";
import { platform, std } from "@winglang/sdk";
import { Api } from "./api";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Endpoint } from "./endpoint";
import { Function } from "./function";
import { OnDeploy } from "./on-deploy";
import { Queue } from "./queue";
import { Schedule } from "./schedule";
import { Secret } from "./secret";
import { TestRunner } from "./test-runner";
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

/**
 * AWS CDK Platform
 */
export class Platform implements platform.IPlatform {
  /** Platform model */
  public readonly target = "awscdk";

  public newApp(appProps: any): any {
    return new App(appProps);
  }

  public typeForFqn(fqn: string): any {
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

      case ENDPOINT_FQN:
        return Endpoint;
    }
    return undefined;
  }
}
