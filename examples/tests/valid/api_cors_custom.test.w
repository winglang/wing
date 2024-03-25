bring cloud;
bring ex;
bring http;
bring expect;

let api = new cloud.Api(
  cors: true,
  corsOptions: {
    allowOrigin: "winglang.io",
    allowMethods: [cloud.HttpMethod.GET, cloud.HttpMethod.POST, cloud.HttpMethod.OPTIONS],
    allowHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
    allowCredentials: true,
    exposeHeaders: ["Content-Type"]
  }
);

api.get("/users", inflight (req) => {
  return {
    body: "hello world",
    status: 200
  };
});

test "GET /users has cors headers" {
  let response = http.get(api.url + "/users");

  let headers = response.headers;
  expect.equal(response.status, 200);

  // GET cors headers are set
  expect.equal(headers.tryGet("access-control-allow-origin"), "winglang.io");
  expect.equal(headers.tryGet("access-control-allow-credentials"), "true");
  expect.equal(headers.tryGet("access-control-expose-headers"), "Content-Type");

  // OPTIONS cors headers are not set
  expect.nil(headers.tryGet("access-control-allow-headers"));
  expect.nil(headers.tryGet("access-control-allow-methods"));
}

test "OPTIONS /users has cors headers" {
  let response = http.fetch(api.url + "/users", {
    method: http.HttpMethod.OPTIONS
  });

  let headers = response.headers;

  expect.equal(response.status, 204);

  // OPTIONS cors headers are set
  expect.equal(headers.tryGet("access-control-allow-methods"), "GET,POST,OPTIONS");
  expect.equal(headers.tryGet("access-control-allow-headers"), "Content-Type,Authorization,X-Custom-Header");
  expect.equal(headers.tryGet("access-control-allow-origin"), "winglang.io");

  // Other cors headers are not set
  expect.nil(headers.tryGet("access-control-expose-headers"));
  expect.nil(headers.tryGet("access-control-allow-credentials"));
}

test "OPTIONS /users responds with proper headers for requested" {
  let response = http.fetch(api.url + "/users", {
    method: http.HttpMethod.OPTIONS,
    headers: {
      "Access-Control-Request-Method": "PUT",
      "Access-Control-Request-Headers": "Content-Type,Authorization,X-Custom-Foo",
    }
  });

  let headers = response.headers;
  expect.equal(response.status, 204);
  expect.equal(headers.tryGet("access-control-allow-methods"), "GET,POST,OPTIONS");
  expect.equal(headers.tryGet("access-control-allow-headers"), "Content-Type,Authorization,X-Custom-Header");
  expect.equal(headers.tryGet("access-control-allow-origin"), "winglang.io");
}
