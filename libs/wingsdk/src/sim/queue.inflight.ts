import { IQueueClient } from "../cloud";
import { Queue, QUEUES } from "./queue.sim";

export class QueueClient implements IQueueClient {
  private readonly queue: Queue;
  constructor(queueAddr: number) {
    const queue = QUEUES[queueAddr];
    if (!queue) {
      throw new Error(`Invalid function id: ${queueAddr}`);
    }
    this.queue = queue;
  }

  public async push(message: string): Promise<void> {
    this.queue.push(message);
  }
}
