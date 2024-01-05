bring util;

class Foo {
  pub inflight do() {}
}
let foo = new Foo();
// Call an inflight method
foo.do();
//^^^^^^ Cannot call into inflight phase while preflight
