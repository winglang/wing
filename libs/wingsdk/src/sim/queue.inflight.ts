import WebSocket from "ws";
import { IQueueClient } from "./queue";
import { sendToWebSocket } from "./util.inflight";

export class QueueClient implements IQueueClient {
  private readonly ws: WebSocket;
  constructor(queueAddr: number) {
    this.ws = new WebSocket(`ws://localhost:${queueAddr}`);
  }

  public async push(message: string): Promise<void> {
    await sendToWebSocket(this.ws, "push", message);
  }
}
