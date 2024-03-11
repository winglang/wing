import { WebSocket } from "ws";
import { initialize } from "./initialize.js";
import { eventHandler, Events } from "./events.js";
import { onMessage } from "./onmessage.js";
import { ErrorMessage, InitializedMessage } from "./messages.js";

const WING_CLOUD_URL = "wss://4lc628cb78.execute-api.us-east-1.amazonaws.com/prod";

export interface ConnectProps {
  subdomain?: string;
}

export interface ConnectResponse {
  url: string;
  subdomain: string;
  close: () => void;
}

export const connect = (targetUrl: string, props?: ConnectProps): Promise<ConnectResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(targetUrl);
      const ws = new WebSocket(process.env["WING_TUNNELS_URL"] ?? WING_CLOUD_URL);
      if (ws.readyState === 1) {
        initialize({ ws, subdomain: props?.subdomain });
      } else {
        ws.on("open", () => {
          initialize({ ws, subdomain: props?.subdomain });
        });
      }
  
      ws.on("message", (data) => {
        const onMessageImpl = onMessage({ ws, port: parseInt(url.port), hostname: url.hostname });
        onMessageImpl(data);
      });

      ws.on("error", (error) => {
        reject(error);
      });
  
      eventHandler.on(Events.UrlAssigned, ({ url, subdomain }: InitializedMessage) => {
        resolve({ url, subdomain, close: () => {
          ws.close();
        } });
      });

      eventHandler.on(Events.SubdomainInUse, ({ message }: ErrorMessage) => {
        ws.close();
        reject(message);
      });
    } catch (error) {
      reject(error);
    }
  })
};
