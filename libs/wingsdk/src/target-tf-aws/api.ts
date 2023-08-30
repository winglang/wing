import { createHash } from "crypto";
import { join } from "path";

import { Fn, Lazy } from "cdktf";
import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { core } from "..";
import { ApiGatewayDeployment } from "../.gen/providers/aws/api-gateway-deployment";
import { ApiGatewayRestApi } from "../.gen/providers/aws/api-gateway-rest-api";
import { ApiGatewayStage } from "../.gen/providers/aws/api-gateway-stage";
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
const STAGE_NAME = "prod";

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
  private readonly api: WingRestApi;
  constructor(scope: Construct, id: string, props: cloud.ApiProps = {}) {
    super(scope, id, props);
    this.api = new WingRestApi(this, "api", {
      apiSpec: this._getApiSpec(),
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
    this._addToSpec(path, "GET", apiSpecEndpoint);

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
    this._addToSpec(path, "POST", apiSpecEndpoint);

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
    this._addToSpec(path, "PUT", apiSpecEndpoint);

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
    this._addToSpec(path, "DELETE", apiSpecEndpoint);

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
    this._addToSpec(path, "PATCH", apiSpecEndpoint);

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
    this._addToSpec(path, "OPTIONS", apiSpecEndpoint);

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
    this._addToSpec(path, "HEAD", apiSpecEndpoint);

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
      "ApiOnRequestHandlerClient"
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

/**
 * DEFAULT_404_RESPONSE is a constant that defines the default response when a 404 error occurs.
 * It is used to handle all requests that do not match any defined routes in the API Gateway.
 * The response is a mock integration type, which means it returns a mocked response without
 * forwarding the request to any backend. The response status code is set to 404 and the
 * Content-Type header is set to 'application/json'.
 */
const DEFAULT_404_RESPONSE = {
  "/{proxy+}": {
    "x-amazon-apigateway-any-method": {
      produces: ["application/json"],
      consumes: ["application/json"],
      "x-amazon-apigateway-integration": {
        type: "mock",
        requestTemplates: {
          "application/json": '{"statusCode": 404}',
        },
        responses: {
          default: {
            statusCode: "404",
            responseParameters: {
              "method.response.header.Content-Type": "'application/json'",
            },
            responseTemplates: {
              "application/json":
                '{"statusCode: 404, "message": "Error: Resource not found"}',
            },
          },
        },
      },
      responses: {
        404: {
          description: "404 response",
          headers: {
            "Content-Type": {
              type: "string",
            },
          },
        },
      },
    },
  },
};

/**
 * Encapsulates the API Gateway REST API as a abstraction for Terraform.
 */
class WingRestApi extends Construct {
  public readonly url: string;
  public readonly api: ApiGatewayRestApi;
  public readonly stage: ApiGatewayStage;
  private readonly deployment: ApiGatewayDeployment;
  private readonly region: string;
  constructor(
    scope: Construct,
    id: string,
    props: {
      apiSpec: OpenApiSpec;
    }
  ) {
    super(scope, id);

    this.region = (App.of(this) as App).region;

    this.api = new ApiGatewayRestApi(this, "api", {
      name: ResourceNames.generateName(this, NAME_OPTS),
      // Lazy generation of the api spec because routes can be added after the API is created
      body: Lazy.stringValue({
        produce: () => {
          const injectGreedy404Handler = (openApiSpec: OpenApiSpec) => {
            openApiSpec.paths = {
              ...openApiSpec.paths,
              ...DEFAULT_404_RESPONSE,
            };
            return openApiSpec;
          };
          return JSON.stringify(injectGreedy404Handler(props.apiSpec));
        },
      }),
    });

    this.deployment = new ApiGatewayDeployment(this, "deployment", {
      restApiId: this.api.id,
      lifecycle: {
        createBeforeDestroy: true,
      },
      triggers: {
        // Trigger redeployment when the api spec changes
        redeployment: Fn.sha256(this.api.body),
      },
    });

    this.stage = new ApiGatewayStage(this, "stage", {
      restApiId: this.api.id,
      stageName: STAGE_NAME,
      deploymentId: this.deployment.id,
    });

    //should be exported from here, otherwise won't be mapped to the right token
    this.url = this.stage.invokeUrl;
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
        uri: `arn:aws:apigateway:${this.region}:lambda:path/2015-03-31/functions/${handler.arn}/invocations`,
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
    new LambdaPermission(this, `permission-${permissionId}`, {
      statementId: `AllowExecutionFromAPIGateway-${permissionId}`,
      action: "lambda:InvokeFunction",
      functionName: handler._functionName,
      principal: "apigateway.amazonaws.com",
      sourceArn: `${this.api.executionArn}/*/${method}${path}`,
    });
  };
}
