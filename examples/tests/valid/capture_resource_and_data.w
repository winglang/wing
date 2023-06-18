bring cloud;

class Static {
  static inflight hello(): str { return "hello"; }
}

struct Foo {
  bar: str;
  baz: Array<num>;
}

// let data = {1,2,3};
// let res = new cloud.Bucket();
// let queue = new cloud.Queue();
let foo = Foo { bar: "hello", baz: [1,2,3] };

class Hello {
  x: Foo;
  b: cloud.Bucket;

  init() {
    this.x = Foo { bar: "aa", baz: [1] };
    this.b = new cloud.Bucket();
  }

  inflight hello() {
    this.b.put("hello", "world");
  }

  inflight bang() {
    let localArray = [Json 123,"Hello","World"];
    log(str.fromJson(localArray.at(1)));

    let local = "hi";
    assert(local == "hi");
    assert(local.length == 2);

    log(this.x.bar);
    log(Static.hello());
    log(std.Json.stringify(123));
    this.hello();
  }
}

let hello = new Hello();

test "resource and data" {
  // assert(data.size == 3);

  // res.put("file.txt", "world");
  // assert(res.get("file.txt") == "world");

  // assert(foo.bar == "hello");
  assert(foo.baz.at(1) == 2);

  // queue.push("spirulina");

  hello.bang();
}
