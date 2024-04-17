bring cloud;
bring expect;

let arr = Array<num>[1, 2, 3];

assert(arr[0] == 1);
assert(arr[2 - 5] == 1);

try {
  arr[-5];
} catch e {
  assert(e == "Index -5 out of bounds for array of length 3");
}

try {
  arr[5];
} catch e {
  assert(e == "Index 5 out of bounds for array of length 3");
}

let map = Map<num>{"us-east-1" => 5, "us-west-2" => 8};
expect.equal(map["us-east-1"], 5);

try {
  map["us-west-1"];
} catch e {
  assert(e == "Key \"us-west-1\" not found");
}

let obj = Json { a: "string", b: [4, 5, 6] };
expect.equal(obj["a"], "string");
expect.equal(obj["b"][0], 4);

try {
  obj["c"];
} catch e {
  assert(e == "Key \"c\" not found");
}

let mutjson = MutJson { a: "string", b: [4, 5, 6] };
mutjson["a"] = true;
expect.equal(mutjson["a"], MutJson true);
mutjson["c"] = 10;

try {
  mutjson["b"][4];
} catch e {
  assert(e == "Index 4 out of bounds for array of length 3");
}

let mutarr = MutArray<num>[1, 2, 3];
mutarr[-3] = 5;
mutarr[10 - 8] = 10;
expect.equal(mutarr, [5, 2, 10]);

let s = "hello world";
expect.equal(s[4], "o");

class A {
  pub var value: num;
  new() {
    this.value = 5;
  }
}

let a = new A();
let mutarr2 = MutArray<A>[a];
mutarr2[0].value = 10;
expect.equal(a.value, 10);

let nested = MutArray<MutArray<num>>[MutArray<num>[1, 2], MutArray<num>[3, 4]];
assert(nested[0][0] == 1);
assert(nested[-1][-1] == 4);
nested[0][0] = 5;
assert(nested[0][0] == 5);
