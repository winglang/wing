bring cloud;

let api = new cloud.Api();

let counter = new cloud.Counter();

let handler = inflight (message: str): cloud.ApiResponse => {

let count = counter.inc();

let resp = cloud.ApiResponse {
  body: {
    count: count,
   },
  status: 200,
  headers: {
    "Content-Type": "text/plain",
  },
};
return resp;
};
// failed when using '/' at the beginning of the path
api.get("/hello/world", handler);
api.get("/hello/global", handler);
api.get("/foo/bar/{baz}", handler);
api.get("/foo/bar/{baz}/boo", handler);
