bring cloud;

class Foo {
  extern "./external_js.js" static get_greeting(name: str): str;
  extern "./external_js.js" static inflight regex_inflight(pattern: str, text: str): bool;
  extern "./external_js.js" static inflight get_uuid(): str;
  extern "./external_js.js" static inflight get_data(): str;
  extern "./external_js.js" inflight print(msg: str);
  extern "uuid" static v4(): str;

  inflight call() {
    assert(Foo.regex_inflight("[a-z]+-\\d+", "abc-123"));
    let uuid = Foo.get_uuid();
    assert(uuid.length == 36);

    assert(Foo.get_data() == "Cool data!");
  }
}

assert(Foo.get_greeting("Wingding") == "Hello, Wingding!");
assert(Foo.v4().length == 36);

let f = new Foo();

new cloud.Function(inflight () => {
  f.call();
}) as "test:call";

new cloud.Function(inflight () => {
  f.print("hey there");
}) as "test:console";

