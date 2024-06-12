// This file was auto generated from an example found in: 02-primitives.md_example_2
// Example metadata: {"valid":true}
let s = "Hello to a new Wing world";

// lets start with split
for w in s.split(" ") {
  if w.startsWith("H") {
    log(w); // 'Hello' starts with H
  } 
  if w.length > 3 && w.lowercase() == w {
    log(w); // 'world' is lowercased with more then 3 chars
  }
  if w.contains("in") && w.endsWith("g") {
    log(w); // 'Wing' has in and end with g
  }
  if s.indexOf(w) == 6  {
    log(w); // 'to' position is 6
  }
  if s.at(9) == w {
    log(w); // 'a' is a single char
  }
  if s.substring(11,14) == w {
    log(w); // 'new' position is 11-14
  }
}
