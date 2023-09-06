bring cloud;

class Foo {
  extern "./external_js.js" static getGreeting(name: str): str;
  extern "./external_js.js" static inflight regexInflight(pattern: str, text: str): bool;
  extern "./external_js.js" static inflight getUuid(): str;
  extern "./external_js.js" static inflight getData(): str;
  extern "./external_js.js" static inflight print(msg: str);
  extern "uuid" static v4(): str;

  inflight call() {
    assert(Foo.regexInflight("[a-z]+-\\d+", "abc-123"));
    let uuid = Foo.getUuid();
    assert(uuid.length == 36);

    assert(Foo.getData() == "Cool data!");
  }
}

assert(Foo.getGreeting("Wingding") == "Hello, Wingding!");
assert(Foo.v4().length == 36);

let f = new Foo();

test "call" {
  f.call();
}

test "console" {
  Foo.print("hey there");
}
