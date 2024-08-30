bring cloud;
bring http;
bring expect;

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
 expect.equal(response.status, 200);

  // GET cors headers are set
 expect.equal(headers.tryGet("access-control-allow-origin"), "*");
 expect.equal(headers.tryGet("access-control-allow-credentials"), "false");
 expect.equal(headers.tryGet("access-control-expose-headers"), "");

  // OPTIONS headers are not set
 expect.nil(headers.tryGet("access-control-allow-headers"));
 expect.nil(headers.tryGet("access-control-allow-methods"));
}

test "OPTIONS /users has default cors headers" {
  let response = http.fetch(apiDefaultCors.url + "/users", {
    method: http.HttpMethod.OPTIONS
  });

  let headers = response.headers;
 expect.equal(response.status, 204);

  // OPTIONS cors headers are set
 expect.equal(headers.tryGet("access-control-allow-headers"), "Content-Type,Authorization,X-Requested-With");
 expect.equal(headers.tryGet("access-control-allow-methods"), "GET,POST,PUT,DELETE,HEAD,OPTIONS");
 expect.equal(headers.tryGet("access-control-allow-origin"), "*");

  // Other headers are not set
 expect.nil(headers.tryGet("access-control-allow-credentials"));
 expect.nil(headers.tryGet("access-control-expose-headers"));
}

