import { type WebSocket, type RawData } from "ws";
import { Action, ForwardRequestMessage, InitializedMessage, ErrorMessage } from "./messages.js";
import { Events, eventHandler } from "./events.js";
import forwardRequest from "./forward-request.js";

export interface OnMessageProps {
  ws: WebSocket;
  port: number;
  hostname?: string;
}

export const onMessage = ({ ws, port, hostname }: OnMessageProps) => {
  return (data: RawData) => {
    const raw = data.toString("utf8");
    try {
      const json = JSON.parse(raw);
      const action: Action = json.action;
      if (action === "INITIALIZED") {
        const msg = json as InitializedMessage;
        eventHandler.emit(Events.UrlAssigned, msg);
      } else if (action === "FORWARD_REQUEST") {
        const msg = json as ForwardRequestMessage;
        forwardRequest({ message: msg, ws, port, hostname });
      } else if (action === "ERROR") {
        const msg = json as ErrorMessage;
        if (msg.type === "SUBDOMAIN_IN_USE") {
          eventHandler.emit(Events.SubdomainInUse, msg);
        } else {
          console.error("onMessage error", msg.message);
          ws.close();
        }
      }
    } catch (err: any) {
      console.error("onMessage failure", raw, err.toString());
    }
  }
}
