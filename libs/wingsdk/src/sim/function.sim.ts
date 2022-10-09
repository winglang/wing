import Piscina from "piscina";
import { Server } from "ws";
import { log } from "../util";
import { FunctionSchema } from "./schema";
import { SimulatorRequest, SimulatorResponse } from "./sim-types";

const FUNCTIONS: Record<number, Function> = {};

export async function init(
  props: FunctionSchema["props"]
): Promise<FunctionSchema["attrs"]> {
  const fn = new Function(props);
  FUNCTIONS[fn.addr] = fn;
  return {
    functionAddr: fn.addr,
  };
}

export async function cleanup(attrs: FunctionSchema["attrs"]) {
  const functionAddr = attrs.functionAddr;
  const fn = FUNCTIONS[functionAddr];
  if (!fn) {
    throw new Error(`Invalid functionAddr: ${functionAddr}`);
  }
  await fn.cleanup();
  delete FUNCTIONS[functionAddr];
}

export class Function {
  private readonly wss: Server;
  private readonly worker: Piscina;
  private _timesCalled: number = 0;

  constructor(props: FunctionSchema["props"]) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.worker = new Piscina({
      filename: props.sourceCodeFile,
      env: {
        ...props.environmentVariables,
      },
    });

    // let the OS choose a free port
    this.wss = new Server({ port: 0 });

    const fn = this;

    this.wss.on("connection", function connection(ws) {
      ws.on("message", function message(data) {
        log("server receiving: %s", data);
        const contents: SimulatorRequest = JSON.parse(data.toString());
        if (contents.operation === "invoke") {
          void fn
            .invoke(contents.message)
            .then((result) => {
              const resp: SimulatorResponse = {
                id: contents.id,
                result,
                timestamp: Date.now(),
              };
              log("server sending: %s", JSON.stringify(resp));
              ws.send(JSON.stringify(resp));
            })
            .catch((err) => {
              const resp: SimulatorResponse = {
                id: contents.id,
                error: `${err} ${err.stack}`,
                timestamp: Date.now(),
              };
              log("server sending: %s", JSON.stringify(resp));
              ws.send(JSON.stringify(resp));
            });
        } else if (contents.operation === "timesCalled") {
          const resp: SimulatorResponse = {
            id: contents.id,
            result: fn._timesCalled.toString(),
            timestamp: Date.now(),
          };
          log("server sending: %s", JSON.stringify(resp));
          ws.send(JSON.stringify(resp));
        }
      });
    });
  }

  public async invoke(payload: string): Promise<string> {
    this._timesCalled += 1;
    let result = await this.worker.run(payload, {
      name: "handler",
    });
    return result;
  }

  public get timesCalled() {
    return this._timesCalled;
  }

  public get addr(): number {
    const address = this.wss.address();

    // expect a WebSocket.AddressInfo
    if (typeof address === "string") {
      throw new Error("Invalid address");
    }
    return address.port;
  }

  public async cleanup(): Promise<void> {
    await new Promise((resolve, reject) => {
      this.wss.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(null);
        }
      });
    });
    await this.worker.destroy();
  }
}
