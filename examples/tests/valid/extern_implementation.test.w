bring cloud;

class Foo {
  extern "./external_js.js" pub static getGreeting(name: str): str;
  extern "./external_js.js" static inflight regexInflight(pattern: str, text: str): bool;
  extern "./external_js.js" static inflight getUuid(): str;
  extern "./external_js.js" static inflight getData(): str;
  extern "./external_js.js" pub static inflight print(msg: str): void;
  extern "./external_js.js" pub static preflightBucket(bucket: cloud.Bucket, id: str): Json;

  pub inflight call() {
    assert(Foo.regexInflight("[a-z]+-\\d+", "abc-123"));
    let uuid = Foo.getUuid();
    assert(uuid.length == 36);

    assert(Foo.getData() == "Cool data!");
  }
}

assert(Foo.getGreeting("Wingding") == "Hello, Wingding!");

let f = new Foo();

let bucket = new cloud.Bucket() as "my-bucket";
let result = Foo.preflightBucket(bucket, "my-bucket");

test "call" {
  f.call();
}

test "console" {
  Foo.print("hey there");
}
