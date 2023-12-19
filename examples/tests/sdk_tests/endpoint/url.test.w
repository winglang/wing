bring cloud;
bring http;

let api = new cloud.Api();
api.get("/", inflight () => {
  return {
    status: 200,
    body: "OK"
  };
});

let endpoint = new cloud.Endpoint(api.url);
assert(endpoint.url == api.url);

test "access endpoint url" {
  assert(http.get(endpoint.url).body == "OK");
}
