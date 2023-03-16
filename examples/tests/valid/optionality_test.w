let x: num? = 4;
assert(x? == true);
assert(!x? == false);
// TODO: add a `x? == false` case when we implement some way to null initialize an optional (https://github.com/winglang/wing/pull/1495)
