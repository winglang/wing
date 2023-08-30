import { Server } from "http";
import { AddressInfo } from "net";
import express from "express";
import { ApiAttributes, WebsiteSchema, WEBSITE_TYPE } from "./schema-resources";
import { IWebsiteClient } from "../cloud";
import { Json, TraceType } from "../std";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";

const LOCALHOST_ADDRESS = "127.0.0.1";

export class Website implements IWebsiteClient, ISimulatorResourceInstance {
  private readonly context: ISimulatorContext;
  private readonly app: express.Application;
  private server?: Server;
  private url?: string;

  constructor(props: WebsiteSchema["props"], context: ISimulatorContext) {
    this.context = context;

    // Set up an express server that handles the routes.
    this.app = express();

    // Use static directory
    this.app.use(express.static(props.staticFilesPath));
    this.initiateJsonRoutes(props.jsonRoutes);
  }

  private initiateJsonRoutes(routes: Record<string, Json>) {
    for (const path in routes) {
      this.app.get(`/${path}`, (_, res) => {
        res.json(routes[path]);
      });
    }
  }

  public async init(): Promise<ApiAttributes> {
    // `server.address()` returns `null` until the server is listening
    // on a port. We use a promise to wait for the server to start
    // listening before returning the URL.
    const addrInfo: AddressInfo = await new Promise((resolve, reject) => {
      this.server = this.app.listen(0, LOCALHOST_ADDRESS, () => {
        const addr = this.server?.address();
        if (addr && typeof addr === "object" && (addr as AddressInfo).port) {
          resolve(addr);
        } else {
          reject(new Error("No address found"));
        }
      });
    });
    this.url = `http://${addrInfo.address}:${addrInfo.port}`;

    this.addTrace(`Website Server listening on ${this.url}`);

    return {
      url: this.url,
    };
  }

  public async cleanup(): Promise<void> {
    this.addTrace(`Closing server on ${this.url}`);
    this.server?.close();
    this.server?.closeAllConnections();
  }

  private addTrace(message: string): void {
    this.context.addTrace({
      type: TraceType.RESOURCE,
      data: {
        message,
      },
      sourcePath: this.context.resourcePath,
      sourceType: WEBSITE_TYPE,
      timestamp: new Date().toISOString(),
    });
  }
}
