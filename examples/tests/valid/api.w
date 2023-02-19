bring cloud;

let api = new cloud.Api();

let handler = inflight (message: str): str => {
  return "Hello World";
};
// failed when using '/' at the beginning of the path
api.get("/hello/world", handler);
api.get("/hello/global", handler);
api.get("/foo/bar/{baz}", handler);
api.get("/foo/bar/{baz}/boo", handler);
