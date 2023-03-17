import { Server } from "http";
import { AddressInfo } from "net";
import express from "express";
import { ISimulatorResourceInstance } from "./resource";
import {
  ApiAttributes,
  ApiRoute,
  ApiSchema,
  API_TYPE,
} from "./schema-resources";
import { ApiResponse, IApiClient, IFunctionClient } from "../cloud";
import { ISimulatorContext, TraceType } from "../testing/simulator";

const LOCALHOST_HOSTNAME = "127.0.0.1";

export class Api implements IApiClient, ISimulatorResourceInstance {
  private readonly routes: ApiRoute[];
  private readonly context: ISimulatorContext;
  private readonly app: express.Application;
  private server: Server | undefined;
  private url: string | undefined;

  constructor(props: ApiSchema["props"], context: ISimulatorContext) {
    this.routes = props.routes ?? [];
    this.context = context;

    // Set up an express server that handles the routes.
    this.app = express();
    for (const route of this.routes) {
      const method = route.method.toLowerCase() as
        | "get"
        | "post"
        | "put"
        | "delete"
        | "head"
        | "options"
        | "patch"
        | "connect";

      const fnClient = this.context.findInstance(
        route.functionHandle
      ) as IFunctionClient & ISimulatorResourceInstance;
      if (!fnClient) {
        throw new Error("No function client found!");
      }

      this.app[method](
        route.route,
        async (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          const body = req.body;
          this.addTrace(
            `Processing "${route.method} ${route.route}" (body=${body}).`
          );

          if (Object.keys(req.params).length > 0) {
            throw new Error(
              "Request parameters are not yet supported in the simulator."
            );
          }

          try {
            await fnClient.invoke(req.body).then((result) => {
              // TODO: clean up once cloud.Function is typed as `inflight (Json): Json`
              const response = result as unknown as ApiResponse;
              if (!response.status) {
                throw new Error(
                  `Expected response to contain a status code, found ${JSON.stringify(
                    response
                  )}`
                );
              }

              res.send(response.body);
              this.addTrace(
                `${route.method} ${route.route} - ${response.status}.`
              );
            });
          } catch (err) {
            return next(err);
          }
        }
      );
    }
  }

  public async init(): Promise<ApiAttributes> {
    // `server.address()` returns `null` until the server is listening
    // on a port. We use a promise to wait for the server to start
    // listening before returning the URL.
    const addrInfo: AddressInfo = await new Promise((resolve, reject) => {
      this.server = this.app.listen(0, LOCALHOST_HOSTNAME, () => {
        const addr = this.server?.address();
        if (addr && typeof addr === "object" && (addr as AddressInfo).port) {
          resolve(addr);
        } else {
          reject(new Error("No address found"));
        }
      });
    });
    this.url = `http://${addrInfo.address}:${addrInfo.port}`;

    this.addTrace(`Server listening on ${this.url}`);

    return {
      url: this.url,
    };
  }

  public async cleanup(): Promise<void> {
    this.addTrace(`Closing server on ${this.url}`);
    this.server?.close();
  }

  private addTrace(message: string): void {
    this.context.addTrace({
      type: TraceType.RESOURCE,
      data: {
        message,
      },
      sourcePath: this.context.resourcePath,
      sourceType: API_TYPE,
      timestamp: new Date().toISOString(),
    });
  }
}
