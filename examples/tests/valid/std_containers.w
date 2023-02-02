let s_array = ["one", "two", "three", "four"];
let mut_array = s_array.copy_mut();
mut_array.push("five");
let immut_array = mut_array.copy();

let s: str = s_array.at(2);
let handler = inflight (body: str): str => {
  let ss = s_array.at(1);
  assert(ss == "two");
  assert(s_array.length == 4);
  assert(immut_array.length == 5);
};
