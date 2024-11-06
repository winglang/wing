// This file was auto generated from an example found in: 23-Json.md_example_1
// Example metadata: {"valid":true}
let person = Json {
    firstName: "John",
    lastName: "Smith"
};

// stringify
log(Json.stringify(person)); // {"firstName":"John","lastName":"Smith"}

// parse 
log(Json.parse("\{\"firstName\":\"John\",\"lastName\":\"Smith\"}")); // { firstName: 'John', lastName: 'Smith' }

// Try and parse
if let jsonFromTryParse = Json.tryParse("\{\"firstName\":\"John\",\"lastName\":\"Smith\"}") {
  log("{jsonFromTryParse}"); // {"firstName":"John","lastName":"Smith"}
} else {
  log("failed to parse string to JSON");
}

// Deep copy of Json
let newPerson = Json.deepCopy(person);
log(Json.stringify(person)); // {"firstName":"John","lastName":"Smith"}


