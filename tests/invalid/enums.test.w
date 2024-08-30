enum SomeEnum {
    ONE, TWO, THREE
}

let four = SomeEnum.FOUR;
// ERR              ^^^^ Enum "SomeEnum" does not contain value "FOUR"

let two = SomeEnum.TWO.TWO;
// ERR                 ^^^ Property not found

if true {
  enum AnotherEnum {
      // ^ Enums must be declared at the top-level of the file
      FOUR, FIVE, SIX
  }
}
