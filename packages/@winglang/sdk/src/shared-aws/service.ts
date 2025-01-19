import { resolve } from "path";
import { cloud, core } from "..";
import { AwsInflightHost, IAwsInflightHost, NetworkConfig } from "./inflight-host";
import { PolicyStatement } from "./types";
import { IInflightHost } from "../std";

/**
 * Shared interface for AWS Services
 */
export interface IAwsService extends IAwsInflightHost {
  /**
   * AWS ECS service name
   */
  readonly serviceName: string;

  /**
   * AWS ECS cluster name
   */
  readonly clusterName: string;
}

/**
 * Base class for AWS Services
 */
export abstract class Service extends cloud.Service implements IAwsService {

  /** @internal */
  public static _toInflightType(): string {
    return core.InflightClient.forType(
      __filename.replace("service", "service.inflight"),
      "ServiceClient"
    );
  }

  public abstract get serviceName(): string;
  public abstract get clusterName(): string;

  public abstract addPolicyStatements(...policies: PolicyStatement[]): void;
  public abstract addNetwork(config: NetworkConfig): void;

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!AwsInflightHost.isAwsInflightHost(host)) {
      throw new Error("Host is not an AWS inflight host");
    }

    if (
      ops.includes(cloud.ServiceInflightMethods.START) ||
      ops.includes(cloud.ServiceInflightMethods.STOP)
    ) {
      host.addPolicyStatements({
        actions: ["ecs:UpdateService"],
        resources: [
          `arn:aws:ecs:*:*:service/${this.clusterName}/${this.serviceName}`,
        ],
      });
    }

    if (ops.includes(cloud.ServiceInflightMethods.STARTED)) {
      host.addPolicyStatements({
        actions: ["ecs:DescribeServices"],
        resources: [
          `arn:aws:ecs:*:*:service/${this.clusterName}/${this.serviceName}`,
        ],
      });
    }

    host.addEnvironment(this.envName(), this.serviceName);
    host.addEnvironment("ECS_CLUSTER_NAME", this.clusterName);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $clusterName: `process.env["ECS_CLUSTER_NAME"]`,
      $serviceName: `process.env["${this.envName()}"]`,
    };
  }

  private envName(): string {
    return `SERVICE_NAME_${this.node.addr.slice(-8)}`;
  }

}

export function createServiceDockerfile(assetName: string) {
  return `FROM --platform=linux/amd64 node:20-slim
WORKDIR /app
COPY ./${assetName}_wrapper.js.bundle .
CMD [ "node", "index.cjs" ]`;
}

export function createServiceWrapper(entrypoint: string) {
  return `
const service = require("${resolve(entrypoint)}");
let isShuttingDown = false;

const startService = async () => {
while (!isShuttingDown) {
  // Check if shutting down at each iteration or task
  await service.start();
}
};

const handleShutdown = async () => {
console.log("Received shutdown signal, stopping service...");
isShuttingDown = true; // Signal to stop infinite loop
await service.stop();
process.exit(0);
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

(async () => {
try {
  await startService();
} catch (error) {
  console.error("Error during service operation:", error);
  process.exit(1);
}
})();
`;
}
