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
  let ALLOW_HEADERS_DOES_NOT_EXIST_ERROR = "Object does not contain the key \"access-control-allow-headers\"";
  t.Assert.assertThrows(ALLOW_HEADERS_DOES_NOT_EXIST_ERROR, () => {
    headers.get("access-control-allow-headers");
  });

  let ALLOW_METHODS_DOES_NOT_EXIST_ERROR = "Object does not contain the key \"access-control-allow-methods\"";
  t.Assert.assertThrows(ALLOW_METHODS_DOES_NOT_EXIST_ERROR, () => {
    headers.get("access-control-allow-methods");
  });
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
  let ALLOW_CREDENTIALS_DOES_NOT_EXIST_ERROR = "Object does not contain the key \"access-control-allow-credentials\"";
  t.Assert.assertThrows(ALLOW_CREDENTIALS_DOES_NOT_EXIST_ERROR, () => {
    headers.get("access-control-allow-credentials");
  });

  let EXPOSE_HEADERS_DOES_NOT_EXIST_ERROR = "Object does not contain the key \"access-control-expose-headers\"";
  t.Assert.assertThrows(EXPOSE_HEADERS_DOES_NOT_EXIST_ERROR, () => {
    headers.get("access-control-expose-headers");
  });
}

