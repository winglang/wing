import { Construct } from "constructs";
import { Api } from "./api";
import { App } from "./app";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
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
import { REACT_APP_FQN, REDIS_FQN, TABLE_FQN } from "../ex";
import { IPlatform } from "../platform";
import { Domain } from "../shared-aws/domain";
import { TEST_RUNNER_FQN } from "../std";

/**
 * AWS Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "tf-aws";

  public readonly parameters = {
    $id: "tf-aws-parameters",
    type: "object",
    properties: {
      "tf-aws": {
        type: "object",
        properties: {
          vpc: {
            type: "string",
            description:
              "Determine whether to create a new VPC or use an existing one",
            enum: ["new", "existing"],
          },
          vpc_id: {
            description: "If using an existing VPC, provide the VPC ID",
            type: "string",
          },
          private_subnet_ids: {
            description:
              "If using an existing VPC, provide the private subnet ID",
            type: "array",
            items: {
              type: "string",
            },
          },
          public_subnet_ids: {
            description:
              "If using an existing VPC, provide the public subnet ID",
            type: "array",
            items: {
              type: "string",
            },
          },
          vpc_api_gateway: {
            description: "Whether Api gateways should be deployed in a VPC",
            type: "boolean",
          },
          vpc_lambda: {
            description: "Whether Lambda functions should be deployed in a VPC",
            type: "boolean",
          },
        },
        allOf: [
          {
            $comment:
              "if vpc is existing, then we need to require the vpc_id, private_subnet_ids",
            if: { properties: { vpc: { const: "existing" } } },
            then: {
              required: ["vpc_id", "private_subnet_ids"],
            },
          },
        ],
      },
    },
  };

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

      case ENDPOINT_FQN:
        return Endpoint;
    }

    return undefined;
  }
}
