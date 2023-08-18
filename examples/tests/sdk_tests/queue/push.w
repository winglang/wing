bring cloud;

let q = new cloud.Queue();

test "push" {
  let obj = Json {
    k1: 1,
    k2: "hello",
    k3: true,
    k4: {
        k1: [1, "a", true, {} ]
    }
  };

  q.push("Foo");
  
  assert(q.approxSize() == 1);

  q.pop();
  q.push("Bar", "Baz");

  assert(q.approxSize() == 2);

  q.purge();
  q.push("", "\r", "${obj}");

  assert(q.approxSize() == 3);
}