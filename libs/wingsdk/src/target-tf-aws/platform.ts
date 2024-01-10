import { Construct } from "constructs";
import { Api } from "./api";
import { App } from "./app";

import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { DynamodbTable } from "./dynamodb-table";
import { Endpoint } from "./endpoint";
import { Function } from "./function";
import { OnDeploy } from "./on-deploy";
import { Queue } from "./queue";
import { ReactApp } from "./react-app";
import { Redis } from "./redis";
import { Schedule } from "./schedule";
import { Secret } from "./secret";
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
  TOPIC_FQN,
  WEBSITE_FQN,
} from "../cloud";

import { REDIS_FQN, TABLE_FQN, REACT_APP_FQN, DYNAMODB_TABLE_FQN } from "../ex";
import { IPlatform } from "../platform";
import { Domain } from "../shared-aws/domain";
import { TEST_RUNNER_FQN } from "../std";

/**
 * AWS Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "tf-aws";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }

  public newInstance(fqn: string, scope: Construct, id: string, ...props: any) {
    const type = this.typeForFqn(fqn);
    if (!type) {
      return undefined;
    }

    return new type(scope, id, ...props);
  }

  public typeForFqn(fqn: string): any {
    switch (fqn) {
      case API_FQN:
        return Api;

      case FUNCTION_FQN:
        return Function;

      case BUCKET_FQN:
        return Bucket;

      case QUEUE_FQN:
        return Queue;

      case TOPIC_FQN:
        return Topic;

      case COUNTER_FQN:
        return Counter;

      case SCHEDULE_FQN:
        return Schedule;

      case TABLE_FQN:
        return Table;

      case TOPIC_FQN:
        return Topic;

      case TEST_RUNNER_FQN:
        return TestRunner;

      case REDIS_FQN:
        return Redis;

      case WEBSITE_FQN:
        return Website;

      case SECRET_FQN:
        return Secret;

      case ON_DEPLOY_FQN:
        return OnDeploy;

      case DOMAIN_FQN:
        return Domain;

      case REACT_APP_FQN:
        return ReactApp;

      case DYNAMODB_TABLE_FQN:
        return DynamodbTable;

      case ENDPOINT_FQN:
        return Endpoint;
    }

    return undefined;
  }
}
