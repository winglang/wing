// This file was auto generated from an example found in: 11-sets.md_example_1
// Example metadata: {"valid":true}
// mutable set
let unqiueNumbers = MutSet<num>[1, 2, 3, 3, 3];
unqiueNumbers.add(4);
unqiueNumbers.delete(1);

// immutable set, values cannot be added or removed
let uniqueStrings = Set<str>["unique", "values", "values"];


log(Json.stringify(unqiueNumbers.toArray()));
log(Json.stringify(unqiueNumbers.size));

log(Json.stringify(uniqueStrings.toArray()));
