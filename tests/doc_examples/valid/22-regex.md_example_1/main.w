// This file was auto generated from an example found in: 22-regex.md_example_1
// Example metadata: {"valid":true}

let r = regex.compile("p([a-z]+)ch");

// Checks if the regular expression matches the provided text.
log(r.test("peach"));

// Finds the first occurrence of the pattern within the text.
log(r.find("peach peach") ?? "");

// Finds all non-overlapping occurrences of the pattern within the text.
log(Json.stringify(r.findAll("peach punch pinch")));

// Finds the start and end index of all matches within the text.
log(Json.stringify(r.findAllIndex("peach punch pinch")));

// Finds the start and end index of the first match within the text.
log(Json.stringify(r.findIndex("peach")));

// Finds the first match and its submatches.
log(Json.stringify(r.findSubmatch("peach punch")));

// Finds the start and end index of the match and all submatches.
log(Json.stringify(r.findSubmatchIndex("peach punch")));

// Replaces all occurrences of the match with a replacement string.
log(r.replaceAll("a peach", "<fruit>"));
