import {
  DescribeServicesCommand,
  ECSClient,
  UpdateServiceCommand,
} from "@aws-sdk/client-ecs";
import { IServiceClient } from "../cloud";

export class ServiceClient implements IServiceClient {
  private readonly client = new ECSClient({});
  private readonly clusterName: string;
  private readonly serviceName: string;
  constructor({
    $clusterName,
    $serviceName,
  }: {
    $clusterName: string;
    $serviceName: string;
  }) {
    this.clusterName = $clusterName;
    this.serviceName = $serviceName;
  }

  public async start(): Promise<void> {
    const command = new UpdateServiceCommand({
      cluster: this.clusterName,
      service: this.serviceName,
      desiredCount: 1,
    });

    await this.client.send(command);
  }

  public async stop(): Promise<void> {
    const command = new UpdateServiceCommand({
      cluster: this.clusterName,
      service: this.serviceName,
      desiredCount: 0,
    });

    await this.client.send(command);
  }

  public async started(): Promise<boolean> {
    const command = new DescribeServicesCommand({
      cluster: this.clusterName,
      services: [this.serviceName],
    });

    const response = await this.client.send(command);

    if (response.services && response.services.length > 0) {
      const service = response.services[0];

      return service.desiredCount! >= 1;
    }

    return false;
  }
}
