//-----------------------------------------------------------------------------
// TODO: https://github.com/winglang/wing/issues/2785

//-----------------------------------------------------------------------------
// toArray()
let mySet = Set<num> {1, 2, 3};
let myArrayFromSet = mySet.toArray();
assert(myArrayFromSet.at(0) == 1);
assert(myArrayFromSet.at(1) == 2);
assert(myArrayFromSet.at(2) == 3);
assert(myArrayFromSet.length == mySet.size);
assert(myArrayFromSet.length == 3);

let myMutSet = MutSet<str> {"a", "b", "c"};
let myArrayFromMutSet = myMutSet.toArray();
assert(myArrayFromMutSet.at(0) == "a");
assert(myArrayFromMutSet.at(1) == "b");
assert(myArrayFromMutSet.at(2) == "c");
assert(myArrayFromMutSet.length == myMutSet.size);
assert(myArrayFromMutSet.length == 3);
//-----------------------------------------------------------------------------