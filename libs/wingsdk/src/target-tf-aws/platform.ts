import { Api } from "./api";
import { App } from "./app";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Endpoint } from "./endpoint";
import { Function } from "./function";
import { OnDeploy } from "./on-deploy";
import { Queue } from "./queue";
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
import { AppProps } from "../core";
import { TABLE_FQN, REDIS_FQN } from "../ex";
import { IApp, IPlatformProvider } from "../platform";
import { Domain } from "../shared-aws/domain";
import { TEST_RUNNER_FQN } from "../std";

/**
 * AWS Terraform Platform
 */
export class Platform implements IPlatformProvider {
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

  public createApp(props: AppProps): IApp {
    return new App(props);
  }

  public resolveType(fqn: string): any {
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

      case ENDPOINT_FQN:
        return Endpoint;
    }
  }

  public async storeSecrets(secrets: Record<string, string>): Promise<void> {
    const {
      SecretsManagerClient,
      GetSecretValueCommand,
      CreateSecretCommand,
      UpdateSecretCommand,
    } = await import("@aws-sdk/client-secrets-manager");

    console.log("Storing secrets in AWS Secrets Manager");
    const client = new SecretsManagerClient({});

    for (const [name, value] of Object.entries(secrets)) {
      try {
        // Attempt to retrieve the secret to check if it exists
        await client.send(new GetSecretValueCommand({ SecretId: name }));
        console.log(`Secret ${name} exists, updating it.`);
        await client.send(
          new UpdateSecretCommand({
            SecretId: name,
            SecretString: value,
          })
        );
      } catch (error: any) {
        if (error.name === "ResourceNotFoundException") {
          // If the secret does not exist, create it
          console.log(`Secret ${name} does not exist, creating it.`);
          await client.send(
            new CreateSecretCommand({
              Name: name,
              SecretString: value,
            })
          );
        } else {
          console.error(`Failed to store secret ${name}:`, error);
          throw error;
        }
      }
    }

    console.log(
      `${Object.keys(secrets).length} secret(s) stored AWS Secrets Manager`
    );
  }
}
