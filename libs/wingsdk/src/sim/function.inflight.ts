import { randomUUID } from "crypto";
import WebSocket from "ws";
import { IFunctionClient } from "../cloud";

interface SimulatorRequest {
  readonly id: string;
  readonly operation: string;
  readonly message: string;
}

interface SimulatorResponse {
  readonly id: string;
  readonly error?: string;
  readonly result?: string;
}

export class FunctionClient implements IFunctionClient {
  private readonly ws: WebSocket;

  // TODO: make this be an async function, and wait for the server to open
  constructor(functionAddr: number) {
    this.ws = new WebSocket(`ws://localhost:${functionAddr}`);
  }

  public async invoke(message: string): Promise<string> {
    return this.send("invoke", message);
  }

  public async timesCalled(): Promise<number> {
    const response = await this.send("timesCalled", "");
    return parseInt(response, 10);
  }

  private async send(operation: string, message: string): Promise<any> {
    await new Promise((resolve, reject) => {
      if (this.ws.readyState === WebSocket.OPEN) {
        resolve(null);
      } else {
        this.ws.on("open", resolve);
        this.ws.on("error", reject);
      }
    });

    const id = randomUUID();
    const req: SimulatorRequest = {
      id,
      operation,
      message,
    };
    console.log("client sending: %s", JSON.stringify(req));
    this.ws.send(JSON.stringify(req));
    return new Promise((resolve, reject) => {
      this.ws.on("message", (data) => {
        console.log("client receiving: %s", data.toString());
        const contents: SimulatorResponse = JSON.parse(data.toString());
        if (contents.id === id) {
          if (contents.error) {
            reject(new Error(contents.error));
          } else {
            resolve(contents.result);
          }
        }
      });
    });
  }
}
