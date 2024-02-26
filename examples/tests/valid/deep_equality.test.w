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
  assert(numA != numC);
  assert(strA != strC);
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
  assert(jsonA != jsonC);
  assert(!(jsonA != jsonB));
}

//-----------------------------------------------------------------------------
// Set
//-----------------------------------------------------------------------------
let setA = Set<num>[ 1,2,3 ];
let setB = MutSet<num>[ 1,2,3 ];
let setC = Set<num>[ 4,5,6 ];

test "Set types with the same value" {
  assert(setA == setA);
  assert(setA == setB);
}

test "Set types with different values" {
  assert(setA != setC);
  assert(!(setA != setB));
}

//-----------------------------------------------------------------------------
// Map
//-----------------------------------------------------------------------------
let mapA = { "a" => 1, "b" => 2 };
let mapB = MutMap<num>{ "a" => 1, "b" => 2 };
let mapC = { "c" => 10, "b" => 2 };

test "Map with the same value" {
  assert(mapA == mapA);
  assert(mapA == mapB);
}

test "Map with different values" {
  assert(mapA != mapC);
  assert(!(mapA != mapB));
}

//-----------------------------------------------------------------------------
// Array
//-----------------------------------------------------------------------------
let arrayA = [1,2,3];
let arrayB = MutArray<num>[1,2,3];
let arrayC: Array<num> = [4,5,6];

test "Array with the same value" {
  assert(arrayA == arrayA);
  assert(arrayA == arrayB);
}

test "Array with different values" {
  assert(arrayA != arrayC);
  assert(!(arrayA != arrayB));
}

//-----------------------------------------------------------------------------
// Struct
//-----------------------------------------------------------------------------
struct Cat {
  name: str;
  age: num;
}

let cat1 = Cat { name: "Mittens", age: 3 };
let cat2 = Cat { name: "Mittens", age: 3 };
let cat3 = Cat { name: "Simba", age: 5 };

test "Struct with the same value" {
  assert(cat1 == cat1);
  assert(cat1 == cat2);
}

test "Struct with different values" {
  assert(cat1 != cat3);
  assert(!(cat1 != cat2));
}
