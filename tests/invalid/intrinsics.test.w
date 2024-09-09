inflight () => {
  let x = @dirname;
//        ^^^^^^^^ @dirname cannot be used inflight
  let y = @filename;
//        ^^^^^^^^ @filename cannot be used inflight
};

let path = @dirname();
//                 ^^ Unexpected arguments
