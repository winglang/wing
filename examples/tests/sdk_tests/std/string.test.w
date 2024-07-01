let assertThrows = (expected: str, block: (): void) => {
  let var error = false;
  try {
    block();
  } catch actual {
    assert(actual.contains(expected) == true);
    error = true;
  }

  assert(error);
};

//-----------------------------------------------------------------------------
// fromJson (static)

let PARSE_ERROR = "unable to parse string";

assert(str.fromJson(Json "Hello") == "Hello");
assertThrows(PARSE_ERROR, () => {
  str.fromJson(Json 123); 
});

test "fromJson" {
  assert(str.fromJson(Json "World") == "World");
  try { str.fromJson(Json 123); } catch s { assert(s.contains(PARSE_ERROR)); }
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

let INDEX_OUT_OF_BOUNDS_ERROR = "index out of bounds";

assert("boom".at(2) == "o");
// Negative integers count back from the last string character.
assert("boom".at(-4) == "b");
assert("boom".at(-1) == "m");
// Should throw an exception
assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
  "boom".at(4);
});
assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
  "boom".at(-5);
});

test "at()" {
  assert("boom".at(0) == "b");
  // Negative integers count back from the last string character.
  assert("boom".at(-4) == "b");
  assert("boom".at(-1) == "m");
  // Should throw an exception
  try { "boom".at(4); } catch s { assert(s == INDEX_OUT_OF_BOUNDS_ERROR ); } // <-- Passes if no exception is thrown, see issue #3341
  try { "boom".at(-5); } catch s { assert(s == INDEX_OUT_OF_BOUNDS_ERROR ); }
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
assert("hello;wing".split(";").at(1) == "wing");
assert("hello wing".split(" ").at(0) == "hello");
assert("hello;wing".split(";").at(1) == "wing");
assert("hello wing".split("").length == 10);
assert("hello wing".split("").at(0) == "h");
assert("hello wing".split("").at(1) == "e");

test "split()" {
  assert("hello;wing".split(";").at(0) == "hello");
  assert("hello;wing".split(";").at(1) == "wing");
  assert("hello wing".split(" ").at(0) == "hello");
  assert("hello;wing".split(";").at(1) == "wing");
  assert("hello wing".split("").length == 10);
  assert("hello wing".split("").at(0) == "h");
  assert("hello wing".split("").at(1) == "e");
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

//-----------------------------------------------------------------------------
// contains()

assert("hello wing".contains("hello"));
assert(!"hello wing".contains("Hello"));
assert("hello wing".contains("w"));

test "contains()" {
  assert("hello wing".contains("hello"));
  assert(!"hello wing".contains("Hello"));
  assert("hello wing".contains("w"));
}

//-----------------------------------------------------------------------------
// replace()

assert("hello world".replace("world", "wing") == "hello wing");
assert("pʅɹoʍ oʅʅǝɥ".replace("pʅɹoʍ", "ɓuᴉʍ") == "ɓuᴉʍ oʅʅǝɥ");
assert("hello world".replace("wing", "☁") == "hello world");
assert("hello world".replace(" ", "-") == "hello-world");
assert("".replace("", "hello world") == "hello world");

test "replace()" {
  assert("hello world".replace("world", "wing") == "hello wing");
  assert("pʅɹoʍ oʅʅǝɥ".replace("pʅɹoʍ", "ɓuᴉʍ") == "ɓuᴉʍ oʅʅǝɥ");
  assert("hello world".replace("wing", "☁") == "hello world");
  assert("hello world".replace(" ", "-") == "hello-world");
  assert("".replace("", "hello world") == "hello world");
}

//-----------------------------------------------------------------------------
// replaceAll()

assert("hello world world".replaceAll("world", "wing") == "hello wing wing");
assert("pʅɹoʍ oʅʅǝɥ pʅɹoʍ".replaceAll("pʅɹoʍ", "ɓuᴉʍ") == "ɓuᴉʍ oʅʅǝɥ ɓuᴉʍ");
assert("hello world".replaceAll("wing", "☁") == "hello world");
assert("hello world world".replaceAll(" ", "-") == "hello-world-world");
assert("".replaceAll("", "hello world") == "hello world");

test "replaceAll()" {
  assert("hello world world".replaceAll("world", "wing") == "hello wing wing");
  assert("pʅɹoʍ oʅʅǝɥ pʅɹoʍ".replaceAll("pʅɹoʍ", "ɓuᴉʍ") == "ɓuᴉʍ oʅʅǝɥ ɓuᴉʍ");
  assert("hello world".replaceAll("wing", "☁") == "hello world");
  assert("hello world world".replaceAll(" ", "-") == "hello-world-world");
  assert("".replaceAll("", "hello world") == "hello world");
}