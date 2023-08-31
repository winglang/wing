bring regex;

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

assert(matches1 == true );
assert(matches2 == true );
assert(matches3 == true );
assert(matches4 == true );

assert(matches5 == false);
assert(matches6 == false);

assert(matches7 == true );
assert(matches8 == true );

assert(matches9 == false);
assert(matches10 == false);

test "inflight match" {
        
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


  assert(matches1 == true );
  assert(matches2 == true );
  assert(matches3 == true );
  assert(matches4 == true );

  assert(matches5 == false);
  assert(matches6 == false);

  assert(matches7 == true );
  assert(matches8 == true );

  assert(matches9 == false);
  assert(matches10 == false);
    
}
