import { Construct } from "constructs";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { ApiSchema, ApiRoute } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";

/**
 * Simulator implementation of `cloud.Api`.
 *
 * @inflight `@winglang/sdk.cloud.IApiClient`
 */
export class Api extends cloud.Api implements ISimulatorResource {
  private eventMappings: { [key: string]: EventMapping } = {};

  constructor(scope: Construct, id: string, props: cloud.ApiProps = {}) {
    super(scope, id, props);
  }

  public get url(): string {
    return simulatorAttrToken(this, "url");
  }

  private createOrGetFunction(
    inflight: cloud.IApiEndpointHandler,
    props: cloud.FunctionProps,
    path: string,
    method: cloud.HttpMethod
  ): Function {
    const hash = inflight.node.addr.slice(-8);
    const fnPath = `OnRequestHandler-${hash}`;
    const eventId = `ApiEventMapping-${hash}`;

    let existingFn = this.node.tryFindChild(fnPath) as Function;

    if (existingFn) {
      const event = this.eventMappings[eventId];
      const routes = (event.eventProps.subscriptionProps as any)
        .routes as ApiRoute[];
      routes.push({
        path,
        method,
      });

      this.eventMappings[eventId] = event;
      return existingFn;
    }

    const fn = new Function(this, fnPath, inflight, props) as Function;
    Node.of(fn).sourceModule = SDK_SOURCE_MODULE;
    Node.of(fn).title = `${method.toUpperCase()} ${path}`;

    const eventMapping = new EventMapping(this, eventId, {
      publisher: this,
      subscriber: fn,
      subscriptionProps: {
        routes: [
          {
            path,
            method,
          },
        ],
      },
    });
    this.eventMappings[eventId] = eventMapping;

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
      target: fn,
      name: `${method.toLowerCase()}()`,
    });
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

  public toSimulator(): BaseResourceSchema {
    const schema: ApiSchema = {
      type: cloud.API_FQN,
      path: this.node.path,
      props: {
        openApiSpec: this._getOpenApiSpec(),
        corsHeaders: this._generateCorsHeaders(this.corsOptions),
      },
      attrs: {} as any,
    };
    return schema;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
