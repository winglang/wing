let a = MutArray<str>["hello"];
let s = MutSet<num>{12};
let m = MutMap<bool>{"hello": true};

let aCloned = (Array<str>["hello"]).copyMut();

let i = inflight () => {
  assert(a.length == 1);
  //     ^ Cannot reference 'a' of type 'MutArray<str>' from an inflight context
  assert(s.size == 1);
  //     ^ Cannot reference 's' of type 'MutSet<num>' from an inflight context
  assert(m.size() == 1);
  //     ^ Cannot reference 'm' of type 'MutMap<bool>' from an inflight context
  assert(aCloned.size == 1);
  //     ^ Cannot reference 'aCloned' of type 'MutArray<str>' from an inflight context
};