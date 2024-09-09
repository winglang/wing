let arr = MutArray<num>[1, 2, 3];
arr.push(4);

let map = MutMap<str>{"a" => "1"};
map.set("b", "2");

let takeJson = (obj: Json) => {
  
};

takeJson({ values: arr }); 
//       ^^^^^^^^^^^^^^^ "MutArray<num>" is not a legal JSON value
takeJson({ values: map }); 
//       ^^^^^^^^^^^^^^^ "MutMap<str>" is not a legal JSON value