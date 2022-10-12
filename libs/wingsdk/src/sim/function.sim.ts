import { existsSync } from "fs";
import { join } from "path";
import Piscina from "piscina";
import { Server } from "ws";
import { SimulatorContext } from "../testing/simulator";
import { log } from "../util";
import { FunctionSchema } from "./schema";
import { SimulatorRequest, SimulatorResponse } from "./sim-types";

const FUNCTIONS: Record<number, Function> = {};

export async function start(
  props: FunctionSchema["props"],
  context: SimulatorContext
): Promise<FunctionSchema["attrs"]> {
  const fn = new Function(props, context.assetsDir);
  FUNCTIONS[fn.addr] = fn;
  return {
    functionAddr: fn.addr,
  };
}

export async function stop(attrs: FunctionSchema["attrs"]) {
  const functionAddr = attrs.functionAddr;
  const fn = FUNCTIONS[functionAddr];
  if (!fn) {
    throw new Error(`Invalid functionAddr: ${functionAddr}`);
  }
  await fn.stop();
  delete FUNCTIONS[functionAddr];
}

export class Function {
  private readonly wss: Server;
  private readonly worker: Piscina;
  private _timesCalled: number = 0;

  constructor(props: FunctionSchema["props"], assetsDir: string) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    const filename = join(assetsDir, props.sourceCodeFile);
    if (!existsSync(filename)) {
      throw new Error("File not found: " + filename);
    }
    this.worker = new Piscina({
      filename,
      env: {
        ...props.environmentVariables,
      },
    });

    // let the OS choose a free port
    this.wss = new Server({ port: 0 });

    const fn = this;

    this.wss.on("connection", function connection(ws) {
      ws.on("message", function message(data) {
        log("server receiving:", data);
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
              log("server sending:", JSON.stringify(resp));
              ws.send(JSON.stringify(resp));
            })
            .catch((err) => {
              const resp: SimulatorResponse = {
                id: contents.id,
                error: `${err} ${err.stack}`,
                timestamp: Date.now(),
              };
              log("server sending:", JSON.stringify(resp));
              ws.send(JSON.stringify(resp));
            });
        } else if (contents.operation === "timesCalled") {
          const resp: SimulatorResponse = {
            id: contents.id,
            result: fn._timesCalled.toString(),
            timestamp: Date.now(),
          };
          log("server sending:", JSON.stringify(resp));
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

  public async stop(): Promise<void> {
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
