import { Server } from "http";
import { AddressInfo } from "net";
import { join } from "path";
import express from "express";
import { ApiAttributes, WebsiteSchema, FileRoutes } from "./schema-resources";
import { IWebsiteClient, WEBSITE_FQN } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";
import { TraceType } from "../std";

const LOCALHOST_ADDRESS = "127.0.0.1";

export class Website implements IWebsiteClient, ISimulatorResourceInstance {
  private _context: ISimulatorContext | undefined;
  private readonly app: express.Application;
  private server?: Server;
  private url?: string;

  constructor(props: WebsiteSchema["props"]) {
    // Set up an express server that handles the routes.
    this.app = express();

    // Use static directory
    this.app.use(express.static(props.staticFilesPath));

    this.initiateFileRoutes(props.fileRoutes);

    if (props.errorDocument) {
      let errorDocument = props.errorDocument;

      this.app.get("*", function (_, res) {
        return res.sendFile(join(props.staticFilesPath, errorDocument));
      });
    }
  }

  private initiateFileRoutes(routes: FileRoutes) {
    for (const path in routes) {
      this.app.get(`/${path}`, (_, res) => {
        res.setHeader("Content-Type", routes[path].contentType);
        res.send(routes[path].data);
      });
    }
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<ApiAttributes> {
    this._context = context;
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

  public async save(): Promise<void> {}

  private addTrace(message: string): void {
    this.context.addTrace({
      type: TraceType.RESOURCE,
      data: {
        message,
      },
      sourcePath: this.context.resourcePath,
      sourceType: WEBSITE_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
