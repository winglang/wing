import { type WebSocket } from "ws";
import { InitializeMessage } from "./messages.js";

export interface InitializeProps {
  subdomain: string | undefined;
  ws: WebSocket;
}

export const initialize = ({ ws, subdomain }: InitializeProps) => {
  const message: InitializeMessage = {
    action: "INITIALIZE",
    subdomain
  }

  ws.send(JSON.stringify(message));
}
