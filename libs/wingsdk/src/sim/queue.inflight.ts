import { IQueueClient } from "../cloud";
import { Queue, QUEUES } from "./queue.sim";

export class QueueClient implements IQueueClient {
  private readonly queue: Queue;
  constructor(queueId: number) {
    const queue = QUEUES[queueId];
    if (!queue) {
      throw new Error(`Invalid function id: ${queueId}`);
    }
    this.queue = queue;
  }

  public async push(message: string): Promise<void> {
    this.queue.push(message);
  }
}
