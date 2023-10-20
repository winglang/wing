bring cloud;
bring http;

let api = new cloud.Api();

api.get("/hello", inflight (req) => {
  return {
    status: 200,
    body: "world"
  };
});

test "it responds with 404" {
    let url = "${api.url}/does-not-exists";
    let response = http.get(url);

    assert(response.status == 404);
    assert(response.body?.contains("Error") == true);
}
