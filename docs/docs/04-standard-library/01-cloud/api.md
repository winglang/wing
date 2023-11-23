---
title: Api
id: api
description: A built-in resource for creating HTTP endpoints in the cloud.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    APIs,
    Endpoints,
    HTTP endpoint,
  ]
sidebar_position: 1
---

The `cloud.Api` resource represents a collection of HTTP endpoints that can be invoked by clients over the internet.
APIs often serve as the front door for applications to access data, business logic, or functionality from your backend services.

The `Api` resource models an endpoint as a collection of routes, each mapped to an event handler function.
A route is a combination of a path, like `"/users/:userid"` and a set of HTTP methods, like `GET`, `POST`, or `DELETE`.
When a client invokes a route, the corresponding event handler function executes.

## Usage

### REST API

The following example shows a complete REST API implementation using `cloud.Api`, `ex.Table` & `cloud.Counter`

```ts playground
bring cloud;
bring ex;

let api = new cloud.Api();
// Used for generating unique id
let counter = new cloud.Counter();
// our employee database
let db = new ex.Table(
  name: "employees",
  primaryKey: "id",
  columns: {
    "name" => ex.ColumnType.STRING
  }
);

api.get("/employees", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let result = MutJson [];
  let var i = 0;
  for employee in db.list() {
    result.setAt(i, employee);
    i = i + 1;
  }
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(result)
  };
});


api.get("/employees/:id", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let employee = db.get(request.vars.get("id"));
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(employee)
  };
});

api.post("/employees", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
   if let body = request.body {
    let employeeData = Json.parse(body);
    let id = "{counter.inc()}";
    db.insert(id, employeeData);
    return cloud.ApiResponse {
      status: 201,
      body: id
    };
   }
});

api.put("/employees/:id", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  if let body = request.body {
    let employeeData = Json.parse(body);
    let id = request.vars.get("id");
    db.update(id, employeeData);
    return cloud.ApiResponse {
      status: 200,
      body: Json.stringify(employeeData)
    };
  }
});

api.delete("/employees/:id", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let id = request.vars.get("id");
  db.delete(id);
  return cloud.ApiResponse {
    status: 204
  };
});
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Api` uses [nodejs express](https://expressjs.com/).

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Api` uses [Amazon API Gateway](https://aws.amazon.com/api-gateway/).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#625](https://github.com/winglang/wing/issues/625))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#624](https://github.com/winglang/wing/issues/624))
## API Reference <a name="API Reference" id="API Reference"></a>

### Api <a name="Api" id="@winglang/sdk.cloud.Api"></a>

Functionality shared between all `Api` implementations.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Api.Initializer"></a>

```wing
bring cloud;

new cloud.Api(props?: ApiProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Api.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.ApiProps">ApiProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiProps">ApiProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Api.connect">connect</a></code> | Add a inflight handler to the api for CONNECT requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.delete">delete</a></code> | Add a inflight handler to the api for DELETE requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.get">get</a></code> | Add a inflight handler to the api for GET requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.head">head</a></code> | Add a inflight handler to the api for HEAD requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.options">options</a></code> | Add a inflight handler to the api for OPTIONS requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.patch">patch</a></code> | Add a inflight handler to the api for PATCH requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.post">post</a></code> | Add a inflight handler to the api for POST requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.put">put</a></code> | Add a inflight handler to the api for PUT requests on the given path. |

---

##### `connect` <a name="connect" id="@winglang/sdk.cloud.Api.connect"></a>

```wing
connect(path: str, inflight: IApiEndpointHandler, props?: ApiConnectOptions): void
```

Add a inflight handler to the api for CONNECT requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.connect.parameter.path"></a>

- *Type:* str

The path to handle CONNECT requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.connect.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.connect.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiConnectOptions">ApiConnectOptions</a>

Options for the route.

---

##### `delete` <a name="delete" id="@winglang/sdk.cloud.Api.delete"></a>

```wing
delete(path: str, inflight: IApiEndpointHandler, props?: ApiDeleteOptions): void
```

Add a inflight handler to the api for DELETE requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.delete.parameter.path"></a>

- *Type:* str

The path to handle DELETE requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.delete.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.delete.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiDeleteOptions">ApiDeleteOptions</a>

Options for the route.

---

##### `get` <a name="get" id="@winglang/sdk.cloud.Api.get"></a>

```wing
get(path: str, inflight: IApiEndpointHandler, props?: ApiGetOptions): void
```

Add a inflight handler to the api for GET requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.get.parameter.path"></a>

- *Type:* str

The path to handle GET requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.get.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.get.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiGetOptions">ApiGetOptions</a>

Options for the route.

---

##### `head` <a name="head" id="@winglang/sdk.cloud.Api.head"></a>

```wing
head(path: str, inflight: IApiEndpointHandler, props?: ApiHeadOptions): void
```

Add a inflight handler to the api for HEAD requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.head.parameter.path"></a>

- *Type:* str

The path to handle HEAD requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.head.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.head.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiHeadOptions">ApiHeadOptions</a>

Options for the route.

---

##### `options` <a name="options" id="@winglang/sdk.cloud.Api.options"></a>

```wing
options(path: str, inflight: IApiEndpointHandler, props?: ApiOptionsOptions): void
```

Add a inflight handler to the api for OPTIONS requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.options.parameter.path"></a>

- *Type:* str

The path to handle OPTIONS requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.options.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.options.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiOptionsOptions">ApiOptionsOptions</a>

Options for the route.

---

##### `patch` <a name="patch" id="@winglang/sdk.cloud.Api.patch"></a>

```wing
patch(path: str, inflight: IApiEndpointHandler, props?: ApiPatchOptions): void
```

Add a inflight handler to the api for PATCH requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.patch.parameter.path"></a>

- *Type:* str

The path to handle PATCH requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.patch.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.patch.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiPatchOptions">ApiPatchOptions</a>

Options for the route.

---

##### `post` <a name="post" id="@winglang/sdk.cloud.Api.post"></a>

```wing
post(path: str, inflight: IApiEndpointHandler, props?: ApiPostOptions): void
```

Add a inflight handler to the api for POST requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.post.parameter.path"></a>

- *Type:* str

The path to handle POST requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.post.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.post.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiPostOptions">ApiPostOptions</a>

Options for the route.

---

##### `put` <a name="put" id="@winglang/sdk.cloud.Api.put"></a>

```wing
put(path: str, inflight: IApiEndpointHandler, props?: ApiPutOptions): void
```

Add a inflight handler to the api for PUT requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.put.parameter.path"></a>

- *Type:* str

The path to handle PUT requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.put.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.put.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiPutOptions">ApiPutOptions</a>

Options for the route.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Api.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Api.property.url">url</a></code> | <code>str</code> | The base URL of the API endpoint. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Api.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.cloud.Api.property.url"></a>

```wing
url: str;
```

- *Type:* str

The base URL of the API endpoint.

---



## Structs <a name="Structs" id="Structs"></a>

### ApiConnectOptions <a name="ApiConnectOptions" id="@winglang/sdk.cloud.ApiConnectOptions"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiConnectOptions.Initializer"></a>

```wing
bring cloud;

let ApiConnectOptions = cloud.ApiConnectOptions{ ... };
```


### ApiCorsOptions <a name="ApiCorsOptions" id="@winglang/sdk.cloud.ApiCorsOptions"></a>

Cors Options for `Api`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiCorsOptions.Initializer"></a>

```wing
bring cloud;

let ApiCorsOptions = cloud.ApiCorsOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ApiCorsOptions.property.allowCredentials">allowCredentials</a></code> | <code>bool</code> | Whether to allow credentials. |
| <code><a href="#@winglang/sdk.cloud.ApiCorsOptions.property.allowHeaders">allowHeaders</a></code> | <code>MutArray&lt;str&gt;</code> | The list of allowed headers. |
| <code><a href="#@winglang/sdk.cloud.ApiCorsOptions.property.allowMethods">allowMethods</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.cloud.HttpMethod">HttpMethod</a>&gt;</code> | The list of allowed methods. |
| <code><a href="#@winglang/sdk.cloud.ApiCorsOptions.property.allowOrigin">allowOrigin</a></code> | <code>MutArray&lt;str&gt;</code> | The list of allowed allowOrigin. |
| <code><a href="#@winglang/sdk.cloud.ApiCorsOptions.property.exposeHeaders">exposeHeaders</a></code> | <code>MutArray&lt;str&gt;</code> | The list of exposed headers. |
| <code><a href="#@winglang/sdk.cloud.ApiCorsOptions.property.maxAge">maxAge</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | How long the browser should cache preflight request results. |

---

##### `allowCredentials`<sup>Optional</sup> <a name="allowCredentials" id="@winglang/sdk.cloud.ApiCorsOptions.property.allowCredentials"></a>

```wing
allowCredentials: bool;
```

- *Type:* bool
- *Default:* false

Whether to allow credentials.

---

##### `allowHeaders`<sup>Optional</sup> <a name="allowHeaders" id="@winglang/sdk.cloud.ApiCorsOptions.property.allowHeaders"></a>

```wing
allowHeaders: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* ["Content-Type", "Authorization"]

The list of allowed headers.

---

*Example*

```wing
["Content-Type"]
```


##### `allowMethods`<sup>Optional</sup> <a name="allowMethods" id="@winglang/sdk.cloud.ApiCorsOptions.property.allowMethods"></a>

```wing
allowMethods: MutArray<HttpMethod>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.cloud.HttpMethod">HttpMethod</a>&gt;
- *Default:* [HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH, HttpMethod.DELETE, HttpMethod.HEAD, HttpMethod.OPTIONS]

The list of allowed methods.

---

*Example*

```wing
[HttpMethod.GET, HttpMethod.POST]
```


##### `allowOrigin`<sup>Optional</sup> <a name="allowOrigin" id="@winglang/sdk.cloud.ApiCorsOptions.property.allowOrigin"></a>

```wing
allowOrigin: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* ["*"]

The list of allowed allowOrigin.

---

*Example*

```wing
["https://example.com"]
```


##### `exposeHeaders`<sup>Optional</sup> <a name="exposeHeaders" id="@winglang/sdk.cloud.ApiCorsOptions.property.exposeHeaders"></a>

```wing
exposeHeaders: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* []

The list of exposed headers.

---

*Example*

```wing
["Content-Type"]
```


##### `maxAge`<sup>Optional</sup> <a name="maxAge" id="@winglang/sdk.cloud.ApiCorsOptions.property.maxAge"></a>

```wing
maxAge: duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">duration</a>
- *Default:* 300 seconds

How long the browser should cache preflight request results.

---

### ApiDeleteOptions <a name="ApiDeleteOptions" id="@winglang/sdk.cloud.ApiDeleteOptions"></a>

Options for Api put endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiDeleteOptions.Initializer"></a>

```wing
bring cloud;

let ApiDeleteOptions = cloud.ApiDeleteOptions{ ... };
```


### ApiGetOptions <a name="ApiGetOptions" id="@winglang/sdk.cloud.ApiGetOptions"></a>

Options for Api get endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiGetOptions.Initializer"></a>

```wing
bring cloud;

let ApiGetOptions = cloud.ApiGetOptions{ ... };
```


### ApiHeadOptions <a name="ApiHeadOptions" id="@winglang/sdk.cloud.ApiHeadOptions"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiHeadOptions.Initializer"></a>

```wing
bring cloud;

let ApiHeadOptions = cloud.ApiHeadOptions{ ... };
```


### ApiOptionsOptions <a name="ApiOptionsOptions" id="@winglang/sdk.cloud.ApiOptionsOptions"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiOptionsOptions.Initializer"></a>

```wing
bring cloud;

let ApiOptionsOptions = cloud.ApiOptionsOptions{ ... };
```


### ApiPatchOptions <a name="ApiPatchOptions" id="@winglang/sdk.cloud.ApiPatchOptions"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiPatchOptions.Initializer"></a>

```wing
bring cloud;

let ApiPatchOptions = cloud.ApiPatchOptions{ ... };
```


### ApiPostOptions <a name="ApiPostOptions" id="@winglang/sdk.cloud.ApiPostOptions"></a>

Options for Api post endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiPostOptions.Initializer"></a>

```wing
bring cloud;

let ApiPostOptions = cloud.ApiPostOptions{ ... };
```


### ApiProps <a name="ApiProps" id="@winglang/sdk.cloud.ApiProps"></a>

Options for `Api`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiProps.Initializer"></a>

```wing
bring cloud;

let ApiProps = cloud.ApiProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ApiProps.property.cors">cors</a></code> | <code>bool</code> | Options for configuring the API's CORS behavior across all routes. |
| <code><a href="#@winglang/sdk.cloud.ApiProps.property.corsOptions">corsOptions</a></code> | <code><a href="#@winglang/sdk.cloud.ApiCorsOptions">ApiCorsOptions</a></code> | Options for configuring the API's CORS behavior across all routes. |

---

##### `cors`<sup>Optional</sup> <a name="cors" id="@winglang/sdk.cloud.ApiProps.property.cors"></a>

```wing
cors: bool;
```

- *Type:* bool
- *Default:* false, CORS configuration is disabled

Options for configuring the API's CORS behavior across all routes.

Options can also be overridden on a per-route basis. (not yet implemented)
When enabled this will add CORS headers with default options.
Can be customized by passing `corsOptions`

---

*Example*

```wing
true
```


##### `corsOptions`<sup>Optional</sup> <a name="corsOptions" id="@winglang/sdk.cloud.ApiProps.property.corsOptions"></a>

```wing
corsOptions: ApiCorsOptions;
```

- *Type:* <a href="#@winglang/sdk.cloud.ApiCorsOptions">ApiCorsOptions</a>
- *Default:* Default CORS options are applied when `cors` is set to `true` allowOrigin: ["*"], allowMethods: [ HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.HEAD, HttpMethod.OPTIONS, ], allowHeaders: ["Content-Type", "Authorization"], exposeHeaders: [], allowCredentials: false,

Options for configuring the API's CORS behavior across all routes.

Options can also be overridden on a per-route basis. (not yet implemented)

---

*Example*

```wing
{ allowOrigin: ["https://example.com"] }
```


### ApiPutOptions <a name="ApiPutOptions" id="@winglang/sdk.cloud.ApiPutOptions"></a>

Options for Api put endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiPutOptions.Initializer"></a>

```wing
bring cloud;

let ApiPutOptions = cloud.ApiPutOptions{ ... };
```


### ApiRequest <a name="ApiRequest" id="@winglang/sdk.cloud.ApiRequest"></a>

Shape of a request to an inflight handler.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiRequest.Initializer"></a>

```wing
bring cloud;

let ApiRequest = cloud.ApiRequest{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.method">method</a></code> | <code><a href="#@winglang/sdk.cloud.HttpMethod">HttpMethod</a></code> | The request's HTTP method. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.path">path</a></code> | <code>str</code> | The request's path. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.query">query</a></code> | <code>MutMap&lt;str&gt;</code> | The request's query string values. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.vars">vars</a></code> | <code>MutMap&lt;str&gt;</code> | The path variables. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.body">body</a></code> | <code>str</code> | The request's body. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.headers">headers</a></code> | <code>MutMap&lt;str&gt;</code> | The request's headers. |

---

##### `method`<sup>Required</sup> <a name="method" id="@winglang/sdk.cloud.ApiRequest.property.method"></a>

```wing
method: HttpMethod;
```

- *Type:* <a href="#@winglang/sdk.cloud.HttpMethod">HttpMethod</a>

The request's HTTP method.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.ApiRequest.property.path"></a>

```wing
path: str;
```

- *Type:* str

The request's path.

---

##### `query`<sup>Required</sup> <a name="query" id="@winglang/sdk.cloud.ApiRequest.property.query"></a>

```wing
query: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The request's query string values.

---

##### `vars`<sup>Required</sup> <a name="vars" id="@winglang/sdk.cloud.ApiRequest.property.vars"></a>

```wing
vars: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The path variables.

---

##### `body`<sup>Optional</sup> <a name="body" id="@winglang/sdk.cloud.ApiRequest.property.body"></a>

```wing
body: str;
```

- *Type:* str

The request's body.

---

##### `headers`<sup>Optional</sup> <a name="headers" id="@winglang/sdk.cloud.ApiRequest.property.headers"></a>

```wing
headers: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The request's headers.

---

### ApiResponse <a name="ApiResponse" id="@winglang/sdk.cloud.ApiResponse"></a>

Shape of a response from a inflight handler.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiResponse.Initializer"></a>

```wing
bring cloud;

let ApiResponse = cloud.ApiResponse{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ApiResponse.property.status">status</a></code> | <code>num</code> | The response's status code. |
| <code><a href="#@winglang/sdk.cloud.ApiResponse.property.body">body</a></code> | <code>str</code> | The response's body. |
| <code><a href="#@winglang/sdk.cloud.ApiResponse.property.headers">headers</a></code> | <code>MutMap&lt;str&gt;</code> | The response's headers. |

---

##### `status`<sup>Required</sup> <a name="status" id="@winglang/sdk.cloud.ApiResponse.property.status"></a>

```wing
status: num;
```

- *Type:* num

The response's status code.

---

##### `body`<sup>Optional</sup> <a name="body" id="@winglang/sdk.cloud.ApiResponse.property.body"></a>

```wing
body: str;
```

- *Type:* str

The response's body.

---

##### `headers`<sup>Optional</sup> <a name="headers" id="@winglang/sdk.cloud.ApiResponse.property.headers"></a>

```wing
headers: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The response's headers.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IApiEndpointHandler <a name="IApiEndpointHandler" id="@winglang/sdk.cloud.IApiEndpointHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IApiEndpointHandlerClient](#@winglang/sdk.cloud.IApiEndpointHandlerClient)

A resource with an inflight "handle" method that can be passed to one of the `Api` request preflight methods.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IApiEndpointHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IApiEndpointHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IApiEndpointHandlerClient <a name="IApiEndpointHandlerClient" id="@winglang/sdk.cloud.IApiEndpointHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IApiEndpointHandlerClient">IApiEndpointHandlerClient</a>

Inflight client for `IApiEndpointHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IApiEndpointHandlerClient.handle">handle</a></code> | Inflight that will be called when a request is made to the endpoint. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IApiEndpointHandlerClient.handle"></a>

```wing
inflight handle(request: ApiRequest): ApiResponse
```

Inflight that will be called when a request is made to the endpoint.

###### `request`<sup>Required</sup> <a name="request" id="@winglang/sdk.cloud.IApiEndpointHandlerClient.handle.parameter.request"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiRequest">ApiRequest</a>

---


## Enums <a name="Enums" id="Enums"></a>

### HttpMethod <a name="HttpMethod" id="@winglang/sdk.cloud.HttpMethod"></a>

Allowed HTTP methods for a endpoint.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.GET">GET</a></code> | Get. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.HEAD">HEAD</a></code> | Head. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.POST">POST</a></code> | Post. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.PUT">PUT</a></code> | Put. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.DELETE">DELETE</a></code> | Delete. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.CONNECT">CONNECT</a></code> | Connect. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.OPTIONS">OPTIONS</a></code> | Options. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.PATCH">PATCH</a></code> | Patch. |

---

##### `GET` <a name="GET" id="@winglang/sdk.cloud.HttpMethod.GET"></a>

Get.

---


##### `HEAD` <a name="HEAD" id="@winglang/sdk.cloud.HttpMethod.HEAD"></a>

Head.

---


##### `POST` <a name="POST" id="@winglang/sdk.cloud.HttpMethod.POST"></a>

Post.

---


##### `PUT` <a name="PUT" id="@winglang/sdk.cloud.HttpMethod.PUT"></a>

Put.

---


##### `DELETE` <a name="DELETE" id="@winglang/sdk.cloud.HttpMethod.DELETE"></a>

Delete.

---


##### `CONNECT` <a name="CONNECT" id="@winglang/sdk.cloud.HttpMethod.CONNECT"></a>

Connect.

---


##### `OPTIONS` <a name="OPTIONS" id="@winglang/sdk.cloud.HttpMethod.OPTIONS"></a>

Options.

---


##### `PATCH` <a name="PATCH" id="@winglang/sdk.cloud.HttpMethod.PATCH"></a>

Patch.

---

