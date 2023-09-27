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

    const [version] = await this.client.accessSecretVersion({
      name: this.secretId,
    });

    if (!version.payload?.data) {
      throw new Error("Secret has no value");
    }

    if (version.payload?.data instanceof Buffer) {
      this.secretValue = version.payload.data.toString("utf-8");
    } else {
      throw new Error("Secret payload is not a Buffer or doesn't exist");
    }

    return this.secretValue;
  }

  public async valueJson(options: { cache?: boolean } = {}): Promise<Json> {
    return JSON.parse(await this.value(options));
  }
}
