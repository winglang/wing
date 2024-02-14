let map = { "1" => "foo", "2" => "bar" };
            ^ Expected type to be "str", but got "num" instead

// check typesafety
let mapUnsafe = { "foo" => 1, "bar" => 2 };
let someStr: str = mapUnsafe.entries().at(0).value;
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be "str", but got "num" instead
