bring cloud;

let globalFoo = 12;
let b = new cloud.Bucket();

inflight class Foo {
  init() {
    log("i am the constructor");
  }

  hello(): str {
    b.put("hello.txt", "world");
    return "hey!";
  }

  foo(): num {
    return globalFoo;
  }
}

test "foo test" {

  class Jo {

  }

  new Jo();

  let f = new Foo();
  log(f.hello());
  log("${f.foo()}");
}