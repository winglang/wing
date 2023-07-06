import { Collector } from "./collector";

export interface NodeData {
  version: string;
}

export class NodeCollector extends Collector {
  async canCollect(): Promise<boolean> {
    return true;
  }

  async collect(): Promise<NodeData> {
    return {
      version: process.version,
    }
  }
}