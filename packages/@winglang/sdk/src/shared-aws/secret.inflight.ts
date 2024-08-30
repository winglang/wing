import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { GetSecretValueOptions, ISecretClient } from "../cloud";
import { Json } from "../std";

export class SecretClient implements ISecretClient {
  private readonly client: SecretsManagerClient = new SecretsManagerClient({});
  private readonly secretArn: string;
  private secretValue?: string;

  constructor({ $secretArn }: { $secretArn: string }) {
    this.secretArn = $secretArn;
  }

  public async value(options: GetSecretValueOptions = {}): Promise<string> {
    if ((options.cache ?? true) && this.secretValue) {
      return this.secretValue;
    }

    const command = new GetSecretValueCommand({
      SecretId: this.secretArn,
    });
    const getSecretValue = await this.client.send(command);
    if (!getSecretValue.SecretString) {
      throw new Error(
        `No value for secret found\n(hint: try running the 'wing secrets -t TARGET' to store secret)`
      );
    }

    this.secretValue = getSecretValue.SecretString;

    return this.secretValue;
  }

  public async valueJson(options: GetSecretValueOptions = {}): Promise<Json> {
    return JSON.parse(await this.value(options));
  }
}
