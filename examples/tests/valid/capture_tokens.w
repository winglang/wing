bring cloud;

class MyResource {
  api: cloud.Api;
  url: str;

  init() {
    this.api = new cloud.Api();
    this.url = this.api.url;  
  }

  inflight foo() {
    assert(this.url.startsWith("http://127.0.0.1"));
  }
}

let r = new MyResource();

test "urlPrint" {
  r.foo();
}