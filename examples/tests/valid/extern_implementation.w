bring cloud;

class Foo {
  extern "./external_js.js" static getGreeting(name: str): str;
  extern "./external_js.js" static inflight regexInflight(pattern: str, text: str): bool;
  extern "./external_js.js" static inflight getUuid(): str;
  extern "./external_js.js" static inflight getData(): str;
  extern "./external_js.js" inflight print(msg: str);

  inflight call() {
    assert(Foo.regexInflight("[a-z]+-\\d+", "abc-123"));
    let uuid = Foo.getUuid();
    assert(uuid.length == 36);

    assert(Foo.getData() == "Cool data!");
  }
}

assert(Foo.getGreeting("Wingding") == "Hello, Wingding!");

let f = new Foo();

test "call" {
  f.call();
}

test "console" {
  f.print("hey there");
}
