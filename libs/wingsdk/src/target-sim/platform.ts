import fs from "fs";
import { join } from "path";
import { App } from "./app";
import { SIM_CONTAINER_FQN } from "./container";
import { EVENT_MAPPING_FQN } from "./event-mapping";
import { POLICY_FQN } from "./policy";
import { SIM_RESOURCE_FQN } from "./resource";
import { STATE_FQN } from "./state";
import {
  API_FQN,
  BUCKET_FQN,
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
import { AppProps } from "../core";
import { REDIS_FQN, TABLE_FQN } from "../ex";
import { IApp, IPlatformProvider } from "../platform";
import { TEST_RUNNER_FQN } from "../std";

/**
 * Sim Platform
 */
export class Platform implements IPlatformProvider {
  /** Platform model */
  public readonly target = "sim";

  public createApp(props: AppProps): IApp {
    return new App(props);
  }

  public resolveType(fqn: string) {
    switch (fqn) {
      case API_FQN:
        return require.resolve("./api.inflight");

      case BUCKET_FQN:
        return require.resolve("./bucket.inflight");

      case DOMAIN_FQN:
        return require.resolve("./domain.inflight");

      case ENDPOINT_FQN:
        return require.resolve("./endpoint.inflight");

      case EVENT_MAPPING_FQN:
        return require.resolve("./event-mapping.inflight");

      case FUNCTION_FQN:
        return require.resolve("./function.inflight");

      case ON_DEPLOY_FQN:
        return require.resolve("./on-deploy.inflight");

      case POLICY_FQN:
        return require.resolve("./policy.inflight");

      case QUEUE_FQN:
        return require.resolve("./queue.inflight");

      case REDIS_FQN:
        return require.resolve("./redis.inflight");

      case SCHEDULE_FQN:
        return require.resolve("./schedule.inflight");

      case SECRET_FQN:
        return require.resolve("./secret.inflight");

      case SERVICE_FQN:
        return require.resolve("./service.inflight");

      case STATE_FQN:
        return require.resolve("./state.inflight");

      case TABLE_FQN:
        return require.resolve("./table.inflight");

      case TEST_RUNNER_FQN:
        return require.resolve("./test-runner.inflight");

      case TOPIC_FQN:
        return require.resolve("./topic.inflight");

      case WEBSITE_FQN:
        return require.resolve("./website.inflight");

      case SIM_CONTAINER_FQN:
        return require.resolve("./container.inflight");

      case SIM_RESOURCE_FQN:
        return require.resolve("./resource.inflight");
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
