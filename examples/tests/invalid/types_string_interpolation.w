let num_example = 123;
let bool_example = true;

"invalid ${num_example}";
// ERR     ^^^^^^^^^^^ expression must be a string

"invalid ${bool_example}";
// ERR     ^^^^^^^^^^^^ expression must be a string


"invalid ${2 + 2}";
// ERR     ^^^^^ expression must be a string