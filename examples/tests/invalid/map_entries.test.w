let mapToNumber = { "foo" => 1, "bar" => 2 };
let someStr: str = mapToNumber.entries().at(0).value;
//                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be "str", but got "num" instead
