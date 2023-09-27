import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { ISecretClient } from "../cloud";
import { Json } from "../std";

export class SecretClient implements ISecretClient {
  private secretValue?: string;

  constructor(
    private readonly secretId: string,
    private readonly client: SecretManagerServiceClient = new SecretManagerServiceClient()
  ) {}

  public async value(options: { cache?: boolean } = {}): Promise<string> {
    if ((options.cache ?? true) && this.secretValue) {
      return this.secretValue;
    }

    // const name = 'projects/my-project/secrets/my-secret/versions/5';
    // const name = 'projects/my-project/secrets/my-secret/versions/latest';

    const [version] = await this.client.accessSecretVersion({
      name: this.secretId,
    });

    if (!version.payload?.data) {
      throw new Error("Secret has no value");
    }

    // Extract the payload as a string.
    this.secretValue = version.payload.data.toString();

    // console.info(`Payload: ${this.secretValue}`);
    return this.secretValue;
  }

  public async valueJson(options: { cache?: boolean } = {}): Promise<Json> {
    return JSON.parse(await this.value(options));
  }
}
