let bool_example = true;

"invalid ${bool_example}";
// ERR     ^^^^^^^^^^^^ expression must be a string or number

"invalid ${1>2}";
// ERR     ^^^^^^^^^^^^ expression must be a string or number
