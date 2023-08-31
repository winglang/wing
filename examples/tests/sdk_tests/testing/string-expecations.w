bring util;
bring testing;

test "inflight base64" {
    testing.Expectations.expect("hello").toEqual("hello");
    testing.Expectations.expect(1).totoBeGreaterThan(0);
}
