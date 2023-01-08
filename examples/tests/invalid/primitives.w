let x = "1,2,3";
let y = x.split(",");
      //^ x is not a class

print(y[0]);
     //^ no array indexing

let arr = [1, 2, 3];
let join = arr.join(",");
             //^ join is not a valid method
arr.push(4);
  //^ push is not a valid method (array is immutable)
let n: str = arr.at(0);
           //^ expected str, got num
