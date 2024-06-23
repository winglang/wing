bring cloud;

let q = new cloud.Queue();
let strToStr = new cloud.Function(inflight () => {

}) as "strToStr";

let func = new cloud.Function(inflight () => {
  strToStr.invoke("one");
  log(strToStr.invoke("two") ?? "no response");
}) as "func";
