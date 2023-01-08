bring cloud;

let q = new cloud.Queue();

let helper = new cloud.Function(inflight (s: str): str => {

});
q.on_message(inflight (m: str): str => {
  //These should all be automatically awaited after jsified
  helper.invoke("");
  print(helper.invoke(""))
  assert(helper.invoke("") == "");
  throw(helper.invoke(""));
  panic(helper.invoke(""));
});