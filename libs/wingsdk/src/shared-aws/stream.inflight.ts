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

  put(...messages: IStreamData[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  get(limit: number): Promise<IStreamData | IStreamData[] | undefined> {
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