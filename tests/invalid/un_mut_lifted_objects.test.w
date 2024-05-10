let ar = MutArray<num>[];
ar.push(1);

let j = MutJson {a: 1};
j.set("a", 2);

let st = MutSet<num>[1,2];
st.add(3);

let mp = MutMap<num>{"a" => 1};
mp.set("a", 2);

let opt_ar: MutArray<num>? = MutArray<num>[];
opt_ar?.push(1);

let recursive_ar = MutArray<MutArray<num>>[];
recursive_ar.push(MutArray<num>[1]);
recursive_ar.at(0).push(2);

inflight() => {
  // Same code as above should be an error in inflight
  ar.push(2); // Error: push doesn't exist in Array
  ar[0] = 1; // Error: Cannot update elements of an immutable Array
  j.set("a", 3); // Error: set doesn't exist in Json
  st.add(4); // Error: add doesn't exist in Set
  mp.set("a", 3); // Error: set doesn't exist in Map
  opt_ar?.push(2); // Error: push doesn't exist in Array
  recursive_ar.push(MutArray<num>[2]); // Error: push doesn't exist in Array
  recursive_ar.at(0).push(3); // Error: push doesn't exist in Array
};
