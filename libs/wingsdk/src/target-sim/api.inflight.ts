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
import {
  ApiRequest,
  ApiResponse,
  IApiClient,
  IFunctionClient,
  TraceType,
  parseHttpMethod,
  sanitizeParamLikeObject,
} from "../cloud";
import { ISimulatorContext } from "../testing/simulator";

const LOCALHOST_ADDRESS = "127.0.0.1";

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

    // Parse request bodies as json.
    this.app.use(express.json());

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
            `Processing "${route.method} ${route.route}" (body=${JSON.stringify(
              body
            )}).`
          );

          const apiRequest = transformRequest(req);

          if (Object.keys(req.params).length > 0) {
            throw new Error(
              "Path variables are not yet supported in the simulator."
            );
          }

          try {
            const response = await fnClient.invoke(
              // TODO: clean up once cloud.Function is typed as `inflight (Json): Json`
              apiRequest as unknown as string
            );

            // TODO: clean up once cloud.Function is typed as `inflight (Json): Json`
            if (!isApiResponse(response)) {
              throw new Error(
                `Expected an ApiResponse struct, found ${JSON.stringify(
                  response
                )}`
              );
            }

            res.status(response.status);
            for (const [key, value] of Object.entries(response.headers ?? {})) {
              res.set(key, value);
            }
            res.send(JSON.stringify(response.body));
            this.addTrace(
              `${route.method} ${route.route} - ${response.status}.`
            );
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

function isApiResponse(response: unknown): response is ApiResponse {
  return (
    (response as any).status && typeof (response as any).status === "number"
  );
}

function transformRequest(req: express.Request): ApiRequest {
  return {
    headers: sanitizeParamLikeObject(req.headers),
    body: req.body,
    method: parseHttpMethod(req.method),
    path: req.path,
    query: sanitizeParamLikeObject(req.query as any),
    vars: {}, // TODO: not supported in simulator yet
  };
}
