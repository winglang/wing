let assertThrows = (expected: str, block: (): void) => {
  let var error = false;
  try {
    block();
  } catch actual {
    assert(actual == expected);
    error = true;
  }

  assert(error);
};

//-----------------------------------------------------------------------------
// fromJson (static)

let PARSE_ERROR = "unable to parse number 123 as a string";

assert(str.fromJson(Json "Hello") == "Hello");
assertThrows(PARSE_ERROR, () => {
  str.fromJson(Json 123); 
});

test "fromJson" {
  assert(str.fromJson(Json "World") == "World");
  try { str.fromJson(Json 123); } catch s { assert(s == PARSE_ERROR); }
}

//-----------------------------------------------------------------------------
// length

assert("hello".length == 5);
assert("".length == 0);

test "length" {
  assert("hello".length == 5);
  assert("".length == 0);
}

//-----------------------------------------------------------------------------
// at()

assert("boom".at(2) == "o");
//TODO: assertThrows("ERROR", () => { "hey".at(-1); });

test "at()" {
  assert("boom".at(0) == "b");
}

//-----------------------------------------------------------------------------
// concat()

assert("boom".concat("boom") == "boomboom");

test "concat()" {
  assert("boom".concat("boom") == "boomboom");
}

//-----------------------------------------------------------------------------
// endsWith()

assert("boom".endsWith("m"));
assert(!"boom".endsWith("b"));

test "endsWith()" {
  assert("boom".endsWith("m"));
  assert(!"boom".endsWith("b"));
}

//-----------------------------------------------------------------------------
// indexOf()

assert("boom".indexOf("m") == 3);
assert("boom".indexOf("a") == -1);

test "indexOf()" {
  assert("boom".indexOf("m") == 3);
  assert("boom".indexOf("a") == -1);
}

//-----------------------------------------------------------------------------
// lowercase()

assert("BOOM".lowercase() == "boom");
assert("BooM".lowercase() == "boom");
assert("boom".lowercase() == "boom");
assert("123#@".lowercase() == "123#@");

test "lowercase()" {
  assert("BOOM".lowercase() == "boom");
  assert("BooM".lowercase() == "boom");
  assert("boom".lowercase() == "boom");
  assert("123#@".lowercase() == "123#@");

}

//-----------------------------------------------------------------------------
// uppercase()

assert("BOOM".uppercase() == "BOOM");
assert("BooM".uppercase() == "BOOM");
assert("boom".uppercase() == "BOOM");
assert("123#@".uppercase() == "123#@");

test "uppercase()" {
  assert("BOOM".uppercase() == "BOOM");
  assert("BooM".uppercase() == "BOOM");
  assert("boom".uppercase() == "BOOM");
  assert("123#@".uppercase() == "123#@");
}

//-----------------------------------------------------------------------------
// split()

assert("hello;wing".split(";").at(0) == "hello");
assert("hello wing".split(" ").at(0) == "hello");
assert("hello wing".split("").at(0) == "h");

test "split()" {
  assert("hello;wing".split(";").at(0) == "hello");
  assert("hello wing".split(" ").at(0) == "hello");
  assert("hello wing".split("").at(0) == "h");
}

//-----------------------------------------------------------------------------
// startsWith()

assert("hello wing".startsWith("h"));
assert(!"hello wing".startsWith("H"));
assert(!"hello wing".startsWith("w"));

test "startsWith()" {
  assert("hello wing".startsWith("h"));
  assert(!"hello wing".startsWith("H"));
  assert(!"hello wing".startsWith("w"));
}

//-----------------------------------------------------------------------------
// substring()

assert("hello wing".substring(0, 5) == "hello");
assert("hello wing".substring(0, 100) == "hello wing");

test "substring()" {
  assert("hello wing".substring(0, 5) == "hello");
  assert("hello wing".substring(0, 100) == "hello wing");
}

//-----------------------------------------------------------------------------
// trim()

assert("hello wing         ".trim() == "hello wing");
assert("hello wing".trim() == "hello wing");
assert("".trim() == "");
assert("\thello wing\n".trim() == "hello wing");

test "trim()" {
  assert("hello wing         ".trim() == "hello wing");
  assert("hello wing".trim() == "hello wing");
  assert("".trim() == "");
  assert("\thello wing\n".trim() == "hello wing");
}

