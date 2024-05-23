bring cloud;
bring http;
bring expect;

let api = new cloud.Api();

let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return {
    body: "id is {req.vars.tryGet("id") ?? "unknown"}",
  };
};

api.get("/:id", handler);
api.get("/:id/comments", handler);


try {
  // sibling path same method
  api.get("/:username/something", handler);
  expect.equal(false);
} catch e  {
  expect.equal(e, "Endpoint for path '/:username/something' and method 'GET' conflicts with existing sibling endpoint for path '/:id'- try to match the parameter names to avoid this error.");
}

try {
  // sibling path different method
  api.post("/:username", handler);
  expect.equal(false);
} catch e  {
  expect.equal(e, "Endpoint for path '/:username' and method 'POST' conflicts with existing sibling endpoint for path '/:id'- try to match the parameter names to avoid this error.");
}



test "path vars at endpoint root are working as expected" {
  let resWithId = http.get("{api.url}/123");
  expect.ok(resWithId.ok);
  expect.equal(resWithId.body, "id is 123");

  let resWithComments = http.get("{api.url}/123/comments");
  expect.ok(resWithComments.ok);
  expect.equal(resWithComments.body, "id is 123");

  let unknownRes = http.get("{api.url}/123/comments/unknown-path");
  expect.equal(unknownRes.status, 404);
  expect.match(unknownRes.body, "Error");
}