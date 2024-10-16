
import * as cdktf from "@cdktf/provider-aws";
import {
  Api,
  Endpoint,
  type ApiConnectOptions,
  type ApiDeleteOptions,
  type ApiGetOptions,
  type ApiHeadOptions,
  type ApiOptionsOptions,
  type ApiPatchOptions,
  type ApiPostOptions,
  type ApiProps,
  type ApiPutOptions,
  type IApiEndpointHandler,
} from "@winglang/sdk/lib/cloud";
import { App, Lifting } from "@winglang/sdk/lib/core";
import { Testing } from "@winglang/sdk/lib/simulator/testing";
import { convertBetweenHandlers } from "@winglang/sdk/lib/shared/convert.js";
import {
  ResourceNames,
  type NameOptions,
} from "@winglang/sdk/lib/shared/resource-names.js";
import { Node } from "@winglang/sdk/lib/std";
import { App as TfAwsApp } from "@winglang/sdk/lib/target-tf-aws/app.js";
import type { Construct } from "constructs";
import { CustomFunction } from "./function";

export class CustomApi extends Api {
  NAME_OPTS: NameOptions = {
    // eslint-disable-next-line unicorn/better-regex
    disallowedRegex: /[^a-zA-Z0-9\_\-]+/g,
  };

  handlers: Record<string, IApiEndpointHandler> = {};
  func: CustomFunction;
  handlersLines: string[] = [];
  endpoint: Endpoint;
  constructor(scope: Construct, id: string, props: ApiProps = {}) {
    super(scope, id, props);
    this.func = new CustomFunction(
      this.handlersLines,
      this,
      `${id}-function`,
      Testing.makeHandler(`
async handle(event) {
console.log(JSON.stringify(event, null, 2))
const fn = exports[\`\${event.httpMethod.toUpperCase()}__\${event.path}\`];
if (!fn) {
return {
"isBase64Encoded" : false,
"statusCode": 404,
"headers": {},
"body": "Not Found"
};
}
return fn(event);
}`),
    );
    const api = new cdktf.apiGatewayRestApi.ApiGatewayRestApi(
      this,
      `${id}`,
      {
        name: ResourceNames.generateName(this, this.NAME_OPTS),
        endpointConfiguration: {
          types: ["REGIONAL"],
        },
      },
    );

    const proxy = new cdktf.apiGatewayResource.ApiGatewayResource(
      this,
      "proxy resource",
      {
        restApiId: api.id,
        parentId: api.rootResourceId,
        pathPart: "{proxy+}",
      },
    );

    const proxyMethod = new cdktf.apiGatewayMethod.ApiGatewayMethod(
      this,
      "proxy method",
      {
        restApiId: api.id,
        resourceId: proxy.id,
        authorization: "NONE",
        httpMethod: "ANY",
      },
    );

    const proxyIntegration =
      new cdktf.apiGatewayIntegration.ApiGatewayIntegration(
        this,
        "proxy integration",
        {
          httpMethod: proxyMethod.httpMethod,
          resourceId: proxy.id,
          restApiId: api.id,
          type: "AWS_PROXY",
          integrationHttpMethod: "POST",
          uri: this.func.invokeArn,
        },
      );

    const rootMethod = new cdktf.apiGatewayMethod.ApiGatewayMethod(
      this,
      "root method",
      {
        restApiId: api.id,
        resourceId: api.rootResourceId,
        authorization: "NONE",
        httpMethod: "ANY",
      },
    );

    const rootIntegration =
      new cdktf.apiGatewayIntegration.ApiGatewayIntegration(
        this,
        "root integration",
        {
          httpMethod: rootMethod.httpMethod,
          resourceId: rootMethod.resourceId,
          restApiId: api.id,
          type: "AWS_PROXY",
          integrationHttpMethod: "POST",
          uri: this.func.invokeArn,
        },
      );

    const stageName = "prod";
    new cdktf.apiGatewayDeployment.ApiGatewayDeployment(
      this,
      "deployment",
      {
        restApiId: api.id,
        dependsOn: [proxyIntegration, rootIntegration],
        stageName,
      },
    );

    new cdktf.lambdaPermission.LambdaPermission(
      this,
      "lambda permission",
      {
        action: "lambda:InvokeFunction",
        functionName: this.func.functionName,
        principal: "apigateway.amazonaws.com",
        sourceArn: `${api.executionArn}/*/*`,
      },
    );

    this.endpoint = new Endpoint(
      this,
      "Endpoint",
      `https://${api.id}.execute-api.${(App.of(this) as TfAwsApp).region}.amazonaws.com/${stageName}`,
      {
        label: `Api ${this.node.path}`,
      },
    );
  }

  protected get _endpoint(): Endpoint {
    return this.endpoint;
  }

  public get(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiGetOptions,
  ): void {
    this.httpRequests("GET", path, inflight, props);
  }

  public post(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiPostOptions,
  ): void {
    this.httpRequests("POST", path, inflight, props);
  }

  public put(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiPutOptions,
  ): void {
    this.httpRequests("PUT", path, inflight, props);
  }

  public delete(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiDeleteOptions,
  ): void {
    this.httpRequests("DELETE", path, inflight, props);
  }

  public patch(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiPatchOptions,
  ): void {
    this.httpRequests("PATCH", path, inflight, props);
  }

  public options(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiOptionsOptions,
  ): void {
    this.httpRequests("OPTIONS", path, inflight, props);
  }

  public head(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiHeadOptions,
  ): void {
    this.httpRequests("HEAD", path, inflight, props);
  }

  public connect(
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiConnectOptions,
  ): void {
    this.httpRequests("CONNECT", path, inflight, props);
  }

  private httpRequests(
    method: string,
    path: string,
    inflight: IApiEndpointHandler,
    props?: ApiGetOptions,
  ): void {
    const lowerMethod = method.toLowerCase();
    const upperMethod = method.toUpperCase();

    if (props) {
      console.warn(`Api.${lowerMethod} does not support props yet`);
    }
    this._validatePath(path);

    this.handlers[`${method}__${path}`] = inflight;
    Node.of(this.func).addDependency(inflight);
  }

  public _preSynthesize(): void {
    super._preSynthesize();

    for (const [id, handler] of Object.entries(this.handlers)) {
      const lines = this.getHandlerLines(id, handler);
      this.handlersLines.push(...lines);

      Lifting.lift(handler, this.func, ["handle"]);
    }
  }

  protected getHandlerLines(
    id: string,
    handler: IApiEndpointHandler,
  ): string[] {
    const newInflight = convertBetweenHandlers(
      handler,
      // eslint-disable-next-line unicorn/prefer-module
      require.resolve(
        "@winglang/sdk/lib/shared-aws/api.onrequest.inflight.js",
      ),
      "ApiOnRequestHandlerClient",
      {
        corsHeaders: this._generateCorsHeaders(this.corsOptions)
          ?.defaultResponse,
      },
    );

    const inflightClient = newInflight._toInflight();
    const lines = new Array<string>();
    lines.push(`exports["${id}"] = async function(event) {`);
    lines.push(
      `  $handlers["${id}"] = $handlers["${id}"] ?? (${inflightClient});`,
    );
    lines.push(`  return await $handlers["${id}"].handle(event);`);
    lines.push("};");
    return lines;
  }
}