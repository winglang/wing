import { Construct } from "constructs";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { ApiSchema, API_TYPE } from "./schema-resources";
import {
  bindSimulatorResource,
  makeSimulatorJsClient,
  simulatorHandleToken,
} from "./util";
import * as cloud from "../cloud";
import * as core from "../core";

export class Api extends cloud.Api implements ISimulatorResource {
  private _routes: ApiSchema["props"]["routes"] = [];
  constructor(
    scope: Construct,
    id: string,
    props?: cloud.ApiProps | undefined
  ) {
    super(scope, id, props);
  }

  /**
   * Add a inflight to handle GET requests to a route.
   * @param route Route to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */

  public get(
    route: string,
    inflight: core.Inflight,
    props?: cloud.ApiGetProps | undefined
  ): void {
    this._addToSpec(route, cloud.HttpMethod.GET, undefined);
    const hash = inflight.node.addr.slice(-8);

    // No conversion is necessary here because the simulator uses the
    // `ApiRequest` and `ApiResponse` types directly.

    const fn = Function._newFunction(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${hash}`,
      inflight,
      props
    );

    // At the time the Api is created in the simulator, it needs to be able to
    // call referenced functions.
    // TODO: is this necessary?
    this.node.addDependency(fn);

    const functionHandle = simulatorHandleToken(fn);
    this._routes.push({
      route,
      method: cloud.HttpMethod.GET,
      functionHandle,
    });

    core.Resource.addConnection({
      from: this,
      to: fn,
      relationship: "on_message",
    });
  }

  /**
   * Add a inflight to handle POST requests to a route.
   * @param route Route to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public post(
    route: string,
    inflight: core.Inflight,
    props?: cloud.ApiPostProps | undefined
  ): void {
    inflight;
    props;
    this._addToSpec(route, cloud.HttpMethod.POST, undefined);
  }

  /**
   * Add a inflight to handle PUT requests to a route.
   * @param route Route to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public put(
    route: string,
    inflight: core.Inflight,
    props?: cloud.ApiPutProps | undefined
  ): void {
    inflight;
    props;
    this._addToSpec(route, cloud.HttpMethod.PUT, undefined);
  }

  /**
   * Add a inflight to handle DELETE requests to a route.
   * @param route Route to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public delete(
    route: string,
    inflight: core.Inflight,
    props?: cloud.ApiDeleteProps | undefined
  ): void {
    inflight;
    props;
    this._addToSpec(route, cloud.HttpMethod.DELETE, undefined);
  }

  /**
   * Add a inflight to handle PATCH requests to a route.
   * @param route Route to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public patch(
    route: string,
    inflight: core.Inflight,
    props?: cloud.ApiPatchProps | undefined
  ): void {
    inflight;
    props;
    this._addToSpec(route, cloud.HttpMethod.PATCH, undefined);
  }

  /**
   * Add a inflight to handle OPTIONS requests to a route.
   * @param route Route to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public options(
    route: string,
    inflight: core.Inflight,
    props?: cloud.ApiOptionsProps | undefined
  ): void {
    inflight;
    props;
    this._addToSpec(route, cloud.HttpMethod.OPTIONS, undefined);
  }

  /**
   * Add a inflight to handle HEAD requests to a route.
   * @param route Route to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public head(
    route: string,
    inflight: core.Inflight,
    props?: cloud.ApiHeadProps | undefined
  ): void {
    inflight;
    props;
    this._addToSpec(route, cloud.HttpMethod.HEAD, undefined);
  }

  /**
   * Add a inflight to handle CONNECT requests to a route.
   * @param route Route to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  public connect(
    route: string,
    inflight: core.Inflight,
    props?: cloud.ApiConnectProps | undefined
  ): void {
    inflight;
    props;
    this._addToSpec(route, cloud.HttpMethod.CONNECT, undefined);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: ApiSchema = {
      type: API_TYPE,
      path: this.node.path,
      props: {
        routes: this._routes,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient("bucket", this);
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    bindSimulatorResource("api", this, host);
    super._bind(host, ops);
  }
}
