bring "./store.w" as store;

let s = new store.Store();

s.onSet(inflight (message) => {
  assert(message == "hi");
});

test "onSet" {
  s.set("hi");
}