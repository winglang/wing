bring util;

let standard_id: str = util.nanoid();
assert(standard_id.length == 21);

let id_size10 = util.nanoid(size: 10);
assert(id_size10.length == 10);

let id_custom = util.nanoid(alphabet: "01*/ab");
assert(id_custom.length == 21);
for i in 0..id_custom.length {
  if id_custom.at(i) == "0" 
      || id_custom.at(i) == "1" 
      || id_custom.at(i) == "*" 
      || id_custom.at(i) == "/" 
      || id_custom.at(i) == "a" 
      || id_custom.at(i) == "b" {
    assert(true);
  } else {
    assert(false);
  }
}

test "inflight nanoid" {
  let standard_id: str = util.nanoid();
  assert(standard_id.length == 21);

  let id_size10 = util.nanoid(size: 10);
  assert(id_size10.length == 10);

  let id_custom = util.nanoid(alphabet: "01*/ab");
  assert(id_custom.length == 21);
  for i in 0..id_custom.length {
    if id_custom.at(i) == "0" 
        || id_custom.at(i) == "1"
        || id_custom.at(i) == "*" 
        || id_custom.at(i) == "/" 
        || id_custom.at(i) == "a" 
        || id_custom.at(i) == "b" {
      assert(true);
    } else {
      assert(false);
    }
  }
}