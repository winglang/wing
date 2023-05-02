bring cloud;

let payload = "hello";

let f = new cloud.Function(inflight ():str => {
  return payload;
});


new cloud.Function(inflight () => {
  let x = f.invoke("");
  assert(x == payload);
}) as "test:function invoke";


