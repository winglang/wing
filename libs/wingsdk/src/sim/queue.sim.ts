import { Server } from "ws";
import { IResourceResolver, SimulatorContext } from "../testing/simulator";
import { log } from "../util";
import { FunctionClient } from "./function.inflight";
import { QueueSchema, QueueSubscriber } from "./schema-resources";
import { SimulatorRequest, SimulatorResponse } from "./sim-types";
import { RandomArrayIterator } from "./util.sim";

const QUEUES: Record<number, Queue> = {};

interface QueueSubscriberInternal extends QueueSubscriber {
  functionClient?: FunctionClient;
}

export async function start(
  props: QueueSchema["props"],
  context: SimulatorContext
): Promise<QueueSchema["attrs"]> {
  const q = new Queue(props, context.resolver);
  QUEUES[q.addr] = q;
  return {
    queueAddr: q.addr,
  };
}

export async function stop(attrs: QueueSchema["attrs"]) {
  const queueAddr = attrs.queueAddr;
  const q = QUEUES[queueAddr];
  if (!q) {
    throw new Error(`Invalid queueAddr: ${queueAddr}`);
  }
  await q.stop();
  delete QUEUES[queueAddr];
}

class Queue {
  private readonly wss: Server;
  private readonly messages = new Array<string>();
  private readonly subscribers = new Array<QueueSubscriberInternal>();
  private readonly intervalId: NodeJS.Timeout;

  constructor(props: QueueSchema["props"], resolver: IResourceResolver) {
    for (const sub of props.subscribers) {
      this.subscribers.push({ ...sub });
    }
    for (const subscriber of this.subscribers) {
      const functionId = subscriber.functionId;
      const functionAddr = resolver.lookup(functionId).attrs?.functionAddr;
      subscriber.functionClient = new FunctionClient(functionAddr);
    }

    if (props.initialMessages) {
      this.messages.push(...props.initialMessages);
    }

    // let the OS choose a free port
    this.wss = new Server({ port: 0 });

    const q = this;
    this.wss.on("connection", function connection(ws) {
      ws.on("message", function message(data) {
        log("server receiving:", data);
        const contents: SimulatorRequest = JSON.parse(data.toString());
        if (contents.operation === "push") {
          q.messages.push(contents.message);
          const resp: SimulatorResponse = {
            id: contents.id,
            result: "ok",
            timestamp: Date.now(),
          };
          log("server sending:", JSON.stringify(resp));
          ws.send(JSON.stringify(resp));
        } else {
          throw new Error(`Invalid operation: ${contents.operation}`);
        }
      });
    });

    this.intervalId = setInterval(() => this.processMessages(), 100); // every 0.1 seconds
  }

  public get addr(): number {
    const address = this.wss.address();

    // expect a WebSocket.AddressInfo
    if (typeof address === "string") {
      throw new Error("Invalid address");
    }
    return address.port;
  }

  public push(message: string) {
    this.messages.push(message);
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

  public async stop() {
    await new Promise((resolve, reject) => {
      this.wss.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(null);
        }
      });
    });
    clearInterval(this.intervalId);
  }
}
