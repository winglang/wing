bring cloud;

let bucket = new cloud.Bucket();
let counter = new cloud.Counter() as "my counter";

test "Print"{
  log("Hello World!");
  assert(true);
}

test "Print 3"{
  log("Hello World! 2");
  assert(true);
}

test "Print 2"{
  log("Hello World! 2");
  assert(true);
}

test "Print 4"{
  log("Hello World! 2");
  assert(true);
}
