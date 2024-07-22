import fs from "fs";
import { join } from "path";
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
import { Schedule } from "./schedule";
import { Secret } from "./secret";
import { Service } from "./service";
import { State, STATE_FQN } from "./state";
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
    const Type = this.resolveType(type);
    if (Type) {
      return new Type(scope, id, ...args);
    }

    return undefined;
  }

  public resolveType(fqn: string): any {
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

      case SCHEDULE_FQN:
        return Schedule;

      case SECRET_FQN:
        return Secret;

      case SERVICE_FQN:
        return Service;

      case STATE_FQN:
        return State;

      case TEST_RUNNER_FQN:
        return TestRunner;

      case TOPIC_FQN:
        return Topic;

      case WEBSITE_FQN:
        return Website;

      // SIM_CONTAINER_FQN skipped - it's not a multi-target construct

      // SIM_RESOURCE_FQN skipped - it's not a multi-target construct
    }

    return undefined;
  }

  public async storeSecrets(secrets: Record<string, string>): Promise<void> {
    let existingSecretsContent = "";
    const envFile = join(process.env.WING_SOURCE_DIR!, ".env");

    try {
      existingSecretsContent = fs.readFileSync(envFile, "utf8");
    } catch (error) {}

    const existingSecrets = existingSecretsContent
      .split("\n")
      .filter((line) => line.trim() !== "")
      .reduce((s, line) => {
        const [key, value] = line.split("=", 2);
        s[key] = value;
        return s;
      }, {} as { [key: string]: string });

    for (const key in secrets) {
      existingSecrets[key] = secrets[key];
    }

    const updatedContent = Object.entries(existingSecrets)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    fs.writeFileSync(envFile, updatedContent);

    console.log(`${Object.keys(secrets).length} secret(s) stored in .env`);
  }
}
