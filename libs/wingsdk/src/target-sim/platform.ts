import { Construct } from "constructs";
import { Api } from "./api";
import { App } from "./app";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Domain } from "./domain";
import { Endpoint } from "./endpoint";
import { Function } from "./function";
import { OnDeploy } from "./on-deploy";
import { Queue } from "./queue";
import { ReactApp } from "./react-app";
import { Redis } from "./redis";
import { Schedule } from "./schedule";
import { Secret } from "./secret";
import { Service } from "./service";
import { State, STATE_FQN } from "./state";
import { Table } from "./table";
import { TestRunner } from "./test-runner";
import { Topic } from "./topic";
import { Website } from "./website";
import {
  API_FQN,
  BUCKET_FQN,
  COUNTER_FQN,
  DOMAIN_FQN,
  ENDPOINT_FQN,
  FUNCTION_FQN,
  ON_DEPLOY_FQN,
  QUEUE_FQN,
  SCHEDULE_FQN,
  SECRET_FQN,
  SERVICE_FQN,
  TOPIC_FQN,
  WEBSITE_FQN,
} from "../cloud";
import { REACT_APP_FQN, REDIS_FQN, TABLE_FQN } from "../ex";
import { IPlatform } from "../platform";
import { TEST_RUNNER_FQN } from "../std";

/**
 * Sim Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "sim";

  public newApp(appProps: any): any {
    return new App(appProps);
  }

  public newInstance(
    type: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    const Type = this.typeForFqn(type);
    if (!Type) {
      throw new Error(`Unsupported resource type: ${type}`);
    }

    return new Type(scope, id, ...args);
  }

  public typeForFqn(fqn: string): any {
    switch (fqn) {
      case API_FQN:
        return Api;

      case BUCKET_FQN:
        return Bucket;

      case COUNTER_FQN:
        return Counter;

      case DOMAIN_FQN:
        return Domain;

      case ENDPOINT_FQN:
        return Endpoint;

      // EVENT_MAPPING_FQN skipped - it's not a multi-target construct

      case FUNCTION_FQN:
        return Function;

      case ON_DEPLOY_FQN:
        return OnDeploy;

      case QUEUE_FQN:
        return Queue;

      case REACT_APP_FQN:
        return ReactApp;

      case REDIS_FQN:
        return Redis;

      case SCHEDULE_FQN:
        return Schedule;

      case SECRET_FQN:
        return Secret;

      case SERVICE_FQN:
        return Service;

      case STATE_FQN:
        return State;

      case TABLE_FQN:
        return Table;

      case TEST_RUNNER_FQN:
        return TestRunner;

      case TOPIC_FQN:
        return Topic;

      case WEBSITE_FQN:
        return Website;
    }

    return undefined;
  }
}
