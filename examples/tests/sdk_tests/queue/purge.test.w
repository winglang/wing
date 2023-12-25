bring cloud;
bring util;

let q = new cloud.Queue();

test "purge" {
  q.push("foo");
  q.push("bar");
  q.push("baz");

  assert(util.waitUntil(inflight () => { 
    return q.approxSize() == 3;
  }, timeout: 1m, interval: 1s));

  q.purge();

  assert(util.waitUntil(inflight () => {
    return q.approxSize() == 0;
  }, timeout: 1m, interval: 1s));
}
