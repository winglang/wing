inflight () => {
  let x = @path("package.json");
//        ^^^^^ @path cannot be used inflight
};

let path = @path;
//         ^^^^^ Expected arguments