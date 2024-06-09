bring expect; 

struct Result {
  item: Json?;
  items: Array<Json>?;
  mapItem: Map<str>?;
  mapItems: Array<Map<str>>?;
  setItem: Set<num>?;
  setItems: Array<Set<num>>?;
}

test "optional chaining macros" {
  let result = Result {};

  expect.equal(result.item?.tryGet("id"), nil);
  expect.equal(result.item?.has("id"), false);

  expect.equal(result.items?.tryAt(0)?.tryGet("id"), nil);
  expect.equal(result.items?.tryAt(0)?.has("id"), false);

  expect.equal(result.mapItem?.tryGet("a"), nil);
  expect.equal(result.mapItem?.has("id"), false);

  expect.equal(result.mapItems?.tryAt(0)?.tryGet("id"), nil);
  expect.equal(result.mapItems?.tryAt(0)?.has("id"), false);

  expect.equal(result.setItem?.size, nil);
  expect.equal(result.setItem?.has(6), nil);

  expect.equal(result.setItems?.tryAt(0)?.size, nil);
  expect.equal(result.setItems?.tryAt(0)?.has(6), nil);
}



