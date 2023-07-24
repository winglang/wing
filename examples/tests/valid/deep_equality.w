//-----------------------------------------------------------------------------
// Primitive types
//-----------------------------------------------------------------------------
let numA = 1;
let numB = 1;
let numC = 10;

let strA = "wing";
let strB = "wing";
let strC = "wingnuts";

test "Primitive types with the same value" {
  assert(numA == numA);
  assert(numA == numB);

  assert(strA == strA);
  assert(strA == strB);
}

test "Primitive types with different values" {
  try {
    assert(numA == numC);
  } catch e {
    assert(e == "assertion failed: numA == numC");
  }
  
  try {
    assert(strA == strC);
  } catch e {
    assert(e == "assertion failed: strA == strC");
  }  
}

//-----------------------------------------------------------------------------
// Json
//-----------------------------------------------------------------------------
let jsonA = { a: 1 };
let jsonB = MutJson { a: 1 };
let jsonC = Json [1,2,3];

test "Json with the same value" {
  assert(jsonA == jsonA);
  assert(jsonA == jsonB);
}

test "Json with different values" {
  try {
    assert(jsonA == jsonC);
  } catch e {
    assert(e == "assertion failed: jsonA == jsonC");
  }
}

//-----------------------------------------------------------------------------
// Set
//-----------------------------------------------------------------------------
let setA = { 1,2,3 };
let setB = MutSet<num>{ 1,2,3 };
let setC = { 4,5,6 };

test "Set types with the same value" {
  assert(setA == setA);
  assert(setA == setB.copy());
}

test "Set types with different values" {
  try {
    assert(setA == setC);
  } catch e {
    assert(e == "assertion failed: setA == setC");
  }
}

//-----------------------------------------------------------------------------
// Map
//-----------------------------------------------------------------------------
let mapA = { "a" => 1, "b" => 2 };
let mapB = MutMap<num>{ "a" => 1, "b" => 2 };
let mapC = { "c" => 10, "b" => 2 };

test "Map with the same value" {
  assert(mapA == mapA);
  assert(mapA == mapB.copy());
}

test "Map with different values" {
  try {
    assert(mapA == mapC);
  } catch e {
    assert(e == "assertion failed: mapA == mapC");
  }
}

//-----------------------------------------------------------------------------
// Array
//-----------------------------------------------------------------------------
let arrayA = [1,2,3];
let arrayB = MutArray<num>[1,2,3];
let arrayC: Array<num> = [4,5,6];

test "Array with the same value" {
  assert(arrayA == arrayA);
  assert(arrayA == arrayB.copy());
}

test "Array with different values" {
  try {
    assert(arrayA == arrayC);
  } catch e {
    assert(e == "assertion failed: arrayA == arrayC");
  }
}
