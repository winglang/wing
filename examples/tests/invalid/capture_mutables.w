let a = MutArray<str>["hello"];
let s = MutSet<num>{12};
let m = MutMap<bool>{"hello": true};

let a_cloned = (Array<str>["hello"]).mut_clone();

let i = inflight () => {
  assert(a.length == 1);
  //     ^ Cannot reference 'a' of type 'MutArray<str>' from an inflight context
  assert(s.size == 1);
  //     ^ Cannot reference 's' of type 'MutSet<num>' from an inflight context
  assert(m.size == 1);
  //     ^ Cannot reference 'm' of type 'MutMap<bool>' from an inflight context
  assert(a_cloned.size == 1);
  //     ^ Cannot reference 'a_cloned' of type 'MutArray<str>' from an inflight context
};