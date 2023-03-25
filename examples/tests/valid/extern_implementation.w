bring cloud;

resource Foo {
  extern "./external_js.js" static get_greeting(name: str): str;
  extern "./external_js.js" static inflight regex_inflight(pattern: str, text: str): bool;
  extern "./external_js.js" static inflight get_uuid(): str;

  init(){}

  inflight call() {
    assert(Foo.regex_inflight("[a-z]+-\\d+", "abc-123"));
    let uuid = Foo.get_uuid();
    assert(uuid.length == 36);
  }
}

log(Foo.get_greeting("Wingding"));

let f = new Foo();

new cloud.Function(inflight () => {
  f.call();
}) as "test:call";

