import * as fs from "fs";
import { Server } from "http";
import { AddressInfo, Socket } from "net";
import { join } from "path";
import express from "express";
import { IEventPublisher } from "./event-mapping";
import {
  ApiAttributes,
  ApiRoute,
  ApiSchema,
  EventSubscription,
} from "./schema-resources";
import { exists } from "./util";
import {
  API_FQN,
  ApiRequest,
  ApiResponse,
  DEFAULT_RESPONSE_STATUS,
  IApiClient,
  IFunctionClient,
  parseHttpMethod,
  sanitizeParamLikeObject,
} from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";
import { TraceType } from "../std";

const LOCALHOST_ADDRESS = "127.0.0.1";

const STATE_FILENAME = "state.json";

/**
 * Contents of the state file for this resource.
 */
interface StateFileContents {
  /**
   * The last port used by the API server on a previous simulator run.
   */
  readonly lastPort?: number;
}

interface ApiRouteWithFunctionHandle extends ApiRoute {
  functionHandle: string;
}

export class Api
  implements IApiClient, ISimulatorResourceInstance, IEventPublisher
{
  private readonly routes: ApiRouteWithFunctionHandle[];
  private readonly context: ISimulatorContext;
  private readonly app: express.Application;
  private server: Server | undefined;
  private url: string | undefined;
  private port: number | undefined;

  constructor(props: ApiSchema["props"], context: ISimulatorContext) {
    this.routes = [];
    this.context = context;
    const { corsHeaders } = props;

    // Set up an express server that handles the routes.
    this.app = express();

    // we parse all requests as text and leave the parsing to the inflight handler
    // matching the limit to aws api gateway's payload size limit:
    // https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html
    this.app.use(express.text({ limit: "10mb", type: "*/*" }));

    // Set up CORS headers for options requests.
    if (corsHeaders) {
      this.app.use((req, res, next) => {
        const method =
          req.method && req.method.toUpperCase && req.method.toUpperCase();

        if (method === "OPTIONS") {
          for (const [key, value] of Object.entries(
            corsHeaders.optionsResponse
          )) {
            res.setHeader(key, value);
          }
          res.status(204).send();
        } else {
          for (const [key, value] of Object.entries(
            corsHeaders.defaultResponse
          )) {
            res.setHeader(key, value);
          }
          next();
        }
      });
    }
  }

  public async init(): Promise<ApiAttributes> {
    // Check for a previous state file to see if there was a port that was previously being used
    // if so, try to use it out of convenience
    let lastPort: number | undefined;
    const state: StateFileContents = await this.loadState();
    if (state.lastPort) {
      const portAvailable = await isPortAvailable(state.lastPort);
      if (portAvailable) {
        lastPort = state.lastPort;
      }
    }

    // `server.address()` returns `null` until the server is listening
    // on a port. We use a promise to wait for the server to start
    // listening before returning the URL.
    const addrInfo: AddressInfo = await new Promise((resolve, reject) => {
      this.server = this.app.listen(lastPort ?? 0, LOCALHOST_ADDRESS, () => {
        const addr = this.server?.address();
        if (addr && typeof addr === "object" && (addr as AddressInfo).port) {
          resolve(addr);
        } else {
          reject(new Error("No address found"));
        }
      });
    });
    this.port = addrInfo.port;
    this.url = `http://${addrInfo.address}:${addrInfo.port}`;

    this.addTrace(`Server listening on ${this.url}`);

    return {
      url: this.url,
    };
  }

  public async cleanup(): Promise<void> {
    this.addTrace(`Closing server on ${this.url}`);
    return new Promise((resolve, reject) => {
      this.server?.close((err) => {
        if (err) {
          return reject(err);
        }

        this.server?.closeAllConnections();
        return resolve();
      });
    });
  }

  public async save(): Promise<void> {
    await this.saveState({ lastPort: this.port });
  }

  private async loadState(): Promise<StateFileContents> {
    const stateFileExists = await exists(
      join(this.context.statedir, STATE_FILENAME)
    );
    if (stateFileExists) {
      const stateFileContents = await fs.promises.readFile(
        join(this.context.statedir, STATE_FILENAME),
        "utf-8"
      );
      return JSON.parse(stateFileContents);
    } else {
      return {};
    }
  }

  private async saveState(state: StateFileContents): Promise<void> {
    fs.writeFileSync(
      join(this.context.statedir, STATE_FILENAME),
      JSON.stringify(state)
    );
  }

  public async addEventSubscription(
    subscriber: string,
    subscriptionProps: EventSubscription
  ): Promise<void> {
    const routes = (subscriptionProps as any).routes as ApiRoute[];
    routes.forEach((r) => {
      const s = {
        functionHandle: subscriber,
        method: r.method,
        pathPattern: r.pathPattern,
      };
      this.routes.push(s);
      this.populateRoute(s, subscriber);
    });
  }

  public async removeEventSubscription(subscriber: string): Promise<void> {
    const index = this.routes.findIndex((s) => s.functionHandle === subscriber);
    if (index >= 0) {
      this.routes.splice(index, 1);
    }
  }

  private populateRoute(route: ApiRoute, functionHandle: string): void {
    const method = route.method.toLowerCase() as
      | "get"
      | "post"
      | "put"
      | "delete"
      | "head"
      | "options"
      | "patch"
      | "connect";

    const fnClient = this.context.getClient(functionHandle) as IFunctionClient;
    this.app[method](
      transformRoutePath(route.pathPattern),
      asyncMiddleware(
        async (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          this.addTrace(
            `Processing "${route.method} ${
              route.pathPattern
            }" params=${JSON.stringify(req.params)}).`
          );

          const apiRequest = transformRequest(req);

          try {
            const responseString = await fnClient.invoke(
              JSON.stringify(apiRequest)
            );
            const response: ApiResponse = JSON.parse(responseString ?? "{}");

            const status = response.status ?? DEFAULT_RESPONSE_STATUS;
            res.status(status);
            for (const [key, value] of Object.entries(
              response?.headers ?? {}
            )) {
              res.set(key, value);
            }
            if (response?.body !== undefined) {
              res.send(response.body);
            } else {
              res.end();
            }
            this.addTrace(`${route.method} ${route.pathPattern} - ${status}.`);
          } catch (err) {
            return next(err);
          }
        }
      )
    );
  }

  private addTrace(message: string): void {
    this.context.addTrace({
      type: TraceType.RESOURCE,
      data: {
        message,
      },
      sourcePath: this.context.resourcePath,
      sourceType: API_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}

function transformRequest(req: express.Request): ApiRequest {
  return {
    headers: sanitizeParamLikeObject(req.headers),
    body: Object.keys(req.body).length > 0 ? req.body : "",
    method: parseHttpMethod(req.method),
    path: req.path,
    query: sanitizeParamLikeObject(req.query as any),
    vars: req.params,
  };
}

function transformRoutePath(route: string): string {
  // route validation is done in the preflight file
  return route.replace(/{/g, ":").replace(/}/g, "");
}

// express v4 doesn't natively handle async request handlers, so we need to
// wrap them in a middleware function
function asyncMiddleware(
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<any>
) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

async function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve, _reject) => {
    const s = new Socket();
    s.once("error", (err) => {
      s.destroy();
      if ((err as any).code !== "ECONNREFUSED") {
        resolve(false);
      } else {
        // connection refused means the port is not used
        resolve(true);
      }
    });

    s.once("connect", () => {
      s.destroy();
      // connection successful means the port is used
      resolve(false);
    });

    s.connect(port, LOCALHOST_ADDRESS);
  });
}
