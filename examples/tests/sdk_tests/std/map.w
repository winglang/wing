//-----------------------------------------------------------------------------
// TODO: https://github.com/winglang/wing/issues/2785

//-----------------------------------------------------------------------------
// keys()
let m = { "hello": 123, "world": 99 };
let mkeys = m.keys();
assert(mkeys.length == 2);
assert(mkeys.at(0) == "hello");
assert(mkeys.at(1) == "world");

//-----------------------------------------------------------------------------
// values()
let mvalues = m.values();
assert(mvalues.length == 2);
assert(mvalues.at(0) == 123);
assert(mvalues.at(1) == 99);
