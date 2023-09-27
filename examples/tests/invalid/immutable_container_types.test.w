let m1 = Map<str>{"a" => "hi"};

m1.set("a", "bye");
// ^^^ Unknown symbol "set" (TODO: better error message https://github.com/winglang/wing/issues/1660) 