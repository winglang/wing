import { EcsCluster as Cluster } from "../.gen/providers/aws/ecs-cluster";
import { EcsClusterCapacityProviders } from "../.gen/providers/aws/ecs-cluster-capacity-providers";
import { App } from "./app";
import { Resource } from "../std";

let clusterInstance: Cluster | undefined = undefined;

/**
 * Represents an ECS Cluster in AWS.
 */
export class EcsCluster {
  static getOrCreate(scope: Resource): Cluster {
    if (clusterInstance === undefined) {
      let app = (App.of(scope) as App);
      // Ensure that the docker provider is created before the ECS cluster
      app.dockerProvider;

      clusterInstance = new Cluster(scope, "ECSCluster", {
        name: `${app.node.id}_cluster`
      });

      new EcsClusterCapacityProviders(scope, "EcsClusterCapacityProviders", {
        clusterName: clusterInstance.name,
        capacityProviders: ["FARGATE"]
      });
    }
    return clusterInstance;
  }
}