let f = (x: num) => {
  // do something
};

let x: num? = 1;

f(x);
//^ error: x is num? but f expects num

let y = true;
if y? {
 // ^ y isn't optional
} 