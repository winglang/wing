let s1 = "foo";
let s2 = "bar";

assert("" == "");
assert("'" == "'");
assert("\"" == "\"");
assert("`" == "`");
assert("``" == "``");
assert("`s1`" == "`s1`");
assert(s1 == s1);
assert("${s1}" == "${s1}");
assert("`'${s1}" == "`'${s1}");
assert("a${s1}b${s2}c" == "a${s1}b${s2}c");
