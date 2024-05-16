import { Construct } from "constructs";
import { App } from "./app";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { Policy } from "./policy";
import { ISimulatorResource } from "./resource";
import { ApiRoute, ApiSchema } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { LiftMap, lift } from "../core";
import { ToSimulatorOutput } from "../simulator/simulator";
import { IInflightHost, IResource, Node, SDK_SOURCE_MODULE } from "../std";

/**
 * Simulator implementation of `cloud.Api`.
 *
 * @inflight `@winglang/sdk.cloud.IApiClient`
 */
export class Api extends cloud.Api implements ISimulatorResource {
  private readonly handlers: Record<
    string,
    { func: Function; mapping: EventMapping }
  > = {};

  private readonly endpoint: cloud.Endpoint;
  private readonly policy: Policy;

  constructor(scope: Construct, id: string, props: cloud.ApiProps = {}) {
    super(scope, id, props);

    this.endpoint = new cloud.Endpoint(
      this,
      "Endpoint",
      simulatorAttrToken(this, "url"),
      { label: `Api ${this.node.path}` }
    );

    Node.of(this.endpoint).hidden = true;

    this.policy = new Policy(this, "Policy", { principal: this });
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    const lifts: Array<[IResource, Array<string>]> = [];
    for (const handler of Object.values(this.handlers)) {
      lifts.push([handler.func, [cloud.FunctionInflightMethods.INVOKE]]);
    }
    return {
      [cloud.ApiInflightMethods.REQUEST]: lifts,
    };
  }

  protected get _endpoint(): cloud.Endpoint {
    return this.endpoint;
  }

  private createOrGetFunction(
    inflight: cloud.IApiEndpointHandler,
    props: cloud.FunctionProps,
    pathPattern: string,
    method: cloud.HttpMethod
  ): Function {
    let handler = this.handlers[inflight._id];

    if (handler) {
      const routes = (handler.mapping.eventProps.subscriptionProps as any)
        .routes as ApiRoute[];
      routes.push({
        pathPattern,
        method,
      });

      return handler.func;
    }

    const functionHandler = lift({ handler: inflight }).inflight(
      async (ctx, event) => {
        if (!event) {
          throw new Error("invalid API request event");
        }
        let req = JSON.parse(event) as cloud.ApiRequest;
        const response = await ctx.handler(req);
        if (!response) {
          return undefined;
        } else {
          return JSON.stringify(response);
        }
      }
    );

    const fn = new Function(
      this,
      App.of(this).makeId(this, "OnRequestHandler"),
      functionHandler,
      props
    ) as Function;
    Node.of(fn).sourceModule = SDK_SOURCE_MODULE;
    Node.of(fn).title = `${method.toUpperCase()} ${pathPattern}`;
    Node.of(fn).hidden = true;

    const eventMapping = new EventMapping(
      this,
      App.of(this).makeId(this, "ApiEventMapping"),
      {
        publisher: this,
        subscriber: fn,
        subscriptionProps: {
          routes: [
            {
              pathPattern,
              method,
            },
          ],
        },
      }
    );
    this.handlers[inflight._id] = {
      func: fn,
      mapping: eventMapping,
    };

    return fn;
  }

  private addEndpoint(
    path: string,
    method: cloud.HttpMethod,
    inflight: cloud.IApiEndpointHandler,
    props: any
  ): void {
    this._validatePath(path);

    this._addToSpec(path, method, undefined, this.corsOptions);

    const fn = this.createOrGetFunction(inflight, props, path, method);
    Node.of(this).addConnection({
      source: this,
      sourceOp: cloud.ApiInflightMethods.REQUEST,
      target: fn,
      targetOp: cloud.FunctionInflightMethods.INVOKE,
      name: `${method.toLowerCase()} ${path}`,
    });
    this.policy.addStatement(fn, cloud.FunctionInflightMethods.INVOKE);
  }

  /**
   * Add a inflight to handle GET requests to a path.
   * @param path path to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public get(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiGetOptions | undefined
  ): void {
    this.addEndpoint(path, cloud.HttpMethod.GET, inflight, props);
  }

  /**
   * Add a inflight to handle POST requests to a path.
   * @param path path to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public post(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiPostOptions | undefined
  ): void {
    this.addEndpoint(path, cloud.HttpMethod.POST, inflight, props);
  }

  /**
   * Add a inflight to handle PUT requests to a path.
   * @param path path to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public put(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiPutOptions | undefined
  ): void {
    this.addEndpoint(path, cloud.HttpMethod.PUT, inflight, props);
  }

  /**
   * Add a inflight to handle DELETE requests to a path.
   * @param path path to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public delete(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiDeleteOptions | undefined
  ): void {
    this.addEndpoint(path, cloud.HttpMethod.DELETE, inflight, props);
  }

  /**
   * Add a inflight to handle PATCH requests to a path.
   * @param path path to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public patch(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiPatchOptions | undefined
  ): void {
    this.addEndpoint(path, cloud.HttpMethod.PATCH, inflight, props);
  }

  /**
   * Add a inflight to handle OPTIONS requests to a path.
   * @param path path to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public options(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiOptionsOptions | undefined
  ): void {
    this.addEndpoint(path, cloud.HttpMethod.OPTIONS, inflight, props);
  }

  /**
   * Add a inflight to handle HEAD requests to a path.
   * @param path path to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public head(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiHeadOptions | undefined
  ): void {
    this.addEndpoint(path, cloud.HttpMethod.HEAD, inflight, props);
  }

  /**
   * Add a inflight to handle CONNECT requests to a path.
   * @param path path to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public connect(
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiConnectOptions | undefined
  ): void {
    this.addEndpoint(path, cloud.HttpMethod.CONNECT, inflight, props);
  }

  public toSimulator(): ToSimulatorOutput {
    const props: ApiSchema = {
      openApiSpec: this._getOpenApiSpec(),
      corsHeaders: cloud.Api.renderCorsHeaders(this.corsOptions),
    };
    return {
      type: cloud.API_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
