bring cloud;
bring http;

let api = new cloud.Api();

api.get("/", inflight (req) => {
  return { status: 200 };
});

new cloud.Check(inflight () => { 
  assert(http.get(api.url).ok);
}) as "main route returns 200 ok";
