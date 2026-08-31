let sArray = ["one", "two"];
let mutArray = sArray.copyMut();
mutArray.push("three");
let immutArray = mutArray.copy();
let mutArrayCopy = mutArray.copyMut();
mutArrayCopy.push("four");
assert(mutArrayCopy.length == 4);
assert(mutArray.length == 3);
let s: str = sArray.at(1);
assert(s == "two");
assert(sArray.at(1) == "two");
assert(sArray.length == 2);
assert(immutArray.length == 3);
let sArray2 = ["if", "you", "build", "it"];
let sArray3 = ["he", "will", "come", "for", "you"];
let mergedArray = sArray2.concat(sArray3);
assert(mergedArray.length == 9);
assert(mergedArray.at(5) == "will");
assert(mergedArray.contains("build"));
assert(!mergedArray.contains("bring"));
assert(mergedArray.indexOf("you") == 1);
assert(mergedArray.join(" ") == "if you build it he will come for you");
assert(mergedArray.join() == "if,you,build,it,he,will,come,for,you");
assert(mergedArray.lastIndexOf("you") == 8);
let mutArray2 = MutArray<str> ["how", "does", "that", "look"];
let mergedMutArray = mutArray.concat(mutArray2);
assert(mergedMutArray.length == 7);
assert(mergedMutArray.at(5) == "that");

let sSet = Set<str>["one", "two"];
let mutSet = sSet.copyMut();
mutSet.add("three");
let immutSet = mutSet.copy();
assert(sSet.has("one"));
assert(sSet.size == 2);
assert(immutSet.size == 3);
let mutSetCopy = mutSet.copyMut();
mutSetCopy.add("four");
assert(mutSetCopy.size == 4);
assert(mutSet.size == 3);


let sMap = {"one" => 1, "two" => 2};
let nestedMap = {"a" => {"b" => {"c": "hello"}}};
let mutMap = sMap.copyMut();
mutMap.set("five", 5);
let immutMap = mutMap.copy();
assert(sMap.get("one") == 1);
assert(sMap.size() == 2);
assert(immutMap.size() == 3);
let mutMapCopy = mutMap.copyMut();
mutMapCopy.set("six", 6);
assert(mutMapCopy.size() == 4);
assert(mutMap.size() == 3);
assert(nestedMap.get("a").get("b").get("c") == "hello");

class Animal {}
class Cat extends Animal {}
class Dog extends Animal {}

let heterogeneousArray = Array<Animal>[
  new Cat() as "C1",
  new Dog() as "D1",
];
let heterogeneousDoubleArray = Array<Array<Animal>>[
  [new Cat() as "C2"],
  Array<Animal>[new Cat() as "C3", new Dog() as "D2"],
  [new Animal() as "A1"],
];
let heterogeneousSet = Set<Animal>[
  new Cat() as "C4",
  new Dog() as "D3",
];
let heterogeneousMap = Map<Animal>{
  "cat" => new Cat() as "C5",
  "dog" => new Dog() as "D4",
};
