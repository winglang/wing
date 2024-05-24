let funkPath = "./path.ts";
let func: inflight (): str = @inflight(funkPath, lifts: [
//                   ^^^^^^^^ Must be a string literal
  { obj: [1, 2, 3] }
//^^^^^^^^^^^^^^^^^^ alias is required because object is not an identifier
]);
