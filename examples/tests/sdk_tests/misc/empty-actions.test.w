// this test just verifies that this can be deployed to tf-aws see https://github.com/winglang/wing/pull/5113
bring cloud;

class A {
  b: cloud.Bucket;

  new() {
    this.b = new cloud.Bucket();
  }
  
  pub inflight foo(){
    log(this.b.get("/"));
  }
  
  pub inflight bar(){
  }
}

let a = new A();
let api = new cloud.Api();
api.get("/foo", inflight () => {
  a.foo();
  return {
    status:200
  };
});

api.get("/bar", inflight () => {
  a.bar();
  return {
    status:200
  };
});
test "main" {
  assert(1 == 1);
}
