let x = -1;
let y = (2) * x;
let z = (x + (y) - 1);
let xyz = ((y * y) / (x * x)) * z;

let xf = 1.0;
let yf = (-20.22) * xf;
let zf = (xf + (yf) - -0.01);
let fxzy = 5 ** (2**3);
assert(fxzy == 390625);
let xyzf = 501 \ (99 + 1);
assert(xyzf == 5);
let xyznf = -501 \ (99 + 1);
assert(xyznf == -5);
let xyznfj = 501.9 \ (-99.1 - 0.91);
assert(xyznfj == -5);
let xynfj = -501.9 \ (-99.1 - 0.91);
assert(xynfj == 5);

let price = 0012.34;
let twentyThousand = 20_000;
let aBitMore = 20_000.000_1;
