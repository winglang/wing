bring cloud;

class MyResource {
  myPreflight() { }
}

class Test {
  r: MyResource;

  init() {
    this.r = new MyResource();
  }

  inflight test() {
    this.r.myPreflight();
//  ^^^^^^^^^^^^^^^^^^^^^^ Cannot call into preflight phase while inflight
  }
}
