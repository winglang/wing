let s1 = "foo";
let s2 = "bar";

assert("" == "");
assert("'" == "'");
assert("\"" == "\"");
assert("`" == "`");
assert("``" == "``");
assert("`s1`" == "`s1`");
assert(s1 == s1);
assert("{s1}" == "{s1}");
assert("{s1}" != "{s2}");
assert("a{s1}" == "a{s1}");
assert("a{s1}" != "b{s1}");
assert("{s1}a" == "{s1}a");
assert("{s1}a" != "{s1}b");
assert("`'{s1}" == "`'{s1}");
assert("a{s1}b{s2}c" == "a{s1}b{s2}c");

test "assert works inflight" {
  assert("" == "");
  assert("'" == "'");
  assert("\"" == "\"");
  assert("`" == "`");
  assert("``" == "``");
  assert("`s1`" == "`s1`");
  assert(s1 == s1);
  assert("{s1}" == "{s1}");
  assert("{s1}" != "{s2}");
  assert("a{s1}" == "a{s1}");
  assert("a{s1}" != "b{s1}");
  assert("{s1}a" == "{s1}a");
  assert("{s1}a" != "{s1}b");
  assert("`'{s1}" == "`'{s1}");
  assert("a{s1}b{s2}c" == "a{s1}b{s2}c");
}
