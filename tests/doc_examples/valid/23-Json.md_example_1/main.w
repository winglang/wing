// This file was auto generated from an example found in: 23-Json.md_example_1
// Example metadata: {"valid":true}
let person = Json {
    firstName: "John",
    lastName: "Smith"
};

// stringify
log(Json.stringify(person));

// parse 
log(Json.parse("\{\"firstName\":\"John\",\"lastName\":\"Smith\"}"));

// Try and parse
if let jsonFromTryParse = Json.tryParse("\{\"firstName\":\"John\",\"lastName\":\"Smith\"}") {
  log("{jsonFromTryParse}");
} else {
  log("failed to parse string to JSON");
}

// Deep copy of Json
let newPerson = Json.deepCopy(person);
log(Json.stringify(person));

// iterate over keys
for k in Json.keys(person) {
  let value = person.get(k);
  log("found key {k} with value {value}");
}

// iterate over values
for value in Json.values(person) {
  log("found value {value}");
}

// iterate over array
let arrayValue = Json ["a", "b", "c"];
for v in Json.values(arrayValue) {
  log(str.fromJson(v));
}

// Convert to structs
struct Foo {
  val1: str;
  val2: num;
}

let jFoo = {
  val1: "cool",
  val2: 21
};

let foo = Foo.fromJson(jFoo);
log(Json.stringify(foo));
