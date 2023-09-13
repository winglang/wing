bring cloud;

let x: str = nil;
//           ^^^ Expected type to be "str", but got "nil" instead (hint: to allow "nil" assignment use optional type: "str?")

class Foo {
  inflight var bar: num;
  inflight init() {
    this.bar = 1;
  }

  inflight setBar(b: num) {
    this.bar = b;
  }
}

let foo = new Foo();

test "nillarooni" {
  foo.setBar(nil);
//           ^^^ Expected type to be "num", but got "nil" instead (hint: to allow "nil" assignment use optional type: "num?")
}

if nil? {
// ^^^ Expected optional type, found "nil"
}

let nilWannabe = nil;
//               ^^^ Cannot assign nil value to variables without explicit optional type

let nilGaggle = [nil, nil, nil];
//              ^^^^^^^^^^^^^^^ Cannot assign nil value to variables without explicit optional type
