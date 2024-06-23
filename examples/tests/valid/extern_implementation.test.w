bring cloud;

class Foo {
  extern "./external_ts.ts" pub static getGreeting(name: str): str;
  extern "./external_ts.ts" static inflight regexInflight(pattern: str, text: str): bool;
  extern "./external_ts.ts" static inflight getUuid(): str;
  extern "./external_ts.ts" static inflight getData(): str;
  extern "./external_ts.ts" pub static inflight print(msg: str): void;
  extern "./external_ts.ts" pub static preflightBucket(bucket: cloud.Bucket, id: str): void;

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
Foo.preflightBucket(bucket, "my-bucket");

let func = new cloud.Function(inflight () => {
  f.call();
});

test "call" {
  func.invoke();
}

test "console" {
  Foo.print("hey there");
}
