import { IQueueClient } from "../cloud";
import { SimulatorContext } from "../testing/simulator";
import { IFunctionClient } from "./function";
import { HandleManager, makeResourceHandle } from "./handle-manager";
import { QueueSchema, QueueSubscriber } from "./schema-resources";
import { RandomArrayIterator } from "./util.sim";

interface QueueSubscriberInternal extends QueueSubscriber {
  functionClient?: IFunctionClient;
}

export async function start(
  path: string,
  props: QueueSchema["props"],
  context: SimulatorContext
): Promise<QueueSchema["attrs"]> {
  const queue = new Queue(path, props, context);
  const handle = HandleManager.addInstance(queue);
  return { handle };
}

export async function stop(attrs: QueueSchema["attrs"]) {
  const queue = HandleManager.removeInstance(attrs!.handle) as Queue;
  await queue.stop();
}

class Queue implements IQueueClient {
  public readonly handle: string;
  private readonly messages = new Array<string>();
  private readonly subscribers = new Array<QueueSubscriberInternal>();
  private readonly intervalId: NodeJS.Timeout;

  constructor(
    path: string,
    props: QueueSchema["props"],
    context: SimulatorContext
  ) {
    this.handle = makeResourceHandle(context.simulationId, "queue", path);
    for (const sub of props.subscribers) {
      this.subscribers.push({ ...sub });
    }
    for (const subscriber of this.subscribers) {
      const functionId = subscriber.functionId;
      const functionHandle = context.resolver.lookup(functionId).attrs!.handle;
      subscriber.functionClient = HandleManager.findInstance(
        functionHandle
      ) as IFunctionClient;
    }

    if (props.initialMessages) {
      this.messages.push(...props.initialMessages);
    }

    this.intervalId = setInterval(() => this.processMessages(), 100); // every 0.1 seconds
  }

  public async push(message: string): Promise<void> {
    this.messages.push(message);
    return;
  }

  private processMessages() {
    let processedMessages = false;
    do {
      processedMessages = false;
      // Randomize the order of subscribers to avoid user code making
      // assumptions on the order that subscribers process messages.
      for (const subscriber of new RandomArrayIterator(this.subscribers)) {
        const messages = this.messages.splice(0, subscriber.batchSize);
        if (messages.length === 0) {
          continue;
        }
        const fnClient = subscriber.functionClient;
        if (!fnClient) {
          throw new Error("No function client found");
        }
        const event = JSON.stringify({ messages });
        void fnClient.invoke(event).catch((err) => {
          // If the function returns an error, put the message back on the queue
          this.messages.push(...messages);
          console.error(
            `Error invoking queue subscriber ${subscriber.functionId} with event "${event}":`,
            err
          );
        });
        processedMessages = true;
      }
    } while (processedMessages);
  }

  public async stop(): Promise<void> {
    clearInterval(this.intervalId);
  }
}
