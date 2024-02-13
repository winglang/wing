import {
  KinesisClient,
  PutRecordCommand,
  PutRecordsCommand,
  GetShardIteratorCommand,
  GetRecordsCommand,
} from "@aws-sdk/client-kinesis";
import { IStreamClient, IStreamData } from "../cloud";
import { Struct, Json } from "../std";

export class StreamClient implements IStreamClient {
  constructor(
    private readonly streamName: string,
    private readonly client: KinesisClient = new KinesisClient({}),
  ) {}

  public async put(...messages: Json[]): Promise<void> {
    if (messages.length == 1) {
      const jsonAsBytes: Uint8Array = Buffer.from(messages[0].asStr(), "ascii");

      let putRequest = new PutRecordCommand({
        StreamName: this.streamName,
        Data: jsonAsBytes,
        PartitionKey: ""  // TODO: Figure out partition key?
      }); // TODO: Maybe from a decorator in the schema

      try {
        const resp = await this.client.send(putRequest);
      } catch (e: any) {
        console.error(e)
      }
    }
    // convert every json data into a string and then 
    // into bytes
    const dataAsBytes = messages.map(message => {
      const jsonAsBytes: Uint8Array = Buffer.from(message.asStr(), "ascii");
      return jsonAsBytes;
    });

    let putRequest = new PutRecordsCommand({
      StreamName: this.streamName,
      Records: dataAsBytes.map(data => {
        return { Data: data, PartitionKey: "" }
      }),
    });

    const resp = await this.client.send(putRequest);
    throw new Error("Method not implemented.");
  }

  async get(limit: number): Promise<IStreamData | IStreamData[] | undefined> {
    throw new Error("Method not implemented.");
  }

  metadata(): Promise<Struct> {
    throw new Error("Method not implemented.");
  }

  schema(): Promise<IStreamData> {
    throw new Error("Method not implemented.");
  }
  
  config(): Promise<Json> {
    throw new Error("Method not implemented.");
  }
}