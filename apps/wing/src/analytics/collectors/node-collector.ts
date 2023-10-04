import { Collector } from "./collector";

export interface NodeData {
  version: string;
}

export class NodeCollector extends Collector {
  async collect(): Promise<NodeData> {
    return {
      version: process.version,
    };
  }
}
