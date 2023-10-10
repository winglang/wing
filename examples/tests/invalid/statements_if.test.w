let n = 0;
--n;
//^ Unexpected unary operator "--"

if !n {}
//  ^ Expected "bool" but got "num"

if !n || true {}
//  ^ Expected "bool" but got "num"
