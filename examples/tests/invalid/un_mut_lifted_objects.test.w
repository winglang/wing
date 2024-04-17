let ar = MutArray<num>[];
ar.push(1);

let j = MutJson {a: 1};
j.set("a", 2);

let st = MutSet<num>[1,2];
st.add(3);

let mp = MutMap<num>{"a" => 1};
mp.set("a", 2);

inflight() => {
  // Same code as above should be an error in inflight
  ar.push(2); // Error: push doesn't exist in Array
  j.set("a", 3); // Error: set doesn't exist in Json
  st.add(4); // Error: add doesn't exist in Set
  mp.set("a", 3); // Error: set doesn't exist in Map
};
