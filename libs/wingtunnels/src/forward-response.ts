import { type WebSocket } from "ws";
import { ForwardResponseMessage } from "./messages.js";

export interface ForwardRequestMessageProps {
  ws: WebSocket;
  message: ForwardResponseMessage;
}

export const forwardResponse = ({ws, message}: ForwardRequestMessageProps) => {
  ws.send(JSON.stringify(message));
}
