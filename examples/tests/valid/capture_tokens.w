bring cloud;

class MyResource {
  api: cloud.Api;
  url: str;

  extern "./url_utils.js" static inflight isValidUrl(url: str): bool;

  init() {
    this.api = new cloud.Api();
    this.url = this.api.url;  
  }

  inflight foo() {
    assert(MyResource.isValidUrl(this.url));
    assert(MyResource.isValidUrl(this.api.url));
  }
}

let r = new MyResource();

test "inflight class" {
  r.foo();
}

let api = new cloud.Api();
let url = api.url;

test "inflight globals" {
  assert(MyResource.isValidUrl(url));
  assert(MyResource.isValidUrl(api.url));
}
