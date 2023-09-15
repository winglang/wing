bring util;

// Call an inflight only SDK function
util.sleep(1s);
//^^^^^^^^^^^^^^ Cannot call into inflight phase while preflight

class Foo {
  pub inflight do() {}
}
let foo = new Foo();
// Call an inflight method
foo.do();
//^^^^^^ Cannot call into inflight phase while preflight
