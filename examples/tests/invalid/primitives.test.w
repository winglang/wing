let x = "1,2,3";
let y = x.split(",");
      //^ x is not a class

let arr = [1, 2, 3];
let join = arr.blabla(",");
             //^ Property "blabla" doesn't not exist in "Array"
arr.push(4);
  //^ Property "push" doesn't not exist in "Array"
let n: str = arr.at(0);
           //^ expected str, got num
