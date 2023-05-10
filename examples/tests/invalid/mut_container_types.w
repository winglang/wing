//Array tests
let arr1 = MutArray<num>[1, "2", 3];
let arr2 = MutArray<num>{1, 2, 3};
let arr3: MutArray<num> = [1, 2, 3]; // https://github.com/winglang/wing/issues/1117
let arr4 = MutArray<str>["a","b"];
let arr5: MutArray<num> = arr4;
arr1.someMethod();

//Set tests
let s1 = MutSet<num>{1, "2", 3};
let s2 = MutSet<num>[1, "2", 3];
let s3: MutSet<num> = {1, 1, 3}; // https://github.com/winglang/wing/issues/1117
let s4 = MutSet<str>{"hi"};
let s5: MutSet<num> = s4;
s3.someMethod();

//Map tests
let m1 = MutMap<num>{"hello": "world"};
//                            ^^^^^^^^ Expected type to be "num", but got "str" instead
let m2 = MutMap<str>["hello", "world"];
//       ^^^^^^^^^^^ Expected "Array" type, found "MutMap<str>"
let m3: MutMap<num> = {"hello": "world"};
//                    ^^^^^^^^^^^^^^^^^^ Expected type to be "MutMap<num>", but got "Map<str>" instead
let m4 = MutMap<num>{ "hello": 123 };
let m5: MutMap<str> = m4;
//                    ^^ Expected type to be "MutMap<str>", but got "MutMap<num>" instead
