//-----------------------------------------------------------------------------
// rangeOf

assert(std.Range.of(1,5,true).join() == "1,2,3,4,5");

test "rangeOf" {
    assert(std.Range.of(1,5,true).join() == "1,2,3,4,5");
}

assert(std.Range.of(1,5,false).join() == "1,2,3,4");

test "rangeOfWithoutLastNumber" {
   assert(std.Range.of(1,5,false).join() == "1,2,3,4");
}

assert(std.Range.of(1,5).join() == "1,2,3,4");

test "rangeOfWithoutLastNumberDefault" {
   assert(std.Range.of(1,5).join() == "1,2,3,4");
}

assert(std.Range.of(-3,3,true).join() == "-3,-2,-1,0,1,2,3");

test "rangeOfWithNegativeRange" {
   assert(std.Range.of(-3,3,true).join() == "-3,-2,-1,0,1,2,3");
}

assert(std.Range.of(5,0,true).join() == "5,4,3,2,1,0");

test "rangeOfDecreasingNumbers" {
   assert(std.Range.of(5,0,true).join() == "5,4,3,2,1,0");
}

let var i = 0;
for x in 0..5 { i+=1; }
assert(i==5);

test "forWithRange" { 
   let var i = 0;
   for x in 0..5 { i+=1; }
   assert(i==5);
}

let var n = 0;
for x in 0..=5 { n+=1; }
assert(n==6);

test "forWithRangeIncludeLastNumber" { 
   let var n = 0;
   for x in 0..=5 { n+=1; }
   assert(n==6);
}