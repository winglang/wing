bring "./../../valid/assertions.w" as assertions;

//-----------------------------------------------------------------------------
// fromJson (static)

let PARSE_ERROR = "unable to parse string:\n- instance is not of a type(s) string";

assert(str.fromJson(Json "Hello") == "Hello");
assertions.PreflightAssert.throws(PARSE_ERROR, () => {
  str.fromJson(Json 123); 
});

test "fromJson" {
  assert(str.fromJson(Json "World") == "World");
  assertions.Assert.throws(PARSE_ERROR, () => {
    str.fromJson(Json 123);
  });
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
assertions.PreflightAssert.throws(INDEX_OUT_OF_BOUNDS_ERROR, () => {
  "boom".at(4);
});
assertions.PreflightAssert.throws(INDEX_OUT_OF_BOUNDS_ERROR, () => {
  "boom".at(-5);
});

test "at()" {
  assert("boom".at(0) == "b");
  // Negative integers count back from the last string character.
  assert("boom".at(-4) == "b");
  assert("boom".at(-1) == "m");
  // Should throw an exception
  assertions.Assert.throws(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    // Passes if no exception is thrown, see issue #3341
    "boom".at(4);
  });
  assertions.Assert.throws(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    "boom".at(-5);
  });
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
