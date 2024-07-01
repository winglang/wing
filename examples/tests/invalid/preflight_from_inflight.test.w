bring cloud;

class MyResource {
  pub myPreflight() { }
}

class Test {
  r: MyResource;

  new() {
    this.r = new MyResource();
  }

  inflight test() {
    this.r.myPreflight();
//  ^^^^^^^^^^^^^^^^^^^^^^ Cannot call into preflight phase while inflight
  }
}
