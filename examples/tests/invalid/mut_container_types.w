//Array tests
let arr1 = MutArray<num>[1, "2", 3];
let arr2 = MutArray<num>{1, 2, 3};
let arr3: MutArray<num> = [1, 2, 3]; // https://github.com/winglang/wing/issues/1117
let arr4 = MutArray<str>["a","b"];
let arr5: MutArray<num> = arr4;
arr1.some_method();

//Set tests
let s1 = MutSet<num>{1, "2", 3};
let s2 = MutSet<num>[1, "2", 3];
let s3: MutSet<num> = {1, 1, 3}; // https://github.com/winglang/wing/issues/1117
let s4 = MutSet<str>{"hi"};
let s5: MutSet<num> = s4;
s3.some_method();