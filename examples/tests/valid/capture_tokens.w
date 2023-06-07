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
  }
}

let r = new MyResource();

test "urlPrint" {
  r.foo();
}