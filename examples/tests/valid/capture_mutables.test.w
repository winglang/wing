let a = MutArray<str>["hello"];
let s = MutSet<num>[12];
let m = MutMap<bool>{"hello" => true};

let aCloned = (Array<str>["hello"]).copyMut();

let handler = inflight () => {
  assert(a.length == 1);
  assert(s.size == 1);
  assert(m.size() == 1);
  assert(aCloned.length == 1);
};

test "main" {
  handler();
}
