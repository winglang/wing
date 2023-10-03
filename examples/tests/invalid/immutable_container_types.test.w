let m1 = Map<str>{"a" => "hi"};

m1.set("a", "bye");
// ^^^ Unknown symbol "set" (TODO: better error message https://github.com/winglang/wing/issues/1660)

let m2: Map<str> = MutMap<str> {};
let m3 = Map<bool> { "a" => "A" };
let m4 = {"1" => 1, "2" => 2 };
m4.set("2", 3);
let m5 = m4.copy();
m4.delete("1");
m4.clear();