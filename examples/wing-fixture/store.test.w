bring "./store.w" as store;

let s = new store.Store();

s.onSet(inflight (message) => {
  assert(message == "hi");
});

test "onSet" {
  s.set("hi");
}

// this is ok since we are in the same package
class FakeClass impl store.InternalInterface, store.PublicInterface {}

class FakeClass2 extends store.PublicClass {
  new() {
    this.publicMethod();
    this.internalMethod();
  }
}
class FakeClass3 extends store.InternalClass {}

new store.PublicClass();
new store.InternalClass();
new FakeClass();

store.PublicClass.internalStaticMethod();
store.InternalClass.internalStaticMethod();

struct FakeStruct extends store.InternalStruct {}

let x1 = store.PublicStruct {};
let x2 = store.InternalStruct {};
let x3 = FakeStruct {};
