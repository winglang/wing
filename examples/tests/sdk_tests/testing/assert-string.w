bring util;
bring testing;

let x: str? = nil;

testing.Assert.strEqual("hello", "hello");
testing.Assert.strIsNil(x);

test "inflight base64" {
    testing.Assert.strEqual("hello", "hello");
    testing.Assert.strIsNil(x);
}