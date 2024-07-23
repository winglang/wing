bring cloud;

new cloud.Function((name: Json?): Json? => {
  return "Hello {name?.tryAsStr() ?? "world"}!";
});
// ^ Expected type to be "inflight (any): any", but got "preflight (str): str" instead

let q = new cloud.Queue();
q.setConsumer(inflight (x: num) => {
                     // ^ "num" doesn't match the expected type "str"
  return;
});
