enum SomeEnum {
    ONE, TWO, THREE
}

let four = SomeEnum.FOUR;
// ERR              ^^^^ enum value does not exist

let two = SomeEnum.TWO.TWO;
// ERR                 ^^^
