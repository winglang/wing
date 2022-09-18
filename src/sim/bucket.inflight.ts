import fetch from "node-fetch";
import { IBucketClient, Void } from "../cloud";
import { createWingLocalClient } from "./util.inflight";

export class BucketClient implements IBucketClient {
  private readonly baseUrl: string;
  private readonly client: ReturnType<typeof createWingLocalClient>;

  constructor(private readonly bucketId: string) {
    this.baseUrl = process.env.WING_LOCAL_URL ?? "http://localhost:4000";
    this.client = createWingLocalClient({
      url: this.baseUrl,
      //TODO: check why typeof fetch doesn't work
      // @ts-ignore
      fetch,
    });
  }

  public async put(key: string, value: string): Promise<Void> {
    await this.client.mutation("bucket.PutObject", {
      resourceId: this.bucketId,
      key,
      value,
    } as any);
    return {};
  }

  public async get(key: string): Promise<string> {
    const obj = await this.client.query("bucket.GetObject", {
      resourceId: this.bucketId,
      key,
    } as any);
    if (!obj?.value) {
      // TODO: better error handling
      throw new Error(
        `Bucket ${this.bucketId} has no content for provided key: ${key}`
      );
    }
    return obj.value;
  }
}
