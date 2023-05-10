bring cloud;

new cloud.Function((name: str): str => {
  return "Hello ${name}";
});
// ^ Expected type to be "inflight (any): any", but got "preflight (str): str" instead

let q = new cloud.Queue();
q.addConsumer(inflight (x: num) => {
                     // ^ "num" doesn't match the expected type "str"
  return;
});
