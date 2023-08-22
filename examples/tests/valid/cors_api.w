bring cloud;
bring ex;
bring http;
bring "./assertions.w" as t;


// DEFAULT CORS
// ============
// without specifying cors options, the default is to allow all origins
let apiDefaultCors = new cloud.Api(
  cors: {}
);

let getHandler = inflight (req) => {
  return {
    body: "hello world",
    status: 200
  };
};

apiDefaultCors.get("/users", getHandler);

test "GET /users has default cors headers" {
  let response = http.fetch(apiDefaultCors.url + "/users", {
    method: http.HttpMethod.GET,
    headers: {
      "Content-Type": "text/json"
    }
  });

let headers = response.headers;
  t.Assert.equalNum(response.status, 200);
  t.Assert.equalStr(headers.get("access-control-allow-origin"), "*");
  t.Assert.equalStr(headers.get("access-control-allow-credentials"), "false");
  t.Assert.isNil(headers.get("access-control-allow-headers"));

  t.Assert.isNil(headers.get("access-control-expose-headers"));
  t.Assert.isNil(headers.get("access-control-allow-methods"));
}

test "OPTIONS /users has default cors headers" {
  let response = http.fetch(apiDefaultCors.url + "/users", {
    method: http.HttpMethod.OPTIONS,
    headers: {
      "Content-Type": "text/json"
    }
  });

  let headers = response.headers;
  t.Assert.equalNum(response.status, 204);
  t.Assert.equalStr(headers.get("access-control-allow-origin"), "*");
  t.Assert.equalStr(headers.get("access-control-allow-methods"), "GET,HEAD,PUT,PATCH,POST,DELETE");
  t.Assert.equalStr(headers.get("access-control-allow-headers"), "Content-Type,Authorization");
  t.Assert.equalStr(headers.get("access-control-allow-credentials"), "false");
  t.Assert.isNil(headers.get("access-control-expose-headers"));
}

// Custom CORS
// ============
let apiCustomCors = new cloud.Api(
  cors: {
    origins: ["winglang.io"],
    methods: [cloud.HttpMethod.GET, cloud.HttpMethod.POST, cloud.HttpMethod.OPTIONS],
    headers: ["Content-Type", "Authorization", "X-Custom-Header"],
    allowCredentials: true,
    exposedHeaders: ["Content-Type"]
  }
) as "apiCustomCors";

let getCustomHandler = inflight (req) => {
  return {
    body: "hello world",
    status: 200
  };
};

apiCustomCors.get("/users", getCustomHandler);

test "GET /users has cors headers" {
  let response = http.fetch(apiCustomCors.url + "/users", {
    method: http.HttpMethod.GET,
    headers: {
      "Content-Type": "text/json"
    }
  });

let headers = response.headers;
  t.Assert.equalNum(response.status, 200);

  t.Assert.equalStr(headers.get("access-control-allow-origin"), "winglang.io");
  t.Assert.equalStr(headers.get("access-control-allow-credentials"), "true");
  t.Assert.equalStr(headers.get("access-control-expose-headers"), "Content-Type");

  t.Assert.isNil(headers.get("access-control-allow-headers"));
  t.Assert.isNil(headers.get("access-control-allow-methods"));
}

test "OPTIONS /users has cors headers" {
  let response = http.fetch(apiCustomCors.url + "/users", {
    method: http.HttpMethod.OPTIONS,
    headers: {
      "Content-Type": "text/json"
    }
  });

  let headers = response.headers;
  t.Assert.equalNum(response.status, 204);
  t.Assert.equalStr(headers.get("access-control-allow-origin"), "winglang.io");
  t.Assert.equalStr(headers.get("access-control-allow-methods"), "GET,POST,OPTIONS");
  t.Assert.equalStr(headers.get("access-control-allow-headers"), "Content-Type,Authorization,X-Custom-Header");
  t.Assert.equalStr(headers.get("access-control-allow-credentials"), "true");
  t.Assert.equalStr(headers.get("access-control-expose-headers"), "Content-Type");
}