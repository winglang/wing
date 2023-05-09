bring cloud;

class MyResource {
  my_preflight() { }
}

class Test {
  r: MyResource;

  init() {
    this.r = new MyResource();
  }

  inflight test() {
    this.r.my_preflight();
//  ^^^^^^^^^^^^^^^^^^^^^^ Cannot call into preflight phase while inflight
  }
}
