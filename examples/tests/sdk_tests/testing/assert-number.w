bring util;
bring testing;

let x: num? = nil;

testing.Assert.numEqual(1, 1);
testing.Assert.numIsNil(x);

test "inflight base64" {
    testing.Assert.numEqual(1, 1);
    testing.Assert.numIsNil(x);
}