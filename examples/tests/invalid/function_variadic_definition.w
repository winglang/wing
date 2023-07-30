let f1 = (...args: Array<num>, x:num) => {};
//        ^^^^^^^^^^^^^^^^^^^ Unexpected 'variadic_definition'

let f2 = (...args: Array<num>) => {};
f2(1, true, 2);
//    ^^^^ All elements of a variadic argument must be of the same type.