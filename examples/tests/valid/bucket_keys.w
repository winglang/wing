bring cloud;

let b = new cloud.Bucket();

new cloud.Function(inflight () => {
  b.put("foo", "text");
  b.put("foo/", "text");
  b.put("foo/bar", "text");
  b.put("foo/bar/", "text");
  b.put("foo/bar/baz", "text");
  let objs = b.list();
  assert(objs.at(0) == "foo");
  assert(objs.at(1) == "foo/");
  assert(objs.at(2) == "foo/bar");
  assert(objs.at(3) == "foo/bar/");
  assert(objs.at(4) == "foo/bar/baz");
}) as "test";
