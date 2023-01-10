bring cloud;

let q = new cloud.Queue();
let str_to_str = new cloud.Function(inflight (s: str): str => {

}) as "str_to_str";
let func = new cloud.Function(inflight (s: str): str => {
  str_to_str.invoke("one");
  print(str_to_str.invoke("two"));
}) as "func";