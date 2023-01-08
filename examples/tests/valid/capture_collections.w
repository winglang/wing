bring cloud;

let arr = ["hello", "world"];

let handler = inflight (s: str): str => {
  print(arr.at(0));
  print(arr.at(1));
  print("size=${arr.length}");
};

new cloud.Function(handler);

