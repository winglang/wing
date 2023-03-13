print("---\nfor i in 0..0 { ... }");
for i in 0..0 {
  assert(false);
}
print("there's no value to iterate");

print("---\nfor i in 0..=0 { ... }");
let arr1 = MutArray<num>[];
for i in 0..=0 {
  assert(i == 0);
  arr1.push(i);
}
print("[${arr1}]");

print("---\nfor i in 0..2 { ... }");
let arr2 = MutArray<num>[];
for i in 0..2 {
  assert(i >= 0);
  assert(i < 2);
  arr2.push(i);
}
print("[${arr2}]");

print("---\nfor i in 0..=2 { ... }");
let arr3 = MutArray<num>[];
for i in 0..=2 {
  assert(i >= 0);
  assert(i <= 2);
  arr3.push(i);
}
print("[${arr3}]");

print("---\nfor i in 2..0 { ... }");
let arr4 = MutArray<num>[];
for i in 2..0 {
  assert(i <= 2);
  assert(i > 0);
  arr4.push(i);
}
print("[${arr4}]");

print("---\nfor i in 2..=0 { ... }");
let arr5 = MutArray<num>[];
for i in 2..=0 {
  assert(i <= 2);
  assert(i >= 0);
  arr5.push(i);
}
print("[${arr5}]");

print("---\nfor i in 0..-2 { ... }");
let arr6 = MutArray<num>[];
for i in 0..-2 {
  assert(i <= 0);
  assert(i > -2);
  arr6.push(i);
}
print("[${arr6}]");

print("---\nfor i in 0..=-2 { ... }");
let arr7 = MutArray<num>[];
for i in 0..=-2 {
  assert(i <= 0);
  assert(i > -3);
  arr7.push(i);
}
print("[${arr7}]");

print("---\nfor i in -2..0 { ... }");
let arr8 = MutArray<num>[];
for i in -2..0 {
  assert(i >= -2);
  assert(i < 0);
  arr8.push(i);
}
print("[${arr8}]");

print("---\nfor i in -2..=0 { ... }");
let arr9 = MutArray<num>[];
for i in -2..=0 {
  assert(i >= -2);
  assert(i <= 0);
  arr9.push(i);
}
print("[${arr9}]");

let x = 2;
print("---\nfor i in 0..x { ... } <=> x = 2");
let arr10 = MutArray<num>[];
for i in 0..x {
  assert(i >= 0);
  assert(i < 2);
  arr10.push(i);
}
print("[${arr10}]");

print("---\nfor i in 0..=x { ... } <=> x = 2");
let arr11 = MutArray<num>[];
for i in 0..=x {
  assert(i >= 0);
  assert(i <= 2);
  arr11.push(i);
}
print("[${arr11}]");

print("---\nfor i in x..0 { ... } <=> x = 2");
let arr12 = MutArray<num>[];
for i in x..0 {
  assert(i <= 2);
  assert(i > 0);
  arr12.push(i);
}
print("[${arr12}]");

print("---\nfor i in 0..(x*2) { ... } <=> x = 2");
let arr13 = MutArray<num>[];
for i in 0..(x*2) {
  assert(i >= 0);
  assert(i < 4);
  arr13.push(i);
}
print("[${arr13}]");

print("---\nfor i in 0..=(x*2) { ... } <=> x = 2");
let arr14 = MutArray<num>[];
for i in 0..=(x*2) {
  assert(i >= 0);
  assert(i <= 4);
  arr14.push(i);
}
print("[${arr14}]");

print("---\nfor i in (x*2)..0 { ... } <=> x = 2");
let arr15 = MutArray<num>[];
for i in (x*2)..0 {
  assert(i <= 4);
  assert(i > 0);
  arr15.push(i);
}
print("[${arr15}]");