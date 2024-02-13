bring cloud;

let q = new cloud.Queue();
let strToStr = new cloud.Function(inflight (s: str) => {

}) as "strToStr";
let func = new cloud.Function(inflight (s: str) => {
  strToStr.invoke("one");
  log(strToStr.invoke("two"));
}) as "func";
