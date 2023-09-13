import { createHash } from "crypto";
import { join } from "path";
import { Lazy } from "cdktf";
import { Construct } from "constructs";
import { Function } from "./function";
import { core } from "..";
import { Apigatewayv2Api } from "../.gen/providers/aws/apigatewayv2-api";
import { Apigatewayv2Stage } from "../.gen/providers/aws/apigatewayv2-stage";
import { LambdaPermission } from "../.gen/providers/aws/lambda-permission";
import * as cloud from "../cloud";
import { OpenApiSpec } from "../cloud";
import { convertBetweenHandlers } from "../shared/convert";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IInflightHost, Node } from "../std";

/**
 * The stage name for the API, used in its url.
 * @see https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html
 */
// const STAGE_NAME = "prod";

/**
 * RestApi names are alphanumeric characters, hyphens (-) and underscores (_).
 */
const NAME_OPTS: NameOptions = {
  disallowedRegex: /[^a-zA-Z0-9\_\-]+/g,
};

/**
 * AWS Implementation of `cloud.Api`.
 */
export class Api extends cloud.Api {
  private readonly api: WingHttpApi;

  constructor(scope: Construct, id: string, props: cloud.ApiProps = {}) {
    super(scope, id, props);
    this.api = new WingHttpApi(this, "api", {
      apiSpec: this._getApiSpec(),
      cors: this.corsOptions,
    });
  }

  public get url(): string {
    return this.api.url;
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
    props?: cloud.ApiGetProps
  ): void {
    if (props) {
      console.warn("Api.get does not support props yet");
    }
    this._validatePath(path);

    const fn = this.addHandler(inflight);
    const apiSpecEndpoint = this.api.addEndpoint(path, "GET", fn);
    this._addToSpec(path, "GET", apiSpecEndpoint, this.corsOptions);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "get()",
    });
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
    props?: cloud.ApiPostProps
  ): void {
    if (props) {
      console.warn("Api.post does not support props yet");
    }
    this._validatePath(path);

    const fn = this.addHandler(inflight);
    const apiSpecEndpoint = this.api.addEndpoint(path, "POST", fn);
    this._addToSpec(path, "POST", apiSpecEndpoint, this.corsOptions);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "post()",
    });
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
    props?: cloud.ApiPutProps
  ): void {
    if (props) {
      console.warn("Api.put does not support props yet");
    }
    this._validatePath(path);

    const fn = this.addHandler(inflight);
    const apiSpecEndpoint = this.api.addEndpoint(path, "PUT", fn);
    this._addToSpec(path, "PUT", apiSpecEndpoint, this.corsOptions);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "put()",
    });
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
    props?: cloud.ApiDeleteProps
  ): void {
    if (props) {
      console.warn("Api.delete does not support props yet");
    }
    this._validatePath(path);

    const fn = this.addHandler(inflight);
    const apiSpecEndpoint = this.api.addEndpoint(path, "DELETE", fn);
    this._addToSpec(path, "DELETE", apiSpecEndpoint, this.corsOptions);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "delete()",
    });
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
    props?: cloud.ApiPatchProps
  ): void {
    if (props) {
      console.warn("Api.patch does not support props yet");
    }
    this._validatePath(path);

    const fn = this.addHandler(inflight);
    const apiSpecEndpoint = this.api.addEndpoint(path, "PATCH", fn);
    this._addToSpec(path, "PATCH", apiSpecEndpoint, this.corsOptions);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "patch()",
    });
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
    props?: cloud.ApiOptionsProps
  ): void {
    if (props) {
      console.warn("Api.options does not support props yet");
    }
    this._validatePath(path);

    const fn = this.addHandler(inflight);
    const apiSpecEndpoint = this.api.addEndpoint(path, "OPTIONS", fn);
    this._addToSpec(path, "OPTIONS", apiSpecEndpoint, this.corsOptions);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "options()",
    });
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
    props?: cloud.ApiHeadProps
  ): void {
    if (props) {
      console.warn("Api.head does not support props yet");
    }
    this._validatePath(path);

    const fn = this.addHandler(inflight);
    const apiSpecEndpoint = this.api.addEndpoint(path, "HEAD", fn);
    this._addToSpec(path, "HEAD", apiSpecEndpoint, this.corsOptions);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "head()",
    });
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
    props?: cloud.ApiConnectProps
  ): void {
    if (props) {
      console.warn("Api.connect does not support props yet");
    }
    this._validatePath(path);

    const fn = this.addHandler(inflight);
    const apiSpecEndpoint = this.api.addEndpoint(path, "CONNECT", fn);
    this._addToSpec(path, "CONNECT", apiSpecEndpoint);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "connect()",
    });
  }

  /**
   * Add a inflight handler to the stack
   * @param inflight Inflight to add to the API
   * @param props Endpoint props
   * @returns AWS Lambda Function
   */
  private addHandler(inflight: cloud.IApiEndpointHandler): Function {
    let fn = this.getExistingOrAddInflightHandler(inflight);
    if (!(fn instanceof Function)) {
      throw new Error("Api only supports creating tfaws.Function right now");
    }
    return fn;
  }

  /**
   * Check if a inflight handler already exists, if not create it.
   * This ensures that we don't create duplicate inflight handlers.
   * @param inflight
   * @returns
   */
  private getExistingOrAddInflightHandler(inflight: cloud.IApiEndpointHandler) {
    const existingInflightHandler = this.findExistingInflightHandler(inflight);
    if (existingInflightHandler) {
      return existingInflightHandler;
    }
    return this.addInflightHandler(inflight);
  }

  /**
   * Find an existing inflight handler
   * @param inflight Inflight to find
   * @returns
   */
  private findExistingInflightHandler(inflight: cloud.IApiEndpointHandler) {
    const inflightNodeHash = inflight.node.addr.slice(-8);

    let fn = this.node.tryFindChild(
      `${this.node.id}-OnRequest-${inflightNodeHash}`
    );
    return fn;
  }

  /**
   * Add an inflight handler to the stack
   * @param inflight Inflight to add to the API
   * @returns Inflight handler as a AWS Lambda Function
   */
  private addInflightHandler(inflight: cloud.IApiEndpointHandler) {
    const inflightNodeHash = inflight.node.addr.slice(-8);

    const functionHandler = convertBetweenHandlers(
      this,
      `${this.node.id}-OnRequestHandler-${inflightNodeHash}`,
      inflight,
      join(
        __dirname.replace("target-tf-aws", "shared-aws"),
        "api.onrequest.inflight.js"
      ),
      "ApiOnRequestHandlerClient",
      {
        corsHeaders: this._generateCorsHeaders(this.corsOptions)
          ?.defaultResponse,
      }
    );
    return Function._newFunction(
      this,
      `${this.node.id}-OnRequest-${inflightNodeHash}`,
      functionHandler
    );
  }

  /** @internal */
  public bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("topics can only be bound by tfaws.Function for now");
    }

    host.addEnvironment(this.urlEnvName(), this.url);

    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "ApiClient",
      [`process.env["${this.urlEnvName()}"]`]
    );
  }

  private urlEnvName(): string {
    return ResourceNames.generateName(this, {
      disallowedRegex: /[^a-zA-Z0-9_]/,
      sep: "_",
      case: CaseConventions.UPPERCASE,
    });
  }
}

class WingHttpApi extends Construct {
  public readonly url: string;
  public readonly api: Apigatewayv2Api;
  public readonly stage: Apigatewayv2Stage;

  constructor(
    scope: Construct,
    id: string,
    props: {
      apiSpec: OpenApiSpec;
      cors?: cloud.ApiCorsOptions;
    }
  ) {
    super(scope, id);

    const APIGW_DEFAULT_ROUTE = {
      "/$default": {
        "x-amazon-apigateway-any-method": {
          isDefaultRoute: true,
          "x-amazon-apigateway-integration": {
            payloadFormatVersion: "1.0",
            type: "http_proxy",
            httpMethod: "ANY",
            uri: "https://example.com/",
          },
        },
      },
    };

    props.apiSpec.paths = {
      ...APIGW_DEFAULT_ROUTE,
    };

    const APIGW_CORS_CONFIG = props.cors
      ? {
          corsConfiguration: {
            allowOrigins: props.cors.allowOrigin
              ? props.cors.allowOrigin
              : ["*"],
            allowMethods: props.cors.allowMethods
              ? props.cors.allowMethods
              : ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
            allowHeaders: props.cors.allowHeaders
              ? props.cors.allowHeaders
              : ["Content-Type", "Authorization", "X-Requested-With"],
            exposeHeaders: props.cors.exposeHeaders
              ? props.cors.exposeHeaders
              : [],
            allowCredentials: props.cors.allowCredentials
              ? props.cors.allowCredentials
              : false,
            maxAge: props.cors.maxAge ? props.cors.maxAge : 0,
          },
        }
      : {};

    this.api = new Apigatewayv2Api(this, "api", {
      name: ResourceNames.generateName(this, NAME_OPTS),
      protocolType: "HTTP",
      body: Lazy.stringValue({
        produce: () => {
          return JSON.stringify(props.apiSpec);
        },
      }),
      ...APIGW_CORS_CONFIG,
    });

    this.stage = new Apigatewayv2Stage(this, "stage", {
      apiId: this.api.id,
      name: "$default",
      autoDeploy: true,
    });

    this.url = this.stage.invokeUrl;
  }

  public addEndpoint(path: string, method: string, handler: Function) {
    const endpointExtension = this.createApiSpecExtension(handler);
    this.addHandlerPermissions(path, method, handler);
    return endpointExtension;
  }

  private createApiSpecExtension(handler: Function) {
    const extension = {
      "x-amazon-apigateway-integration": {
        payloadFormatVersion: "2.0",
        type: "aws_proxy",
        httpMethod: "POST",
        uri: handler.arn,
      },
    };

    return extension;
  }

  private addHandlerPermissions = (
    path: string,
    method: string,
    handler: Function
  ) => {
    const pathHash = createHash("sha1").update(path).digest("hex").slice(-8);
    const permissionId = `${method}-${pathHash}`;
    new LambdaPermission(this, `permission-${permissionId}`, {
      statementId: `AllowExecutionFromAPIGateway-${permissionId}`,
      action: "lambda:InvokeFunction",
      functionName: handler._functionName,
      principal: "apigateway.amazonaws.com",
      sourceArn: `${this.api.executionArn}/*/${method}${path}`,
    });
  };
}
