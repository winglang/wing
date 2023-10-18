bring cloud;
bring ex;
bring http;
bring "./assertions.w" as t;

let apiDefaultCors = new cloud.Api(
  cors: true
);

apiDefaultCors.get("/users", inflight (req) => {
  return {
    body: "hello world",
    status: 200
  };
});

test "GET /users has default cors headers" {
  let response = http.get(apiDefaultCors.url + "/users");

  let headers = response.headers;
  t.Assert.equalNum(response.status, 200);

  // GET cors headers are set
  t.Assert.equalStr(headers.get("access-control-allow-origin"), "*");
  t.Assert.equalStr(headers.get("access-control-allow-credentials"), "false");
  t.Assert.equalStr(headers.get("access-control-expose-headers"), "");

  // OPTIONS headers are not set
  t.Assert.isNil(headers.tryGet("access-control-allow-headers"));
  t.Assert.isNil(headers.tryGet("access-control-allow-methods"));
}

test "OPTIONS /users has default cors headers" {
  let response = http.fetch(apiDefaultCors.url + "/users", {
    method: http.HttpMethod.OPTIONS
  });

  let headers = response.headers;
  t.Assert.equalNum(response.status, 204);

  // OPTIONS cors headers are set
  t.Assert.equalStr(headers.get("access-control-allow-headers"), "Content-Type,Authorization,X-Requested-With");
  t.Assert.equalStr(headers.get("access-control-allow-methods"), "GET,POST,PUT,DELETE,HEAD,OPTIONS");
  t.Assert.equalStr(headers.get("access-control-allow-origin"), "*");

  // Other headers are not set
  t.Assert.isNil(headers.tryGet("access-control-allow-credentials"));
  t.Assert.isNil(headers.tryGet("access-control-expose-headers"));
}

