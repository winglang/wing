import { App } from "./app";
import { Cluster } from "aws-cdk-lib/aws-ecs";
import { Resource } from "@winglang/sdk/std";

let clusterInstance: Cluster | undefined = undefined;

/**
 * Represents an ECS Cluster in AWS.
 */
export class EcsCluster {
  public static getOrCreate(scope: Resource): Cluster {
    if (clusterInstance === undefined) {
      let app = App.of(scope) as App;
      // Ensure that the docker provider is created before the ECS cluster

      clusterInstance = new Cluster(scope, "ECSCluster", {
        clusterName: `${app.node.id.replace(".", "")}_cluster`,
      });
    }
    return clusterInstance;
  }
}
