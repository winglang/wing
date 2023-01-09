bring cloud;

let arr = ["hello", "world"];
let my_set = {"my", "my", "set"};

let handler = inflight (s: str): str => {
  print(arr.at(0));
  print(arr.at(1));
  print("size=${arr.length}");

  let set_size = my_set.size;
  print("set size=${set_size}");
};

new cloud.Function(handler);

