bring cloud;
bring http;
bring util;

// This test checks that an API can have a route whose handler
// references the API's URL.

if ["sim", "tf-aws", "awscdk"].contains(util.env("WING_TARGET")) {
  let api = new cloud.Api();

  api.get("/my_url", inflight () => {
    return {
      status: 200,
      body: api.url
    };
  });

  test "GET /my_url" {
    let resp = http.get("{api.url}/my_url");
    assert(resp.status == 200);
  }
}
