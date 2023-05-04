/*\
skip: true
\*/

bring cloud;

let q = new cloud.Queue();

// TODO: Will not work until https://github.com/winglang/wing/issues/1385
new cloud.Function(inflight () => {
  q.push("Foo");
  q.push("Bar");

  let first = q.pop();
  let second = q.pop();
  
  assert(first == "Bar");
  assert(second == "Foo");
});