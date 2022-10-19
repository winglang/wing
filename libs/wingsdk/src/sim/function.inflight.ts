import WebSocket from "ws";
import { IFunctionClient } from "../cloud";
import { sendToWebSocket } from "./util.inflight";

export class FunctionClient implements IFunctionClient {
  private readonly ws: WebSocket;

  constructor(functionAddr: number) {
    this.ws = new WebSocket(`ws://localhost:${functionAddr}`);
  }

  public async invoke(message: string): Promise<string> {
    return sendToWebSocket(this.ws, "invoke", message);
  }

  public async timesCalled(): Promise<number> {
    const response = await sendToWebSocket(this.ws, "timesCalled", "");
    return parseInt(response, 10);
  }
}
