import { randomUUID } from "crypto";
import WebSocket from "isomorphic-ws";
import { log } from "../util";
import { SimulatorRequest, SimulatorResponse } from "./sim-types";

export async function sendToWebSocket(
  ws: WebSocket,
  operation: string,
  message: string
): Promise<any> {
  await new Promise((resolve, reject) => {
    if (ws.readyState === WebSocket.OPEN) {
      resolve(null);
    } else {
      ws.on("open", resolve);
      ws.on("close", reject);
      ws.on("error", reject);
    }
  });

  const id = randomUUID();
  const req: SimulatorRequest = {
    id,
    operation,
    message,
    timestamp: Date.now(),
  };
  log("client sending:", JSON.stringify(req));
  ws.send(JSON.stringify(req));
  return new Promise((resolve, reject) => {
    ws.on("message", (data) => {
      log("client receiving:", data.toString());
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
