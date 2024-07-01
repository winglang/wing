enum SomeEnum {
    ONE, TWO, THREE
}

let four = SomeEnum.FOUR;
// ERR              ^^^^ Enum "SomeEnum" does not contain value "FOUR"

let two = SomeEnum.TWO.TWO;
// ERR                 ^^^ Property not found
