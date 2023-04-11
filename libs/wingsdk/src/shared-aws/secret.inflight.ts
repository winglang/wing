import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { ISecretClient } from "../cloud";
import { Json } from "../std";

export class SecretClient implements ISecretClient {
  constructor(
    private readonly secretArn: string,
    private readonly client: SecretsManagerClient = new SecretsManagerClient({})
  ) {}

  public async value(): Promise<string> {
    const command = new GetSecretValueCommand({
      SecretId: this.secretArn,
    });
    const getSecretValue = await this.client.send(command);
    if (!getSecretValue.SecretString) {
      throw new Error("Secret has no secret string");
    }
    return getSecretValue.SecretString;
  }

  public async valueJson(): Promise<Json> {
    return JSON.parse(await this.value());
  }
}
