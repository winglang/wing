bring cloud;
bring ex;
bring ui;

// @see https://github.com/winglang/wing/issues/4237 it crashes the Console preview env.
//let secret = new cloud.Secret(name: "my-secret");

let counter = new cloud.Counter(initial: 0);


// let handler = inflight (message: str): str => {
//    counter.inc();
//   bucket.put("hello{counter.peek()}.txt", "Hello, {message}!");
//   log("Hello, {message}!");
//   return message;
// };

new cloud.Function(inflight (message: str?): str? => {
  counter.inc();
  log("Counter is now {counter.inc(0)}");
  return message;
}) as "IncrementCounter";

