// bring "./bladir" as bladir;

// inflight () => {
//   let a = new bladir.FooA();
//   a.method();
//   let b = new bladir.FooB();
//   b.method();
// };

// let pfa = new bladir.BarA();
// pfa.method();
// let pfb = new bladir.BarB();
// pfb.method();

bring cloud;
bring "./bla.w" as bla;

let b = new cloud.Bucket();
let myConst = "bang bang";

inflight class Foo {
  pub uploadToBucket(k: str, value: str) {
    b.put(k, value);
    log(b.get("hello.txt"));
  }
}

let getAnF = inflight () => {
  return new Foo();
};

let getABar = inflight () => {
  return new bla.Bar();
};

if true {
  let b =1;
  let f = 2;

  test "inflight class captures preflight resource" {
    let f = getAnF();
    f.uploadToBucket("hello.txt", "world");
    let b = getABar();
    b.method();
  }
}

test "another test" {
  let f = getAnF();
  f.uploadToBucket("hello.txt", "world");
  let b = getABar();
  b.method();
}
