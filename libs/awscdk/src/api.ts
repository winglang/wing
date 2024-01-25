import { createHash } from "crypto";
import { join } from "path";
import { Lazy } from "aws-cdk-lib";
import {
  ApiDefinition,
  Deployment,
  SpecRestApi,
  Stage,
} from "aws-cdk-lib/aws-apigateway";
import { CfnPermission } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { cloud, core, std } from "@winglang/sdk";
import { convertBetweenHandlers } from "@winglang/sdk/lib/shared/convert";
import { IAwsApi, STAGE_NAME } from "@winglang/sdk/lib/shared-aws/api";
import { API_CORS_DEFAULT_RESPONSE } from "@winglang/sdk/lib/shared-aws/api.cors";

/**
 * AWS Implementation of `cloud.Api`.
 */
export class Api extends cloud.Api implements IAwsApi {
  private readonly api: WingRestApi;
  private readonly handlers: Record<string, Function> = {};
  private readonly endpoint: cloud.Endpoint;

  constructor(scope: Construct, id: string, props: cloud.ApiProps = {}) {
    super(scope, id, props);
    this.api = new WingRestApi(this, "api", {
      getApiSpec: this._getOpenApiSpec.bind(this),
      cors: this.corsOptions,
    });
    this.endpoint = new cloud.Endpoint(this, "Endpoint", this.api.url, {
      label: `Endpoint for Api ${this.node.path}`,
    });
  }

  protected get _endpoint(): cloud.Endpoint {
    return this.endpoint;
  }

  /**
   * Build the http requests
   *
   * @param method htttp method
   * @param path path to add
   * @param inflight Inflight to handle request
   * @param props Additional props
   */
  private httpRequests(
    method: string,
    path: string,
    inflight: cloud.IApiEndpointHandler,
    props?: cloud.ApiGetOptions
  ): void {
    const lowerMethod = method.toLowerCase();
    const upperMethod = method.toUpperCase();

    if (props) {
      console.warn(`Api.${lowerMethod} does not support props yet`);
    }
    this._validatePath(path);

    const fn = this.addHandler(inflight, method, path);
    const apiSpecEndpoint = this.api.addEndpoint(path, upperMethod, fn);
    this._addToSpec(path, upperMethod, apiSpecEndpoint, this.corsOptions);

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: `${lowerMethod}()`,
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
    props?: cloud.ApiGetOptions
  ): void {
    this.httpRequests("GET", path, inflight, props);
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
    props?: cloud.ApiPostOptions
  ): void {
    this.httpRequests("POST", path, inflight, props);
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
    props?: cloud.ApiPutOptions
  ): void {
    this.httpRequests("PUT", path, inflight, props);
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
    props?: cloud.ApiDeleteOptions
  ): void {
    this.httpRequests("DELETE", path, inflight, props);
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
    props?: cloud.ApiPatchOptions
  ): void {
    this.httpRequests("PATCH", path, inflight, props);
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
    props?: cloud.ApiOptionsOptions
  ): void {
    this.httpRequests("OPTIONS", path, inflight, props);
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
    props?: cloud.ApiHeadOptions
  ): void {
    this.httpRequests("HEAD", path, inflight, props);
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
    props?: cloud.ApiConnectOptions
  ): void {
    this.httpRequests("CONNECT", path, inflight, props);
  }

  /**
   * Add a inflight handler to the stack
   * @param inflight Inflight to add to the API
   * @param props Endpoint props
   * @returns AWS Lambda Function
   */
  private addHandler(
    inflight: cloud.IApiEndpointHandler,
    method: string,
    path: string
  ): Function {
    let fn = this.addInflightHandler(inflight, method, path);
    if (!(fn instanceof Function)) {
      throw new Error("Api only supports creating tfaws.Function right now");
    }
    return fn;
  }

  /**
   * Add an inflight handler to the stack
   * Ensures that we don't create duplicate inflight handlers.
   * @param inflight Inflight to add to the API
   * @returns Inflight handler as a AWS Lambda Function
   */
  private addInflightHandler(
    inflight: cloud.IApiEndpointHandler,
    method: string,
    path: string
  ): Function {
    let handler = this.handlers[inflight._id];
    if (!handler) {
      const newInflight = convertBetweenHandlers(
        inflight,
        join(__dirname, "api.onrequest.inflight.js"),
        "ApiOnRequestHandlerClient",
        {
          corsHeaders: this._generateCorsHeaders(this.corsOptions)
            ?.defaultResponse,
        }
      );
      const prefix = `${method.toLowerCase()}${path.replace(/\//g, "_")}_}`;
      handler = new Function(
        this,
        App.of(this).makeId(this, prefix),
        newInflight
      );
      this.handlers[inflight._id] = handler;
    }

    return handler;
  }

  /** @internal */
  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("apis can only be bound by awscdk.Function for now");
    }

    host.addEnvironment(this.urlEnvName(), this.url);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname,
      __filename,
      "ApiClient",
      [`process.env["${this.urlEnvName()}"]`]
    );
  }

  private urlEnvName(): string {
    return `API_${this.node.addr.slice(-8)}`;
  }

  public get restApiArn(): string {
    return this.api.api.arnForExecuteApi();
  }

  public get restApiId(): string {
    return this.api.api.restApiId;
  }

  public get restApiName(): string {
    return this.api.api.restApiName;
  }

  public get stageName(): string {
    return this.api.stage.stageName;
  }

  public get invokeUrl(): string {
    return this.api.stage.urlForPath();
  }

  public get deploymentId(): string {
    return this.api.deployment.deploymentId;
  }
}

/**
 * Encapsulates the API Gateway REST API as a abstraction for aws-cdk.
 */
class WingRestApi extends Construct {
  public readonly api: SpecRestApi;
  public readonly deployment: Deployment;
  public readonly stage: Stage;
  private readonly region: string;

  constructor(
    scope: Construct,
    id: string,
    props: {
      getApiSpec: () => cloud.OpenApiSpec;
      cors?: cloud.ApiCorsOptions;
    }
  ) {
    super(scope, id);
    this.region = (App.of(this) as App).region;

    const defaultResponse = API_CORS_DEFAULT_RESPONSE(props.cors);

    this.api = new SpecRestApi(this, `${id}`, {
      apiDefinition: ApiDefinition.fromInline(
        Lazy.any({
          produce: () => {
            const injectGreedy404Handler = (openApiSpec: cloud.OpenApiSpec) => {
              openApiSpec.paths = {
                ...openApiSpec.paths,
                ...defaultResponse,
              };
              return openApiSpec;
            };
            return injectGreedy404Handler(props.getApiSpec());
          },
        })
      ),
      deploy: false,
    });

    this.deployment = new Deployment(this, "deployment", {
      api: this.api,
      retainDeployments: true,
    });

    this.stage = new Stage(this, "stage", {
      deployment: this.deployment,
      stageName: STAGE_NAME,
    });
  }

  public get url(): string {
    return this.stage.urlForPath();
  }

  /**
   * Add an endpoint to the API
   * @param path Path of the endpoint
   * @param method Method of the endpoint
   * @param handler Lambda function to handle the endpoint
   * @returns OpenApi spec extension for the endpoint
   */
  public addEndpoint(path: string, method: string, handler: Function) {
    const endpointExtension = this.createApiSpecExtension(handler);
    this.addHandlerPermissions(path, method, handler);
    return endpointExtension;
  }

  /**
   * Creates a OpenApi extension object for the endpoint and handler
   * @param handler Lambda function to handle the endpoint
   * @returns OpenApi extension object for the endpoint and handler
   */
  private createApiSpecExtension(handler: Function) {
    const extension = {
      "x-amazon-apigateway-integration": {
        uri: `arn:aws:apigateway:${this.region}:lambda:path/2015-03-31/functions/${handler.functionArn}/invocations`,
        type: "aws_proxy",
        httpMethod: "POST",
        responses: {
          default: {
            statusCode: "200",
          },
        },
        passthroughBehavior: "when_no_match",
        contentHandling: "CONVERT_TO_TEXT",
      },
    };

    return extension;
  }

  /**
   * Add permissions to the handler to allow it to be called by the API
   * @param path Path of the endpoint
   * @param method Method of the endpoint
   * @param handler Lambda function to handle the endpoint
   */
  private addHandlerPermissions = (
    path: string,
    method: string,
    handler: Function
  ) => {
    const pathHash = createHash("sha1").update(path).digest("hex").slice(-8);
    const permissionId = `${method}-${pathHash}`;
    new CfnPermission(this, `permission-${permissionId}`, {
      action: "lambda:InvokeFunction",
      functionName: handler.functionName,
      principal: "apigateway.amazonaws.com",
      sourceArn: this.api.arnForExecuteApi(method, Api._toOpenApiPath(path)),
    });
  };
}
