test "bypass return type given throw is at parent level" {
    let x: (): num = () => {
        throw "not implemented";
    };
}

test "bypass return when a throw is found" {
    let x: (): num = () => {

        // this should not be executed
        if false {
            return 1;
        }

        throw "not implemented";
    };
}

test "return when a number is found even if a throw exists" {
    let x: (): num = () => {

        if true {
            return 1;
        }

        throw "not implemented";
    };
}
