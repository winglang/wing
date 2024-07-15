bring expect; 

struct Result {
  item: Json?;
  items: Array<Json>?;
  mapItem: Map<str>?;
  mapItems: Array<Map<str>>?;
  setItem: Set<num>?;
  setItems: Array<Set<num>>?;
  structItem: Result?;
  structItems: Array<Result>?;
}

let result = Result {};

expect.equal(result.item?.tryGet("id"), nil);
expect.equal(result.item?.has("id"), nil);

expect.equal(result.items?.tryAt(0)?.tryGet("id"), nil);
expect.equal(result.items?.tryAt(0)?.has("id"), nil);

expect.equal(result.mapItem?.tryGet("a"), nil);
expect.equal(result.mapItem?.has("id"), nil);

expect.equal(result.mapItems?.tryAt(0)?.tryGet("id"), nil);
expect.equal(result.mapItems?.tryAt(0)?.has("id"), nil);

expect.equal(result.setItem?.size, nil);
expect.equal(result.setItem?.has(6), nil);

expect.equal(result.setItems?.tryAt(0)?.size, nil);
expect.equal(result.setItems?.tryAt(0)?.has(6), nil);

expect.equal(result.structItem?.item, nil);
expect.equal(result.structItems?.tryAt(0)?.item, nil);

let var calls = 0;

let makeArray = (): Array<num> => {
  calls = calls + 1;
  return [1, 2, 3];
};

expect.ok(makeArray()?.contains(2) ?? false);
expect.equal(calls, 1);

test "optional chaining macros" {
  let result = Result {};

  expect.equal(result.item?.tryGet("id"), nil);
  expect.equal(result.item?.has("id"), nil);

  expect.equal(result.items?.tryAt(0)?.tryGet("id"), nil);
  expect.equal(result.items?.tryAt(0)?.has("id"), nil);

  expect.equal(result.mapItem?.tryGet("a"), nil);
  expect.equal(result.mapItem?.has("id"), nil);

  expect.equal(result.mapItems?.tryAt(0)?.tryGet("id"), nil);
  expect.equal(result.mapItems?.tryAt(0)?.has("id"), nil);

  expect.equal(result.setItem?.size, nil);
  expect.equal(result.setItem?.has(6), nil);

  expect.equal(result.setItems?.tryAt(0)?.size, nil);
  expect.equal(result.setItems?.tryAt(0)?.has(6), nil);

  expect.equal(result.structItem?.item, nil);
  expect.equal(result.structItems?.tryAt(0)?.item, nil);

  let var calls = 0;

  let makeArray = (): Array<num> => {
    calls = calls + 1;
    return [1, 2, 3];
  };

  expect.ok(makeArray()?.contains(2) ?? false);
  expect.equal(calls, 1);
}



