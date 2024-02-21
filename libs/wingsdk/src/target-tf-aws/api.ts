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
import { DataAwsVpcEndpointService } from "../.gen/providers/aws/data-aws-vpc-endpoint-service";
import { LambdaPermission } from "../.gen/providers/aws/lambda-permission";
import { SecurityGroup } from "../.gen/providers/aws/security-group";
import { VpcEndpoint } from "../.gen/providers/aws/vpc-endpoint";
import * as cloud from "../cloud";
import { OpenApiSpec } from "../cloud";
import { convertBetweenHandlers } from "../shared/convert";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../shared/resource-names";
import { IAwsApi, STAGE_NAME } from "../shared-aws";
import { API_CORS_DEFAULT_RESPONSE } from "../shared-aws/api.cors";
import { IInflightHost, Node } from "../std";

/**
 * RestApi names are alphanumeric characters, hyphens (-) and underscores (_).
 */
const NAME_OPTS: NameOptions = {
  disallowedRegex: /[^a-zA-Z0-9\_\-]+/g,
};

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
      label: `Api ${this.node.path}`,
    });
  }

  protected get _endpoint(): cloud.Endpoint {
    return this.endpoint;
  }

  /**
   * Build the http requests
   *
   * @param method http method
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

    Node.of(this).addConnection({
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
      const prefix = `${method.toLowerCase()}${path.replace(/\//g, "_")}`;
      handler = new Function(
        this,
        App.of(this).makeId(this, prefix),
        newInflight
      );
      Node.of(handler).hidden = true;
      this.handlers[inflight._id] = handler;
    }

    return handler;
  }

  /** @internal */
  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("apis can only be bound by tfaws.Function for now");
    }

    host.addEnvironment(this.urlEnvName(), this.url);

    super.onLift(host, ops);
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

  public get restApiArn(): string {
    return this.api.api.executionArn;
  }

  public get restApiId(): string {
    return this.api.api.id;
  }

  public get restApiName(): string {
    return this.api.api.name;
  }

  public get stageName(): string {
    return this.api.stage.stageName;
  }

  public get invokeUrl(): string {
    return this.api.stage.invokeUrl;
  }

  public get deploymentId(): string {
    return this.api.deployment.id;
  }
}

/**
 * Encapsulates the API Gateway REST API as a abstraction for Terraform.
 */
class WingRestApi extends Construct {
  public readonly url: string;
  public readonly api: ApiGatewayRestApi;
  public readonly stage: ApiGatewayStage;
  public readonly deployment: ApiGatewayDeployment;
  public readonly securityGroup?: SecurityGroup;
  public readonly privateVpc: boolean;
  public readonly vpcEndpoint?: VpcEndpoint;
  private readonly region: string;
  private readonly accountId: string;

  constructor(
    scope: Construct,
    id: string,
    props: {
      getApiSpec: () => OpenApiSpec;
      cors?: cloud.ApiCorsOptions;
    }
  ) {
    super(scope, id);
    const app = App.of(this) as App;
    this.region = app.region;
    this.accountId = app.accountId;
    this.privateVpc = false;

    const defaultResponse = API_CORS_DEFAULT_RESPONSE(props.cors);
    const parameters = app.platformParameters;

    let privateApiGateway = parameters.getParameterValue(
      "tf-aws/vpc_api_gateway"
    );
    if (privateApiGateway === true) {
      let vpc = app.vpc;
      this.privateVpc = true;
      this.securityGroup = new SecurityGroup(this, `${id}SecurityGroup`, {
        vpcId: vpc.id,
        ingress: [
          {
            cidrBlocks: ["0.0.0.0/0"],
            fromPort: 0,
            toPort: 0,
            protocol: "-1",
          },
        ],
      });

      const service = new DataAwsVpcEndpointService(
        this,
        `${id}ServiceLookup`,
        {
          service: "execute-api",
        }
      );

      this.vpcEndpoint = new VpcEndpoint(this, `${id}-vpc-endpoint`, {
        vpcId: vpc.id,
        serviceName: service.serviceName,
        privateDnsEnabled: true,
        vpcEndpointType: "Interface",
        subnetIds: [...app.subnets.private.map((s) => s.id)],
        securityGroupIds: [this.securityGroup.id],
      });
    }

    this.api = new ApiGatewayRestApi(this, `${id}`, {
      name: ResourceNames.generateName(this, NAME_OPTS),
      // Lazy generation of the api spec because routes can be added after the API is created
      body: Lazy.stringValue({
        produce: () => {
          const injectGreedy404Handler = (openApiSpec: OpenApiSpec) => {
            openApiSpec.paths = {
              ...openApiSpec.paths,
              ...defaultResponse,
            };
            return openApiSpec;
          };
          return JSON.stringify(injectGreedy404Handler(props.getApiSpec()));
        },
      }),
      lifecycle: {
        createBeforeDestroy: true,
      },
    });

    if (privateApiGateway === true) {
      this.api.endpointConfiguration.types = ["PRIVATE"];
      this.api.endpointConfiguration.vpcEndpointIds = [this.vpcEndpoint!.id];

      // This policy will explicitly deny all requests that don't come from the VPC endpoint
      // which means only requests that come from the same vpc on the same private subnet and security group
      // will be allowed to access the API Gateway
      this.api.policy = JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: "*",
            Action: "execute-api:Invoke",
            Resource: ["*"],
          },
          {
            Effect: "Deny",
            Principal: "*",
            Action: "execute-api:Invoke",
            Resource: ["*"],
            Condition: {
              StringNotEquals: {
                "aws:sourceVpce": this.vpcEndpoint!.id,
              },
            },
          },
        ],
      });
    }

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

    // Intentionally not using `this.stage.invokeUrl`, it looks like it's shared with
    // the `invokeUrl` from the api deployment, which gets recreated on every deployment.
    // When this `invokeUrl` is referenced somewhere else in the stack, it can cause cyclic dependencies
    // in Terraform. Hence, we're creating our own url here.
    this.url = `https://${this.api.id}.execute-api.${this.region}.amazonaws.com/${this.stage.stageName}`;
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
    // The ARN of the Lambda function is constructed by hand so that it can be calculated
    // during preflight, instead of being resolved at deploy time.
    //
    // By doing this, the API Gateway does not need to take a dependency on its Lambda functions,
    // making it possible to write Lambda functions that reference the
    // API Gateway's URL in their inflight code.
    const functionArn = `arn:aws:lambda:${this.region}:${this.accountId}:function:${handler.name}`;

    const extension = {
      "x-amazon-apigateway-integration": {
        uri: `arn:aws:apigateway:${this.region}:lambda:path/2015-03-31/functions/${functionArn}/invocations`,
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
      functionName: handler.functionName,
      principal: "apigateway.amazonaws.com",
      sourceArn: `${this.api.executionArn}/*/${method}${Api._toOpenApiPath(
        path
      )}`,
    });
  };
}
