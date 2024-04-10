bring expect;

let r = regex.compile("p([a-z]+)ch");

// check if there are any matches
expect.equal(r.test("peach"), true);

// returns the first match, if there is one
expect.equal(r.find("peach peach"), "peach");

// returns all of the non-overlapping matches
expect.equal(r.findAll("peach punch pinch"), ["peach", "punch", "pinch"]);

// returns the start and end index of the first match, if there is one
expect.equal(r.findIndex("peach punch"), [0, 5]);

// returns the start and end index of all matches
expect.equal(r.findAllIndex("peach punch pinch"), [[0, 5], [6, 11], [12, 17]]);

// returns the match and all submatches from groups like ([a-z]+)
expect.equal(r.findSubmatch("peach punch"), ["peach", "ea"]);

// returns the start and end index of the match and all submatches
expect.equal(r.findSubmatchIndex("peach punch"), [[0, 5], [1, 3]]);

// replace all occurrences of a match with a string
expect.equal(r.replaceAll("a peach", "<fruit>"), "a <fruit>");

test "regex" {
  let r = regex.compile("p([a-z]+)ch");

  expect.equal(r.test("peach"), true);
  expect.equal(r.find("peach peach"), "peach");
  expect.equal(r.findAll("peach punch pinch"), ["peach", "punch", "pinch"]);
  expect.equal(r.findIndex("peach punch"), [0, 5]);
  expect.equal(r.findAllIndex("peach punch pinch"), [[0, 5], [6, 11], [12, 17]]);
  expect.equal(r.findSubmatch("peach punch"), ["peach", "ea"]);
  expect.equal(r.findSubmatchIndex("peach punch"), [[0, 5], [1, 3]]);
  expect.equal(r.replaceAll("a peach", "<fruit>"), "a <fruit>");
}


let matches1 = regex.match("p[a-z]+ch" , "peach");
let matches2 = regex.match("[0-9]+" , "0923");
let matches3 = regex.match("[0-9]+" , "0a923");
let matches4 = regex.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+\$" , "james_bond007@wing.com");

let matches5 = regex.match("p([a-z]+)ch" , "leach");
let matches6 = regex.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+" , "@james_bond007@gmail.com");

let matches7 = regex.match("^Mary" , "Mary had a little lamb");
let matches8 = regex.match("lamb\$" , "Mary had a little lamb");

let matches9 = regex.match("lamb\$" , "Mary had a little hamb");
let matches10 = regex.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+\$" , "james_bond007@gmail.com123");

expect.equal(matches1, true);
expect.equal(matches2, true);
expect.equal(matches3, true);
expect.equal(matches4, true);

expect.equal(matches5, false);
expect.equal(matches6, false);

expect.equal(matches7, true );
expect.equal(matches8, true );

expect.equal(matches9, false);
expect.equal(matches10, false);

test "regex.match()" {
  let matches1 = regex.match("p[a-z]+ch" , "peach");
  let matches2 = regex.match("[0-9]+" , "0923");
  let matches3 = regex.match("[0-9]+" , "0a923");
  let matches4 = regex.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+\$" , "james_bond007@wing.com");

  let matches5 = regex.match("p([a-z]+)ch" , "leach");
  let matches6 = regex.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+" , "@james_bond007@gmail.com");

  let matches7 = regex.match("^Mary" , "Mary had a little lamb");
  let matches8 = regex.match("lamb\$" , "Mary had a little lamb");

  let matches9 = regex.match("lamb\$" , "Mary had a little hamb");
  let matches10 = regex.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+\$" , "james_bond007@gmail.com123");

  expect.equal(matches1, true);
  expect.equal(matches2, true);
  expect.equal(matches3, true);
  expect.equal(matches4, true);

  expect.equal(matches5, false);
  expect.equal(matches6, false);

  expect.equal(matches7, true);
  expect.equal(matches8, true);

  expect.equal(matches9, false);
  expect.equal(matches10, false);
}
