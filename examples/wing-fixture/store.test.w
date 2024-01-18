bring "./store.w" as store;

let s = new store.Store();
s.onSet(inflight (message) => {log(message);});

test "t" {
  s.set("hi");
}