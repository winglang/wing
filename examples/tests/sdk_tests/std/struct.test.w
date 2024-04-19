bring expect;

struct Person {
  name: str;
  age: num;
}

let assertThrows = inflight (expected: str, block: (): void) => {
  let var error = false;
  try {
    block();
  } catch actual {
    expect.equal(actual, expected);
    error = true;
  }
  assert(error);
};

test "parseJson()" {
  let jsonString = "\{\"name\": \"Billy\", \"age\": 25}";
  
  let person = Person.parseJson(jsonString);
  expect.equal(person.name, "Billy");
  expect.equal(person.age, 25);
}

test "tryParseJson()" {
  // parse happy path
  let jsonString = "\{\"name\": \"Billy\", \"age\": 25}";
  let person = Person.tryParseJson(jsonString);

  if let person = person {
    expect.equal(person.name, "Billy");
    expect.equal(person.age, 25);
  } else {
    assert(false); // should not happen
  }

  // parse sad path (but still happily)
  let jsonStringMaybe: str? = nil;
  let notPerson = Person.tryParseJson(jsonStringMaybe);

  if let person = notPerson {
    assert(false); // should not happen
  }
}

test "invalid parseJson()" {
  let jsonString = "\{\"name\": \"Billy\", \"age\": false}";
  
  assertThrows("unable to parse Person:\n- Person/age must be number", () => {
    Person.parseJson(jsonString);
  });
}

test "invalid tryParseJson()" {
  let jsonString = "\{\"name\": \"Billy\", \"age\": false}";

  if let person = Person.tryParseJson(jsonString) {
    assert(false); // should not happen
  }
}

struct Foo {
  someJson: Json;
}

test "valid Json types" {
  let s = Foo.fromJson({someJson: "wow"});
  let b = Foo.fromJson({someJson: true});
  let n = Foo.fromJson({someJson: 123});
  let arr = Foo.fromJson({someJson: [1, 2, 3]});
  let j = Foo.fromJson({someJson: {even: "more json!"}});

  expect.equal(s.someJson, "wow");
  expect.equal(b.someJson, true);
  expect.equal(n.someJson, 123);
  expect.equal(arr.someJson, [1, 2, 3]);
  expect.equal(j.someJson, {even: "more json!"});
}