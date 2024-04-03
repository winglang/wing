import * as fs from "fs";
import { Server } from "http";
import { AddressInfo, Socket } from "net";
import { join } from "path";
import express from "express";
import pathToRegexp from "path-to-regexp";
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
  UpdatePlan,
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

interface Route {
  /**
   * The method's route as an uppercase string, e.g. "GET"
   */
  method: string;
  /**
   * The path pattern as a regex.
   */
  pathRegex: RegExp;
  /**
   * Information about keys from the path pattern.
   * See https://www.npmjs.com/package/path-to-regexp#path-to-regexp-1
   */
  pathRegexKeys: pathToRegexp.Key[];
  /**
   * The path pattern as the user originally wrote it.
   * For debugging and error messages.
   */
  originalPathPattern: string;
  /**
   * The function handle that should be invoked when this route is hit.
   */
  functionHandle: string;
}

export class Api
  implements IApiClient, ISimulatorResourceInstance, IEventPublisher
{
  private readonly routes: Route[];
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

    // The routes are populated by the addEventSubscription method and removed
    // by the removeEventSubscription method. Since the routes can change,
    // we just maintain a list of routes internally and do the routing ourselves.
    this.app.use(
      asyncMiddleware(
        async (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          const method = req.method.toUpperCase();

          // Greedily match the first route that matches the method and path of the request.
          const route = this.routes.find(
            (r) => r.method === method && r.pathRegex.test(req.path)
          );

          if (!route) {
            return next();
          }

          const keys = route.pathRegexKeys ?? [];
          const match = route.pathRegex.exec(req.path);
          if (match) {
            for (let i = 1; i < match.length; i++) {
              const key = keys[i - 1];
              if (key) {
                req.params[key.name] = match[i];
              }
            }
          }

          const apiRequest = transformRequest(req);

          this.addTrace(
            `Processing "${route.method} ${
              route.originalPathPattern
            }" params=${JSON.stringify(req.params)}).`
          );

          try {
            const fnClient = this.context.getClient(
              route.functionHandle
            ) as IFunctionClient;
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
            this.addTrace(
              `${route.method} ${route.originalPathPattern} - ${status}.`
            );
          } catch (err) {
            return next(err);
          }
        }
      )
    );
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

  public async plan() {
    return UpdatePlan.AUTO;
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
    for (const routeConfig of routes) {
      // Routes with variables are generated in preflight in the form of /{param} based on the OpenAPI 3.0 spec [1]
      // Here we convert them to express's format of /:param so that we can use path-to-regexp to match the routes
      //
      // [1] https://swagger.io/docs/specification/describing-parameters/
      const expressPath = transformRoutePath(routeConfig.pathPattern);

      const pathRegexKeys: pathToRegexp.Key[] = [];
      const pathRegex = pathToRegexp(expressPath, pathRegexKeys, {
        strict: true,
        sensitive: true,
      });
      const route: Route = {
        method: routeConfig.method.toString().toUpperCase(),
        pathRegex,
        pathRegexKeys,
        originalPathPattern: routeConfig.pathPattern,
        functionHandle: subscriber,
      };
      this.routes.push(route);
    }
  }

  public async removeEventSubscription(subscriber: string): Promise<void> {
    const index = this.routes.findIndex((s) => s.functionHandle === subscriber);
    if (index >= 0) {
      this.routes.splice(index, 1);
    }
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
